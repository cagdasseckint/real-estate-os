# CB-OS V1.3 – Tam Dokümantasyon (Tek Dosya)

> Bu doküman, CB-OS çekirdeğindeki **tüm küçük/büyük özellikleri** (modüller, iş akışları, tablolar, otomasyonlar, test/audit süreçleri) koddan çıkarımla tek dosyada toplar. Kodda doğrudan görülen davranışlar ve varsayımlar esas alınmıştır.

## 1) Genel Bakış

CB-OS, Google Apps Script + Google Sheets tabanlı bir emlak operasyon işletim sistemidir. **SoT (Source of Truth)** Google Sheets workbook’tur ve tüm dış girdiler **INGEST_QUEUE** üzerinden sisteme alınır. Bu sayede idempotency, audit ve gap-free cursor gibi kontrol mekanizmaları garanti altına alınır.【F:app/cb-os/scripts/02_Constants.gs†L1-L210】【F:app/cb-os/scripts/04_QueueRepo.gs†L1-L179】

**Temel prensipler:**
- **Write-path tek kapı**: Dış veri girişleri sadece INGEST_QUEUE üzerinden yapılır.【F:app/cb-os/scripts/04_QueueRepo.gs†L1-L179】
- **Append-only EVENTS**: Olaylar yalnızca append edilir, update/delete yoktur.【F:app/cb-os/scripts/08_EventsRepo.gs†L1-L200】
- **Idempotency & Dedup**: DEDUP_KEYS + LockService ile aynı işlemler tekrarlanmaz.【F:app/cb-os/scripts/09_DedupRepo.gs†L1-L116】
- **Gap-free cursor**: Hata durumunda cursor ilerlemez (audit contract string ile kayıt).【F:app/cb-os/scripts/13_IngestProcessJob.gs†L1-L180】

## 2) Mimari Bileşenler

### 2.1 Orkestrasyon
`ORCH_15MIN` her 15 dakikada aşağıdaki iş sırasını çalıştırır:
1. `ingest_process_job`
2. `calendar_sync_job`
3. `gmail_scan_job`
4. `guardrails_job`
5. `dlq_retry_job`

Bu sıra “locked” olup değiştirilemez; trigger kurulumu Apps Script üzerinde manuel yapılır.【F:app/cb-os/scripts/17_Orchestrator.gs†L1-L218】

### 2.2 Ingest İşleme (Queue → SoT)
- Kuyrukta `status=new` olan kayıtlar cursor’a göre (received_at + sequence_id + ingest_id) sıralı alınır.
- JSON parse hatası veya handler hatasında **DLQ**’ya atılır ve cursor ilerlemez.
- Başarılı işlemde status “completed” olur, cursor güncellenir.
- Idempotency key varsa önce `DedupRepo.insertIfNotExists` yapılır; duplicate ise item “skipped” olur.【F:app/cb-os/scripts/04_QueueRepo.gs†L1-L179】【F:app/cb-os/scripts/13_IngestProcessJob.gs†L1-L180】

### 2.3 DLQ Retry
- DLQ kayıtları `retry_count < DLQ_MAX_RETRY` olanlar için sırayla yeniden kuyruğa alınır.
- DLQ’da her retry güncellenir ve cursor `DLQ_LAST_PROCESSED_AT` olarak ilerletilir.【F:app/cb-os/scripts/14_DLQRetryJob.gs†L1-L188】

### 2.4 Append-only Events
- Her kritik aksiyon EVENTS tablosuna kaydedilir (contact/deal/task/appointment vb.).
- Events repo’da update/delete fonksiyonları yoktur (append-only garantisi).【F:app/cb-os/scripts/08_EventsRepo.gs†L1-L200】

## 3) Veri Modeli (Sheets)

### 3.1 SoT (Business Truth)
- `CONTACTS`, `DEALS`, `TASKS`, `EVENTS`, `APPOINTMENTS`, `DOCS`, `DEDUP_KEYS`【F:app/cb-os/scripts/02_Constants.gs†L15-L124】

### 3.2 Operasyonel
- `INGEST_QUEUE`, `DLQ`, `JOB_RUN_LOG`【F:app/cb-os/scripts/02_Constants.gs†L15-L124】

### 3.3 Config/Reference
- `CONFIG`, `STAGE_AUTOMATIONS`, `TASK_TEMPLATES`, `LEAD_SCORES`, `LEAD_SIGNALS`,
  `EMAIL_DRAFTS`, `FOLLOWUP_SEQUENCES`, `DOC_PACKAGES`, `DOC_TEMPLATES`, `OPS_DASHBOARD`,
  `DRIVE_SHARE_AUDIT`, `ACCESS_INVENTORY`, `SECURITY_SOP`, `PROPERTIES`, `AGREEMENTS`,
  `DOCUMENT_CHECKLISTS`, `VIEWINGS`, `OFFERS`, `PRICE_CHANGES`, `MARKETING_ASSETS`,
  `CONSENTS`, `CONVERSION_QUEUE`, `SMOKE_TEST_LOG`【F:app/cb-os/scripts/02_Constants.gs†L15-L204】

### 3.4 Dashboard Tabloları
- `DAILY_SNAPSHOT`, `WEEKLY_SUMMARY`【F:app/cb-os/scripts/02_Constants.gs†L112-L124】

## 4) Konfigürasyon & Varsayılanlar

`DEFAULTS` üzerinden kontrol edilen ayarlar:
- Zaman dilimi, WhatsApp/Booking modları
- SLA, batch size, Gmail etiketleri
- Lead scoring eşiği, follow-up/email drafts, doküman paketleme
- DLQ retry limitleri, module enable flags (CRM/Workflow/LeadCapture)【F:app/cb-os/scripts/01_Config.gs†L1-L62】

Config değerleri `CONFIG` sheet’ten okunur, cache’lenir ve `seedDefaultConfig_` ile otomatik başlangıç değerleri yazılır.【F:app/cb-os/scripts/01_Config.gs†L34-L120】【F:app/cb-os/scripts/03_SheetsRepo.gs†L195-L249】

## 5) Ingest Türleri

Sistemin desteklediği ingest türleri:
- `new_lead`, `form_lead`, `gmail_signal`, `email_draft_request`, `doc_package_create`,
  `doc_generate_request`, `stage_transition`, `contact_update`, `deal_update`,
  `task_create`, `task_update`, `event_log`, `appointment_create`, `doc_upload`, `manual_import`【F:app/cb-os/scripts/02_Constants.gs†L129-L156】

## 6) İş Akışları ve İş Kuralları

### 6.1 Deal Tipleri ve Stage’ler
- `SELLER`, `BUYER`, `RENT`, `LAND` stage listeleri kodda sabitlenmiştir.【F:app/cb-os/scripts/02_Constants.gs†L158-L190】

### 6.2 Deal Lifecycle
- Deal oluşturma, güncelleme ve stage geçişleri `DealsRepo` üzerinden yönetilir.
- Stage değişiminde otomasyonlar tetiklenir ve `STAGE_CHANGE` event’i append edilir.【F:app/cb-os/scripts/06_DealsRepo.gs†L1-L179】

### 6.3 Lead Normalizasyonu
- `normalizeNewLead_` temel lead payload’u normalize eder.
- `normalizeLandPayload_` LAND özel alanlarını (docs_required/parcel_present) işler.【F:app/cb-os/scripts/10_Normalizers.gs†L1-L91】

### 6.4 Task Yönetimi
- `TasksRepo` ile task CRUD, template ile görev üretimi ve due-date hesaplaması yapılır.【F:app/cb-os/scripts/07_TasksRepo.gs†L1-L201】

## 7) Otomasyonlar (18_Automations.gs)

### 7.1 Lead Scoring
- `LEAD_SIGNALS` üzerinden skor hesaplanır, `LEAD_SCORES` tablosuna yazılır.
- En yüksek skorlu lead’ler için “Top Lead Follow-up” task’ları otomatik açılır.【F:app/cb-os/scripts/18_Automations.gs†L1-L120】

### 7.2 Follow-up Sequences
- `FOLLOWUP_SEQUENCES`’ten okunur, default adımlar uygulanır.
- Task ya da email draft aksiyonları planlanır.【F:app/cb-os/scripts/18_Automations.gs†L121-L216】

### 7.3 Stage Automations
- `STAGE_AUTOMATIONS` tablosu üzerinden görev, email, docs, close checklist ve winback tetiklenir.【F:app/cb-os/scripts/18_Automations.gs†L218-L314】

### 7.4 Email Draft Queue
- `EMAIL_DRAFTS`’te queued olanlar Gmail Draft’a çevrilir.
- Draft oluşturulamazsa status=error olur.【F:app/cb-os/scripts/18_Automations.gs†L316-L394】

### 7.5 Docs Paketleri / Template
- Deal oluşturulurken `DOC_PACKAGES` eşleşmesi varsa Drive’da doküman paket klasörü kopyalanır.
- `DOC_TEMPLATES` ile şablondan doküman üretimi desteklenir.【F:app/cb-os/scripts/18_Automations.gs†L396-L472】

### 7.6 Win-back Sequence
- CLOSED_LOST stage’te 30/60/90 gün offsets ile email + task üretimi yapılır.【F:app/cb-os/scripts/18_Automations.gs†L474-L528】

### 7.7 Ops Dashboard + Drive Audit
- `OPS_DASHBOARD` snapshot (ingest pending, DLQ count, error rate, cursor drift).
- `DRIVE_SHARE_AUDIT` ile Drive paylaşım durumları loglanır.【F:app/cb-os/scripts/18_Automations.gs†L530-L589】

### 7.8 Gmail Sinyal İşleme
- Gmail label bazlı tarama yapılarak `INGEST_QUEUE`’ya `gmail_signal` event’leri atılır.【F:app/cb-os/scripts/18_Automations.gs†L591-L642】

### 7.9 Weekly KPI Raporu
- Haftalık pipeline ve task özetleri Gmail ile gönderilir (config ile açılır).【F:app/cb-os/scripts/18_Automations.gs†L644-L682】

## 8) Modüler Sistemler (Opsiyonel)

### 8.1 CRM & Pipeline Modülü
- Kendi “Contacts, Pipelines, Stages, Opportunities, ActivityLog, Reports” tab set’i.
- onEdit ile stage/status değişim loglama ve raporlama üretimi vardır.
- `MODULES_CRM_ENABLED` ile aktif edilir.【F:app/cb-os/scripts/19_CrmPipeline.gs†L1-L288】

### 8.2 Workflow Engine
- Sheets tabanlı rule engine (Trigger: FORM_SUBMIT / TIME / SHEET_EDIT).
- Aksiyonlar: SEND_EMAIL, CREATE_TASK, CREATE_CAL_EVENT, UPDATE_SHEET, CREATE_DOC_FROM_TEMPLATE.
- `MODULES_WORKFLOW_ENABLED` ile aktif edilir.【F:app/cb-os/scripts/20_WorkflowEngine.gs†L1-L358】

### 8.3 Booking System
- Google Form → BookingRequests sheet → Calendar event + email akışı.
- Uygunluk kontrolü, alternatif slot önerisi ve görev oluşturma var.【F:app/cb-os/scripts/21_BookingSystem.gs†L1-L220】

### 8.4 Lead Capture
- Form submit ile Contacts/Opportunities upsert.
- Owner round-robin dağıtımı ve welcome email gönderimi.
- `MODULES_LEAD_CAPTURE_ENABLED` ile aktif edilir.【F:app/cb-os/scripts/22_LeadCapture.gs†L1-L264】

### 8.5 Client Files Provisioning
- Client klasörü + özet dokümanı + onboarding görevleri oluşturulur.
- ActivityLog ile kayıt tutulur.【F:app/cb-os/scripts/23_ClientFiles.gs†L1-L249】

### 8.6 Listings & Compliance
- Property, Agreements, Consents, Conversion Queue için minimal CRUD ve event logging.
- Listing oluşturma → event log; consent ve conversion queue kayıtları append edilir.【F:app/cb-os/scripts/24_ListingsAndCompliance.gs†L1-L94】

## 9) Test, Audit ve Governance

### 9.1 Smoke Tests
- 6 test: enqueue determinism, idempotency, DLQ insert, gap-free cursor, LAND normalization, events append-only.
- Sonuçlar Logger + `SMOKE_TEST_LOG` sheet’e yazılır (ops_log kullanılmaz).【F:app/cb-os/scripts/15_SmokeTests.gs†L1-L319】

### 9.2 Audit Checks
- received_at formatı, offset tutarlılığı, cursor order, audit string exact match.
- `ops_log` sadece audit scope’ta yazılır.【F:app/cb-os/scripts/16_AuditTools.gs†L1-L329】

### 9.3 Evidence Pack
- Logger çıktıları ve EVIDENCE satırları esas alınır, `generateEvidencePack()` ile şablon üretilir.【F:app/cb-os/scripts/16_AuditTools.gs†L206-L329】

## 10) Güvenlik ve Erişim

- Drive, Gmail, Calendar ve Tasks erişimleri Apps Script OAuth scope’ları ile tanımlıdır.
- appsscript.json’da Calendar/Gmail/Tasks advanced services aktiftir.【F:app/cb-os/scripts/appsscript.json†L1-L24】

## 11) Kurulum Özeti

1. Google Apps Script projesi oluşturun.
2. `scripts/` içindeki tüm `.gs` dosyalarını aynı isimlerle kopyalayın.
3. `appsscript.json` içeriğini manifest’e yapıştırın.
4. Google Sheets workbook’u oluşturup Apps Script’e bağlayın.
5. `bootstrapSheets_()` çalıştırarak tüm tabları oluşturun.
6. `ORCH_15MIN` için 15 dakikalık time-driven trigger kurun.

Bu adımlar, kod tarafında konfigürasyon ve bootstrap akışları ile uyumludur.【F:app/cb-os/scripts/03_SheetsRepo.gs†L20-L193】【F:app/cb-os/scripts/17_Orchestrator.gs†L1-L218】

## 12) Tipik Kullanım Örnekleri (İş Mantığı)

- **Yeni lead alımı** → Queue → Ingest → Contact + Deal + Task + Events
- **Deal stage değişimi** → Stage automation + Event log
- **Gmail sinyal tarama** → Queue → lead signal + event
- **DLQ retry** → ingest queue reset → tekrar işlenir

Bu davranışların tamamı ilgili repo ve job fonksiyonları tarafından yürütülür.【F:app/cb-os/scripts/13_IngestProcessJob.gs†L1-L364】【F:app/cb-os/scripts/18_Automations.gs†L1-L707】

---

> Not: Bu doküman, CB-OS’un mevcut kod durumunu temel alır. Ek modüller config flag’lerle kapalı/açık olabilir. (Örn. `MODULES_CRM_ENABLED`, `MODULES_WORKFLOW_ENABLED`, `MODULES_LEAD_CAPTURE_ENABLED`).【F:app/cb-os/scripts/01_Config.gs†L18-L62】
Çağdaş Seçkin Tüfekci - Real Estate Agent

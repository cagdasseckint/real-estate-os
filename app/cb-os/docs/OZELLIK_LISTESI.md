# CB-OS V1.3 – Detaylı Özellik Listesi

## 1) Genel Mimari ve Prensipler
- **Google Apps Script + Google Sheets tabanlı SoT mimarisi**: Tüm gerçekler tek bir workbook’ta tutulur ve sistemin tek doğrusu buradadır.
- **Tek write-path**: Harici veri girişleri yalnızca `INGEST_QUEUE` üzerinden yapılır.
- **Append-only events**: `EVENTS` tablosu sadece append edilir; update/delete yoktur.
- **Idempotency & dedup**: `DEDUP_KEYS` ve lock mekanizması ile yinelenen işlemler engellenir.
- **Gap-free cursor**: Hata olduğunda cursor ilerlemez; veri akışında boşluk oluşmaz.

## 2) Orkestrasyon ve Job Akışları
- **ORCH_15MIN** (15 dakikada bir): Sabit sırayla job’ları çalıştırır.
  1. `ingest_process_job`
  2. `calendar_sync_job`
  3. `gmail_scan_job`
  4. `guardrails_job`
  5. `dlq_retry_job`

## 3) Ingest ve DLQ
- **Ingest işleme**: `status=new` kayıtlar cursor sırasıyla işlenir, hata olursa DLQ’ya düşer ve cursor ilerlemez.
- **Başarılı işleme**: İşlem `completed` olur ve cursor güncellenir.
- **Idempotency**: `idempotency_key` ile duplicate kayıtlar “skipped” olur.
- **DLQ retry**: Retry limiti altındaki kayıtlar yeniden kuyruğa alınır ve ayrı bir DLQ cursor ile takip edilir.

## 4) Veri Modeli (Sheet’ler)
### 4.1 SoT (Business Truth)
- `CONTACTS`, `DEALS`, `TASKS`, `EVENTS`, `APPOINTMENTS`, `DOCS`, `DEDUP_KEYS`

### 4.2 Operasyonel
- `INGEST_QUEUE`, `DLQ`, `JOB_RUN_LOG`

### 4.3 Konfigürasyon/Referans
- `CONFIG`, `STAGE_AUTOMATIONS`, `TASK_TEMPLATES`, `LEAD_SCORES`, `LEAD_SIGNALS`,
  `EMAIL_DRAFTS`, `FOLLOWUP_SEQUENCES`, `DOC_PACKAGES`, `DOC_TEMPLATES`, `OPS_DASHBOARD`,
  `DRIVE_SHARE_AUDIT`, `ACCESS_INVENTORY`, `SECURITY_SOP`, `PROPERTIES`, `AGREEMENTS`,
  `DOCUMENT_CHECKLISTS`, `VIEWINGS`, `OFFERS`, `PRICE_CHANGES`, `MARKETING_ASSETS`,
  `CONSENTS`, `CONVERSION_QUEUE`, `SMOKE_TEST_LOG`

### 4.4 Dashboard
- `UNIFIED_TABLES`, `DASHBOARD_CHARTS`, `DASHBOARD_SUMMARY`, `DASHBOARD_PIPELINE`,
  `DASHBOARD_LEAD_SOURCES`, `DASHBOARD_SLA`
- `DAILY_SNAPSHOT`, `WEEKLY_SUMMARY`

### 4.5 Coverage / Yardımcı Tablolar
- `REPUTATION_FEEDBACK`, `PORTAL_LINKS`, `OFFLINE_CONVERSIONS`, `CONTENT_LIBRARY`
- `ADS_ATTRIBUTION_SUMMARY`, `BOOKING_SUMMARY`, `EMAIL_OUTREACH_SUMMARY`
- `TENANTS`, `COURSE_SESSIONS`, `KNOWLEDGE_BASE`

## 5) Konfigürasyon ve Varsayılanlar
- Zaman dilimi, WhatsApp/Booking modları, SLA ve batch size ayarları
- Gmail etiketleri, lead scoring eşikleri, follow-up/email draft ayarları
- Doküman paketleme, DLQ retry limitleri, modül flag’leri
- `CONFIG` sheet üzerinden okuma, cache ve default seed işlemleri

## 6) Desteklenen Ingest Türleri
- `new_lead`, `form_lead`, `gmail_signal`, `email_draft_request`, `doc_package_create`,
  `doc_generate_request`, `stage_transition`, `contact_update`, `deal_update`,
  `task_create`, `task_update`, `event_log`, `appointment_create`, `doc_upload`, `manual_import`

## 7) İş Akışları ve İş Kuralları
- **Deal tipleri ve stage’ler**: `SELLER`, `BUYER`, `RENT`, `LAND` için sabit stage setleri
- **Deal lifecycle**: Oluşturma, güncelleme ve stage geçişleri; `STAGE_CHANGE` event append edilir
- **Lead normalizasyonu**: Standart lead ve LAND özel alanları normalize edilir
- **Task yönetimi**: CRUD, template tabanlı üretim ve due-date hesaplaması

## 8) Otomasyonlar
- **Lead scoring**: `LEAD_SIGNALS` ile skor üretimi ve `LEAD_SCORES` yazımı
- **Top lead follow-up**: En yüksek skorlu lead’lere otomatik task
- **Follow-up sequences**: `FOLLOWUP_SEQUENCES` üzerinden adım adım planlama
- **Stage automations**: Görev, email, docs, close checklist, winback
- **Email draft queue**: `EMAIL_DRAFTS` queued → Gmail Draft
- **Docs paketleri/şablonlar**: `DOC_PACKAGES` ve `DOC_TEMPLATES` ile üretim
- **Win-back sequence**: CLOSED_LOST için 30/60/90 gün offset’li aksiyonlar
- **Ops Dashboard + Drive Audit**: Operasyon snapshot ve Drive paylaşım logları
- **Gmail sinyal işleme**: Label bazlı tarama ve `gmail_signal` ingest
- **Weekly KPI raporu**: Haftalık pipeline ve task özetleri

## 9) Modüler Sistemler (Opsiyonel)
- **CRM & Pipeline**: Contacts/Pipelines/Stages/Opportunities/ActivityLog/Reports seti
- **Workflow Engine**: FORM_SUBMIT/TIME/SHEET_EDIT trigger’ları ve aksiyon seti
- **Booking System**: Form → BookingRequests → Calendar + email akışı
- **Lead Capture**: Form submit → Contacts/Opportunities upsert + round-robin owner
- **Client Files Provisioning**: Klasör + özet dokümanı + onboarding görevleri
- **Listings & Compliance**: Property/Agreements/Consents/Conversion Queue CRUD + event logging

### 9.1 Dashboard & Coverage Utilities
- **Unified Table + Dashboard Summary**: tek sayfa görünüm ve özet tablolar
- **Gap Coverage**: Ads attribution, booking, Gmail outreach, reputation feedback, portal links, offline conversions
- **Partial Coverage**: tenants, course sessions, knowledge base kayıtları

## 10) Test, Audit ve Governance
- **Smoke Tests**: Determinism, idempotency, DLQ insert, gap-free cursor, LAND normalization, events append-only
- **Audit Checks**: received_at formatı, offset tutarlılığı, cursor order, audit string doğrulama
- **Evidence Pack**: Logger çıktıları ve evidence satırlarından şablon üretimi

## 11) Güvenlik ve Erişim
- Apps Script OAuth scope’ları: Drive, Gmail, Calendar, Tasks
- Advanced services: Calendar/Gmail/Tasks etkin

## 12) Tipik Kullanım Akışları
- Yeni lead alımı → Queue → Ingest → Contact + Deal + Task + Events
- Deal stage değişimi → Stage automation + Event log
- Gmail sinyal tarama → Queue → lead signal + event
- DLQ retry → ingest queue reset → yeniden işleme
Çağdaş Seçkin Tüfekci - Real Estate Agent

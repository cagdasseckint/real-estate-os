# CB-OS V1.0 - AŞAMA-1: PROJE NETLEŞTİRME (Design Pack)

**Versiyon:** V1.0  
**Tarih:** Ocak 2026  
**Mod:** GREENFIELD  
**Timezone:** Europe/Istanbul  

---

## 1. YÖNETİCİ ÖZETİ (Executive Summary)

1. **CB-OS**, Go High Level (GHL) benzeri bir iş yönetim sistemi olup Google ekosistemi üzerine inşa edilmiştir.
2. **SoT (Source of Truth):** Tüm iş verileri Google Sheets (CB-OS Workbook) içinde tutulur.
3. **Write-Path Tek Kapı:** Dış girdiler yalnızca INGEST_QUEUE üzerinden sisteme girer; SoT tablolarına doğrudan yazım yasaktır.
4. **Otomasyon Motoru:** ORCH_15MIN orchestrator her 15 dakikada job zincirini tetikler.
5. **Pipeline Türleri:** SELLER, BUYER, RENT, LAND için özelleştirilmiş stage akışları.
6. **Idempotency:** DEDUP_KEYS tablosu ile tekrarlı işlemler engellenir.
7. **Events Append-Only:** Tüm iş olayları EVENTS tablosuna append-only şekilde kaydedilir.
8. **DLQ Mekanizması:** Başarısız işlemler Dead Letter Queue'ya alınır ve retry mantığı ile işlenir.
9. **WhatsApp V1:** Manual logging modunda; otomatik gönderim yok (draft_only).
10. **Booking V1:** Manuel randevu oluşturma; slot önerme destekli.
11. **AI Entegrasyonu:** ChatGPT/Gemini prompt şablonları ile lead qualification, follow-up önerileri.
12. **Dashboard:** Günlük/haftalık KPI'lar; pipeline funnel, task completion, response time metrikleri.
13. **KVKK:** Varsayım olarak tüm izinler alınmış kabul edilir; detaylı KVKK süreci V1 kapsamı dışıdır.
14. **Tek Kişi Operasyonu:** Minimum bakım, maksimum otomasyon prensibi.
15. **Test Standardı:** Appendix A FINAL uyumlu smoke test ve audit mekanizması.

---

## 2. GHL MODÜL EŞLEŞTİRMESİ

| GHL Modülü | CB-OS Karşılığı | Araç |
|------------|-----------------|------|
| CRM | CONTACTS, DEALS sheets | Google Sheets |
| Pipeline | DEALS + STAGE_AUTOMATIONS | Google Sheets |
| Automation | ORCH_15MIN + Jobs | Apps Script |
| Forms | Google Forms → INGEST_QUEUE | Google Forms |
| Calendar | APPOINTMENTS + Google Calendar | Calendar API |
| Email | Gmail → gmail_scan_job | Gmail API |
| Tasks | TASKS sheet + Google Tasks mirror | Tasks API |
| Documents | DOCS sheet + Google Docs/Slides | Docs API |
| WhatsApp | Manual logging (EVENTS) | Manual |
| Dashboard | DASHBOARD sheet + KPI hesaplamaları | Sheets |
| Analytics | Google Analytics entegrasyonu | GA4 |
| Ads | Google Ads tracking | Ads API |

---

## 3. MİMARİ TASARIM

### 3.1 Veri Modeli (Sheets Schema)

#### SoT Tabloları (Business Truth)
```
CONTACTS:
  contact_id, created_at, updated_at, first_name, last_name, email, phone, 
  whatsapp, source, source_ref_id, status, tags, notes, kvkk_consent, 
  preferred_contact_method, last_contact_at

DEALS:
  deal_id, created_at, updated_at, contact_id, deal_type, stage, 
  deal_value, currency, expected_close_date, assigned_to, property_type,
  property_address, listing_price, commission_rate, notes, docs_required,
  parcel_present, last_stage_change_at

TASKS:
  task_id, created_at, updated_at, entity_type, entity_id, title, 
  description, due_date, priority, status, assigned_to, completed_at,
  google_task_id

EVENTS (append-only):
  event_id, occurred_at, entity_type, entity_id, event_type, 
  payload_json, source, source_ref_id, idempotency_key

APPOINTMENTS:
  appointment_id, created_at, contact_id, deal_id, scheduled_at, 
  duration_minutes, location, meeting_type, status, google_event_id,
  notes, reminder_sent

DOCS:
  doc_id, created_at, entity_type, entity_id, doc_type, doc_url,
  status, signed_at, notes

DEDUP_KEYS:
  key, created_at
```

#### Operasyonel Tablolar (Queue/Log)
```
INGEST_QUEUE:
  status, ingest_id, received_at, ingest_type, payload_json, source,
  source_ref_id, idempotency_key, error, processed_at

DLQ:
  created_at, ingest_id, source_ref_id, error_json, retry_count, last_retry_at

JOB_RUN_LOG:
  created_at, job_name, orch_run_id, cursor_before, cursor_after, notes, message
```

#### Config/Reference Tabloları
```
CONFIG:
  key, value, description

STAGE_AUTOMATIONS:
  deal_type, from_stage, to_stage, trigger_condition, action_type, action_config

SMOKE_TEST_LOG (opsiyonel):
  run_at, test_name, result, notes
```

### 3.2 Kaynak Rolleri

| Kaynak | Rol | Erişim Tipi |
|--------|-----|-------------|
| Google Sheets (CB-OS) | SoT, Config, Logs | Read/Write (via Jobs) |
| Google Forms | Lead capture input | Write to INGEST_QUEUE |
| Google Calendar | Appointment execution | Sync bidirectional |
| Gmail | Communication tracking | Read (scan labels) |
| Google Tasks | Task execution mirror | Write mirror |
| Google Docs/Slides | Document templates | Read/Generate |
| WhatsApp | Communication | Manual log to EVENTS |

### 3.3 Entegrasyon Akışları

```
[Google Form Submit]
       ↓
   onFormSubmit() → QueueRepo.enqueue()
       ↓
   INGEST_QUEUE (status=new)
       ↓
   ORCH_15MIN trigger (every 15 min)
       ↓
   ingest_process_job() → cursor-based processing
       ↓
   ┌─────────────────────────────────────┐
   │ Parse payload_json                   │
   │ Check idempotency (DEDUP_KEYS)       │
   │ Route by ingest_type:                │
   │   - new_lead → CONTACTS + DEALS      │
   │   - task_update → TASKS              │
   │   - event_log → EVENTS               │
   │ Append EVENTS record                 │
   │ Update cursor                        │
   └─────────────────────────────────────┘
       ↓ (on error)
   DLQ insert → dlq_retry_job() later
```

---

## 4. İŞ AKIŞLARI (Pipeline Flows)

### 4.1 SELLER Pipeline
```
NEW → FIRST_TOUCH → QUALIFIED → APPOINTMENT_SET → LISTING_DISCUSSION → 
LISTING_SIGNED → MARKETING → SHOWINGS → OFFER → CONTRACT → CLOSED_WON/LOST
```

| Stage | Giriş Koşulu | Çıkış Koşulu | Otomasyon | Görev Şablonu |
|-------|--------------|--------------|-----------|---------------|
| NEW | Lead yaratıldı | İlk temas yapıldı | 30dk SLA alert | "İlk temas yap" |
| FIRST_TOUCH | Temas kaydı | Qualification tamamlandı | 48h follow-up | "Qualification soruları" |
| QUALIFIED | Kriterler karşılandı | Randevu alındı | - | "Randevu ayarla" |
| APPOINTMENT_SET | Randevu var | Listing görüşmesi yapıldı | Calendar event | "Listing sunumu hazırla" |
| LISTING_DISCUSSION | Görüşme yapıldı | Sözleşme imzalandı | - | "Sözleşme gönder" |
| LISTING_SIGNED | Sözleşme tamam | Marketing başladı | Doc status check | "Fotoğraf çekimi" |
| MARKETING | İlan yayında | Showing talebi geldi | - | "İlan performans takibi" |
| SHOWINGS | Showing yapılıyor | Teklif geldi | - | "Showing feedback al" |
| OFFER | Teklif alındı | Sözleşme aşamasına geçildi | - | "Teklif değerlendirme" |
| CONTRACT | Sözleşme sürecinde | Kapanış yapıldı | - | "Closing checklist" |

### 4.2 BUYER Pipeline
```
NEW → FIRST_TOUCH → QUALIFIED → SHORTLIST → APPOINTMENT_SET → 
OFFER → CONTRACT → CLOSED_WON/LOST
```

### 4.3 RENT Pipeline
```
NEW → FIRST_TOUCH → QUALIFIED → SHOWING → APPLICATION → 
CONTRANT → HANDOVER → CLOSED_WON/LOST
```

### 4.4 LAND Pipeline
```
NEW → FIRST_TOUCH → QUALIFIED → DOCS_REVIEW → SITE_VISIT → 
OFFER → CONTRACT → CLOSED_WON/LOST
```

**Kilit Kural:** Stage geçiş otomasyonları koda gömülmez; STAGE_AUTOMATIONS tablosundan okunur.

---

## 5. OTOMASYONLAR

### 5.1 Job Tanımları

| Job | Tetikleyici | Input | İşlem | Output | Log | Hata Yönetimi |
|-----|-------------|-------|-------|--------|-----|---------------|
| ingest_process_job | ORCH_15MIN | INGEST_QUEUE (status=new) | Parse, validate, route | CONTACTS/DEALS/TASKS/EVENTS | JOB_RUN_LOG | DLQ insert |
| calendar_sync_job | ORCH_15MIN | APPOINTMENTS | Calendar API sync | google_event_id update | JOB_RUN_LOG | Skip + log |
| gmail_scan_job | ORCH_15MIN | Gmail (labeled) | Extract email data | EVENTS append | JOB_RUN_LOG | Skip + log |
| guardrails_job | ORCH_15MIN | All SoT tables | SLA checks, stuck deals | TASKS (alerts) | JOB_RUN_LOG | Log only |
| dlq_retry_job | ORCH_15MIN | DLQ | Requeue failed items | INGEST_QUEUE status reset | JOB_RUN_LOG | Increment retry_count |

### 5.2 Retry & DLQ Mekanizması

1. **İlk Hata:** status="failed", error alanı doldurulur, DLQ'ya insert
2. **DLQ Retry:** dlq_retry_job INGEST_QUEUE'daki satırı status="new" yapar, retry_count++
3. **Max Retry (3):** Manuel müdahale gerekir; ops_log ile scope=manual_fix_json

---

## 6. DASHBOARD & KPI

### 6.1 Daily Metrics
- Yeni lead sayısı
- İlk temas SLA uyumu (%)
- Bugün kapanan görevler
- Aktif deal sayısı (stage bazlı)

### 6.2 Weekly Metrics
- Pipeline funnel dönüşüm oranları
- Ortalama deal cycle süresi
- Response time ortalaması
- Stuck deal sayısı (7+ gün aynı stage)

### 6.3 Dashboard Tabları
```
DAILY_SNAPSHOT:
  date, new_leads, first_touch_sla_pct, tasks_completed, active_deals

WEEKLY_SUMMARY:
  week_start, conversion_rates_json, avg_cycle_days, avg_response_minutes, stuck_count
```

---

## 7. AI/AGENT TASARIMI

### 7.1 ChatGPT vs Gemini Ayrımı

| Kullanım | Araç | Gerekçe |
|----------|------|--------|
| Lead qualification önerileri | ChatGPT | Detaylı analiz |
| Email taslağı oluşturma | ChatGPT | Yazım kalitesi |
| Hızlı veri özeti | Gemini | Google entegrasyonu |
| Meeting notes özeti | Gemini | Docs entegrasyonu |
| Property description | ChatGPT | Yaratıcı içerik |

### 7.2 Prompt Şablonları (5 Adet)

**Prompt 1: Lead Qualification**
```
Aşağıdaki lead bilgilerini değerlendir ve 1-10 arası skor ver:
- İsim: {{first_name}} {{last_name}}
- Kaynak: {{source}}
- İlgi alanı: {{property_type}}
- Bütçe: {{budget}}
Çıktı: Skor, güçlü yönler, zayıf yönler, önerilen aksiyon
```

**Prompt 2: Follow-up Email**
```
{{contact_name}} ile {{last_contact_date}} tarihinde {{last_interaction_type}} yaptık.
Deal durumu: {{stage}}
48 saatlik follow-up emaili yaz. Profesyonel, samimi, CTA içeren.
```

**Prompt 3: Property Description**
```
Aşağıdaki emlak için Türkçe ilan metni oluştur:
- Tür: {{property_type}}
- Konum: {{location}}
- m²: {{sqm}}
- Oda: {{rooms}}
- Özellikler: {{features}}
SEO uyumlu, duygusal bağ kuran, 200 kelime.
```

**Prompt 4: Objection Handling**
```
Müşteri itirazı: "{{objection}}"
Deal türü: {{deal_type}}
Stage: {{stage}}
3 farklı yanıt önerisi ver: yumuşak, direkt, soru ile.
```

**Prompt 5: Weekly Report Summary**
```
Haftalık veriler:
- Yeni lead: {{new_leads}}
- Kapanan deal: {{closed_deals}}
- Toplam değer: {{total_value}}
- En aktif kaynak: {{top_source}}
Yönetici özeti oluştur, trend analizi yap, öneri ver.
```

### 7.3 Ajan Görevleri
1. **Lead Scorer Agent:** Yeni leadleri otomatik skorla
2. **Follow-up Reminder Agent:** 48h takip hatırlatıcısı
3. **Stuck Deal Alert Agent:** 7+ gün hareketsiz deal uyarısı
4. **Email Draft Agent:** Standart email taslakları
5. **Report Generator Agent:** Haftalık özet raporu

---

## 8. ÇAKIŞMALAR & RİSK MATRİSİ

| Risk | Etki | Olasılık | Tespit | Önlem | Fallback |
|------|------|----------|--------|-------|----------|
| Gmail API rate limit | Yüksek | Orta | gmail_scan_job log | Batch size azalt | Manuel email log |
| Calendar sync conflict | Orta | Düşük | Duplicate event | Idempotency key | Manuel düzeltme |
| Sheet row limit (10M) | Yüksek | Düşük | Row count monitor | Archive eski data | Yeni workbook |
| ORCH_15MIN timeout | Orta | Orta | Execution time log | Batch size azalt | Job bölme |
| DLQ overflow | Orta | Düşük | DLQ count alert | Retry limit | Manual triage |
| Concurrent edit conflict | Yüksek | Orta | LockService | Lock timeout | Retry |

---

## 9. UYGULAMA PLANI

| Aşama | İçerik | Deliverable |
|-------|--------|-------------|
| AŞAMA-1 | Proje Netleştirme | Design Pack (bu doküman) |
| AŞAMA-2 | Proje Yapma | 17 .gs dosyası + appsscript.json |
| AŞAMA-3 | Test Etme | Test Plan + Evidence Pack |

---

## 10. TEST & KABUL KRİTERLERİ

### 10.1 Definition of Done (DoD)
- [ ] Tüm .gs dosyaları syntax hatası olmadan çalışır
- [ ] GREENFIELD MOD ile sheet'ler canonical header ile oluşur
- [ ] ingest_process_job cursor-based işlem yapar
- [ ] DLQ mekanizması çalışır (COL2=ingest_id)
- [ ] Smoke test PASS döner
- [ ] Audit checks NNO-1=PASS döner
- [ ] Evidence Pack tüm alanları dolu

### 10.2 Kritik Senaryolar
1. **Happy Path:** Form submit → INGEST_QUEUE → CONTACTS+DEALS
2. **Idempotency:** Aynı idempotency_key ile tekrar submit → skip
3. **DLQ Flow:** Malformed JSON → DLQ insert → retry → success
4. **Cursor Gap-Free:** Hata durumunda cursor ilerlemez
5. **LAND Payload:** docs_required, parcel_present doğru yazılır

---

## EKSİK BİLGİ / VARSAYIM LİSTESİ

| # | Konu | Varsayım | Risk |
|---|------|----------|------|
| 1 | KVKK izinleri | Tüm izinler alınmış | Düşük |
| 2 | Gmail label'ları | LEAD, HOT mevcut | Düşük |
| 3 | Calendar ID | Primary calendar | Düşük |
| 4 | WhatsApp entegrasyonu | V1 manual logging yeterli | Orta |
| 5 | Booking sistemi | V1 manuel yeterli | Orta |

**Not:** Bu varsayımlar ilerlemeyi durdurmaz; V1.1'de revize edilebilir.

---

*AŞAMA-1 SONU - Design Pack tamamlandı.*

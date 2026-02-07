# CB-OS V1.3 - Kurulum ve Kullanım Kılavuzu

## Hızlı Başlangıç

### 1. Google Apps Script Projesi Oluşturma

1. [Google Apps Script](https://script.google.com) adresine gidin
2. "Yeni Proje" oluşturun
3. Projeye "CB-OS" adını verin

### 2. Dosyaları Kopyalama

Aşağıdaki sırayla dosyaları oluşturun:

```
appsscript.json    → Proje ayarları (manifest)
01_Config.gs       → Konfigürasyon yönetimi
02_Constants.gs    → Sabitler ve şema tanımları
03_SheetsRepo.gs   → Sheet erişim katmanı
04_QueueRepo.gs    → INGEST_QUEUE işlemleri
05_ContactsRepo.gs → CONTACTS işlemleri
06_DealsRepo.gs    → DEALS ve pipeline
07_TasksRepo.gs    → TASKS işlemleri
08_EventsRepo.gs   → EVENTS (append-only)
09_DedupRepo.gs    → Idempotency kontrolü
10_Normalizers.gs  → Veri normalizasyonu
11_Logging.gs      → Loglama araçları
12_Cursors.gs      → Cursor yönetimi
13_IngestProcessJob.gs → Ana ingest job
14_DLQRetryJob.gs  → DLQ retry mantığı
15_SmokeTests.gs   → Smoke testleri
16_AuditTools.gs   → Audit araçları
17_Orchestrator.gs → ORCH_15MIN
18_Automations.gs  → Lead skorlama ve otomasyonlar
19_CrmPipeline.gs  → CRM + Pipeline (Contacts/Opportunities)
20_WorkflowEngine.gs → Workflow engine (WorkflowRules/WorkflowRuns)
21_BookingSystem.gs → Booking system (Forms + Calendar)
22_LeadCapture.gs → Lead capture (Forms -> CRM)
23_ClientFiles.gs → Client files provisioning (Drive/Docs/Tasks)
24_ListingsAndCompliance.gs → Listings/Agreements/Consents/Conversions
25_Dashboard.gs → Dashboard (unified table + summary + charts)
26_GapCoverage.gs → Gap coverage helpers (ads/booking/email)
27_PartialCoverage.gs → Partial coverage helpers (tenants/courses/KB)
```

### 3. appsscript.json Güncelleme

1. Sol panelde "Proje Ayarları" → "appsscript.json dosyasını düzenleyicide göster" işaretle
2. `appsscript.json` içeriğini yapıştır

### 4. Google Sheets Bağlama

1. Yeni bir Google Sheets oluşturun
2. "CB-OS Workbook" olarak adlandırın
3. Apps Script'te: Extensions → Apps Script
4. Veya script.google.com'dan spreadsheet ID ile bağlayın

> Daha detaylı kurulum ve `clasp` adımları için: `docs/GOOGLE_APPS_SCRIPT_DEPLOY.md`

### 5. Bootstrap Çalıştırma

```javascript
// Apps Script Editor'da çalıştır:
bootstrapSheets_()
```

Bu komut tüm gerekli sheet'leri canonical header'larla oluşturur.

### 5.1 Dashboard Sayfalarını Oluşturma

Tek sayfalık birleşik tablo ve grafik dashboard'u oluşturmak için:

```javascript
// Dashboard sayfalarını oluştur
bootstrapDashboardSheets_()

// Özet tabloları güncelle
refreshDashboardSummary_()

// Tüm tabloları tek sayfada birleştir (tam yenileme)
refreshUnifiedTables_()

// Incremental refresh (sadece yeni kayıtlar + limit)
refreshUnifiedTables_({
  incremental: true,
  max_rows: 500
})

// Grafik dashboard'u üret
refreshDashboardCharts_()
```

### 5.2 Gap Coverage Mini-Modüller

GHL/Masternex boşluklarını Google araçlarıyla kapatmak için temel mini-modüller:

```javascript
// Gap coverage sheet'lerini oluştur
bootstrapGapCoverageSheets_()

// Reputation feedback loglama (Forms payload ile)
logReputationFeedback_({
  contact_id: 'CONTACT_123',
  deal_id: 'DEAL_456',
  rating: 5,
  comment: 'Çok memnun kaldım',
  source: 'google_form'
})

// Client portal link index üret
refreshClientPortalLinks_()

// Offline conversion export (Ads import için)
refreshOfflineConversions_()

// Ads attribution özet tablosu
refreshAdsAttributionSummary_()

// Booking (Forms/Calendar) özet tablosu
refreshBookingSummary_()

// Gmail outreach özet tablosu
refreshEmailOutreachSummary_()
```

### 5.3 Kısmen Kapanan Modüller (Google-native)

```javascript
// Kısmen kapanan modül sheet'lerini oluştur
bootstrapPartialCoverageSheets_()

// Multi-tenant kayıt örneği
registerTenant_({
  tenant_name: 'Müşteri A',
  workbook_id: 'spreadsheet_id',
  drive_root_id: 'drive_folder_id'
})

// Course/Community oturum kaydı
createCourseSession_({
  title: 'Haftalık Eğitim',
  meeting_link: 'https://meet.google.com/...',
  scheduled_at: '2025-01-01T10:00:00+03:00',
  host_email: 'owner@example.com'
})

// Knowledge base giriş güncelleme
upsertKnowledgeBaseEntry_({
  title: 'Süreç Dokümanı',
  category: 'Ops',
  doc_url: 'https://docs.google.com/...'
})
```

### 6. Trigger Kurulumu

1. Sol panelde saat simgesine (Triggers) tıkla
2. "+ Tetikleyici Ekle" butonuna bas
3. Ayarlar:
   - Fonksiyon: `ORCH_15MIN`
   - Olay kaynağı: Zamana dayalı
   - Tür: Dakika zamanlayıcısı
   - Aralık: Her 15 dakikada bir
4. Kaydet

## Test Etme

```javascript
// Smoke testlerini çalıştır
runSmokeTests()

// Audit kontrolleri
runAuditChecks()

// Tam audit
runFullAudit()
```

## Kullanım Örnekleri

### Yeni Lead Ekleme (Form veya API)

```javascript
QueueRepo.enqueue({
  ingest_type: 'new_lead',
  payload: {
    first_name: 'Ahmet',
    last_name: 'Yılmaz',
    phone: '+905551234567',
    email: 'ahmet@example.com',
    deal_type: 'BUYER',
    property_type: 'Daire',
    notes: 'Kadıköy bölgesi araniyor'
  },
  source: 'website_form',
  idempotency_key: 'form_12345'
});
```

### LAND Deal Ekleme

```javascript
QueueRepo.enqueue({
  ingest_type: 'new_lead',
  payload: {
    first_name: 'Mehmet',
    last_name: 'Demir',
    phone: '+905559876543',
    deal_type: 'LAND',
    docs_required: 'tapu,imar,kadastro',
    parcel_present: 'yes',
    land_area: '5000m2',
    property_address: 'Silivri, Istanbul'
  },
  source: 'agent_referral',
  idempotency_key: 'ref_67890'
});
```

### Manuel Orchestrator Çalıştırma

```javascript
// Tek seferlik çalıştırma
ORCH_15MIN();
```

## Dosya Yapısı

```
/app/cb-os/
├── docs/
│   ├── ASAMA-1_DESIGN_PACK.md    # Tasarım dokümanı
│   └── ASAMA-3_TEST_PLAN.md      # Test planı
└── scripts/
    ├── appsscript.json           # Manifest
    ├── 01_Config.gs              # Konfigürasyon
    ├── 02_Constants.gs           # Sabitler
    ├── 03_SheetsRepo.gs          # Sheet repo
    ├── 04_QueueRepo.gs           # Queue repo
    ├── 05_ContactsRepo.gs        # Contacts repo
    ├── 06_DealsRepo.gs           # Deals repo
    ├── 07_TasksRepo.gs           # Tasks repo
    ├── 08_EventsRepo.gs          # Events repo
    ├── 09_DedupRepo.gs           # Dedup repo
    ├── 10_Normalizers.gs         # Normalizasyon
    ├── 11_Logging.gs             # Loglama
    ├── 12_Cursors.gs             # Cursor yönetimi
    ├── 13_IngestProcessJob.gs    # Ingest job
    ├── 14_DLQRetryJob.gs         # DLQ retry
    ├── 15_SmokeTests.gs          # Smoke testler
    ├── 16_AuditTools.gs          # Audit araçları
    ├── 17_Orchestrator.gs        # Orchestrator
    ├── 18_Automations.gs         # Lead skorlama ve otomasyonlar
    ├── 19_CrmPipeline.gs         # CRM + Pipeline (Contacts/Opportunities)
    ├── 20_WorkflowEngine.gs      # Workflow engine (WorkflowRules/WorkflowRuns)
    ├── 21_BookingSystem.gs       # Booking system (Forms + Calendar)
    ├── 22_LeadCapture.gs         # Lead capture (Forms -> CRM)
    ├── 23_ClientFiles.gs         # Client files provisioning (Drive/Docs/Tasks)
    ├── 24_ListingsAndCompliance.gs # Listings/Agreements/Consents/Conversions
    ├── 25_Dashboard.gs           # Dashboard (unified table + summary + charts)
    ├── 26_GapCoverage.gs         # Gap coverage helpers (ads/booking/email)
    └── 27_PartialCoverage.gs     # Partial coverage helpers (tenants/courses/KB)
```
Çağdaş Seçkin Tüfekci - Real Estate Agent

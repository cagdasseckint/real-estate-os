# Google Apps Script'e Nasıl Yüklenir? (CB-OS V1.3)

Bu doküman CB-OS kodlarını Google Apps Script (GAS) ortamına yüklemek ve canlıya almak için adım adım rehberdir.

## 1) Google Apps Script Projesi Oluşturma

1. [script.google.com](https://script.google.com) adresine gidin.
2. **Yeni Proje** oluşturun ve projeyi `CB-OS` olarak adlandırın.
3. Sol panelde **Proje Ayarları** → “`appsscript.json` dosyasını düzenleyicide göster” seçeneğini aktif edin.

## 2) Dosyaları Kopyalama

`/app/cb-os/scripts/` klasöründeki tüm `.gs` dosyalarını aynı isimlerle GAS içine ekleyin:

```
01_Config.gs
02_Constants.gs
03_SheetsRepo.gs
04_QueueRepo.gs
05_ContactsRepo.gs
06_DealsRepo.gs
07_TasksRepo.gs
08_EventsRepo.gs
09_DedupRepo.gs
10_Normalizers.gs
11_Logging.gs
12_Cursors.gs
13_IngestProcessJob.gs
14_DLQRetryJob.gs
15_SmokeTests.gs
16_AuditTools.gs
17_Orchestrator.gs
18_Automations.gs
19_CrmPipeline.gs
20_WorkflowEngine.gs
21_BookingSystem.gs
22_LeadCapture.gs
23_ClientFiles.gs
24_ListingsAndCompliance.gs
```

Ardından `scripts/appsscript.json` içeriğini GAS projesindeki `appsscript.json` dosyasına yapıştırın.

## 3) Google Sheets Bağlama

1. Yeni bir Google Sheets oluşturun.
2. İsimlendirme: **CB-OS Workbook**.
3. Apps Script proje ayarlarında bu Spreadsheet’i bağlayın.

## 4) Bootstrap (Tab ve Header Oluşturma)

Apps Script Editor’da aşağıdaki fonksiyonu çalıştırın:

```javascript
bootstrapSheets_();
```

Bu fonksiyon tüm gerekli tabları canonical header’larla oluşturur.

## 5) Trigger Kurulumu

### 5.1 Orchestrator (15 dakikalık)

1. Sol panelde saat ikonundan **Triggers** menüsünü açın.
2. **Yeni Trigger** ekleyin:
   - Fonksiyon: `ORCH_15MIN`
   - Olay kaynağı: **Time-driven**
   - Aralık: **15 dakika**

### 5.2 Form Submit Trigger

Google Form ile entegrasyon için **Form Submit** trigger ekleyin:

- Fonksiyon: `onFormSubmit`
- Olay kaynağı: **From spreadsheet**
- Olay türü: **On form submit**

Bu fonksiyon gerekli modüller aktifse (Workflow/Lead Capture/Booking) otomatik olarak yönlendirme yapar.

## 6) Konfigürasyon Notları

`CONFIG` tablosundaki bazı kritik anahtarlar:

- `ARCHIVE_ENABLED`: Operasyonel tabloların arşivlenmesini aç/kapat.
- `ARCHIVE_THRESHOLD_INGEST_QUEUE`: INGEST_QUEUE arşiv eşik değeri.
- `ARCHIVE_THRESHOLD_EVENTS`: EVENTS arşiv eşik değeri.
- `ARCHIVE_SPREADSHEET_ID`: Arşiv hedef spreadsheet ID (boş bırakılırsa otomatik oluşturulur).
- `CALENDAR_SYNC_LOOKBACK_DAYS / LOOKAHEAD_DAYS`: Takvim senkronizasyon penceresi.

## 7) CLASP ile Yükleme (Opsiyonel)

Eğer `clasp` kullanacaksanız:

```bash
npm install -g @google/clasp
clasp login
clasp create --title "CB-OS" --type standalone
clasp push
```

Not: `clasp push` öncesinde `scripts/` klasörünü GAS projesi ile eşleştirmeyi unutmayın.

---

Bu adımlar tamamlandığında CB-OS çalışır hale gelir. Opsiyonel modüller için `CONFIG` tablosundan ilgili bayrakları aktif edebilirsiniz.
Çağdaş Seçkin Tüfekci - Real Estate Agent

# CB-OS V1.4.0 - PRD (Product Requirements Document)

## Proje Özeti
CB-OS, Google ekosistemi üzerine inşa edilmiş Go High Level (GHL) benzeri bir iş yönetim sistemidir.

## Kullanıcı Personaları
- **Emlak Danışmanı:** Tek kişi operasyonu, lead takibi, pipeline yönetimi
- **Release Engineer:** Smoke test ve audit koşum yetkisi

## Temel Gereksinimler

### Core (Statik)
1. Google Sheets tabanlı SoT (Source of Truth)
2. Write-path tek kapı (INGEST_QUEUE)
3. Cursor-based gap-free processing
4. Idempotency kontrolü (DEDUP_KEYS)
5. DLQ mekanizması
6. Append-only EVENTS timeline
7. Pipeline: SELLER, BUYER, RENT, LAND
8. 15 dakikalık orchestration (ORCH_15MIN)

### Tamamlanan Özellikler (Ocak 2026)
- [x] AŞAMA-1: Design Pack
- [x] AŞAMA-2: 17 .gs dosyası + appsscript.json
- [x] AŞAMA-3: Test Plan + Evidence Pack şablonu
- [x] GREENFIELD bootstrap
- [x] Smoke test suite (6 test)
- [x] Audit checks (4 kontrol)
- [x] ops_log standardizasyonu

### V1.3.1 Hata Düzeltmeleri (Ocak 2026)
- [x] E-001 BLOCKER: 01_Config.gs lazy initialization eklendi (dosya yükleme sırası sorunu)
- [x] E-002 MAJOR: 15_SmokeTests.gs kullanılmayan değişken silindi
- [x] E-003 MAJOR: 16_AuditTools.gs risk_flags dedupe eklendi
- [x] E-004 MINOR: 12_Cursors.gs offset dokümantasyonu güncellendi
- [x] E-005 MINOR: 16_AuditTools.gs checked_by kontrolü sırası düzeltildi
- [x] Hard-rule compliance yorumları tüm kritik dosyalara eklendi

### Backlog (P0 - Kritik)
- [ ] Google Form onFormSubmit trigger entegrasyonu
- [ ] Calendar API gerçek senkronizasyonu
- [ ] Gmail API gerçek tarama

### Backlog (P1 - Yüksek)
- [x] Dashboard sheet'leri ve KPI hesaplamaları
- [ ] Google Tasks mirror entegrasyonu
- [ ] STAGE_AUTOMATIONS tablosu implementasyonu

### Backlog (P2 - Orta)
- [ ] AI prompt şablonları entegrasyonu (ChatGPT/Gemini)
- [ ] WhatsApp WABA draft modu
- [ ] Booking slot öneri sistemi

## Sonraki Adımlar
1. Scripts'leri Google Apps Script'e kopyala
2. Bootstrap çalıştır
3. Smoke testlerini koş
4. Trigger kur
5. Form entegrasyonu yap

## Tarihçe
- **Ocak 2026:** V1.4.0 iyileştirme paketi yayınlandı
- **Ocak 2026:** V1.3 CORE PACK oluşturuldu
Çağdaş Seçkin Tüfekci - Real Estate Agent
### V1.4.0 Sürüm Notları (Ocak 2026)
- [x] Otomasyon modülleri parçalara ayrıldı (18a-18f) ve doc listesi güncellendi
- [x] Queue/cursor tutarlılığı ve ops dashboard pending hesaplaması düzeltildi
- [x] Tasks Advanced Service adaptasyonu + onEdit trigger birleştirme yapıldı
- [x] Sheet caching + batch update iyileştirmeleri eklendi
- [x] HTML live dashboard panel eklendi

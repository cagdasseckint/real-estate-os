# real-estate-os

Real-estate-os, emlak danışmanları için Google ekosistemi üzerinde çalışan bir işletim sistemi/CRM çözümüdür. Sistem, Google Apps Script ile çalışan CB-OS çekirdeğine dayanır ve Google Sheets’i tek “Source of Truth” (SoT) olarak kullanır. CB-OS; lead alımı, pipeline yönetimi, görevler, otomasyonlar, audit/test süreçleri, doküman üretimi ve ops/raporlama gibi uçtan uca operasyonları kapsar.【F:app/cb-os/scripts/02_Constants.gs†L1-L210】【F:app/cb-os/scripts/17_Orchestrator.gs†L1-L218】

## Yapı

- `app/cb-os/`: Google Apps Script tabanlı CB-OS çekirdeği ve tüm fonksiyonlar.
- `app/cb-os/docs/`: Projenin tüm özellik ve çalışma mantığının tek dosyada toplandığı tam dokümantasyon.

## Başlıca Yetenekler (Özet)

- **Tek giriş kapısı (INGEST_QUEUE)**: Dış sistemlerden gelen tüm veriler kuyruk üzerinden işlenir; SoT tablolara direkt yazım yapılmaz.【F:app/cb-os/scripts/04_QueueRepo.gs†L1-L179】
- **Orkestrasyon**: `ORCH_15MIN` her 15 dakikada ingest, calendar sync, Gmail scan, guardrails ve DLQ retry job’larını çalıştırır.【F:app/cb-os/scripts/17_Orchestrator.gs†L1-L218】
- **Pipeline & Otomasyon**: Deal stage otomasyonları, lead scoring, follow-up sequence, Gmail draft ve doküman paketleme süreçleri mevcut.【F:app/cb-os/scripts/06_DealsRepo.gs†L1-L179】【F:app/cb-os/scripts/18_Automations.gs†L1-L707】
- **Audit/Test**: Appendix A uyumlu smoke test + audit kontrolleri ve evidence pack üretimi desteklenir.【F:app/cb-os/scripts/15_SmokeTests.gs†L1-L319】【F:app/cb-os/scripts/16_AuditTools.gs†L1-L329】

Detaylı mimari ve tüm modül açıklamaları için `app/cb-os/docs/` klasöründeki tek dokümana bakınız.
Çağdaş Seçkin Tüfekci - Real Estate Agent

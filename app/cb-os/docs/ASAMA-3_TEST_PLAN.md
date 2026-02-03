# CB-OS V1.0 - AŞAMA-3: TEST ETME
## Appendix A FINAL Uyumlu Test Plan & Evidence Pack

**Versiyon:** V1.0  
**Tarih:** Ocak 2026  
**Mod:** GREENFIELD  
**smoke_checked_by:** Real_Estate_Agent  

---

## 1. DİFF YALNIZ 2 YENİ DOSYA CHECKLİSTİ

| Kontrol | Durum | Açıklama |
|---------|-------|----------|
| CORE PACK üretiminde bu kontrol | **SKIPPED_BY_POLICY** | CORE PACK 17 dosya + appsscript.json içerir; diff kontrolü HARNESS-ONLY senaryolar içindir |
| HARNESS-ONLY entegrasyon senaryosu | N/A | Bu aşamada CORE PACK üretiliyor |

**Not:** `diff_only_two_new_files=SKIPPED_BY_POLICY` - CORE PACK için uygunsuzluk sayılmaz.

---

## 2. PREFLİGHT PROSEDÜRÜ

### 2.1 Preflight Kontrolleri

| # | Kontrol | Değer | Açıklama |
|---|---------|--------|----------|
| PF-1 | Sheet erişimi | SKIPPED_BY_POLICY | Runtime'da bootstrap ile oluşturulur |
| PF-2 | foreign_new_count | UNKNOWN | Kod çalıştığında Logger'a basılır |
| PF-3 | missing_deps | SKIPPED_BY_POLICY | GREENFIELD mod'da dependency yok |
| PF-4 | CONFIG sheet | AUTO_CREATED | bootstrapSheets_() ile oluşturulur |
| PF-5 | Timezone ayarı | Europe/Istanbul | DEFAULTS.TIMEZONE sabit |

### 2.2 Bootstrap Komutu

```javascript
// Apps Script Editor'da çalıştır:
function runBootstrap() {
  const result = bootstrapSheets_();
  Logger.log('BOOTSTRAP_RESULT | ' + JSON.stringify(result));
  return result;
}
```

### 2.3 Preflight Sonuç Alanları

Logger çıktısından alınacak:
- `foreign_new_count`: INGEST_QUEUE'da status="new" satır sayısı
- `missing_deps`: Eksik sheet/kolon listesi (GREENFIELD'da boş olmalı)

---

## 3. EVİDENCE PACK ŞABLONU

```
============================================================
EVIDENCE PACK - CB-OS V1.0
============================================================
Generated at: <Logger'dan kopyala>
Mode: GREENFIELD
------------------------------------------------------------

[PREFLIGHT]
foreign_new_count: <Logger EVIDENCE satırından>
missing_deps: SKIPPED_BY_POLICY

[SMOKE TEST]
smoke_checked_by: Real_Estate_Agent
test_count: 6
passed: <Logger SMOKE_SUMMARY'den>
failed: <Logger SMOKE_SUMMARY'den>
risk_flags: <Logger SMOKE_SUMMARY'den veya "-">

[SMOKE LOGGER RAW]
<runSmokeTests() Logger çıktısının tamamını kopyala>

[AUDIT]
NNO-1: <PASS/FAIL - Logger'dan>
checked_by: Real_Estate_Agent
risk_flags: <Logger ops_log satırından>

[AUDIT OPS_LOG RAW]
<runAuditChecks() sonundaki ops_log satırını kopyala>
Format: YYYY-MM-DD HH:mm | ops_log | scope=audit_only | ...

[SHEET EVIDENCE]
<Logger'daki tüm "EVIDENCE | ..." satırlarını kopyala>

============================================================
END OF EVIDENCE PACK
============================================================
```

---

## 4. DETERMİNİSTİK PASS/FAIL KARAR MATRİSİ

### 4.1 Smoke Test Kriterleri

| Test | Logger Satırı | PASS Koşulu | FAIL Koşulu |
|------|---------------|-------------|-------------|
| deterministic_enqueue_ordering | `SMOKE_TEST \| deterministic_enqueue_ordering \| PASS/FAIL` | A.received_at < B.received_at | A.received_at >= B.received_at |
| idempotency_dedup | `SMOKE_TEST \| idempotency_dedup \| PASS/FAIL` | First=true, Second=false | Aksi durum |
| dlq_insert_col2_ingest_id | `SMOKE_TEST \| dlq_insert_col2_ingest_id \| PASS/FAIL` | DLQ'da ingest_id bulundu | ingest_id bulunamadı |
| gap_free_cursor | `SMOKE_TEST \| gap_free_cursor \| PASS/FAIL` | notes == AUDIT_CONTRACT_STRING | Eşleşme yok |
| land_payload_normalization | `SMOKE_TEST \| land_payload_normalization \| PASS/FAIL` | deal_type=LAND, docs_required/parcel doğru | Normalizasyon hatası |
| events_append_only | `SMOKE_TEST \| events_append_only \| PASS/FAIL` | Event eklendi, update/delete yok | Aksi durum |

### 4.2 Audit Check Kriterleri

| Check | Kriter | PASS Koşulu | FAIL Koşulu |
|-------|--------|-------------|-------------|
| received_at_format | Format: yyyy-MM-dd'T'HH:mm:ss+XX:XX | Tüm timestamp'lar format uyumlu | 1+ invalid format |
| received_at_offset | Offset tutarlılığı | Tek offset (orn. +03:00) | Birden fazla offset |
| cursor_order | cursor_after >= cursor_before | Tüm başarılı run'larda geçerli | 1+ ihlal |
| audit_string_exact | notes == "stopped_on_first_failure (gap-free cursor)" | Failure run'larda EXACT match | String farklı |

### 4.3 NNO-1 Kararı

```
NNO-1 = PASS if:
  - Tüm audit check'ler PASS
  - VEYA yalnızca PASS+RISK durumları var

NNO-1 = FAIL if:
  - Herhangi bir audit check FAIL
```

### 4.4 Risk Flags Değerlendirmesi

| Risk Flag | Anlamı | PASS+RISK Mi? |
|-----------|--------|---------------|
| DLQ_INGEST_ID_COL2_ASSUMED | DLQ header varsayımı kullanıldı | Evet |
| DLQ_HEADER_MISMATCH | DLQ kolon sırası farklı | Evet (alias-map çalışıyorsa) |
| JOBRUN_NOTES_FALLBACK_LASTCOL | JOB_RUN_LOG notes için son kolon kullanıldı | Evet |
| JOBRUN_MESSAGE_USED | message alanı notes yerine kullanıldı | Evet |
| CHECKED_BY_NO_HANDLE | checked_by handle yok | Evet |
| DEALS_LATEST_ROW_BY_ROWINDEX | Deal güncelleme row index ile | Evet |
| CONTACTS_HEADER_MISMATCH | CONTACTS header farklı | Alias-map çalışıyorsa PASS+RISK |
| DEALS_HEADER_MISMATCH | DEALS header farklı | Alias-map çalışıyorsa PASS+RISK |

---

## 5. FAIL TEŞHİS HARİTASI

### 5.1 Smoke Test FAIL Durumları

| Test | FAIL Sebebi | Önerilen Aksiyon | Hotfix Tipi |
|------|-------------|------------------|-------------|
| deterministic_enqueue_ordering | Sleep yetersiz veya timestamp reuse | Sleep süresini 1100ms+ yap | hotfix_code |
| idempotency_dedup | LockService sorunu | Lock timeout artır | hotfix_code |
| dlq_insert_col2_ingest_id | DLQ schema yanlış | CANONICAL_HEADERS.DLQ kontrol et | hotfix_doc |
| gap_free_cursor | Audit string farklı | AUDIT_CONTRACT_STRING sabitini doğrula | hotfix_code |
| land_payload_normalization | Normalizer bug | normalizeLandPayload_ kontrol et | hotfix_code |
| events_append_only | EventsRepo'ya update/delete eklendi | EventsRepo'dan kaldır | hotfix_code |

### 5.2 Audit Check FAIL Durumları

| Check | FAIL Sebebi | Önerilen Aksiyon | OK-3 Kapsamında Mı? |
|-------|-------------|------------------|--------------------|
| received_at_format | nowIso_ hatalı format | nowIso_ fonksiyonunu düzelt | EVET - Tek seferde hotfix_doc |
| received_at_offset | Farklı timezone'lardan veri | Timezone sabitlemesi | EVET - Tek seferde hotfix_doc |
| cursor_order | cursor_after < cursor_before | Gap-free mantığını kontrol et | EVET - Tek seferde hotfix_doc |
| audit_string_exact | String farklı | AUDIT_CONTRACT_STRING kullanımı | EVET - Tek seferde hotfix_doc |

### 5.3 OK-3 Governance Eşiği

**Tek seferde bile FAIL olursa hotfix_doc açılır:**
- received_at_offset=FAIL
- audit_string_exact=FAIL
- received_at_format=FAIL
- cursor_order=FAIL

**7 gün içinde tekrar FAIL olursa:**
- hotfix_code değerlendirmesi (Appendix A dışı governance artefaktı)

---

## 6. GOVERNANCE NOTU

> **Appendix A yalnız kanıt üretir; aksiyon kaydı Appendix A dışı governance artefaktıdır.**

### 6.1 Rol ve Yetki

| Rol | Smoke Koşum Yetkisi | Audit Koşum Yetkisi |
|-----|---------------------|---------------------|
| Release Engineer | EVET (Prod) | EVET |
| On-Call | EVET (Prod) | EVET |
| Developer | EVET (Dev/Test) | EVET |
| Operatör | HAYIR | HAYIR (okuma izni var) |

### 6.2 Aksiyon Artefaktları (Appendix A Dışı)

- **hotfix_doc:** Dokümantasyon düzeltmesi gerektiğinde açılır
- **hotfix_code:** Kod düzeltmesi gerektiğinde açılır
- **incident_report:** Kritik FAIL durumlarında

---

## 7. TEST KOSTURMA PROSEDÜRÜ

### 7.1 Adım Adım Koşum

```javascript
// ADIM 1: Bootstrap (ilk kez)
runBootstrap();

// ADIM 2: Smoke testleri çalıştır
runSmokeTests();

// ADIM 3: Audit kontrolleri çalıştır
runAuditChecks();

// ADIM 4: Evidence pack oluştur
generateEvidencePack();

// VEYA: Tümünü tek seferde
runFullAudit();
```

### 7.2 Logger Çıktısını Alma

1. Apps Script Editor'da fonksiyonu çalıştır
2. View -> Logs menüsünden Logger çıktısını gör
3. Tüm çıktıyı seç ve kopyala
4. Evidence Pack şablonuna yapıştır

### 7.3 Örnek Logger Çıktısı

```
========== SMOKE TEST SUITE START ==========
SMOKE_TEST | Bootstrap: created=12, existing=0
SMOKE_TEST | deterministic_enqueue_ordering | START
SMOKE_TEST | deterministic_enqueue_ordering | A enqueued: 2026-01-15T14:30:00+03:00
SMOKE_TEST | deterministic_enqueue_ordering | B enqueued: 2026-01-15T14:30:01+03:00
EVIDENCE | DETERMINISM | A=2026-01-15T14:30:00+03:00 | B=2026-01-15T14:30:01+03:00 | A<B=true
SMOKE_TEST | deterministic_enqueue_ordering | PASS | A=2026-01-15T14:30:00+03:00, B=2026-01-15T14:30:01+03:00, A<B=true
...
========== SMOKE TEST SUITE END ==========
SMOKE_SUMMARY | passed=6 | failed=0 | risk_flags=- | checked_by=Real_Estate_Agent
========== AUDIT CHECKS START ==========
...
========== AUDIT CHECKS END ==========
2026-01-15 14:35 | ops_log | scope=audit_only | idempotency_key=- | NNO-1=PASS | checked_by=Real_Estate_Agent | risk_flags=- | notes=Audit run completed. Checks: 4, Passed: 4
```

---

## 8. RİSK_FLAGS STANDARDI

### 8.1 Format

```
risk_flags=<CSV> veya risk_flags=-
```

Örnekler:
- `risk_flags=-` (risk yok)
- `risk_flags=DLQ_HEADER_MISMATCH` (tek risk)
- `risk_flags=DLQ_HEADER_MISMATCH,CHECKED_BY_NO_HANDLE` (birden fazla)

### 8.2 Allowed Risk Flags (V1.0)

1. `DLQ_INGEST_ID_COL2_ASSUMED`
2. `DLQ_HEADER_MISMATCH`
3. `JOBRUN_NOTES_FALLBACK_LASTCOL`
4. `JOBRUN_MESSAGE_USED`
5. `CHECKED_BY_NO_HANDLE`
6. `DEALS_LATEST_ROW_BY_ROWINDEX`
7. `CONTACTS_HEADER_MISMATCH`
8. `DEALS_HEADER_MISMATCH`

---

## 9. OPERASYONEL KARARLAR ÖZETİ (OK-1/2/3)

### OK-1: DLQ Risk Flag Politikası
- `DLQ_INGEST_ID_COL2_ASSUMED` her koşumda zorunlu değil
- Header mismatch varsa `DLQ_HEADER_MISMATCH` yaz
- Kod deterministik alias-map ile çalışıyorsa PASS+RISK

### OK-2: Smoke Koşum Yetkisi
- Prod ortamında yalnızca Release Engineer / On-Call
- `smoke_checked_by` ZORUNLU alan

### OK-3: Audit FAIL Governance
- Tek seferde FAIL → hotfix_doc aç
- 7 gün içinde tekrar FAIL → hotfix_code değerlendir
- Appendix A dışı governance artefaktı

---

*AŞAMA-3 SONU - Test Plan & Evidence Pack tamamlandı.*

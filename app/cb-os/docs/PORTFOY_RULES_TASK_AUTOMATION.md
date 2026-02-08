# Portföy Kuralları için CB-OS Task + Automation Şeması

Bu doküman, “portföy alındığında yapılması gerekenler” listesini CB-OS içinde **task + automation** olarak nasıl modele edeceğimizi ve hangi tablolara nasıl eklenmesi gerektiğini açıklar.

> Not: Bu şema CB-OS’un mevcut SoT + Automation + Workflow yaklaşımına uyacak şekilde hazırlanmıştır. Gerekli tablolar **CONFIG**, **TASK_TEMPLATES**, **STAGE_AUTOMATIONS**, **FOLLOWUP_SEQUENCES**, **EMAIL_DRAFTS** ve **DOC_TEMPLATES/DOC_PACKAGES** üzerine kuruludur.

---

## 1) Genel Yaklaşım

### 1.1 Hedef
- Portföy alındığında otomatik olarak **görev seti** oluşturmak.
- Zaman bazlı işlerin (ilk 10 gün, 20 günde bir, haftalık aramalar vb.) **otomasyon** ile planlanmasını sağlamak.
- Onay, raporlama, belge ve ilan süreçlerini **tek bir kontrol listesi** mantığında izlemek.

### 1.2 Varsayımlar
- Portföy “deal” olarak sisteme giriyor (DEALS).
- Portföy türü **SELLER/BUYER/RENT/LAND** gibi deal tipleriyle eşleşiyor.
- Portföy alımı **stage değişimi** (ör. `STAGE=ACQUIRED` veya `STAGE=NEW_LISTING`) ile temsil ediliyor.

> Eğer mevcut pipeline stage’lerde “portföy alındı” karşılığı yoksa, **STAGE_AUTOMATIONS** için yeni bir stage adı eklenmelidir.

---

## 2) Kullanılacak Tablolar ve Rolü

### 2.1 TASK_TEMPLATES (Görev Şablonları)
Portföy alındığında otomatik açılacak tüm görevler burada tanımlanır.

**Zorunlu/önerilen alanlar (örnek):**
- `template_key`
- `title`
- `description`
- `due_offset_days`
- `owner_role`
- `requires_approval`
- `channel` (email, phone, onsite, admin)
- `priority` (high/medium/low)
- `tags` (portfoy, ilan, raporlama gibi)

### 2.2 STAGE_AUTOMATIONS (Stage → Task Otomasyonları)
Portföy “alındı” stage’ine girince hangi görevlerin açılacağını ve hangi otomasyonların tetikleneceğini burada tanımlayın.

### 2.3 FOLLOWUP_SEQUENCES (Zaman Bazlı Takip)
- 10 gün sonrası / 20 günde bir raporlama
- Haftalık arama
- Sosyal medya paylaşım döngüsü

### 2.4 EMAIL_DRAFTS / EMAIL_TEMPLATES (Raporlama)
Raporlama ve bilgilendirme e-mailleri burada draft olarak planlanır.

### 2.5 DOC_TEMPLATES / DOC_PACKAGES (Yetki Belgesi, Sunum Dosyası)
- Yetki belgesi
- Sunum dosyası gönderimi
- Tapu fotokopisi gibi evraklar

### 2.6 OPS_DASHBOARD / CUSTOM_CHECKLIST (Opsiyonel)
- “Portföy checklist tamamlandı mı?” gibi KPI için özel özet tablosu oluşturulabilir.

---

## 3) Kurallar → Görev/Automation Eşlemesi (Net Harita)

Aşağıdaki tablo, “portföy alındığında yapılması gerekenler” maddelerini hangi şablonla ve hangi otomasyonla karşılayacağınızı netleştirir.

| Kural | Task Template | Stage Automation | Follow-up/Email |
|---|---|---|---|
| Yetki belgesi + intranet formu | PORTF_YETKI_FORM | ACQUIRED → CREATE_TASK | - |
| Tapu fotokopisi | PORTF_TAPU_COPY | ACQUIRED → CREATE_TASK | - |
| Tapu imzası / vekalet | PORTF_TAPU_SIGNATURE | ACQUIRED → CREATE_TASK | - |
| 3 gün içinde ilan yayınlama | PORTF_LISTING_PUBLISH | ACQUIRED → CREATE_TASK | - |
| İlan içerik kontrolü | PORTF_LISTING_CONTENT | ACQUIRED → CREATE_TASK | - |
| Branda + fotoğraf | PORTF_BRANDA | ACQUIRED → CREATE_TASK | - |
| 1000 broşür dağıtımı | PORTF_BROCHURE | ACQUIRED → CREATE_TASK | - |
| Gazete ilanı | PORTF_NEWSPAPER | ACQUIRED → CREATE_TASK | - |
| Fotoğraf/video/drone çekimi | PORTF_MEDIA_SHOOT | ACQUIRED → CREATE_TASK | - |
| RPA + bcc/cc mail | PORTF_RPA | ACQUIRED → CREATE_TASK | REPORT_10D |
| Sosyal medya paylaşımı (CB.COM) | PORTF_SOCIAL_SHARE | ACQUIRED → CREATE_TASK | (opsiyonel) SOCIAL_LOOP |
| Haftalık bilgilendirme araması | PORTF_WEEKLY_CALL | ACQUIRED → CREATE_TASK | WEEKLY_CALL_LOOP |
| Sunum dosyası gönderimi | PORTF_PRESENTATION_SEND | ACQUIRED → CREATE_TASK | - |
| Baskı öncesi onay | PORTF_PRINT_APPROVAL | ACQUIRED → CREATE_TASK | - |

---

## 4) Task Şablonları (TASK_TEMPLATES)

Aşağıda örnek **task template** seti verilmiştir. Bu şablonlar `TASK_TEMPLATES` tablosuna eklenmelidir.

| template_key | title | description | due_offset_days | owner_role | requires_approval | channel |
|---|---|---|---|---|---|---|
| PORTF_YETKI_FORM | Yetki belgesi + intranet formu tamamla | Yetki belgesi ve intranet formu eksiksiz doldurulacak | 0 | agent | no | admin |
| PORTF_TAPU_COPY | Tapu fotokopisi al | Tapu fotokopisi sisteme yüklenecek | 1 | agent | no | admin |
| PORTF_TAPU_SIGNATURE | Tapu sahibi imzası / vekalet al | İmza veya vekalet örneği temin edilecek | 2 | agent | no | admin |
| PORTF_LISTING_PUBLISH | İlanları 3 gün içinde yayınla | CB, Sahibinden, Hürriyet, Zingat, Emlakjet | 3 | agent | no | marketing |
| PORTF_LISTING_CONTENT | İlan içerik kontrolü | Başlık küçük harf, 10+ cümle açıklama, çevre/ulaşım bilgisi | 3 | agent | yes | marketing |
| PORTF_BRANDA | Branda as ve fotoğrafı ilet | Branda fotoğrafı + açık adres | 5 | agent | yes | onsite |
| PORTF_BROCHURE | 1000 adet broşür dağıt | “DUYDUNUZ MU?” broşürü 10 gün içinde dağıtılacak | 10 | agent | no | marketing |
| PORTF_NEWSPAPER | Gazete ilanı ver | 10 gün içinde gazeteye ilan | 10 | agent | no | marketing |
| PORTF_MEDIA_SHOOT | Fotoğraf/video/drone çekimi | 10 gün içinde çekim yapılacak | 10 | agent | no | media |
| PORTF_RPA | RPA yap ve mail gönder | Sevgi Hançer’e bbc-cc mail | 2 | admin | no | admin |
| PORTF_SOCIAL_SHARE | Sosyal medya paylaşımı | CB.COM linki ile paylaşım | 3 | agent | no | marketing |
| PORTF_WEEKLY_CALL | Haftalık bilgilendirme araması | Cuma/Cumartesi arama yapılacak | 7 | agent | no | phone |
| PORTF_PRESENTATION_SEND | Sunum dosyası gönder | Yetki alan kişiye sunum dosyası e-mail/WhatsApp | 3 | agent | no | email |
| PORTF_PRINT_APPROVAL | Branda/afiş/broşür onay al | Baskı öncesi ofis direktörü onayı | 1 | agent | yes | admin |

> `requires_approval=yes` olan görevler için Workflow Engine onayı önerilir.

### 4.1 TASK_TEMPLATES Örnek CSV (Kopyala/Yapıştır)
CSV kopyalamak daha hızlı ise aşağıdaki örnek satırları kullanabilirsiniz. Kolonlar, kendi sheet şemanıza göre uyarlanmalıdır.

```csv
template_key,title,description,due_offset_days,owner_role,requires_approval,channel,priority,tags
PORTF_YETKI_FORM,Yetki belgesi + intranet formu tamamla,Yetki belgesi ve intranet formu eksiksiz doldurulacak,0,agent,no,admin,high,portfoy;belge
PORTF_TAPU_COPY,Tapu fotokopisi al,Tapu fotokopisi sisteme yüklenecek,1,agent,no,admin,high,portfoy;belge
PORTF_TAPU_SIGNATURE,Tapu sahibi imzası / vekalet al,İmza veya vekalet örneği temin edilecek,2,agent,no,admin,high,portfoy;belge
PORTF_LISTING_PUBLISH,İlanları 3 gün içinde yayınla,CB/Sahibinden/Hürriyet/Zingat/Emlakjet,3,agent,no,marketing,high,ilan;pazarlama
PORTF_LISTING_CONTENT,İlan içerik kontrolü,Başlık küçük harf + 10+ cümle açıklama + çevre/ulaşım,3,agent,yes,marketing,high,ilan;kontrol
PORTF_BRANDA,Branda as ve fotoğrafı ilet,Branda fotoğrafı + açık adres,5,agent,yes,onsite,medium,saha;onay
PORTF_BROCHURE,1000 adet broşür dağıt,“DUYDUNUZ MU?” broşürü 10 gün içinde dağıtılacak,10,agent,no,marketing,medium,broşür;dağıtım
PORTF_NEWSPAPER,Gazete ilanı ver,10 gün içinde gazeteye ilan,10,agent,no,marketing,medium,ilan;gazete
PORTF_MEDIA_SHOOT,Fotoğraf/video/drone çekimi,10 gün içinde çekim yapılacak,10,agent,no,media,medium,media;çekim
PORTF_RPA,RPA yap ve mail gönder,Sevgi Hançer’e bbc-cc mail,2,admin,no,admin,high,raporlama;idari
PORTF_SOCIAL_SHARE,Sosyal medya paylaşımı,CB.COM linki ile paylaşım,3,agent,no,marketing,medium,sosyal;paylaşım
PORTF_WEEKLY_CALL,Haftalık bilgilendirme araması,Cuma/Cumartesi arama yapılacak,7,agent,no,phone,medium,arama;rapor
PORTF_PRESENTATION_SEND,Sunum dosyası gönder,Yetki alan kişiye sunum dosyası e-mail/WhatsApp,3,agent,no,email,medium,sunum;bilgilendirme
PORTF_PRINT_APPROVAL,Branda/afiş/broşür onay al,Baskı öncesi ofis direktörü onayı,1,agent,yes,admin,high,onay;baskı
```

---

## 5) Stage Automation (STAGE_AUTOMATIONS)

Portföy alındı stage’ine girildiğinde tüm task şablonlarını tetiklemek için `STAGE_AUTOMATIONS` tablosuna aşağıdaki gibi bir satır ekleyin:

| stage | action | template_key | enabled |
|---|---|---|---|
| ACQUIRED | CREATE_TASK | PORTF_YETKI_FORM | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_TAPU_COPY | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_TAPU_SIGNATURE | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_LISTING_PUBLISH | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_LISTING_CONTENT | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_BRANDA | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_BROCHURE | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_NEWSPAPER | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_MEDIA_SHOOT | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_RPA | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_SOCIAL_SHARE | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_WEEKLY_CALL | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_PRESENTATION_SEND | TRUE |
| ACQUIRED | CREATE_TASK | PORTF_PRINT_APPROVAL | TRUE |

> Stage adı farklıysa `ACQUIRED` yerine mevcut pipeline stage’i kullanılmalıdır.

### 5.1 STAGE_AUTOMATIONS Örnek CSV
```csv
stage,action,template_key,enabled
ACQUIRED,CREATE_TASK,PORTF_YETKI_FORM,TRUE
ACQUIRED,CREATE_TASK,PORTF_TAPU_COPY,TRUE
ACQUIRED,CREATE_TASK,PORTF_TAPU_SIGNATURE,TRUE
ACQUIRED,CREATE_TASK,PORTF_LISTING_PUBLISH,TRUE
ACQUIRED,CREATE_TASK,PORTF_LISTING_CONTENT,TRUE
ACQUIRED,CREATE_TASK,PORTF_BRANDA,TRUE
ACQUIRED,CREATE_TASK,PORTF_BROCHURE,TRUE
ACQUIRED,CREATE_TASK,PORTF_NEWSPAPER,TRUE
ACQUIRED,CREATE_TASK,PORTF_MEDIA_SHOOT,TRUE
ACQUIRED,CREATE_TASK,PORTF_RPA,TRUE
ACQUIRED,CREATE_TASK,PORTF_SOCIAL_SHARE,TRUE
ACQUIRED,CREATE_TASK,PORTF_WEEKLY_CALL,TRUE
ACQUIRED,CREATE_TASK,PORTF_PRESENTATION_SEND,TRUE
ACQUIRED,CREATE_TASK,PORTF_PRINT_APPROVAL,TRUE
```

---

## 6) Follow-up Sequences (FOLLOWUP_SEQUENCES)

### 6.1 10 Gün + 20 Gün Raporlama
`FOLLOWUP_SEQUENCES` tablosuna “PORTF_REPORTING” isimli bir seri eklenebilir:

| sequence_key | step_day | action | template_key | channel |
|---|---|---|---|---|
| PORTF_REPORTING | 10 | EMAIL_DRAFT | REPORT_10D | email |
| PORTF_REPORTING | 30 | EMAIL_DRAFT | REPORT_30D | email |
| PORTF_REPORTING | 50 | EMAIL_DRAFT | REPORT_50D | email |

> 20 gün aralıklı raporlama için 10. günden sonra +20 gün adımları eklenir.

### 6.2 Haftalık Arama Döngüsü
`FOLLOWUP_SEQUENCES` tablosunda haftalık “PORTF_WEEKLY_CALL” döngüsü için her 7 gün adım eklenebilir.

### 6.3 FOLLOWUP_SEQUENCES Örnek CSV
```csv
sequence_key,step_day,action,template_key,channel
PORTF_REPORTING,10,EMAIL_DRAFT,REPORT_10D,email
PORTF_REPORTING,30,EMAIL_DRAFT,REPORT_30D,email
PORTF_REPORTING,50,EMAIL_DRAFT,REPORT_50D,email
WEEKLY_CALL_LOOP,7,CREATE_TASK,PORTF_WEEKLY_CALL,phone
SOCIAL_LOOP,3,CREATE_TASK,PORTF_SOCIAL_SHARE,marketing
```

---

## 7) Email Drafts (EMAIL_DRAFTS)

### 7.1 10 Günlük Rapor
- İçerik: arayanlar, portföyü görenlerin genel fikirleri, teklifler
- “WhatsApp’tan teklif yapılmaması” notu email şablonuna eklenebilir

### 7.2 20 Gün Periyodik Rapor
- Aynı format tekrar eder

> Bu raporlar `EMAIL_DRAFTS` tablosuna otomatik düşürülür, ardından Gmail Draft’a çevrilir.

### 7.3 EMAIL_DRAFTS Örnek Şablon (Öneri)
```text
template_key: REPORT_10D
subject: Portföy Bilgilendirme Raporu (İlk 10 Gün) - {{deal_title}}
body:
Merhaba {{owner_name}},

Portföyünüz için ilk 10 gün içinde yapılan çalışmaların özeti:
- Arayanlar: {{inbound_calls}}
- Portföyü görenlerin genel fikirleri: {{viewer_feedback}}
- Teklifler: {{offers_summary}}

Not: Tekliflerin WhatsApp üzerinden yapılmaması, e-posta ya da yüz yüze iletilmesi esastır.

Saygılarımızla,
{{agent_name}}
```

---

## 8) Doküman Paketleri (DOC_TEMPLATES / DOC_PACKAGES)

### 8.1 Yetki Belgesi ve Sunum Dosyaları
- `DOC_TEMPLATES` içine “yetki belgesi” ve “sunum dosyası” şablonları eklenmelidir.
- `DOC_PACKAGES` içinde portföy alımında otomatik oluşturulacak doküman seti tanımlanır.

### 8.2 DOC_PACKAGES Örnek Set
```text
package_key: PORTFOLIO_INTAKE
items:
  - DOC_TEMPLATE: YETKI_BELGESI
  - DOC_TEMPLATE: SUNUM_DOSYASI
  - FILE_UPLOAD: TAPU_FOTOKOPI
```

---

## 9) Ops Dashboard / Checklist (Opsiyonel)

Portföy checklist tamamlanma oranını izlemek için yeni bir helper tablo önerilir:

**PORTFOLIO_CHECKLIST**
- `deal_id`
- `task_key`
- `completed_at`
- `status`

Bu tablo **dashboard** ya da **ops** sayfalarında özetlenebilir.

---

## 10) Uygulama Adımları (Özet)

1. `TASK_TEMPLATES` tablosuna portföy görev şablonlarını ekle.
2. `STAGE_AUTOMATIONS` tablosuna portföy stage → task tetikleyici satırları ekle.
3. `FOLLOWUP_SEQUENCES` tablosunda raporlama + haftalık arama döngülerini tanımla.
4. `EMAIL_DRAFTS` şablonlarını rapor formatı ile oluştur.
5. `DOC_TEMPLATES / DOC_PACKAGES` içine yetki belgesi + sunum dosyası şablonlarını ekle.
6. (Opsiyonel) `PORTFOLIO_CHECKLIST` tablosu ve dashboard özetini kur.

---

## 11) Ek Notlar
- “Tekliflerin WhatsApp’tan yapılmaması” kuralı, **email şablonlarında** hatırlatma olarak yer almalıdır.
- “Sosyal medyada sadece CB.COM linki paylaşımı” kuralı, **task açıklamasında** ve rapor şablonlarında net belirtilmelidir.
- “Branda/afiş/broşür onayı” için `requires_approval=yes` ve Workflow Engine ile onay kurgulanmalıdır.

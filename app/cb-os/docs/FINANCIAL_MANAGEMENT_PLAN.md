# Finans Yönetimi ve Hedef Takip Tablosu (Plan)

Bu doküman, gayrimenkul danışmanı için **kapsamlı finans yönetimi + hedef takip** yapısını tasarlar. Tasarım **Sheets tabanlı**, **ölçeklenebilir**, **dashboard’a bağlanabilir** ve **veri girişleri + formül hesapları** olarak iki katmanlıdır. İstenen kur verileri, muaccel tarihli nominal/reel kayıp analizi ve gelir vergisi dilimleri dahil edilmiştir.

> Not: Bu plan onaylandıktan sonra Sheets/GAS entegrasyonu ve dashboard metrikleri koda/şemaya uygulanacaktır.

---

## 1) Amaç ve Kapsam

**Amaçlar**
- Ciro ve paylaşımlar (ofis / CBTR / danışman) otomatik hesaplansın.
- KDV (%20) ve gelir vergisi (2026 tahmini dilimler) dikkate alınsın.
- Aylık ve yıllık **ciro hedefi**, **vergiler düşülmüş ciro hedefi**, **giderler düşülmüş ciro hedefi**, **net kâr hedefi** net şekilde izlensin.
- Kur (açılış/kapanış) canlı verisi GoogleFinance ile alınsın.
- Muaccel tarihe göre nominal & reel kayıp tablosu oluşturulsun ve dashboard’a yansısın.

**Kapsam**
- 1 adet plan sekmesi (Yıllık)
- 1 adet aylık takip sekmesi
- 1 adet yıllık özet sekmesi
- 1 adet işlem (transaction) sekmesi (satış bazlı)
- 1 adet vergi hesap sekmesi (gelir vergisi dilimleri)
- 1 adet kur ve risk gölge belirleyicileri sekmesi
- 1 adet muaccel tarih / nominal–reel kayıp sekmesi
- Dashboard metrikleri için helper/agregasyon sekmeleri

---

## 2) Genel İş Kuralı ve Formül Mantığı

### 2.1 İşlem Cirosu ve Paylaşım
- İşlem başına **hizmet bedeli oranı**: %2 (alıcı) + %2 (satıcı) = toplam %4 brüt hizmet bedeli
- KDV: %20 (hizmet bedeline uygulanır)
- Toplam Net Ciro = (Hizmet Bedeli * (1 + KDV))
- Paylaşım oranları:
  - Ofis: %45,5
  - CBTR: %9
  - Danışman: %45,5

> Not: İstenirse tek taraf / çift taraf senaryoları ayrı “işlem tipi” olarak tutulabilir.

### 2.2 Vergiler
- **KDV**: işlem bazında.
- **Gelir Vergisi (Yıllık, Mart ödeme):**
  - 190.000 TL’ye kadar: %15
  - 400.000 TL’nin 190.000 TL’si için 28.500 TL, fazlası %20
  - 1.500.000 TL’nin 400.000 TL’si için 70.500 TL, fazlası %27
  - 5.300.000 TL’nin 1.500.000 TL’si için 367.500 TL, fazlası %35
  - 5.300.000 TL’den fazlasının 5.300.000 TL’si için 1.697.500 TL, fazlası %40

> Vergi hesabı danışmanın **yıllık gelir vergisi matrahına** göre hesaplanır.

### 2.3 Hedef Metrikleri (Hesaplama Mantığı)
- **Brüt Ciro Hedefi:** Hizmet bedeli + KDV dahil toplam.
- **Danışman Net Ciro:** Brüt cirodan ofis + CBTR payları düşülmüş tutar.
- **Vergiler Düşülmüş Ciro Hedefi:** Danışman net cirodan yıllık gelir vergisi düşüldükten sonra kalan.
- **Giderler Düşülmüş Ciro Hedefi:** Vergi sonrası tutardan yaşam + işletme giderleri düşülmüş tutar.
- **Net Kâr Hedefi:** Vergi sonrası + gider sonrası kalan nihai hedef.

---

## 3) Sekme Tasarımı (Sheets)

### Sekme A — **PARAMS**
Sabit oranlar/varsayılanlar + vergi dilimleri

| Hücre | Alan | Değer |
|---|---|---|
| A1 | office_share_rate | 0,455 |
| A2 | cbtr_share_rate | 0,09 |
| A3 | default_service_fee_rate | 0,02 |
| A4 | vat_rate | 0,20 |
| A5 | vat_included | FALSE |
| A6 | share_tax_rate | 0,20 |
| A7 | listing_to_sale_conv_rate | 0,30 |
| A8 | appointment_to_listing_conv_rate | 0,20 |
| A9 | year_tax_threshold_1 | 190000 |
| A10 | year_tax_threshold_2 | 400000 |
| A11 | year_tax_threshold_3 | 1500000 |
| A12 | year_tax_threshold_4 | 5300000 |
| A13 | tax_base_1 | 28500 |
| A14 | tax_base_2 | 70500 |
| A15 | tax_base_3 | 367500 |
| A16 | tax_base_4 | 1697500 |

> Vergi oranları ayrı bir tablo halinde (ör. PARAMS_TAX) da tutulabilir.

---

### Sekme B — **PLAN** (Yıllık hedef planı – 1 satır = 1 yıl)

**Girdi Alanları**
| Sütun | Alan |
|---|---|
| A | Yıl |
| B | Danışman |
| C | Yıllık Ciro Hedefi (TL) |
| D | Ortalama Satış Fiyatı (TL) |
| E | Hizmet Bedeli Oranı (örn 0,02) |
| F | Ofis Payı Oranı (örn 0,455) |
| G | CBTR Payı Oranı (örn 0,09) |
| H | Yıllık Yaşam Maliyeti (TL) |
| I | İşletme Maliyeti (TL) |
| J | Yetki→Satış Dönüşüm |
| K | Randevu→Yetki Dönüşüm |

**Formül Alanları**
| Sütun | Alan | Formül |
|---|---|---|
| L | Ofis/Merkez Paylaşımı (TL) | `=C2*(F2+G2)` |
| M | Yıllık Net Ciro (TL) | `=C2*(1-(F2+G2))` |
| N | Yıllık Kar Hedefi (TL) | `=M2-H2-I2` |
| O | İşlem Başı Ortalama Hizmet Bedeli Geliri (TL) | `=D2*E2*(1-(F2+G2))` |
| P | Yıllık Satış Adedi Hedefi | `=C2/O2` |
| Q | Aylık Satış Adedi Hedefi | `=P2/12` |
| R | Yıllık Yetki Belgesi Hedefi | `=P2/J2` |
| S | Aylık Yetki Belgesi Hedefi | `=R2/12` |
| T | Yıllık Randevu Hedefi | `=R2/K2` |
| U | Aylık Randevu Hedefi | `=T2/12` |
| V | Aylık Ciro Hedefi (TL) | `=C2/12` |
| W | Yıllık Gelir Vergisi Tahmini | `=IFS(M2<=PARAMS!$B$9,M2*0.15,M2<=PARAMS!$B$10,PARAMS!$B$13+(M2-PARAMS!$B$9)*0.20,M2<=PARAMS!$B$11,PARAMS!$B$14+(M2-PARAMS!$B$10)*0.27,M2<=PARAMS!$B$12,PARAMS!$B$15+(M2-PARAMS!$B$11)*0.35,TRUE,PARAMS!$B$16+(M2-PARAMS!$B$12)*0.40)` |
| X | Vergiler Düşülmüş Ciro Hedefi | `=M2-W2` |
| Y | Giderler Düşülmüş Ciro Hedefi | `=X2-H2-I2` |

---

### Sekme C — **MONTHLY** (Aylık ölçülebilirlik)

**Girdi Alanları**
| Sütun | Alan |
|---|---|
| A | Yıl |
| B | Ay (1-12) |
| C | Danışman |
| D | Plan Yıl Key (opsiyonel) |
| F | Randevu Gerçekleşen |
| I | Yetki Gerçekleşen |
| L | Satış Gerçekleşen |
| O | Ciro Gerçekleşen |

**Formül Alanları**
| Sütun | Alan | Formül |
|---|---|---|
| E | Randevu Hedef | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$U:$U)` |
| G | Randevu Hedef % | `=IF(E2=0,"",F2/E2)` |
| H | Yetki Hedef | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$S:$S)` |
| J | Yetki Hedef % | `=IF(H2=0,"",I2/H2)` |
| K | Satış Hedef | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$Q:$Q)` |
| M | Satış Hedef % | `=IF(K2=0,"",L2/K2)` |
| N | Ciro Hedef | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$V:$V)` |
| P | Ciro Hedef % | `=IF(N2=0,"",O2/N2)` |
| Q | İşlem Net Ciro (Aylık) | `=SUMIFS(TRANSACTIONS!$L:$L,TRANSACTIONS!$A:$A,">="&DATE(A2,B2,1),TRANSACTIONS!$A:$A,"<="&EOMONTH(DATE(A2,B2,1),0))` |

---

### Sekme D — **SUMMARY** (Yıllık özet)

**Formül Alanları**
| Sütun | Alan | Formül |
|---|---|---|
| C | Randevu Hedef (Yıllık) | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$T:$T)` |
| D | Randevu Gerçekleşen | `=SUMIFS(MONTHLY!F:F,MONTHLY!A:A,A2,MONTHLY!C:C,B2)` |
| E | Yetki Hedef (Yıllık) | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$R:$R)` |
| F | Yetki Gerçekleşen | `=SUMIFS(MONTHLY!I:I,MONTHLY!A:A,A2,MONTHLY!C:C,B2)` |
| G | Satış Hedef (Yıllık) | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$P:$P)` |
| H | Satış Gerçekleşen | `=SUMIFS(MONTHLY!L:L,MONTHLY!A:A,A2,MONTHLY!C:C,B2)` |
| I | Ciro Hedef (Yıllık) | `=XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$C:$C)` |
| J | Ciro Gerçekleşen | `=SUMIFS(MONTHLY!O:O,MONTHLY!A:A,A2,MONTHLY!C:C,B2)` |
| K | İşlem Net Ciro (Yıllık) | `=SUMIFS(TRANSACTIONS!$L:$L,TRANSACTIONS!$A:$A,">="&DATE(A2,1,1),TRANSACTIONS!$A:$A,"<="&DATE(A2,12,31))` |

---

### Sekme E — **TRANSACTIONS** (İşlem bazlı veri)
Her satış (işlem) için detay kayıt. **Satış değeri (mülk fiyatı) girilir; alıcı ve satıcıdan %2 + KDV ayrı ayrı hesaplanır.** Bu iki tarafın netleri toplanarak işlem net ciro bulunur. Bu işlem bazlı netler aylık/yıllık takibe bağlanır.

| Sütun | Alan | Açıklama |
|---|---|---|
| A | İşlem Tarihi | Gerçekleşme tarihi |
| B | Muaccel Tarih | Tahsilat/ödeme tarihi |
| C | Satış Fiyatı | TL (mülk satış değeri) |
| D | Hizmet Bedeli Oranı | 0,02 |
| E | İşlem Tipi | Çift / Alıcı / Satıcı |
| F | Alıcı Hizmet Bedeli | `=IF(PARAMS!$B$5,C2*D2*IF(OR(E2="Çift",E2=""),2,1)/(1+PARAMS!$B$4),C2*D2*IF(OR(E2="Çift",E2=""),2,1))` |
| G | Alıcı KDV | `=F2*PARAMS!$B$4` |
| H | Alıcı Net Ciro | `=F2+G2` |
| I | Satıcı Hizmet Bedeli | `=IF(OR(E2="Alıcı",E2="Çift",E2=""),IF(PARAMS!$B$5,C2*D2/(1+PARAMS!$B$4),C2*D2),0)` |
| J | Satıcı KDV | `=I2*PARAMS!$B$4` |
| K | Satıcı Net Ciro | `=I2+J2` |
| L | İşlem Toplam Net Ciro | `=H2+K2` |
| M | Ofis Payı | `=L2*PARAMS!$B$1` |
| N | CBTR Payı | `=L2*PARAMS!$B$2` |
| O | Danışman Net Ciro | `=L2-(M2+N2)` |
| P | Ofis Pay Vergisi | `=M2*PARAMS!$B$6` |
| Q | CBTR Pay Vergisi | `=N2*PARAMS!$B$6` |
| R | Danışman Pay Vergisi | `=O2*PARAMS!$B$6` |
| S | Ofis Net (Vergi Sonrası) | `=M2-P2` |
| T | CBTR Net (Vergi Sonrası) | `=N2-Q2` |
| U | Danışman Net (Vergi Sonrası) | `=O2-R2` |

**Not:** Bu yapı, **alıcı ve satıcıdan %2 + KDV** tahsilini ayrı ayrı hesaplar ve işlem toplam net ciroyu açık biçimde oluşturur.

---

### Sekme F — **TAX** (Gelir vergisi hesaplama)
Yıllık danışman net geliri üzerinden vergi hesaplama.

**Öneri:** Bu sekme, `SUMMARY` veya `TRANSACTIONS` toplamlarına bağlı olsun.

| Alan | Formül |
|---|---|
| Yıllık Net Gelir | `=SUM(TRANSACTIONS!O:O)` |
| Yıllık Gelir Vergisi | Dilim kuralı ile hesaplanır (IFS/LOOKUP kullanımı) |
| Aylık Vergi Karşılığı | `=B2/12` |

**Dilim hesap örneği (tek hücre):**
```
=IFS(
  A2<=PARAMS!$B$9, A2*0.15,
  A2<=PARAMS!$B$10, PARAMS!$B$13+(A2-PARAMS!$B$9)*0.20,
  A2<=PARAMS!$B$11, PARAMS!$B$14+(A2-PARAMS!$B$10)*0.27,
  A2<=PARAMS!$B$12, PARAMS!$B$15+(A2-PARAMS!$B$11)*0.35,
  TRUE, PARAMS!$B$16+(A2-PARAMS!$B$12)*0.40
)
```

---

### Sekme G — **FX_RATES** (Kur ve gölge belirleyiciler)

**Açılış/Kapanış** için GoogleFinance:
| Sütun | Alan | Formül |
|---|---|---|
| A | Kur | USD/TRY, EUR/TRY, GBP/TRY, EUR/USD, JPY/TRY, CHF/TRY, RUB/TRY, CNY/TRY |
| B | Açılış | `=INDEX(GOOGLEFINANCE("CURRENCY:USDTRY","price",TODAY()),2,2)` |
| C | Kapanış | `=INDEX(GOOGLEFINANCE("CURRENCY:USDTRY","price",TODAY()-1),2,2)` |

> Açılış/kapanış yöntemleri GoogleFinance limitlerine göre optimize edilecektir.

**Öncelik Sırası**
1. USD/TRY
2. EUR/TRY
3. EUR/USD (dolaylı)
4. GBP/TRY
5. JPY/TRY & CHF/TRY
6. RUB/TRY & CNY/TRY

---

### Sekme H — **FX_HISTORY** (Tarih bazlı kur verisi)
Muaccel tarih hesaplamalarında **tarih bazlı** kur gerekir. Bu sekme günlük kur verisini tutar.

| Sütun | Alan | Açıklama |
|---|---|---|
| A | Tarih | Günlük |
| B | USD/TRY | `=GOOGLEFINANCE("CURRENCY:USDTRY","price",TODAY()-365,TODAY(),"DAILY")` |
| C | EUR/TRY | `=GOOGLEFINANCE("CURRENCY:EURTRY","price",TODAY()-365,TODAY(),"DAILY")` |
| D | GBP/TRY | `=GOOGLEFINANCE("CURRENCY:GBPTRY","price",TODAY()-365,TODAY(),"DAILY")` |
| E | JPY/TRY | `=GOOGLEFINANCE("CURRENCY:JPYTRY","price",TODAY()-365,TODAY(),"DAILY")` |
| F | CHF/TRY | `=GOOGLEFINANCE("CURRENCY:CHFTRY","price",TODAY()-365,TODAY(),"DAILY")` |
| G | RUB/TRY | `=GOOGLEFINANCE("CURRENCY:RUBTRY","price",TODAY()-365,TODAY(),"DAILY")` |
| H | CNY/TRY | `=GOOGLEFINANCE("CURRENCY:CNYTRY","price",TODAY()-365,TODAY(),"DAILY")` |

> İhtiyaca göre tarih aralığı genişletilir. GOOGLEFINANCE çıktısı tablo döndürür; ilk satır başlıktır.

---

### Sekme I — **DUE_REALLOSS** (Muaccel tarih & nominal/reel kayıp)

**Amaç:** Muaccel tarihteki kur farkını ve reel kaybı görmek.

| Sütun | Alan | Açıklama |
|---|---|---|
| A | İşlem ID | TRANSACTIONS bağlantı |
| B | İşlem Tarihi | |
| C | Muaccel Tarih | |
| D | Nominal Tutar (TL) | `=TRANSACTIONS!O:O` |
| E | Kur Çifti | USDTRY / EURTRY / GBPTRY / JPYTRY / CHFTRY / RUBTRY / CNYTRY |
| F | İşlem Kur | `=SWITCH(E2,"USDTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$B:$B),"EURTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$C:$C),"GBPTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$D:$D),"JPYTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$E:$E),"CHFTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$F:$F),"RUBTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$G:$G),"CNYTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$H:$H),"")` |
| G | Muaccel Kur | `=SWITCH(E2,"USDTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$B:$B),"EURTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$C:$C),"GBPTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$D:$D),"JPYTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$E:$E),"CHFTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$F:$F),"RUBTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$G:$G),"CNYTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$H:$H),"")` |
| H | Reel Tutar (baz döviz) | `=D2/F2` |
| I | Muaccel Reel Tutar (TL) | `=H2*G2` |
| J | Reel Kayıp/Kazanç | `=I2-D2` |

---

### Sekme J — **EXPENSES** (Giderler)
Giderlerin kategori bazlı izlenmesi için kullanılır.

| Sütun | Alan | Açıklama |
|---|---|---|
| A | Gider Tarihi | |
| B | Kategori | Reklam / Yaşam / Operasyon vb. |
| C | Tutar (TL) | |
| D | Not | |

---

## 4) Dashboard + Helper/Agregasyon Sekmeleri

### DASH_AGG_FINANCE
| Metrik | Kaynak |
|---|---|
| Aylık Ciro Hedef | PLAN / MONTHLY |
| Aylık Ciro Gerçekleşen | MONTHLY |
| Net Ciro | TRANSACTIONS |
| Vergi Sonrası Net | TAX |
| Vergi Sonrası Hedef | PLAN / X |
| Gider Sonrası Hedef | PLAN / Y |
| Net Kar | PLAN |
| Reel Kayıp Toplamı | DUE_REALLOSS |
| Aylık Gider | EXPENSES |
| Yıllık Gider | EXPENSES |

### DASH_AGG_FX
Kur trendleri ve gölge belirleyici göstergeleri.

---

## 5) Ek Geliştirme Önerileri

- **Grafikler:** Aylık ciro trendi, net kâr trendi, reel kayıp grafiği, kur baskı göstergeleri.

---

## 6) Uygulama Yol Haritası

1. Bu plan onaylanır.
2. Google Sheets şablonu hazırlanır.
3. Mevcut Apps Script / Dashboard entegrasyonu yapılır.
4. Dashboard’da izlenecek KPI’lar finalize edilir.

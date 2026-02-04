# CB-OS Dashboard Tasarım Paketi (MVP + Full Pro)

Bu doküman, **mevcut Sheets tabanlı veri omurgasını bozmadan** yeni bir **Dashboard + Helper (agregasyon)** katmanını **ayrı sayfalarda** tasarlamak için hazırlanmıştır. Hedef: **Mevcut SoT tablarını değiştirmeden**, yeni bir “Dashboard workspace” oluşturmak ve kullanıcıya **Dashboard ↔ Sheet (ham veri)** geçişi sağlayan bir yapı kurmaktır.

---

## 0) Çalışma Prensibi (Mevcut Düzeni Bozmadan)

- **SoT tabları** (CONTACTS/DEALS/TASKS/EVENTS/…) aynen korunur.
- **Dashboard** ve **helper/agregasyon** tabları **yeni sayfalarda** oluşturulur.
- Dashboard ile Sheet (ham veri) arasında **kolay geçiş** için **DASH_HOME** sayfası kullanılır (link butonları).

Önerilen yapı:

```
SoT (mevcut): CONTACTS / DEALS / TASKS / EVENTS / ...
Yeni Dashboard Workspace:
  - DASH_HOME (navigasyon)
  - DASHBOARD (ana panel)
  - DASH_DETAILS_* (drill-down)
  - DASH_CONFIG (filtreler)
  - DASH_AGG_* (agregasyon/helper)
  - (opsiyonel) DASHBOARD_* (modül bazlı paneller)
```

---

## 1) DASH_HOME (Navigasyon ve Geçiş Merkezi)

**Amaç:** Kullanıcıya “Dashboard ↔ Sheet (ham veri)” geçişini tek tıkla sunmak.

**İçerik:**
- Sol sütun: Dashboard sayfaları
- Sağ sütun: Ham veri tabları (SoT)

**Örnek Link Butonları (Sheets):**
- `=HYPERLINK("#gid=XXXX","→ DASHBOARD (Ana)")`
- `=HYPERLINK("#gid=YYYY","→ DEALS (Ham Veri)")`

---

## 2) ANA DASHBOARD (DASHBOARD TAB) — FULL PRO

### 2.1 Yerleşim Planı (12 kolon grid)

**ÜST ŞERİT (KPI Cards + Sparkline)**  
10–12 kart: New Leads, New Deals, Open Pipeline Value, Weighted Forecast, Conversion Rate,
Avg Time to Close, SLA Compliance, Overdue Tasks, Avg First Touch, Error Rate, DLQ Count, Ingest Pending.

**ORTA BÖLÜM (Neden/Sonuç)**
- Funnel Chart (Lead → First Touch → Appointment → Offer → Closed Won)
- Pipeline Stage Stacked Bar
- Sağda Alert & Action Panel (Top 10)

**ALT BÖLÜM (Trend + Ops + Aktivite)**
- Revenue/Closed Won Trend
- Task & SLA Health
- Ops Health (DLQ, Error Rate, Drift)
- Activity Heatmap

### 2.2 Drill-Down Sekmeleri
- DASH_DETAILS_PIPELINE
- DASH_DETAILS_TASKS
- DASH_DETAILS_OPS
- DASH_DETAILS_LEADS

---

## 3) Minimum MVP (Hızlı Kurulum)

**Amaç:** 2–4 haftada çalışan temel dashboard.

**MVP İçerik:**
- 8–10 KPI kartı
- Funnel Chart
- Pipeline Stage Bar
- Ops Health paneli
- Alerts listesi

**MVP’nin FULL’a farkı:**
- Ek modül panelleri (Marketing/Commissions/Market/CMA vb.) yoktur.
- Drill-down sekmeleri minimum seviyededir.

---

## 4) Helper / Agregasyon Tablar (Yeni Sayfalar)

### 4.1 DASH_CONFIG (Filtre Merkezi)
Kolonlar:
- start_date, end_date, owner, deal_type, region, currency, view_mode

### 4.2 DASH_AGG_KPI (tek satır)
- leads_new, deals_new, open_pipeline_value, weighted_forecast_value
- conversion_rate, avg_close_days, overdue_tasks, sla_compliance
- avg_first_touch_min, error_rate, dlq_count, ingest_pending, cursor_drift_min
- definition_* alanları (KPI tanımı)

### 4.3 DASH_AGG_FUNNEL_D
- date, leads, first_touch, appointments_done, offers, closed_won, closed_lost

### 4.4 DASH_AGG_PIPELINE_STAGE
- as_of_date, deal_type, owner, stage, open_count, open_value, weighted_value

### 4.5 DASH_AGG_TASK_HEALTH
- date, open_tasks, due_today, overdue, completed, sla_breaches

### 4.6 DASH_AGG_OPS
- timestamp, ingest_pending, dlq_count, error_rate, cursor_drift_minutes

### 4.7 Ek Modüller
- DASH_AGG_LISTINGS
- DASH_AGG_MARKETING
- DASH_AGG_COMMISSIONS
- DASH_AGG_OPEN_HOUSE
- DASH_AGG_CLIENTS

---

## 5) Ek Dashboard/Ekran Tasarımları (Full Pro)

Bu ekranlar **ayrı sayfalar** olarak eklenir:

1. **LISTING / Portföy Dashboard**  
2. **LEAD / CRM Dashboard**  
3. **Pazarlama & Kanal Performansı**  
4. **Komisyon & Gelir / Ödeme Takibi**  
5. **Open House / Gösterim Performansı**  
6. **Doküman & Süreç Checklist Sağlığı**  
7. **Bölge / Market Trendleri & CMA**  
8. **Aktivite / Follow-up Otomasyonu**  
9. **Müşteri Memnuniyeti & Referans**

---

## 6) Uygulanabilirlik Notu

**Sheets Native ile yapılabilir:**
- KPI kartları + sparklines
- Funnel, bar, line, donut chartlar
- Heatmap (conditional formatting)
- Alerts listesi

**Looker Studio opsiyonu:**
- MVP: KPI + Funnel + Pipeline + Ops
- Full: Drill-down + gelişmiş filtreleme + cross-tab analitik

---

## 7) Önerilen Sayfa Dizilimi (Sheet Navigation)

```
DASH_HOME
  ├── DASHBOARD (Ana)
  ├── DASH_DETAILS_* (Drilldown)
  ├── DASH_CONFIG
  ├── DASH_AGG_*
  └── DASHBOARD_* (modül bazlı sayfalar)

CONTACTS / DEALS / TASKS / EVENTS / ...
```

Bu yapı ile **mevcut düzen bozulmadan**, yeni dashboard katmanı **başka sayfalarda** kurulmuş olur ve kullanıcı **Dashboard ↔ Ham Veri** arasında kolayca geçiş yapabilir.

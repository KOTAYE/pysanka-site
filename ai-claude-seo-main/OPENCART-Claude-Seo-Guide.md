# 🛒 Claude SEO + OpenCart — Повний Гайд для Новачка

> **Версія:** 2026 | **Для кого:** власники OpenCart-магазинів, SEO-початківці  
> **Що потрібно:** комп'ютер з macOS / Linux / Windows, доступ до терміналу

---

## ЗМІСТ

1. [Що таке claude-seo і як це взагалі працює](#1-що-таке-claude-seo-і-як-це-взагалі-працює)
2. [Що Claude може робити з OpenCart — а що ні](#2-що-claude-може-робити-з-opencart--а-що-ні)
3. [Чат vs Термінал — різниця](#3-чат-vs-термінал--різниця)
4. [Встановлення Claude Code + плагіна](#4-встановлення-claude-code--плагіна)
5. [Підключення до OpenCart-сайту](#5-підключення-до-opencart-сайту)
6. [Підключення Google APIs (GSC, PageSpeed, GA4)](#6-підключення-google-apis-gsc-pagespeed-ga4)
7. [Всі команди /seo з поясненням](#7-всі-команди-seo-з-поясненням)
8. [SEO Workflow 2026 — що і коли запускати](#8-seo-workflow-2026--що-і-коли-запускати)
9. [Типові помилки OpenCart і як їх виправити](#9-типові-помилки-opencart-і-як-їх-виправити)
10. [Розширення (DataForSEO, Firecrawl, Banana)](#10-розширення-dataforseo-firecrawl-banana)
11. [⚠️ Безпека — що НЕ робити щоб не покласти сайт](#11-безпека--що-не-робити-щоб-не-покласти-сайт)
12. [Часті питання (FAQ)](#12-часті-питання-faq)

---

## 1. Що таке claude-seo і як це взагалі працює

**claude-seo** — це набір SEO-інструментів для **Claude Code** (термінальний AI-асистент від Anthropic). Ти запускаєш команди в терміналі, а Claude аналізує твій сайт і дає конкретні рекомендації або одразу вносить зміни у файли.

```
Ти у терміналі → Claude Code → аналізує твій OpenCart-сайт через URL → звіт / зміни
```

**Плагін НЕ встановлюється всередину OpenCart** — він живе на твоєму комп'ютері і звертається до сайту як зовнішній аудитор.

### Архітектура простими словами

| Компонент | Що робить |
|---|---|
| **Claude Code** | AI-асистент у терміналі, виконує команди |
| **claude-seo** | Плагін з 25 SEO-скілів і 18 субагентів |
| **Твій OpenCart** | Сайт, який аудитується через URL |
| **Google APIs** | Дані GSC, PageSpeed, GA4 (необов'язково, але бажано) |

---

## 2. Що Claude може робити з OpenCart — а що ні

### ✅ Може (аудит і аналіз через URL)

| Що | Команда |
|---|---|
| Повний SEO-аудит сайту | `/seo audit https://твій-сайт.com` |
| Аналіз окремої сторінки товару | `/seo page https://сайт.com/product/назва` |
| Перевірка schema markup | `/seo schema https://сайт.com` |
| Технічний аудит (robots, sitemap, редиректи) | `/seo technical https://сайт.com` |
| Аудит зображень | `/seo images https://сайт.com` |
| E-E-A-T аналіз контенту | `/seo content https://сайт.com/page` |
| Оптимізація під AI Search | `/seo geo https://сайт.com` |
| Local SEO | `/seo local https://сайт.com` |
| Аналіз backlinks | `/seo backlinks https://сайт.com` |
| Дрейф SEO (порівняння змін) | `/seo drift baseline` / `/seo drift compare` |
| Генерація sitemap | `/seo sitemap generate` |
| Генерація schema JSON-LD | `/seo schema <url>` |
| Звіт Core Web Vitals | `/seo google report cwv-audit` |
| Аналіз eCommerce SEO | `/seo ecommerce https://сайт.com` |

### ✅ Може (зміни у файлах — якщо є доступ до коду)

| Що | Як |
|---|---|
| Редагування `.htaccess` (редиректи, налаштування) | Claude Code + доступ до папки сайту |
| Зміна шаблонних файлів OpenCart (`.twig`, `.php`) | Claude Code + SSH або локальна копія |
| Генерація schema JSON-LD для вставки | Копіюєш згенерований код вручну |
| Редагування `robots.txt` | Claude Code + доступ до файлу |
| Виправлення `sitemap.xml` | Claude Code або через OpenCart Admin |

### ❌ Не може (без додаткових налаштувань)

| Що | Чому |
|---|---|
| Прямо змінювати товари в OpenCart Admin | Немає доступу до бази даних |
| Автоматично оновлювати мета-теги через адмінку | Потрібен API або прямий DB-доступ |
| Читати JavaScript-рендерений контент | Плагін читає raw HTML (не виконує JS) |
| Вносити зміни на production без SSH/FTP | Потрібен прямий доступ до файлів |
| Замовляти посилання або платити за реклами | Це поза межами SEO-аудиту |

> **Важливо для OpenCart:** OpenCart — PHP/серверний CMS, тому raw HTML читається добре. Проблеми можуть виникнути лише з Vue/React-темами де контент завантажується через AJAX.

---

## 3. Чат vs Термінал — різниця

### 💬 Claude.ai (цей чат)

Використовуй для:
- Стратегічних питань ("як краще оптимізувати категорії?")
- Аналізу завантажених файлів (workflow, звіти)
- Написання контенту, мета-описів, заголовків
- Генерації schema JSON-LD для ручного копіювання
- Пояснення помилок, які знайшов аудит
- Обговорення стратегії на основі звіту

**Приклад у чаті:**
```
"Напиши мета-опис для категорії 'Жіночі кросівки' 
з ключовим словом 'купити кросівки онлайн', до 160 символів"
```

### 💻 Claude Code (термінал)

Використовуй для:
- Запуску команд `/seo audit`, `/seo technical` тощо
- Реальних змін у файлах сайту (`.htaccess`, шаблони)
- Автоматизованого аудиту з PDF-звітами
- Моніторингу SEO-дрейфу
- Роботи з Google APIs (GSC, CrUX, GA4)

**Приклад у терміналі:**
```bash
claude
/seo audit https://мій-opencart.com
```

### Коли що використовувати

```
Питання / стратегія / контент  →  Чат (claude.ai)
Аудит / зміни файлів / звіти  →  Термінал (Claude Code)
```

---

## 4. Встановлення Claude Code + плагіна

### Крок 1: Встановлення Claude Code

**Вимоги:** Python 3.10+, Node.js

```bash
# Встановлення Claude Code через npm
npm install -g @anthropic-ai/claude-code

# Перевірка встановлення
claude --version
```

> Якщо npm не встановлений: https://nodejs.org/

### Крок 2: Авторизація

```bash
claude
# Claude попросить API-ключ від Anthropic
# Отримати на: https://console.anthropic.com/
```

### Крок 3: Встановлення плагіна claude-seo

**Варіант A — через Marketplace (найпростіше, Claude Code 1.0.33+):**
```bash
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-seo
```

**Варіант B — вручну (macOS/Linux):**
```bash
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git
bash claude-seo/install.sh
```

**Варіант C — Windows (PowerShell):**
```powershell
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git
powershell -ExecutionPolicy Bypass -File claude-seo\install.ps1
```

### Крок 4: Перевірка

```bash
claude
/seo audit https://example.com
```

Якщо бачиш звіт — все працює ✅

---

## 5. Підключення до OpenCart-сайту

### Варіант A: Тільки URL (базовий аудит)

Нічого додатково налаштовувати не потрібно. Просто запускай команди з URL свого магазину:

```bash
/seo audit https://мій-opencart.com
```

Claude звертається до сайту як звичайний браузер і аналізує HTML.

### Варіант B: Доступ до файлів через SSH (для змін)

Якщо хочеш, щоб Claude **вносив зміни** у файли сайту:

```bash
# 1. Підключись до сервера через SSH
ssh user@твій-сервер.com

# 2. Перейди до папки OpenCart
cd /var/www/html  # або /public_html, залежно від хостингу

# 3. Запусти Claude Code прямо на сервері
claude
```

Тепер Claude бачить файли твого OpenCart і може їх редагувати.

### Варіант C: Локальна копія сайту (безпечніше)

```bash
# 1. Скопіюй файли з сервера на комп'ютер
rsync -avz user@сервер.com:/var/www/html/ ./opencart-local/

# 2. Перейди в папку
cd opencart-local

# 3. Запусти Claude Code
claude

# 4. Після змін — завантаж назад
rsync -avz ./opencart-local/ user@сервер.com:/var/www/html/
```

### Важливі шляхи в OpenCart

```
opencart/
├── catalog/view/theme/твоя-тема/template/  ← шаблони сторінок (.twig)
├── catalog/controller/                      ← PHP логіка
├── .htaccess                                ← редиректи, SEF URLs
├── robots.txt                               ← правила для ботів
├── sitemap.xml                              ← або генерується динамічно
└── system/config/                           ← конфіги
```

---

## 6. Підключення Google APIs (GSC, PageSpeed, GA4)

Це необов'язково, але дає набагато більше даних. Система має 4 рівні — починай з Tier 0.

### Tier 0 — API Key (5 хвилин, безкоштовно)

Дає: PageSpeed Insights, Core Web Vitals (CrUX)

```bash
# В Claude Code:
/seo google setup

# Або вручну — отримай API ключ:
# https://console.cloud.google.com/ → APIs → PageSpeed Insights API → Create Key
```

Після отримання ключа:
```bash
/seo google setup
# Claude запитає API key, вводиш його
```

### Tier 1 — OAuth / Service Account

Дає: Google Search Console, URL Inspection, Indexing API

```bash
# 1. Йди на: https://console.cloud.google.com/
# 2. Створи проєкт → увімкни Search Console API
# 3. Створи Service Account → завантаж JSON-ключ
# 4. Додай сервіс-акаунт у GSC як "власника"

/seo google setup
# Вкажи шлях до JSON-файлу
```

### Tier 2 — GA4

Дає: дані органічного трафіку, landing pages, пристрої

```bash
# GA4 Property ID знайди в: GA4 Admin → Property Settings → Property ID
/seo google setup
# Вкажи GA4 Property ID
```

### Перевірка підключення

```bash
/seo google gsc https://мій-opencart.com
/seo google cwv https://мій-opencart.com
```

---

## 7. Всі команди /seo з поясненням

### 🔍 Аудит і аналіз

```bash
# Повний аудит сайту (запускає всі субагенти паралельно)
/seo audit https://opencart.com

# Глибокий аналіз однієї сторінки
/seo page https://opencart.com/product/кросівки-nike

# Технічний SEO аудит (9 категорій: robots, sitemap, редиректи, CWV...)
/seo technical https://opencart.com

# Аналіз контенту та E-E-A-T
/seo content https://opencart.com/category/взуття

# Аналіз зображень (alt-теги, формати, розміри)
/seo images https://opencart.com
```

### 🏷 Schema Markup

```bash
# Перевірка наявних schema та генерація нових
/seo schema https://opencart.com

# Для сторінки товару — згенерує Product + AggregateRating schema
/seo schema https://opencart.com/product/назва
```

### 🗺 Sitemap

```bash
# Аналіз існуючого sitemap
/seo sitemap https://opencart.com/sitemap.xml

# Генерація нового sitemap (із шаблонами для eCommerce)
/seo sitemap generate
```

### 🛒 eCommerce SEO (спеціально для OpenCart)

```bash
# eCommerce аудит: product schema, marketplace intelligence
/seo ecommerce https://opencart.com

# Програматичний SEO: аналіз сторінок за шаблоном
/seo programmatic https://opencart.com/category/
```

### 🤖 AI Search (GEO)

```bash
# Оптимізація для Google AI Overviews, ChatGPT, Perplexity
/seo geo https://opencart.com
/seo geo https://opencart.com/product/назва
```

### 🏙 Local SEO (якщо є фізичний магазин)

```bash
# Local SEO аудит: Google Business Profile, NAP, відгуки
/seo local https://opencart.com

# Geo-grid rank tracking
/seo maps geo-grid

# GBP аудит
/seo maps gbp-audit

# Аналіз конкурентів у радіусі
/seo maps competitors
```

### 🔗 Backlinks

```bash
# Аналіз профілю посилань (безкоштовно: Moz, Bing, Common Crawl)
/seo backlinks https://opencart.com
```

### 📊 SEO Дрейф (моніторинг змін)

```bash
# Зберегти поточний стан як baseline
/seo drift baseline https://opencart.com

# Порівняти поточний стан з baseline
/seo drift compare https://opencart.com

# Переглянути історію змін
/seo drift history https://opencart.com
```

### 🌍 Міжнародний SEO

```bash
# Hreflang аудит та генерація (якщо є кілька мов)
/seo hreflang https://opencart.com
```

### 🔑 Ключові слова та кластери

```bash
# Семантична кластеризація за seed-keyword
/seo cluster "жіночі кросівки"

# Пошук оптимальних ключових слів
/seo dataforseo keywords "купити кросівки"
```

### 📄 Порівняльні сторінки

```bash
# Генерація "X vs Y" та "Альтернативи X" сторінок
/seo competitor-pages https://opencart.com/generate
```

### 📈 Google APIs

```bash
# Core Web Vitals з реальних даних
/seo google cwv https://opencart.com

# Google Search Console — топ запити
/seo google gsc https://opencart.com

# URL Inspection — перевірити індексацію
/seo google inspect https://opencart.com/product/назва

# Повідомити Google про нову сторінку
/seo google index https://opencart.com/new-product

# GA4 — органічний трафік
/seo google ga4 https://opencart.com
```

### 📋 Звіти

```bash
# PDF звіт по Core Web Vitals
/seo google report cwv-audit

# PDF звіт по GSC Performance
/seo google report gsc-performance

# Повний PDF звіт
/seo google report full
```

### 🎨 SXO (Search Experience Optimization)

```bash
# Аналіз user experience з SEO-точки зору
/seo sxo https://opencart.com
```

---

## 8. SEO Workflow 2026 — що і коли запускати

### При першому запуску (разовий аудит)

```bash
# 1. Повний аудит
/seo audit https://opencart.com

# 2. Технічні деталі
/seo technical https://opencart.com

# 3. eCommerce специфіка
/seo ecommerce https://opencart.com

# 4. Schema
/seo schema https://opencart.com

# 5. Зберегти baseline для моніторингу
/seo drift baseline https://opencart.com

# 6. Повний звіт
/seo google report full
```

### Щотижня

```bash
/seo drift compare https://opencart.com
/seo google gsc https://opencart.com
# Публікуй нові товари/сторінки
/seo google index https://opencart.com/new-page
```

### Щомісяця

```bash
/seo audit https://opencart.com
/seo backlinks https://opencart.com
/seo google report gsc-performance
/seo google cwv https://opencart.com
```

### Щоквартально

```bash
/seo cluster "основний напрямок"
/seo geo https://opencart.com
/seo ecommerce https://opencart.com
/seo google report full
```

---

## 9. Типові помилки OpenCart і як їх виправити

### Проблема 1: Дублікати URL через фільтри

**Симптом:** URL типу `?filter_category_id=42&filter_sub_category=true&sort=p.price`  
**Що робить claude-seo:** Виявляє ці URL в аудиті як crawl budget waste

**Виправлення через .htaccess** (Claude Code може написати):
```apache
# Додай у .htaccess — блокуємо параметри від індексації
RewriteCond %{QUERY_STRING} (filter_|sort=|order=|limit=) [NC]
RewriteRule ^ %{REQUEST_URI}? [L,R=301]
```

Або налаштуй URL Parameter Handling у Google Search Console.

### Проблема 2: Відсутній/поганий sitemap

**Симптом:** `/seo sitemap` показує помилки або sitemap не містить усіх товарів

**OpenCart генерує sitemap динамічно:** `https://opencart.com/index.php?route=extension/feed/google_sitemap`

**Виправлення:**
```bash
# Claude генерує новий sitemap
/seo sitemap generate

# Потім вручну: OpenCart Admin → Extensions → Feeds → Google Sitemap → Увімкнути
```

### Проблема 3: Погані мета-теги на сторінках товарів

**Симптом:** Всі товари мають однаковий або порожній meta description

**Що робити у чаті:**
```
"Напиши 10 варіантів meta description шаблону для сторінок 
категорій взуття. Довжина 140-160 символів. 
Включи змінні: {category_name}, {brand}, {price_range}"
```

**Потім в OpenCart Admin:** System → Settings → вкладка Server → Meta Description

### Проблема 4: Відсутня schema для товарів

**Симптом:** `/seo schema` показує "No Product schema found"

OpenCart не додає schema автоматично.

**Виправлення:**  
Claude генерує JSON-LD код:
```bash
/seo schema https://opencart.com/product/назва-товару
```

Скопіюй згенерований код і вставляй у шаблон:
```
catalog/view/theme/твоя-тема/template/product/product.twig
```

Додай перед `</head>`:
```html
<script type="application/ld+json">
{ СЮДИ ВСТАВЛЯЄШ КОД ВІД /seo schema }
</script>
```

### Проблема 5: Повільні Core Web Vitals

**Симптом:** `/seo google cwv` показує LCP > 4s або CLS > 0.1

**Типові причини в OpenCart:**
- Незоптимізовані зображення товарів
- Багато JS/CSS плагінів
- Відсутній кеш

**Виправлення:**
```bash
/seo images https://opencart.com  # знайде проблемні зображення
```

В OpenCart Admin:
- Встанови кеш-плагін (наприклад, Quick Cache)
- Extensions → Image Manager → конвертуй у WebP

### Проблема 6: robots.txt блокує потрібні сторінки

```bash
/seo technical https://opencart.com
# → розділ robots.txt
```

Стандартний robots.txt для OpenCart:
```
User-agent: *
Disallow: /admin/
Disallow: /catalog/
Disallow: /system/
Disallow: /?route=account
Disallow: /?route=checkout
Allow: /catalog/view/theme/

Sitemap: https://opencart.com/index.php?route=extension/feed/google_sitemap
```

---

## 10. Розширення (DataForSEO, Firecrawl, Banana)

### DataForSEO — живі дані SERP

Потрібен платний акаунт: https://dataforseo.com/

```bash
# Встановлення
./extensions/dataforseo/install.sh

# Команди
/seo dataforseo serp "купити кросівки київ"        # позиції у пошуку
/seo dataforseo keywords "жіноче взуття"           # ключові слова
/seo dataforseo backlinks opencart.com             # аналіз посилань
/seo dataforseo ai-mentions "назва твого бренду"   # згадки в AI
```

### Firecrawl — повний краул сайту

Потрібен акаунт: https://www.firecrawl.dev/

```bash
# Встановлення
./extensions/firecrawl/install.sh

# Команди
/seo firecrawl crawl https://opencart.com     # повний краул
/seo firecrawl map https://opencart.com       # карта всіх URL
```

> Корисно для великих магазинів з тисячами товарів — знаходить всі orphan pages, broken links тощо.

### Banana — AI генерація зображень

Для SEO-картинок: OG-images, hero-зображення, product photos.

```bash
# Встановлення
./extensions/banana/install.sh

# Команди
/seo image-gen og "Магазин спортивного взуття"          # OG-зображення
/seo image-gen hero "Жіночі кросівки 2026"              # hero-банер
/seo image-gen batch "Категорія взуття" 5               # 5 зображень
```

---

## 11. ⚠️ Безпека — що НЕ робити щоб не покласти сайт

> **Читай цей розділ ПЕРШ НІЖ запускати будь-що на сайті клієнта.**

---

### 🟢 Команди які 100% безпечні — можна запускати без страху

Ці команди тільки **читають** сайт через URL, як звичайний браузер. Вони не торкаються файлів, бази даних, нічого не змінюють:

```bash
/seo audit https://сайт.com
/seo page https://сайт.com/product/назва
/seo technical https://сайт.com
/seo content https://сайт.com
/seo schema https://сайт.com
/seo images https://сайт.com
/seo geo https://сайт.com
/seo local https://сайт.com
/seo backlinks https://сайт.com
/seo ecommerce https://сайт.com
/seo sxo https://сайт.com
/seo hreflang https://сайт.com
/seo cluster "ключове слово"
/seo google cwv https://сайт.com
/seo google gsc https://сайт.com
/seo drift baseline https://сайт.com
/seo drift compare https://сайт.com
```

**Максимум що може статись:** один зайвий запит до сервера — як якщо б хтось зайшов на сторінку.

---

### 🟡 Команди з помірним ризиком — використовуй обережно

#### `/seo firecrawl crawl` — повний краул сайту

```bash
/seo firecrawl crawl https://сайт.com  # ⚠️ НЕ на shared хостингу!
```

**Що відбувається:** Firecrawl сканує ВСІ сторінки підряд з великою швидкістю — може бути 500, 1000, 5000 запитів за хвилину залежно від розміру магазину.

**Ризик:** На слабкому або shared хостингу це може:
- Перевантажити сервер → сайт сповільниться або впаде
- Хостер заблокує IP за підозрілу активність
- Вичерпати ліміт запитів на тарифі

**Коли безпечно використовувати:**
- VPS або dedicated сервер
- Після узгодження з хостером
- В неробочий час (вночі)
- Спочатку протестуй на невеликому розділі: `/seo firecrawl map https://сайт.com/category/`

---

#### `/seo sitemap generate` — генерація sitemap

**Що відбувається:** Claude генерує новий файл `sitemap.xml`.

**Ризик:** Якщо запускається з доступом до файлів і перезаписує існуючий sitemap — старий буде видалений.

**Як безпечно:**
```bash
# Спочатку збережи старий sitemap
cp sitemap.xml sitemap.xml.backup

# Потім генеруй новий
/seo sitemap generate
```

---

#### `/seo dataforseo` — живі дані

Безпечно для сайту, але **коштує гроші** — кожен запит списує кредити з DataForSEO акаунту. Перевір баланс перед масовим використанням.

---

### 🔴 Дії з ВИСОКИМ ризиком — тільки з бекапом

#### ❌ Зміни файлів напряму на production сервері

Якщо Claude Code запущений через SSH на живому сервері і редагує файли — будь-яка помилка одразу впливає на клієнтів.

**Найнебезпечніші файли OpenCart:**

| Файл | Що буде при помилці |
|---|---|
| `.htaccess` | 500 Internal Server Error — сайт повністю не працює |
| `config.php` | Сайт не може підключитись до БД |
| `catalog/view/theme/*/template/*.twig` | Зламаний вигляд сторінок |
| `system/config/default.php` | Критичні помилки OpenCart |

**Правило:** ніколи не редагуй ці файли напряму на сервері без бекапу.

**Правильний процес:**
```
1. Зроби бекап файлу
2. Зроби зміни локально
3. Протестуй на staging
4. Тільки потім деплой на production
```

---

#### ❌ `/seo google index` у великій кількості

```bash
# НЕ РОБИ ТАК — сотні разів підряд:
/seo google index https://сайт.com/product/1
/seo google index https://сайт.com/product/2
# ... і так 500 разів
```

**Ризик:** Google Indexing API має ліміт ~200 URL/добу. Масове надсилання може вичерпати ліміт і тимчасово знизити краул-пріоритет сайту.

**Як правильно:** надсилай нові сторінки по одній після публікації.

---

#### ❌ SQL-запити без бекапу бази

Якщо Claude генерує SQL для масового оновлення мета-тегів — **завжди роби бекап бази перед виконанням**.

```bash
# Бекап бази перед будь-якими SQL змінами
mysqldump -u username -p opencart_db > backup_$(date +%Y%m%d).sql
```

---

### 📋 Чекліст безпеки перед роботою з сайтом клієнта

Виконай це ОДНОРАЗОВО перед початком роботи:

- [ ] **Бекап файлів сайту** — повна копія папки OpenCart
- [ ] **Бекап бази даних** — через phpMyAdmin або mysqldump
- [ ] **Перевір тип хостингу** — shared / VPS / dedicated (від цього залежить що можна запускати)
- [ ] **Налаштуй staging** — ідеально мати тестову копію сайту окремо
- [ ] **Перевір доступ до резервних копій** — знай як відновити сайт якщо щось піде не так
- [ ] **Узгодь з клієнтом час робіт** — зміни краще робити вночі або у вихідні

---

### 🚨 Що робити якщо сайт все ж впав

**Сайт показує 500 Internal Server Error:**
```bash
# Найчастіша причина — помилка в .htaccess
# Перейменуй .htaccess тимчасово
mv .htaccess .htaccess.broken
# Якщо сайт запрацював — помилка в .htaccess, відновлюй з бекапу
```

**Сайт не підключається до БД:**
```bash
# Перевір config.php — можливо щось змінилось
cat config.php | grep DB_
# Відновлюй config.php з бекапу
```

**Сторінки виглядають зламаними:**
```bash
# Відновлюй шаблонні файли з бекапу
cp -r backup/catalog/view/theme/ catalog/view/theme/
```

**Якщо нічого не допомагає — відновлюй повний бекап.**

---

### Коротке правило для запам'ятовування

```
Читаєш сайт (audit, page, technical...)  →  Безпечно, запускай сміливо
Краулиш весь сайт (firecrawl crawl)     →  Тільки на VPS, вночі
Змінюєш файли на сервері               →  Тільки з бекапом і staging спочатку
SQL до бази даних                       →  Завжди бекап бази перед виконанням
```

---

## 12. Часті питання (FAQ)

**❓ Чи безпечно давати Claude доступ до файлів сайту?**  
Так, якщо ти запускаєш Claude Code сам на своєму комп'ютері або сервері. Claude не передає файли назовні — він працює локально. Рекомендуємо завжди робити резервну копію перед змінами.

**❓ Плагін безкоштовний?**  
Сам плагін — так, MIT ліцензія. Але Claude Code потребує API-ключ Anthropic (платна підписка). DataForSEO і Firecrawl розширення — платні сервіси окремо.

**❓ Що робити якщо OpenCart використовує AJAX-завантаження товарів?**  
Claude читає лише raw HTML. Якщо товари завантажуються через JavaScript — аудит контенту буде неповним. Рішення: увімкни Server-Side Rendering або використовуй Firecrawl-розширення з Playwright.

**❓ Як часто запускати аудит?**  
- Після кожного великого оновлення теми чи плагінів
- Щомісяця — базовий аудит
- Щотижня — тільки drift compare та GSC check

**❓ Claude може автоматично оновити всі мета-теги в OpenCart?**  
Напряму через адмінку — ні. Але може: написати SQL-запит для масового оновлення через phpMyAdmin, або згенерувати CSV для імпорту через розширення типу "SEO Bulk Editor".

**❓ Як видалити плагін?**  
```bash
# macOS/Linux
bash claude-seo/uninstall.sh

# Windows
powershell -ExecutionPolicy Bypass -File claude-seo\uninstall.ps1
```

---

## Швидкий старт — 5 кроків для новачка

```bash
# 1. Встанови Claude Code
npm install -g @anthropic-ai/claude-code

# 2. Запусти і авторизуйся
claude

# 3. Встанови плагін
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-seo

# 4. Запусти перший аудит
/seo audit https://твій-opencart-магазин.com

# 5. Збережи baseline для майбутнього моніторингу
/seo drift baseline https://твій-opencart-магазин.com
```

**Готово!** Claude проаналізує твій магазин і дасть пріоритетний список виправлень. 🚀

---

*Документ складено на основі: [github.com/AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) та SEO Workflow System 2026*  
*Останнє оновлення: 2026-05*

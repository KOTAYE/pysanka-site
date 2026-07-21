# SEO Workflow System 2026
### Standard Operating Procedure — Enterprise / Agency Level
**Version:** 1.0 | **Revised:** 2026-04 | **Author:** Senior SEO Architect

---

> **Scope:** Цей документ є внутрішнім SOP для запуску, ведення та масштабування SEO-проєктів рівня міжнародної агенції. Охоплює Google 2026 guidelines, AI Search (SGE/GEO/AEO), Topical Authority, Entity SEO та E-E-A-T frameworks. Обов'язковий до виконання для всіх SEO-спеціалістів, контент-менеджерів та технічних команд.

---

## ЗМІСТ

1. [Phase 0 — Project Onboarding & Discovery](#phase-0)
2. [Phase 1 — Technical SEO Audit & Infrastructure](#phase-1)
3. [Phase 2 — Entity SEO & E-E-A-T Foundation](#phase-2)
4. [Phase 3 — Keyword Research & Topical Authority Mapping](#phase-3)
5. [Phase 4 — On-Page SEO Optimization](#phase-4)
6. [Phase 5 — Content Strategy & Production](#phase-5)
7. [Phase 6 — AI Search Optimization (GEO / AEO / SGE)](#phase-6)
8. [Phase 7 — Local SEO (якщо застосовно)](#phase-7)
9. [Phase 8 — Link Building & Digital PR](#phase-8)
10. [Phase 9 — Analytics, Tracking & Reporting Setup](#phase-9)
11. [Phase 10 — Ongoing Optimization Cadence](#phase-10)
12. [Tools Stack & Resource Matrix](#tools-stack)

---

## PHASE 0 — PROJECT ONBOARDING & DISCOVERY {#phase-0}

### 0.1 Client Intake & Business Intelligence

- [ ] Заповнити Client Intake Form: бізнес-модель, revenue streams, ICP (Ideal Customer Profile), географія, мови
- [ ] Визначити тип бізнесу: B2B / B2C / SaaS / eCommerce / Local Service / Publisher / Hybrid
- [ ] Зібрати доступи: GSC, GA4, GBP, CRM, рекламні кабінети, CMS, хостинг/CDN
- [ ] Підписати NDA та визначити рівні доступу команди
- [ ] Провести kick-off call (≥ 60 хв): цілі, KPI, стейкхолдери, decision makers
- [ ] Зафіксувати бізнес-цілі у SMART-форматі (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] Визначити первинні KPI: organic revenue, leads, traffic, rankings, visibility share
- [ ] Визначити вторинні KPI: CTR, bounce rate, dwell time, crawl coverage, index ratio
- [ ] Зафіксувати бюджет на контент, лінкбілдинг, технічні роботи окремо
- [ ] Встановити комунікаційний ритм: щотижневий статус, щомісячний звіт, щоквартальний стратегічний review

### 0.2 Competitor Intelligence

- [ ] Визначити 5–10 прямих конкурентів (SERP competitors, не бізнес-конкуренти)
- [ ] Визначити 3–5 aspirational competitors (лідери ніші, на яких орієнтуватись)
- [ ] Зняти keyword gap між клієнтом та топ-3 конкурентами (Ahrefs/Semrush)
- [ ] Зняти content gap: теми, які покривають конкуренти, але не клієнт
- [ ] Проаналізувати backlink profiles топ-5 конкурентів: DA, DR, referring domains, anchor text
- [ ] Визначити найсильніші сторінки конкурентів за organic traffic (Top Pages report)
- [ ] Виявити "low-hanging fruit": терміни, де конкуренти слабкі, клієнт може швидко зайти
- [ ] Проаналізувати schema markup конкурентів (які типи, чи отримують rich results)
- [ ] Дослідити їхній контент-формат: довжина, структура, мультимедіа, автори
- [ ] Перевірити AI visibility конкурентів: чи цитуються вони в ChatGPT/Perplexity/SGE
- [ ] Зафіксувати всі знахідки у Competitor Intelligence Dashboard

### 0.3 Baseline Metrics Snapshot

- [ ] Зняти поточний organic traffic (GA4: останні 3/6/12 міс.)
- [ ] Зняти поточні rankings для всіх відомих цільових keywords (GSC + rank tracker)
- [ ] Зафіксувати кількість проіндексованих сторінок (Google: site:domain.com)
- [ ] Зняти Domain Rating / Domain Authority (Ahrefs / Moz)
- [ ] Зафіксувати кількість referring domains
- [ ] Зняти Core Web Vitals (CrUX field data через GSC або PageSpeed Insights API)
- [ ] Зафіксувати поточний CTR в GSC (середній, та по топ-20 запитах)
- [ ] Зняти Impressions / Position для всіх URL у GSC
- [ ] Перевірити наявність manual actions у GSC
- [ ] Перевірити coverage report у GSC: кількість excluded / valid / error pages
- [ ] Зафіксувати дату останнього Google core update та його вплив на трафік
- [ ] Зберегти всі baseline дані у Baseline Metrics Spreadsheet (заморожений snapshot)

---

## PHASE 1 — TECHNICAL SEO AUDIT & INFRASTRUCTURE {#phase-1}

### 1.1 Crawl & Indexability

- [ ] Запустити повний сайт-краул (Screaming Frog / Sitebulb / Ahrefs Site Audit)
- [ ] Перевірити robots.txt: синтаксис, Disallow/Allow логіку, Sitemap reference
- [ ] Перевірити, що robots.txt НЕ блокує JS/CSS файли, необхідні для рендерингу
- [ ] Перевірити всі User-agent директиви (особливо GPTBot, ClaudeBot, OAI-SearchBot, Google-Extended)
- [ ] Верифікувати, що Disallow не перекриває Allow directives для одного User-agent
- [ ] Перевірити sitemap.xml: формат, namespace, urlset, кількість URL
- [ ] Верифікувати, що sitemap містить тільки canonical, indexable, 200-статус URL
- [ ] Перевірити sitemap index якщо > 50,000 URL (розбивка по типах: pages, images, news)
- [ ] Відправити sitemap у GSC та перевірити кількість discovered vs indexed
- [ ] Перевірити canonical tags на кожному типі сторінок: self-referencing, правильний протокол
- [ ] Виявити canonical chain (A → B → C замість A → C)
- [ ] Виявити orphan pages (сторінки без internal links)
- [ ] Перевірити pagination: rel="next/prev" або canonical до paginated pages
- [ ] Перевірити hreflang (якщо multilingual): синтаксис, return tags, x-default
- [ ] Перевірити crawl depth: ключові сторінки мають бути досяжні за ≤ 3 кліки від homepage
- [ ] Виявити redirect chains (> 2 hops) та redirect loops
- [ ] Перевірити internal 404 links (Screaming Frog → Response codes)
- [ ] Перевірити external broken links
- [ ] Верифікувати 301 vs 302 redirect використання (302 не передає link equity)
- [ ] Перевірити soft 404: сторінки, що повертають 200 але містять "not found" контент
- [ ] Перевірити noindex теги: чи не заблоковані важливі сторінки
- [ ] Перевірити crawl budget efficiency: чи не витрачається на pagination, session IDs, URL parameters
- [ ] Налаштувати URL Parameter handling у GSC (якщо eCommerce з фільтрами)
- [ ] Перевірити rendering: порівняти rendered vs raw HTML у GSC URL Inspection Tool
- [ ] Виявити JavaScript-залежний контент, що не рендериться для Googlebot

### 1.2 Site Architecture & URL Structure

- [ ] Верифікувати flat site architecture: max 3 рівні вкладеності для пріоритетних сторінок
- [ ] Перевірити URL structure: lowercase, hyphens, без trailing slash конфліктів
- [ ] Перевірити відповідність URL-структури логіці топікальних кластерів
- [ ] Виявити URL дублікати: www/non-www, http/https, trailing slash / no slash
- [ ] Перевірити canonical версію домену (301 всіх варіантів → один canonical)
- [ ] Верифікувати HTTPS: TLS 1.3, HSTS header, mixed content warnings
- [ ] Перевірити subdomains: чи підключені до GSC, чи є crawl isolation проблеми
- [ ] Перевірити subdirectory vs subdomain стратегію для блогу/локальних сторінок
- [ ] Верифікувати, що URL зміни (rebranding/migration) покриті 301 redirects сповна

### 1.3 Core Web Vitals & Performance

- [ ] Зняти LCP (Largest Contentful Paint): мета < 2.5s (field data, не lab)
- [ ] Зняти INP (Interaction to Next Paint): мета < 200ms (замінив FID з 2024)
- [ ] Зняти CLS (Cumulative Layout Shift): мета < 0.1
- [ ] Виявити LCP елемент: зазвичай hero image, H1, або above-fold block
- [ ] Оптимізувати LCP: preload, fetchpriority="high", сервер response time
- [ ] Виявити CLS причини: fonts FOUT, dynamic banners, ads, lazy-loaded images без dimensions
- [ ] Встановити explicit width/height для всіх images та video embeds
- [ ] Перевірити font-display: swap або optional для web fonts
- [ ] Виявити render-blocking resources: синхронні JS у <head> без defer/async
- [ ] Перевірити third-party script impact (GTM, chat widgets, analytics): defer all non-critical
- [ ] Оптимізувати image formats: WebP/AVIF для всіх растрових зображень
- [ ] Встановити lazy loading для below-fold images (loading="lazy")
- [ ] Перевірити TTFB (Time to First Byte): мета < 800ms
- [ ] Верифікувати CDN наявність та edge caching конфігурацію
- [ ] Перевірити HTTP/2 або HTTP/3 (multiplexing)
- [ ] Верифікувати Brotli/gzip compression на всіх ресурсах
- [ ] Перевірити Cache-Control headers для статичних ресурсів (≥ 1 рік для версійованих файлів)
- [ ] Запустити CrUX history check (25-тижнева динаміка) для P75 percentile

### 1.4 Mobile & Accessibility

- [ ] Верифікувати mobile-first indexing: Google індексує mobile версію
- [ ] Перевірити viewport meta tag на всіх сторінках
- [ ] Перевірити touch target sizes: ≥ 48px (Google recommendation)
- [ ] Виявити content parity: mobile version НЕ повинна приховувати контент vs desktop
- [ ] Перевірити font sizes: ≥ 16px body text на мобільному
- [ ] Перевірити Core Web Vitals окремо для mobile та desktop (CrUX сегментує)
- [ ] Верифікувати AMP (якщо використовується): canonical link до non-AMP версії

### 1.5 Security & Trust Signals

- [ ] Верифікувати HTTPS на всьому сайті (301 всіх HTTP → HTTPS)
- [ ] Перевірити Security Headers: `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`
- [ ] Перевірити наявність privacy policy, terms of service, cookie policy
- [ ] Перевірити cookie consent (GDPR/PIPEDA compliance)
- [ ] Верифікувати відсутність malware / spammy injected content (GSC Security Issues)

---

## PHASE 2 — ENTITY SEO & E-E-A-T FOUNDATION {#phase-2}

### 2.1 Entity Establishment

- [ ] Визначити primary entity type (Organization / LocalBusiness / Person / Brand)
- [ ] Уніфікувати Brand Name: одна канонічна назва в усіх точках присутності
- [ ] Перевірити та уніфікувати NAP (Name, Address, Phone) по всьому сайту та зовнішніх джерелах
- [ ] Верифікувати founding date consistency у всіх schema instances та body copy
- [ ] Додати Organization schema на homepage з повним набором: name, url, logo, sameAs, contactPoint, areaServed, foundingDate
- [ ] Заповнити sameAs array: всі верифіковані соціальні профілі + Wikidata Q-item (якщо є) + Crunchbase + Clutch
- [ ] Верифікувати logo у форматі, рекомендованому Google (PNG, на білому/прозорому фоні)
- [ ] Створити або верифікувати Wikidata entity (Q-item) для бізнесу
- [ ] Претендувати на Google Knowledge Panel через Google Search Console (якщо доступно)
- [ ] Верифікувати Bing Places / Bing entity profile
- [ ] Забезпечити присутність на Crunchbase, Clutch/G2/Trustpilot (галузево залежно)
- [ ] Додати соціальний профіль YouTube до sameAs (найвища кореляція з AI citations: 0.737)

### 2.2 E-E-A-T Signals

- [ ] Створити повноцінні author profiles для всіх авторів контенту (ім'я, фото, посада, bio, credentials)
- [ ] Додати Author schema (Person type) зі: name, jobTitle, worksFor, sameAs (LinkedIn), url
- [ ] Прив'язати кожну статтю до named author — не "Editorial Team" або назва компанії
- [ ] Додати author byline та bio box на всіх статтях блогу
- [ ] Забезпечити, щоб автори були верифіковані на LinkedIn (хрест-посилання)
- [ ] Перевірити, чи автори мають публікації на зовнішніх авторитетних джерелах (guest posts, interviews)
- [ ] Додати About page з: командою, досвідом, роками в індустрії, медіа згадками
- [ ] Додати Press / Media page з посиланнями на реальні публікації (Forbes, industry press)
- [ ] Зібрати та відобразити awards, certifications, partnerships (Google Partner, Meta Partner тощо)
- [ ] Додати customer testimonials з full name + company + photo (не анонімні)
- [ ] Додати case studies з конкретними даними: до/після, методологія, результати
- [ ] Верифікувати, що ціни, контактна інформація та умови роботи публічно доступні
- [ ] Додати "Last Updated" дату на всіх evergreen статтях
- [ ] Застосувати dateModified у schema та article:modified_time у Open Graph

### 2.3 Structured Data (Schema) Implementation

- [ ] Визначити всі необхідні schema types для сайту (WebSite, Organization, BreadcrumbList, Article, FAQPage, Service, Product, LocalBusiness тощо)
- [ ] Реалізувати WebSite schema з SearchAction (sitelinks search box) на homepage
- [ ] Реалізувати BreadcrumbList на всіх сторінках (крім homepage)
- [ ] Реалізувати FAQPage schema на сторінках, де є FAQ блок (питання/відповідь)
- [ ] Реалізувати Article / BlogPosting schema на всіх статтях: headline, author, datePublished, dateModified, image, publisher
- [ ] Реалізувати HowTo schema де застосовно (покрокові гайди)
- [ ] Реалізувати Product schema на продуктових сторінках: name, description, offers, aggregateRating
- [ ] Реалізувати Review / AggregateRating тільки якщо відгуки реально відображені на сторінці
- [ ] Реалізувати Service schema на сервісних сторінках
- [ ] Перевірити всі schema через Google Rich Results Test та Schema.org validator
- [ ] Перевірити Enhancement reports у GSC для виявлення schema errors/warnings
- [ ] Виключити hardcoded aggregateRating без реального відображення відгуків (policy violation)
- [ ] Верифікувати JSON-LD формат (не Microdata, не RDFa) як Google preferred
- [ ] Перевірити, що schema не суперечить видимому контенту сторінки

---

## PHASE 3 — KEYWORD RESEARCH & TOPICAL AUTHORITY MAPPING {#phase-3}

### 3.1 Keyword Universe Building

- [ ] Провести seed keyword brainstorm з клієнтом (10–20 seed terms)
- [ ] Розширити через Ahrefs Keyword Explorer: "Matching terms", "Related terms", "Questions"
- [ ] Розширити через Google Search Console: "Queries" report (наявні impressions без clicks)
- [ ] Розширити через "People Also Ask" (PAA) та "Related Searches" у SERP
- [ ] Зібрати keyword suggestions з Semrush, Keyword Planner, AlsoAsked.com
- [ ] Зібрати conversational queries з Answer The Public та перевірити у SGE
- [ ] Класифікувати всі keywords за Search Intent: Informational / Navigational / Commercial / Transactional
- [ ] Класифікувати за funnel stage: ToFU / MoFU / BoFU
- [ ] Оцінити Business Relevance Score (1–5) для кожного keyword кластера
- [ ] Виявити branded vs non-branded split у поточному GSC трафіку

### 3.2 Topical Authority Map

- [ ] Побудувати Topic Cluster Model: 1 Pillar Page + N Cluster Pages на кожну тему
- [ ] Визначити 5–10 primary topic clusters (відповідають головним service/product areas)
- [ ] Для кожного кластера визначити: pillar page URL, target keyword, 10–30 supporting articles
- [ ] Побудувати повну Topical Coverage Map: які теми вже покриті, які відсутні
- [ ] Провести Topical Gap Analysis vs конкурентів (Content Gap у Ahrefs)
- [ ] Визначити пріоритет кластерів за: search volume × business value × competition
- [ ] Верифікувати, що кожен кластер внутрішньо перелінкований (spoke → hub та hub → spokes)
- [ ] Виявити cannibalization ризики: кілька сторінок конкурують за один keyword
- [ ] Вирішити cannibalization: consolidate, 301, canonical, або differentiate intent
- [ ] Побудувати Entity Map: які entities (люди, місця, продукти, концепції) релевантні для бізнесу

### 3.3 SERP Analysis & Intent Alignment

- [ ] Проаналізувати SERP для кожного target keyword: тип контенту, формат, довжина
- [ ] Визначити домінуючий content format: article / list / how-to / tool / video / product page
- [ ] Перевірити SERP features: Featured Snippet, PAA, Local Pack, Image Pack, Video Carousel, AI Overview
- [ ] Визначити, які SERP features вже займають конкуренти та як увійти
- [ ] Перевірити zero-click частку: keyword з Featured Snippet = менше clicks → адаптувати стратегію
- [ ] Визначити AI Overview presence для кожного keyword (якщо SGE активний)
- [ ] Визначити keyword difficulty реалістично: враховувати DR сайту клієнта
- [ ] Пріоритизувати "quick win" keywords: позиції 4–15 з низькою difficulty

---

## PHASE 4 — ON-PAGE SEO OPTIMIZATION {#phase-4}

### 4.1 Title Tags

- [ ] Кожна сторінка має унікальний title tag
- [ ] Довжина: 50–60 символів (≤ 600px ширина у SERP)
- [ ] Primary keyword у title, бажано на початку
- [ ] Для комерційних сторінок: включити CTA-слово (Best, Top, Affordable, Certified)
- [ ] Для інформаційних: включити benefit або question format
- [ ] Перевірити SERP preview через SEO tools (чи не truncated)
- [ ] Уникати keyword stuffing та дублікатів title tags
- [ ] Не використовувати pipe (|) або тире між brand та keyword — тільки там, де потрібно

### 4.2 Meta Descriptions

- [ ] Кожна сторінка має унікальний meta description
- [ ] Довжина: 140–160 символів
- [ ] Включити primary + secondary keyword природно
- [ ] Включити CTA або value proposition
- [ ] Не дублювати title tag
- [ ] Перевірити, що Google не перегенеровує з контенту (якщо так — покращити meta)

### 4.3 Heading Structure

- [ ] Одна H1 на кожній сторінці — містить primary keyword
- [ ] H2 для основних секцій — використовувати secondary keywords та LSI
- [ ] H3 для підсекцій — використовувати long-tail та question-based keywords
- [ ] Heading ієрархія логічна (H1 → H2 → H3, не пропускати рівні)
- [ ] H2/H3 headings формулювати як відповіді на питання (AEO optimization)
- [ ] Перевірити, що headings описують контент секції, а не є декоративними

### 4.4 Content On-Page Elements

- [ ] Primary keyword у першому параграфі (within first 100 words)
- [ ] LSI keywords розподілені природно по тексту
- [ ] Внутрішні посилання: мінімум 3–5 на статтю до релевантних cluster pages
- [ ] Зовнішні посилання: 1–3 на авторитетні зовнішні джерела (відкриваються в новій вкладці)
- [ ] Anchor text внутрішніх посилань: descriptive, keyword-rich (не "click here")
- [ ] Image alt text: описовий, містить keyword де природньо
- [ ] Images мають caption де доречно
- [ ] URL slug: короткий, keyword-rich, без stop words
- [ ] Перевірити Open Graph tags: og:title, og:description, og:image, og:url, og:type
- [ ] Перевірити Twitter Card tags
- [ ] Додати og:image на всі ключові сторінки (розмір ≥ 1200×630px)
- [ ] Додати article:published_time та article:modified_time для статей
- [ ] Перевірити відсутність duplicate content через canonical або noindex

### 4.5 Content Formatting for Readability & AI Parsing

- [ ] Абзаци: 2–4 речення, максимум 5
- [ ] Bulleted/numbered lists для переліків (AI systems та Featured Snippets люблять lists)
- [ ] Bold для ключових термінів та важливих statements (не overuse)
- [ ] Tables для порівнянь, цін, характеристик
- [ ] Short paragraphs + subheadings кожні 200–300 слів
- [ ] Включити TL;DR або "Key Takeaways" блок на початку або кінці
- [ ] Додати anchor links (Table of Contents) для довгих статей

---

## PHASE 5 — CONTENT STRATEGY & PRODUCTION {#phase-5}

### 5.1 Content Brief Creation

- [ ] Кожна нова стаття/сторінка починається з Content Brief
- [ ] Content Brief містить: target keyword, secondary keywords, search intent, target word count, required headings structure, internal linking plan, external sources to cite, competitor URLs to analyze, E-E-A-T requirements (author, data, examples)
- [ ] Визначити content format: article / list / how-to / comparison / FAQ / case study / tool
- [ ] Визначити target Featured Snippet format: paragraph (40–60 слів), list, table, або step-by-step
- [ ] Визначити AEO-optimization: які питання відповісти прямо у H2/H3 + paragraph
- [ ] Визначити необхідні schema types для сторінки
- [ ] Визначити multimedia requirements: images, video, infographic, data table
- [ ] Підтвердити автора та його credentials для E-E-A-T

### 5.2 Content Production Standards

- [ ] Мінімальна довжина визначається SERP аналізом, не довільно (median of top 5 results)
- [ ] Original data, statistics, або case studies де можливо (не тільки re-stating industry stats)
- [ ] Всі зовнішні statistics атрибутовані з посиланням на першоджерело (не на агрегатори)
- [ ] Уникати AI-generated filler content без редакторської перевірки
- [ ] Забезпечити factual accuracy: всі цифри, дати, назви верифіковані
- [ ] Перевірити на плагіат (Copyscape або Originality.ai)
- [ ] Перевірити AI content detection (якщо политика клієнта вимагає)
- [ ] Включити первинні дослідження де можливо: surveys, original analysis, proprietary data
- [ ] Кожне factual claim підкріплене або internal data, або зовнішнім авторитетним джерелом

### 5.3 Content Calendar & Publishing Cadence

- [ ] Визначити publishing cadence реалістично: краще 1 якісна стаття/тиждень, ніж 5 слабких
- [ ] Пріоритизувати: спочатку Pillar Pages, потім Cluster Pages (від загального до конкретного)
- [ ] Запланувати content refreshes для існуючих сторінок (кожні 6–12 міс. для evergreen)
- [ ] Відстежувати content performance: органічний трафік, rankings, conversions по кожній сторінці
- [ ] Визначити "content decay" threshold: -20% трафіку за 3 міс. = trigger для refresh
- [ ] Побудувати Editorial Calendar у Notion/Airtable/GSheets із статусами та дедлайнами

### 5.4 Content Refresh Protocol

- [ ] Ідентифікувати сторінки з position 4–15 та declining traffic (quick win через refresh)
- [ ] Оновити outdated statistics та замінити посилання на нові першоджерела
- [ ] Додати нові секції на основі нових PAA питань
- [ ] Оновити dateModified у schema та meta
- [ ] Перевірити та оновити internal links (нові релевантні сторінки з'явились)
- [ ] Перевірити broken external links та замінити
- [ ] Додати нові multimedia (відео, infographic) якщо SERP конкуренти їх мають
- [ ] Подати URL для re-crawl через GSC після оновлення

---

## PHASE 6 — AI SEARCH OPTIMIZATION (GEO / AEO / SGE) {#phase-6}

### 6.1 Technical AI Accessibility

- [ ] Верифікувати robots.txt: явно дозволити GPTBot, ClaudeBot, OAI-SearchBot, Google-Extended, PerplexityBot, anthropic-ai, Applebot-Extended, cohere-ai, CCBot
- [ ] Перевірити, що AI-specific User-agent блоки в robots.txt не конфліктують з wildcard Disallow директивами
- [ ] Верифікувати відсутність JavaScript-gating для критичного контенту (статичний HTML > client-side rendering для AI)
- [ ] Перевірити server-side rendering або static generation для пріоритетних сторінок
- [ ] Забезпечити Content-Type: text/html з proper charset

### 6.2 llms.txt Implementation

- [ ] Створити /llms.txt у корені сайту (draft spec: llmstxt.org)
- [ ] llms.txt структура: `#` Name, `>` tagline, опис, `## Pages` з URL + description, `## Optional`
- [ ] Включити посилання на 8–12 найбільш citable сторінок з описом що кожна відповідає
- [ ] Включити коректну founding date, phone, address, pricing (якщо публічне)
- [ ] Додати ліцензійне statement (чи дозволено AI training vs citation only)
- [ ] Верифікувати відповідність між llms.txt даними та schema даними (ніяких суперечностей)
- [ ] Перевірити доступність /llms.txt (200 статус, без auth)

### 6.3 Passage-Level Citability

- [ ] Кожна стаття має містити ≥ 1 "citation-ready passage": 40–80 слів, самодостатній, фактичний
- [ ] Використовувати question-based H2/H3 headings (AI систематично шукає питання/відповіді)
- [ ] Пряма відповідь на H2 питання у першому реченні після heading (inverted pyramid)
- [ ] Уникати відповідей типу "це залежить від" без подальшої конкретизації
- [ ] Включити specific numbers, dates, locations, names — це підвищує citability
- [ ] Атрибутувати статистику першоджерелу (Google буде цитувати sourced stats > unsourced claims)
- [ ] Реалізувати FAQPage schema для питань, що можуть потрапити у AI Overviews
- [ ] Додати Definition блоки для ключових термінів галузі ("What is X?")
- [ ] Забезпечити entity clarity: чітко named entities (компанії, людей, місця) без ambiguity

### 6.4 AI Overview (Google SGE) Optimization

- [ ] Проаналізувати, які з target keywords показують AI Overview у SERP
- [ ] Для keyword з AI Overview: переглянути, чи клієнт цитується — якщо ні, розуміти чому
- [ ] Формат контенту для AI Overview eligibility: definition + context + 3 key points + example
- [ ] Додати "Key Takeaways" або "Summary" блок на початку/кінці статей
- [ ] Реалізувати structured content: lists, tables, step-by-step — AI Overview любить структуру
- [ ] Перевірити, чи Helpful Content signals виконані: original insight, expert authorship, clear audience
- [ ] Уникати clickbait titles: AI Overview не цитує "sensational" claims
- [ ] Забезпечити EEAT signals на кожній сторінці, що претендує на AI Overview

### 6.5 AEO — Answer Engine Optimization

- [ ] Ідентифікувати питання з PAA, AlsoAsked, AnswerThePublic для кожного topic cluster
- [ ] Побудувати FAQ секції на сервісних та пілонних сторінках (мінімум 5–8 питань)
- [ ] Відповіді у FAQ: 40–70 слів, прямий answer, потім expansion
- [ ] Реалізувати FAQPage schema на всіх FAQ секціях
- [ ] Оптимізувати Featured Snippet: визначити snippable keyword → структурувати відповідь
- [ ] Featured Snippet paragraph: 40–60 слів, відповідь на "what is X" або "how to X"
- [ ] Featured Snippet list: numbered steps або bulleted list з ≥ 5 items
- [ ] Featured Snippet table: comparison між 2–5 entities
- [ ] Перевірити, які PAA питання клієнт вже займає та розширити coverage

### 6.6 Perplexity, ChatGPT & Bing Copilot Optimization

- [ ] Забезпечити OAI-SearchBot доступ (OpenAI search crawler, окремий від GPTBot для training)
- [ ] Перевірити Bing Webmaster Tools: верифікувати сайт, перевірити IndexNow submission
- [ ] Подати sitemap у Bing Webmaster Tools
- [ ] Перевірити Bing indexation coverage (незалежно від Google)
- [ ] Для Perplexity: статичний HTML, FAQ schema, авторитетні зовнішні citations у тексті
- [ ] Забезпечити brand mentions на авторитетних зовнішніх сайтах (Perplexity збирає citations з веб)
- [ ] Моніторити brand mentions у ChatGPT/Perplexity відповідях (BrandMentions, Mention, або ручно)

---

## PHASE 7 — LOCAL SEO {#phase-7}

> *Застосовується для: brick-and-mortar, Service Area Business (SAB), hybrid, multi-location.*

### 7.1 Google Business Profile (GBP) Optimization

- [ ] Претендувати та верифікувати GBP listing
- [ ] Визначити business type: storefront (адреса публічна) vs SAB (адреса прихована)
- [ ] Вибрати primary GBP category — найточніша до core business (не generic)
- [ ] Додати всі релевантні secondary categories (до 9)
- [ ] Заповнити business description (750 символів): keywords природно, USP, areas served
- [ ] Завантажити ≥ 10 professional photos: exterior, interior, team, products/work, logo
- [ ] Додати business hours (включно зі special hours для holidays)
- [ ] Верифікувати NAP: ім'я, адреса, телефон ідентичні сайту та всім citations
- [ ] Додати website URL, booking link (якщо є), menu/services
- [ ] Заповнити Q&A: додати 5–10 seed питань та відповідей
- [ ] Публікувати GBP Posts ≥ 2x на місяць (offers, events, updates)
- [ ] Активно відповідати на всі відгуки (≤ 24 год response time)
- [ ] Налаштувати messaging через GBP (якщо доступно)
- [ ] Моніторити GBP Insights: queries, views, calls, direction requests

### 7.2 NAP Consistency & Citations

- [ ] Аудит всіх існуючих citations (BrightLocal / Whitespark / Moz Local)
- [ ] Виправити NAP inconsistencies у Tier 1 directories: Google, Yelp, BBB, Yellow Pages, Bing Places
- [ ] Додати citations у галузевих directories (Clutch, Agency Spotter, G2, Trustpilot)
- [ ] Видалити або виправити duplicate listings
- [ ] Забезпечити: однакові Name + Address + Phone + Website у всіх citations
- [ ] Перевірити телефон у форматі E.164 у schema (+1XXXXXXXXXX)
- [ ] Перевірити href="tel:+1XXXXXXXXXX" у всіх CTA

### 7.3 Review Strategy

- [ ] Налаштувати автоматичний review request (після delivery/service completion)
- [ ] Використовувати GBP review link (короткий URL) у email/SMS кампаніях
- [ ] Цільовий review velocity: ≥ 2–4 нових відгуки на місяць (постійно, не spike-and-drop)
- [ ] Відповідати на негативні відгуки протягом 24 год: empathy + resolution + offline contact
- [ ] Відповідати на позитивні відгуки: personalized, згадати конкретну деталь
- [ ] Не купувати fake reviews (penalty risk: GBP suspension)
- [ ] Embed live review widget на сайті (Elfsight, Grade.us, або Google's native embed)
- [ ] aggregateRating schema використовувати тільки якщо є live review widget на сторінці

### 7.4 Local Schema & On-Page Signals

- [ ] LocalBusiness schema на homepage та contact page: streetAddress, postalCode, addressRegion, geo (coordinates)
- [ ] geo координати: реальні, перевірені через Google Maps
- [ ] openingHoursSpecification object (не string) для rich result eligibility
- [ ] areaServed: всі обслуговувані міста/регіони (City objects або GeoShape)
- [ ] addressRegion: двобуквений provincial/state код (ON, BC, AB тощо)
- [ ] Embed Google Maps на contact page з Place ID (не generic query)
- [ ] Додати "Get Directions" CTA link → Google Maps Place ID URL
- [ ] Для multi-location: окрема сторінка для кожної локації з унікальним контентом та local schema

### 7.5 Local Landing Pages (Programmatic)

- [ ] Кожна local page: ≥ 40% унікального контенту (не просто city name swap)
- [ ] Унікальний local insight: статистика ринку, відомі бізнеси, райони, специфіка міста
- [ ] Локальний кейс або відгук з клієнта з цього міста
- [ ] Вказати neighbourhood-level targeting (для великих міст)
- [ ] Cross-linking між сервісами в одному місті ("Також у [City]: SEO | Google Ads | Web Design")
- [ ] Cross-linking між містами ("Сусідні міста: [City1] | [City2] | [City3]")
- [ ] Кожна local page індексована та в sitemap (якщо passed quality threshold)
- [ ] Не індексувати low-quality local pages — краще noindex ніж doorway page risk
- [ ] Застосовувати hreflang якщо є мультимовні local pages

---

## PHASE 8 — LINK BUILDING & DIGITAL PR {#phase-8}

### 8.1 Link Audit

- [ ] Аудит поточного backlink profile (Ahrefs / Semrush / Moz)
- [ ] Виявити toxic/spammy links (spam score, irrelevant anchors, PBN patterns)
- [ ] Підготувати disavow file якщо є критичні spam links (обережно — тільки очевидний spam)
- [ ] Проаналізувати anchor text distribution: branded / naked URL / exact match / generic
- [ ] Перевірити referring domain diversity: одна якісна нова domain > кілька links з одного
- [ ] Виявити lost links за останні 6 міс. та відновити через outreach

### 8.2 Link Building Strategy

- [ ] Визначити link building tactics відповідно до ніші та ресурсів:
  - Digital PR (data studies, original research, press releases)
  - Guest posting (авторитетні industry publications, не link farms)
  - Resource page link building (relevant resource lists у галузі)
  - Broken link building (знайти broken links у конкурентів → запропонувати свій контент)
  - HARO / Qwoted / SourceBottle (відповіді журналістам → earned media mentions)
  - Podcast appearances (нові referring domains + branded mentions)
  - Partnership links (certified partners, technology integrations)
  - Local citations (для local SEO)
- [ ] Скласти target link prospects list: ≥ 50 prospects на квартал
- [ ] Верифікувати кожен prospect: DR ≥ 30, organic traffic > 0, relevance, no spam
- [ ] Написати персоналізований outreach email (не шаблон): reference конкретну сторінку
- [ ] Follow-up не більше 2 рази (3–7 днів між follow-ups)
- [ ] Відстежувати outreach результати: sent / replied / placed / declined

### 8.3 Content-Based Link Acquisition

- [ ] Щоквартально публікувати ≥ 1 linkable asset: original research, comprehensive guide, free tool, interactive calculator, unique data study
- [ ] Promote linkable assets через: email outreach, social, paid promotion, PR wire
- [ ] Якщо є оригінальні дані/статистика — вони стають citation targets для інших авторів
- [ ] Моніторити згадки бренду без посилання → outreach з проханням додати link

---

## PHASE 9 — ANALYTICS, TRACKING & REPORTING SETUP {#phase-9}

### 9.1 Tracking Infrastructure

- [ ] Верифікувати GA4 implementation: всі сторінки, правильні events
- [ ] Налаштувати GA4 Conversions: form submissions, phone clicks, purchases, key micro-conversions
- [ ] Налаштувати GA4 Channel Groupings: "Organic Search" чітко відокремлений
- [ ] Верифікувати GSC connection до GA4
- [ ] Виключити internal traffic (IP filters або GA4 internal traffic definition)
- [ ] Верифікувати GSC: verify ownership, submit sitemap, налаштувати preferred domain
- [ ] Налаштувати GSC email alerts: manual actions, coverage drops, sitemap errors
- [ ] Налаштувати rank tracking у Ahrefs / Semrush / SERPWatcher для всіх target keywords
- [ ] Налаштувати rank tracking окремо: desktop vs mobile, geo-specific (місто/країна)
- [ ] Налаштувати backlink monitoring: alerts на нові та lost links (Ahrefs Alerts)
- [ ] Налаштувати brand mention monitoring (Google Alerts, Mention.com)
- [ ] Налаштувати uptime monitoring (UptimeRobot або Pingdom)
- [ ] Налаштувати Core Web Vitals monitoring (Vercel / Sentry / SpeedCurve)

### 9.2 SEO Dashboard

- [ ] Побудувати Looker Studio dashboard з: organic sessions, conversions, avg position, impressions, CTR, coverage, CWV status
- [ ] Окремий view: top landing pages by organic traffic
- [ ] Окремий view: keyword rankings movement (week-over-week)
- [ ] Окремий view: referring domains growth over time
- [ ] Окремий view: content performance (traffic per published article)
- [ ] Підключити GSC + GA4 + rank tracker до єдиного dashboard

### 9.3 Monthly Reporting Structure

- [ ] Executive Summary: 3–5 ключових takeaways (не просто цифри — insights)
- [ ] Traffic Report: organic sessions MoM та YoY
- [ ] Rankings Report: позиції для top-50 target keywords, wins/losses
- [ ] Conversions Report: organic-attributed leads/sales/revenue
- [ ] Technical Health: crawl errors, indexation changes, CWV status
- [ ] Content Performance: top нові сторінки, контент що потребує refresh
- [ ] Link Building Report: нові referring domains, DA growth
- [ ] Next Month Priorities: 3–5 конкретних дії з обґрунтуванням

---

## PHASE 10 — ONGOING OPTIMIZATION CADENCE {#phase-10}

### 10.1 Weekly Cadence

- [ ] Перевірити GSC Performance: різкі drops або спайки в impressions/clicks
- [ ] Перевірити rank tracking: значні зміни у позиціях (±5+ для пріоритетних keywords)
- [ ] Перевірити GSC Coverage: нові errors або excluded pages
- [ ] Перевірити uptime logs
- [ ] Review та відповісти на нові GBP відгуки (якщо local)
- [ ] Публікувати новий контент згідно editorial calendar
- [ ] Внести URL нового контенту для crawl у GSC

### 10.2 Monthly Cadence

- [ ] Повний rank tracking review: всі target keywords
- [ ] Content audit: виявити pages з declining traffic → queue for refresh
- [ ] Link building outreach: відправити ≥ 20 outreach emails
- [ ] Backlink audit: нові та lost links
- [ ] CWV check: польові дані у CrUX через GSC
- [ ] Schema validation: перевірити Enhancement reports у GSC
- [ ] Competitor monitoring: чи не зайняли нові позиції, нові backlinks
- [ ] Скласти та надіслати monthly report клієнту

### 10.3 Quarterly Cadence

- [ ] Стратегічний review: чи досягаємо KPI, чи потрібно коригувати стратегію
- [ ] Повний технічний аудит (мінімум key sections)
- [ ] Keyword universe refresh: нові terms у ніші, нові PAA питання
- [ ] Topical coverage audit: нові gaps vs конкуренти
- [ ] Content ROI review: які статті генерують найбільше conversions
- [ ] Link profile audit: spam score, diversity, anchor text distribution
- [ ] Competitor intelligence update: нові конкуренти, нові тактики
- [ ] Schema opportunities review: нові schema types, нові rich results
- [ ] Google algorithm updates review: вплив на сайт, адаптації
- [ ] AI search visibility review: чи цитується клієнт у ChatGPT/Perplexity/SGE

### 10.4 Google Algorithm Update Response Protocol

- [ ] Після кожного підтвердженого core update: порівняти трафік за 7 днів до та після
- [ ] Виявити сторінки, що втратили ≥ 30% трафіку
- [ ] Аналізувати: SERP shift (тип контенту що тепер займає позиції) → визначити нові вимоги
- [ ] Для Helpful Content updates: перевірити E-E-A-T, оригінальність, author credentials
- [ ] Для Core updates: перевірити topical authority, content depth, entity signals
- [ ] Для Spam updates: перевірити backlink profile, keyword stuffing, doorway pages
- [ ] Підготувати recovery plan: конкретні зміни, терміни, відповідальні

---

## TOOLS STACK & RESOURCE MATRIX {#tools-stack}

### Core SEO Tools

| Категорія | Primary | Alternative |
|---|---|---|
| Rank Tracking | Ahrefs / Semrush | SERPWatcher, Nightwatch |
| Site Audit / Crawl | Screaming Frog, Sitebulb | Ahrefs Site Audit |
| Keyword Research | Ahrefs, Semrush | Keyword Planner, AlsoAsked |
| Backlinks | Ahrefs | Moz, Semrush |
| Technical | Screaming Frog | Chrome DevTools, Lighthouse |
| Schema Testing | Rich Results Test | Schema.org Validator |
| CWV / Performance | PageSpeed Insights | SpeedCurve, WebPageTest |
| Analytics | GA4 | |
| Search Console | GSC | Bing Webmaster Tools |
| Local SEO | BrightLocal, Whitespark | Moz Local |
| Reporting | Looker Studio | |
| Content Optimization | Surfer SEO, Clearscope | MarketMuse |
| AI Search Monitoring | Brandwatch, Mention | Google Alerts |

### Key Reference Documents

| Документ | URL |
|---|---|
| Google Search Essentials | developers.google.com/search/docs/essentials |
| Google E-E-A-T Guidelines | developers.google.com/search/docs/fundamentals/creating-helpful-content |
| Google Spam Policies | developers.google.com/search/docs/essentials/spam-policies |
| Schema.org | schema.org |
| Google Rich Results Test | search.google.com/test/rich-results |
| PageSpeed Insights | pagespeed.web.dev |
| llms.txt spec | llmstxt.org |
| Core Web Vitals | web.dev/vitals |

---

## ДОДАТКИ

### Appendix A — Content Brief Template

```
CONTENT BRIEF

Page Title (Draft): 
Target URL: 
Target Keyword (Primary): 
Target Keywords (Secondary): 
Search Intent: [Informational / Commercial / Transactional / Navigational]
Target Word Count: [based on SERP median]
SERP Features to Target: [Featured Snippet / PAA / AI Overview / etc.]
Funnel Stage: [ToFU / MoFU / BoFU]

HEADING STRUCTURE
H1: 
H2: 
  H3: 
  H3: 
H2: 
  H3: 

INTERNAL LINKS TO INCLUDE
- [URL] — anchor text
- [URL] — anchor text

EXTERNAL SOURCES TO CITE
- 

SCHEMA TYPES REQUIRED
- 

E-E-A-T REQUIREMENTS
Author: 
Expertise signals needed: 
Data/studies to include: 

COMPETITOR URLS (top 3 to analyze)
- 
- 
- 
```

### Appendix B — Pre-Publish QA Checklist

- [ ] Title tag: unique, ≤ 60 chars, keyword included
- [ ] Meta description: unique, 140–160 chars, CTA included
- [ ] H1: one, contains primary keyword
- [ ] URL: short, lowercase, hyphens, no stop words
- [ ] Canonical tag: self-referencing, correct protocol
- [ ] og:image: присутня, ≥ 1200×630px
- [ ] Schema: реалізовано, перевірено у Rich Results Test
- [ ] Internal links: ≥ 3, descriptive anchor text
- [ ] Images: alt text, WebP format, explicit dimensions
- [ ] Author byline + bio: присутні та коректні
- [ ] datePublished / dateModified: виставлено у schema
- [ ] Mobile preview: виглядає коректно
- [ ] Page speed: не деградує vs baseline
- [ ] URL submitted for crawl у GSC після публікації

### Appendix C — Monthly SEO Health Score Card

| Metric | Target | Status |
|---|---|---|
| Organic Sessions (MoM) | +5% або більше | |
| Avg. Position (top keywords) | Покращення або утримання | |
| Indexation Rate | ≥ 95% target pages | |
| Core Web Vitals (LCP) | < 2.5s field data | |
| Core Web Vitals (INP) | < 200ms field data | |
| Core Web Vitals (CLS) | < 0.1 field data | |
| New Referring Domains (MoM) | + vs попередній місяць | |
| Schema Errors | 0 Critical errors у GSC | |
| Manual Actions | None | |
| Organic Conversions | + vs попередній місяць | |

---

*Документ підлягає оновленню щоквартально або після значних змін Google алгоритму.*
*Останнє оновлення: 2026-04 | Next review: 2026-07*

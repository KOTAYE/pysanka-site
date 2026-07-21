# Claude SEO — Список команд плагіну

> Плагін для автоматизованого SEO аудиту та просування сайтів через штучний інтелект.

## 🔗 Посилання

| Інструмент | Посилання |
|---|---|
| **Claude SEO** (для Claude Code) | [github.com/AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) |
| **Codex SEO** (для OpenAI Codex) | [github.com/AgriciDaniel/codex-seo](https://github.com/AgriciDaniel/codex-seo) |
| **Claude Code** (термінал) | [claude.ai/download](https://claude.ai/download) |

---

## Встановлення

### Claude SEO (Claude Code)
```bash
# Через плагін менеджер (Claude Code 1.0.33+)
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-seo

# Або вручну (Mac/Linux)
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git
bash claude-seo/install.sh

# Windows (PowerShell)
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git
powershell -ExecutionPolicy Bypass -File claude-seo\install.ps1
```

---

## 📋 Всі команди

### Основні
| Команда | Що робить |
|---|---|
| `/seo audit <url>` | Повний аудит сайту паралельними субагентами |
| `/seo page <url>` | Глибокий аналіз однієї сторінки |
| `/seo technical <url>` | Технічний SEO аудит (9 категорій) |
| `/seo content <url>` | E-E-A-T та якість контенту |

### Sitemap та Schema
| Команда | Що робить |
|---|---|
| `/seo sitemap <url>` | Аналіз існуючого XML sitemap |
| `/seo sitemap generate` | Генерація нового sitemap |
| `/seo schema <url>` | Перевірка, валідація та генерація Schema.org розмітки |

### Зображення та швидкість
| Команда | Що робить |
|---|---|
| `/seo images <url>` | Аналіз оптимізації зображень |
| `/seo google <command> <url>` | Google APIs: GSC, PageSpeed, CrUX, GA4 |
| `/seo google report <type>` | Генерація PDF/HTML звіту з графіками |

### Локальне SEO
| Команда | Що робить |
|---|---|
| `/seo local <url>` | Local SEO: Google Business Profile, citations, відгуки |
| `/seo maps <command>` | Геогрід, аудит GBP, конкуренти на мапі |

### Контент та ключові слова
| Команда | Що робить |
|---|---|
| `/seo cluster <keyword>` | Семантична кластеризація та контент-архітектура |
| `/seo plan <type>` | Стратегічний план (saas / local / ecommerce / publisher / agency) |
| `/seo programmatic <url>` | Аналіз програматичного SEO |
| `/seo competitor-pages <url>` | Генерація сторінок порівняння з конкурентами |

### Посилання та моніторинг
| Команда | Що робить |
|---|---|
| `/seo backlinks <url>` | Аналіз посилального профілю |
| `/seo drift baseline <url>` | Зберегти baseline для моніторингу змін |
| `/seo drift compare <url>` | Порівняти поточний стан з baseline |
| `/seo drift history <url>` | Історія SEO змін сайту |

### AI пошук та міжнародне SEO
| Команда | Що робить |
|---|---|
| `/seo geo <url>` | Оптимізація для AI пошуку (Google AI Overviews, ChatGPT, Perplexity) |
| `/seo sxo <url>` | Search Experience Optimization |
| `/seo hreflang <url>` | Аудит мультимовного SEO |

### E-commerce
| Команда | Що робить |
|---|---|
| `/seo ecommerce <url>` | SEO для інтернет-магазину: product schema, marketplace |

### Розширення (потребують окремого встановлення)
| Команда | Що робить |
|---|---|
| `/seo firecrawl <url>` | Повний краул сайту (розширення Firecrawl) |
| `/seo dataforseo <command>` | Живі дані SERP, keywords, backlinks (розширення DataForSEO) |
| `/seo image-gen <use-case> <desc>` | Генерація SEO зображень через AI (розширення Banana) |

---

## Як це працює

Плагін запускає **команду субагентів паралельно** — це не один AI а ціла команда:
- Один перевіряє технічні помилки
- Інший аналізує контент та E-E-A-T
- Третій дивиться schema розмітку
- Четвертий перевіряє Core Web Vitals

Результат — комплексний аудит за один запуск.

---

## 🌐 Сумісність із сайтами

| Тип сайту | Аудит | Автовнесення змін |
|---|---|---|
| WordPress | ✅ | ✅ через WP REST API |
| Статичний HTML | ✅ | ✅ прямо у файлах |
| Wix / Weblium / конструктори | ✅ | ❌ вручну через адмінку |

---

*Плагін безкоштовний. Потрібен Claude Code — [claude.ai/download](https://claude.ai/download)*

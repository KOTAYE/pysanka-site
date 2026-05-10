# 🥚 Писан•ка — майстерня писанкового розпису

Сайт майстерні авторського писанкового розпису Галини Сиротюк-Пʼятничук.
м. Коломия, Івано-Франківська область.

**Стилістика**: чорний / білий / помаранчевий (#E97000), шрифт Arsenal.
**Контент**: 16 писанок, 8 колекцій, 7 статей блогу.

---

## 🌐 Середовища

| Гілка | URL | Призначення |
|---|---|---|
| `main` | [pysanky-syrotiuk.netlify.app](https://pysanky-syrotiuk.netlify.app) | Production — для відвідувачів |
| `develop` | [develop--pysanky-syrotiuk.netlify.app](https://develop--pysanky-syrotiuk.netlify.app) | Staging — для тестів і фідбеку |

> ⚠️ Сайт зараз не індексується Google (`noindex`). Знімемо коли запустимо повноцінний магазин.

---

## 🔄 Робочий процес

### Як вносити зміни

1. **Перемкніться на `develop`**:
   ```bash
   git checkout develop
   git pull
   ```

2. **Внесіть правки** і закомітьте:
   ```bash
   git add .
   git commit -m "коротке пояснення змін"
   git push
   ```

3. **Перевірте на staging** (`develop--pysanky-syrotiuk.netlify.app`) — Netlify задеплоїть за хвилину

4. **Якщо все ОК** — створіть Pull Request `develop → main` на GitHub

5. **Merge PR** → Netlify задеплоїть на production

### Як зробити тестову правку

Завжди працюйте на `develop`. Прямий push на `main` заблоковано Branch Protection.

### Як зробити exhibit fix (екстрено)

Якщо щось зламалось у production:
1. На GitHub: знайдіть deploy → **Restore deploy** на Netlify
2. Або PR з фіксом `develop → main` зі скороченим рев'ю

---

## 🛠 Локальна розробка

### Через CodeSandbox (онлайн, найпростіше)

Відкрити у браузері: [codesandbox.io/p/github/Oleh1280/pysanka-site](https://codesandbox.io/p/github/Oleh1280/pysanka-site/main)

### Через StackBlitz (альтернатива)

[stackblitz.com/~/github.com/Oleh1280/pysanka-site](https://stackblitz.com/~/github.com/Oleh1280/pysanka-site)

### Локально на Mac/PC

```bash
git clone https://github.com/Oleh1280/pysanka-site.git
cd pysanka-site
npx serve -l 8080 .
# відкрити http://localhost:8080
```

Жодних залежностей встановлювати не треба — це чистий HTML/CSS/JS.

---

## 📁 Структура проєкту

```
pysanka-site/
├── index.html             # Головна
├── shop.html              # Магазин
├── product.html           # Сторінка товару (?id=N)
├── collections.html       # Колекції
├── blog.html              # Список статей
├── blog-post.html         # Стаття (?id=...)
│
├── styles.css             # Усі стилі
├── script.js              # Дані товарів, колекцій + рендер
├── pages.js               # Деталі товару + блогу + контент
├── layout.js              # Шапка + футер + кошик + checkout
│
├── images/                # Фото робіт майстрині
│   ├── hero-ostrich-white.jpg
│   ├── master-portrait.webp
│   └── ... (9 фото)
│
└── .codesandbox/
    └── tasks.json         # Конфіг для CodeSandbox dev server
```

---

## 🔮 Roadmap

- [x] **Фаза 0**: Git + Netlify workflow
- [ ] **Фаза 1**: Sanity CMS — майстриня сама керує контентом
- [ ] **Фаза 2**: Замовлення + email-сповіщення
- [ ] **Фаза 3**: LiqPay для онлайн-оплати
- [ ] **Фаза 4**: Власний домен + публічний запуск
- [ ] (опціонально) Аналітика, кабінет покупця

---

## 👥 Контакти

- **Майстриня**: Галина Сиротюк-Пʼятничук, [Instagram @g.syrotiuk](https://www.instagram.com/g.syrotiuk/)
- **GitHub**: [Oleh1280](https://github.com/Oleh1280)

---

> *«Я писанку створюю, не штампую. Перед тим як писати, треба обовʼязково помолитися — бо доки люди будуть писати писанки, доти буде добро на землі.»*
> — Галина Сиротюк-Пʼятничук

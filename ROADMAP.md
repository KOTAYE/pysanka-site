# 🗺 Roadmap проєкту Писан·ка

> Детальний план фаз для Claude Code. Що робимо далі і як саме.

---

## 📊 Загальна картина

```
Фаза 0: Робочий процес      [⚙️  В процесі]   ────  travень 2026
Фаза 1: Sanity CMS          [📅 Заплановано]  ────  ~2 тижні після Фази 0
Фаза 2: Замовлення + Email  [📅 Заплановано]  ────  ~1 тиждень після Фази 1
Фаза 3: LiqPay              [⏸ Чекає ФОП]     ────  коли Олег зареєструє ФОП
Фаза 4: Запуск              [📅 Заплановано]  ────  після Фази 3
```

Темп: вільний. Олег сказав *«ми працюємо у своє задоволення»*.

---

## 🎯 Фаза 0: Робочий процес (поточна)

### Мета
Створити безпечну і прозору схему роботи з Git і Netlify, щоб майбутні зміни
не ламали бойовий сайт.

### Завдання

#### 0.1 Створити develop гілку
```bash
git checkout main
git pull
git checkout -b develop
git push -u origin develop
```

#### 0.2 Branch Protection на main
Через GitHub UI або `gh api`:
- Require pull request before merging: ✅
- Required approvals: 0 (бо тільки одна людина в команді)
- Allow force pushes: ❌
- Allow deletions: ❌

#### 0.3 Branch Deploy на Netlify для develop
```bash
netlify env:list  # перевір що сайт правильний
```
Через Netlify UI: Site configuration → Build & deploy → Branches → Add `develop`.

#### 0.4 Перейменувати site
З `nimble-churros-45fe19` на щось пристойне.
Запропонувати Олегу варіанти.

#### 0.5 Залити документацію в репо
- README.md, CLAUDE.md, HANDOFF.md, ROADMAP.md → всі в develop
- Закомітити, запушити, створити PR develop → main

### Критерії готовності
- ✅ Push в main заблокований
- ✅ Staging URL працює і показує develop
- ✅ Production URL працює і показує main
- ✅ Pull Request work flow зрозумілий і протестований

---

## 🎯 Фаза 1: Sanity CMS

### Мета
Перевести контент (товари, статті, колекції) з hardcoded JS-масивів у Sanity,
щоб майстриня могла керувати контентом сама через зручний UI.

### Архітектура

```
┌─────────────────────────┐
│  Майстриня (admin UI)   │
│   pysanka.sanity.studio │
└───────────┬─────────────┘
            │ редагує
            ▼
┌─────────────────────────┐
│   Sanity Cloud Database │
│   (Free план: 100k API/міс) │
└───────────┬─────────────┘
            │ API
            ▼
┌─────────────────────────┐
│  Сайт (статика + JS)    │
│  pysanky-syrotiuk.app   │
└─────────────────────────┘
```

Сайт **залишається статичним**. Але `script.js` тепер при завантаженні робить
`fetch` до Sanity API замість використання hardcoded `PRODUCTS` масиву.

### Технічний стек

- **Sanity v3** — найновіша версія
- **Studio** — окремий проєкт, деплоїться на `pysanka.sanity.studio`
- **CDN** — Sanity автоматично роздає фото через свій CDN
- **API**: REST + GROQ (Sanity query language) або @sanity/client npm пакет

### Завдання

#### 1.1 Налаштування Sanity
```bash
# Олег реєструється на sanity.io з GitHub-акаунту
# Створює проєкт "pysanka-shop"
# Дає Claude Code Project ID + dataset name (зазвичай "production")

# В окремій папці:
mkdir ~/pysanka-studio
cd ~/pysanka-studio
npm create sanity@latest

# Питання при створенні:
# - Project name: Pysanka
# - Dataset: production  
# - Use TypeScript: yes
# - Template: Clean project with no predefined schemas
```

#### 1.2 Схеми даних

Створити в `pysanka-studio/schemas/`:

**`product.ts`**:
```typescript
export default {
  name: 'product',
  type: 'document',
  title: 'Писанка',
  fields: [
    { name: 'name', type: 'string', title: 'Назва', validation: R => R.required() },
    { name: 'slug', type: 'slug', title: 'URL', options: { source: 'name' } },
    { name: 'school', type: 'string', title: 'Школа', options: {
      list: ['Гуцульська', 'Покутська', 'Буковинська', 'Бойківська', 'Лемківська', 'Подільська', 'Авторська техніка']
    }},
    { name: 'price', type: 'number', title: 'Ціна (грн)' },
    { name: 'oldPrice', type: 'number', title: 'Стара ціна' },
    { name: 'eggType', type: 'string', title: 'Тип яйця', options: {
      list: [{ title: 'Куряче', value: 'curyche' }, { title: 'Гусяче', value: 'gusyache' }, { title: 'Страусове', value: 'strausyne' }]
    }},
    { name: 'description', type: 'text', title: 'Короткий опис' },
    { name: 'longDescription', type: 'array', of: [{ type: 'block' }], title: 'Повний опис' },
    { name: 'symbolism', type: 'text', title: 'Символіка' },
    { name: 'technique', type: 'text', title: 'Техніка' },
    { name: 'duration', type: 'string', title: 'Час роботи' },
    { name: 'colorPalette', type: 'string', title: 'Палітра кольорів' },
    { name: 'mainImage', type: 'image', title: 'Головне фото', options: { hotspot: true } },
    { name: 'gallery', type: 'array', of: [{ type: 'image' }], title: 'Галерея' },
    { name: 'inStock', type: 'boolean', title: 'У наявності', initialValue: true },
    { name: 'isFeatured', type: 'boolean', title: 'Бестселер' },
    { name: 'tag', type: 'string', title: 'Бейдж', options: {
      list: ['Хіт', 'Нове', 'Авторська', '-10%', '-15%', 'XL', 'Травлена']
    }},
    { name: 'createdAt', type: 'datetime', initialValue: () => new Date().toISOString() }
  ]
}
```

**`blogPost.ts`**:
```typescript
export default {
  name: 'blogPost',
  type: 'document',
  title: 'Стаття блогу',
  fields: [
    { name: 'title', type: 'string', validation: R => R.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'category', type: 'string', options: {
      list: ['Інтерв\'ю', 'Виставки', 'Традиція', 'Техніка', 'Колекції', 'Навчання']
    }},
    { name: 'excerpt', type: 'text', title: 'Анонс' },
    { name: 'intro', type: 'text', title: 'Вступний абзац' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }], title: 'Текст' },
    { name: 'coverImage', type: 'image' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'isPublished', type: 'boolean', initialValue: false },
    { name: 'sourceLabel', type: 'string', title: 'Джерело (назва)' },
    { name: 'sourceUrl', type: 'url', title: 'Джерело (URL)' },
    { name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: { type: 'blogPost' } }] }
  ]
}
```

**`collection.ts`**:
```typescript
export default {
  name: 'collection',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', type: 'text' },
    { name: 'coverImage', type: 'image' },
    { name: 'products', type: 'array', of: [{ type: 'reference', to: { type: 'product' } }] },
    { name: 'isFeatured', type: 'boolean' },
    { name: 'order', type: 'number', title: 'Порядок' }
  ]
}
```

#### 1.3 Скрипт-імпортер

Створи в `~/pysanka-studio/scripts/import.mjs`:
- Зчитує hardcoded `PRODUCTS` з нашого `script.js`
- Зчитує `BLOG_POSTS` з `pages.js`
- Завантажує фото з `images/` як Sanity assets
- Створює документи через Sanity Client API

```bash
node scripts/import.mjs
```

Очікуваний результат:
- 16 документів `product` створено
- 7 документів `blogPost` створено
- 8 документів `collection` створено
- Усі 9 фото завантажені в Sanity Assets

#### 1.4 Інтеграція з сайтом

Замінити hardcoded дані в `script.js` на API виклики:

```javascript
// Old:
// const PRODUCTS = [{ id: 1, name: '...', ... }, ...];

// New:
let PRODUCTS = [];

async function loadProducts() {
  const projectId = 'YOUR_PROJECT_ID';
  const dataset = 'production';
  const query = encodeURIComponent('*[_type == "product"] | order(_createdAt desc)');
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
  
  const res = await fetch(url);
  const data = await res.json();
  PRODUCTS = data.result;
  
  renderProducts('products-grid'); // re-render
}

document.addEventListener('DOMContentLoaded', loadProducts);
```

⚠️ Важливо: Sanity Project ID — публічний (не секрет), його можна писати прямо в JS.
Приватним є тільки Editor token (для запису), і він використовується тільки в скриптах
імпорту і Studio.

#### 1.5 Оптимізація фото через Sanity CDN

Sanity автоматично віддає фото через `cdn.sanity.io` з можливістю трансформацій:

```javascript
function imageUrl(asset, width = 800) {
  // Sanity image asset reference: image-abc123-1200x900-jpg
  const ref = asset._ref || asset.asset?._ref;
  if (!ref) return '';
  const [_, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/${PROJECT_ID}/production/${id}-${dimensions}.${format}?w=${width}&fit=max&auto=format`;
}
```

Це безкоштовно, дає WebP автоматично, не потрібен власний CDN.

#### 1.6 Доступ майстрині

```bash
# В Sanity → Manage → Members
# Запросити: galyna.syrotiuk@example.com
# Роль: Editor (може створювати/редагувати, не може видаляти проєкт)
```

Зробити їй коротке відео-інструкцію (10 хв) про те як:
- Зайти в studio
- Додати товар
- Завантажити фото
- Опублікувати

### Критерії готовності
- ✅ Усі 16 товарів в Sanity, відображаються на сайті
- ✅ Усі 7 статей в Sanity, відображаються на сайті
- ✅ Зміна в Sanity → за хвилину видна на сайті
- ✅ Майстриня успішно зробила тестову зміну сама

### Бюджет
- Sanity Free план: 0 ₴/міс (3 юзери, 100k API/міс, 1 ГБ файлів)
- Достатньо до ~5000 відвідувачів на місяць

---

## 🎯 Фаза 2: Замовлення + Email

### Мета
Замість зараз працюючого `alert()` після оформлення — реальне зберігання
замовлень і автоматичні email-сповіщення.

### Архітектура

```
Покупець → Форма checkout 
         ↓
      Netlify Function /api/order
         ├─→ Sanity (новий тип "order")
         ├─→ Resend Email API
         │   ├─→ Майстрині
         │   └─→ Покупцю
         └─→ Відповідь покупцю
```

### Стек
- **Netlify Functions** (вбудовано в наш план)
- **Resend.com** (3000 безкоштовних email/місяць)
- **Sanity** для зберігання

### Завдання

#### 2.1 Схема Order у Sanity

```typescript
{
  name: 'order',
  type: 'document',
  fields: [
    { name: 'orderNumber', type: 'string', readOnly: true },
    { name: 'status', type: 'string', options: {
      list: ['new', 'confirmed', 'paid', 'packed', 'shipped', 'delivered', 'cancelled']
    }},
    { name: 'customer', type: 'object', fields: [
      { name: 'name', type: 'string' },
      { name: 'phone', type: 'string' },
      { name: 'email', type: 'email' }
    ]},
    { name: 'delivery', type: 'object', fields: [
      { name: 'city', type: 'string' },
      { name: 'np', type: 'string', title: 'Нова Пошта №' }
    ]},
    { name: 'items', type: 'array', of: [{ type: 'object', fields: [
      { name: 'product', type: 'reference', to: { type: 'product' } },
      { name: 'quantity', type: 'number' },
      { name: 'price', type: 'number' }
    ]}]},
    { name: 'total', type: 'number' },
    { name: 'paymentMethod', type: 'string', options: {
      list: ['cod', 'card']
    }},
    { name: 'comment', type: 'text' },
    { name: 'createdAt', type: 'datetime' }
  ]
}
```

#### 2.2 Netlify Function

Створити `netlify/functions/order.js`:

```javascript
import { createClient } from '@sanity/client';
import { Resend } from 'resend';

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_TOKEN, // Editor token
  apiVersion: '2024-01-01'
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req) => {
  const { customer, delivery, items, paymentMethod, comment } = await req.json();
  
  const orderNumber = generateOrderNumber();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
  // 1. Save to Sanity
  const order = await sanity.create({
    _type: 'order',
    orderNumber,
    status: 'new',
    customer, delivery, items, total, paymentMethod, comment,
    createdAt: new Date().toISOString()
  });
  
  // 2. Send email to master
  await resend.emails.send({
    from: 'no-reply@pysanka.com.ua',
    to: 'galyna@example.com',
    subject: `Нове замовлення №${orderNumber}`,
    html: buildMasterEmail(order)
  });
  
  // 3. Send email to customer
  if (customer.email) {
    await resend.emails.send({
      from: 'shop@pysanka.com.ua',
      to: customer.email,
      subject: `Ваше замовлення №${orderNumber} прийнято`,
      html: buildCustomerEmail(order)
    });
  }
  
  return Response.json({ orderNumber });
};

function generateOrderNumber() {
  return String(2500 + Math.floor(Math.random() * 7500)); // 2500-9999
}
```

#### 2.3 Frontend integration

В `layout.js` замінити `submitOrder()`:

```javascript
async function submitOrder(event) {
  event.preventDefault();
  const form = event.target;
  
  const orderData = {
    customer: {
      name: form.querySelector('[type=text]').value,
      phone: form.querySelector('[type=tel]').value,
      email: form.querySelector('[type=email]').value
    },
    delivery: {
      city: form.querySelectorAll('[type=text]')[1].value,
      np: form.querySelectorAll('[type=text]')[2].value
    },
    items: getCart(),
    paymentMethod: getSelectedPayment(),
    comment: form.querySelector('textarea').value
  };
  
  try {
    const res = await fetch('/.netlify/functions/order', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    const { orderNumber } = await res.json();
    
    showOrderSuccess(orderNumber);
    clearCart();
  } catch (err) {
    showError('Не вдалося оформити замовлення. Спробуйте пізніше.');
  }
  return false;
}
```

#### 2.4 Сторінка перевірки замовлення

Нова сторінка `order-status.html?number=XXXX&phone=YYYY`:
- Просте поле введення номера + телефону
- Netlify Function `/api/order-status` шукає в Sanity і повертає статус
- Без логіну, без кабінету — як було вирішено

#### 2.5 Email-шаблони

Олегу можна підготувати красиві HTML-шаблони листів. Або взяти з [react.email](https://react.email).
Базові шаблони — простий HTML із стилями inline.

### Бюджет
- Resend: 3000 email/міс безкоштовно — для 50-100 замовлень з кратністю 2 (master + customer) це 200 email/міс. Безкоштовно надовго.
- Netlify Functions: 125k запитів/міс безкоштовно — досить.

### Критерії готовності
- ✅ Замовлення створюється і зберігається в Sanity
- ✅ Майстриня отримує email одразу
- ✅ Покупець отримує підтвердження email
- ✅ Можна перевірити статус замовлення на сайті за номером

---

## 🎯 Фаза 3: LiqPay (онлайн-оплата)

⚠️ **Чекає реєстрації ФОП у Олега**.

### Мета
Покупець може оплатити замовлення карткою на сайті, не чекаючи накладеного платежу.

### Стек
- **LiqPay** від ПриватБанку — найпопулярніший шлюз в Україні
- API key + private key з кабінету LiqPay (потрібен ФОП)

### Завдання

#### 3.1 Реєстрація в LiqPay
1. Олег реєструє ФОП (поза цим планом)
2. Заводить ФОП-рахунок в ПриватБанку
3. Реєструється на www.liqpay.ua
4. Отримує:
   - Public key (можна в коді)
   - Private key (тільки в Netlify Env Vars!)

#### 3.2 Інтеграція

```javascript
// netlify/functions/payment-init.js
import crypto from 'crypto';

export default async (req) => {
  const { orderNumber, amount, description } = await req.json();
  
  const params = {
    public_key: process.env.LIQPAY_PUBLIC_KEY,
    version: 3,
    action: 'pay',
    amount: amount,
    currency: 'UAH',
    description: description,
    order_id: orderNumber,
    result_url: `https://pysanka.com.ua/payment-success?order=${orderNumber}`,
    server_url: 'https://pysanka.com.ua/.netlify/functions/payment-callback'
  };
  
  const data = Buffer.from(JSON.stringify(params)).toString('base64');
  const signature = crypto
    .createHash('sha1')
    .update(process.env.LIQPAY_PRIVATE_KEY + data + process.env.LIQPAY_PRIVATE_KEY)
    .digest('base64');
    
  return Response.json({ data, signature });
};
```

```javascript
// netlify/functions/payment-callback.js
// Webhook від LiqPay про успіх/невдачу платежу
// Оновлює статус замовлення в Sanity на 'paid' або 'failed'
// Відправляє email покупцю про успіх
```

#### 3.3 Frontend

На сторінці success після створення замовлення:
- Якщо `paymentMethod === 'card'` → отримати data+signature з payment-init функції
- Поставити форму LiqPay і автоматично submit
- Покупець на сторінці оплати LiqPay
- Після оплати повертається на result_url

### Критерії готовності
- ✅ LiqPay тестовий акаунт працює (sandbox)
- ✅ Платіж проходить, статус оновлюється
- ✅ Production акаунт активований після реєстрації ФОП
- ✅ Перший реальний платіж пройшов успішно

---

## 🎯 Фаза 4: Бойовий запуск

### Мета
Прибрати noindex, підключити власний домен, дати майстрині URL для розповсюдження.

### Завдання

#### 4.1 Власний домен

Олег обирає і реєструє домен.
Варіанти:
- `pysanka.com.ua` — короткий, локалізований (~250-600 ₴/рік)
- `syrotiuk.com.ua` — фамілія майстрині
- `koliada.com.ua` — символічно
- `pysanky.com.ua` — множина

Реєстратори: imena.ua, hostpro.ua, ukrnames.com.

#### 4.2 Підключення до Netlify

```bash
# В Netlify UI: Domain settings → Add custom domain
# Додати DNS записи у реєстратора:
#   A     @    75.2.60.5
#   CNAME www  apex-loadbalancer.netlify.com
```

Netlify автоматично згенерує SSL через Let's Encrypt.

#### 4.3 Прибрати noindex

В усіх HTML файлах знайти `<meta name="robots" content="noindex, nofollow">` і видалити.

```bash
sed -i '' '/name="robots"/d' *.html
git add . && git commit -m "Phase 4: Public launch" && git push
```

#### 4.4 SEO базове

Додати в `<head>` кожного HTML:
- `<meta name="description" content="...">` (унікально для кожної сторінки)
- `<meta property="og:title" content="...">` 
- `<meta property="og:image" content="...">`
- `<meta name="twitter:card" content="summary_large_image">`

#### 4.5 Аналітика (опціонально)

Підключити **Plausible** ($9/міс) або self-hosted **Umami** (безкоштовно):
- Без cookies, GDPR-compliant
- Топ-сторінки, джерела трафіку, conversion

### Критерії готовності
- ✅ pysanka.com.ua → основна продакшн URL
- ✅ www.pysanka.com.ua → редірект на основний
- ✅ HTTPS працює (зелений замочок)
- ✅ Google може індексувати (перевір через `site:pysanka.com.ua`)
- ✅ Майстриня поділилася в Instagram

---

## 🔮 Майбутні ідеї (не пріоритет)

- Кабінет покупця (якщо обсяг виросте до 100+ замовлень/міс)
- Онлайн-чат з майстринею (Tidio, Crisp)
- Інтеграція з Pinterest API (автоматичне завантаження нових робіт)
- Англомовна версія
- Експорт каталогу як PDF (для виставок)
- Bulk-розсилка для підписників (новини, нові колекції)

---

## 📞 Питання до Олега, коли стане час кожної фази

### Перед Фазою 1
- Обрати unique Sanity Project ID (буде в URL studio)
- Email майстрині для запрошення в Sanity
- Запис відео-інструкції — Олег чи Claude Code робить?

### Перед Фазою 2
- Email майстрині для отримання замовлень
- Шаблон email на її смак (формальний/дружній)
- Власний email-адресу від домену чи поки `*@pysanka.com.ua`?

### Перед Фазою 3
- Статус ФОП реєстрації
- Чи готовий банківський рахунок для LiqPay
- Тести в sandbox перед production?

### Перед Фазою 4
- Який домен обираємо
- Чи запускати з аналітикою одразу
- План анонсу (Instagram пост майстрині, Pinterest, тощо)

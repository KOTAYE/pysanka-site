/* =================================================================
   PYSANKA SITE — SHARED LAYOUT (klamra-style: dark header, no topbar)
   ================================================================= */

const HEADER_HTML = (active) => `
<header>
  <div class="header-inner">
    <a href="index.html" class="logo">
      <span class="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="22" rx="13" ry="17" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M7 18 Q20 14 33 18 M7 30 Q20 34 33 30" stroke="#E97000" stroke-width="1.5" fill="none"/>
          <circle cx="20" cy="22" r="3.5" fill="#E97000"/>
        </svg>
      </span>
      Писан<span>•</span>ка
    </a>

    <nav class="main-nav">
      <div class="nav-item ${active === 'shop' ? 'active' : ''}">
        <a href="shop.html">Магазин <span class="chev"></span></a>
        <div class="nav-dropdown">
          <a href="shop.html">Усі писанки</a>
          <a href="shop.html?school=Гуцульська">Гуцульські</a>
          <a href="shop.html?school=Покутська">Покутські</a>
          <a href="shop.html?school=Буковинська">Буковинські</a>
          <a href="shop.html?school=Бойківська">Бойківські</a>
          <a href="shop.html?school=Лемківська">Лемківські</a>
          <a href="shop.html?school=Подільська">Подільські</a>
          <a href="shop.html?school=Авторська техніка">Травлені та страусові</a>
        </div>
      </div>
      <div class="nav-item ${active === 'collections' ? 'active' : ''}">
        <a href="collections.html">Колекції <span class="chev"></span></a>
        <div class="nav-dropdown">
          <a href="collections.html">Усі колекції</a>
          <a href="collections.html#hutsul">Гуцульська школа</a>
          <a href="collections.html#pokuttya">Покутська школа</a>
          <a href="collections.html#bukovyna">Буковинська школа</a>
          <a href="collections.html#boyko-lemko">Бойківська і Лемківська</a>
          <a href="collections.html#etched">Травлені писанки</a>
          <a href="collections.html#ostrich">Страусові</a>
          <a href="collections.html#easter">Великодні</a>
        </div>
      </div>
      <div class="nav-item ${active === 'events' ? 'active' : ''}">
        <a href="events.html">Події</a>
      </div>
      <div class="nav-item ${active === 'blog' ? 'active' : ''}">
        <a href="blog.html">Блог</a>
      </div>
      <div class="nav-item ${active === 'contacts' ? 'active' : ''}">
        <a href="index.html#contacts">Контакти</a>
      </div>
    </nav>

    <div class="header-actions">
      <div class="header-phone">
        <span class="label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
          +380 97 000 00 01
          <span class="chev"></span>
        </span>
        <div class="header-phone-list">
          <a href="tel:+380970000001">+380 97 000 00 01</a>
          <a class="order-call" onclick="alert('Форма зворотного дзвінка')">Замовити дзвінок</a>
        </div>
      </div>
      <button class="theme-toggle" onclick="toggleTheme(); reRenderPysanky();" aria-label="Змінити тему">
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      </button>
      <button onclick="alert('Пошук — буде додано')" aria-label="Пошук" style="display:flex;align-items:center;gap:6px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>
      </button>
      <button onclick="openCart()" aria-label="Кошик">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 7h12l-1.5 11h-9L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
        Кошик<span class="cart-count" data-cart-count>0</span>
      </button>
    </div>

    <button class="burger" aria-label="Меню" onclick="alert('Мобільне меню')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
</header>
`;

const FOOTER_HTML = `
<section class="newsletter">
  <div class="container">
    <h2>Підписатися на <i>новини</i></h2>
    <p>Дізнавайтесь першими про нові колекції, відкриття бронювань і традиції писанкарства.</p>
    <form class="newsletter-form" onsubmit="event.preventDefault(); showToast('Дякуємо за підписку!')">
      <input type="email" placeholder="Ваша електронна пошта" required>
      <button type="submit">Підписатися</button>
    </form>
  </div>
</section>
<footer id="contacts">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">Писан<span>•</span>ка</div>
        <p class="footer-tag">Майстерня авторського писанкового розпису. Майстриня — Галина Сиротюк-П'ятничук, членкиня Національної спілки майстрів народного мистецтва України з 2006 року.</p>
        <div class="footer-payments">
          Доставка: <span class="badge">Нова Пошта</span> · Оплата: <span class="badge">Накладений платіж</span> <span class="badge">Переказ на картку</span>
        </div>
      </div>
      <div class="footer-col">
        <h5>Інтернет-магазин</h5>
        <a href="#">Договір-оферта</a>
        <a href="#">Умови використання сайту</a>
        <a href="#">Доставка та оплата</a>
        <a href="#">Як зберігати писанку</a>
        <a href="events.html">Події</a>
        <a href="blog.html">Блог</a>
        <a href="#contacts">Контакти</a>
      </div>
      <div class="footer-col">
        <h5>Категорії товару</h5>
        <a href="shop.html?school=Гуцульська">Гуцульські писанки</a>
        <a href="shop.html?school=Покутська">Покутські писанки</a>
        <a href="shop.html?school=Буковинська">Буковинські писанки</a>
        <a href="shop.html?school=Бойківська">Бойківські писанки</a>
        <a href="shop.html?school=Лемківська">Лемківські писанки</a>
        <a href="shop.html">Усі писанки</a>
      </div>
      <div class="footer-col">
        <h5>Зв'язок</h5>
        <a href="tel:+380970000001">+380 97 000 00 01</a>
        <a href="mailto:hello@pysanka.ua">hello@pysanka.ua</a>
        <p>Пн-Пт, 9:00 – 18:00</p>
        <p style="margin-top:14px">м. Коломия, Івано-Франківська область</p>
        <div style="display:flex;gap:10px;margin-top:14px;">
          <a href="https://www.instagram.com/g.syrotiuk/" target="_blank" rel="noopener" style="display:inline-flex;width:34px;height:34px;border:1px solid rgba(255,255,255,0.25);border-radius:50%;align-items:center;justify-content:center;margin-bottom:0;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
          </a>
          <a href="https://www.pinterest.com/surotuyk/" target="_blank" rel="noopener" style="display:inline-flex;width:34px;height:34px;border:1px solid rgba(255,255,255,0.25);border-radius:50%;align-items:center;justify-content:center;margin-bottom:0;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M8 19 L12 8 M12 8 Q15 8 15 11 Q15 14 12 14"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Майстерня писанкового розпису Галини Сиротюк-П'ятничук</span>
      <span>Усі права захищено</span>
    </div>
  </div>
</footer>

<!-- Cart Drawer -->
<div class="cart-drawer-bg" id="cart-drawer-bg" onclick="closeCart()"></div>
<aside class="cart-drawer" id="cart-drawer">
  <div class="cart-header">
    <h3>Ваш кошик</h3>
    <button class="cart-close" onclick="closeCart()" aria-label="Закрити">×</button>
  </div>
  <div class="cart-body"></div>
  <div class="cart-footer"></div>
</aside>

<!-- Checkout Modal -->
<div class="checkout-modal-bg" id="checkout-modal-bg" onclick="if(event.target.id==='checkout-modal-bg') closeCheckout()">
  <div class="checkout-modal" id="checkout-modal">
    <button class="close" onclick="closeCheckout()">×</button>
    <h3>Оформлення <i>замовлення</i></h3>
    <p class="sub">Менеджер передзвонить протягом доби для підтвердження. Оплата — після підтвердження замовлення.</p>

    <form onsubmit="return submitOrder(event)">
      <div class="checkout-form-row">
        <div>
          <label>Прізвище та ім'я *</label>
          <input type="text" required placeholder="Іван Петренко">
        </div>
        <div>
          <label>Телефон *</label>
          <input type="tel" required placeholder="+380 __ ___ __ __">
        </div>
      </div>
      <div class="checkout-form-row full">
        <div>
          <label>Email</label>
          <input type="email" placeholder="ваша@пошта.com">
        </div>
      </div>
      <div class="checkout-form-row">
        <div>
          <label>Місто *</label>
          <input type="text" required placeholder="Київ">
        </div>
        <div>
          <label>Відділення Нової Пошти *</label>
          <input type="text" required placeholder="№ 23">
        </div>
      </div>
      <div class="checkout-form-row full">
        <div>
          <label>Коментар до замовлення</label>
          <textarea placeholder="Особливі побажання, упаковка для подарунка тощо"></textarea>
        </div>
      </div>

      <label style="margin-top: 14px;">Спосіб оплати *</label>
      <div class="payment-options">
        <div class="payment-option selected" onclick="selectPayment(this)">
          <strong>Накладений платіж</strong>
          <span>Оплата при отриманні</span>
        </div>
        <div class="payment-option" onclick="selectPayment(this)">
          <strong>Переказ на картку</strong>
          <span>Реквізити після підтвердження</span>
        </div>
      </div>

      <div class="checkout-summary"></div>

      <button type="submit" class="cart-checkout">Підтвердити замовлення</button>
    </form>
  </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const headerSlot = document.querySelector('[data-header]');
  if (headerSlot) headerSlot.innerHTML = HEADER_HTML(headerSlot.getAttribute('data-header'));

  const footerSlot = document.querySelector('[data-footer]');
  if (footerSlot) footerSlot.innerHTML = FOOTER_HTML;

  updateCartCount();
});

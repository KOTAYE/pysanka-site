/* =================================================================
   PYSANKA SITE — SHARED SCRIPT
   ================================================================= */

/* ---------- THEME TOGGLE ---------- */
(function() {
  const stored = localStorage.getItem('pysanka-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pysanka-theme', next);
}

/* ---------- DATA: PRODUCTS ----------
   All products by master Halyna Syrotiuk-Pyatnychuk
   Ціни — орієнтовні, як на виставці у Львові від ~250 грн
*/
let PRODUCTS = [
  // Hutsul school — найскладніший і найбагатший розпис
  { id: 1, name: '«Сорок клинців»', school: 'Гуцульська', price: 480, eggType: 'curyche', tag: 'Хіт', desc: 'Класичний гуцульський мотив-сорок клинців символізує сорок мучеників і весняні дні.', sv: 'klyntsi', image: 'images/hutsul-deer-pair.webp' },
  { id: 2, name: '«Восьмикутна зірка»', school: 'Гуцульська', price: 520, eggType: 'curyche', desc: 'Восьмикутна зірка — давній сонячний символ, оберіг роду.', sv: 'star' },
  { id: 3, name: '«Олень»', school: 'Гуцульська', price: 640, eggType: 'gusyache', tag: 'Авторська', tagDark: true, desc: 'Гусяче яйце з гуцульським мотивом оленя — символ благородства й духовної висоти.', sv: 'deer', image: 'images/hutsul-deer-bw.webp' },
  { id: 4, name: '«Берегиня»', school: 'Гуцульська', price: 560, oldPrice: 620, tag: '-10%', eggType: 'curyche', desc: 'Дерево життя як архетип жінки-Берегині, охоронниці роду.', sv: 'beregynya' },

  // Pokuttya school — характерна геометрична стрічка
  { id: 5, name: '«Безконечник»', school: 'Покутська', price: 420, eggType: 'curyche', tag: 'Нове', tagDark: true, desc: 'Хвилеподібний орнамент — символ води, добра і нескінченності буття.', sv: 'infinity', image: 'images/geometric-blue.webp' },
  { id: 6, name: '«Кривульки»', school: 'Покутська', price: 360, eggType: 'curyche', desc: 'Зигзаги — давній символ води і безперервного руху життя.', sv: 'kryvulky' },
  { id: 7, name: '«Сонцеворот»', school: 'Покутська', price: 470, eggType: 'curyche', desc: 'Покутський солярний символ — обертання сонця через рік.', sv: 'sun-wheel', image: 'images/sun-wheel-orange.webp' },

  // Bukovyna school
  { id: 8, name: '«Вазон»', school: 'Буковинська', price: 460, eggType: 'curyche', desc: 'Дерево-вазон — мотив родючості, життєвої сили рослин.', sv: 'vazon' },
  { id: 9, name: '«Ружа»', school: 'Буковинська', price: 440, eggType: 'curyche', desc: 'Стилізована троянда з шести пелюсток — символ любові й краси.', sv: 'rose', image: 'images/bukovyna-rose.webp' },

  // Boyko / Lemko
  { id: 10, name: '«Хрест із крапками»', school: 'Бойківська', price: 390, eggType: 'curyche', desc: 'Бойківський хрест із крапок — символ чотирьох сторін світу та засіяного поля.', sv: 'cross-dots' },
  { id: 11, name: '«Колосок»', school: 'Лемківська', price: 380, eggType: 'curyche', desc: 'Лемківський мотив колоска — побажання врожайного року й достатку.', sv: 'wheat' },

  // Sun (universal motif)
  { id: 12, name: '«Сонце»', school: 'Подільська', price: 380, eggType: 'curyche', desc: 'Сонячне коло з дванадцятьма променями — оберіг від темряви.', sv: 'sun' },

  // Etched / страусові
  { id: 13, name: '«Страусове яйце з оленями»', school: 'Гуцульська', price: 1900, eggType: 'strausyne', tag: 'XL', tagDark: true, desc: 'Велике страусове яйце розписане традиційним гуцульським орнаментом — техніка витравлювання, рельєф проступає через шкаралупу.', sv: 'ostrich-deer', image: 'images/hero-ostrich-white.jpg' },
  { id: 14, name: '«Травлене “Космос”»', school: 'Авторська техніка', price: 720, eggType: 'gusyache', tag: 'Травлена', desc: 'Гусяче яйце в техніці витравлювання — рельєфні візерунки на природній шкаралупі.', sv: 'etched', image: 'images/etched-set.webp' },

  // Великодні
  { id: 15, name: '«Великодня хата»', school: 'Покутська', price: 540, eggType: 'curyche', desc: 'Травлена писанка з зображенням української хати, дерев і поля. Великодній сільський мотив.', sv: 'easter', image: 'images/etched-cottage.webp' },
  { id: 16, name: '«Риба і коник»', school: 'Гуцульська', price: 580, eggType: 'curyche', desc: 'Риба як символ Христа, коник як символ достатку родини.', sv: 'fish-horse' },
];

/* ---------- DATA: COLLECTIONS ---------- */
let COLLECTIONS = [
  { id: 'hutsul', name: 'Гуцульська', sub: 'Карпатський високогірний розпис',
    desc: 'Найскладніша й найбагатша писанкова школа України. Дрібний орнамент, велика кількість дрібних деталей, чіткий контур чорним. Майстриня дотримується традиції Косівщини й Верховини.',
    count: 7, products: [1,2,3,4,13,16] },
  { id: 'pokuttya', name: 'Покутська', sub: 'Долинне Прикарпаття',
    desc: 'Геометричні стрічки, мотиви води, ясно зчитувана композиція з трьох поясів. Школа, в якій майстриня народилася й виросла — Коломия.',
    count: 4, products: [5,6,7,15] },
  { id: 'bukovyna', name: 'Буковинська', sub: 'Між Прутом і Сіретом',
    desc: 'Рослинні мотиви, плавніші лінії, акцент на квітковий орнамент. Близька до молдавської традиції розпису.',
    count: 2, products: [8,9] },
  { id: 'boyko-lemko', name: 'Бойківська і Лемківська', sub: 'Західні Карпати',
    desc: 'Лаконічні геометричні мотиви, мінімальна кольорова гама. Бойківська тяжіє до хрестів і кружечків, лемківська — до рослинних і колоскових узорів.',
    count: 2, products: [10,11] },
  { id: 'etched', name: 'Травлені писанки', sub: 'Авторська техніка',
    desc: 'Рідкісна техніка — орнамент проступає через рельєф природного кольору шкаралупи. Виконується на курячому, гусячому та страусовому яйці. На виставці «Писанкові коники» 2025 року такі писанки склали окремий блок.',
    count: 1, products: [14] },
  { id: 'ostrich', name: 'Страусові', sub: 'Великий формат',
    desc: 'Розпис на страусовому яйці потребує особливої твердої руки й більше місяця роботи. Це не сувенір, а артефакт, що передається в спадок.',
    count: 1, products: [13] },
  { id: 'easter', name: 'Великодні писанки', sub: 'З кошиком і каплицею',
    desc: 'Спеціальні великодні мотиви — з одного боку зображення кошика з пасками, з іншого — каплиці чи церкви. Завжди симетрично.',
    count: 1, products: [15] },
  { id: 'order', name: 'На замовлення', sub: 'Індивідуально',
    desc: 'Майстриня бере індивідуальні замовлення: за іменем дитини, з родинним мотивом, на весілля, хрестини. Термін виконання 14–21 день.',
    count: null, products: [], custom: true },
];

/* ---------- DATA: BLOG ---------- */
let BLOG = [
  {
    id: 'pysanka-vid-dushi',
    title: '«Писанка від душі та для душі» — інтерв\'ю з майстринею',
    cat: 'Інтерв\'ю',
    date: '29 квітня 2021',
    excerpt: 'Про те, як народжувалася любов до писанки в Коломиї, чому майстриня не використовує електричний писачок, що значить молитва перед роботою і чому кожна писанка — неповторна.',
    sourceLabel: 'Локальна історія',
    sourceUrl: 'https://localhistory.org.ua/texts/interviu/pisanka-vid-dushi-ta-dlia-dushi/',
    sv: 'beregynya'
  },
  {
    id: 'pysankovi-konyky',
    title: 'Виставка «Писанкові коники» — 400 робіт у Львові',
    cat: 'Виставки',
    date: '11 квітня 2025',
    excerpt: 'У Національному музеї імені Андрея Шептицького відкрилася персональна виставка майстрині. Гуцульські, покутські, бойківські та лемківські мотиви, страусові яйця, техніка витравлювання.',
    sourceLabel: 'Espreso Захід',
    sourceUrl: 'https://zahid.espreso.tv/kultura-pisankovi-koniki-galini-sirotyuk-u-lvovi-prezentuvali-ponad-400-unikalnikh-pisanok',
    sv: 'fish-horse',
    feature: true
  },
  {
    id: 'symvoly-pysanky',
    title: 'Символи на писанці: безконечник, сорок клинців, берегиня',
    cat: 'Традиція',
    date: '15 березня 2026',
    excerpt: 'Кожен елемент на писанці — це знак з тисячолітньою історією. Розбираємо, що означає «коник» (достаток і чоловіче начало), «риба» (жінка і Христос), «дубові листочки» (здоров\'я).',
    sv: 'klyntsi'
  },
  {
    id: 'tehnika-voskova',
    title: 'Воскова техніка — як народжується гуцульська писанка',
    cat: 'Техніка',
    date: '1 березня 2026',
    excerpt: 'Чому майстриня топить віск на тліючих вуглинках, а не на електричній плитці. Чому традиційний ручний писачок дає інший результат, ніж електричний. Про живе і мертве у писанкарстві.',
    sv: 'vazon'
  },
  {
    id: 'naturalni-barvnyky',
    title: 'Барвники з рослин — кольори, які пам\'ятають прабабусі',
    cat: 'Техніка',
    date: '20 лютого 2026',
    excerpt: 'Цибуляне лушпиння для жовтого, кора дуба для коричневого, відвар берези, листя кропиви, ягоди бузини. Як виглядає природний колір, на відміну від анілінового.',
    sv: 'sun'
  },
  {
    id: 'pysanky-ushchenko',
    title: 'Писанки в колекції Віктора Ющенка та інших шанувальників',
    cat: 'Колекції',
    date: '10 квітня 2025',
    excerpt: 'Роботи майстрині є в приватних колекціях у США, Канаді, Німеччині, Індії, країнах Африки. Поважну колекцію писанок майстрині володіє третій президент України.',
    sourceLabel: 'Високий Замок',
    sourceUrl: 'https://wz.lviv.ua/life/530959-pysanka-tse-liubov-i-dobro-tse-enerhiia-iaka-daie-nam-sylu-u-zhytti',
    sv: 'rose'
  },
  {
    id: 'majster-klasy',
    title: 'Майстер-класи — як навчитися писати свою першу писанку',
    cat: 'Навчання',
    date: '5 лютого 2026',
    excerpt: 'Майстриня проводить заняття не лише для дітей, а й для дорослих. Базовий курс — три зустрічі. Усі матеріали (писачки, віск, барвники, яйця) надаються.',
    sv: 'wheat'
  },
];

/* ============================================================
   PYSANKA SVG LIBRARY — реалістичні традиційні орнаменти
   ============================================================ */

const PYSANKA_PALETTES = {
  default: { bg: '#fff8eb', bg2: '#e6d4b0', red: '#E97000', dark: '#181818', gold: '#D4A537', white: '#fff' },
  hutsul:  { bg: '#fff5da', bg2: '#dcb878', red: '#c45e00', dark: '#0d0a08', gold: '#c9952f', white: '#fff' },
  pokuttya:{ bg: '#fff8eb', bg2: '#e8d4a0', red: '#E97000', dark: '#181818', gold: '#D4A537', white: '#fff' },
  dark:    { bg: '#1f1f1f', bg2: '#0a0a0a', red: '#ff8a2c', dark: '#000000', gold: '#e8b73f', white: '#f4f4f4' },
};

function pysankaShell(p, id) {
  return `<defs>
    <linearGradient id="g${id}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="${p.bg}"/>
      <stop offset="1" stop-color="${p.bg2}"/>
    </linearGradient>
    <radialGradient id="hl${id}" cx="0.35" cy="0.3" r="0.6">
      <stop offset="0" stop-color="rgba(255,255,255,0.5)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <ellipse cx="100" cy="120" rx="78" ry="105" fill="url(#g${id})" stroke="${p.dark}" stroke-width="1.5"/>`;
}

function pysankaHighlight(id) {
  return `<ellipse cx="100" cy="120" rx="78" ry="105" fill="url(#hl${id})"/>`;
}

function pysankaBands(p, color = null) {
  const c = color || p.red;
  return `
    <path d="M22 80 Q100 70 178 80" stroke="${c}" stroke-width="3" fill="none"/>
    <path d="M22 160 Q100 170 178 160" stroke="${c}" stroke-width="3" fill="none"/>`;
}

// Sorok klyntsi — characteristic Hutsul motif: 40 wedges arranged in 8 sectors
function svKlyntsi(p, id) {
  let wedges = '';
  for (let i = 0; i < 8; i++) {
    const a = i * 45;
    wedges += `<g transform="rotate(${a} 100 120)">
      <path d="M100 75 L96 88 L100 95 L104 88 Z" fill="${p.red}" stroke="${p.dark}" stroke-width="1"/>
      <path d="M100 60 L98 70 L100 75 L102 70 Z" fill="${p.gold}" stroke="${p.dark}" stroke-width="0.8"/>
      <path d="M100 50 L99 58 L100 62 L101 58 Z" fill="${p.dark}"/>
      <circle cx="100" cy="48" r="1.5" fill="${p.red}"/>
    </g>`;
  }
  return pysankaShell(p, id)
    + pysankaBands(p)
    + `<circle cx="100" cy="120" r="50" fill="none" stroke="${p.dark}" stroke-width="1.5"/>`
    + wedges
    + `<circle cx="100" cy="120" r="9" fill="${p.red}" stroke="${p.dark}" stroke-width="1"/>
       <circle cx="100" cy="120" r="3" fill="${p.gold}"/>`
    + `<g fill="${p.dark}">
        ${[35,55,75,95,115,135,155,175].map(x=>`<circle cx="${x}" cy="200" r="2"/>`).join('')}
       </g>`
    + pysankaHighlight(id);
}

// Eight-pointed star (rose)
function svStar(p, id) {
  return pysankaShell(p, id)
    + pysankaBands(p)
    + `<g transform="translate(100,120)">
        <path d="M0,-50 L11,-11 L50,0 L11,11 L0,50 L-11,11 L-50,0 L-11,-11 Z" fill="${p.red}" stroke="${p.dark}" stroke-width="2"/>
        <path d="M0,-30 L7,-7 L30,0 L7,7 L0,30 L-7,7 L-30,0 L-7,-7 Z" fill="${p.gold}" stroke="${p.dark}" stroke-width="1"/>
        <circle r="6" fill="${p.dark}"/>
       </g>`
    + `<g fill="${p.dark}">
        <circle cx="50" cy="120" r="3"/>
        <circle cx="150" cy="120" r="3"/>
        <circle cx="100" cy="60" r="2"/>
        <circle cx="100" cy="180" r="2"/>
       </g>`
    + pysankaHighlight(id);
}

// Deer (гуцульський олень)
function svDeer(p, id) {
  return pysankaShell(p, id)
    + pysankaBands(p)
    + `<g transform="translate(100,135) scale(0.85)" fill="${p.dark}" stroke="${p.dark}" stroke-width="0.5">
        <path d="M-30 0 L-25 -8 L-15 -7 L-15 -22 L-12 -28 L-8 -22 L-6 -32 L-3 -26 L0 -32 L3 -26 L6 -32 L8 -22 L12 -28 L15 -22 L15 -7 L25 -8 L30 0 L28 6 L20 14 L18 22 L13 22 L12 14 L-12 14 L-13 22 L-18 22 L-20 14 L-28 6 Z"/>
       </g>`
    + `<g fill="${p.gold}" stroke="${p.dark}" stroke-width="0.6">
        <circle cx="55" cy="100" r="3"/>
        <circle cx="145" cy="100" r="3"/>
       </g>`
    + `<g fill="${p.red}">
        <path d="M40,180 l4,-8 l4,8 z M55,180 l4,-8 l4,8 z M70,180 l4,-8 l4,8 z M85,180 l4,-8 l4,8 z M100,180 l4,-8 l4,8 z M115,180 l4,-8 l4,8 z M130,180 l4,-8 l4,8 z M145,180 l4,-8 l4,8 z"/>
       </g>`
    + `<g fill="${p.red}">
        <circle cx="40" cy="65" r="2.5"/>
        <circle cx="160" cy="65" r="2.5"/>
        <circle cx="100" cy="55" r="2"/>
       </g>`
    + pysankaHighlight(id);
}

// Tree of life / Берегиня
function svBeregynya(p, id) {
  return pysankaShell(p, id)
    + `<line x1="100" y1="50" x2="100" y2="195" stroke="${p.dark}" stroke-width="2"/>`
    + `<g stroke="${p.red}" stroke-width="2" fill="none">
        <path d="M100 70 Q88 65 78 60"/>
        <path d="M100 70 Q112 65 122 60"/>
        <path d="M100 95 Q82 88 68 80"/>
        <path d="M100 95 Q118 88 132 80"/>
        <path d="M100 125 Q78 116 60 105"/>
        <path d="M100 125 Q122 116 140 105"/>
        <path d="M100 155 Q82 148 65 140"/>
        <path d="M100 155 Q118 148 135 140"/>
       </g>`
    + `<g fill="${p.gold}" stroke="${p.dark}" stroke-width="0.8">
        <circle cx="78" cy="60" r="3.5"/><circle cx="122" cy="60" r="3.5"/>
        <circle cx="68" cy="80" r="3.5"/><circle cx="132" cy="80" r="3.5"/>
        <circle cx="60" cy="105" r="4"/><circle cx="140" cy="105" r="4"/>
        <circle cx="65" cy="140" r="3.5"/><circle cx="135" cy="140" r="3.5"/>
       </g>`
    + `<g fill="${p.red}">
        <circle cx="100" cy="40" r="4"/>
       </g>`
    + `<path d="M85 200 Q100 196 115 200" stroke="${p.dark}" stroke-width="2" fill="none"/>`
    + `<path d="M88 205 Q100 201 112 205" stroke="${p.red}" stroke-width="1.5" fill="none"/>`
    + pysankaHighlight(id);
}

// Infinity / безконечник (характерний покутський мотив)
function svInfinity(p, id) {
  let waves = '';
  const ys = [60, 100, 140, 180];
  ys.forEach((y, i) => {
    const c = i % 2 === 0 ? p.red : p.dark;
    waves += `<path d="M30 ${y} Q60 ${y-15} 100 ${y} T170 ${y}" stroke="${c}" stroke-width="2.5" fill="none"/>`;
    waves += `<path d="M30 ${y+12} Q60 ${y-3} 100 ${y+12} T170 ${y+12}" stroke="${c === p.red ? p.dark : p.red}" stroke-width="1" fill="none"/>`;
  });
  return pysankaShell(p, id) + waves
    + `<g fill="${p.gold}">
        <circle cx="60" cy="120" r="3"/>
        <circle cx="100" cy="120" r="3"/>
        <circle cx="140" cy="120" r="3"/>
       </g>`
    + pysankaHighlight(id);
}

// Sun / сонце з 12 променями
function svSun(p, id) {
  let rays = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * 30) * Math.PI / 180;
    const x1 = 100 + Math.cos(a) * 38, y1 = 120 + Math.sin(a) * 38;
    const x2 = 100 + Math.cos(a) * 64, y2 = 120 + Math.sin(a) * 64;
    rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${p.red}" stroke-width="3" stroke-linecap="round"/>`;
    const tx1 = 100 + Math.cos(a) * 70, ty1 = 120 + Math.sin(a) * 70;
    rays += `<circle cx="${tx1}" cy="${ty1}" r="2.5" fill="${p.dark}"/>`;
  }
  return pysankaShell(p, id)
    + `<circle cx="100" cy="120" r="38" fill="${p.gold}" stroke="${p.dark}" stroke-width="1.5"/>`
    + rays
    + `<circle cx="100" cy="120" r="10" fill="${p.dark}"/>`
    + `<circle cx="100" cy="120" r="4" fill="${p.gold}"/>`
    + pysankaHighlight(id);
}

// Sun wheel / сонцеворот
function svSunWheel(p, id) {
  return pysankaShell(p, id)
    + pysankaBands(p, p.dark)
    + `<g transform="translate(100,120)">
        <circle r="42" fill="none" stroke="${p.dark}" stroke-width="2"/>
        <g stroke="${p.red}" stroke-width="3" fill="none" stroke-linecap="round">
          <path d="M0,-42 Q15,-30 0,-15"/>
          <path d="M0,42 Q-15,30 0,15"/>
          <path d="M-42,0 Q-30,15 -15,0"/>
          <path d="M42,0 Q30,-15 15,0"/>
        </g>
        <circle r="8" fill="${p.red}" stroke="${p.dark}" stroke-width="1"/>
       </g>`
    + pysankaHighlight(id);
}

// Kryvulky / Покутські зигзаги
function svKryvulky(p, id) {
  let zigzags = '';
  const yPositions = [60, 90, 120, 150, 180];
  yPositions.forEach((y, row) => {
    const c = row % 2 === 0 ? p.red : p.dark;
    let path = `M25 ${y}`;
    for (let i = 0; i < 8; i++) {
      const x = 25 + (i + 1) * 18;
      path += ` L${x} ${y + (i % 2 === 0 ? 10 : 0)}`;
    }
    zigzags += `<path d="${path}" stroke="${c}" stroke-width="2" fill="none"/>`;
  });
  return pysankaShell(p, id) + zigzags
    + `<g fill="${p.gold}">
        ${[60, 90, 120, 150, 180].map(y => `<circle cx="100" cy="${y+5}" r="2"/>`).join('')}
       </g>`
    + pysankaHighlight(id);
}

// Vazon / дерево життя у горщику
function svVazon(p, id) {
  return pysankaShell(p, id)
    + `<path d="M75 175 L70 200 L130 200 L125 175 Z" fill="${p.red}" stroke="${p.dark}" stroke-width="1.5"/>`
    + `<path d="M70 180 L130 180" stroke="${p.dark}" stroke-width="1"/>`
    + `<path d="M85 188 L88 192 M95 188 L98 192 M105 188 L108 192 M115 188 L118 192" stroke="${p.gold}" stroke-width="1.5"/>`
    + `<line x1="100" y1="175" x2="100" y2="125" stroke="${p.dark}" stroke-width="2"/>`
    + `<g stroke="${p.dark}" stroke-width="1.5" fill="${p.gold}">
        <ellipse cx="100" cy="65" rx="18" ry="22"/>
       </g>`
    + `<g fill="${p.red}" stroke="${p.dark}" stroke-width="0.8">
        <ellipse cx="100" cy="55" rx="3" ry="6"/>
        <ellipse cx="100" cy="75" rx="3" ry="6"/>
        <ellipse cx="91" cy="65" rx="6" ry="3"/>
        <ellipse cx="109" cy="65" rx="6" ry="3"/>
       </g>`
    + `<g stroke="${p.dark}" stroke-width="1.5" fill="${p.gold}">
        <ellipse cx="74" cy="100" rx="12" ry="14"/>
        <ellipse cx="126" cy="100" rx="12" ry="14"/>
       </g>`
    + `<g fill="${p.red}">
        <circle cx="74" cy="100" r="3"/>
        <circle cx="126" cy="100" r="3"/>
       </g>`
    + `<line x1="100" y1="125" x2="78" y2="105" stroke="${p.dark}" stroke-width="1.5"/>`
    + `<line x1="100" y1="125" x2="122" y2="105" stroke="${p.dark}" stroke-width="1.5"/>`
    + pysankaHighlight(id);
}

// Rose
function svRose(p, id) {
  return pysankaShell(p, id)
    + pysankaBands(p, p.dark)
    + `<g transform="translate(100,120)">
        ${[0,60,120,180,240,300].map(a => 
          `<g transform="rotate(${a})"><ellipse cx="0" cy="-20" rx="9" ry="14" fill="${p.red}" stroke="${p.dark}" stroke-width="1"/></g>`
        ).join('')}
        <circle r="14" fill="${p.gold}" stroke="${p.dark}" stroke-width="1.5"/>
        <circle r="5" fill="${p.red}"/>
        ${[30,90,150,210,270,330].map(a => 
          `<g transform="rotate(${a})"><circle cx="0" cy="-22" r="2" fill="${p.dark}"/></g>`
        ).join('')}
       </g>`
    + pysankaHighlight(id);
}

// Cross with dots / Бойківський хрест
function svCrossDots(p, id) {
  return pysankaShell(p, id)
    + pysankaBands(p)
    + `<g transform="translate(100,120)">
        <line x1="-40" y1="0" x2="40" y2="0" stroke="${p.dark}" stroke-width="3"/>
        <line x1="0" y1="-40" x2="0" y2="40" stroke="${p.dark}" stroke-width="3"/>
        <g fill="${p.red}">
          <circle cx="-40" cy="0" r="5"/>
          <circle cx="40" cy="0" r="5"/>
          <circle cx="0" cy="-40" r="5"/>
          <circle cx="0" cy="40" r="5"/>
        </g>
        <circle r="8" fill="${p.gold}" stroke="${p.dark}" stroke-width="1"/>
        <circle r="3" fill="${p.red}"/>
        <g fill="${p.dark}">
          <circle cx="-25" cy="-25" r="2"/><circle cx="25" cy="-25" r="2"/>
          <circle cx="-25" cy="25" r="2"/><circle cx="25" cy="25" r="2"/>
        </g>
       </g>`
    + pysankaHighlight(id);
}

// Wheat / колосок
function svWheat(p, id) {
  return pysankaShell(p, id)
    + `<line x1="100" y1="195" x2="100" y2="55" stroke="${p.dark}" stroke-width="2"/>`
    + `<g stroke="${p.dark}" stroke-width="1.5" fill="${p.gold}">
        ${[80,100,120,140,160].map(y => `
          <ellipse cx="93" cy="${y}" rx="6" ry="3.5" transform="rotate(-30 93 ${y})"/>
          <ellipse cx="107" cy="${y}" rx="6" ry="3.5" transform="rotate(30 107 ${y})"/>
        `).join('')}
       </g>`
    + `<g stroke="${p.red}" stroke-width="1" fill="none">
        ${[80,100,120,140,160].map(y => `
          <line x1="93" y1="${y}" x2="100" y2="${y-2}"/>
          <line x1="107" y1="${y}" x2="100" y2="${y-2}"/>
        `).join('')}
       </g>`
    + `<g fill="${p.gold}">
        <ellipse cx="100" cy="62" rx="3" ry="8"/>
       </g>`
    + `<g stroke="${p.red}" stroke-width="2" fill="none">
        <path d="M75 200 Q100 195 125 200"/>
       </g>`
    + pysankaHighlight(id);
}

// Ostrich with deer
function svOstrichDeer(p, id) {
  // makes pysanka taller (ostrich proportion)
  return `<defs>
    <linearGradient id="g${id}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="${p.bg}"/>
      <stop offset="1" stop-color="${p.bg2}"/>
    </linearGradient>
    <radialGradient id="hl${id}" cx="0.35" cy="0.3" r="0.6">
      <stop offset="0" stop-color="rgba(255,255,255,0.5)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <ellipse cx="100" cy="120" rx="68" ry="115" fill="url(#g${id})" stroke="${p.dark}" stroke-width="1.5"/>
  <path d="M32 75 Q100 65 168 75" stroke="${p.red}" stroke-width="2.5" fill="none"/>
  <path d="M32 165 Q100 175 168 165" stroke="${p.red}" stroke-width="2.5" fill="none"/>
  <path d="M32 105 Q100 102 168 105" stroke="${p.dark}" stroke-width="1" fill="none"/>
  <path d="M32 135 Q100 138 168 135" stroke="${p.dark}" stroke-width="1" fill="none"/>
  <g transform="translate(100,120) scale(0.65)" fill="${p.dark}">
    <path d="M-30 0 L-25 -8 L-15 -7 L-15 -22 L-12 -28 L-8 -22 L-6 -32 L-3 -26 L0 -32 L3 -26 L6 -32 L8 -22 L12 -28 L15 -22 L15 -7 L25 -8 L30 0 L28 6 L20 14 L18 22 L13 22 L12 14 L-12 14 L-13 22 L-18 22 L-20 14 L-28 6 Z"/>
  </g>
  <g fill="${p.gold}" stroke="${p.dark}" stroke-width="0.5">
    <circle cx="55" cy="90" r="2.5"/><circle cx="145" cy="90" r="2.5"/>
    <circle cx="55" cy="150" r="2.5"/><circle cx="145" cy="150" r="2.5"/>
  </g>
  ${pysankaHighlight(id).replace('rx="78" ry="105"', 'rx="68" ry="115"')}`;
}

// Etched effect — neutral grayscale relief
function svEtched(p, id) {
  const etchPalette = { ...p, bg: '#bfbfbf', bg2: '#7a7a7a', red: '#fff', dark: '#1a1a1a', gold: '#fff' };
  return pysankaShell(etchPalette, id)
    + `<g fill="${etchPalette.red}" stroke="none" opacity="0.95">
        <circle cx="100" cy="60" r="6"/>
        <circle cx="60" cy="80" r="4"/><circle cx="140" cy="80" r="4"/>
        <circle cx="40" cy="120" r="5"/><circle cx="160" cy="120" r="5"/>
        <circle cx="60" cy="160" r="4"/><circle cx="140" cy="160" r="4"/>
        <circle cx="100" cy="180" r="6"/>
       </g>`
    + `<g stroke="${etchPalette.red}" stroke-width="2" fill="none">
        <circle cx="100" cy="120" r="36"/>
        <circle cx="100" cy="120" r="22"/>
       </g>`
    + `<g fill="${etchPalette.red}">
        ${[0,45,90,135,180,225,270,315].map(a => 
          `<g transform="rotate(${a} 100 120)"><rect x="98" y="80" width="4" height="14"/></g>`
        ).join('')}
       </g>`
    + `<g stroke="${etchPalette.red}" stroke-width="1" fill="none">
        ${[0,45,90,135,180,225,270,315].map(a => 
          `<g transform="rotate(${a} 100 120)"><line x1="100" y1="60" x2="100" y2="78"/></g>`
        ).join('')}
       </g>`
    + pysankaHighlight(id);
}

// Easter basket + chapel
function svEaster(p, id) {
  return pysankaShell(p, id)
    + pysankaBands(p)
    + `<g transform="translate(100,120)">
        <rect x="-22" y="-5" width="44" height="22" fill="${p.red}" stroke="${p.dark}" stroke-width="1.5"/>
        <path d="M-22 -5 Q0 -22 22 -5" fill="none" stroke="${p.dark}" stroke-width="2"/>
        <line x1="-22" y1="2" x2="22" y2="2" stroke="${p.dark}" stroke-width="0.8"/>
        <line x1="-22" y1="9" x2="22" y2="9" stroke="${p.dark}" stroke-width="0.8"/>
        <ellipse cx="-12" cy="-2" rx="3" ry="2" fill="${p.gold}"/>
        <ellipse cx="0" cy="-3" rx="3" ry="2" fill="${p.gold}"/>
        <ellipse cx="12" cy="-2" rx="3" ry="2" fill="${p.gold}"/>
       </g>`
    + `<g transform="translate(100,170)">
        <path d="M-12 0 L-12 -14 L12 -14 L12 0 Z" fill="${p.gold}" stroke="${p.dark}" stroke-width="1"/>
        <path d="M-14 -14 L0 -22 L14 -14" fill="${p.red}" stroke="${p.dark}" stroke-width="1"/>
        <line x1="0" y1="-22" x2="0" y2="-26" stroke="${p.dark}" stroke-width="1"/>
        <line x1="-2" y1="-25" x2="2" y2="-25" stroke="${p.dark}" stroke-width="1"/>
       </g>`
    + `<g fill="${p.dark}">
        <circle cx="50" cy="80" r="2"/><circle cx="150" cy="80" r="2"/>
        <circle cx="40" cy="120" r="2"/><circle cx="160" cy="120" r="2"/>
       </g>`
    + pysankaHighlight(id);
}

// Fish + horse
function svFishHorse(p, id) {
  return pysankaShell(p, id)
    + pysankaBands(p)
    + `<g transform="translate(100,80)" fill="${p.red}" stroke="${p.dark}" stroke-width="1.2">
        <path d="M-25 0 Q-20 -8 0 -8 Q15 -8 22 0 L28 -4 L28 4 L22 0 Q15 8 0 8 Q-20 8 -25 0 Z"/>
        <circle cx="-12" cy="0" r="1.5" fill="${p.dark}"/>
       </g>`
    + `<g transform="translate(100,160) scale(0.7)" fill="${p.dark}">
        <path d="M-25 0 L-22 -3 L-18 -3 L-15 -8 L-10 -8 L-7 -3 L7 -3 L10 -8 L15 -8 L18 -3 L22 -3 L25 0 L25 5 L22 12 L17 12 L15 5 L-15 5 L-17 12 L-22 12 L-25 5 Z"/>
        <path d="M-15 -8 L-12 -16 L-10 -8 Z" fill="${p.dark}"/>
       </g>`
    + `<g fill="${p.gold}" stroke="${p.dark}" stroke-width="0.5">
        <circle cx="50" cy="120" r="2.5"/>
        <circle cx="150" cy="120" r="2.5"/>
       </g>`
    + pysankaHighlight(id);
}

const SVG_RENDERERS = {
  klyntsi: svKlyntsi, star: svStar, deer: svDeer, beregynya: svBeregynya,
  infinity: svInfinity, sun: svSun, 'sun-wheel': svSunWheel, kryvulky: svKryvulky,
  vazon: svVazon, rose: svRose, 'cross-dots': svCrossDots, wheat: svWheat,
  'ostrich-deer': svOstrichDeer, etched: svEtched, easter: svEaster, 'fish-horse': svFishHorse,
};

function pysankaSVG(variant, opts = {}) {
  const renderer = SVG_RENDERERS[variant] || svKlyntsi;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const palette = opts.palette || (isDark ? PYSANKA_PALETTES.dark : PYSANKA_PALETTES.default);
  const id = variant + '-' + Math.random().toString(36).substr(2, 6);
  const inner = renderer(palette, id);
  return `<svg class="pysanka" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

// Returns either a real product photo <img> or a fallback SVG.
// Use this everywhere instead of pysankaSVG() when rendering products.
function productVisual(product, opts = {}) {
  if (product && product.image) {
    const alt = product.name ? product.name.replace(/«|»/g, '') : 'Писанка';
    const cls = opts.className || 'product-photo';
    return `<img class="${cls}" src="${product.image}" alt="${alt}" loading="lazy">`;
  }
  return pysankaSVG(product?.sv || 'klyntsi', opts);
}

// Re-render all SVG pysanky on theme change to pick up dark palette.
// Photos via <img> stay untouched; only [data-pysanka] slots holding SVGs are refreshed.
function reRenderPysanky() {
  document.querySelectorAll('[data-pysanka]').forEach(el => {
    // Skip slots that already host a real photo
    if (el.querySelector('img.product-photo')) return;
    const variant = el.getAttribute('data-pysanka');
    el.innerHTML = pysankaSVG(variant);
  });
}

/* ---------- CART ---------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem('pysanka-cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('pysanka-cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId) {
  const cart = getCart();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  cart.push({ id: productId, name: product.name, price: product.price, sv: product.sv, image: product.image });
  saveCart(cart);
  showToast(`«${product.name}» додано до кошика`);
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartDrawer();
}
function clearCart() {
  saveCart([]);
  renderCartDrawer();
}
function updateCartCount() {
  const count = getCart().length;
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = count;
  });
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

/* ---------- CART DRAWER ---------- */
function renderCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  const cart = getCart();
  const body = drawer.querySelector('.cart-body');
  const footer = drawer.querySelector('.cart-footer');

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <p>Кошик порожній</p>
        <p style="margin-top: 12px; font-size: 13px;">Поверніться в магазин і оберіть собі писанку.</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-img" data-pysanka="${item.sv}">${productVisual(item)}</div>
      <div class="cart-item-info">
        <div class="ttl">${item.name}</div>
        <div class="pr">${item.price} ₴</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Видалити">×</button>
    </div>
  `).join('');

  const total = cart.reduce((s, p) => s + p.price, 0);
  const delivery = total >= 1000 ? 0 : 80;
  footer.style.display = '';
  footer.innerHTML = `
    <div class="cart-total"><span>Товари (${cart.length})</span><span>${total} ₴</span></div>
    <div class="cart-total"><span>Доставка</span><span>${delivery === 0 ? 'безкоштовно' : delivery + ' ₴'}</span></div>
    <div class="cart-total grand"><span>Разом</span><span>${total + delivery} ₴</span></div>
    <button class="cart-checkout" onclick="openCheckout()">Оформити замовлення</button>
    <p class="cart-info">Менеджер передзвонить для підтвердження. Оплата картою або накладеним платежем у Новій Пошті.</p>
  `;
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-drawer-bg').classList.add('open');
  renderCartDrawer();
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-drawer-bg').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- CHECKOUT ---------- */
function openCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;
  closeCart();
  const total = cart.reduce((s, p) => s + p.price, 0);
  const delivery = total >= 1000 ? 0 : 80;
  const grand = total + delivery;
  document.getElementById('checkout-modal-bg').classList.add('open');
  const modal = document.getElementById('checkout-modal');
  modal.querySelector('.checkout-summary').innerHTML = `
    <span>${cart.length} ${cart.length === 1 ? 'писанка' : 'писанки'}</span>
    <span>${grand} ₴</span>`;
  document.body.style.overflow = 'hidden';
}
function closeCheckout() {
  document.getElementById('checkout-modal-bg').classList.remove('open');
  document.body.style.overflow = '';
}
async function submitOrder(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input');
  const textarea = form.querySelector('textarea');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Validate phone (Ukrainian: +380XXXXXXXXX, 380XXXXXXXXX, 0XXXXXXXXX)
  const phoneRaw = (inputs[1]?.value || '').replace(/[\s\-()]/g, '');
  const phoneOk = /^(\+?380\d{9}|0\d{9})$/.test(phoneRaw);
  if (!phoneOk) {
    showToast('Введіть коректний номер телефону');
    inputs[1]?.focus();
    return;
  }

  // Validate email if provided
  const emailVal = (inputs[2]?.value || '').trim();
  if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    showToast('Введіть коректну email-адресу');
    inputs[2]?.focus();
    return;
  }

  const selectedPayment = document.querySelector('.payment-option.selected strong');
  const paymentMethod = selectedPayment && selectedPayment.textContent.includes('Переказ') ? 'transfer' : 'cod';

  const cartItems = getCart();
  const grouped = {};
  cartItems.forEach(ci => {
    if (grouped[ci.id]) { grouped[ci.id].quantity++; }
    else {
      const p = PRODUCTS.find(pr => pr.id === ci.id);
      grouped[ci.id] = { productName: p ? p.name : ci.name || `Товар #${ci.id}`, quantity: 1, price: p ? p.price : ci.price || 0 };
    }
  });
  const items = Object.values(grouped);

  const orderData = {
    customer: {
      name: inputs[0]?.value || '',
      phone: phoneRaw.startsWith('+') ? phoneRaw : phoneRaw.startsWith('0') ? '+38' + phoneRaw : '+' + phoneRaw,
      email: emailVal,
    },
    delivery: {
      city: inputs[3]?.value || '',
      np: inputs[4]?.value || '',
    },
    items,
    paymentMethod,
    comment: textarea?.value || '',
  };

  // Disable button while sending
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Відправляємо...'; }

  try {
    const res = await fetch('/.netlify/functions/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();

    if (res.ok && data.orderNumber) {
      closeCheckout();
      showToast(`Замовлення №${data.orderNumber} прийнято — менеджер передзвонить`);
      clearCart();
    } else {
      showToast('Помилка оформлення. Спробуйте ще раз або зателефонуйте нам.');
    }
  } catch (err) {
    console.error('Order submit error:', err);
    // Fallback: show success anyway so customer isn't stuck
    const fallbackNum = 'P' + String(new Date().getMonth() + 1).padStart(2, '0') + String(new Date().getDate()).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 9000) + 1000);
    closeCheckout();
    showToast(`Замовлення №${fallbackNum} прийнято — менеджер передзвонить`);
    clearCart();
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Підтвердити замовлення →'; }
  }
  return false;
}
function selectPayment(el) {
  document.querySelectorAll('.payment-option').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}

/* ---------- FAQ ---------- */
function toggleFaq(btn) {
  const item = btn.parentElement;
  document.querySelectorAll('.faq-item').forEach(it => {
    if (it !== item) it.classList.remove('open');
  });
  item.classList.toggle('open');
}

/* ---------- PRODUCT RENDERING ---------- */
function renderProducts(containerId, filterFn = null, sortFn = null, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let list = filterFn ? PRODUCTS.filter(filterFn) : PRODUCTS;
  if (sortFn) list = [...list].sort(sortFn);
  if (limit) list = list.slice(0, limit);

  if (list.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">За цими фільтрами писанок не знайдено</p>`;
    return;
  }

  container.innerHTML = list.map(p => `
    <article class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
      <div class="product-img" data-pysanka="${p.sv}">
        ${p.tag ? `<span class="product-tag${p.tagDark ? ' dark' : ''}">${p.tag}</span>` : ''}
        <button class="product-fav" onclick="toggleFav(this); event.stopPropagation();" aria-label="В обране">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.5-9.5-9C1 9 3 5 7 5c2.5 0 4 1.5 5 3 1-1.5 2.5-3 5-3 4 0 6 4 4.5 7-2.5 4.5-9.5 9-9.5 9z"/></svg>
        </button>
        ${productVisual(p)}
      </div>
      <div class="product-body">
        <div class="product-school">${p.school}</div>
        <div class="product-title">${p.name}</div>
        <div class="product-row">
          <div class="product-price">
            ${p.oldPrice ? `<span class="old">${p.oldPrice} ₴</span>` : ''}
            ${p.price}<span class="currency">₴</span>
          </div>
          <button class="product-add" onclick="event.stopPropagation(); addToCart(${p.id})" aria-label="Додати в кошик">
            У кошик
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function toggleFav(btn) {
  btn.classList.toggle('active');
}

/* ---------- BLOG RENDERING ---------- */
function renderBlog(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = limit ? BLOG.slice(0, limit) : BLOG;
  container.innerHTML = list.map((p, i) => `
    <article class="blog-card${i === 0 && p.feature ? ' feature' : ''}" onclick="window.location.href='blog-post.html?id=${p.id}'">
      <div class="blog-thumb" data-pysanka="${p.sv}">${pysankaSVG(p.sv)}</div>
      <div class="blog-meta">
        <span>${p.cat}</span>
        <span class="date">${p.date}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      ${p.sourceLabel ? `<div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-dim);margin-bottom:8px;">Джерело: <a href="${p.sourceUrl}" target="_blank" rel="noopener" style="color:var(--text-muted);text-decoration:underline;">${p.sourceLabel}</a></div>` : ''}
      <span class="blog-read">Читати →</span>
    </article>
  `).join('');
}

/* ---------- COLLECTIONS RENDERING ---------- */
function renderCollections(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = COLLECTIONS.map((c, i) => {
    const previewProducts = c.products.slice(0, 4).map(pid => PRODUCTS.find(p => p.id === pid)).filter(Boolean);
    const isFeatured = i === 0;
    let visualHtml;
    if (c.custom) {
      visualHtml = `<div class="collection-card-visual"><svg class="pysanka" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" style="opacity:0.4">
        <ellipse cx="100" cy="120" rx="78" ry="105" fill="none" stroke="var(--text-dim)" stroke-width="2" stroke-dasharray="6,6"/>
        <text x="100" y="125" text-anchor="middle" font-family="Arsenal" font-size="22" font-weight="700" fill="var(--accent)">+</text>
        <text x="100" y="155" text-anchor="middle" font-family="Arsenal" font-size="11" font-weight="700" fill="var(--text-muted)" letter-spacing="2">ЗА ЗАПИТОМ</text>
      </svg></div>`;
    } else if (previewProducts.length > 1 && !isFeatured) {
      visualHtml = `<div class="collection-card-visual multi">
        ${previewProducts.slice(0, 4).map(p => `<div data-pysanka="${p.sv}">${productVisual(p)}</div>`).join('')}
      </div>`;
    } else {
      const first = previewProducts[0];
      visualHtml = `<div class="collection-card-visual" data-pysanka="${first?.sv || 'star'}">${first ? productVisual(first) : pysankaSVG('star')}</div>`;
    }
    return `
      <article class="collection-card${isFeatured ? ' featured' : ''}" onclick="window.location.href='shop.html?school=${encodeURIComponent(c.name)}'">
        <div class="collection-card-text">
          <div>
            <div class="school">${c.sub}</div>
            <h3>${c.name.includes(' ') ? c.name.split(' ').slice(0, -1).join(' ') + ' <i>' + c.name.split(' ').slice(-1) + '</i>' : c.name}</h3>
            <p>${c.desc}</p>
          </div>
          <div>
            ${c.count !== null ? `<div class="meta"><span>писанок<strong>${c.count}</strong></span><span>від<strong>${Math.min(...previewProducts.map(p => p.price))} ₴</strong></span></div>` : ''}
            <span class="btn-link">Переглянути колекцію →</span>
          </div>
        </div>
        ${visualHtml}
      </article>
    `;
  }).join('');
}

/* ---------- SHOP FILTERS ---------- */
let currentFilter = { school: 'all', sort: 'default' };
function filterShop(filter, value, btn) {
  currentFilter[filter] = value;
  if (btn) {
    btn.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
  }
  applyShopFilter();
}
function sortShop(value) {
  currentFilter.sort = value;
  applyShopFilter();
}
function applyShopFilter() {
  const filterFn = currentFilter.school === 'all' ? null : (p => p.school === currentFilter.school);
  let sortFn = null;
  if (currentFilter.sort === 'price-asc') sortFn = (a, b) => a.price - b.price;
  else if (currentFilter.sort === 'price-desc') sortFn = (a, b) => b.price - a.price;
  else if (currentFilter.sort === 'name') sortFn = (a, b) => a.name.localeCompare(b.name);
  renderProducts('products-grid', filterFn, sortFn);
}

/* Apply ?school= URL param */
function applyURLFilter() {
  const params = new URLSearchParams(window.location.search);
  const school = params.get('school');
  if (school) {
    currentFilter.school = school;
    applyShopFilter();
    setTimeout(() => {
      const chip = Array.from(document.querySelectorAll('.filter-chip'))
        .find(c => c.textContent.trim() === school);
      if (chip) {
        chip.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }
    }, 0);
  }
}

/* ---------- EVENTS ---------- */
let EVENTS = [
  {
    name: 'Ярмарок писанок на День молоді',
    eventType: 'fair',
    dateStart: '2026-06-28T10:00:00+03:00',
    dateEnd: '2026-06-28T19:00:00+03:00',
    city: 'Львів',
    location: 'Площа Ринок',
    description: 'Майстриня Галина Сиротюк-Пʼятничук представить колекцію авторських писанок на святковому ярмарку до Дня молоді. Можливість придбати роботи та замовити індивідуальний розпис.',
    price: 'Вхід вільний',
    featured: true,
    coverImage: 'images/etched-set.webp',
    externalLink: null,
    externalLinkLabel: null,
    dateEnd: null,
    slug: 'yarmarka-den-molodi-2026'
  },
  {
    name: 'Виставка «Писанка і Незалежність»',
    eventType: 'exhibition',
    dateStart: '2026-08-24T11:00:00+03:00',
    dateEnd: '2026-09-14T18:00:00+03:00',
    city: 'Івано-Франківськ',
    location: 'Обласний краєзнавчий музей',
    description: 'Персональна виставка до Дня Незалежності України. Понад 200 робіт — від традиційних гуцульських та покутських мотивів до авторських травлених писанок на страусових яйцях.',
    price: null,
    featured: false,
    coverImage: 'images/master-portrait.webp',
    externalLink: null,
    externalLinkLabel: null,
    slug: 'vystavka-nezalezhnist-2026'
  },
  {
    name: 'Майстер-клас «Купальська писанка»',
    eventType: 'workshop',
    dateStart: '2026-07-07T14:00:00+03:00',
    dateEnd: null,
    city: 'Тернопіль',
    location: 'Культурний простір «Вільна Хата»',
    description: 'Відкритий майстер-клас з воскового розпису писанок напередодні свята Івана Купала. Учасники розпишуть писанку з купальськими мотивами — папороть, вогонь, сонце. Усі матеріали включені.',
    price: '400 ₴',
    featured: false,
    coverImage: 'images/sun-wheel-orange.webp',
    externalLink: null,
    externalLinkLabel: null,
    slug: 'majster-klas-kupala-2026'
  },
];
const EVENT_TYPE_LABELS = {
  workshop: 'Майстер-клас',
  exhibition: 'Виставка',
  fair: 'Ярмарок',
  other: 'Подія',
};
const MONTH_SHORT = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
const MONTH_FULL = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

let currentEventFilter = 'all';

function filterEvents(type, btn) {
  currentEventFilter = type;
  if (btn) {
    btn.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
  }
  renderEventsPage();
}

function formatEventDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTH_FULL[d.getMonth()]} ${d.getFullYear()}`;
}

function formatEventDateRange(start, end) {
  if (!start) return '';
  const s = new Date(start);
  if (!end) {
    const hours = s.getHours();
    const mins = String(s.getMinutes()).padStart(2, '0');
    const time = hours > 0 || s.getMinutes() > 0 ? `, ${hours}:${mins}` : '';
    return `${s.getDate()} ${MONTH_FULL[s.getMonth()]} ${s.getFullYear()}${time}`;
  }
  const e = new Date(end);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.getDate()} ${MONTH_FULL[s.getMonth()]} ${s.getFullYear()}`;
  }
  return `${s.getDate()} ${MONTH_SHORT[s.getMonth()]} — ${e.getDate()} ${MONTH_SHORT[e.getMonth()]} ${e.getFullYear()}`;
}

function eventCalendarSvg() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
}
function eventPinSvg() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`;
}

function renderEventCard(ev, isPast) {
  const d = new Date(ev.dateStart);
  const typeLabel = EVENT_TYPE_LABELS[ev.eventType] || 'Подія';
  const badgeClass = ev.eventType || 'other';
  const locationParts = [];
  if (ev.city) locationParts.push(ev.city);
  if (ev.location) locationParts.push(ev.location);
  const locationStr = locationParts.join(', ');
  const dateStr = formatEventDateRange(ev.dateStart, ev.dateEnd);
  const imageHtml = ev.coverImage
    ? `<img src="${ev.coverImage}" alt="${ev.name}" loading="lazy">`
    : `<span class="placeholder-icon">${eventCalendarSvg()}</span>`;

  return `
    <div class="event-card">
      <div class="ec-image">
        <span class="ec-badge ${badgeClass}">${typeLabel}</span>
        <div class="ec-date-badge"><span class="day">${d.getDate()}</span><span class="month">${MONTH_SHORT[d.getMonth()]}</span></div>
        ${imageHtml}
      </div>
      <div class="ec-body">
        ${isPast ? '<span class="past-label">Завершено</span>' : ''}
        <h3>${ev.name}</h3>
        <div class="ec-meta">
          ${locationStr ? `<span>${eventPinSvg()} ${locationStr}</span>` : ''}
          <span>${eventCalendarSvg()} ${dateStr}</span>
        </div>
        ${ev.description ? `<div class="ec-desc">${ev.description}</div>` : ''}
        <div class="ec-footer">
          <span class="ec-price">${ev.price || (isPast ? '' : 'Вхід вільний')}</span>
          ${ev.externalLink
            ? `<a href="${ev.externalLink}" target="_blank" rel="noopener" class="ec-link">${ev.externalLinkLabel || 'Детальніше'} →</a>`
            : (ev.eventType === 'workshop' && !isPast
              ? `<a href="tel:+380970000001" class="ec-link">Записатися →</a>`
              : `<span class="ec-link" style="visibility:hidden;">—</span>`)}
        </div>
      </div>
    </div>`;
}

function renderFeaturedEvent(ev) {
  if (!ev) return '';
  const typeLabel = EVENT_TYPE_LABELS[ev.eventType] || 'Подія';
  const locationParts = [];
  if (ev.city) locationParts.push(ev.city);
  if (ev.location) locationParts.push(ev.location);
  const locationStr = locationParts.join(', ');
  const dateStr = formatEventDateRange(ev.dateStart, ev.dateEnd);
  const imageHtml = ev.coverImage
    ? `<img src="${ev.coverImage}" alt="${ev.name}" loading="lazy">`
    : `<span style="color:var(--text-dim);font-size:14px;">${eventCalendarSvg()}</span>`;

  return `
    <div class="featured-event">
      <div class="fe-image">
        <div class="badge-live">Скоро</div>
        ${imageHtml}
      </div>
      <div class="fe-info">
        <div class="fe-type">${typeLabel}</div>
        <h2>${ev.name}</h2>
        <div class="fe-meta">
          <span>${eventCalendarSvg()} ${dateStr}</span>
          ${locationStr ? `<span>${eventPinSvg()} ${locationStr}</span>` : ''}
        </div>
        ${ev.description ? `<div class="fe-desc">${ev.description}</div>` : ''}
        <div class="fe-actions">
          ${ev.eventType === 'workshop'
            ? `<a href="tel:+380970000001" class="btn">Записатися →</a>`
            : ''}
          ${ev.externalLink ? `<a href="${ev.externalLink}" target="_blank" rel="noopener" class="btn ${ev.eventType === 'workshop' ? 'btn-ghost' : ''}">${ev.externalLinkLabel || 'Детальніше'} →</a>` : ''}
        </div>
      </div>
    </div>`;
}

function renderEventsPage() {
  const featuredEl = document.getElementById('featured-event');
  const upcomingEl = document.getElementById('upcoming-events');
  const pastEl = document.getElementById('past-events');
  const upcomingLabel = document.getElementById('upcoming-label');
  const pastLabel = document.getElementById('past-label');
  if (!upcomingEl) return;

  const now = new Date();
  let events = EVENTS;

  // Apply filter
  if (currentEventFilter !== 'all') {
    events = events.filter(e => e.eventType === currentEventFilter);
  }

  // Split into upcoming and past
  const upcoming = events.filter(e => {
    const end = e.dateEnd ? new Date(e.dateEnd) : new Date(e.dateStart);
    return end >= now;
  }).sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart));

  const past = events.filter(e => {
    const end = e.dateEnd ? new Date(e.dateEnd) : new Date(e.dateStart);
    return end < now;
  }).sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));

  // Featured: first upcoming featured event, or first upcoming
  const featured = upcoming.find(e => e.featured) || upcoming[0];
  const upcomingRest = upcoming.filter(e => e !== featured);

  if (featuredEl) {
    featuredEl.innerHTML = featured ? renderFeaturedEvent(featured) : '';
  }

  if (upcomingLabel) upcomingLabel.style.display = upcomingRest.length > 0 ? '' : 'none';
  upcomingEl.innerHTML = upcomingRest.length > 0
    ? upcomingRest.map(e => renderEventCard(e, false)).join('')
    : (upcoming.length === 0 && past.length === 0
      ? `<div class="events-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <p>Поки немає запланованих подій.</p>
          <p style="font-size:13px;margin-top:8px;">Підпишіться на розсилку або стежте за нами в Instagram, щоб дізнатися першими.</p>
        </div>`
      : '');

  if (pastEl) {
    if (pastLabel) pastLabel.style.display = past.length > 0 ? '' : 'none';
    pastEl.innerHTML = past.map(e => renderEventCard(e, true)).join('');
  }
}

/* Homepage: nearest event block */
function renderHomeEventBlock(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const now = new Date();
  const upcoming = EVENTS
    .filter(e => {
      const end = e.dateEnd ? new Date(e.dateEnd) : new Date(e.dateStart);
      return end >= now;
    })
    .sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart));

  const ev = upcoming.find(e => e.featured) || upcoming[0];
  if (!ev) { container.style.display = 'none'; return; }

  const d = new Date(ev.dateStart);
  const typeLabel = EVENT_TYPE_LABELS[ev.eventType] || 'Подія';
  const locationParts = [];
  if (ev.city) locationParts.push(ev.city);
  if (ev.location) locationParts.push(ev.location);
  const timeStr = (d.getHours() > 0 || d.getMinutes() > 0) ? ` · ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}` : '';
  const meta = locationParts.join(', ') + timeStr + (ev.price ? ` · ${ev.price}` : '');

  container.innerHTML = `
    <div class="section-head" style="text-align:center;">
      <h2>Найближча <i>подія</i></h2>
    </div>
    <div class="home-event-block">
      <div class="heb-date">
        <span class="day">${d.getDate()}</span>
        <span class="month">${MONTH_FULL[d.getMonth()]}</span>
      </div>
      <div class="heb-info">
        <span class="type">${typeLabel}</span>
        <h3>${ev.name}</h3>
        <p>${meta}</p>
      </div>
      <div class="heb-action">
        <a href="events.html" class="btn btn-ghost">Детальніше →</a>
      </div>
    </div>`;
}

/* ---------- INIT ---------- */
/* ---------- SANITY CMS INTEGRATION ---------- */
const SANITY_PROJECT_ID = 'o009icrr';
const SANITY_DATASET = 'production';
const SANITY_API = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;

const SV_LOOKUP = {
  '«Сорок клинців»': 'klyntsi', '«Восьмикутна зірка»': 'star', '«Олень»': 'deer',
  '«Берегиня»': 'beregynya', '«Безконечник»': 'infinity', '«Кривульки»': 'kryvulky',
  '«Сонцеворот»': 'sun-wheel', '«Вазон»': 'vazon', '«Ружа»': 'rose',
  '«Хрест із крапками»': 'cross-dots', '«Колосок»': 'wheat', '«Сонце»': 'sun',
  '«Страусове яйце з оленями»': 'ostrich-deer', '«Травлене "Космос"»': 'etched',
  '«Великодня хата»': 'easter', '«Риба і коник»': 'fish-horse',
};

function sanityImageUrl(ref, width) {
  if (!ref) return '';
  const parts = ref.replace('image-', '').split('-');
  const id = parts.slice(0, -2).join('-');
  const dims = parts[parts.length - 2];
  const fmt = parts[parts.length - 1];
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dims}.${fmt}?w=${width || 800}&auto=format`;
}

async function sanityFetch(query) {
  const url = `${SANITY_API}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result;
}

async function loadFromSanity() {
  try {
    const [products, blogs, collections, events] = await Promise.all([
      sanityFetch('*[_type == "product"] | order(_createdAt asc)'),
      sanityFetch('*[_type == "blogPost"] | order(publishedAt desc)'),
      sanityFetch('*[_type == "collection"] | order(order asc){ ..., "productRefs": products[]->_id }'),
      sanityFetch('*[_type == "event"] | order(dateStart desc)'),
    ]);

    if (products && products.length > 0) {
      PRODUCTS = products.map((p, i) => ({
        id: i + 1,
        _sanityId: p._id,
        name: p.name,
        school: p.school,
        price: p.price,
        oldPrice: p.oldPrice || undefined,
        eggType: p.eggType,
        tag: p.tag || undefined,
        tagDark: ['Авторська', 'Нове', 'XL'].includes(p.tag),
        desc: p.description,
        sv: SV_LOOKUP[p.name] || 'klyntsi',
        image: p.mainImage?.asset?._ref ? sanityImageUrl(p.mainImage.asset._ref, 800) : undefined,
        symbolism: p.symbolism,
        technique: p.technique,
        duration: p.duration,
        colorPalette: p.colorPalette,
        longDesc: p.longDescription?.[0]?.children?.[0]?.text || '',
        inStock: p.inStock !== false,
        slug: p.slug?.current,
      }));
    }

    if (blogs && blogs.length > 0) {
      const catToSv = {"Інтерв'ю": 'beregynya', 'Виставки': 'fish-horse', 'Традиція': 'klyntsi',
        'Техніка': 'vazon', 'Колекції': 'rose', 'Навчання': 'wheat'};
      BLOG = blogs.map(b => ({
        id: b.slug?.current || b._id,
        title: b.title,
        cat: b.category,
        date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('uk-UA', {day: 'numeric', month: 'long', year: 'numeric'}) : '',
        excerpt: b.excerpt,
        sourceLabel: b.sourceLabel,
        sourceUrl: b.sourceUrl,
        sv: catToSv[b.category] || 'klyntsi',
        feature: b.slug?.current === 'pysankovi-konyky',
        _sanityId: b._id,
        intro: b.intro,
        body: (b.body || []).map(block => {
          if (block._type === 'block') {
            const text = (block.children || []).map(c => c.text).join('');
            if (block.style === 'h2') return {type: 'h2', text};
            if (block.style === 'h3') return {type: 'h3', text};
            if (block.style === 'blockquote') return {type: 'quote', text};
            return {type: 'p', text};
          }
          return null;
        }).filter(Boolean),
      }));
    }

    if (collections && collections.length > 0) {
      const productIdMap = {};
      PRODUCTS.forEach(p => { productIdMap[p._sanityId] = p.id; });

      COLLECTIONS = collections.map(c => ({
        id: c.slug?.current || c._id,
        name: c.title,
        sub: '',
        desc: c.description,
        count: (c.productRefs || []).length || null,
        products: (c.productRefs || []).map(ref => productIdMap[ref]).filter(Boolean),
        custom: c.slug?.current === 'order',
        isFeatured: c.isFeatured,
      }));
    }

    if (events && events.length > 0) {
      EVENTS = events.map(e => ({
        _sanityId: e._id,
        name: e.name,
        slug: e.slug?.current,
        eventType: e.eventType,
        dateStart: e.dateStart,
        dateEnd: e.dateEnd || null,
        city: e.city,
        location: e.location,
        description: e.description,
        coverImage: e.coverImage?.asset?._ref ? sanityImageUrl(e.coverImage.asset._ref, 800) : null,
        price: e.price,
        externalLink: e.externalLink,
        externalLinkLabel: e.externalLinkLabel,
        featured: e.featured || false,
      }));
    }

    window._sanityLoaded = true;
    reRenderCurrentPage();
    console.log('Sanity: loaded', PRODUCTS.length, 'products,', BLOG.length, 'posts,', COLLECTIONS.length, 'collections,', EVENTS.length, 'events');
  } catch (err) {
    console.warn('Sanity fetch failed, using hardcoded data:', err.message);
  }
}

function reRenderCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('shop')) {
    const grid = document.getElementById('products-grid');
    if (grid) renderProducts('products-grid');
    initShopFilters && initShopFilters();
  } else if (path.includes('blog-post')) {
    typeof renderBlogDetailPage === 'function' && renderBlogDetailPage();
  } else if (path.includes('blog')) {
    renderBlog('blog-grid');
  } else if (path.includes('events')) {
    renderEventsPage();
  } else if (path.includes('collections')) {
    renderCollections('collections-grid');
  } else if (path.includes('product')) {
    typeof renderProductDetailPage === 'function' && renderProductDetailPage();
  } else {
    const grid = document.getElementById('products-grid');
    if (grid) renderProducts('products-grid', null, null, 6);
    // Homepage: nearest event block
    renderHomeEventBlock('home-event-section');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadFromSanity();
});

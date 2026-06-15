/* ============================================================
   SILVER KISS — central content config
   The whole site renders from SK_DEFAULT (merged with any
   localStorage override saved by Admin.html). Structure is kept
   flat & portable so a real backend can drop in later.
   ============================================================ */
(function () {
  var SK_VERSION = 3;
  var STORE_KEY = 'sk_content';

  // helper to build a default Unsplash url from a photo id
  var u = function (id, w) {
    return 'https://images.unsplash.com/photo-' + id + '?w=' + (w || 900) + '&q=72&auto=format&fit=crop';
  };

  var SK_DEFAULT = {
    __v: SK_VERSION,

    brand: { name: 'Silver Kiss', tag: 'Бижута от сребро 925' },

    nav: ['Колекции', 'Каталог', 'Материали', 'За нас', 'Контакт'],

    hero: {
      title: 'SILVER KISS',
      hint: 'Скролни за да разкриеш',
      baseImg: 'assets/base.jpg',
      revealImg: 'assets/reveal.png',
      feather: 18
    },

    manifest: {
      kicker: 'Манифест',
      quote: 'Среброто помни всяко докосване.',
      sub: 'Всяко наше бижу е изработено на ръка от сребро 925 — за да носи отпечатъка на момента, в който е създадено, и на ръката, която го избира.'
    },

    collections: {
      kicker: 'Колекции',
      items: [
        { name: 'Пръстени',  meta: '24 модела', img: u('1617038220319-276d3cfab638', 600) },
        { name: 'Обеци',     meta: '31 модела', img: u('1535632066927-ab7c9ab60908', 600) },
        { name: 'Колиета',   meta: '18 модела', img: u('1620656798579-1984d9e87df7', 600) },
        { name: 'Гривни',    meta: '15 модела', img: u('1573408301185-9146fe634ad0', 600) },
        { name: 'Комплекти', meta: '9 модела',  img: u('1515562141207-7a88fb7ce338', 600) }
      ]
    },

    catalog: {
      kicker: 'Каталог',
      cta: 'Разгледай каталога',
      filters: ['Всички', 'Сребро 925', 'Позлатени', 'С камъни', 'Перли'],
      products: [
        { name: 'Пръстен „Луна“',         price: '66 €',  mat: 'Сребро 925', span: 'span-5', ar: 'ar-tall', img: u('1605100804763-247f67b3557e') },
        { name: 'Обеци „Капка роса“',     price: '49 €',  mat: 'Перли',      span: 'span-4', ar: 'ar-port', img: u('1588444650733-d0767b753fc8') },
        { name: 'Колие „Орбита“',         price: '95 €',  mat: 'С камъни',   span: 'span-3', ar: 'ar-sq',   img: u('1589128777073-263566ae5e4d') },
        { name: 'Гривна „Тренца“',        price: '75 €',  mat: 'Сребро 925', span: 'span-4', ar: 'ar-land', img: u('1573408301185-9146fe634ad0') },
        { name: 'Пръстен „Розов сапфир“', price: '125 €', mat: 'С камъни',   span: 'span-4', ar: 'ar-port', img: u('1603561591411-07134e71a2a9') },
        { name: 'Обеци „Полумесец“',      price: '60 €',  mat: 'Позлатени',  span: 'span-4', ar: 'ar-port', img: u('1617038220319-276d3cfab638') },
        { name: 'Колие „Перлен възел“',   price: '105 €', mat: 'Перли',      span: 'span-5', ar: 'ar-land', img: u('1599643478518-a784e5dc4c8f') },
        { name: 'Гривна „Звено“',         price: '85 €',  mat: 'Позлатени',  span: 'span-7', ar: 'ar-land', img: u('1602173574767-37ac01994b2a') }
      ]
    },

    materials: {
      kicker: 'Материали',
      items: [
        { name: 'Сребро 925',        stat: '925', unit: '‰',  img: u('1605100804763-247f67b3557e', 700), body: 'Сертифицирано сребро с проба 925 — 92.5% чисто сребро, балансирано за здравина и блясък, който остава.' },
        { name: 'Родиево покритие',  stat: '0.2', unit: 'µm', img: u('1588444650733-d0767b753fc8', 700), body: 'Тънък слой родий защитава повърхността от потъмняване и придава хладен, огледален отблясък.' },
        { name: 'Естествени камъни', stat: '0.5', unit: 'ct', img: u('1603561591411-07134e71a2a9', 700), body: 'Подбрани естествени камъни — топаз, сапфир, аметист — шлифовани за максимална игра на светлина.' },
        { name: 'Перли',             stat: '100', unit: '%',  img: u('1599643478518-a784e5dc4c8f', 700), body: 'Сладководни перли с естествен блясък, подбрани една по една за форма и наситеност на цвета.' }
      ]
    },

    accent: {
      sub: 'Бижу на месеца',
      name: 'Розов сапфир',
      button: 'Виж повече',
      img: u('1603561591411-07134e71a2a9')
    },

    testimonials: {
      kicker: 'Отзиви',
      items: [
        { q: 'Носих колието на сватбата си и всички питаха откъде е. Среброто блести като в първия ден.', a: 'Мария Д.' },
        { q: 'Подарих обеци на майка ми. Тя не ги сваля. Качеството е безупречно.', a: 'Ивайло П.' },
        { q: 'Най-после марка, която разбира, че простотата е лукс.', a: 'Елена С.' }
      ]
    },

    lookbook: {
      kicker: 'Lookbook',
      items: [
        { label: 'Lookbook 01', shape: '',     img: u('1620656798579-1984d9e87df7', 700) },
        { label: 'Lookbook 02', shape: 'land', img: u('1611591437281-460bfbe1220a', 700) },
        { label: 'Lookbook 03', shape: '',     img: u('1611652022419-a9419f74343d', 700) },
        { label: 'Lookbook 04', shape: '',     img: u('1635767798638-3e25273a8236', 700) },
        { label: 'Lookbook 05', shape: 'land', img: u('1633934542430-0905ccb5f050', 700) },
        { label: 'Lookbook 06', shape: '',     img: u('1611085583191-a3b181a88401', 700) }
      ]
    },

    footer: {
      slogan: 'Целувка от сребро.',
      newsLabel: 'Получавай нови колекции първи',
      newsButton: 'Абонирай се',
      newsPlaceholder: 'Имейл',
      links: [
        { label: 'Колекции',  href: '#collections' },
        { label: 'Каталог',   href: '#catalog' },
        { label: 'Материали', href: '#materials' },
        { label: 'За нас',    href: '#accent' },
        { label: 'Контакт',   href: '#contact' },
        { label: 'Instagram', href: '#' }
      ],
      copy: '© 2026 Silver Kiss — Бижута от сребро 925',
      credit: { text: 'Изработено от WEBNOVA.BG', href: 'https://webnova.bg' },
      watermark: 'Silver Kiss'
    }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  // read merged content: stored override (if same version) else defaults
  function SK_CONTENT() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && o.__v === SK_VERSION) return o;
      }
    } catch (e) {}
    return clone(SK_DEFAULT);
  }

  function SK_SAVE(obj) {
    obj.__v = SK_VERSION;
    localStorage.setItem(STORE_KEY, JSON.stringify(obj));
  }
  function SK_RESET() { localStorage.removeItem(STORE_KEY); }

  /* ============================================================
     SK_STORE — storage abstraction with swappable adapters.
     Today everything runs through the `local` adapter (localStorage).
     When the real backend is ready, set SK_STORE.adapter = 'supabase'
     and fill SK_STORE.config — NOTHING else in the app changes.
     See BACKEND.md for the exact Supabase setup (table, bucket, RLS).
     All methods are async so the REST adapter is a drop-in.
     ============================================================ */
  var CONN_KEY = 'sk_conn';   // where the Supabase connection settings live

  function loadConn() {
    try {
      var raw = localStorage.getItem(CONN_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { adapter: 'local', url: '', anonKey: '', table: 'site_content', bucket: 'media', token: '' };
  }
  function saveConn(conn) { localStorage.setItem(CONN_KEY, JSON.stringify(conn)); }

  /* ---- image downscaling: keeps base64 small enough for localStorage ----
     Reads a File, draws it onto a canvas capped at maxW, returns a JPEG
     data-URL. In Supabase mode we upload the original File instead. */
  function downscaleToDataURL(file, maxW, quality) {
    maxW = maxW || 1400; quality = quality || 0.82;
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        var scale = Math.min(1, maxW / img.naturalWidth);
        var w = Math.round(img.naturalWidth * scale);
        var h = Math.round(img.naturalHeight * scale);
        var cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        var type = /png/i.test(file.type) && scale === 1 ? 'image/png' : 'image/jpeg';
        resolve(cv.toDataURL(type, quality));
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Грешка при четене на изображението')); };
      img.src = url;
    });
  }

  /* ---- LOCAL adapter (demo, works offline) ---- */
  var localAdapter = {
    load: function () { return Promise.resolve(SK_CONTENT()); },
    save: function (obj) {
      try { SK_SAVE(obj); return Promise.resolve(true); }
      catch (e) { return Promise.reject(new Error('Локалното хранилище е пълно — намали броя/размера на качените снимки или премини към Supabase.')); }
    },
    reset: function () { SK_RESET(); return Promise.resolve(true); },
    // store image inline as a downscaled base64 data-URL
    uploadImage: function (file) { return downscaleToDataURL(file, 1400, 0.82); }
  };

  /* ---- SUPABASE adapter (production) ----
     Code-complete; needs your project URL + anon key + the table/bucket
     described in BACKEND.md. Runs in the real browser (not testable in the
     design sandbox). Content is a single row id=1 with a jsonb `data` column. */
  function supaHeaders(conn, json) {
    var h = { apikey: conn.anonKey, Authorization: 'Bearer ' + (conn.token || conn.anonKey) };
    if (json) h['Content-Type'] = 'application/json';
    return h;
  }
  var supabaseAdapter = {
    load: function () {
      var conn = loadConn();
      return fetch(conn.url + '/rest/v1/' + conn.table + '?select=data&id=eq.1', { headers: supaHeaders(conn) })
        .then(function (r) { return r.json(); })
        .then(function (rows) { return (rows && rows[0]) ? rows[0].data : clone(SK_DEFAULT); });
    },
    save: function (obj) {
      var conn = loadConn();
      obj.__v = SK_VERSION;
      return fetch(conn.url + '/rest/v1/' + conn.table, {
        method: 'POST',
        headers: Object.assign(supaHeaders(conn, true), { Prefer: 'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify({ id: 1, data: obj })
      }).then(function (r) { if (!r.ok) throw new Error('Supabase save ' + r.status); return true; });
    },
    reset: function () { return supabaseAdapter.save(clone(SK_DEFAULT)); },
    uploadImage: function (file) {
      var conn = loadConn();
      var path = 'uploads/' + Date.now() + '-' + file.name.replace(/[^\w.\-]/g, '_');
      return fetch(conn.url + '/storage/v1/object/' + conn.bucket + '/' + path, {
        method: 'POST', headers: supaHeaders(conn), body: file
      }).then(function (r) {
        if (!r.ok) throw new Error('Supabase upload ' + r.status);
        return conn.url + '/storage/v1/object/public/' + conn.bucket + '/' + path;
      });
    }
  };

  var SK_STORE = {
    get conn() { return loadConn(); },
    setConn: function (patch) { var c = Object.assign(loadConn(), patch); saveConn(c); return c; },
    get adapterName() { return loadConn().adapter === 'supabase' ? 'supabase' : 'local'; },
    _a: function () { return this.adapterName === 'supabase' ? supabaseAdapter : localAdapter; },
    load: function () { return this._a().load(); },
    save: function (obj) { return this._a().save(obj); },
    reset: function () { return this._a().reset(); },
    uploadImage: function (file) { return this._a().uploadImage(file); },
    downscaleToDataURL: downscaleToDataURL
  };

  window.SK_VERSION = SK_VERSION;
  window.SK_STORE_KEY = STORE_KEY;
  window.SK_DEFAULT = SK_DEFAULT;
  window.SK_CONTENT = SK_CONTENT;
  window.SK_SAVE = SK_SAVE;
  window.SK_RESET = SK_RESET;
  window.SK_CLONE = clone;
  window.SK_STORE = SK_STORE;

  // resolve once for the site to render from (sync, from local cache).
  // In supabase mode the local copy acts as an instant-paint cache; the
  // admin's Save keeps it in sync, and the site can optionally re-hydrate
  // from SK_STORE.load() — see BACKEND.md "Hydration".
  window.__SK = SK_CONTENT();
})();

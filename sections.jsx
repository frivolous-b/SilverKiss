/* SILVER KISS — page sections, fully rendered from window.__SK (see content.js) */
(function () {
const { useRef, useEffect, useState } = React;
const C = window.__SK || window.SK_DEFAULT;

/* shared media box — renders a real photo when `src` is given, else the ring motif */
function Ph({ label, src, className = '' }) {
  const onLoad = (e) => e.currentTarget.classList.add('loaded');
  return (
    <div className={`ph ${className}`}>
      {src
        ? <img className="ph-img" src={src} alt={label || ''} loading="lazy" decoding="async" onLoad={onLoad} />
        : <div className="ring"></div>}
      {label ? <span className="ph-label">{label}</span> : null}
    </div>
  );
}

function SectionHead({ num, kicker }) {
  return (
    <div className="section-head" data-reveal>
      <div className="eyebrow-row">
        <span className="kicker"><span className="num">{num}</span> &nbsp;/&nbsp; {kicker}</span>
        <span className="rule"></span>
      </div>
    </div>
  );
}

/* ---------------- S1 МАНИФЕСТ ---------------- */
function Manifest() {
  const ref = useRef(null);
  useEffect(() => {
    if (document.documentElement.classList.contains('reduced')) return;
    const words = ref.current.querySelectorAll('.word');
    const st = gsap.from(words, {
      opacity: 0, yPercent: 120, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 72%' },
    });
    return () => { st.scrollTrigger && st.scrollTrigger.kill(); st.kill && st.kill(); };
  }, []);
  const text = C.manifest.quote;
  return (
    <section className="section manifest" id="manifest" data-screen-label="Манифест" ref={ref}>
      <div>
        <p className="quote" aria-label={text}>
          {text.split(' ').map((w, i) => (<span className="word" key={i}>{w}</span>))}
        </p>
        <p className="sub" data-reveal>{C.manifest.sub}</p>
      </div>
    </section>
  );
}

/* ---------------- S2 КОЛЕКЦИИ ---------------- */
function Collections() {
  const items = C.collections.items;
  const previewRef = useRef(null);
  const [hover, setHover] = useState(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (document.documentElement.classList.contains('reduced')) return;
    let raf;
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.12;
      cur.current.y += (pos.current.y - cur.current.y) * 0.12;
      if (previewRef.current) {
        previewRef.current.style.left = cur.current.x + 'px';
        previewRef.current.style.top = cur.current.y + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  const pad2 = (n) => String(n + 1).padStart(2, '0');

  return (
    <section className="section collections" id="collections" data-screen-label="Колекции">
      <SectionHead num="01" kicker={C.collections.kicker} />
      <div className={`col-list ${hover !== null ? 'has-hover' : ''}`}>
        {items.map((c, i) => (
          <div
            key={i}
            className={`col-row ${hover === i ? 'is-hover' : ''}`}
            data-reveal
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="col-num">{pad2(i)}</span>
            <span className="col-name">{c.name}</span>
            <span className="col-meta">{c.meta} <span className="arrow">→</span></span>
          </div>
        ))}
      </div>
      <div className={`col-preview ${hover !== null ? 'show' : ''}`} ref={previewRef}>
        {items.map((c, i) => (
          <img key={i} className={`col-prev-img ${hover === i ? 'on' : ''}`} src={c.img} alt={c.name} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

/* ---------------- S3 КАТАЛОГ ---------------- */
function Catalog() {
  const [filter, setFilter] = useState(0);
  const filters = C.catalog.filters;
  const products = C.catalog.products;
  return (
    <section className="section catalog" id="catalog" data-screen-label="Каталог">
      <SectionHead num="02" kicker={C.catalog.kicker} />
      <div className="cat-filters" data-reveal>
        {filters.map((f, i) => (
          <button key={i} className={`pill ${filter === i ? 'is-active' : ''}`} onClick={() => setFilter(i)}>{f}</button>
        ))}
      </div>
      <div className="cat-grid">
        {products.map((p, i) => (
          <div className={`cat-card ${p.span || 'span-4'}`} key={i} data-reveal>
            <div className={`cat-media ${p.ar || 'ar-port'}`}>
              <div className="ph-inner"><Ph label={p.mat} src={p.img} /></div>
              <div className="cat-price-slide"><span>{p.name}</span><span>{p.price}</span></div>
            </div>
            <div className="cat-info">
              <span className="cat-name">{p.name}</span>
              <span className="cat-price">{p.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="cat-cta-wrap" data-reveal>
        <button className="cta-line">{C.catalog.cta} <span className="cta-arrow">→</span></button>
      </div>
    </section>
  );
}

/* ---------------- S4 МАТЕРИАЛИ ---------------- */
function CountStat({ value, unit }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const to = parseFloat(value) || 0;
    const dec = (String(value).split('.')[1] || '').length;
    if (document.documentElement.classList.contains('reduced')) { el.textContent = to.toFixed(dec); return; }
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: to, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = obj.v.toFixed(dec); },
      scrollTrigger: { trigger: el, start: 'top 82%' },
    });
    return () => { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); };
  }, [value]);
  return (<span className="mat-stat"><span ref={ref}>0</span><span className="unit">{unit}</span></span>);
}
function Materials() {
  const pad2 = (n) => String(n + 1).padStart(2, '0');
  return (
    <section className="section materials-sec" id="materials" data-screen-label="Материали">
      <SectionHead num="03" kicker={C.materials.kicker} />
      <div className="materials">
        {C.materials.items.map((m, i) => (
          <div className="mat-step" key={i} data-reveal>
            <div className="mat-figure"><CountStat value={m.stat} unit={m.unit} /></div>
            <div className="mat-macro"><Ph src={m.img} /></div>
            <div>
              <div className="mat-idx">{pad2(i)}</div>
              <div className="mat-name">{m.name}</div>
              <p className="mat-body">{m.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- S5 АКЦЕНТ ---------------- */
function Accent() {
  return (
    <section className="section accent" id="accent" data-screen-label="Акцент">
      <div className="accent-sub" data-reveal>{C.accent.sub}</div>
      <div className="accent-media" data-reveal><div className="ph-inner"><Ph label={C.accent.name} src={C.accent.img} /></div></div>
      <h2 className="accent-name display" data-reveal>{C.accent.name}</h2>
      <button className="pill" data-reveal>{C.accent.button}</button>
    </section>
  );
}

/* ---------------- S6 ОТЗИВИ ---------------- */
function Testimonials() {
  const items = C.testimonials.items;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (document.documentElement.classList.contains('reduced')) return;
    if (items.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5200);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="section testi" id="testi" data-screen-label="Отзиви">
      <SectionHead num="04" kicker={C.testimonials.kicker} />
      <div className="quote-wrap">
        {items.map((t, k) => (
          <blockquote className={`t-quote ${k === i ? 'active' : ''}`} key={k}>
            „{t.q}“<cite className="t-author">{t.a}</cite>
          </blockquote>
        ))}
      </div>
      <div className="t-dots">
        {items.map((_, k) => (
          <button key={k} className={`t-dot ${k === i ? 'active' : ''}`} onClick={() => setI(k)} aria-label={`Отзив ${k + 1}`}></button>
        ))}
      </div>
    </section>
  );
}

/* ---------------- S7 LOOKBOOK ---------------- */
function Lookbook() {
  const items = C.lookbook.items;
  const row = [...items, ...items];
  return (
    <section className="section lookbook" id="lookbook" data-screen-label="Lookbook">
      <SectionHead num="05" kicker={C.lookbook.kicker} />
      <div className="marquee">
        {row.map((it, k) => (
          <div className={`look ${it.shape === 'land' ? 'land' : ''}`} key={k}>
            <Ph label={it.label} src={it.img} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- S8 FOOTER ---------------- */
function Footer() {
  const [sent, setSent] = useState(false);
  const f = C.footer;
  return (
    <footer className="footer" id="contact" data-screen-label="Footer">
      <div className="foot-grid">
        <div className="slogan" data-reveal>{f.slogan}</div>
        <div data-reveal>
          <div className="news-label">{f.newsLabel}</div>
          <form className="news-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input type="email" placeholder={f.newsPlaceholder || 'Имейл'} aria-label="Имейл" required />
            <button className="pill" type="submit">{sent ? 'Готово ✓' : f.newsButton}</button>
          </form>
        </div>
      </div>
      <div className="foot-links" data-reveal>
        {f.links.map((l, i) => (<a href={l.href} key={i}>{l.label}</a>))}
      </div>
      <div className="foot-bottom">
        <span>{f.copy}</span>
        <a className="foot-credit" href={f.credit.href} target="_blank" rel="noopener noreferrer">{f.credit.text}</a>
      </div>
      <div className="watermark" aria-hidden="true">{f.watermark}</div>
    </footer>
  );
}

function Sections() {
  return (
    <main className="content">
      <div className="hero-spacer"></div>
      <Manifest />
      <Collections />
      <Catalog />
      <Materials />
      <Accent />
      <Testimonials />
      <Lookbook />
      <Footer />
    </main>
  );
}

Object.assign(window, { Sections });
})();

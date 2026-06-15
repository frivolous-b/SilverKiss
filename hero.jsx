/* SILVER KISS — Hero (approved mechanic, now hands off to native scroll) */
(function () {
const { useRef, useEffect } = React;

const WHEEL_FACTOR = 0.0006;
const TOUCH_FACTOR = 0.0015;
const LERP = 0.08;
const PARALLAX = 40;           // px, ±

const C = window.__SK || window.SK_DEFAULT;
const FEATHER = (C.hero && typeof C.hero.feather === 'number') ? C.hero.feather : 18;
const HERO_TITLE = (C.hero && C.hero.title) || 'SILVER KISS';

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;

function Mark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="15" r="14" stroke="#fff" strokeWidth="1.1" opacity="0.55" />
      <circle cx="15" cy="15" r="7.5" stroke="#fff" strokeWidth="1.1" />
      <circle cx="15" cy="15" r="1.7" fill="#fff" />
    </svg>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <Mark />
        <div className="brand-text">
          <div className="brand-name">{C.brand.name}</div>
          <div className="brand-tag">{C.brand.tag}</div>
        </div>
      </div>
      <nav className="nav">
        {C.nav.map((label, i) => (
          <button className="pill" key={i}>{label}</button>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const heroRef   = useRef(null);
  const frameRef  = useRef(null);
  const revealRef = useRef(null);
  const charRefs  = useRef([]);
  const hintRef   = useRef(null);
  const progRef   = useRef(null);

  const target   = useRef(0);
  const current  = useRef(0);
  const mTarget  = useRef({ x: 0, y: 0 });
  const mCurrent = useRef({ x: 0, y: 0 });
  const locked   = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({ paused: true });
    tl.to(charRefs.current, {
      opacity: 0, yPercent: 300, scaleY: 1.2, scaleX: 0.9,
      stagger: 0.03, ease: 'power2.inOut',
    });

    const applyMask = (p) => {
      const edge = p * (100 + FEATHER);
      const lo = Math.max(0, edge - FEATHER);
      const grad = `linear-gradient(to top, #000 ${lo}%, rgba(0,0,0,0) ${Math.max(lo, edge)}%)`;
      const el = revealRef.current;
      if (el) { el.style.webkitMaskImage = grad; el.style.maskImage = grad; }
    };
    applyMask(0);

    const setLocked = (v) => {
      if (locked.current === v) return;
      locked.current = v;
      if (v) {
        document.body.classList.add('is-locked');
        heroRef.current && heroRef.current.classList.remove('unlocked');
      } else {
        document.body.classList.remove('is-locked');
        heroRef.current && heroRef.current.classList.add('unlocked');
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }
    };

    // page begins locked while the reveal is played
    document.body.classList.add('is-locked');

    // ---- reduced motion: final state, scrolling enabled ----
    if (reduced) {
      target.current = 1; current.current = 1;
      applyMask(1); tl.progress(1);
      locked.current = false;
      document.body.classList.remove('is-locked');
      heroRef.current && heroRef.current.classList.add('unlocked', 'static');
      if (hintRef.current) hintRef.current.style.opacity = '0';
      if (progRef.current) progRef.current.style.opacity = '0';
      if (frameRef.current) frameRef.current.style.transform = 'translate(-50%, -50%) scale(1.02)';
      return;
    }

    // ---- entrance: letters rise in, nav drops, brand fades ----
    let introDone = false;
    if (frameRef.current) { frameRef.current.style.opacity = '0'; }
    const introTl = gsap.timeline({ delay: 0.2, onComplete: () => { introDone = true; } });
    introTl
      .from(charRefs.current, { yPercent: 130, opacity: 0, stagger: 0.045, duration: 0.78, ease: 'power3.out' })
      .from('.nav .pill', { y: -26, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, 0.18)
      .from('.brand', { y: -14, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.05);

    const startT = performance.now();
    let raf;
    const tick = (now) => {
      current.current = lerp(current.current, target.current, LERP);
      mCurrent.current.x = lerp(mCurrent.current.x, mTarget.current.x, LERP);
      mCurrent.current.y = lerp(mCurrent.current.y, mTarget.current.y, LERP);

      const p = current.current;
      applyMask(p);
      const active = introDone || p > 0.003;
      if (active) tl.progress(p);

      // whole-hero scroll-away only while native scroll owns the page
      const leaveY = locked.current ? 0 : -Math.min(window.scrollY, window.innerHeight);
      if (heroRef.current) heroRef.current.style.transform = `translate3d(0, ${leaveY}px, 0)`;

      // entrance: slow approach + blur-out + fade-in over ~1.7s
      const it = Math.min(1, (now - startT) / 1700);
      const ie = 1 - Math.pow(1 - it, 3);              // easeOutCubic
      const introScale = 1 + (1 - ie) * 0.14;          // 1.14 -> 1.00
      const introBlur = (1 - ie) * 16;                 // 16px -> 0
      const introOpacity = Math.min(1, ie * 1.25);
      if (it >= 1) introDone = true;

      // breathing: slow Ken Burns zoom 1.00 -> 1.04 + mouse parallax
      const kb = 1.02 + 0.02 * Math.sin((now - startT) / 1000 * 0.32);
      if (frameRef.current) {
        frameRef.current.style.opacity = String(introOpacity);
        frameRef.current.style.filter = introBlur > 0.05 ? `blur(${introBlur.toFixed(2)}px)` : 'none';
        frameRef.current.style.transform =
          `translate(calc(-50% + ${mCurrent.current.x}px), calc(-50% + ${mCurrent.current.y}px)) scale(${kb * introScale})`;
      }

      if (active && hintRef.current) hintRef.current.style.opacity = locked.current ? String(clamp01(1 - p * 6)) : '0';
      if (progRef.current) {
        progRef.current.textContent = String(Math.round(p * 100)).padStart(3, '0');
        if (active) progRef.current.style.opacity = locked.current ? '1' : '0';
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ---- bidirectional gesture handoff ----
    const feed = (delta) => { target.current = clamp01(target.current + delta); };

    const onWheel = (e) => {
      if (locked.current) {
        e.preventDefault();
        feed(e.deltaY * WHEEL_FACTOR);
        // fully revealed and still pushing down -> release to native scroll
        if (target.current >= 0.999 && e.deltaY > 0) setLocked(false);
      } else if (window.scrollY <= 0 && e.deltaY < 0) {
        // back at the very top, scrolling up -> re-take the gesture, play the wipe backward
        setLocked(true);
        e.preventDefault();
        feed(e.deltaY * WHEEL_FACTOR);
      }
    };

    let lastTouch = null;
    const onTouchStart = (e) => { lastTouch = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (lastTouch === null) return;
      const y = e.touches[0].clientY;
      const dy = lastTouch - y;            // swipe up (dy>0) reveals
      lastTouch = y;
      if (locked.current) {
        e.preventDefault();
        feed(dy * TOUCH_FACTOR);
        if (target.current >= 0.999 && dy > 0) setLocked(false);
      } else if (window.scrollY <= 0 && dy < 0) {
        setLocked(true);
        e.preventDefault();
        feed(dy * TOUCH_FACTOR);
      }
    };
    const onTouchEnd = () => { lastTouch = null; };

    const onMouseMove = (e) => {
      mTarget.current.x = (e.clientX / window.innerWidth - 0.5) * PARALLAX;
      mTarget.current.y = (e.clientY / window.innerHeight - 0.5) * PARALLAX;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousemove', onMouseMove);
      tl.kill();
      document.body.classList.remove('is-locked');
    };
  }, []);

  const chars = [];
  let ci = 0;
  for (let i = 0; i < HERO_TITLE.length; i++) {
    const c = HERO_TITLE[i];
    if (c === ' ') {
      chars.push(<span key={i} className="space" aria-hidden="true"></span>);
    } else {
      const idx = ci++;
      chars.push(
        <span key={i} className="char" aria-hidden="true"
          ref={(el) => { if (el) charRefs.current[idx] = el; }}>{c}</span>
      );
    }
  }

  return (
    <div className="hero" ref={heroRef}>
      <div className="frame" ref={frameRef}>
        <div className="layer layer-base" style={{ backgroundImage: `url('${C.hero.baseImg}')` }}></div>
        <div className="layer layer-reveal" ref={revealRef} style={{ backgroundImage: `url('${C.hero.revealImg}')` }}></div>
      </div>
      <div className="title-wrap">
        <h1 className="hero-title" aria-label={HERO_TITLE}>{chars}</h1>
      </div>
      <div className="hint" ref={hintRef}>
        <div className="hint-label">{C.hero.hint}</div>
        <div className="hint-track"></div>
      </div>
      <div className="progress" ref={progRef}>000</div>
    </div>
  );
}

Object.assign(window, { Hero, Header, Mark });
})();

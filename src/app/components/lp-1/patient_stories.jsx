'use client'
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

/* ─────────────────────────────────────────────────────────
   Inline styles (no extra CSS file needed — drop-in ready)
   ───────────────────────────────────────────────────────── */
const S = {
  section: {
    height: '380vh',
    background: 'linear-gradient(180deg,#f8fbfe 0%,#ffffff 50%,#f8fbfe 100%)',
    padding: 0,
    position: 'relative',
  },
  pin: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 28px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  sectionHead: {
    textAlign: 'center',
    maxWidth: 760,
    margin: '0 auto',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#12a4dd',
    marginBottom: 14,
  },
  eyebrowBar: {
    width: 28,
    height: 2,
    background: '#12a4dd',
    borderRadius: 2,
    display: 'inline-block',
    marginRight: 10,
  },
  h2: {
    fontFamily: 'var(--font-outfit), sans-serif',
    fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)',
    fontWeight: 400,
    color: '#0d1b2a',
    lineHeight: 1.12,
    letterSpacing: '-0.01em',
    margin: '0 0 16px',
  },
  p: {
    color: '#5a7184',
    fontSize: '1.05rem',
  },

  /* ── Constellation canvas ── */
  constellation: {
    position: 'relative',
    height: 700,
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
  },

  /* ── Rings SVG ── */
  rings: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },

  /* ── Orb + centre text ── */
  core: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    textAlign: 'center',
    zIndex: 1,
    width: 320,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.4s ease',
  },
  orb: {
    width: 84,
    height: 84,
    margin: '0 auto 22px',
    borderRadius: '50%',
    background:
      'conic-gradient(from 180deg at 50% 50%,#5b3fc4,#7a3fd1,#ce4b8c,#ec5a73,#f1a35e,#5b3fc4)',
    boxShadow:
      '0 0 0 1px rgba(255,255,255,.4) inset, 0 8px 32px -4px rgba(91,63,196,.45)',
    animation: 'orb-spin 12s linear infinite',
    position: 'relative',
  },
  coreTitle: {
    fontFamily: 'var(--font-outfit), sans-serif',
    fontWeight: 400,
    fontSize: '2.2rem',
    color: '#0d1b2a',
    lineHeight: 1.1,
    marginBottom: 12,
    letterSpacing: '-0.01em',
  },
  coreSub: {
    fontSize: '0.94rem',
    color: '#5a7184',
    lineHeight: 1.55,
  },

  /* ── Story cards ── */
  card: {
    position: 'absolute',
    width: 210,
    height: 250,
    borderRadius: 24,
    overflow: 'hidden',
    background: '#111',
    border: '5px solid rgba(255,255,255,0.95)',
    boxShadow:
      '0 0 0 1.5px rgba(200,220,235,.6), 0 20px 50px -10px rgba(13,27,42,.28), 0 6px 16px -6px rgba(13,27,42,.18)',
    willChange: 'transform, left, top, opacity',
  },
  cardImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    zIndex: 1,
  },
  cardMeta: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    padding: '44px 14px 14px',
    background:
      'linear-gradient(to top,rgba(0,0,0,.96) 25%,rgba(0,0,0,.78) 55%,transparent 100%)',
    color: 'white',
    zIndex: 2,
  },
  cardName: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  nameAge: { fontWeight: 400, opacity: 0.75, fontSize: 12 },
  hba1c: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 7,
    fontWeight: 400,
    lineHeight: 1,
  },
  lab: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    opacity: 0.85,
    alignSelf: 'center',
    background: 'rgba(255,255,255,0.18)',
    padding: '3px 7px',
    borderRadius: 4,
  },
  fromVal: { fontSize: '2rem', fontWeight: 700, color: '#ff7a8a' },
  arr: { fontWeight: 400, color: 'rgba(255,255,255,.75)', fontSize: '1rem' },
  toVal: { fontSize: '2rem', fontWeight: 700, color: '#7ef08a' },

  /* ── Scroll hint ── */
  hint: {
    position: 'absolute',
    bottom: -24,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#5a7184',
    pointerEvents: 'none',
  },

  /* ── Google rating pill ── */
  ratingWrap: {
    textAlign: 'center',
    opacity: 0,
    transition: 'opacity 0.6s ease',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 26px',
    background: 'white',
    border: '1px solid #c8dde8',
    borderRadius: 999,
    boxShadow: '0 1px 2px rgba(13,27,42,.06)',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  gIcon: {
    width: 28, height: 28,
    borderRadius: '50%',
    background:
      'conic-gradient(from 0deg,#4285f4,#34a853,#fbbc05,#ea4335,#4285f4)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: 700,
  },
  pillText: { fontSize: 14, fontWeight: 500, color: '#1e2d3d' },
};

/* ─────────────────────────────────────────────────────────
   Card data
   ───────────────────────────────────────────────────────── */
const CARDS = [
  {
    idx: 0, name: 'Subhash M', age: 54, from: '9.2', to: '6.4',
    fx: '14%', fy: '22%', sr: '-14deg', stx: '-28px', sty: '18px',
    img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=500&fit=crop',
  },
  {
    idx: 1, name: 'Pradeep K', age: 58, from: '10.5', to: '6.8',
    fx: '86%', fy: '22%', sr: '12deg',  stx: '26px',  sty: '12px',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop',
  },
  {
    idx: 2, name: 'Mira D', age: 62, from: '8.9', to: '5.9',
    fx: '8%',  fy: '52%', sr: '-8deg',  stx: '-20px', sty: '-14px',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop',
  },
  {
    idx: 3, name: 'Raymond J', age: 48, from: '8.2', to: '7.0',
    fx: '90%', fy: '52%', sr: '18deg',  stx: '22px',  sty: '-10px',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop',
  },
  {
    idx: 4, name: 'Kanchana B', age: 48, from: '8.5', to: '6.7',
    fx: '16%', fy: '80%', sr: '-6deg',  stx: '-16px', sty: '20px',
    img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&h=500&fit=crop',
  },
  {
    idx: 5, name: 'Rajni B', age: 61, from: '11.3', to: '5.9',
    fx: '82%', fy: '80%', sr: '9deg',   stx: '18px',  sty: '16px',
    img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&h=500&fit=crop',
  },
];

/* ─────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────── */
export default function PatientStories() {
  const { lang } = useLanguage()
  const tx = translations[lang].patientStories
  const sectionRef  = useRef(null);
  const cardRefs    = useRef([]);
  const coreRef     = useRef(null);
  const hintRef     = useRef(null);
  const ratingRef   = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards   = cardRefs.current;
    const core    = coreRef.current;
    const hint    = hintRef.current;
    const rating  = ratingRef.current;
    if (!section || !cards.length) return;

    const N = CARDS.length;
    let ticking = false;

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
    function easeOut(x)     { return 1 - Math.pow(1 - x, 3); }

    function update() {
      ticking = false;
      const rect  = section.getBoundingClientRect();
      const vh    = window.innerHeight;
      const range = rect.height - vh;
      if (range <= 0) return;
      const p = clamp(-rect.top / range, 0, 1);

      const phase1End   = 0.48;
      const windowW     = phase1End / N;
      const phase2Start = 0.52;
      const spread      = easeOut(clamp((p - phase2Start) / (1 - phase2Start), 0, 1));

      cards.forEach((card, i) => {
        if (!card) return;
        const revealStart = i * windowW;
        const revealEnd   = revealStart + windowW * 1.4;
        const reveal      = easeOut(clamp((p - revealStart) / (revealEnd - revealStart), 0, 1));
        const c           = CARDS[i];

        // Lerp position from center → final
        const fxNum = parseFloat(c.fx);
        const fyNum = parseFloat(c.fy);
        const left  = 50 + (fxNum - 50) * spread;
        const top   = 50 + (fyNum - 50) * spread;

        // Stack offset fades out as spread → 1
        const stx = parseFloat(c.stx) * (1 - spread);
        const sty = parseFloat(c.sty) * (1 - spread);
        const rot  = parseFloat(c.sr) * (1 - spread);
        const sc   = 0.5 + 0.5 * reveal;

        card.style.left    = `${left}%`;
        card.style.top     = `${top}%`;
        card.style.opacity = reveal.toFixed(4);
        card.style.zIndex  = 10 + i;
        card.style.transform =
          `translate(calc(-50% + ${stx.toFixed(2)}px), calc(-50% + ${sty.toFixed(2)}px))` +
          ` rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      });

      if (core)   core.style.opacity   = easeOut(clamp((p - 0.56) / 0.32, 0, 1)).toFixed(3);
      if (hint)   hint.style.opacity   = Math.max(0, 1 - p * 10).toFixed(2);
      if (rating) rating.style.opacity = easeOut(clamp((p - 0.90) / 0.10, 0, 1)).toFixed(3);
    }

    function onScroll() {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      {/* Global keyframe — inject once */}
      <style>{`
        @keyframes orb-spin { to { transform: rotate(360deg); } }
        @keyframes ring-rotate { to { transform: rotate(360deg); } }
        @keyframes hint-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .ring-spin { transform-origin: 400px 400px; animation: ring-rotate 22s linear infinite; }
        .ring-spin-rev { animation: ring-rotate 30s linear infinite reverse; }
      `}</style>

      <section  ref={sectionRef} style={S.section}>
        <div className='h-[100vh] py-20' style={S.pin}>
          <div style={S.container}>

            {/* Section heading */}
            <div className='' style={S.sectionHead}>
              <div style={S.eyebrow}>
                <span style={S.eyebrowBar} />
                {tx.eyebrow}
              </div>
              
            </div>

            {/* Constellation canvas */}
            <div style={S.constellation}>

              {/* Decorative rings */}
              <svg style={S.rings} viewBox="0 0 800 800" aria-hidden="true">
                <defs>
                  <linearGradient id="ring-stroke-jsx" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#12a4dd" stopOpacity="0.25" />
                    <stop offset="50%"  stopColor="#12a4dd" stopOpacity="0" />
                    <stop offset="100%" stopColor="#ec1c36" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <circle cx="400" cy="400" r="160" fill="none" stroke="#e8f2f7" strokeWidth="1.5" />
                <circle cx="400" cy="400" r="255" fill="none" stroke="#e8f2f7" strokeWidth="1.5" />
                <circle cx="400" cy="400" r="350" fill="none" stroke="#e8f2f7" strokeWidth="1.5" />
                <circle cx="400" cy="400" r="160" fill="none" stroke="url(#ring-stroke-jsx)" strokeWidth="2"
                  strokeDasharray="50 260" className="ring-spin" />
                <circle cx="400" cy="400" r="255" fill="none" stroke="url(#ring-stroke-jsx)" strokeWidth="1.5"
                  strokeDasharray="70 300" className="ring-spin ring-spin-rev" />
              </svg>

              {/* Centre orb + text */}
              <div ref={coreRef} style={S.core}>
                <div style={S.orb}>
                  <div style={{
                    position: 'absolute', top: '12%', left: '18%',
                    width: '30%', height: '22%',
                    background: 'radial-gradient(ellipse,rgba(255,255,255,.85),transparent 70%)',
                    borderRadius: '50%', filter: 'blur(2px)',
                  }} />
                </div>
                <h3 style={S.coreTitle}>{tx.coreTitle}</h3>
                <p style={S.coreSub}>{tx.coreSub}</p>
              </div>

              {/* Story cards */}
              {CARDS.map((c, i) => (
                <article
                  key={c.name}
                  ref={el => cardRefs.current[i] = el}
                  style={{
                    ...S.card,
                    left: '50%', top: '50%',
                    opacity: 0,
                    transform: 'translate(-50%,-50%) scale(0.5)',
                  }}
                >
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    style={S.cardImg}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${c.name}/500/500`; }}
                  />
                  <div style={S.cardMeta}>
                    <div style={S.cardName}>
                      {c.name} <span style={S.nameAge}>({c.age}yrs)</span>
                    </div>
                    <div style={S.hba1c}>
                      <span style={S.lab}>HBA1C</span>
                      <span style={S.fromVal}>{c.from}</span>
                      <span style={S.arr}>→</span>
                      <span style={S.toVal}>{c.to}</span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Scroll hint */}
              <div ref={hintRef} style={S.hint}>
                <span>{tx.scrollHint}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ animation: 'hint-bounce 1.8s ease-in-out infinite' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Google rating pill */}
            <div ref={ratingRef} style={{ textAlign: 'center', opacity: 0 }}>
              <a
                href="https://share.google/dmePZokGio3TfWQHF"
                target="_blank"
                rel="noopener noreferrer"
                style={S.pill}
              >
                <span style={S.gIcon}>G</span>
                <span style={S.pillText}>
                  {tx.rating}
                </span>
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

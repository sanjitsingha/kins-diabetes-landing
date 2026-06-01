'use client'
import React, { useEffect, useRef } from 'react';

const S = {
  section: { height: '380vh', background: 'linear-gradient(180deg,#f8fbfe 0%,#ffffff 50%,#f8fbfe 100%)', padding: 0, position: 'relative' },
  pin: { position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 28px', width: '100%', display: 'flex', flexDirection: 'column', gap: 24 },
  sectionHead: { textAlign: 'center', maxWidth: 760, margin: '0 auto' },
  eyebrow: { display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#12a4dd', marginBottom: 14 },
  eyebrowBar: { width: 28, height: 2, background: '#12a4dd', borderRadius: 2, display: 'inline-block', marginRight: 10 },
  constellation: { position: 'relative', height: 700, maxWidth: 1200, width: '100%', margin: '0 auto' },
  rings: { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' },
  core: { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', zIndex: 1, width: 320, opacity: 0, pointerEvents: 'none', transition: 'opacity 0.4s ease' },
  orb: { width: 84, height: 84, margin: '0 auto 22px', borderRadius: '50%', background: 'conic-gradient(from 180deg at 50% 50%,#5b3fc4,#7a3fd1,#ce4b8c,#ec5a73,#f1a35e,#5b3fc4)', boxShadow: '0 0 0 1px rgba(255,255,255,.4) inset, 0 8px 32px -4px rgba(91,63,196,.45)', animation: 'orb-spin 12s linear infinite', position: 'relative' },
  coreTitle: { fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 400, fontSize: '2.2rem', color: '#0d1b2a', lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.01em' },
  coreSub: { fontSize: '0.94rem', color: '#5a7184', lineHeight: 1.55 },
  card: { position: 'absolute', width: 210, height: 250, borderRadius: 24, overflow: 'hidden', background: '#111', border: '5px solid rgba(255,255,255,0.95)', boxShadow: '0 0 0 1.5px rgba(200,220,235,.6), 0 20px 50px -10px rgba(13,27,42,.28), 0 6px 16px -6px rgba(13,27,42,.18)', willChange: 'transform, left, top, opacity' },
  cardImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', zIndex: 1 },
  cardMeta: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: '44px 14px 14px', background: 'linear-gradient(to top,rgba(0,0,0,.96) 25%,rgba(0,0,0,.78) 55%,transparent 100%)', color: 'white', zIndex: 2 },
  cardName: { fontSize: 14, fontWeight: 700, marginBottom: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  nameAge: { fontWeight: 400, opacity: 0.75, fontSize: 12 },
  hba1c: { display: 'flex', alignItems: 'baseline', gap: 7, fontWeight: 400, lineHeight: 1 },
  lab: { fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.85, alignSelf: 'center', background: 'rgba(255,255,255,0.18)', padding: '3px 7px', borderRadius: 4 },
  fromVal: { fontSize: '2rem', fontWeight: 700, color: '#ff7a8a' },
  arr: { fontWeight: 400, color: 'rgba(255,255,255,.75)', fontSize: '1rem' },
  toVal: { fontSize: '2rem', fontWeight: 700, color: '#7ef08a' },
  hint: { position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5a7184', pointerEvents: 'none' },
  pill: { display: 'inline-flex', alignItems: 'center', gap: 14, padding: '14px 26px', background: 'white', border: '1px solid #c8dde8', borderRadius: 999, boxShadow: '0 1px 2px rgba(13,27,42,.06)', textDecoration: 'none', cursor: 'pointer' },
  gIcon: { width: 28, height: 28, borderRadius: '50%', background: 'conic-gradient(from 0deg,#4285f4,#34a853,#fbbc05,#ea4335,#4285f4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'serif', fontSize: 18, fontWeight: 700 },
  pillText: { fontSize: 14, fontWeight: 500, color: '#1e2d3d' },
};

const CARDS = [
  { idx: 0, name: 'Subhash M',  age: 54, from: '9.2',  to: '6.4', fx: '14%', fy: '22%', sr: '-14deg', stx: '-28px', sty: '18px',  mfx: '14%', mfy: '9%',  msr: '-11deg', mstx: '-18px', msty: '14px',  img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=500&fit=crop' },
  { idx: 1, name: 'Pradeep K',  age: 58, from: '10.5', to: '6.8', fx: '86%', fy: '22%', sr: '12deg',  stx: '26px',  sty: '12px',  mfx: '80%', mfy: '5%',  msr: '9deg',   mstx: '16px',  msty: '10px',  img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop' },
  { idx: 2, name: 'Mira D',     age: 62, from: '8.9',  to: '5.9', fx: '8%',  fy: '52%', sr: '-8deg',  stx: '-20px', sty: '-14px', mfx: '46%', mfy: '16%', msr: '-6deg',  mstx: '-12px', msty: '-10px', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop' },
  { idx: 3, name: 'Raymond J',  age: 48, from: '8.2',  to: '7.0', fx: '90%', fy: '52%', sr: '18deg',  stx: '22px',  sty: '-10px', mfx: '64%', mfy: '82%', msr: '14deg',  mstx: '14px',  msty: '-8px',  img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop' },
  { idx: 4, name: 'Kanchana B', age: 48, from: '8.5',  to: '6.7', fx: '16%', fy: '80%', sr: '-6deg',  stx: '-16px', sty: '20px',  mfx: '20%', mfy: '88%', msr: '-9deg',  mstx: '-12px', msty: '16px',  img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&h=500&fit=crop' },
  { idx: 5, name: 'Rajni B',    age: 61, from: '11.3', to: '5.9', fx: '82%', fy: '80%', sr: '9deg',   stx: '18px',  sty: '16px',  mfx: '82%', mfy: '96%', msr: '7deg',   mstx: '12px',  msty: '12px',  img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&h=500&fit=crop' },
];

export default function PatientStories() {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);
  const coreRef    = useRef(null);
  const hintRef    = useRef(null);
  const ratingRef  = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards   = cardRefs.current;
    const core    = coreRef.current;
    const hint    = hintRef.current;
    const rating  = ratingRef.current;
    if (!section || !cards.length) return;

    const N = CARDS.length;
    let ticking = false;
    let activeIdx = -1;

    function setActive(idx) {
      activeIdx = idx;
      cards.forEach((card, j) => {
        if (card) card.style.zIndex = j === activeIdx ? 100 : 10 + j;
      });
    }

    const handlers = cards.map((card, i) => {
      if (!card) return null;
      const onEnter = () => setActive(i);
      const onLeave = () => setActive(-1);
      const onClick = () => setActive(activeIdx === i ? -1 : i);
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('click', onClick);
      return { card, onEnter, onLeave, onClick };
    });

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

      const mob = window.innerWidth < 768;
      cards.forEach((card, i) => {
        if (!card) return;
        const revealStart = i * windowW;
        const revealEnd   = revealStart + windowW * 1.4;
        const reveal      = easeOut(clamp((p - revealStart) / (revealEnd - revealStart), 0, 1));
        const c           = CARDS[i];

        const fxNum = parseFloat(mob ? c.mfx : c.fx);
        const fyNum = parseFloat(mob ? c.mfy : c.fy);
        const left  = 50 + (fxNum - 50) * spread;
        const top   = 50 + (fyNum - 50) * spread;

        const stx = parseFloat(mob ? c.mstx : c.stx) * (1 - spread);
        const sty = parseFloat(mob ? c.msty : c.sty) * (1 - spread);
        const rot  = parseFloat(mob ? c.msr  : c.sr)  * (1 - spread);
        const sc   = 0.5 + 0.5 * reveal;

        card.style.left    = `${left}%`;
        card.style.top     = `${top}%`;
        card.style.opacity = reveal.toFixed(4);
        card.style.zIndex  = i === activeIdx ? 100 : 10 + i;
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
      handlers.forEach(h => {
        if (!h) return;
        h.card.removeEventListener('mouseenter', h.onEnter);
        h.card.removeEventListener('mouseleave', h.onLeave);
        h.card.removeEventListener('click', h.onClick);
      });
    };

    
  }, []);

  return (
    <>
      <style>{`
        @keyframes orb-spin { to { transform: rotate(360deg); } }
        @keyframes ring-rotate { to { transform: rotate(360deg); } }
        @keyframes hint-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .ring-spin { transform-origin: 400px 400px; animation: ring-rotate 22s linear infinite; }
        .ring-spin-rev { animation: ring-rotate 30s linear infinite reverse; }
        .ps-card { cursor: pointer; }
        @media (max-width: 768px) {
          .ps-pin { align-items: flex-start !important; padding-top: 124px !important; }
          .ps-constellation { height: 400px !important; }
          .ps-card { width: 140px !important; height: 175px !important; border-width: 3px !important; border-radius: 16px !important; }
          .ps-card-meta { padding: 32px 10px 10px !important; }
          .ps-card-name { font-size: 11px !important; margin-bottom: 3px !important; }
          .ps-hba1c { gap: 4px !important; }
          .ps-lab { font-size: 7px !important; padding: 2px 5px !important; }
          .ps-from-val, .ps-to-val { font-size: 1.3rem !important; }
          .ps-arr { font-size: 0.8rem !important; }
          .ps-core { display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: center !important; gap: 14px !important; text-align: left !important; width: fit-content !important; left: 50% !important; transform: translate(-50%, -50%) !important; }
          .ps-core-text { flex: 1; min-width: 0; }
          .ps-orb { width: 52px !important; height: 52px !important; flex-shrink: 0 !important; margin: 0 !important; }
          .ps-core-title { font-size: 1rem !important; line-height: 1.2 !important; margin-bottom: 4px !important; }
          .ps-core-sub { font-size: 0.72rem !important; line-height: 1.4 !important; }
        }
      `}</style>

      <section ref={sectionRef} style={S.section}>
        <div className='ps-pin h-screen pb-20' style={S.pin}>
          <div style={S.container}>

            <div style={S.sectionHead}>
              <div style={S.eyebrow}>
                <span style={S.eyebrowBar} />
                Patient stories
              </div>
            </div>

            <div className="ps-constellation" style={S.constellation}>
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
                <circle cx="400" cy="400" r="160" fill="none" stroke="url(#ring-stroke-jsx)" strokeWidth="2" strokeDasharray="50 260" className="ring-spin" />
                <circle cx="400" cy="400" r="255" fill="none" stroke="url(#ring-stroke-jsx)" strokeWidth="1.5" strokeDasharray="70 300" className="ring-spin ring-spin-rev" />
              </svg>

              <div ref={coreRef} className="ps-core" style={S.core}>
                <div className="ps-orb" style={S.orb}>
                  <div style={{ position: 'absolute', top: '12%', left: '18%', width: '30%', height: '22%', background: 'radial-gradient(ellipse,rgba(255,255,255,.85),transparent 70%)', borderRadius: '50%', filter: 'blur(2px)' }} />
                </div>
                <div className="ps-core-text">
                  <h3 className="ps-core-title font-bold md:font-normal" style={S.coreTitle}>Real Patients,<br />Real Stories.</h3>
                  <p className="ps-core-sub hidden md:block" style={S.coreSub}>Guided by specialist doctors, supported by counsellors, and powered by personalised, evidence-based care.</p>
                </div>
              </div>

              {CARDS.map((c, i) => (
                <article
                  key={c.name}
                  ref={el => cardRefs.current[i] = el}
                  className="ps-card"
                  style={{ ...S.card, left: '50%', top: '50%', opacity: 0, transform: 'translate(-50%,-50%) scale(0.5)' }}
                >
                  <img src={c.img} alt={c.name} loading="lazy" style={S.cardImg} onError={e => { e.target.src = `https://picsum.photos/seed/${c.name}/500/500`; }} />
                  <div className="ps-card-meta" style={S.cardMeta}>
                    <div className="ps-card-name" style={S.cardName}>{c.name} <span style={S.nameAge}>({c.age}yrs)</span></div>
                    <div className="ps-hba1c" style={S.hba1c}>
                      <span className="ps-lab" style={S.lab}>HBA1C</span>
                      <span className="ps-from-val" style={S.fromVal}>{c.from}</span>
                      <span className="ps-arr" style={S.arr}>→</span>
                      <span className="ps-to-val" style={S.toVal}>{c.to}</span>
                    </div>
                  </div>
                </article>
              ))}

              <div ref={hintRef} style={S.hint}>
                <span>Scroll to reveal</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'hint-bounce 1.8s ease-in-out infinite' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* <div ref={ratingRef} style={{ textAlign: 'center', opacity: 0 }}>
              <a href="https://share.google/dmePZokGio3TfWQHF" target="_blank" rel="noopener noreferrer" style={S.pill}>
                <span style={S.gIcon}>G</span>
                <span style={S.pillText}>4.8 / 5 on Google · 1,000+ Reviews</span>
              </a>
            </div> */}

          </div>
        </div>
      </section>
    </>
  );
}

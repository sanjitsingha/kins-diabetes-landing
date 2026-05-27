"use client";

/**
 * Kins Diabetes — Diabetes Counselling Landing Page
 * Converted from dummy-lp.php → Next.js (App Router) + Tailwind CSS
 *
 * USAGE:
 *   • Place this file at:  app/diabetes-counselling-siliguri/page.jsx
 *   • Install fonts in layout.jsx or globals.css:
 *       @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
 *   • tailwind.config.js — add DM Sans + DM Serif Display to fontFamily
 *   • All /images/... paths are relative to /public/
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";

// ─────────────────────────────────────────────────────────────────
// 1. GLOBAL STYLES  (keyframes that Tailwind can't express inline)
// ─────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes pulse-dot  { 0%,100%{box-shadow:0 0 0 4px rgba(255,255,255,.2)} 50%{box-shadow:0 0 0 8px rgba(255,255,255,.1)} }
  @keyframes orb-spin   { to { transform:rotate(360deg); } }
  @keyframes ring-rot   { to { transform:rotate(360deg); } }
  @keyframes ring-rev   { to { transform:rotate(-360deg); } }
  @keyframes hint-bounce{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

  .ring-spin     { transform-origin:400px 400px; animation:ring-rot 22s linear infinite; }
  .ring-spin-rev { transform-origin:400px 400px; animation:ring-rev 30s linear infinite; }
  .orb-spin      { animation:orb-spin 12s linear infinite; }
  .bento-dot     { animation:pulse-dot 2s infinite; }
  .hint-bounce   { animation:hint-bounce 1.8s ease-in-out infinite; }

  /* Horizontal scroller */
  .h-scroll{
    display:flex; gap:18px;
    overflow-x:auto; overflow-y:hidden;
    scroll-snap-type:x mandatory;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:none; -ms-overflow-style:none;
    padding:8px 28px 28px; margin:0 -28px;
  }
  .h-scroll::-webkit-scrollbar { display:none; }
  .h-scroll > * { flex:0 0 calc(33% - 12px); scroll-snap-align:start; min-width:220px; }
  @media(max-width:768px){ .h-scroll > * { flex:0 0 calc(66% - 12px); } }

  /* Doctor flip */
  .doc-flip-inner { transform-style:preserve-3d; transition:transform .7s cubic-bezier(.4,0,.2,1); }
  .doc-flip.flipped .doc-flip-inner { transform:rotateY(180deg); }
  .doc-face       { -webkit-backface-visibility:hidden; backface-visibility:hidden; }
  .doc-back-face  { transform:rotateY(180deg); }
  @media(hover:hover){ .doc-flip:hover .doc-flip-inner { transform:rotateY(180deg); } }

  /* Journey sticky visual */
  .jv-slide { position:absolute; inset:0; opacity:0; transition:opacity .6s ease; pointer-events:none; display:flex; flex-direction:column; }
  .jv-slide.is-active { opacity:1; pointer-events:auto; }

  /* FAQ body */
  .faq-body { max-height:0; overflow:hidden; opacity:0; transition:max-height .3s cubic-bezier(.4,0,.2,1), opacity .24s ease .06s, padding .3s ease; }
  .faq-open .faq-body { opacity:1; }
`;

// ─────────────────────────────────────────────────────────────────
// 2. TINY SVG <Icon> HELPER
// ─────────────────────────────────────────────────────────────────
const ICON_PATHS = {
  check:       { d: "M20 6 9 17 4 12", tag:"polyline", fill:"none", sw:3 },
  x:           { multi:[["line","x1=18 y1=6 x2=6 y2=18"],["line","x1=6 y1=6 x2=18 y2=18"]], fill:"none", sw:2.5 },
  phone:       { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 14 14 0 00.72 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 14 14 0 002.81.72A2 2 0 0122 16.92z", fill:"none", sw:2 },
  arrowRight:  { multi:[["line","x1=5 y1=12 x2=19 y2=12"],["polyline","points=12 5 19 12 12 19"]], fill:"none", sw:2 },
  lock:        { multi:[["rect","x=3 y=11 width=18 height=11 rx=2"],["path","d=M7 11V7a5 5 0 0110 0v4"]], fill:"none", sw:2 },
  clock:       { multi:[["circle","cx=12 cy=12 r=10"],["polyline","points=12 6 12 12 16 14"]], fill:"none", sw:2 },
  award:       { multi:[["circle","cx=12 cy=8 r=7"],["polyline","points=8.21 13.89 7 23 12 20 17 23 15.79 13.88"]], fill:"none", sw:2 },
  pin:         { multi:[["path","d=M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"],["circle","cx=12 cy=10 r=3"]], fill:"none", sw:2 },
  mail:        { multi:[["path","d=M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"],["polyline","points=22,6 12,13 2,6"]], fill:"none", sw:2 },
  chat:        { d: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z", fill:"none", sw:2 },
  trendUp:     { multi:[["polyline","points=23 18 13.5 8.5 8.5 13.5 1 6"],["polyline","points=17 18 23 18 23 12"]], fill:"none", sw:2 },
  flask:       { multi:[["path","d=M10 2v6L4 18a3 3 0 003 4h10a3 3 0 003-4l-6-10V2"],["line","x1=9 y1=2 x2=15 y2=2"],["line","x1=7 y1=14 x2=17 y2=14"]], fill:"none", sw:2 },
  heartPulse:  { multi:[["path","d=M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 000-7.78z"],["polyline","points=3.5 12 6 12 8 9 11 15 13 11 16 13 18 13"]], fill:"none", sw:2 },
  eye:         { multi:[["path","d=M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"],["circle","cx=12 cy=12 r=3"]], fill:"none", sw:2 },
  stethoscope: { multi:[["path","d=M11 2v2"],["path","d=M5 2v2"],["path","d=M5 3v4a3 3 0 006 0V3"],["path","d=M8 10v5a6 6 0 006 6v0a6 6 0 006-6v-2"],["circle","cx=20 cy=11 r=2"]], fill:"none", sw:2 },
  leaf:        { multi:[["path","d=M11 20A7 7 0 014 13c0-2.41 1.21-4.61 3-6 3.5-2.5 6-2 9-2 0 5-1 8-4 11a7 7 0 01-1 4z"],["path","d=M2 22c5-4 8-7 11-15"]], fill:"none", sw:2 },
  foot:        { multi:[["path","d=M12 22c4-1 5-4 5-7 0-3-2-5-2-8 0-2-1-5-3-5s-3 2-3 4-1 4-2 5c-1 2-2 4-2 6 0 3 3 4 7 5z"],["circle","cx=9 cy=6 r=1"],["circle","cx=7 cy=9 r=0.7"],["circle","cx=6 cy=12 r=0.7"]], fill:"none", sw:2 },
  monitor:     { multi:[["rect","x=2 y=3 width=20 height=14 rx=2 ry=2"],["line","x1=8 y1=21 x2=16 y2=21"],["line","x1=12 y1=17 x2=12 y2=21"],["polyline","points=6 10 9 7 12 11 16 8 18 10"]], fill:"none", sw:2 },
  book:        { multi:[["path","d=M4 19.5A2.5 2.5 0 016.5 17H20"],["path","d=M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"]], fill:"none", sw:2 },
  msgSquare:   { d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", fill:"none", sw:2 },
  clipboard:   { multi:[["path","d=M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"],["rect","x=8 y=2 width=8 height=4 rx=1 ry=1"],["line","x1=8 y1=12 x2=16 y2=12"],["line","x1=8 y1=16 x2=13 y2=16"]], fill:"none", sw:2 },
  alert:       { multi:[["circle","cx=12 cy=12 r=10"],["line","x1=12 y1=8 x2=12 y2=12"],["line","x1=12 y1=16 x2=12.01 y2=16"]], fill:"none", sw:2 },
  help:        { multi:[["circle","cx=12 cy=12 r=10"],["path","d=M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"],["line","x1=12 y1=17 x2=12.01 y2=17"]], fill:"none", sw:2 },
  confused:    { multi:[["circle","cx=12 cy=12 r=10"],["line","x1=9 y1=9 x2=9.01 y2=9"],["line","x1=15 y1=9 x2=15.01 y2=9"],["path","d=M16 16s-1.5-2-4-2-4 2-4 2"]], fill:"none", sw:2 },
  shield:      { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", fill:"none", sw:2 },
  zap:         { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", fill:"none", sw:2 },
  tired:       { multi:[["circle","cx=12 cy=12 r=10"],["path","d=M15.5 9.5l-3 0M11 9.5l-3 0"],["line","x1=8 y1=15 x2=16 y2=15"]], fill:"none", sw:2 },
  drop:        { d: "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z", fill:"none", sw:2 },
  pill:        { multi:[["path","d=M10.5 20.5L20.5 10.5a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z"],["line","x1=8.5 y1=8.5 x2=15.5 y2=15.5"]], fill:"none", sw:2 },
  family:      { multi:[["circle","cx=9 cy=7 r=4"],["path","d=M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"],["circle","cx=17 cy=9 r=3"],["path","d=M21 21v-1a3 3 0 00-3-3h-1"]], fill:"none", sw:2 },
  plus:        { multi:[["line","x1=12 y1=5 x2=12 y2=19"],["line","x1=5 y1=12 x2=19 y2=12"]], fill:"none", sw:2.5 },
  play:        { tag:"polygon", d:"points=6 4 20 12 6 20 6 4", fill:"currentColor", sw:0 },
  star:        { tag:"polygon", d:"points=12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2", fill:"currentColor", sw:0 },
  package:     { multi:[["path","d=M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"],["polyline","points=3.27 6.96 12 12.01 20.73 6.96"],["line","x1=12 y1=22.08 x2=12 y2=12"]], fill:"none", sw:2 },
  target:      { multi:[["circle","cx=12 cy=12 r=10"],["circle","cx=12 cy=12 r=6"],["circle","cx=12 cy=12 r=2"]], fill:"none", sw:2 },
  crown:       { multi:[["path","d=M2 4l3 12h14l3-12-6 7-4-9-4 9-6-7z"],["line","x1=5 y1=20 x2=19 y2=20"]], fill:"none", sw:2 },
  gem:         { multi:[["polygon","points=6 3 18 3 22 9 12 22 2 9"],["polyline","points=6 3 9 9 15 9 18 3"],["line","x1=2 y1=9 x2=22 y2=9"]], fill:"none", sw:2 },
};

function Icon({ name, size = 20, className = "", strokeWidth }) {
  const cfg = ICON_PATHS[name] || {};
  const sw  = strokeWidth ?? cfg.sw ?? 2;
  const vb  = "0 0 24 24";
  const shared = { width:size, height:size, viewBox:vb, className, strokeLinecap:"round", strokeLinejoin:"round", strokeWidth:sw };

  if (cfg.tag === "polygon" || cfg.tag === "polyline") {
    return (
      <svg {...shared} fill={cfg.fill ?? "none"} stroke={sw ? "currentColor":"none"}>
        <polygon points={cfg.d || cfg.tag === "polyline" ? undefined : cfg.d} />
      </svg>
    );
  }
  if (cfg.tag === "polyline") return <svg {...shared} fill="none" stroke="currentColor"><polyline points={cfg.d} /></svg>;

  if (cfg.multi) {
    return (
      <svg {...shared} fill={cfg.fill ?? "none"} stroke="currentColor">
        {cfg.multi.map(([tag, attrs], i) => {
          const props = {};
          attrs.split(" ").forEach(a => { const [k,v]=a.split("="); if(k)props[k]=v; });
          const Tag = tag;
          return <Tag key={i} {...props} />;
        })}
      </svg>
    );
  }
  return (
    <svg {...shared} fill={cfg.fill ?? "none"} stroke="currentColor">
      {cfg.tag === "polygon"
        ? <polygon points={cfg.d} />
        : <path d={cfg.d} />}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// 3. EYEBROW LABEL  (reused across sections)
// ─────────────────────────────────────────────────────────────────
function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.14em] uppercase text-[#12a4dd] before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded-sm">
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// 4. SECTION HEADER
// ─────────────────────────────────────────────────────────────────
function SectionHead({ eyebrow, title, body, center = true }) {
  return (
    <div className={`max-w-[760px] mb-14 ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="mb-[18px]"><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] text-[#0d1b2a] leading-[1.12] tracking-[-0.01em]">{title}</h2>
      {body && <p className="text-[#5a7184] mt-4 text-[1.05rem]">{body}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 5. PROBLEM CARD
// ─────────────────────────────────────────────────────────────────
const PROBLEM_TONES = {
  a:{ bg:"from-[#ffe1e6] to-[#fdb6c0]", fg:"#d62042" },
  b:{ bg:"from-[#d6f0fb] to-[#9ed8f0]", fg:"#0b7aaa" },
  c:{ bg:"from-[#fef3c7] to-[#fcd9a0]", fg:"#b25a13" },
  d:{ bg:"from-[#fde8eb] to-[#f7a5b1]", fg:"#ec1c36" },
  e:{ bg:"from-[#e5e9f3] to-[#b4c0dc]", fg:"#41527e" },
  f:{ bg:"from-[#f0e7fa] to-[#d4c0ee]", fg:"#6b4ca8" },
  g:{ bg:"from-[#d9f5e7] to-[#9ad8b8]", fg:"#1f7a4f" },
};
function ProblemCard({ tone, icon, title, body }) {
  const t = PROBLEM_TONES[tone];
  return (
    <div className="flex flex-col min-h-[380px] bg-white border border-[#c8dde8] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(11,122,170,.18)] transition-all duration-200">
      <div className={`relative h-[180px] bg-gradient-to-br ${t.bg} flex items-center justify-center overflow-hidden`} style={{color:t.fg}}>
        <div className="absolute inset-0" style={{background:"radial-gradient(circle at 80% 20%,rgba(255,255,255,.5),transparent 50%),radial-gradient(circle at 20% 80%,rgba(255,255,255,.3),transparent 45%)"}} />
        <Icon name={icon} size={120} className="opacity-[.28] -rotate-[8deg]" strokeWidth={1.4} />
      </div>
      <div className="relative pt-[44px] px-6 pb-6 flex-1 flex flex-col">
        <div className="absolute top-[-28px] left-[22px] w-14 h-14 bg-white border border-[#c8dde8] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(13,27,42,.18)]" style={{color:"#ec1c36"}}>
          <Icon name={icon} size={26} />
        </div>
        <h3 className="font-serif text-[1.25rem] text-[#0d1b2a] mb-2 leading-[1.25]">{title}</h3>
        <p className="text-[#5a7184] text-[.95rem] leading-[1.55]">{body}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 6. STEP CARD (Patient Journey)
// ─────────────────────────────────────────────────────────────────
function StepCard({ num, time, icon, title, body, bullets, dataStep, onVisible }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) onVisible?.(dataStep); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [dataStep, onVisible]);

  return (
    <div ref={ref} data-step={dataStep}
      className="bg-white border border-[#c8dde8] rounded-xl p-9 flex flex-col justify-center gap-0 min-h-[540px] hover:-translate-y-[3px] hover:border-[#d6f0fb] hover:shadow-[0_8px_24px_-8px_rgba(11,122,170,.18)] transition-all duration-200">
      <div className="flex items-center justify-between mb-[22px]">
        <div className="w-[60px] h-[60px] rounded-2xl bg-[#f0f9fe] text-[#12a4dd] flex items-center justify-center">
          <Icon name={icon} size={30} />
        </div>
        <span className="font-serif text-[4rem] text-[#d6f0fb] leading-none">{num}</span>
      </div>
      <span className="inline-block bg-[#f0f9fe] text-[#0b7aaa] text-[11px] font-semibold tracking-[.04em] px-3 py-1 rounded-full mb-2.5 w-fit">{time}</span>
      <h3 className="font-serif text-[1.85rem] text-[#0d1b2a] mb-3 leading-[1.15] tracking-[-0.01em]">{title}</h3>
      <p className="text-[#5a7184] text-[1.02rem] leading-[1.6] mb-6">{body}</p>
      <ul className="grid gap-3">
        {bullets.map((b, i) => (
          <li key={i} className="grid gap-3 items-start text-[.96rem] text-[#1e2d3d] leading-[1.45]"
            style={{gridTemplateColumns:"22px 1fr"}}>
            <span className="w-[22px] h-[22px] bg-[#f0f9fe] text-[#12a4dd] rounded-full flex items-center justify-center p-1 mt-0.5 flex-shrink-0">
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 7. BENTO CARD
// ─────────────────────────────────────────────────────────────────
function BentoCard({ tone="white", icon, title, body, badge, className="" }) {
  const toneMap = {
    white:  "bg-white border-[#c8dde8]",
    amber:  "bg-gradient-to-b from-[#fef9eb] to-[#fef3c7] border-[#fde9a6]",
    mint:   "bg-gradient-to-b from-[#eefaf3] to-[#d9f5e7] border-[#b6e7cc]",
    rose:   "bg-gradient-to-b from-[#fef0f2] to-[#fde8eb] border-[#fac4ce]",
    dark:   "bg-gradient-to-b from-[#1a3a52] to-[#0d1b2a] border-[#234862]",
  };
  const iconMap = {
    white:"bg-[#f0f9fe] text-[#12a4dd]", amber:"bg-white/70 text-[#b25a13]",
    mint:"bg-white/70 text-[#1f7a4f]",  rose:"bg-white/70 text-[#ec1c36]",
    dark:"bg-white/[.12] text-[#12a4dd]",
  };
  const textColor  = tone==="dark" ? "text-white" : "text-[#0d1b2a]";
  const descColor  = tone==="dark" ? "text-white/70" : "text-[#5a7184]";

  return (
    <div className={`relative flex flex-col p-6 rounded-[18px] border overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_8px_24px_-8px_rgba(11,122,170,.18)] transition-all duration-200 ${toneMap[tone]} ${className}`}>
      {badge && (
        <span className="absolute top-4 right-4 bg-[#ec1c36] text-white text-[9.5px] font-bold tracking-[.12em] px-2.5 py-0.5 rounded-full">{badge}</span>
      )}
      {icon && (
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 ${iconMap[tone]}`}>
          <Icon name={icon} size={22} />
        </div>
      )}
      <h3 className={`font-serif text-[1.2rem] leading-[1.2] mb-1.5 ${textColor}`}>{title}</h3>
      <p className={`text-[.92rem] leading-[1.5] flex-1 ${descColor}`}>{body}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 8. DOCTOR FLIP CARD
// ─────────────────────────────────────────────────────────────────
const DOC_GRADIENTS = {
  a:"from-[#b6e2f5] via-[#5fb4dc] to-[#0b7aaa]",
  b:"from-[#c4d4ec] via-[#7d97c3] to-[#41527e]",
  c:"from-[#fcdfa0] via-[#e3a548] to-[#b25a13]",
  d:"from-[#b1e0c6] via-[#5fb188] to-[#1f7a4f]",
  e:"from-[#d4c0ee] via-[#9978ce] to-[#6b4ca8]",
};
function DoctorCard({ name, role, years, tone, img, initials, quals, spec, langs, avail }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`doc-flip relative flex-shrink-0 w-[260px] h-[380px] cursor-pointer outline-none rounded-2xl ${flipped?"flipped":""}`}
      style={{perspective:"1400px"}}
      onClick={() => setFlipped(f => !f)}
      tabIndex={0}
      onKeyDown={e => (e.key==="Enter"||e.key===" ") && setFlipped(f=>!f)}
    >
      <div className="doc-flip-inner relative w-full h-full">
        {/* FRONT */}
        <div className="doc-face absolute inset-0 rounded-2xl overflow-hidden border border-[#c8dde8] shadow-sm bg-white">
          <div className={`absolute inset-0 bg-gradient-to-b ${DOC_GRADIENTS[tone]} flex items-center justify-center overflow-hidden`}>
            {img
              ? <img src={img} alt={name} className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-300" />
              : <span className="font-serif text-[6rem] text-white/50 leading-none tracking-[-0.04em] drop-shadow-lg mt-[-20px]">{initials}</span>
            }
            <div className="absolute inset-0" style={{background:"radial-gradient(60% 50% at 80% 10%,rgba(255,255,255,.35),transparent 60%),repeating-linear-gradient(135deg,rgba(255,255,255,.04) 0 10px,transparent 10px 20px)"}} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-20 text-white" style={{background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.6) 35%,rgba(0,0,0,.25) 65%,transparent 100%)"}}>
            <span className="inline-block bg-white/[.18] backdrop-blur-sm border border-white/25 text-white text-[11px] font-semibold tracking-[.06em] px-3 py-1 rounded-full mb-3">{years}</span>
            <h3 className="font-serif text-[1.35rem] text-white mb-1 leading-[1.15]">{name}</h3>
            <div className="text-[13px] text-white/90 leading-snug">{role}</div>
          </div>
          <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 text-[#0b7aaa] flex items-center justify-center shadow-md group-hover:rotate-180 transition-transform">
            <Icon name="arrowRight" size={14} />
          </div>
        </div>
        {/* BACK */}
        <div className="doc-face doc-back-face absolute inset-0 rounded-2xl border border-[#c8dde8] p-6 flex flex-col" style={{background:"linear-gradient(170deg,#fff 0%,#f0f9fe 100%)"}}>
          <div className="text-center pb-4 border-b border-[#c8dde8] mb-4">
            <div className="font-serif text-[1.15rem] text-[#0d1b2a] leading-[1.2]">{name}</div>
            <div className="text-[12px] text-[#5a7184] mt-0.5">{role}</div>
          </div>
          <ul className="grid gap-3.5 flex-1 content-center">
            {[["Qualifications",quals],["Specialisation",spec],["Languages",langs],["Available",avail]].map(([lbl,val])=>(
              <li key={lbl}>
                <div className="text-[10px] font-bold tracking-[.1em] uppercase text-[#12a4dd]">{lbl}</div>
                <div className="text-[13px] text-[#1e2d3d] leading-snug mt-0.5">{val}</div>
              </li>
            ))}
          </ul>
          <a href="#book" onClick={e=>e.stopPropagation()} className="mt-4 block text-center bg-[#12a4dd] hover:bg-[#0b7aaa] text-white font-semibold text-sm px-4 py-2.5 rounded-full transition-colors">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 9. FAQ ITEM
// ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  return (
    <div className="bg-white border border-[#c8dde8] rounded-xl overflow-hidden">
      <button
        className="w-full text-left px-[26px] py-[22px] flex items-center justify-between gap-4 font-semibold text-[1.05rem] text-[#1e2d3d] font-sans"
        onClick={() => setOpen(o=>!o)}
      >
        <span>{q}</span>
        <span className={`flex-shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 ${open?"rotate-45 bg-[#12a4dd] text-white":"bg-[#f0f9fe] text-[#12a4dd]"}`}>
          <Icon name="plus" size={14} />
        </span>
      </button>
      <div
        ref={bodyRef}
        className="faq-body"
        style={{ maxHeight: open ? (bodyRef.current?.scrollHeight??500)+"px" : "0px", padding: open ? "0 26px 22px" : "0 26px" }}
      >
        <p className="text-[#5a7184] text-[.98rem] leading-[1.65]">{a}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 10. PACKAGE CARD
// ─────────────────────────────────────────────────────────────────
function PkgCard({ icon, title, desc, items, moreSuffix, btnLabel="Know More", btnCls, featured, cardCls, iconBgCls, btnAction="#book" }) {
  return (
    <div className={`relative flex-shrink-0 w-[260px] flex flex-col p-7 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${cardCls || "bg-white border-[#c8dde8]"}`}>
      {featured && (
        <div className="absolute -top-3 right-4 bg-[#ec1c36] text-white text-[10px] font-bold tracking-[.08em] uppercase px-2.5 py-1 rounded-full">Most Popular</div>
      )}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${iconBgCls || "bg-[#f0f9fe] text-[#12a4dd]"}`}>
        <Icon name={icon} size={22} />
      </div>
      <h3 className="font-serif text-[1.3rem] font-normal text-[#0d1b2a] mb-1.5">{title}</h3>
      <p className="text-[13px] text-[#5a7184] min-h-[38px] leading-[1.45] mb-5">{desc}</p>
      {items && (
        <ul className="flex-1 space-y-2.5">
          {items.map((item,i)=>(
            <li key={i} className="flex items-center gap-2 text-sm text-[#1e2d3d]">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgCls || "bg-[#f0f9fe]"}`}>
                <Icon name="check" size={10} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
          {moreSuffix && <li className="text-sm text-[#12a4dd] underline mt-1">{moreSuffix}</li>}
        </ul>
      )}
      <a href={btnAction} className={`mt-8 block text-center font-bold text-sm px-5 py-2.5 rounded-full transition-colors ${btnCls || "border border-[#c8dde8] text-[#12a4dd] hover:bg-[#f0f9fe] hover:border-[#12a4dd]"}`}>
        {btnLabel} →
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 11. CONSTELLATION STORY CARD
// ─────────────────────────────────────────────────────────────────
const SC_TONES = {
  warm:  "from-[#f5d6b5] via-[#d99a6a] to-[#6a3f24]",
  green: "from-[#b8e8c4] via-[#5db378] to-[#1f5f3a]",
  amber: "from-[#f7e0a8] via-[#cfa55a] to-[#6d4d18]",
  violet:"from-[#d4c0ee] via-[#8e6dc6] to-[#43287e]",
  blue:  "from-[#b6d8f0] via-[#5183b8] to-[#1a3a52]",
  rose:  "from-[#f3b8c4] via-[#c66c80] to-[#6e2638]",
  teal:  "from-[#a8d8d6] via-[#4d8a87] to-[#1c3a38]",
  dark:  "from-[#6d7a8c] via-[#3a4654] to-[#1a2230]",
};
function StoryCard({ initials, name, age, tone, hbaFrom, hbaTo, style, idx }) {
  return (
    <div
      className="absolute w-[220px] h-[250px] rounded-[18px] overflow-hidden border-4 border-white shadow-[0_16px_36px_-10px_rgba(13,27,42,.22),0_6px_14px_-6px_rgba(13,27,42,.14)]"
      style={{...style, zIndex:10+idx, transform:"translate(-50%,-50%)"}}
    >
      <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-b ${SC_TONES[tone]}`}>
        <div className="absolute inset-0" style={{background:"radial-gradient(55% 45% at 70% 20%,rgba(255,255,255,.3),transparent 70%),repeating-linear-gradient(135deg,rgba(255,255,255,.04) 0 8px,transparent 8px 16px)"}} />
        <span className="relative font-serif text-[4.4rem] text-white/45 leading-none mt-[-30px] tracking-[-0.04em]">{initials}</span>
        <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3 pt-9 text-white" style={{background:"linear-gradient(to top,rgba(0,0,0,.92) 30%,rgba(0,0,0,.7) 65%,transparent 100%)"}}>
          <div className="text-[13.5px] font-bold mb-1">{name} <span className="font-normal text-white/78 text-xs">({age}yrs)</span></div>
          <div className="flex items-baseline gap-1.5 font-serif">
            <span className="font-sans text-[9px] font-bold tracking-widest uppercase bg-white/[.15] px-1.5 py-0.5 rounded text-white/80 self-center">HBA1C</span>
            <span className="text-[1.9rem] text-[#ff8a9a]">{hbaFrom}</span>
            <span className="text-white/80 text-lg">→</span>
            <span className="text-[1.9rem] text-[#8fec9a]">{hbaTo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 12. FORM FIELD HELPERS
// ─────────────────────────────────────────────────────────────────
const INPUT_CLS = "w-full px-3.5 py-3.5 border-[1.5px] border-[#c8dde8] rounded-lg font-sans text-[15px] text-[#1e2d3d] bg-white transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-[#12a4dd] focus:ring-[3px] focus:ring-[rgba(18,164,221,.15)] appearance-none";

// ─────────────────────────────────────────────────────────────────
// 13. DATA
// ─────────────────────────────────────────────────────────────────
const PROBLEMS = [
  { tone:"a", icon:"trendUp",  title:"Sugar levels stay high",        body:"Even after medicines, your HbA1c just doesn't come down." },
  { tone:"b", icon:"help",     title:"Don't know which tests to do",  body:"Confused about what to check and how often." },
  { tone:"c", icon:"tired",    title:"Feeling tired, weak or unwell", body:"Constant fatigue, frequent urination, or blurred vision." },
  { tone:"d", icon:"alert",    title:"Worried about complications",   body:"Fear of kidney, eye, heart or foot damage from diabetes." },
  { tone:"e", icon:"pill",     title:"Only medicines, no guidance",   body:"Doctors prescribe but never explain what is actually happening." },
  { tone:"f", icon:"confused", title:"Newly diagnosed and confused",  body:"Just found out you have diabetes and don't know where to start." },
  { tone:"g", icon:"shield",   title:"Want to prevent it",            body:"Family history of diabetes — you want to act before it starts." },
];

const JOURNEY_SLIDES = [
  { step:"1", tone:"a", label:"Personalised counselling",          img:"/images/landing-page/patient-journey/step-01.webp" },
  { step:"2", tone:"b", label:"Complete diabetes investigations",  img:"/images/landing-page/patient-journey/step-02.webp" },
  { step:"3", tone:"c", label:"Lifestyle modification session",    img:"/images/landing-page/patient-journey/step-03.webp" },
  { step:"4", tone:"d", label:"Expert doctor consultation",        img:"/images/landing-page/patient-journey/step-04.webp" },
  { step:"5", tone:"e", label:"Medication & Continuous Support",   img:"/images/landing-page/patient-journey/step-05.webp" },
];
const JV_TONES = {
  a:"from-[#d6f0fb] to-[#9ed8f0] text-[#0b7aaa]",
  b:"from-[#e8eef9] to-[#b8c8e8] text-[#41527e]",
  c:"from-[#fef3c7] to-[#fcd9a0] text-[#b25a13]",
  d:"from-[#fde8eb] to-[#f7a5b1] text-[#ec1c36]",
  e:"from-[#d9f5e7] to-[#9ad8b8] text-[#1f7a4f]",
};

const STEP_CARDS = [
  { num:"01", dataStep:"1", time:"8:30 AM – 09:30 AM · 1 hour",     icon:"msgSquare",  title:"Personalised counselling",         body:"A dedicated diabetes counsellor sits with you — understanding your history, lifestyle, and health concerns. No rushing. No generic advice.",   bullets:["Full medical & family history review","Lifestyle, diet & activity assessment","Concerns, fears & questions addressed","Personalised care plan designed"] },
  { num:"02", dataStep:"2", time:"09:30 AM – 12:30 PM · 3 hours",   icon:"flask",      title:"Complete diabetes investigations",  body:"All your diabetes-related blood tests done in our NABL-certified lab — fast, accurate, and reviewed by experts.",                              bullets:["HbA1c & blood sugar profile","Lipid & cholesterol panel","Kidney & liver function tests","Same-day report turnaround"] },
  { num:"03", dataStep:"3", time:"11:00 AM – 12:00 PM · 1 hour",    icon:"book",       title:"Lifestyle modification session",    body:"Understand exactly how your body works — knowledge that empowers real, lasting change in your daily life.",                                 bullets:["How food affects your sugar","Stress, sleep & blood glucose","The role of physical activity","Reading your own lab reports"] },
  { num:"04", dataStep:"4", time:"1:30 PM – 3:00 PM · 1.5 hours",   icon:"stethoscope",title:"Expert doctor consultation",        body:"A specialist diabetologist reviews every report with you and designs a treatment plan built for your specific case — not a generic one.",     bullets:["Detailed report-by-report walkthrough","Custom medication plan & dosing","Risk assessment & complication check","Every question answered"] },
  { num:"05", dataStep:"5", time:"3:00 PM – 4:00 PM · 1 hour",      icon:"clipboard",  title:"Medication & Continuous Support",  body:"Your complete diabetes plan — written, explained and yours to keep forever.",                                                              bullets:["Written medication schedule","Customised diet chart","Daily activity & monitoring plan","Follow-up schedule with your doctor"] },
];

const COMPARE_ROWS = [
  { feat:"Complete care in one visit",           kins:"Done in 7 hours",          other:"Multiple visits needed" },
  { feat:"Dedicated diabetes counsellor",        kins:"1-on-1 personal session",  other:"Rarely available" },
  { feat:"NABH accreditation",                   kins:"North Bengal's only",       other:"Not accredited" },
  { feat:"In-house NABL lab",                    kins:"Certified, fast reports",   other:"Sent to outside labs" },
  { feat:"CGM device available",                 kins:"Available in-house",        other:"Not available" },
  { feat:"Personalised diet plan",               kins:"Customised same day",       other:"Generic printed sheet" },
  { feat:"Diabetes education session",           kins:"Every patient, every visit",other:"Not offered" },
  { feat:"Retina & foot screening",              kins:"Done in-house",             other:"Referred elsewhere" },
  { feat:"Lifestyle modification programme",     kins:"Structured programme",      other:"Not available" },
];

const DOCTORS = [
  { name:"Dr. Sekhar Chakraborty", role:"Senior Consultant · Diabetologist",  years:"25+ Years",                  tone:"a", img:"/images/landing-page/doctors/dr-sekhar-web.webp",   quals:"MBBS, MD",           spec:"Type 1 & 2 Diabetes, Endocrine disorders",    langs:"English, Bengali, Hindi", avail:"Mon – Sat · 10:00 AM – 5:00 PM" },
  { name:"Dr. Hironmay Paul",      role:"Senior Consultant · Diabetologist",  years:"35+ Years",                  tone:"b", img:"/images/landing-page/doctors/dr-paul-web.webp",      quals:"MBBS, MD",           spec:"Diabetes management, Lifestyle disorders",    langs:"English, Bengali, Hindi", avail:"Mon – Sat · 11:00 AM – 4:00 PM" },
  { name:"Dr. Subhodip Pramanik",  role:"Consultant · Endocrinology",         years:"14+ Years · Endocrinologist",tone:"d", img:"/images/landing-page/doctors/dr-pramanik-web.webp",  quals:"MBBS, MD, DM (Endo)",spec:"Thyroid, Diabetes, Hormonal disorders",       langs:"English, Bengali, Hindi", avail:"Mon – Fri · 2:30 – 5:30 PM" },
  { name:"Dr. R K Saraogi",        role:"Consultant · Endocrinology",         years:"20+ Years · Endocrinologist",tone:"e", img:"/images/landing-page/doctors/dr-ravikant-web.webp",  quals:"MBBS, MD, DM (Endo)",spec:"Complex diabetes, Hormonal therapy",          langs:"English, Hindi, Bengali", avail:"Mon – Sat · 10:00 AM – 4:00 PM" },
];

const STORY_CARDS = [
  { initials:"SM", name:"Subhash M",   age:54, tone:"warm",   hbaFrom:"9.2",  hbaTo:"6.4", style:{left:"14%",top:"24%"} },
  { initials:"PK", name:"Pradeep K",   age:58, tone:"amber",  hbaFrom:"10.5", hbaTo:"6.8", style:{left:"86%",top:"22%"} },
  { initials:"MD", name:"Mira D",      age:62, tone:"violet", hbaFrom:"8.9",  hbaTo:"5.9", style:{left:"8%", top:"52%"} },
  { initials:"RJ", name:"Raymond J",   age:48, tone:"blue",   hbaFrom:"8.2",  hbaTo:"7.0", style:{left:"90%",top:"52%"} },
  { initials:"KB", name:"Kanchana B",  age:48, tone:"rose",   hbaFrom:"8.5",  hbaTo:"6.7", style:{left:"18%",top:"78%"} },
  { initials:"RB", name:"Rajni B",     age:61, tone:"dark",   hbaFrom:"11.3", hbaTo:"5.9", style:{left:"82%",top:"80%"} },
];

const FAQS = [
  { q:"Can diabetes be cured?",                                              a:"Diabetes cannot be cured, but it can be very effectively managed. With the right counselling, diet, lifestyle changes, and medical guidance, many of our patients have significantly reduced their medication dependency and live complication-free lives." },
  { q:"Do I need to come fasting?",                                         a:"Yes. For accurate blood sugar and HbA1c testing, please come after an 8–10 hour fast. Our team will guide you on full preparation when they call to confirm your appointment." },
  { q:"How long does one complete visit take?",                             a:"A full visit at Kins Diabetes takes approximately 7 hours — from your first counselling session through to doctor consultation and your personal plan. Everything is done in one day. You leave with complete clarity." },
  { q:"Is Kins Diabetes only for people who already have diabetes?",        a:"Not at all. We also help people with pre-diabetes, those with a strong family history of diabetes, and anyone who wants a preventive diabetes screening. Early detection changes everything." },
  { q:"What will the cost be?",                                             a:"We offer multiple health check-up profiles at different price points depending on your specific needs. Our team will explain all options clearly when they call — no hidden costs, no pressure." },
  { q:"Can I bring a family member with me?",                               a:"Absolutely. We encourage family members to come along. Understanding diabetes together leads to much better lifestyle support at home." },
  { q:"Do I need an appointment or can I walk in?",                         a:"We strongly recommend booking in advance so our counsellors can be fully prepared for your visit and minimise your waiting time. Use the form on this page or call us directly on +91 97337 85000." },
];

// ─────────────────────────────────────────────────────────────────
// 14. MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function DiabetesCounsellingPage() {
  const [activeStep, setActiveStep] = useState("1");
  const [form, setForm]  = useState({ name:"", phone:"", city:"", duration:"", help:"" });
  const [sent, setSent]  = useState(false);

  const onStepVisible = useCallback((s) => setActiveStep(s), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:"",phone:"",city:"",duration:"",help:"" }); }, 3200);
  };

  // ── render ──────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Kins Diabetes — North Bengal&apos;s Most Trusted Diabetes Centre</title>
        <meta name="title"       content="best diabetes clinic in siliguri" />
        <meta name="description" content="Complete diabetes care in one visit at North Bengal's only NABH-accredited diabetes centre. Tests, counselling, diet plan and doctor consultation under one roof in Siliguri." />
        <meta name="viewport"    content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      </Head>

      <style>{GLOBAL_CSS}</style>

      <div className="bg-white text-[#1e2d3d] [font-family:'DM_Sans',system-ui,sans-serif] [-webkit-font-smoothing:antialiased]">

        {/* ═══════════════════════════════════════════════════════
            SECTION 1 — STICKY HEADER
        ════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-[100] bg-white/94 backdrop-saturate-180 backdrop-blur-md border-b border-[#c8dde8]">
          <div className="max-w-[1200px] mx-auto px-7 h-[76px] flex items-center justify-between gap-4">
            <a href="#top" aria-label="Kins Diabetes home" className="h-[42px] flex-shrink-0">
              <img src="/images/landing-page/kins-logo.webp" alt="Kins Diabetes — The Sugar Experts" className="h-full w-auto" />
            </a>
            <div className="hidden md:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f0f9fe] border border-[#d6f0fb] text-[#0b7aaa] font-medium text-[13px]">
              <span className="w-2 h-2 rounded-full bg-[#12a4dd] shadow-[0_0_0_4px_rgba(18,164,221,.15)]" />
              North Bengal&apos;s only NABH diabetes centre
            </div>
            <div className="flex items-center gap-3.5">
              <a href="tel:+919733785000" className="hidden sm:inline-flex items-center gap-2 text-[#1e2d3d] font-semibold text-[14px] no-underline">
                <Icon name="phone" size={16} className="text-[#12a4dd]" />
                <span>+91 97337 85000</span>
              </a>
              <a href="#book" className="bg-[#12a4dd] hover:bg-[#0b7aaa] text-white font-semibold text-[15px] px-[26px] py-4 rounded-full transition-all shadow-[0_6px_18px_-6px_rgba(18,164,221,.55)] whitespace-nowrap">
                Book Free Counselling
              </a>
            </div>
          </div>
        </header>

        <main id="top">

          {/* ═══════════════════════════════════════════════════
              SECTION 2 — HERO
          ════════════════════════════════════════════════════ */}
          <section className="pt-10 pb-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-7">
              {/* Hero Card */}
              <div className="grid md:grid-cols-[1.05fr_1fr] rounded-[28px] overflow-hidden border border-[#c8dde8] min-h-[560px]"
                style={{background:"linear-gradient(135deg,#eaf6fc 0%,#f5fbfe 55%,#fef4f5 100%)"}}>
                {/* Left */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-3 items-center mb-7">
                    <img src="/images/landing-page/nabh-logo.webp" alt="NABH Accredited" className="w-[35px] h-auto" />
                    <span className="inline-flex items-center px-4 py-[7px] bg-white border border-[#c8dde8] rounded-full text-[13px] font-medium text-[#1e2d3d]">
                      North Bengal&apos;s only NABH diabetes centre
                    </span>
                  </div>

                  <h1 className="font-serif text-[clamp(2.4rem,4.8vw,3.8rem)] leading-[1.05] text-[#0d1b2a] mb-[22px] tracking-[-0.015em]">
                    Tired<br />of managing diabetes alone?<br />
                    <span className="text-[clamp(1.1rem,2.2vw,1.5rem)] text-[#12a4dd] font-serif">
                      Stop worrying. Start managing — with a real diabetes plan.
                    </span>
                  </h1>

                  <p className="text-[1.05rem] text-[#5a7184] max-w-[480px] mb-9">
                    Get expert care for your diabetes — tests, counselling, diet plan and doctor consultation — all in one day, under one roof in Siliguri.
                  </p>

                  <a href="#book"
                    className="inline-flex items-center gap-2.5 bg-[#12a4dd] hover:bg-[#0b7aaa] text-white font-semibold text-[16px] px-8 py-5 rounded-full w-fit shadow-[0_6px_18px_-6px_rgba(18,164,221,.55)] transition-all">
                    Book My Free Counselling <Icon name="arrowRight" size={16} />
                  </a>
                </div>

                {/* Right — photo */}
                <div className="relative flex items-stretch p-[22px] pl-0">
                  <div className="relative w-full rounded-[22px] overflow-hidden min-h-[460px] md:min-h-0 bg-gradient-to-br from-[#d6f0fb] to-[#eaf6fc] border border-white/60">
                    <img
                      src="/images/landing-page/hero-image-right.webp"
                      alt="Kins Diabetes clinic"
                      className="w-full h-full object-cover object-top grayscale hover:grayscale-0 hover:scale-[1.02] transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center mt-[60px] px-5 gap-y-7">
                {[
                  { label:"Patients Served", num:"50", suf:"k+", accent:"#0d1b2a" },
                  null,
                  { label:"One-Day Care",   num:"7",  suf:"hr",  accent:"#12a4dd" },
                  null,
                  { label:"Years Trusted",  num:"14", suf:"+",   accent:"#0d1b2a" },
                  null,
                  { label:"Google Rated",   num:"4.", suf:"7★",  accent:"#12a4dd" },
                ].map((item, i) =>
                  item === null
                    ? <div key={i} className="hidden md:block w-px h-14 bg-[#c8dde8]" />
                    : (
                      <div key={i} className="text-center py-2 px-3">
                        <div className="text-[14px] text-[#1e2d3d] mb-3.5 tracking-[-0.005em]">
                          {item.label.split(" ").map((w,j)=> j===0
                            ? <span key={j} className="font-normal">{w} </span>
                            : <strong key={j}>{w}</strong>
                          )}
                        </div>
                        <div className="font-sans font-extrabold text-[clamp(2.6rem,5.4vw,4.2rem)] text-[#0d1b2a] leading-none tracking-[-0.04em] inline-flex items-baseline">
                          {item.num}
                          <span style={{color:item.accent}}>{item.suf}</span>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 3 — PROBLEM STATEMENT
          ════════════════════════════════════════════════════ */}
          <section className="py-24 bg-[#fffef7]">
            <div className="max-w-[1200px] mx-auto px-7">
              <SectionHead
                eyebrow="Do you relate to any of these?"
                title="We have helped thousands overcome exactly these struggles."
              />
              <div className="h-scroll">
                {PROBLEMS.map(p => <ProblemCard key={p.title} {...p} />)}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 5 — PATIENT JOURNEY (sticky-scroll)
          ════════════════════════════════════════════════════ */}
          <section className="py-24">
            <div className="max-w-[1200px] mx-auto px-7">
              <SectionHead
                eyebrow="Your Journey Starts Here"
                title="From struggling alone to having a complete plan."
                body="Everything sorted under one roof — in one focused, dedicated day."
              />

              <div className="grid md:grid-cols-[40%_60%] gap-12 items-start">
                {/* LEFT — sticky visual */}
                <div className="hidden md:block sticky top-[110px] h-[540px]">
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden border border-[#c8dde8] shadow-[0_8px_24px_-8px_rgba(11,122,170,.18)] bg-[#f0f9fe]">
                    {JOURNEY_SLIDES.map(slide => (
                      <div key={slide.step} className={`jv-slide ${activeStep===slide.step?"is-active":""}`}>
                        <div className={`flex-1 bg-gradient-to-b ${JV_TONES[slide.tone]} relative flex items-center justify-center overflow-hidden`}>
                          <div className="absolute inset-0" style={{background:"radial-gradient(circle at 80% 20%,rgba(255,255,255,.55),transparent 55%),radial-gradient(circle at 20% 80%,rgba(255,255,255,.35),transparent 50%)"}} />
                          <img src={slide.img} alt={slide.label} className="relative w-full h-full object-cover" />
                        </div>
                        <div className="bg-white/96 backdrop-blur-md px-6 py-5 border-t border-[#c8dde8] flex flex-col gap-1">
                          <span className="text-[11px] font-bold tracking-[.12em] uppercase text-[#12a4dd]">Step {slide.step.padStart(2,"0")}</span>
                          <strong className="font-serif font-normal text-[1.15rem] text-[#0d1b2a] leading-[1.25]">{slide.label}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — scrolling step cards */}
                <div className="flex flex-col gap-8">
                  {STEP_CARDS.map(c => <StepCard key={c.dataStep} {...c} onVisible={onStepVisible} />)}
                </div>
              </div>

              {/* Journey Banner */}
              <div className="mt-10 bg-gradient-to-r from-[#12a4dd] to-[#0b7aaa] text-white px-7 py-5 rounded-xl flex items-center justify-center gap-4 flex-wrap font-medium text-[1.02rem] text-center">
                <Icon name="clock" size={22} className="flex-shrink-0" />
                One complete visit · 7 hours · Everything in one day
                <span className="text-white/45">|</span>
                Monday – Saturday · 8:30 AM – 5:00 PM
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 6 — SERVICES (bento)
          ════════════════════════════════════════════════════ */}
          <section className="py-24 bg-[#f4f8fb]">
            <div className="max-w-[1200px] mx-auto px-7">
              <SectionHead
                eyebrow="Complete Diabetes Solution"
                title="Stop running between clinics — everything you need is right here."
                body="From screening to specialist care, every service you need is available in-house."
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{gridAutoRows:"215px"}}>

                {/* Featured 2×2 */}
                <div className="col-span-2 row-span-2 relative flex flex-col rounded-[18px] border border-[#0b7aaa] overflow-hidden" style={{background:"linear-gradient(160deg,#12a4dd 0%,#0b7aaa 100%)"}}>
                  <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[180px]">
                    <Icon name="stethoscope" size={220} className="opacity-[.18] text-white" strokeWidth={1} />
                    <div className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(255,255,255,.18),transparent 70%)"}} />
                  </div>
                  <div className="px-8 py-7" style={{background:"linear-gradient(to top,rgba(0,0,0,.18),transparent)"}}>
                    <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.12em] uppercase text-white/85 mb-3">
                      <span className="bento-dot w-2 h-2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,.2)]" />
                      Most requested
                    </div>
                    <h3 className="font-serif text-[2rem] text-white mb-3 leading-[1.2]">Doctor&apos;s consultation</h3>
                    <p className="text-white/88 text-[1rem] mb-4">Expert diabetologists and endocrinologists available 6 days a week — every plan personalised to your case.</p>
                    <div className="flex flex-wrap gap-2 text-[13px] font-medium">
                      {["Hassle-free appointments","Specialist diabetologists"].map(t=>(
                        <span key={t} className="inline-flex items-center gap-1.5 bg-white/[.12] px-3 py-1.5 rounded-full">
                          <span className="w-3 h-3 bg-white text-[#0b7aaa] rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name="check" size={8} strokeWidth={3} />
                          </span>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Smaller bento cards */}
                <BentoCard tone="white" icon="flask"       title="Advanced Diagnostics"  body="NABL-certified in-house lab — accurate results, same day, no outside lab needed." />
                <BentoCard tone="amber" icon="msgSquare"   title="Patient counselling"   body="A dedicated counsellor who understands your life — and builds a plan that fits it." />
                <BentoCard tone="mint"  icon="leaf"        title="Diet & nutrition"       body="A diet plan built around your food, your budget and your sugar — not a generic printed chart." />
                <BentoCard tone="white" icon="book"        title="Diabetes education"     body="Understand your diabetes — food, stress and sleep explained." />
                {/* Bottom 4 compact */}
                <BentoCard tone="white" icon="eye"         title="Retina screening"       body="Early detection of diabetic eye complications."                        className="!p-5" />
                <BentoCard tone="white" icon="foot"        title="Diabetic foot care"     body="Specialised foot exam to prevent ulcers and nerve damage."             className="!p-5" />
                <BentoCard tone="rose"  icon="heartPulse"  title="Cardiac care"           body="Heart risk assessment — because sugar affects the heart."              className="!p-5" />
                <BentoCard tone="dark"  icon="monitor"     title="CGM monitoring"         body="Continuous Glucose Monitoring — real-time sugar tracking."             className="!p-5" badge="NEW" />
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 8 — COMPARISON TABLE
          ════════════════════════════════════════════════════ */}
          <section className="py-24">
            <div className="max-w-[1200px] mx-auto px-7">
              <SectionHead
                eyebrow="Why choose us"
                title="Kins Diabetes vs. a regular clinic — the difference is clear."
                body="Most clinics give you a prescription and send you home. We build you a complete system."
              />
              <div className="max-w-[980px] mx-auto bg-white rounded-[22px] overflow-hidden border border-[#c8dde8] shadow-[0_8px_24px_-8px_rgba(11,122,170,.18)]">
                {/* Header Row */}
                <div className="grid border-b border-[#c8dde8]" style={{gridTemplateColumns:"1.2fr 1fr 1fr"}}>
                  <div className="px-5 py-5 font-bold text-[14px]">Feature</div>
                  <div className="px-5 py-5 bg-[#12a4dd] text-white text-center font-bold text-[14px]">
                    Kins Diabetes
                    <span className="block text-[11px] font-medium opacity-85 mt-1 tracking-[.06em] uppercase">NABH · NABL · 14+ Years</span>
                  </div>
                  <div className="px-5 py-5 bg-[#eef2f5] text-[#5a7184] text-center font-bold text-[14px]">Regular Clinic</div>
                </div>
                {COMPARE_ROWS.map(({ feat, kins, other }) => (
                  <div key={feat} className="grid border-b last:border-b-0 border-[#c8dde8]" style={{gridTemplateColumns:"1.2fr 1fr 1fr"}}>
                    <div className="px-5 py-4 font-semibold text-[#1e2d3d] text-[.96rem]">{feat}</div>
                    <div className="px-5 py-4 bg-[#d6f0fb] text-[#0b7aaa] text-[.96rem]">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <Icon name="check" size={18} className="text-[#16a34a] flex-shrink-0" strokeWidth={2.5} /> {kins}
                      </span>
                    </div>
                    <div className="px-5 py-4 bg-[#f4f8fb] text-[#5a7184] text-[.96rem]">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <Icon name="x" size={18} className="text-[#cbd5e1] flex-shrink-0" /> {other}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 9 — DOCTORS
          ════════════════════════════════════════════════════ */}
          <section className="py-24 bg-[#f0f9fe]">
            <div className="max-w-[1200px] mx-auto px-7">
              <SectionHead
                eyebrow="Your care team"
                title="Expert doctors. Real experience. Right here in Siliguri."
                body="Our specialists have dedicated their careers to diabetes — so you get the most informed, experienced guidance possible."
              />
              <div className="h-scroll">
                {DOCTORS.map(d => <DoctorCard key={d.name} {...d} />)}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 10 — PATIENT SUCCESS STORIES
          ════════════════════════════════════════════════════ */}
          <section className="constellation-section py-24" style={{height:"360vh",background:"radial-gradient(50% 60% at 50% 40%,rgba(214,240,251,.45),transparent 70%),#fff",padding:0,position:"relative"}}>
            <div className="constellation-pin sticky top-0 h-screen flex items-center overflow-hidden">
              <div className="container max-w-[1200px] mx-auto px-7 w-full flex flex-col gap-10 py-10">
                <SectionHead
                  eyebrow="Patient stories"
                  title="Real patients. Real results. Real Siliguri."
                  body="People exactly where you are today — and how they found their way forward at Kins Diabetes."
                />

                <div className="constellation relative h-[720px] max-w-[1200px] w-full mx-auto">
                  {/* Decorative rings */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 800" aria-hidden="true">
                    <defs>
                      <linearGradient id="ring-stroke-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%"   stopColor="#12a4dd" stopOpacity="0.35" />
                        <stop offset="50%"  stopColor="#12a4dd" stopOpacity="0" />
                        <stop offset="100%" stopColor="#ec1c36" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <circle cx="400" cy="400" r="180" fill="none" stroke="#e3eff5" strokeWidth="1" />
                    <circle cx="400" cy="400" r="270" fill="none" stroke="#e3eff5" strokeWidth="1" />
                    <circle cx="400" cy="400" r="360" fill="none" stroke="#e3eff5" strokeWidth="1" />
                    <circle cx="400" cy="400" r="180" fill="none" stroke="url(#ring-stroke-grad)" strokeWidth="2" strokeDasharray="60 280" className="ring-spin" />
                    <circle cx="400" cy="400" r="270" fill="none" stroke="url(#ring-stroke-grad)" strokeWidth="2" strokeDasharray="80 320" className="ring-spin ring-spin-rev" />
                  </svg>

                  {/* Centre orb */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[320px] z-10">
                    <div className="orb-spin w-[84px] h-[84px] mx-auto mb-5 rounded-full relative"
                      style={{background:"conic-gradient(from 180deg,#5b3fc4,#7a3fd1,#ce4b8c,#ec5a73,#f1a35e,#5b3fc4)",boxShadow:"0 0 0 1px rgba(255,255,255,.4) inset,0 8px 32px -4px rgba(91,63,196,.45),0 0 60px -10px rgba(236,90,115,.35)"}}>
                      <div className="absolute top-[12%] left-[18%] w-[30%] h-[22%] bg-white/85 rounded-full blur-[2px]" />
                    </div>
                    <h3 className="font-serif text-[2.2rem] text-[#0d1b2a] leading-[1.1] mb-3 tracking-[-0.01em]">Empowering Every Patient</h3>
                    <p className="text-[.94rem] text-[#5a7184] leading-[1.55]">
                      Guided by specialist doctors, supported by counsellors,<br />
                      and powered by personalised, evidence-based care.
                    </p>
                  </div>

                  {/* Story cards */}
                  {STORY_CARDS.map((s, i) => <StoryCard key={s.name} {...s} idx={i} />)}

                  {/* Scroll hint */}
                  <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1.5 text-[11px] font-semibold tracking-[.14em] uppercase text-[#5a7184] pointer-events-none">
                    <span>Scroll to reveal</span>
                    <svg className="hint-bounce w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Google rating */}
                <div className="text-center mt-11">
                  <a href="https://g.page/r/CdkDS3vusW3UEBM/review" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3.5 mx-auto px-6 py-3.5 bg-white border border-[#c8dde8] rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <span className="w-7 h-7 rounded-full text-white font-serif font-bold text-[18px] flex items-center justify-center flex-shrink-0"
                      style={{background:"conic-gradient(from 0deg,#4285f4,#34a853,#fbbc05,#ea4335,#4285f4)"}}>G</span>
                    <span className="text-[14px] font-medium text-[#1e2d3d]"><strong>4.7 / 5</strong> on Google · 1,000+ Reviews</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 11 — PACKAGES
          ════════════════════════════════════════════════════ */}
          <section className="py-24 bg-[#f4f8fb]">
            <div className="max-w-[1200px] mx-auto px-7">
              <SectionHead
                eyebrow="Health check-up plans"
                title="Choose the right plan for your diabetes journey."
                body="From basic screening to comprehensive monitoring — a plan built for every need and every stage."
              />
              <div className="h-scroll">
                {/* Executive */}
                <PkgCard
                  icon="package" title="Executive Profile" desc="First-time check or annual health review"
                  items={["Diabetes","Thyroid","Liver","Kidney","Anemia","Blood Grouping","Radiology"]}
                  moreSuffix="+5 More Tests"
                  btnLabel="Know More"
                  btnCls="bg-[#FFDA99] text-[#333] hover:bg-[#f5c97c]"
                  iconBgCls="bg-[#FFDA99] text-[#b25a13]"
                  cardCls="bg-gradient-to-br from-[#FEF7DE] to-[#FFF7E8] border-[#FFDA99]"
                />
                {/* Comprehensive */}
                <PkgCard
                  icon="target" title="Comprehensive Profile" desc="Full diabetes monitoring panel"
                  items={["Diabetes","Thyroid","Liver","Kidney","Anemia","Blood Grouping","Radiology"]}
                  moreSuffix="+10 More Tests"
                  btnLabel="Know More"
                  btnCls="bg-[#7dc791] text-[#333] hover:bg-[#6ab880]"
                  iconBgCls="bg-[#7dc791] text-[#1f7a4f]"
                  cardCls="bg-gradient-to-br from-[#E8F9F0] to-[#DBF5E8] border-[#7dc791]"
                  featured
                />
                {/* Standard cards */}
                <PkgCard icon="shield" title="Premium Profile"   desc="Detailed organ function monitoring"  btnLabel="Know More" />
                <PkgCard icon="gem"    title="Platinum Profile"  desc="Diabetes + cardiac + kidney care"    btnLabel="Know More" />
                <PkgCard icon="crown"  title="Master Profile"    desc="Maximum coverage for complex or long-term cases" btnLabel="Know More" />
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 12 — FAQ
          ════════════════════════════════════════════════════ */}
          <section className="py-24">
            <div className="max-w-[1200px] mx-auto px-7">
              <SectionHead
                eyebrow="Common questions"
                title="Everything you want to know — before you decide."
              />
              <div className="max-w-[820px] mx-auto grid gap-3.5">
                {FAQS.map(f => <FaqItem key={f.q} {...f} />)}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 13 — FINAL FORM + LOCATION
          ════════════════════════════════════════════════════ */}
          <section className="py-24 bg-[#0b7aaa] text-white" id="contact">
            {/* anchor for #book */}
            <div id="book" className="relative" style={{top:"-80px"}} />

            <div className="max-w-[1200px] mx-auto px-7">
              <div className="grid md:grid-cols-2 gap-14 items-start">

                {/* Left — Location */}
                <div className="location-block pt-3">
                  <h3 className="font-serif font-normal text-[2rem] text-white mb-6 leading-[1.15]">Visit us in Siliguri.</h3>
                  <p className="text-white/80 mb-7">Walk in for a free consultation, or call us — we&apos;ll be glad to help.</p>

                  <ul className="grid gap-5 mb-7">
                    {[
                      { icon:"pin",   label:"Address", value:"1st Floor, Jhankar More, Golden Heights Building, Burdwan Road, Ward 4, Mahananda Para, Siliguri, West Bengal — 734005" },
                      { icon:"clock", label:"Hours",   value:"Monday – Saturday · 8:30 AM – 5:00 PM" },
                      { icon:"phone", label:"Call us", value:"+91 97337 85000", href:"tel:+919733785000" },
                      { icon:"chat",  label:"WhatsApp",value:"+91 97337 85000", href:"https://wa.me/919733785000" },
                    ].map(({ icon, label, value, href }) => (
                      <li key={label} className="grid gap-3.5 items-start" style={{gridTemplateColumns:"44px 1fr"}}>
                        <span className="w-11 h-11 rounded-xl bg-white/[.12] text-white flex items-center justify-center flex-shrink-0">
                          <Icon name={icon} size={22} />
                        </span>
                        <div>
                          <div className="text-[12px] uppercase tracking-[.08em] text-white/75 mb-1">{label}</div>
                          {href
                            ? <a href={href} className="text-white text-[.98rem] leading-snug border-b border-dashed border-white/40 hover:border-white transition-colors no-underline">{value}</a>
                            : <div className="text-white text-[.98rem] leading-snug">{value}</div>
                          }
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl overflow-hidden h-[220px] bg-black/[.18] border border-white/20">
                    <iframe
                      src="https://www.google.com/maps?q=Kins+Diabetes+Siliguri&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Kins Diabetes location on map"
                      className="w-full h-full border-0"
                    />
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[.15] text-[13px] text-white/85 leading-relaxed">
                    NABH Accredited · NABL Certified · 14+ Years · North Bengal&apos;s Only Specialised Diabetes Centre
                  </div>
                </div>

                {/* Right — Booking Form */}
                <div className="bg-white text-[#1e2d3d] rounded-[22px] shadow-[0_24px_60px_-20px_rgba(11,122,170,.28)] p-9">
                  <div className="text-center mb-6">
                    <h2 className="font-serif text-[1.9rem] text-[#0d1b2a] leading-tight">Book your free counselling</h2>
                    <p className="text-[#5a7184] mt-2.5">Our team will call you within 24 hours to confirm your appointment.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1e2d3d] mb-1.5">Full Name *</label>
                      <input required type="text" placeholder="Your full name" value={form.name}
                        onChange={e=>setForm({...form,name:e.target.value})} className={INPUT_CLS} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1e2d3d] mb-1.5">Phone Number *</label>
                      <div className="grid gap-2" style={{gridTemplateColumns:"92px 1fr"}}>
                        <div className="inline-flex items-center justify-center gap-1.5 bg-[#f4f8fb] border-[1.5px] border-[#c8dde8] rounded-lg font-semibold text-[14px] text-[#1e2d3d] px-2">
                          {/* Indian flag */}
                          <span className="relative w-[22px] h-[15px] rounded-sm flex-shrink-0 overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,.05)]"
                            style={{background:"linear-gradient(to bottom,#ff9933 0 33.33%,#ffffff 33.33% 66.66%,#138808 66.66% 100%)"}}>
                            <span className="absolute w-[5px] h-[5px] border border-[#000080] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                          </span>
                          +91
                        </div>
                        <input required type="tel" placeholder="10-digit number" value={form.phone}
                          onChange={e=>setForm({...form,phone:e.target.value})} className={INPUT_CLS} />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1e2d3d] mb-1.5">City</label>
                      <input type="text" placeholder="Your city" value={form.city}
                        onChange={e=>setForm({...form,city:e.target.value})} className={INPUT_CLS} />
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1e2d3d] mb-1.5">How long have you had diabetes?</label>
                      <select value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} className={INPUT_CLS}>
                        <option value="">Select…</option>
                        {["Just diagnosed","Less than 1 year","1–5 years","5–10 years","10+ years","Pre-diabetic / At risk"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>

                    {/* Help */}
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1e2d3d] mb-1.5">How can we help you?</label>
                      <select value={form.help} onChange={e=>setForm({...form,help:e.target.value})} className={INPUT_CLS}>
                        <option value="">Select…</option>
                        {["Better sugar control","Diet & lifestyle guidance","Annual health check-up","Complication management","Second opinion"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>

                    <button type="submit" disabled={sent}
                      className={`w-full py-4 rounded-full font-semibold text-[15px] transition-all duration-300 ${sent?"bg-[#16a34a] text-white":"bg-[#12a4dd] hover:bg-[#0b7aaa] text-white shadow-[0_6px_18px_-6px_rgba(18,164,221,.55)]"}`}>
                      {sent ? "✓ Thank you! We will call you soon." : "Book My Free Counselling →"}
                    </button>
                  </form>

                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 text-[12.5px] text-[#5a7184]">
                    {["No spam, ever","100% free consultation","Call within 24 hours"].map(t=>(
                      <span key={t} className="inline-flex items-center gap-1.5">
                        <Icon name="check" size={13} className="text-[#12a4dd]" strokeWidth={2.5} /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* ═══════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════ */}
        <footer className="bg-[#0d1b2a] py-[60px] pb-10 text-white/70 text-[14px]">
          <div className="max-w-[1200px] mx-auto px-7 flex flex-col items-center gap-5 text-center">
            <img src="/images/landing-page/kins-logo.webp" alt="Kins Diabetes" className="h-12 w-auto" />
            <div className="flex gap-5">
              {["Privacy Policy","Terms of Service"].map(l=>(
                <a key={l} href="#" className="text-white/78 hover:text-white font-medium transition-colors no-underline">{l}</a>
              ))}
            </div>
            <p className="max-w-[640px] text-[12.5px] leading-[1.55] opacity-60">
              The information on this page is for general awareness only and does not constitute medical advice. Please consult a qualified healthcare professional for diagnosis and treatment.
            </p>
            <p className="text-[13px] opacity-75">© {new Date().getFullYear()} Kins Diabetes, Siliguri. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}

'use client'
import React from 'react'

const NAVBAR_H     = 84
const STACK_OFFSET = 44

// ─────────────────────────────────────────────────────────────────────────────
// Card 1 · Doctor's Consultation
// Edit: title, desc, tags, gradient colors, icon SVG path
// ─────────────────────────────────────────────────────────────────────────────
function Card1({ stackIndex = 0 }) {
  // ── editable content ──────────────────────────────────────────────────────
  const title = "Doctor's Consultation"
  const desc  = 'Expert diabetologists and endocrinologists available 6 days a week — every plan personalised to your case.'
  const tags  = ['Hassle-free appointments', 'Specialist diabetologists', 'Mon – Sat available']
  // gradient: change these three Tailwind color stops
  const gradientCls = 'from-[#FEFBEB] via-[#fff] to-[#fff]'
  // ── icon (stethoscope) ────────────────────────────────────────────────────
  const Icon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffce1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="17" r="3" />
      <path d="M6 3v7a6 6 0 0 0 12 0V3" />
      <path d="M6 3h12" />
    </svg>
  )

  return (
    <div
      className="sticky mx-auto w-full md:w-[75%] rounded-3xl overflow-hidden shadow-2xl/10 mb-28"
      style={{ top: `${NAVBAR_H + stackIndex * STACK_OFFSET}px` }}
    >
      <div className={`bg-gradient-to-br ${gradientCls} min-h-[300px] p-8 md:p-12 flex flex-col md:flex-row gap-8 relative`}>
        {/* Inset border with offset */}
        <div className="absolute inset-3 rounded-2xl border-2 border-dashed border-yellow-400/30 pointer-events-none" />
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-yellow-300/15 flex items-center justify-center">
                <Icon />
              </div>
              <span className="text-yellow-500/50 text-xs font-bold tracking-[0.18em] uppercase">Service 01</span>
            </div>
            <h3 className="text-black font-serif text-3xl md:text-[2rem] leading-tight mb-4">{title}</h3>
            <p className="text-black/70 text-base leading-relaxed max-w-lg">{desc}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-yellow-300/12 text-black/90 px-3 py-1.5 rounded-full border border-yellow-400/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Decorative number */}
        <div className="hidden md:flex items-end justify-end w-40 relative overflow-hidden select-none pointer-events-none">
          <span className="text-[200px] font-black text-yellow-400/10 leading-none absolute -right-4 -bottom-4">1</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 2 · Advanced Diagnostics
// Edit: title, desc, tags, accent color
// ─────────────────────────────────────────────────────────────────────────────
function Card2({ stackIndex = 1 }) {
  // ── editable content ──────────────────────────────────────────────────────
  const title     = 'Advanced Diagnostics'
  const desc      = 'NABL-certified in-house lab — accurate results, same day, no outside lab needed.'
  const tags      = ['NABL Certified Lab', 'Same-day reports', 'HbA1c · Lipid · Kidney panel']
  const accentHex = '#12a4dd'   // change this to retheme the whole card
  // ── icon (flask / lab) ────────────────────────────────────────────────────
  const Icon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentHex} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6" /><path d="M14 3v7.5l4.5 7.5a1 1 0 0 1-.9 1.5H6.4a1 1 0 0 1-.9-1.5L10 10.5V3" />
    </svg>
  )

  return (
    <div
      className="sticky mx-auto w-full md:w-[75%] rounded-3xl overflow-hidden shadow-2xl mb-28 bg-white border border-[#d4e8f5]"
      style={{ top: `${NAVBAR_H + stackIndex * STACK_OFFSET}px` }}
    >
      <div className="min-h-[300px] flex flex-col md:flex-row">
        {/* Coloured left bar */}
        <div className="hidden md:block w-2 shrink-0" style={{ background: `linear-gradient(to bottom, ${accentHex}, #0b7aaa)` }} />
        {/* Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${accentHex}18` }}>
                <Icon />
              </div>
              <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: accentHex }}>Service 02</span>
            </div>
            <h3 className="text-[#0d1b2a] font-serif text-3xl md:text-[2.4rem] leading-tight mb-4">{title}</h3>
            <p className="text-[#5a7184] text-base leading-relaxed max-w-lg">{desc}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-[#c8dde8]"
                style={{ background: `${accentHex}12`, color: '#0b7aaa' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Decorative */}
        <div className="hidden md:flex items-end justify-end w-40 bg-[#f0f9fe] relative overflow-hidden select-none pointer-events-none">
          <span className="text-[200px] font-black leading-none absolute -right-4 -bottom-4" style={{ color: `${accentHex}0d` }}>2</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 3 · Patient Counselling
// Edit: title, desc, tags, gradient colors, icon SVG path
// ─────────────────────────────────────────────────────────────────────────────
function Card3({ stackIndex = 2 }) {
  // ── editable content ──────────────────────────────────────────────────────
  const title       = 'Patient Counselling'
  const desc        = 'A dedicated counsellor who understands your life — and builds a plan that actually fits it.'
  const tags        = ['1-on-1 sessions', 'Diet & lifestyle plan', 'Ongoing support']
  // gradient: change these three Tailwind color stops
  const gradientCls = 'from-[#F0FDF4] via-[#fff] to-[#fff]'
  // ── icon (heart / care) ───────────────────────────────────────────────────
  const Icon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#10b981" stroke="none">
      <path d="M12 21C12 21 3 14.5 3 8.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12.5-9 12.5z" />
    </svg>
  )

  return (
    <div
      className="sticky mx-auto w-full md:w-[75%] rounded-3xl overflow-hidden shadow-2xl/10 mb-28"
      style={{ top: `${NAVBAR_H + stackIndex * STACK_OFFSET}px` }}
    >
      <div className={`bg-gradient-to-br ${gradientCls} min-h-[300px] p-8 md:p-12 flex flex-col md:flex-row gap-8 relative`}>
        {/* Inset border with offset */}
        <div className="absolute inset-3 rounded-2xl border-2 border-dashed border-green-400/30 pointer-events-none" />
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-green-300/15 flex items-center justify-center">
                <Icon />
              </div>
              <span className="text-green-500/50 text-xs font-bold tracking-[0.18em] uppercase">Service 03</span>
            </div>
            <h3 className="text-black font-serif text-3xl md:text-[2rem] leading-tight mb-4">{title}</h3>
            <p className="text-black/70 text-base leading-relaxed max-w-lg">{desc}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-green-300/12 text-black/90 px-3 py-1.5 rounded-full border border-green-400/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Decorative number */}
        <div className="hidden md:flex items-end justify-end w-40 relative overflow-hidden select-none pointer-events-none">
          <span className="text-[200px] font-black text-green-400/10 leading-none absolute -right-4 -bottom-4">3</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Card 4 · Diabetes Education
// Edit: title, desc, tags, gradient colors, icon SVG path
// ─────────────────────────────────────────────────────────────────────────────
function Card4({ stackIndex = 3 }) {
  // ── editable content ──────────────────────────────────────────────────────
  const title     = 'Diabetes Education'
  const desc      = 'Understand your diabetes — food, stress and sleep explained so you can take real control of your health.'
  const tags      = ['Food & nutrition', 'Stress management', 'Sleep & recovery']
  const accentHex = '#7c3aed'   // change this to retheme the whole card
  // ── icon (open book) ──────────────────────────────────────────────────────
  const Icon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accentHex} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )

  return (
    <div
      className="sticky mx-auto w-full md:w-[75%] rounded-3xl overflow-hidden shadow-2xl mb-28 bg-white border border-[#e8d4f5]"
      style={{ top: `${NAVBAR_H + stackIndex * STACK_OFFSET}px` }}
    >
      <div className="min-h-[300px] flex flex-col md:flex-row">
        {/* Coloured left bar */}
        <div className="hidden md:block w-2 shrink-0" style={{ background: `linear-gradient(to bottom, ${accentHex}, #5b21b6)` }} />
        {/* Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${accentHex}18` }}>
                <Icon />
              </div>
              <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: accentHex }}>Service 04</span>
            </div>
            <h3 className="text-[#0d1b2a] font-serif text-3xl md:text-[2.4rem] leading-tight mb-4">{title}</h3>
            <p className="text-[#5a7184] text-base leading-relaxed max-w-lg">{desc}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-[#ddc8e8]"
                style={{ background: `${accentHex}12`, color: '#5b21b6' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Decorative */}
        <div className="hidden md:flex items-end justify-end w-40 bg-[#faf0fe] relative overflow-hidden select-none pointer-events-none">
          <span className="text-[200px] font-black leading-none absolute -right-4 -bottom-4" style={{ color: `${accentHex}0d` }}>4</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section wrapper — edit heading copy here
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <div className="w-full bg-white" style={{ backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
      <div className="max-w-[1200px] mx-auto px-4 py-20">

        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
            Complete Diabetes Solution
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0d1b2a] leading-tight mb-4">
            Stop running between clinics — everything you need is right here.
          </h2>
          <p className="text-[#5a7184]">From screening to specialist care, every service you need is available in-house.</p>
        </div>

        {/* Stacked sticky cards — edit each card component above */}
        <div>
          <Card1 stackIndex={0} />
          <Card2 stackIndex={1} />
          <Card3 stackIndex={2} />
          <Card4 stackIndex={3} />
        </div>

      </div>
    </div>
  )
}

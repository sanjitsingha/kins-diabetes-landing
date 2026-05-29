import React from 'react'
import { translations } from '../../i18n/translations';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

const hero = () => {
    const { lang } = useLanguage();
   const tx = translations[lang];


   const icons = {
    check: (
        <polyline points="20 6 9 17 4 12" />
    ),
    x: (
        <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </>
    ),
    phone: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    ),
    arrowRight: (
        <>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </>
    ),
    pin: (
        <>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </>
    ),
    mail: (
        <>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </>
    ),
    chat: (
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
    trendUp: (
        <>
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
        </>
    ),
    flask: (
        <>
            <path d="M10 2v6L4 18a3 3 0 0 0 3 4h10a3 3 0 0 0 3-4l-6-10V2" />
            <line x1="9" y1="2" x2="15" y2="2" />
            <line x1="7" y1="14" x2="17" y2="14" />
        </>
    ),
    heartPulse: (
        <>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            <polyline points="3.5 12 6 12 8 9 11 15 13 11 16 13 18 13" />
        </>
    ),
    eye: (
        <>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    stethoscope: (
        <>
            <path d="M11 2v2" />
            <path d="M5 2v2" />
            <path d="M5 3v4a3 3 0 0 0 6 0V3" />
            <path d="M8 10v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-2" />
            <circle cx="20" cy="11" r="2" />
        </>
    ),
    leaf: (
        <>
            <path d="M11 20A7 7 0 0 1 4 13c0-2.41 1.21-4.61 3-6 3.5-2.5 6-2 9-2 0 5-1 8-4 11a7 7 0 0 1-1 4z" />
            <path d="M2 22c5-4 8-7 11-15" />
        </>
    ),
    foot: (
        <>
            <path d="M12 22c4-1 5-4 5-7 0-3-2-5-2-8 0-2-1-5-3-5s-3 2-3 4-1 4-2 5c-1 2-2 4-2 6 0 3 3 4 7 5z" />
            <circle cx="9" cy="6" r="1" />
            <circle cx="7" cy="9" r="0.7" />
            <circle cx="6" cy="12" r="0.7" />
        </>
    ),
    monitor: (
        <>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <polyline points="6 10 9 7 12 11 16 8 18 10" />
        </>
    ),
    book: (
        <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
    ),
    msgSquare: (
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    clipboard: (
        <>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="13" y2="16" />
        </>
    ),
    alert: (
        <>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </>
    ),
    help: (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </>
    ),
    confused: (
        <>
            <circle cx="12" cy="12" r="10" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        </>
    ),
    shield: (
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
    pill: (
        <>
            <path d="M10.5 20.5L20.5 10.5a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z" />
            <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
        </>
    ),
    tired: (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M15.5 9.5l-3 0M11 9.5l-3 0" />
            <line x1="8" y1="15" x2="16" y2="15" />
        </>
    ),
    plus: (
        <>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </>
    ),
    star: (
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
    package: (
        <>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </>
    ),
    target: (
        <>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </>
    ),
    crown: (
        <>
            <path d="M2 4l3 12h14l3-12-6 7-4-9-4 9-6-7z" />
            <line x1="5" y1="20" x2="19" y2="20" />
        </>
    ),
    gem: (
        <>
            <polygon points="6 3 18 3 22 9 12 22 2 9" />
            <polyline points="6 3 9 9 15 9 18 3" />
            <line x1="2" y1="9" x2="22" y2="9" />
        </>
    ),
};

function Icon({ name, className = '', size = 20, strokeWidth = 2 }) {
    const isFilled = name === 'star' || name === 'play';
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={isFilled ? 'currentColor' : 'none'}
            stroke={isFilled ? 'none' : 'currentColor'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {icons[name]}
        </svg>
    );
}

  return (
    <LanguageProvider>
    <section id="top" className="py-10 pt-30 pb-20 bg-white">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="grid md:grid-cols-[1.05fr_1fr] rounded-3xl overflow-hidden border border-[#c8dde8] min-h-[560px]" style={{ background: 'linear-gradient(135deg, #eaf6fc 0%, #f5fbfe 55%, #fef4f5 100%)' }}>
                            {/* Left */}
                            <div className="p-10 md:p-14 flex flex-col justify-center">
                                <div className=" flex gap-2 mb-8">
                                    <img objectFit="contain" src="/landing-page/nabh-logo.webp" alt="NABH" className="w-9 h-auto" />
                                    <span className="inline-flex items-center px-4 py-1.5 bg-white border border-[#c8dde8] rounded-full text-sm font-medium text-[#1e2d3d]">
                                        {tx.hero.badge}
                                    </span>
                                </div>
                                <h1 className="font-serif text-3xl md:text-4xl leading-[1.35] text-[#12a4dd] mb-2 tracking-tight">
                                    {tx.hero.h1_1}<br />{tx.hero.h1_2}
                                </h1>
                                <p className="text-2xl font-medium text-black mb-8">{tx.hero.sub}</p>
                                <p className="text-[#5a7184] text-base max-w-lg mb-9">{tx.hero.desc}</p>
                                <a href="#book" className="inline-flex items-center gap-2 bg-[#12a4dd] hover:bg-[#0b7aaa] text-white font-semibold text-base px-8 py-5 rounded-full transition-all shadow-[0_6px_18px_-6px_rgba(18,164,221,0.55)] w-fit">
                                    {tx.hero.cta} <Icon name="arrowRight" size={16} />
                                </a>
                            </div>
                            {/* Right */}
                            <div className="p-5 pl-0 flex items-stretch">
                                <div className="relative w-full rounded-2xl overflow-hidden min-h-[320px] bg-gradient-to-br from-[#d6f0fb] to-[#eaf6fc] border border-white/60">
                                    <img
                                        src="/landing-page/hero-image-right.webp"
                                        alt="Clinic"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-[1.02] transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                    </div>
                </section>
                </LanguageProvider>
  )
}

export default hero
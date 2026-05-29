'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import Stats from '../components/lp-1/stats';
import ProblemSection from '../components/lp-1/problem';
import PatientStories from '../components/lp-1/patient_stories';
import Navbar from '../components/lp-1/navbar';
import PackageCard from '../components/lp-1/package_card';
import PatientsVideoTestimonial from '../components/lp-1/patientsTestimonial';
import DoctorsVideo from '../components/lp-1/doctorsVideo';
import GoogleReviews from '../components/lp-1/googleReviews';
import HeroSection from '../components/lp-1/hero';
import ServicesSection from '../components/lp-1/servicesSection';
// ─── SVG Icon Component ───────────────────────────────────────────────────────
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

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    const bodyRef = useRef(null);

    return (
        <div className="rounded-xl border border-[#c8dde8] bg-white overflow-hidden">
            <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-[#1e2d3d] text-base hover:bg-[#f4f8fb] transition-colors"
                onClick={() => setOpen(!open)}
            >
                {question}
                <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#12a4dd] text-white rotate-45' : 'bg-[#f0f9fe] text-[#12a4dd]'
                        }`}
                >
                    <Icon name="plus" size={14} />
                </span>
            </button>
            <div
                ref={bodyRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: open ? (bodyRef.current?.scrollHeight || 500) + 'px' : '0px' }}
            >
                <p className="text-[#5a7184] text-sm leading-relaxed px-6 pb-5">{answer}</p>
            </div>
        </div>
    );
}

// ─── Doctor Flip Card ────────────────────────────────────────────────────────
function DoctorCard({ name, role, years, tone, imageSrc, initials, quals, specialisation, languages, available }) {
    const [flipped, setFlipped] = useState(false);

    const gradients = {
        a: 'from-[#b6e2f5] via-[#5fb4dc] to-[#0b7aaa]',
        b: 'from-[#c4d4ec] via-[#7d97c3] to-[#41527e]',
        c: 'from-[#fcdfa0] via-[#e3a548] to-[#b25a13]',
        d: 'from-[#b1e0c6] via-[#5fb188] to-[#1f7a4f]',
        e: 'from-[#d4c0ee] via-[#9978ce] to-[#6b4ca8]',
    };

    return (
        <div
            className="relative flex-shrink-0 w-64 h-[480px] cursor-pointer"
            style={{ perspective: '1400px' }}
            onClick={() => setFlipped(!flipped)}
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped(!flipped)}
        >
            <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden border border-[#c8dde8] shadow-sm"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    <div className={`absolute inset-0 bg-gradient-to-b ${gradients[tone]} flex items-center justify-center overflow-hidden`}>
                        {imageSrc ? (
                            <img src={imageSrc} alt={name} className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-300" />
                        ) : (
                            <span className="text-8xl text-white/40 font-serif">{initials}</span>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-5 pb-5 pt-16 text-white">
                        <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full mb-3">
                            {years}
                        </span>
                        <h3 className="font-serif text-xl text-white mb-1 leading-tight">{name}</h3>
                        <div className="text-white/90 text-sm">{role}</div>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#0b7aaa] flex items-center justify-center shadow-md">
                        <Icon name="arrowRight" size={14} />
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white to-[#f0f9fe] border border-[#c8dde8] p-6 flex flex-col"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="text-center pb-4 border-b border-[#c8dde8] mb-4">
                        <div className="font-serif text-[#0d1b2a] text-lg leading-tight">{name}</div>
                        <div className="text-[#5a7184] text-xs mt-1">{role}</div>
                    </div>
                    <ul className="space-y-3 flex-1 flex flex-col justify-center">
                        {[
                            { label: 'Qualifications', val: quals },
                            { label: 'Specialisation', val: specialisation },
                            { label: 'Languages', val: languages },
                            { label: 'Available', val: available },
                        ].map(({ label, val }) => (
                            <li key={label}>
                                <div className="text-[10px] font-bold tracking-widest uppercase text-[#12a4dd]">{label}</div>
                                <div className="text-sm text-[#1e2d3d] leading-snug mt-0.5">{val}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}



// ─── Journey Step Card ────────────────────────────────────────────────────────
function StepCard({ stepNum, time, iconName, title, description, bullets, dataStep, onInView }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) onInView(dataStep); },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [dataStep, onInView]);

    return (
        <div
            ref={ref}
            data-step={dataStep}
            className="bg-white border border-[#c8dde8] rounded-xl p-9 flex flex-col gap-0 hover:-translate-y-1 hover:border-[#d6f0fb] hover:shadow-md transition-all duration-200 min-h-[540px] justify-center"
        >
            <div className="flex items-center justify-between mb-5">
                <div className="w-15 h-15 rounded-2xl bg-[#f0f9fe] text-[#12a4dd] flex items-center justify-center" style={{ width: 60, height: 60 }}>
                    <Icon name={iconName} size={30} />
                </div>
                <span className="font-serif text-6xl text-[#d6f0fb] leading-none">{stepNum}</span>
            </div>
            <span className="inline-block bg-[#f0f9fe] text-[#0b7aaa] text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-3 w-fit">{time}</span>
            <h3 className="font-serif text-3xl text-[#0d1b2a] mb-3 leading-tight">{title}</h3>
            <p className="text-[#5a7184] text-base leading-relaxed mb-6">{description}</p>
            <ul className="space-y-3">
                {bullets.map((b, i) => (
                    <li key={i} className="grid gap-3 text-[#1e2d3d] text-sm leading-snug" style={{ gridTemplateColumns: '22px 1fr' }}>
                        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="bg-[#f0f9fe] text-[#12a4dd] rounded-full p-1 flex-shrink-0 mt-0.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function DiabetesCounsellingPage() {
    const [activeStep, setActiveStep] = useState('1');
    const [formData, setFormData] = useState({ name: '', phone: '', city: '', duration: '', help: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleStepInView = useCallback((step) => setActiveStep(step), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setFormData({ name: '', phone: '', city: '', duration: '', help: '' }); }, 3200);
    };

    const { lang } = useLanguage();
    const tx = translations[lang];

    const journeySlides = [
        { step: '1', tone: 'a', img: '/landing-page/patient-journey/step-01.webp' },
        { step: '2', tone: 'b', img: '/landing-page/patient-journey/step-02.webp' },
        { step: '3', tone: 'c', img: '/landing-page/patient-journey/step-03.webp' },
        { step: '4', tone: 'd', img: '/landing-page/patient-journey/step-04.webp' },
        { step: '5', tone: 'e', img: '/landing-page/patient-journey/step-05.webp' },
    ].map((s, i) => ({ ...s, label: tx.journey.slides[i] }));

    const jvToneMap = {
        a: 'from-[#d6f0fb] to-[#9ed8f0]',
        b: 'from-[#e8eef9] to-[#b8c8e8]',
        c: 'from-[#fef3c7] to-[#fcd9a0]',
        d: 'from-[#fde8eb] to-[#f7a5b1]',
        e: 'from-[#d9f5e7] to-[#9ad8b8]',
    };

    const stepCards = tx.journey.steps.map((s, i) => ({
        ...s, iconName: s.icon, dataStep: String(i + 1), onInView: handleStepInView,
    }));
    const compareRows = tx.compare.rows;
    const faqs = tx.faq.items;



    return (
        <LanguageProvider>
            <Head>
                <title>Kins Diabetes — North Bengal&apos;s Most Trusted Diabetes Centre</title>
                <meta name="description" content="Complete diabetes care in one visit at North Bengal's only NABH-accredited diabetes centre. Tests, counselling, diet plan and doctor consultation under one roof in Siliguri." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <style>{`
        .h-scroll { display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 8px 28px 28px; margin: 0 -28px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .h-scroll::-webkit-scrollbar { display: none; }
        .h-scroll > * { flex: 0 0 calc(33% - 12px); scroll-snap-align: start; min-width: 220px; }
        @media (max-width: 768px) { .h-scroll > * { flex: 0 0 calc(66% - 12px); } }
        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 4px rgba(255,255,255,.2)}50%{box-shadow:0 0 0 8px rgba(255,255,255,.1)} }
        @keyframes orb-spin { to { transform: rotate(360deg); } }
        @keyframes ring-rotate { to { transform: rotate(360deg); } }
        @keyframes hint-bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(6px)} }
        .ring-spin { transform-origin: 400px 400px; animation: ring-rotate 22s linear infinite; }
        .ring-spin-rev { transform-origin: 400px 400px; animation: ring-rotate 30s linear infinite reverse; }
        .bento-dot { animation: pulse-dot 2s infinite; }
      `}</style>

            <div className="bg-white text-[#1e2d3d]">

                {/* ─── HEADER ─────────────────────────────────────────────────────── */}
                <Navbar />

                {/* ─── HERO ───────────────────────────────────────────────────────── */}
               <HeroSection/>
                        <Stats />
<PatientsVideoTestimonial/>

                {/* ─── PROBLEMS ───────────────────────────────────────────────────── */}

                <ProblemSection />
                <DoctorsVideo/>
              
<ServicesSection/>

                {/* ─── COMPARISON TABLE ───────────────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                {tx.compare.eyebrow}
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">{tx.compare.h2}</h2>
                            <p className="text-[#5a7184]">{tx.compare.sub}</p>
                        </div>

                        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden border border-[#c8dde8] shadow-md">
                            {/* Head */}
                            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[#c8dde8]">
                                <div className="px-6 py-5 font-bold text-sm"></div>
                                <div className="px-6 py-5 text-center bg-[#12a4dd] text-white font-bold text-sm">
                                    {tx.compare.colKins}
                                    <span className="block text-[11px] font-medium opacity-85 mt-1 tracking-wide uppercase">{tx.compare.kinsTag}</span>
                                </div>
                                <div className="px-6 py-5 text-center bg-[#eef2f5] text-[#5a7184] font-bold text-sm">{tx.compare.colOther}</div>
                            </div>
                            {compareRows.map(({ feature, kins, other }) => (
                                <div key={feature} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[#c8dde8] last:border-0">
                                    <div className="px-6 py-4 font-semibold text-[#1e2d3d] text-sm">{feature}</div>
                                    <div className="px-6 py-4 bg-[#d6f0fb] text-[#0b7aaa] text-sm">
                                        <span className="inline-flex items-center gap-2 font-medium">
                                            <Icon name="check" size={18} className="text-[#16a34a] flex-shrink-0" strokeWidth={3} /> {kins}
                                        </span>
                                    </div>
                                    <div className="px-6 py-4 bg-[#f4f8fb] text-[#5a7184] text-sm">
                                        <span className="inline-flex items-center gap-2 font-medium">
                                            <Icon name="x" size={18} className="text-[#cbd5e1] flex-shrink-0" /> {other}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── DOCTORS ────────────────────────────────────────────────────── */}
                <section className="py-24 bg-[#f0f9fe]">
                    <div className="max-w-[1200px] mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                {tx.doctors.eyebrow}
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">{tx.doctors.h2}</h2>
                            <p className="text-[#5a7184]">{tx.doctors.sub}</p>
                        </div>
                        <div className="h-scroll">
                            {[
                                { name: 'Dr. Sekhar Chakraborty', role: 'Senior Consultant · Diabetologist', years: '25+ Years', tone: 'a', imageSrc: '/landing-page/doctors/dr-sekhar-web.webp', quals: 'MBBS, MD', specialisation: 'Type 1 & 2 Diabetes, Endocrine disorders', languages: 'English, Bengali, Hindi', available: 'Mon – Sat · 10:00 AM – 5:00 PM' },
                                { name: 'Dr. Hironmay Paul', role: 'Senior Consultant · Diabetologist', years: '35+ Years', tone: 'b', imageSrc: '/landing-page/doctors/dr-paul-web.webp', quals: 'MBBS, MD', specialisation: 'Diabetes management, Lifestyle disorders', languages: 'English, Bengali, Hindi', available: 'Mon – Sat · 11:00 AM – 4:00 PM' },
                                { name: 'Dr. Subhodip Pramanik', role: 'Consultant · Endocrinology', years: '14+ Years · Endocrinologist', tone: 'd', imageSrc: '/landing-page/doctors/dr-pramanik-web.webp', quals: 'MBBS, MD, DM (Endo)', specialisation: 'Thyroid, Diabetes, Hormonal disorders', languages: 'English, Bengali, Hindi', available: 'Mon – Fri · 2:30 – 5:30 PM' },
                                { name: 'Dr. R K Saraogi', role: 'Consultant · Endocrinology', years: '20+ Years · Endocrinologist', tone: 'e', imageSrc: '/landing-page/doctors/dr-ravikant-web.webp', quals: 'MBBS, MD, DM (Endo)', specialisation: 'Complex diabetes, Hormonal therapy', languages: 'English, Hindi, Bengali', available: 'Mon – Sat · 10:00 AM – 4:00 PM' },
                            ].map((doc) => <DoctorCard key={doc.name} {...doc} />)}
                        </div>
                    </div>
                </section>

                {/* ─── PATIENT STORIES ────────────────────────────────────────────── */}

                <PatientStories />
                {/* ─── PACKAGES ───────────────────────────────────────────────────── */}
<GoogleReviews/>
                {/* <PackageCard/> */}
                {/* ─── FAQ ────────────────────────────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                {tx.faq.eyebrow}
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">{tx.faq.h2}</h2>
                        </div>
                        <div className="max-w-[820px] mx-auto space-y-3.5">
                            {faqs.map(({ q, a }) => <FaqItem key={q} question={q} answer={a} />)}
                        </div>
                    </div>
                </section>

                {/* ─── FINAL SECTION + CONTACT ─────────────────────────────────────── */}
                <section className="py-24 bg-[#0b7aaa] text-white" id="contact">
                    <div id="book" className="relative -top-20" />
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="grid md:grid-cols-2 gap-14 items-start">
                            {/* Location */}
                            <div>
                                <h3 className="font-serif text-4xl text-white mb-3 leading-tight">{tx.contact.h3}</h3>
                                <p className="text-white/80 mb-8">{tx.contact.sub}</p>
                                <ul className="space-y-6 mb-7">
                                    {[
                                        { icon: 'pin',   value: '1st Floor, Jhankar More, Golden Heights Building, Burdwan Road, Ward 4, Mahananda Para, Siliguri, West Bengal — 734005' },
                                        { icon: 'clock', value: 'Monday – Saturday · 8:30 AM – 5:00 PM' },
                                        { icon: 'phone', value: '+91 97337 85000', href: 'tel:+919733785000' },
                                        { icon: 'chat',  value: '+91 97337 85000', href: 'https://wa.me/919733785000' },
                                    ].map(({ icon, value, href }, i) => {
                                        const label = tx.contact.labels[i];
                                        return (
                                        <li key={label} className="grid gap-3.5 items-start" style={{ gridTemplateColumns: '44px 1fr' }}>
                                            <span className="w-11 h-11 rounded-xl bg-white/12 text-white flex items-center justify-center flex-shrink-0">
                                                <Icon name={icon} size={22} />
                                            </span>
                                            <div>
                                                <div className="text-xs uppercase tracking-widest text-white/75 mb-1">{label}</div>
                                                {href ? (
                                                    <a href={href} className="text-white border-b border-dashed border-white/40 hover:border-white text-sm leading-snug transition-colors">{value}</a>
                                                ) : (
                                                    <div className="text-white text-sm leading-snug">{value}</div>
                                                )}
                                            </div>
                                        </li>
                                        );
                                    })}
                                </ul>

                                <div className="mt-6 text-sm text-white/85 border-t border-white/15 pt-5 leading-relaxed">
                                    {tx.contact.accreditation}
                                </div>
                            </div>

                            {/* Booking Form */}
                            <div className="rounded-xl overflow-hidden h-56 bg-black/20 border border-white/20">
                                <iframe
                                    src="https://www.google.com/maps?q=Kins+Diabetes+Siliguri&output=embed"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Kins Diabetes location"
                                    className="w-full h-full border-0"
                                />
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </LanguageProvider>
    );
}

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Stats from '../components/lp-1/stats';
import ProblemSection from '../components/lp-1/problem';
import PatientStories from '../components/lp-1/patient_stories';
import Navbar from '../components/lp-1/navbar';
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

    const journeySlides = [
        { step: '1', tone: 'a', label: 'Personalised counselling', img: '/landing-page/patient-journey/step-01.webp' },
        { step: '2', tone: 'b', label: 'Complete diabetes investigations', img: '/landing-page/patient-journey/step-02.webp' },
        { step: '3', tone: 'c', label: 'Lifestyle modification session', img: '/landing-page/patient-journey/step-03.webp' },
        { step: '4', tone: 'd', label: 'Expert doctor consultation', img: '/landing-page/patient-journey/step-04.webp' },
        { step: '5', tone: 'e', label: 'Medication & Continuous Support', img: '/landing-page/patient-journey/step-05.webp' },
    ];

    const jvToneMap = {
        a: 'from-[#d6f0fb] to-[#9ed8f0]',
        b: 'from-[#e8eef9] to-[#b8c8e8]',
        c: 'from-[#fef3c7] to-[#fcd9a0]',
        d: 'from-[#fde8eb] to-[#f7a5b1]',
        e: 'from-[#d9f5e7] to-[#9ad8b8]',
    };

    const stepCards = [
        {
            stepNum: '01', dataStep: '1', time: '8:30 AM – 09:30 AM · 1 hour', iconName: 'msgSquare',
            title: 'Personalised counselling',
            description: 'A dedicated diabetes counsellor sits with you — understanding your history, lifestyle, and health concerns. No rushing. No generic advice.',
            bullets: ['Full medical & family history review', 'Lifestyle, diet & activity assessment', 'Concerns, fears & questions addressed', 'Personalised care plan designed'],
        },
        {
            stepNum: '02', dataStep: '2', time: '09:30 AM – 12:30 PM · 3 hours', iconName: 'flask',
            title: 'Complete diabetes investigations',
            description: 'All your diabetes-related blood tests done in our NABL-certified lab — fast, accurate, and reviewed by experts.',
            bullets: ['HbA1c & blood sugar profile', 'Lipid & cholesterol panel', 'Kidney & liver function tests', 'Same-day report turnaround'],
        },
        {
            stepNum: '03', dataStep: '3', time: '11:00 AM – 12:00 PM · 1 hour', iconName: 'book',
            title: 'Lifestyle modification session',
            description: 'Understand exactly how your body works — knowledge that empowers real, lasting change in your daily life.',
            bullets: ['How food affects your sugar', 'Stress, sleep & blood glucose', 'The role of physical activity', 'Reading your own lab reports'],
        },
        {
            stepNum: '04', dataStep: '4', time: '1:30 PM – 3:00 PM · 1.5 hours', iconName: 'stethoscope',
            title: 'Expert doctor consultation',
            description: 'A specialist diabetologist reviews every report with you and designs a treatment plan built for your specific case.',
            bullets: ['Detailed report-by-report walkthrough', 'Custom medication plan & dosing', 'Risk assessment & complication check', 'Every question answered'],
        },
        {
            stepNum: '05', dataStep: '5', time: '3:00 PM – 4:00 PM · 1 hour', iconName: 'clipboard',
            title: 'Medication & Continuous Support',
            description: 'Your complete diabetes plan — written, explained and yours to keep forever.',
            bullets: ['Written medication schedule', 'Customised diet chart', 'Daily activity & monitoring plan', 'Follow-up schedule with your doctor'],
        },
    ];

    const compareRows = [
        { feature: 'Complete care in one visit', kins: 'Done in 7 hours', other: 'Multiple visits needed' },
        { feature: 'Dedicated diabetes counsellor', kins: '1-on-1 personal session', other: 'Rarely available' },
        { feature: 'NABH accreditation', kins: "North Bengal's only", other: 'Not accredited' },
        { feature: 'In-house NABL lab', kins: 'Certified, fast reports', other: 'Sent to outside labs' },
        { feature: 'CGM device available', kins: 'Available in-house', other: 'Not available' },
        { feature: 'Personalised diet plan', kins: 'Customised same day', other: 'Generic printed sheet' },
        { feature: 'Diabetes education session', kins: 'Every patient, every visit', other: 'Not offered' },
        { feature: 'Retina & foot screening', kins: 'Done in-house', other: 'Referred elsewhere' },
        { feature: 'Lifestyle modification programme', kins: 'Structured programme', other: 'Not available' },
    ];

    const faqs = [
        { q: 'Can diabetes be cured?', a: 'Diabetes cannot be cured, but it can be very effectively managed. With the right counselling, diet, lifestyle changes, and medical guidance, many of our patients have significantly reduced their medication dependency and live complication-free lives.' },
        { q: 'Do I need to come fasting?', a: 'Yes. For accurate blood sugar and HbA1c testing, please come after an 8–10 hour fast. Our team will guide you on full preparation when they call to confirm your appointment.' },
        { q: 'How long does one complete visit take?', a: 'A full visit at Kins Diabetes takes approximately 7 hours — from your first counselling session through to doctor consultation and your personal plan. Everything is done in one day. You leave with complete clarity.' },
        { q: 'Is Kins Diabetes only for people who already have diabetes?', a: 'Not at all. We also help people with pre-diabetes, those with a strong family history of diabetes, and anyone who wants a preventive diabetes screening. Early detection changes everything.' },
        { q: 'What will the cost be?', a: 'We offer multiple health check-up profiles at different price points depending on your specific needs. Our team will explain all options clearly when they call — no hidden costs, no pressure.' },
        { q: 'Can I bring a family member with me?', a: 'Absolutely. We encourage family members to come along. Understanding diabetes together leads to much better lifestyle support at home.' },
        { q: 'Do I need an appointment or can I walk in?', a: 'We strongly recommend booking in advance so our counsellors can be fully prepared for your visit and minimise your waiting time. Use the form on this page or call us directly on +91 97337 85000.' },
    ];



    return (
        <>
            <Head>
                <title>Kins Diabetes — North Bengal&apos;s Most Trusted Diabetes Centre</title>
                <meta name="description" content="Complete diabetes care in one visit at North Bengal's only NABH-accredited diabetes centre. Tests, counselling, diet plan and doctor consultation under one roof in Siliguri." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
            </Head>

            <style>{`
        body { font-family: 'DM Sans', -apple-system, sans-serif; }
        .font-serif { font-family: 'DM Serif Display', 'Times New Roman', serif; }
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
                <section id="top" className="py-10 pt-30 pb-20 bg-white">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="grid md:grid-cols-[1.05fr_1fr] rounded-3xl overflow-hidden border border-[#c8dde8] min-h-[560px]" style={{ background: 'linear-gradient(135deg, #eaf6fc 0%, #f5fbfe 55%, #fef4f5 100%)' }}>
                            {/* Left */}
                            <div className="p-10 md:p-14 flex flex-col justify-center">
                                <div className="flex flex-wrap gap-3 items-center mb-7">
                                    <img src="/landing-page/nabh-logo.webp" alt="NABH" className="w-9 h-auto" />
                                    <span className="inline-flex items-center px-4 py-1.5 bg-white border border-[#c8dde8] rounded-full text-sm font-medium text-[#1e2d3d]">
                                        North Bengal&apos;s only NABH diabetes centre
                                    </span>
                                </div>
                                <h1 className="font-serif text-4xl md:text-5xl leading-[1.05] text-[#0d1b2a] mb-2 tracking-tight">
                                    Tired of managing<br />diabetes alone?
                                </h1>
                                <p className="text-lg font-medium text-[#12a4dd] mb-4">Stop worrying. Start managing — with a real diabetes plan.</p>
                                <p className="text-[#5a7184] text-base max-w-lg mb-9">
                                    Get expert care for your diabetes — tests, counselling, diet plan and doctor consultation — all in one day, under one roof in Siliguri.
                                </p>
                                <a href="#book" className="inline-flex items-center gap-2 bg-[#12a4dd] hover:bg-[#0b7aaa] text-white font-semibold text-base px-8 py-5 rounded-full transition-all shadow-[0_6px_18px_-6px_rgba(18,164,221,0.55)] w-fit">
                                    Book My Free Counselling <Icon name="arrowRight" size={16} />
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
                        <Stats />
                    </div>
                </section>

                {/* ─── PROBLEMS ───────────────────────────────────────────────────── */}

                <ProblemSection />
                {/* ─── PATIENT JOURNEY ────────────────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Your Journey Starts Here
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">From struggling alone to having a complete plan.</h2>
                            <p className="text-[#5a7184]">Everything sorted under one roof — in one focused, dedicated day.</p>
                        </div>

                        <div className="grid md:grid-cols-[40%_60%] gap-12 items-start">
                            {/* Sticky visual */}
                            <div className="hidden md:block sticky top-28 h-[540px]">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#c8dde8] shadow-md bg-[#f0f9fe]">
                                    {journeySlides.map((slide) => (
                                        <div
                                            key={slide.step}
                                            className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${activeStep === slide.step ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                        >
                                            <div className={`flex-1 bg-gradient-to-b ${jvToneMap[slide.tone]} flex items-center justify-center relative overflow-hidden`}>
                                                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.35), transparent 50%)' }} />
                                                <img src={slide.img} alt={slide.label} className="relative w-full h-full object-cover" />
                                            </div>
                                            <div className="bg-white/95 backdrop-blur-sm px-6 py-5 border-t border-[#c8dde8]">
                                                <div className="text-[11px] font-bold tracking-widest uppercase text-[#12a4dd] mb-1">Step {String(slide.step).padStart(2, '0')}</div>
                                                <strong className="font-serif text-lg text-[#0d1b2a] leading-tight">{slide.label}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Scrolling steps */}
                            <div className="flex flex-col gap-8">
                                {stepCards.map((card) => (
                                    <StepCard key={card.dataStep} {...card} onInView={handleStepInView} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── SERVICES BENTO ─────────────────────────────────────────────── */}
                <section className="py-24 bg-[#f4f8fb]">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Complete Diabetes Solution
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">Stop running between clinics — everything you need is right here.</h2>
                            <p className="text-[#5a7184]">From screening to specialist care, every service you need is available in-house.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[215px] gap-4">
                            {/* Featured 2x2 */}
                            <div className="col-span-2 row-span-2 rounded-[18px] overflow-hidden border border-[#0b7aaa] bg-gradient-to-b from-[#12a4dd] to-[#0b7aaa] text-white flex flex-col">
                                <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-[180px]">
                                    <Icon name="stethoscope" size={220} className="opacity-[0.18]" strokeWidth={1} />
                                    <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)' }} />
                                </div>
                                <div className="p-7 bg-gradient-to-t from-black/20 to-transparent">
                                    <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase opacity-85 mb-3">
                                        <span className="bento-dot w-2 h-2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.2)]" /> Most requested
                                    </div>
                                    <h3 className="font-serif text-3xl text-white mb-2">Doctor&apos;s consultation</h3>
                                    <p className="text-white/90 text-sm mb-4">Expert diabetologists and endocrinologists available 6 days a week — every plan personalised to your case.</p>
                                    <div className="flex flex-wrap gap-2 text-sm font-medium">
                                        {['Hassle-free appointments', 'Specialist diabetologists'].map((t) => (
                                            <span key={t} className="inline-flex items-center gap-1.5 bg-white/12 px-3 py-1.5 rounded-full text-xs">
                                                <Icon name="check" size={12} className="bg-white text-[#0b7aaa] rounded-full p-[2px]" strokeWidth={3} /> {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Small cards */}
                            {[
                                { tone: 'white', icon: 'flask', title: 'Advanced Diagnostics', desc: 'NABL-certified in-house lab — accurate results, same day, no outside lab needed.' },
                                { tone: 'amber', icon: 'msgSquare', title: 'Patient counselling', desc: 'A dedicated counsellor who understands your life — and builds a plan that actually fits it.' },
                                { tone: 'mint', icon: 'leaf', title: 'Diet & nutrition', desc: 'A diet plan built around your food, your budget and your sugar — not a generic printed chart.' },
                                { tone: 'white', icon: 'book', title: 'Diabetes education', desc: 'Understand your diabetes — food, stress and sleep explained.' },
                                { tone: 'white', icon: 'eye', title: 'Retina screening', desc: 'Early detection of diabetic eye complications.' },
                                { tone: 'white', icon: 'foot', title: 'Diabetic foot care', desc: 'Specialised foot exam to prevent ulcers and nerve damage.' },
                                { tone: 'rose', icon: 'heartPulse', title: 'Cardiac care', desc: 'Heart risk assessment — because sugar affects the heart.' },
                                { tone: 'dark', icon: 'monitor', title: 'CGM monitoring', desc: 'Continuous Glucose Monitoring — real-time sugar tracking.', badge: 'NEW' },
                            ].map(({ tone, icon, title, desc, badge }) => {
                                const toneMap = {
                                    white: 'bg-white border-[#c8dde8]',
                                    amber: 'bg-gradient-to-b from-[#fef9eb] to-[#fef3c7] border-[#fde9a6]',
                                    mint: 'bg-gradient-to-b from-[#eefaf3] to-[#d9f5e7] border-[#b6e7cc]',
                                    rose: 'bg-gradient-to-b from-[#fef0f2] to-[#fde8eb] border-[#fac4ce]',
                                    dark: 'bg-gradient-to-b from-[#1a3a52] to-[#0d1b2a] border-[#234862]',
                                };
                                const iconColor = { white: 'bg-[#f0f9fe] text-[#12a4dd]', amber: 'bg-white/70 text-[#b25a13]', mint: 'bg-white/70 text-[#1f7a4f]', rose: 'bg-white/70 text-[#ec1c36]', dark: 'bg-white/12 text-[#12a4dd]' };
                                const textColor = tone === 'dark' ? 'text-white' : 'text-[#0d1b2a]';
                                const descColor = tone === 'dark' ? 'text-white/70' : 'text-[#5a7184]';
                                return (
                                    <div key={title} className={`relative rounded-[18px] border p-5 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col ${toneMap[tone]}`}>
                                        {badge && <span className="absolute top-4 right-4 bg-[#ec1c36] text-white text-[9.5px] font-bold tracking-wide px-2 py-0.5 rounded-full">{badge}</span>}
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconColor[tone]}`}>
                                            <Icon name={icon} size={22} />
                                        </div>
                                        <h3 className={`font-serif text-lg leading-tight mb-1.5 ${textColor}`}>{title}</h3>
                                        <p className={`text-sm leading-snug ${descColor}`}>{desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── COMPARISON TABLE ───────────────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Why choose us
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">Kins Diabetes vs. a regular clinic — the difference is clear.</h2>
                            <p className="text-[#5a7184]">Most clinics give you a prescription and send you home. We build you a complete system.</p>
                        </div>

                        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden border border-[#c8dde8] shadow-md">
                            {/* Head */}
                            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[#c8dde8]">
                                <div className="px-6 py-5 font-bold text-sm">Feature</div>
                                <div className="px-6 py-5 text-center bg-[#12a4dd] text-white font-bold text-sm">
                                    Kins Diabetes
                                    <span className="block text-[11px] font-medium opacity-85 mt-1 tracking-wide uppercase">NABH · NABL · 14+ Years</span>
                                </div>
                                <div className="px-6 py-5 text-center bg-[#eef2f5] text-[#5a7184] font-bold text-sm">Regular Clinic</div>
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
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Your care team
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">Expert doctors. Real experience. Right here in Siliguri.</h2>
                            <p className="text-[#5a7184]">Our specialists have dedicated their careers to diabetes — so you get the most informed, experienced guidance possible.</p>
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
                <section className="py-24 bg-[#f4f8fb]">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Health check-up plans
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">Choose the right plan for your diabetes journey.</h2>
                            <p className="text-[#5a7184]">From basic screening to comprehensive monitoring — a plan built for every need and every stage.</p>
                        </div>

                        <div className="h-scroll">
                            {/* Executive */}
                            <div className="flex-shrink-0 w-64 rounded-xl border border-[#FFDA99] bg-gradient-to-br from-[#FEF7DE] to-[#FFF7E8] p-6 flex flex-col">
                                <div className="w-10 h-10 rounded-xl bg-[#FFDA99] flex items-center justify-center text-[#b25a13] mb-5">
                                    <Icon name="package" size={22} />
                                </div>
                                <h3 className="font-serif text-xl text-[#0d1b2a] mb-1.5">Executive Profile</h3>
                                <p className="text-[#5a7184] text-sm mb-5">First-time check or annual health review</p>
                                <ul className="space-y-2.5 flex-1">
                                    {['Diabetes', 'Thyroid', 'Liver', 'Kidney', 'Anemia', 'Blood Grouping', 'Radiology'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-[#1e2d3d]">
                                            <span className="w-4 h-4 rounded-full bg-[#FFDA99] flex items-center justify-center flex-shrink-0">
                                                <Icon name="check" size={10} strokeWidth={3} />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                    <li className="text-sm text-[#12a4dd] underline mt-2">+5 More Tests</li>
                                </ul>
                                <a href="#book" className="mt-8 block text-center bg-[#FFDA99] text-[#333] font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#f5c97c] transition-colors">
                                    Know More →
                                </a>
                            </div>

                            {/* Comprehensive */}
                            <div className="relative flex-shrink-0 w-64 rounded-xl border border-[#7dc791] bg-gradient-to-br from-[#E8F9F0] to-[#DBF5E8] p-6 flex flex-col">
                                <div className="absolute -top-3 right-4 bg-[#ec1c36] text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full">Most Popular</div>
                                <div className="w-10 h-10 rounded-xl bg-[#7dc791] flex items-center justify-center text-[#1f7a4f] mb-5">
                                    <Icon name="target" size={22} />
                                </div>
                                <h3 className="font-serif text-xl text-[#0d1b2a] mb-1.5">Comprehensive Profile</h3>
                                <p className="text-[#5a7184] text-sm mb-5">Full diabetes monitoring panel</p>
                                <ul className="space-y-2.5 flex-1">
                                    {['Diabetes', 'Thyroid', 'Liver', 'Kidney', 'Anemia', 'Blood Grouping', 'Radiology'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-[#1e2d3d]">
                                            <span className="w-4 h-4 rounded-full bg-[#7dc791] flex items-center justify-center flex-shrink-0">
                                                <Icon name="check" size={10} strokeWidth={3} />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                    <li className="text-sm text-[#12a4dd] underline mt-2">+10 More Tests</li>
                                </ul>
                                <a href="#book" className="mt-8 block text-center bg-[#7dc791] text-[#333] font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#6ab880] transition-colors">
                                    Know More →
                                </a>
                            </div>

                            {/* Premium / Platinum / Master */}
                            {[
                                { icon: 'shield', title: 'Premium Profile', desc: 'Detailed organ function monitoring' },
                                { icon: 'gem', title: 'Platinum Profile', desc: 'Diabetes + cardiac + kidney care' },
                                { icon: 'crown', title: 'Master Profile', desc: 'Maximum coverage for complex or long-term cases' },
                            ].map(({ icon, title, desc }) => (
                                <div key={title} className="flex-shrink-0 w-64 rounded-xl border border-[#c8dde8] bg-white p-6 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                                    <div className="w-10 h-10 rounded-xl bg-[#f0f9fe] text-[#12a4dd] flex items-center justify-center mb-5">
                                        <Icon name={icon} size={22} />
                                    </div>
                                    <h3 className="font-serif text-xl text-[#0d1b2a] mb-1.5">{title}</h3>
                                    <p className="text-[#5a7184] text-sm mb-auto pb-5">{desc}</p>
                                    <a href="#book" className="block text-center border border-[#c8dde8] text-[#12a4dd] font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-[#f0f9fe] hover:border-[#12a4dd] transition-colors">
                                        Know More →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ────────────────────────────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Common questions
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">Everything you want to know — before you decide.</h2>
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
                                <h3 className="font-serif text-4xl text-white mb-3 leading-tight">Visit us in Siliguri.</h3>
                                <p className="text-white/80 mb-8">Walk in for a free consultation, or call us — we&apos;ll be glad to help.</p>
                                <ul className="space-y-6 mb-7">
                                    {[
                                        { icon: 'pin', label: 'Address', value: '1st Floor, Jhankar More, Golden Heights Building, Burdwan Road, Ward 4, Mahananda Para, Siliguri, West Bengal — 734005' },
                                        { icon: 'clock', label: 'Hours', value: 'Monday – Saturday · 8:30 AM – 5:00 PM' },
                                        { icon: 'phone', label: 'Call us', value: '+91 97337 85000', href: 'tel:+919733785000' },
                                        { icon: 'chat', label: 'WhatsApp', value: '+91 97337 85000', href: 'https://wa.me/919733785000' },
                                    ].map(({ icon, label, value, href }) => (
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
                                    ))}
                                </ul>

                                <div className="mt-6 text-sm text-white/85 border-t border-white/15 pt-5 leading-relaxed">
                                    NABH Accredited · NABL Certified · 14+ Years · North Bengal&apos;s Only Specialised Diabetes Centre
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
        </>
    );
}

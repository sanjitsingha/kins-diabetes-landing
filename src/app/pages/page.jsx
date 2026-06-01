'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Stats from '../components/lp-1/stats';
import PatientStories from '../components/lp-1/patient_stories';
import Navbar from '../components/lp-1/navbar';
import PatientsVideoTestimonial from '../components/lp-1/patientsTestimonial';
import DoctorsVideo from '../components/lp-1/doctorsVideo';
import GoogleReviews from '../components/lp-1/googleReviews';
import HeroSection from '../components/lp-1/hero';
import ServicesSection from '../components/lp-1/servicesSection';
import ProblemSection2 from '../components/lp-1/ProblemsSection';

// ─── SVG Icon ─────────────────────────────────────────────────────────────────
const icons = {
    check:      (<polyline points="20 6 9 17 4 12" />),
    x:          (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
    arrowRight: (<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>),
    clock:      (<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>),
    pin:        (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
    chat:       (<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />),
    phone:      (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />),
    plus:       (<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>),
    star:       (<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />),
};

function Icon({ name, className = '', size = 20, strokeWidth = 2 }) {
    const isFilled = name === 'star';
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke={isFilled ? 'none' : 'currentColor'} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
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
            <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-[#1e2d3d] text-base hover:bg-[#f4f8fb] transition-colors" onClick={() => setOpen(!open)}>
                {question}
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#12a4dd] text-white rotate-45' : 'bg-[#f0f9fe] text-[#12a4dd]'}`}>
                    <Icon name="plus" size={14} />
                </span>
            </button>
            <div ref={bodyRef} className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: open ? (bodyRef.current?.scrollHeight || 500) + 'px' : '0px' }}>
                <p className="text-[#5a7184] text-sm leading-relaxed px-6 pb-5">{answer}</p>
            </div>
        </div>
    );
}

// ─── Doctor Flip Card ─────────────────────────────────────────────────────────
function DoctorCard({ name, role, years, tone, imageSrc, quals, specialisation, languages, available }) {
    const [flipped, setFlipped] = useState(false);
    const gradients = {
        a: 'from-[#b6e2f5] via-[#5fb4dc] to-[#0b7aaa]',
        b: 'from-[#c4d4ec] via-[#7d97c3] to-[#41527e]',
        d: 'from-[#b1e0c6] via-[#5fb188] to-[#1f7a4f]',
        e: 'from-[#d4c0ee] via-[#9978ce] to-[#6b4ca8]',
    };
    return (
        <div className="relative flex-shrink-0 w-64 h-[480px] cursor-pointer" style={{ perspective: '1400px' }} onClick={() => setFlipped(!flipped)} tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped(!flipped)}>
            <div className="relative w-full h-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#c8dde8] shadow-sm" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    <div className={`absolute inset-0 bg-gradient-to-b ${gradients[tone]} flex items-center justify-center overflow-hidden`}>
                        <img src={imageSrc} alt={name} className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-5 pb-5 pt-16 text-white">
                        <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full mb-3">{years}</span>
                        <h3 className="font-serif text-xl text-white mb-1 leading-tight">{name}</h3>
                        <div className="text-white/90 text-sm">{role}</div>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#0b7aaa] flex items-center justify-center shadow-md">
                        <Icon name="arrowRight" size={14} />
                    </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white to-[#f0f9fe] border border-[#c8dde8] p-6 flex flex-col" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <div className="text-center pb-4 border-b border-[#c8dde8] mb-4">
                        <div className="font-serif text-[#0d1b2a] text-lg leading-tight">{name}</div>
                        <div className="text-[#5a7184] text-xs mt-1">{role}</div>
                    </div>
                    <ul className="space-y-3 flex-1 flex flex-col justify-center">
                        {[{ label: 'Qualifications', val: quals }, { label: 'Specialisation', val: specialisation }, { label: 'Languages', val: languages }, { label: 'Available', val: available }].map(({ label, val }) => (
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

// ─── Static data ──────────────────────────────────────────────────────────────
const COMPARE_ROWS = [
    { feature: 'Complete care in one visit',       kins: 'Done in 7 hours',           other: 'Multiple visits needed' },
    { feature: 'Dedicated diabetes counsellor',    kins: '1-on-1 personal session',   other: 'Rarely available' },
    { feature: 'NABH accreditation',               kins: "North Bengal's only",        other: 'Not accredited' },
    { feature: 'In-house NABL lab',                kins: 'Certified, fast reports',    other: 'Sent to outside labs' },
    { feature: 'CGM device available',             kins: 'Available in-house',         other: 'Not available' },
    { feature: 'Personalised diet plan',           kins: 'Customised same day',        other: 'Generic printed sheet' },
    { feature: 'Diabetes education session',       kins: 'Every patient, every visit', other: 'Not offered' },
    { feature: 'Retina & foot screening',          kins: 'Done in-house',              other: 'Referred elsewhere' },
    { feature: 'Lifestyle modification programme', kins: 'Structured programme',       other: 'Not available' },
];

const FAQS = [
    { q: 'Can diabetes be cured?',                                    a: 'Diabetes cannot be cured, but it can be very effectively managed. With the right counselling, diet, lifestyle changes, and medical guidance, many of our patients have significantly reduced their medication dependency and live complication-free lives.' },
    { q: 'Do I need to come fasting?',                                a: 'Yes. For accurate blood sugar and HbA1c testing, please come after an 8–10 hour fast. Our team will guide you on full preparation when they call to confirm your appointment.' },
    { q: 'How long does one complete visit take?',                    a: 'A full visit at Kins Diabetes takes approximately 7 hours — from your first counselling session through to doctor consultation and your personal plan. Everything is done in one day. You leave with complete clarity.' },
    { q: 'Is Kins Diabetes only for people who already have diabetes?', a: 'Not at all. We also help people with pre-diabetes, those with a strong family history of diabetes, and anyone who wants a preventive diabetes screening. Early detection changes everything.' },
    { q: 'What will the cost be?',                                    a: 'We offer multiple health check-up profiles at different price points depending on your specific needs. Our team will explain all options clearly when they call — no hidden costs, no pressure.' },
    { q: 'Can I bring a family member with me?',                      a: 'Absolutely. We encourage family members to come along. Understanding diabetes together leads to much better lifestyle support at home.' },
    { q: 'Do I need an appointment or can I walk in?',                a: 'We strongly recommend booking in advance so our counsellors can be fully prepared for your visit and minimise your waiting time. Use the form on this page or call us directly on +91 97337 85000.' },
];

const DOCTORS = [
    { name: 'Dr. Sekhar Chakraborty', role: 'Senior Consultant · Diabetologist',  years: '25+ Years',                  tone: 'a', imageSrc: '/landing-page/doctors/dr-sekhar-web.webp',   quals: 'MBBS, MD',          specialisation: 'Type 1 & 2 Diabetes, Endocrine disorders',       languages: 'English, Bengali, Hindi', available: 'Mon – Sat · 10:00 AM – 5:00 PM' },
    { name: 'Dr. Hironmay Paul',      role: 'Senior Consultant · Diabetologist',  years: '35+ Years',                  tone: 'b', imageSrc: '/landing-page/doctors/dr-paul-web.webp',      quals: 'MBBS, MD',          specialisation: 'Diabetes management, Lifestyle disorders',        languages: 'English, Bengali, Hindi', available: 'Mon – Sat · 11:00 AM – 4:00 PM' },
    { name: 'Dr. Subhodip Pramanik',  role: 'Consultant · Endocrinology',         years: '14+ Years · Endocrinologist', tone: 'd', imageSrc: '/landing-page/doctors/dr-pramanik-web.webp', quals: 'MBBS, MD, DM (Endo)', specialisation: 'Thyroid, Diabetes, Hormonal disorders',           languages: 'English, Bengali, Hindi', available: 'Mon – Fri · 2:30 – 5:30 PM' },
    { name: 'Dr. R K Saraogi',        role: 'Consultant · Endocrinology',         years: '20+ Years · Endocrinologist', tone: 'e', imageSrc: '/landing-page/doctors/dr-ravikant-web.webp', quals: 'MBBS, MD, DM (Endo)', specialisation: 'Complex diabetes, Hormonal therapy',              languages: 'English, Hindi, Bengali', available: 'Mon – Sat · 10:00 AM – 4:00 PM' },
];

const CONTACT_ITEMS = [
    { icon: 'pin',   label: 'Address',  value: '1st Floor, Jhankar More, Golden Heights Building, Burdwan Road, Ward 4, Mahananda Para, Siliguri, West Bengal — 734005' },
    { icon: 'clock', label: 'Hours',    value: 'Monday – Saturday · 8:30 AM – 5:00 PM' },
    { icon: 'phone', label: 'Call us',  value: '+91 97337 85000', href: 'tel:+919733785000' },
    { icon: 'chat',  label: 'WhatsApp', value: '+91 97337 85000', href: 'https://wa.me/919733785000' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DiabetesCounsellingPage() {
    return (
        <>
            <Head>
                <title>Kins Diabetes — North Bengal&apos;s Most Trusted Diabetes Centre</title>
                <meta name="description" content="Complete diabetes care in one visit at North Bengal's only NABH-accredited diabetes centre." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <style>{`
                .h-scroll { display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 8px 28px 28px; margin: 0 -28px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
                .h-scroll::-webkit-scrollbar { display: none; }
                .h-scroll > * { flex: 0 0 calc(33% - 12px); scroll-snap-align: start; min-width: 220px; }
                @media (max-width: 768px) { .h-scroll > * { flex: 0 0 calc(66% - 12px); } }
                @keyframes orb-spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className="bg-white text-[#1e2d3d]">

                <Navbar />
                <HeroSection />
                <Stats />
                {/* <PatientsVideoTestimonial /> */}
                <ProblemSection2 />
                <DoctorsVideo />
                <ServicesSection />

                {/* ─── COMPARISON TABLE ─────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Why choose us
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">Kins Diabetes vs. a regular clinic — the difference is clear.</h2>
                            <p className="text-[#5a7184]">Most clinics give you a prescription and send you home. We build you a complete system.</p>
                        </div>
                        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden border border-[#c8dde8] shadow-md">
                            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[#c8dde8]">
                                <div className="px-6 py-5 font-bold text-sm" />
                                <div className="px-6 py-5 text-center bg-[#12a4dd] text-white font-bold text-sm">
                                    Kins Diabetes
                                    <span className="block text-[11px] font-medium opacity-85 mt-1 tracking-wide uppercase">NABH · NABL · 14+ Years</span>
                                </div>
                                <div className="px-6 py-5 text-center bg-[#eef2f5] text-[#5a7184] font-bold text-sm">Regular Clinic</div>
                            </div>
                            {COMPARE_ROWS.map(({ feature, kins, other }) => (
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

                {/* ─── DOCTORS ──────────────────────────────────── */}
                <section className="py-24 bg-[#f0f9fe]">
                    <div className="max-w-[1200px] mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Your care team
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">Expert doctors. Real experience. Right here in Siliguri.</h2>
                            <p className="text-[#5a7184]">Our specialists have dedicated their careers to diabetes — so you get the most informed, experienced guidance possible.</p>
                        </div>
                        <div className="h-scroll">
                            {DOCTORS.map((doc) => <DoctorCard key={doc.name} {...doc} />)}
                        </div>
                    </div>
                </section>

                <PatientStories />
                <GoogleReviews />

                {/* ─── FAQ ──────────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                                Common questions
                            </span>
                            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">Everything you want to know — before you decide.</h2>
                        </div>
                        <div className="max-w-[820px] mx-auto space-y-3.5">
                            {FAQS.map(({ q, a }) => <FaqItem key={q} question={q} answer={a} />)}
                        </div>
                    </div>
                </section>

                {/* ─── CONTACT ──────────────────────────────────── */}
                <section className="py-24 bg-[#0b7aaa] text-white" id="contact">
                    <div id="book" className="relative -top-20" />
                    <div className="max-w-[1200px] mx-auto px-7">
                        <div className="grid md:grid-cols-2 gap-14 items-start">
                            <div>
                                <h3 className="font-serif text-4xl text-white mb-3 leading-tight">Visit us in Siliguri.</h3>
                                <p className="text-white/80 mb-8">Walk in for a free consultation, or call us — we&apos;ll be glad to help.</p>
                                <ul className="space-y-6 mb-7">
                                    {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
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

"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ICONS = ['trendUp', 'help', 'tired', 'alert', 'pill', 'confused', 'shield']
const TONES = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

const CARDS = [
  { title: 'Sugar levels stay high',          desc: "Even after medicines, your HbA1c just doesn't come down." },
  { title: "Don't know which tests to do",    desc: 'Confused about what to check and how often.' },
  { title: 'Feeling tired, weak or unwell',   desc: 'Constant fatigue, frequent urination, or blurred vision.' },
  { title: 'Worried about complications',     desc: 'Fear of kidney, eye, heart or foot damage from diabetes.' },
  { title: 'Only medicines, no guidance',     desc: 'Doctors prescribe but never explain what is actually happening.' },
  { title: 'Newly diagnosed and confused',    desc: "Just found out you have diabetes and don't know where to start." },
  { title: 'Want to prevent it',              desc: 'Family history of diabetes — you want to act before it starts.' },
]

const problem = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
    };

    const icons = {
        trendUp: (<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></>),
        alert: (<><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>),
        help: (<><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>),
        confused: (<><circle cx="12" cy="12" r="10" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /></>),
        shield: (<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />),
        pill: (<><path d="M10.5 20.5L20.5 10.5a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z" /><line x1="8.5" y1="8.5" x2="15.5" y2="15.5" /></>),
        tired: (<><circle cx="12" cy="12" r="10" /><path d="M15.5 9.5l-3 0M11 9.5l-3 0" /><line x1="8" y1="15" x2="16" y2="15" /></>),
    };

    function Icon({ name, className = '', size = 20, strokeWidth = 2 }) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
                {icons[name]}
            </svg>
        );
    }

    const toneStyles = {
        a: { bg: 'from-[#ffe1e6] to-[#fdb6c0]', color: '#d62042', iconColor: '#ec1c36' },
        b: { bg: 'from-[#d6f0fb] to-[#9ed8f0]', color: '#0b7aaa', iconColor: '#12a4dd' },
        c: { bg: 'from-[#fef3c7] to-[#fcd9a0]', color: '#b25a13', iconColor: '#b25a13' },
        d: { bg: 'from-[#fde8eb] to-[#f7a5b1]', color: '#ec1c36', iconColor: '#ec1c36' },
        e: { bg: 'from-[#e5e9f3] to-[#b4c0dc]', color: '#41527e', iconColor: '#41527e' },
        f: { bg: 'from-[#f0e7fa] to-[#d4c0ee]', color: '#6b4ca8', iconColor: '#6b4ca8' },
        g: { bg: 'from-[#d9f5e7] to-[#9ad8b8]', color: '#1f7a4f', iconColor: '#1f7a4f' },
    };

    function ProblemCard({ tone, iconName, title, description }) {
        const t = toneStyles[tone];
        return (
            <div className="flex-shrink-0 w-64 rounded-xl border border-[#c8dde8] bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-md flex flex-col min-h-[380px]">
                <div className={`relative h-44 bg-linear-to-br ${t.bg} flex items-center justify-center overflow-hidden`} style={{ color: t.color }}>
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3), transparent 45%)' }} />
                    <Icon name={iconName} size={120} className="opacity-25 -rotate-[8deg]" strokeWidth={1.4} />
                </div>
                <div className="relative px-6 pb-6 flex flex-col flex-1" style={{ paddingTop: '44px' }}>
                    <div className="absolute -top-7 left-5 w-14 h-14 rounded-2xl bg-white shadow-lg border border-[#c8dde8] flex items-center justify-center" style={{ color: t.iconColor }}>
                        <Icon name={iconName} size={26} />
                    </div>
                    <h3 className="font-serif text-xl text-[#0d1b2a] leading-snug mb-2">{title}</h3>
                    <p className="text-[#5a7184] text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="pb-24 bg-[#fffef7]">
            <div className="max-w-[1200px] mx-auto px-7">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                        Do you relate to any of these?
                    </span>
                    <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">
                        We have helped thousands overcome exactly these struggles.
                    </h2>
                </div>

                <div className="flex justify-between gap-3 w-full mb-5">
                    <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full bg-white border border-[#c8dde8] shadow-sm flex items-center justify-center hover:bg-[#f5f9fc] transition">
                        <ChevronLeft size={22} className="text-[#0d1b2a]" />
                    </button>
                    <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full bg-white border border-[#c8dde8] shadow-sm flex items-center justify-center hover:bg-[#f5f9fc] transition">
                        <ChevronRight size={22} className="text-[#0d1b2a]" />
                    </button>
                </div>

                <div ref={scrollRef} className="h-scroll cursor-grab overflow-x-auto -mx-5 px-5 py-2 flex gap-7 scroll-smooth">
                    {CARDS.map((card, i) => (
                        <ProblemCard key={i} tone={TONES[i]} iconName={ICONS[i]} title={card.title} description={card.desc} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default problem;

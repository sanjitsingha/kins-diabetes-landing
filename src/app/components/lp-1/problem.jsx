"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const problem = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left: direction === "left" ? -320 : 320,
            behavior: "smooth",
        });
    };

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
    };

    function Icon({ name, className = '', size = 20, strokeWidth = 2 }) {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
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
                <div
                    className={`relative h-44 bg-gradient-to-br ${t.bg} flex items-center justify-center overflow-hidden`}
                    style={{ color: t.color }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3), transparent 45%)'
                        }}
                    />

                    <Icon
                        name={iconName}
                        size={120}
                        className="opacity-25 -rotate-[8deg]"
                        strokeWidth={1.4}
                    />
                </div>

                <div className="relative px-6 pb-6 flex flex-col flex-1" style={{ paddingTop: '44px' }}>
                    <div
                        className="absolute -top-7 left-5 w-14 h-14 rounded-2xl bg-white shadow-lg border border-[#c8dde8] flex items-center justify-center"
                        style={{ color: t.iconColor }}
                    >
                        <Icon name={iconName} size={26} />
                    </div>

                    <h3 className="font-serif text-xl text-[#0d1b2a] leading-snug mb-2">
                        {title}
                    </h3>

                    <p className="text-[#5a7184] text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="py-24 bg-[#fffef7]">
            <div className="max-w-[1200px] mx-auto px-7">

                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
                        Do you relate to any of these?
                    </span>

                    <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">
                        We have helped thousands overcome exactly these struggles.
                    </h2>
                </div>

                {/* Scroll Buttons */}
                <div className="flex justify-between gap-3 w-full  mb-5">
                    <button
                        onClick={() => scroll("left")}
                        className="w-12 h-12 rounded-full bg-white border border-[#c8dde8] shadow-sm flex items-center justify-center hover:bg-[#f5f9fc] transition"
                    >
                        <ChevronLeft size={22} className="text-[#0d1b2a]" />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="w-12 h-12 rounded-full bg-white border border-[#c8dde8] shadow-sm flex items-center justify-center hover:bg-[#f5f9fc] transition"
                    >
                        <ChevronRight size={22} className="text-[#0d1b2a]" />
                    </button>
                </div>

                {/* Cards */}
                <div
                    ref={scrollRef}
                    className="h-scroll cursor-grab overflow-x-auto -mx-5 px-5 py-2 flex gap-7 scroll-smooth"
                >
                    {[
                        {
                            tone: 'a',
                            iconName: 'trendUp',
                            title: 'Sugar levels stay high',
                            description: 'Even after medicines, your HbA1c just doesn\'t come down.'
                        },
                        {
                            tone: 'b',
                            iconName: 'help',
                            title: "Don't know which tests to do",
                            description: 'Confused about what to check and how often.'
                        },
                        {
                            tone: 'c',
                            iconName: 'tired',
                            title: 'Feeling tired, weak or unwell',
                            description: 'Constant fatigue, frequent urination, or blurred vision.'
                        },
                        {
                            tone: 'd',
                            iconName: 'alert',
                            title: 'Worried about complications',
                            description: 'Fear of kidney, eye, heart or foot damage from diabetes.'
                        },
                        {
                            tone: 'e',
                            iconName: 'pill',
                            title: 'Only medicines, no guidance',
                            description: "Doctors prescribe but never explain what is actually happening."
                        },
                        {
                            tone: 'f',
                            iconName: 'confused',
                            title: 'Newly diagnosed and confused',
                            description: "Just found out you have diabetes and don't know where to start."
                        },
                        {
                            tone: 'g',
                            iconName: 'shield',
                            title: 'Want to prevent it',
                            description: 'Family history of diabetes — you want to act before it starts.'
                        },
                    ].map((p) => (
                        <ProblemCard key={p.title} {...p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default problem;
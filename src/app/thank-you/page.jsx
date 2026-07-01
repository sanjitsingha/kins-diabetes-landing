"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function PhoneIcon({ className = "" }) {  
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const STEPS = [
  { num: "1", title: "We Review Your Details", desc: "Our team looks over your request and matches you with the right specialist." },
  { num: "2", title: "We Call You", desc: "Expect a call from our care team within a few hours to confirm your slot." },
  { num: "3", title: "Your Appointment is Set", desc: "Visit us at your scheduled time and start your personalised diabetes care journey." },
];

export default function ThankYouPage() {
const fired = useRef(false);

useEffect(() => {
   if (fired.current) return;
    fired.current = true;

  const params = new URLSearchParams(window.location.search);

  // ── Google Ads Conversion ──────────────────────
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "conversion_lead",
      page_path: "/thank-you",
    });
  }

  // ── META Pixel CompleteRegistration ───────────
  if (typeof fbq === "function") {
    fbq("track", "CompleteRegistration", {
      content_name: "Consultation Booked",
      currency: "INR",
      value: 500,
      status: true,
      ph: params.get("ph") || "",
      fn: params.get("fn") || "",
      ct: params.get("ct") || "",
    });
  }
}, []);
  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#0d1c2e] flex flex-col">

      {/* ── HEADER ──────────────────────────────────── */}
      <header className="bg-white border-b border-[#e2e8ed] px-10 max-sm:px-4 h-[72px] flex items-center sticky top-0 z-50">
        <Link href="/" className="flex items-center">
          <Image src="/landing-page/kd-logo.png" alt="Kins Diabetes" width={200} height={46} className="h-11 w-auto" priority />
        </Link>
      </header>

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-16 max-sm:py-10">

        {/* Success card */}
        <div className="bg-white rounded-[24px] shadow-[0_4px_40px_rgba(0,0,0,0.09)] w-full max-w-[600px] overflow-hidden">

          {/* Green-ish top band */}
          <div className="bg-gradient-to-r from-[#00b8d4] to-[#0099b2] px-8 pt-10 pb-14 text-center text-white">
            <div className="w-[76px] h-[76px] bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" className="w-[38px] h-[38px]" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-serif text-[clamp(24px,5vw,34px)] leading-[1.2] mb-2">
              You&apos;re All Set!
            </h1>
            <p className="text-white/85 text-[15px] leading-[1.65] max-w-[380px] mx-auto">
              We&apos;ve received your appointment request. Our expert diabetes care team will call you very soon.
            </p>
          </div>

          {/* Body */}
          <div className="px-8 pt-8 pb-10 max-sm:px-5 -mt-6">

            {/* "What happens next" card */}
            <div className="bg-[#f1f8fc] rounded-[16px] p-6 mb-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#0099b2] mb-5">
                What Happens Next?
              </h2>
              <div className="flex flex-col gap-5">
                {STEPS.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#00b8d4] text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0d1c2e] leading-snug">{step.title}</p>
                      <p className="text-[13px] text-[#56687a] mt-0.5 leading-[1.55]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call-out pill */}
            <div className="flex items-center gap-3 bg-[#e4f7fb] border border-[rgba(0,184,212,0.3)] rounded-[12px] py-3.5 px-5 mb-7">
              <PhoneIcon className="w-5 h-5 text-[#00b8d4] shrink-0" />
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#0099b2]">Our Team Will Call You Shortly</p>
                <p className="text-[13px] text-[#56687a]">Keep your phone handy — we usually reach out within a few hours.</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 h-[50px] rounded-full border-[1.5px] border-[#e2e8ed] text-[14.5px] font-semibold text-[#56687a] flex items-center justify-center hover:border-[#00b8d4] hover:text-[#00b8d4] transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/book-appointment"
                className="flex-1 h-[50px] rounded-full bg-[#00b8d4] hover:bg-[#0099b2] text-white text-[14.5px] font-semibold flex items-center justify-center transition-colors shadow-[0_4px_20px_rgba(0,184,212,0.3)]"
              >
                Book Another Appointment
              </Link>
            </div>

          </div>
        </div>

        {/* NABH badge */}
        <p className="mt-8 text-[12.5px] text-[#a0b0bc] text-center">
          North Bengal&apos;s Only <span className="font-semibold text-[#56687a]">NABH Accredited</span> Diabetes Centre · Siliguri
        </p>

      </main>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="py-6 text-center border-t border-[#e2e8ed]">
        <p className="text-[12.5px] text-[#a0b0bc]">
          © 2025 Kins Diabetes — The Sugar Experts · Siliguri, North Bengal{" "}
          <span className="mx-1">|</span>{" "}
          <a href="https://www.kinsdiabetes.com" className="text-[#00b8d4] font-medium hover:underline">
            kinsdiabetes.com
          </a>
        </p>
      </footer>

    </div>
  );
}

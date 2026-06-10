'use client'
import React from 'react'

export default function CTASection() {
  return (
    <section className="px-4 hidden md:block pb-10 pt-24 md:pt-28">
      <div className="max-w-[1200px] mx-auto relative">

        {/* Card — overflow-hidden for rounded clip, gradient bg */}
        <div
          className="rounded-3xl overflow-hidden min-h-[200px] md:min-h-[220px] flex items-center"
          style={{
            background: 'linear-gradient(135deg, #0d1b2a 0%, #0d1b2a 45%, #0e6ea8 100%)',
          }}
        >
          {/* Left: CTA text + button */}
          <div className="flex-1 p-8 md:p-12 z-10 relative">
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-[#12a4dd] mb-3 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
              Free Consultation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
              Book a Free<br />Counselling Now
            </h2>
            <p className="text-white/65 text-sm mb-7 max-w-sm leading-relaxed">
              Take the first step toward better diabetes control — speak to our specialists, no charge.
            </p>
            <a
              href="tel:+919832012345"
              className="inline-flex items-center gap-2.5 bg-[#12a4dd] hover:bg-[#0e8ec2] active:scale-95 text-white font-semibold px-7 py-3.5 rounded-full transition-all text-sm shadow-lg shadow-[#12a4dd]/30"
            >
              Book Free Session
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Spacer so content doesn't slide under the doctor image */}
          <div className="hidden md:block w-[260px] lg:w-[320px] shrink-0" />
        </div>

        {/* Doctor image — sits OUTSIDE overflow-hidden so head pokes above the card */}
        <div className="hidden md:block absolute right-10 lg:right-0 bottom-0 w-60 lg:w-[600px] pointer-events-none select-none"
          style={{ height: '120%' }}
        >
          <img
            src="/landing-page/doctors-png/doctor-all.png.png"
            alt="Doctor"
            
            className="w-full h-full object-contain object-bottom grayscale"
          />
        </div>

      </div>
    </section>
  )
}

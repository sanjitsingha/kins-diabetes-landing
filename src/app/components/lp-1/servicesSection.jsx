'use client'
import React from 'react'

const STACK_OFFSET = 44
const NAVBAR_H     = 84

const CARD_META = [
  { gradient: 'from-blue-800 via-blue-500 to-blue-300',       numColor: 'text-blue-300/20'   },
  { gradient: 'from-slate-800 via-slate-600 to-slate-400',    numColor: 'text-slate-300/20'  },
  { gradient: 'from-amber-800 via-amber-600 to-amber-400',    numColor: 'text-amber-300/20'  },
  { gradient: 'from-purple-800 via-purple-600 to-purple-400', numColor: 'text-purple-300/20' },
]

const cards = [
  {
    title: "Doctor's Consultation",
    desc: 'Expert diabetologists and endocrinologists available 6 days a week — every plan personalised to your case.',
    tags: ['Hassle-free appointments', 'Specialist diabetologists'],
  },
  {
    title: 'Advanced Diagnostics',
    desc: 'NABL-certified in-house lab — accurate results, same day, no outside lab needed.',
    tags: [],
  },
  {
    title: 'Patient Counselling',
    desc: 'A dedicated counsellor who understands your life — and builds a plan that actually fits it.',
    tags: [],
  },
  {
    title: 'Diabetes Education',
    desc: 'Understand your diabetes — food, stress and sleep explained.',
    tags: [],
  },
]

export default function ServicesSection() {
  return (
    <div className="w-full bg-[#f4f8fb]">
      <div className="max-w-[1200px] mx-auto px-4 py-20">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
            Complete Diabetes Solution
          </span>
          <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">
            Stop running between clinics — everything you need is right here.
          </h2>
          <p className="text-[#5a7184]">From screening to specialist care, every service you need is available in-house.</p>
        </div>

        <div>
          {cards.map((card, i) => {
            const meta = CARD_META[i]
            return (
              <div
                key={i}
                className="sticky md:w-[70%] border-white border mx-auto h-[300px] shadow-2xl/10 rounded-3xl overflow-hidden mb-30"
                style={{ top: `${NAVBAR_H + i * STACK_OFFSET}px` }}
              >
                <div className="w-full h-full p-6 translate-y-20 bg-white transition-transform duration-300">
                  <p className='text-2xl text-[#12a4dd]'>{card.title}</p>
                  <div className="w-full flex mt-12">
                    <div className="flex-1 min-w-0">
                      <p className='text-[#5a7184] text-base leading-relaxed line-clamp-3'>{card.desc}</p>
                      {card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3 items-center mt-6">
                          {card.tags.map((tag, j) => (
                            <p key={j} className='text-sm bg-[#12a4dd]/10 text-[#12a4dd] px-3 py-1 rounded-full whitespace-nowrap'>
                              {tag}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className={`w-[30%] font-bold ${meta.numColor} text-[200px] leading-none select-none text-right shrink-0`}>
                      #{i + 1}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

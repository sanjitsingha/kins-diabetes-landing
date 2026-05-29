'use client'
import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const STACK_OFFSET = 44   // px each card peeks from behind the next
const NAVBAR_H     = 84   // px — clears the fixed navbar

// Gradient + number colour per card (9 total)
const CARD_META = [
  { gradient: 'from-blue-800 via-blue-500 to-blue-300',       numColor: 'text-blue-300/20'    },
  { gradient: 'from-slate-800 via-slate-600 to-slate-400',    numColor: 'text-slate-300/20'   },
  { gradient: 'from-amber-800 via-amber-600 to-amber-400',    numColor: 'text-amber-300/20'   },
  { gradient: 'from-emerald-800 via-emerald-600 to-emerald-400', numColor: 'text-emerald-300/20' },
  { gradient: 'from-purple-800 via-purple-600 to-purple-400', numColor: 'text-purple-300/20'  },
  { gradient: 'from-red-800 via-red-500 to-red-400',          numColor: 'text-red-300/20'     },
  { gradient: 'from-teal-800 via-teal-600 to-teal-400',       numColor: 'text-teal-300/20'    },
  { gradient: 'from-rose-800 via-rose-600 to-rose-400',       numColor: 'text-rose-300/20'    },
  { gradient: 'from-gray-900 via-gray-700 to-gray-500',       numColor: 'text-gray-400/20'    },
]

export default function ServicesSection() {
  const { lang } = useLanguage()
  const tx = translations[lang]

  const cards = [
    {
      title: tx.services.featuredTitle,
      desc:  tx.services.featuredDesc,
      tags:  tx.services.featuredTags,
    },
    ...tx.services.items.map(item => ({
      title: item.title,
      desc:  item.desc,
      tags:  [],
    })),
  ]

  return (
    <div className="w-full bg-[#f4f8fb]">
      <div className="max-w-[1200px] mx-auto px-7 py-20">

        {/* Section header — same as original */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
            {tx.services.eyebrow}
          </span>
          <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight mb-4">{tx.services.h2}</h2>
          <p className="text-[#5a7184]">{tx.services.sub}</p>
        </div>

        {/* Stacking cards — same card design, added sticky positioning */}
        <div>
          {cards.map((card, i) => {
            const meta = CARD_META[i]
            return (
              <div
                key={i}
                className={`sticky w-[70%] border-white border mx-auto rotate-2 h-[300px] bg-linear-to-b/srgb ${meta.gradient} mb-50  rounded-3xl overflow-hidden`}
                style={{ top: `${NAVBAR_H + i * STACK_OFFSET}px` }}
              >
                {/* Inner white panel — same translate-y trick as your original */}
                <div className="w-full bg-gray-50 h-full p-6 translate-y-[80px] transition-transform duration-300">
                  <div className='text-2xl font-semibold -mt-20 text-white'>{card.title}</div>

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

                    {/* Large watermark number — same as your original */}
                    <p className={`w-[30%] font-bold ${meta.numColor} text-[200px] leading-none select-none text-right shrink-0`}>
                      #{i + 1}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Spacer so the last card has room to fully reveal before the section ends */}
        <div style={{ height: `${(cards.length - 1) * STACK_OFFSET + 300}px` }} />
      </div>
    </div>
  )
}

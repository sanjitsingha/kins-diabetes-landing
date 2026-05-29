'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const DOCTORS = [
  { doctor: 'Dr. Sekhar Chakraborty', designation: 'Senior Consultant · Diabetologist', youtubeId: 'YnxB8L76R_0' },
  { doctor: 'Dr. Hironmay Paul',      designation: 'Senior Consultant · Diabetologist', youtubeId: 'IGGsY7jHkMU' },
]

const DoctorsVideo = () => {
  const { lang } = useLanguage()
  const tx = translations[lang].doctorsVideo
  const videos = DOCTORS.map((d, i) => ({ ...d, ...tx.videos[i] }))
  return (
    <div className="w-full bg-[#f4f8fb]">
      <div className="max-w-[1200px] mx-auto px-7 py-20">

        {/* Section header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
            {tx.eyebrow}
          </span>
          <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">
            {tx.h2}
          </h2>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.15}
          grabCursor
          breakpoints={{
            768: { slidesPerView: 1.3, spaceBetween: 24 },
          }}
        >
          {videos.map((v, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl border border-[#c8dde8] shadow-sm overflow-hidden">
                {/* Mobile: stacked. Desktop: video wider (1.3fr) + compact info */}
                <div className="flex flex-col md:grid md:grid-cols-[1.3fr_1fr]">

                  {/* YouTube embed — fixed h on mobile for consistent height, aspect-video on desktop */}
                  <div className="relative w-full h-42 md:h-auto md:aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  {/* Info panel */}
                  <div className="p-6 flex flex-col justify-between gap-4 min-h-[300px] md:min-h-[260px]">
                    <div>
                      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#12a4dd] mb-2">
                        {tx.cardLabel}
                      </span>
                      <h3 className="font-serif text-lg text-[#0d1b2a] leading-snug mb-2">
                        {v.title}
                      </h3>
                      <p className="text-[#5a7184] text-xs leading-relaxed">
                        {v.description}
                      </p>
                    </div>

                    {/* Doctor identity */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#e8f3f9]">
                      <div className="w-8 h-8 rounded-full bg-[#d6f0fb] flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0b7aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-[#0d1b2a] text-xs">{v.doctor}</div>
                        <div className="text-[#5a7184] text-xs mt-0.5">{v.designation}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  )
}

export default DoctorsVideo

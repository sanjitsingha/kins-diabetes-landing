'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const VIDEOS = [
  {
    youtubeId: 'YnxB8L76R_0',
    doctor: 'Dr. Sekhar Chakraborty',
    designation: 'Senior Consultant · Diabetologist',
    title: 'Understanding Diabetes Management',
    description: 'Dr. Sekhar Chakraborty explains how to effectively manage Type 2 diabetes through lifestyle changes, proper medication, and continuous monitoring.',
  },
  {
    youtubeId: 'IGGsY7jHkMU',
    doctor: 'Dr. Hironmay Paul',
    designation: 'Senior Consultant · Diabetologist',
    title: 'Nutrition & Diet for Diabetics',
    description: 'Dr. Hironmay Paul walks you through the role of nutrition in controlling blood sugar levels, debunking common myths and providing practical dietary advice.',
  },
]

const DoctorsVideo = () => {
  return (
    <div className="w-full bg-[#f4f8fb]">
      <div className="max-w-[1200px] mx-auto px-7 py-20">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
            Doctor Insights
          </span>
          <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">
            Hear it from our doctors.
          </h2>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.15}
          grabCursor
          breakpoints={{ 768: { slidesPerView: 1.3, spaceBetween: 24 } }}
        >
          {VIDEOS.map((v, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl border border-[#c8dde8] shadow-sm overflow-hidden">
                <div className="flex flex-col md:grid md:grid-cols-[1.3fr_1fr]">
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
                  <div className="p-6 flex flex-col justify-between gap-4 min-h-[300px] md:min-h-[260px]">
                    <div>
                      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#12a4dd] mb-2">
                        Doctor Video
                      </span>
                      <h3 className="font-serif text-lg text-[#0d1b2a] leading-snug mb-2">{v.title}</h3>
                      <p className="text-[#5a7184] text-xs leading-relaxed">{v.description}</p>
                    </div>
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

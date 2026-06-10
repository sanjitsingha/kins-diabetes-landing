'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const REVIEWS = [
  { name: 'Ramesh Rai',    date: 'April 2026',     rating: 5, review: 'Its been 10 years that i m doing my check up here all services are good , staffs are polite and good mannered', initials: 'RR', color: '#4285F4' },
  { name: 'Pushpa Pradhan',    date: 'February 2026',  rating: 5, review: "We use to consult another clinic before but we saw a Facebook ad and we came here to see how the service are and after coming here in kins diabetes all very very good from service to faculty behavior everything is well managed 👍. You'll can also visit kins diabetes", initials: 'PP', color: '#34A853' },
  { name: 'Sita Chettri',      date: 'January 2024',   rating: 5, review: "I saw a facebook ad and I came here for a whole body check up everything here is very well managed and very kind and helpful staffs thank you for the outstanding services and support", initials: 'SC', color: '#EA4335' },
  { name: 'Priyadarshan Chettri',      date: 'December 2023',  rating: 5, review: "Kins has helped me a lot in my health journey and all facilities are available canteen, all staffs are very friendly and under one roof doctor is also available", initials: 'PC', color: '#FBBC05' },
  { name: 'Sunita Rai',      date: 'November 2023',  rating: 4, review: 'Very good experience overall. The doctors are knowledgeable and the wait time is reasonable. My diabetes management has improved a lot since I started coming here.', initials: 'SR', color: '#4285F4' },
  { name: 'Debashis Paul',   date: 'October 2023',   rating: 5, review: 'Excellent clinic with caring doctors. They monitor progress regularly and adjust treatment accordingly. I feel confident that my health is in good hands at Kins.', initials: 'DP', color: '#34A853' },
  { name: 'Lakshmi Agarwal', date: 'September 2023', rating: 5, review: 'I was struggling with my sugar levels for years before coming here. Within 3 months, my numbers were finally stable. Truly life-changing experience.', initials: 'LA', color: '#EA4335' },
]

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map((star) => (
      <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill={star <= rating ? '#FBBC05' : '#e2e8f0'}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
)

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

const GoogleReviews = () => {
  return (
    <div className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 30%, #e0f2fe 60%, #f8fafc 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #12a4dd 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #0d6efd 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)', filter: 'blur(50px)' }} />
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #0d1b2a 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="max-w-[1200px] mx-auto px-7 py-30 relative z-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
              Google Reviews
            </span>
            <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">What Our Patients Say</h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl px-5 py-3 self-start md:self-auto">
            <GoogleLogo />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0d1b2a] text-lg leading-none">4.8</span>
                <div><StarRating rating={5} /></div>
              </div>
              <div className="text-[#5a7184] text-xs mt-0.5">Based on 1,400+ reviews</div>
            </div>
          </div>
        </div>

        <div className="-mr-7 md:mr-0">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          grabCursor
          loop
          autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{ 768: { slidesPerView: 3.1, spaceBetween: 20 } }}
        >
          {REVIEWS.map((r, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 shadow-md shadow-blue-100/50 rounded-xl p-5 py-10 mt-10 flex flex-col gap-3 min-h-[350px]">
                <div className="flex items-center mb-4 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: r.color }}>
                      {r.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[#0d1b2a] capitalize text-sm leading-tight">{r.name}</div>
                      <div className="text-[#94a3b8] text-xs mt-0.5">{r.date}</div>
                    </div>
                  </div>
                  <GoogleLogo />
                </div>
                <div><StarRating rating={r.rating} /></div>
                <p className="text-[#5a7184] text-sm leading-relaxed flex-1 mt-3">"{r.review}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </div>
  )
}

export default GoogleReviews

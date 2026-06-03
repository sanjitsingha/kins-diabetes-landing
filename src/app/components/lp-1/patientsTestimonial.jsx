'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const VIDEOS = [
  '/patientsVideo/PTV1.mp4',
  '/patientsVideo/PTV2.mp4',
  '/patientsVideo/PTV3.mp4',
  '/patientsVideo/PTV4.mp4',

]

const VideoCard = ({ src }) => {
  const videoRef     = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying]   = useState(false)
  const [mounted, setMounted]       = useState(false)
  const [pendingPlay, setPendingPlay] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); observer.disconnect() } },
      { rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (mounted && pendingPlay) {
      const video = videoRef.current
      if (video) { video.play(); setIsPlaying(true); setPendingPlay(false) }
    }
  }, [mounted, pendingPlay])

  const togglePlay = () => {
    if (!mounted) { setMounted(true); setPendingPlay(true); return }
    const video = videoRef.current
    if (!video) return
    if (video.paused) { video.play(); setIsPlaying(true) }
    else              { video.pause(); setIsPlaying(false) }
  }

  return (
    <div ref={containerRef} className="relative w-full rounded-xl overflow-hidden bg-black aspect-9/16">
      {mounted && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0.01 }}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <div className={`
          w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center
          transition-all duration-200 group-hover:bg-[#12a4dd] group-hover:scale-110
          ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
        `}>
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <rect x="5" y="3" width="4" height="18" rx="1" />
              <rect x="15" y="3" width="4" height="18" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
      </button>
    </div>
  )
}

const PatientsTestimonial = () => {
  const swiperRef = useRef(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const updateNavState = (swiper) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-7 md:px-0 py-14 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#12a4dd] mb-4 before:content-[''] before:w-7 before:h-0.5 before:bg-[#12a4dd] before:rounded">
            Patient Videos
          </span>
          <h2 className="font-serif text-4xl text-[#0d1b2a] leading-tight">
            We have helped thousands overcome exactly these struggles.
          </h2>
        </div>

        <div className="relative md:px-14">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            aria-label="Previous"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:border-[#12a4dd] hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <Swiper
            modules={[Pagination]}
            onSwiper={(swiper) => { swiperRef.current = swiper; updateNavState(swiper) }}
            onSlideChange={updateNavState}
            spaceBetween={20}
            slidesPerView={1.25}
            grabCursor
            pagination={{ clickable: false }}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {VIDEOS.map((src, i) => (
              <SwiperSlide key={i}>
                <VideoCard src={src} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            aria-label="Next"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:border-[#12a4dd] hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientsTestimonial

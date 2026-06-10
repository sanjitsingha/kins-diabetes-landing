'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const VIDEOS = [
  'https://res.cloudinary.com/diathbaqh/video/upload/q_auto:good,f_auto/v1780475508/PTV1_jtglnt.mp4',
  'https://res.cloudinary.com/diathbaqh/video/upload/q_auto:good,f_auto/v1780475512/PTV2_zgiy64.mp4',
  'https://res.cloudinary.com/diathbaqh/video/upload/q_auto:good,f_auto/v1780475503/PTV3_byiphp.mp4',
  'https://res.cloudinary.com/diathbaqh/video/upload/q_auto:good,f_auto/v1780475502/PTV4_houhnl.mp4',
]

// ── VideoCard ──────────────────────────────────────────────────────────────────
const VideoCard = ({ src, isActive, onEnded, onManualPlay }) => {
  const videoRef     = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted]     = useState(false)
  const [muted, setMuted]         = useState(true)

  // Sync muted state → DOM imperatively.
  // React's `muted` prop does not update the DOM property after initial mount,
  // so we bypass it entirely and drive video.muted from this effect.
  useEffect(() => {
    const video = videoRef.current
    if (video) video.muted = muted
  }, [muted])

  // Lazy-mount when card enters viewport
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

  // Drive playback from isActive prop
  useEffect(() => {
    if (isActive) {
      if (!mounted) { setMounted(true); return } // re-fires below once mounted flips
      const video = videoRef.current
      if (!video) return
      // Set muted directly before play() so the browser sees it immediately
      video.muted = true
      setMuted(true)
      video.currentTime = 0
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      const video = videoRef.current
      if (video && !video.paused) { video.pause(); video.currentTime = 0; setIsPlaying(false) }
    }
  }, [isActive, mounted])

  const togglePlay = () => {
    onManualPlay?.()
    const video = videoRef.current
    if (!video) { setMounted(true); return }
    if (video.paused) { video.play().then(() => setIsPlaying(true)).catch(() => {}) }
    else              { video.pause(); setIsPlaying(false) }
  }

  // Use React state as the single source of truth for muted.
  // The useEffect above syncs it to the DOM — no direct video.muted reads here.
  const toggleMute = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setMuted(prev => !prev)
  }

  return (
    <div ref={containerRef} className="relative w-full rounded-xl overflow-hidden bg-black aspect-9/16">
      {mounted && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          muted
          onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0.01 }}
          onEnded={() => { setIsPlaying(false); onEnded?.() }}
          onClick={togglePlay}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Play / Pause overlay */}
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
          {isPlaying
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="5" y="3" width="4" height="18" rx="1"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </div>
      </button>

      {/* Mute toggle — z-20 ensures it sits above the inset-0 play overlay */}
      {isPlaying && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#12a4dd] active:scale-90 transition-all touch-manipulation"
        >
          {muted
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          }
        </button>
      )}

      {/* "Tap to unmute" hint */}
      {isPlaying && muted && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 rounded-full px-2.5 py-1 pointer-events-none">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          <span className="text-white text-[10px] font-medium">Tap 🔊 to unmute</span>
        </div>
      )}
    </div>
  )
}

// ── PatientsTestimonial ────────────────────────────────────────────────────────
const PatientsTestimonial = () => {
  const swiperRef   = useRef(null)
  const sectionRef  = useRef(null)
  const hasStarted  = useRef(false)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd]             = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const updateNavState = (swiper) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  // Auto-start when section reaches center of viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          setActiveIndex(0)
          observer.disconnect()
        }
      },
      { rootMargin: '-25% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Slide Swiper to match active video (e.g. auto-advance on ended)
  useEffect(() => {
    if (activeIndex >= 0) swiperRef.current?.slideTo(activeIndex, 500)
  }, [activeIndex])

  const handleEnded = (i) => {
    setActiveIndex(i + 1 < VIDEOS.length ? i + 1 : -1)
  }

  return (
    <div ref={sectionRef} className="w-full bg-white">
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
            onSlideChange={(swiper) => {
              updateNavState(swiper)
              // Auto-play the newly active slide when user swipes
              setActiveIndex(swiper.activeIndex)
            }}
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
                <VideoCard
                  src={src}
                  isActive={activeIndex === i}
                  onEnded={() => handleEnded(i)}
                  onManualPlay={() => setActiveIndex(i)}
                />
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

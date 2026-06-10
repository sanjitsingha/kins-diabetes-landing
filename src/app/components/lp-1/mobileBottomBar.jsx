'use client'
import { useState, useEffect } from 'react'

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* subtle top shadow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#12a4dd]/30 to-transparent" />

      <div className="bg-white/95 backdrop-blur-md px-4 py-3 flex items-center gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.10)]">

        {/* CTA button — takes up most of the bar */}
        <a
          href="tel:+919733785000"
          className="flex-1 flex items-center justify-center gap-2 bg-[#12a4dd] hover:bg-[#0e8ec2] active:scale-95 text-white font-semibold text-sm px-5 py-3.5 rounded-full transition-all shadow-md shadow-[#12a4dd]/25"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
          </svg>
          Book Free Counselling
        </a>

        {/* WhatsApp icon button */}
        <a
          href="https://wa.me/919733785000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#25D366] active:scale-95 shadow-md shadow-[#25D366]/30 transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.463.644 4.775 1.77 6.782L2 30l7.418-1.74A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.45 11.45 0 0 1-5.836-1.596l-.418-.248-4.402 1.033 1.057-4.29-.272-.44A11.46 11.46 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.345-.173-2.04-1.006-2.356-1.12-.317-.114-.547-.172-.778.173-.23.345-.893 1.12-1.094 1.35-.2.23-.403.26-.748.087-.345-.173-1.456-.537-2.773-1.71-1.025-.913-1.717-2.04-1.918-2.384-.2-.345-.021-.53.15-.702.155-.155.345-.403.518-.604.172-.2.23-.345.345-.575.114-.23.057-.432-.029-.604-.087-.173-.778-1.876-1.065-2.57-.28-.674-.565-.582-.778-.593l-.662-.011c-.23 0-.604.086-.92.43-.317.346-1.208 1.18-1.208 2.876s1.237 3.337 1.41 3.567c.172.23 2.434 3.716 5.898 5.21.824.356 1.467.568 1.968.728.826.263 1.578.226 2.173.137.663-.099 2.04-.833 2.328-1.638.287-.805.287-1.495.2-1.638-.086-.143-.316-.23-.66-.403z" />
          </svg>
        </a>

      </div>

      {/* Safe area spacer for phones with home indicator */}
      <div className="bg-white/95 h-safe-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </div>
  )
}

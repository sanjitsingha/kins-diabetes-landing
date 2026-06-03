"use client";

import React, { useEffect, useState, useRef } from 'react'
import { Globe } from 'lucide-react'

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिंदी',   short: 'HI' },
  { code: 'bn', label: 'বাংলা',   short: 'BN' },
]

function LanguageSwitcher() {
  const [open, setOpen]       = useState(false)
  const [current, setCurrent] = useState('en')
  const ref = useRef(null)

  useEffect(() => {
    const lang = new URLSearchParams(window.location.search).get('lang') || 'en'
    setCurrent(lang)
  }, [])

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function selectLang(code) {
    setOpen(false)
    if (code === current) return

    // Always clear old cookie first across all domain variants
    const exp = 'expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/'
    document.cookie = 'googtrans=; ' + exp
    document.cookie = 'googtrans=; ' + exp + '; domain=' + location.hostname
    document.cookie = 'googtrans=; ' + exp + '; domain=.' + location.hostname

    const url = new URL(window.location.href)

    if (code !== 'en') {
      // Set cookie with and without domain so Google Translate finds it
      document.cookie = 'googtrans=/en/' + code + '; path=/'
      document.cookie = 'googtrans=/en/' + code + '; path=/; domain=.' + location.hostname
      url.searchParams.set('lang', code)
    } else {
      url.searchParams.delete('lang')
    }

    // Always full-reload so Google Translate picks up the fresh cookie state
    window.location.href = url.toString()
  }

  const active = LANGS.find(l => l.code === current) || LANGS[0]

  return (
    <div ref={ref} className="relative" translate="no">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 h-9 px-3 rounded-full border border-[#c8dde8] bg-white hover:bg-[#f0f8fd] transition-colors text-sm font-semibold text-[#0d1b2a]"
      >
        <Globe size={14} className="text-[#12a4dd]" strokeWidth={2.2} />
        <span className="tracking-wide">{active.short}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-[#c8dde8] rounded-2xl shadow-xl overflow-hidden z-50">
          {LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => selectLang(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors
                ${current === lang.code
                  ? 'bg-[#f0f8fd] text-[#12a4dd] font-semibold'
                  : 'text-[#0d1b2a] hover:bg-[#f5f9fc]'
                }`}
            >
              {lang.label}
              {current === lang.code && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#12a4dd]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false)
      else setShowNavbar(true)
      setLastScrollY(window.scrollY)
    }
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <header
      translate="no"
      className={`fixed top-0 left-0 w-full z-50 border-b border-[#c8dde8] bg-white/95 backdrop-blur-md transition-transform duration-500 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Hidden Google Translate mount point — must stay in DOM */}
      <div id="google_translate_element" className="hidden" />

      <div className="max-w-[1200px] px-6 mx-auto md:px-7 h-[76px] flex items-center justify-between gap-4">
        <a href="/" className="md:h-[42px] h-[30px] shrink-0">
          <img src="/landing-page/kd-logo.png" alt="Kins Diabetes" className="h-full w-auto" />
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="/book-appointment"
            className="bg-[#12a4dd] md:block hidden hover:bg-[#0b7aaa] text-white font-semibold text-sm px-3 md:px-5 md:py-3 py-2 rounded-full transition-colors shadow-[0_6px_18px_-6px_rgba(18,164,221,0.55)] whitespace-nowrap"
          >
            Book Free Counselling
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar

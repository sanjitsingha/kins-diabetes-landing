'use client'
import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'bn', label: 'বাংলা',   short: 'বাং' },
  { code: 'hi', label: 'हिन्दी',  short: 'हि' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGS.find(l => l.code === lang) || LANGS[0]

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c8dde8] bg-white text-sm font-medium text-[#1e2d3d] hover:border-[#12a4dd] hover:text-[#12a4dd] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{current.short}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl border border-[#c8dde8] shadow-lg overflow-hidden z-50">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors
                ${lang === l.code
                  ? 'bg-[#f0f9fe] text-[#12a4dd] font-semibold'
                  : 'text-[#1e2d3d] hover:bg-[#f4f8fb]'
                }`}
            >
              <span className="w-7 text-xs font-bold text-center opacity-60">{l.short}</span>
              {l.label}
              {lang === l.code && (
                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#12a4dd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

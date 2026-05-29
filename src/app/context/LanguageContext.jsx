'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const VALID = ['en', 'bn', 'hi']

function readLang() {
  if (typeof window === 'undefined') return 'en'
  const p = new URLSearchParams(window.location.search).get('lang')
  return VALID.includes(p) ? p : 'en'
}

const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en')

  useEffect(() => {
    setLangState(readLang())
  }, [])

  const setLang = (newLang) => {
    if (!VALID.includes(newLang)) return
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLang)
    window.history.pushState({}, '', url.toString())
    setLangState(newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

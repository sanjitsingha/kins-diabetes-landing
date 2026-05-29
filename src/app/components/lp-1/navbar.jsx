"use client";

import React, { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { lang } = useLanguage()
  const tx = translations[lang]

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b border-[#c8dde8] bg-white/95 backdrop-blur-md transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1200px] mx-auto md:px-7 h-[76px] flex items-center justify-between gap-4">

        <a href="/" className="md:h-[42px] h-[30px] shrink-0">
          <img
            src="/landing-page/kd-logo.png"
            alt="Kins Diabetes"
            className="h-full w-auto"
          />
        </a>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="/book-appointment"
            className="bg-[#12a4dd] hover:bg-[#0b7aaa] text-white font-semibold text-sm px-3 md:px-5 md:py-3 py-2 rounded-full transition-colors shadow-[0_6px_18px_-6px_rgba(18,164,221,0.55)] whitespace-nowrap"
          >
            {tx.nav.cta}
          </a>
        </div>

      </div>
    </header>
  );
};

export default Navbar;

"use client";

import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling Down
        setShowNavbar(false);
      } else {
        // Scrolling Up
        setShowNavbar(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b border-[#c8dde8] bg-white/95 backdrop-blur-md transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-7 h-[76px] flex items-center justify-between gap-4">
        
        <a href="/" className="h-[42px] flex-shrink-0">
          <img
            src="/landing-page/kd-logo.png"
            alt="Kins Diabetes"
            className="h-full w-auto"
          />
        </a>

        <a
          href="/book-appointment"
          className="bg-[#12a4dd] hover:bg-[#0b7aaa] text-white font-semibold text-sm px-5 py-3 rounded-full transition-colors shadow-[0_6px_18px_-6px_rgba(18,164,221,0.55)] whitespace-nowrap"
        >
          Book Free Counselling
        </a>
      </div>
    </header>
  );
};

export default Navbar;
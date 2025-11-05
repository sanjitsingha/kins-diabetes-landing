"use client";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white  shadow-md " : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className=" flex items-center justify-center">
                <Image
                  alt="kins logo"
                  width={200}
                  height={200}
                  src={"/logo/kins-logo.png"}
                />
              </div>
            </a>
          </div>

          {/* CTA Button */}
          <button className="bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] hidden md:block px-4 cursor-pointer text-white py-2 rounded-full">
            Book a Free Consultation
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

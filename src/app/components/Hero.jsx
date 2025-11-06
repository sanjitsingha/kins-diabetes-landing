"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export default function Hero() {
  // --- form data state ---
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    age: "",
    note: "",
    utm_source:
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("utm_source") || "direct"
        : "direct",
  });

  const [status, setStatus] = useState("");

  // --- handle form submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone_number || !formData.age) {
      setStatus("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzHF4F5W7UnfS7zSkbta0LMm4wWPYFEPV6s17tBKhlfKgkPFGNd_2pSNuRbWw1Yxvlf/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("✅ Thank you! We’ll contact you soon.");
        setFormData({
          name: "",
          phone_number: "",
          age: "",
          note: "",
          utm_source:
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("utm_source") || "direct"
              : "direct",
        });
      } else {
        setStatus("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Network error. Please check your connection.");
    }
  };

  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-30 pb-10 md:py-26 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Section */}
        <div>
          <h1 className="text-[45px] font-extrabold text-center md:text-left leading-tight text-black/80">
            Your Journey to Better <br className="hidden md:block" /> Health
            Starts Here
          </h1>

          <p className="my-10 text-center md:text-left text-black/60">
            Expert diabetic care with a personal touch. We understand your
            struggle, and we’re here to guide you every step of the way.
          </p>

          {/* Stats Badges */}
          <div className="w-full grid grid-cols-3 justify-center">
            <div className="flex flex-col md:text-left text-center">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                50K+
              </p>
              <p className="font-bold">Satisfied Patients</p>
            </div>
            <div className="flex flex-col md:text-left text-center">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                4.9★
              </p>
              <p className="font-bold">
                Rated on <br className="md:hidden block" /> Google
              </p>
            </div>
            <div className="flex flex-col md:text-left text-center">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                15+
              </p>
              <p className="font-bold">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl text-black"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Book Your Free Consultation
            </h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                  Age *
                </label>
                <input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium mb-1">
                  Note (Optional)
                </label>
                <textarea
                  id="note"
                  placeholder="Any specific concerns or questions?"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] cursor-pointer text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Submit
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              {status && (
                <p className="text-sm text-center mt-2 text-[#12a4dd] font-medium">
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

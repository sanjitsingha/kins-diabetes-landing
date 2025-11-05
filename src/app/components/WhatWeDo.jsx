"use client";

import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

const WhatWeDo = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F6F7F7] ">
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-44">
        {/* Left Side - Text Section */}
        <div className="max-w-xl z-10 relative">
          <h2 className="text-[32px] sm:text-[38px] md:text-[45px] leading-tight font-extrabold text-black/80 mb-14 md:mb-16">
            We Transform the way <br /> people approach{" "}
            <span className="text-[#12a4dd] font-extrabold">Diabetes</span>
          </h2>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {[
              "Continuous Glucose Monitor",
              "Diagnostic Test",
              "Doctor Consultation",
              "Coach Consults",
              "Meal Planning",
              "Fitness and Mindfulness Plans",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2Icon
                  stroke="white"
                  fill="#12a4dd"
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-black font-medium text-base sm:text-lg">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="absolute bottom-0 right-0 translate-x-[10%] translate-x-[15%]">
          <Image
            alt="lady"
            width={420}
            height={420}
            src="/lady-image.png"
            className="w-[250px] sm:w-[320px] md:w-[420px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;

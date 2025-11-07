"use client";

import { Heart, Users, Award, AwardIcon } from "lucide-react";

export default function WhoAreWe() {
  return (
    <section
      id="about"
      className="py-50   bg-gradient-to-b from-white via-white/90 to-[#f2f8fa]"
    >
      <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-3 items-center gap-16 mx-auto px-4">
        {/* Section Heading */}
        <div className=" ">
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-black/80 mb-4">
            Who We Are
          </h2>
          <p className="text-base md:text-lg text-black/60 w-[90%] leading-relaxed">
            At Kins Diabetes, we’re more than just a clinic — we’re your
            lifelong partners in managing diabetes with care, expertise, and
            commitment.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid col-span-2 justify-center gap-8 grid-rows-2 grid-cols-2">
          {/* Card 1 */}
          <div className=" text-center">
            <div className="w-20 h-20 bg-gradient-to-t  rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-20 h-20 text-[#f37782]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black/80">
              Comprehensive Diabetes Ecosystem
            </h3>
            <p className="text-black/60 text-sm leading-relaxed font-medium">
              From diagnosis to lifestyle management — everything you need is
              under one roof. Consultations, tests, diet guidance, CGM
              technology, and follow-ups — all seamlessly connected
            </p>
          </div>

          {/* Card 2 */}
          <div className=" text-center">
             <div className="w-20 h-20 bg-gradient-to-t  rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-20 h-20 text-[#FECD7B]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black/80">
              Patient-Centric Approach
            </h3>
            <p className="text-black/60 text-sm leading-relaxed font-medium">
              Every decision we make begins with you. We focus on your goals,
              your comfort, and your progress — not just your numbers.
            </p>
          </div>

          {/* Card 3 */}
          <div className=" text-center ">
             <div className="w-20 h-20 bg-gradient-to-t  rounded-full flex items-center justify-center mx-auto mb-4">
              <AwardIcon className="w-20 h-20 text-[#57C8C6]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black/80">
              Compassionate Care
            </h3>
            <p className="text-black/60 text-sm leading-relaxed font-medium">
              We treat every patient like family — with empathy, respect, and
              personal attention. Because healing begins with understanding your
              journey, not just your reports.
            </p>
          </div>
              <div className=" text-center ">
             <div className="w-20 h-20 bg-gradient-to-t  rounded-full flex items-center justify-center mx-auto mb-4">
              <AwardIcon className="w-20 h-20 text-[#57C8C6]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black/80">
              Compassionate Care
            </h3>
            <p className="text-black/60 text-sm leading-relaxed font-medium">
              We treat every patient like family — with empathy, respect, and
              personal attention. Because healing begins with understanding your
              journey, not just your reports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Shield, Clock, TrendingDown, Heart } from "lucide-react";

const USPs = () => {
  const usps = [
    {
      icon: <Shield className="w-10 h-10 text-[#12a4dd]" />,
      number: "15+",
      label: "Years of Excellence",
      description: "Trusted expertise in diabetic care",
    },
    {
      icon: <Clock className="w-10 h-10 text-[#12a4dd]" />,
      number: "5000+",
      label: "Happy Patients",
      description: "Lives transformed and improved",
    },
    {
      icon: <TrendingDown className="w-10 h-10 text-[#12a4dd]" />,
      number: "92%",
      label: "Success Rate",
      description: "Better blood sugar control achieved",
    },
    {
      icon: <Heart className="w-10 h-10 text-[#12a4dd]" />,
      number: "98%",
      label: "Patient Satisfaction",
      description: "Rated excellent by our patients",
    },
  ];

  return (
    <section className="py-20 bg-[#F6F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-extrabold text-black/80 mb-4">
            Our Unique Strengths
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
            Numbers that speak louder than words. Here's why KINS is the preferred
            choice for comprehensive diabetes care.
          </p>
        </div>

        {/* USP Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-8"
            >
              {/* Icon */}
              <div className="mb-4 w-16 h-16 bg-[#12a4dd]/10 rounded-full flex items-center justify-center">
                {usp.icon}
              </div>

              {/* Number */}
              <div className="text-[40px] font-extrabold text-[#12a4dd] mb-2">
                {usp.number}
              </div>

              {/* Label */}
              <div className="text-lg font-semibold text-black/80 mb-1">
                {usp.label}
              </div>

              {/* Description */}
              <p className="text-sm text-black/60 font-medium leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPs;

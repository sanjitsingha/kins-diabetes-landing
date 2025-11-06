"use client";

import { CheckCircle2 } from "lucide-react";

const Differentiators = () => {
  const differences = [
    {
      title: "24/7 Emergency Support",
      description:
        "Unlike others, we're available round the clock for your urgent needs. Your health emergency is our priority.",
    },
    {
      title: "Technology-Driven Care",
      description:
        "We use the latest diabetic monitoring technology and data analytics to track your progress in real time.",
    },
    {
      title: "Holistic Approach",
      description:
        "We don't just treat diabetes — we focus on your overall wellbeing, including mental and emotional health.",
    },
    {
      title: "Family Involvement",
      description:
        "We educate and involve your family members so you always have a strong support system at home.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-extrabold text-black/80 mb-4">
            How We Differ
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
            We're not your typical diabetic clinic. Here's what makes us stand apart
            — and why thousands of patients trust KINS for their ongoing diabetes care.
          </p>
        </div>

        {/* Difference Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {differences.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex-shrink-0 flex items-start justify-center sm:justify-start">
                <div className="w-10 h-10 bg-[#12a4dd]/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#12a4dd]" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black/80">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-black/60 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;

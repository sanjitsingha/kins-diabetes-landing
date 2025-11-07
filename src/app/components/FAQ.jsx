"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "I have diabetes, but I feel fine. Do I still need full check-ups?",
      answer:
        "Yes. Diabetes can cause hidden complications even if you feel okay. At Kins Diabetes, we provide all tests, doctor consultation, and counseling in just one visit.",
    },
    {
      question: "I am already taking medicine. Do I need counseling or a diet plan?",
      answer:
        "Absolutely. Medicines alone are not enough. We provide personalized counseling, diet plans, and lifestyle guidance to help you manage diabetes better.",
    },
    {
      question: "Can everything really be done in one day? I don’t have much time.",
      answer:
        "Yes. All tests, doctor consultation, counseling, and diet planning are completed in just 7 hours—saving you time and multiple trips.",
    },
    {
      question: "I have tried other clinics, but my sugar still goes up. How is Kins Diabetes different?",
      answer:
        "Many clinics provide only partial care. Kins Diabetes offers a complete solution: tests, expert doctors, counseling, diet plans, medications, continuous glucose monitoring (CGM) and digital support—all under one roof in one day.",
    },
    {
      question: "I feel stressed and demotivated managing diabetes. Will anyone support me?",
      answer:
        "Yes. Our counseling and digital care program provide guidance, motivation, and progress tracking. You’re never alone in your diabetes journey.",
    },
    {
      question: "I am worried about following the diet or exercise plan.",
      answer:
        "Our plans are customized to your routine, food habits, and lifestyle. We provide step-by-step guidance and digital tools to help you stay on track.",
    },
    {
      question: "Can my family be involved in my care?",
      answer:
        "Yes. Family participation is encouraged so your loved ones understand your condition and support your lifestyle changes.",
    },
    {
      question: "I am worried about taking too many medicines. Will Kins Diabetes just prescribe more?",
      answer:
        "No. We focus on personalized care. Medicines are only prescribed if needed, and our diet, lifestyle, and digital program often help reduce dependence on medicines.",
    },
     {
      question: "Do you offer follow-up consultations?",
      answer:
        "Yes, we schedule regular follow-ups to track your progress and adjust your care plan.",
    },
     {
      question: "I live far from the clinic. Is it worth traveling for just one visit?",
      answer:
        "Yes. One visit to Kins Diabetes saves multiple trips, time, and confusion. Everything you need—tests, doctor advice, counseling, and diet planning—is done in just 7 hours.",
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#F6F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-extrabold text-black/80 mb-4">
            Questions? We Have Answers
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
            We understand you may have concerns. Here are answers to the most
            common questions our patients ask before starting their journey with
            us.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-black/80">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#12a4dd] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[300px] p-6 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-black/60 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

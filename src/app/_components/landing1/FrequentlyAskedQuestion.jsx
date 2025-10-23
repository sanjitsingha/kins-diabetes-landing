"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FrequentlyAskedQuestion = () => {
  const faq = [
    {
      question:
        "I have diabetes, but I feel fine. Do I still need full check-ups?",
      answer:
        "Yes. Diabetes can cause hidden complications even if you feel okay. At Kins Diabetes, we provide all tests, doctor consultation, and counseling in just one visit.",
    },
    {
      question:
        "I am already taking medicine. Do I need counseling or a diet plan?",
      answer:
        "Absolutely. Medicines alone are not enough. We provide personalized counseling, diet plans, and lifestyle guidance to help you manage diabetes better.",
    },
    {
      question:
        "Can everything really be done in one day? I don’t have much time.",
      answer:
        "Yes. All tests, doctor consultation, counseling, and diet planning are completed in just 7 hours—saving you time and multiple trips.",
    },
    {
      question:
        "I have tried other clinics, but my sugar still goes up. How is Kins Diabetes different?",
      answer:
        "Many clinics provide only partial care. Kins Diabetes offers a complete solution: tests, expert doctors, counseling, diet plans, medications, continuous glucose monitoring (CGM) and digital support—all under one roof in one day.",
    },
    {
      question:
        "I feel stressed and demotivated managing diabetes. Will anyone support me?",
      answer:
        "Yes. Our counseling and digital care program provide guidance, motivation, and progress tracking. You’re never alone in your diabetes journey.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1100px] px-4 md:px-0 py-20 mx-auto">
        <div className="mb-20 text-center">
          <h1 className="text-[36px] md:text-[45px] font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-2">
            For all additional questions, please feel free to contact us!
          </p>
        </div>

        <div className="space-y-4">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border-b border-black/20 transition-all duration-300 ${
                  isOpen ? "pb-4" : ""
                }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center py-4 pb-6 text-left group"
                >
                  <h2 className="text-lg md:text-2xl font-medium text-black">
                    {item.question}
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-black/50 text-lg pb-4">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestion;

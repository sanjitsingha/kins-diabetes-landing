"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "How quickly can I expect to see results?",
      answer:
        "Most patients notice improvements in their blood sugar levels within 2–4 weeks of starting our personalized treatment plan. However, every patient is unique, and we tailor our approach to your specific needs. Consistent follow-up and adherence to the treatment plan are key to achieving optimal results.",
    },
    {
      question: "Do you provide emergency care for diabetic complications?",
      answer:
        "Yes, we offer 24/7 emergency support for all our patients. Whether it's hypoglycemia, hyperglycemia, or any diabetes-related emergency, our team is always available to guide you through immediate care steps and arrange urgent consultation if needed.",
    },
    {
      question: "Can I continue my current medications?",
      answer:
        "We carefully review all your current medications during your first consultation. If changes are needed, we make them gradually and safely. We believe in working with your existing treatment rather than abruptly changing everything, ensuring a smooth transition to better health.",
    },
    {
      question: "Is the treatment painful or invasive?",
      answer:
        "Our approach focuses on minimally invasive methods. While some diagnostic tests require blood samples, we use the latest technology to make the process as comfortable as possible. Our treatment plans emphasize lifestyle modifications, diet, and medication — not painful procedures.",
    },
    {
      question: "How often will I need to visit the clinic?",
      answer:
        "Initially, we recommend bi-weekly visits for the first month to closely monitor your progress. Once your condition stabilizes, monthly follow-ups are typically sufficient. However, we also offer teleconsultations for your convenience, reducing the need for frequent physical visits.",
    },
    {
      question: "Will insurance cover the treatment costs?",
      answer:
        "We work with most major insurance providers and can help you understand your coverage. Our team will assist you with the paperwork and claims process. We also offer flexible payment plans to ensure cost is never a barrier to getting the care you deserve.",
    },
    {
      question: "Can family members attend consultations?",
      answer:
        "Absolutely! We encourage family involvement in your treatment journey. Having your loved ones understand your condition helps create a supportive environment at home. Family members are always welcome during consultations and can participate in our diabetes education programs.",
    },
    {
      question: "What makes your approach different from other clinics?",
      answer:
        "We combine advanced medical care with emotional support. Our team doesn't just focus on your blood sugar numbers — we care about your quality of life. From nutrition counseling to mental wellness support, we address every aspect of living well with diabetes.",
    },
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

"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const NUMS = [
  { num: "50,000", suffix: "" },
  { num: 7,        suffix: "hr" },
  { num: 14,       suffix: "+" },
  { num: 4.8,      suffix: "★" },
];

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(start); }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="font-sans font-bold text-[60px] text-[#0d1b2a] leading-none tracking-tight">
      {Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}
      <span className="text-[#12a4dd] ml-2">{suffix}</span>
    </div>
  );
};

const Stats = () => {
  const { lang } = useLanguage()
  const labels = translations[lang].stats.labels

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-7 mt-14 px-5">
      {NUMS.map(({ num, suffix }, i) => (
        <div key={i} className="text-center">
          <div className="text-sm text-[#1e2d3d] mb-3 font-medium">
            {labels[i]}
          </div>
          <Counter target={num} suffix={suffix} />
        </div>
      ))}
    </div>
  );
};

export default Stats;

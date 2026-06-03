"use client";

import React, { useEffect, useState } from "react";

const STATS = [
  { num: 50000, suffix: "",   label: "Patients Served" },
  { num: 7,     suffix: "hr", label: "One-Day Care" },
  { num: 14,    suffix: "+",  label: "Years Trusted" },
  { num: 4.8,   suffix: "★",  label: "Google Rated" },
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

  const display = Number.isInteger(target)
    ? Math.floor(count).toLocaleString()
    : count.toFixed(1);

  return (
    <div translate="no" className="font-sans font-bold text-[36px] md:text-[60px] text-[#0d1b2a] leading-none tracking-tight">
      {display}
      <span className="text-[#12a4dd] ml-2">{suffix}</span>
    </div>
  );
};

const Stats = () => {
  return (
 <div className="w-full border-t border-b border-black/10 border-dashed">
     <div className="grid max-w-[1200px] mx-auto grid-cols-2 md:grid-cols-4 gap-7 py-10 md:py-20 px-5">
      {STATS.map(({ num, suffix, label }, i) => (
        <div key={i} className="text-center">
          <div className="text-sm text-[#1e2d3d] mb-3 font-medium">{label}</div>
          <Counter target={num} suffix={suffix} />
        </div>
      ))}
    </div>
 </div>
  );
};

export default Stats;

"use client";
import React, { useState, useEffect } from "react";

const UrgencyTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const now = Date.now();
    const stored = localStorage.getItem("timerData");

    let expiryTime;

    if (stored) {
      const { expiry, lastReset } = JSON.parse(stored);
      const fourHoursAgo = now - 4 * 60 * 60 * 1000;

      // Continue countdown if last reset < 4 hours ago
      if (lastReset > fourHoursAgo) {
        expiryTime = expiry;
      } else {
        // Reset timer if older than 4 hours
        expiryTime = now + 10 * 60 * 60 * 1000 + 34 * 60 * 1000; // 10h 34m
        localStorage.setItem(
          "timerData",
          JSON.stringify({ expiry: expiryTime, lastReset: now })
        );
      }
    } else {
      // First visit: set new countdown
      expiryTime = now + 10 * 60 * 60 * 1000 + 34 * 60 * 1000;
      localStorage.setItem(
        "timerData",
        JSON.stringify({ expiry: expiryTime, lastReset: now })
      );
    }

    const interval = setInterval(() => {
      const diff = expiryTime - Date.now();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        localStorage.removeItem("timerData");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000); // update every second for smooth ticking

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full fixed bg-[#12a4dd] text-white text-center py-2 text-sm font-semibold tracking-wide shadow-sm">
      ⏳ Hurry! Offer ends in{" "}
      <span className="text-yellow-300 font-bold">
        {String(timeLeft.hours).padStart(2, "0")}h{" "}
        {String(timeLeft.minutes).padStart(2, "0")}m{" "}
        {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
    </div>
  );
};

export default UrgencyTimer;

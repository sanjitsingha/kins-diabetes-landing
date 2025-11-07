"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import heroImage from "@/assets/hero-bg.jpg";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    age: "",
    note: "",
    date: null,
    time_slot: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setStatus("✅ Booking Confirmed! We’ll contact you soon.");
    setFormData({
      name: "",
      phone_number: "",
      age: "",
      note: "",
      date: null,
      time_slot: "",
    });
  };

  // Example Time Slots
  const timeSlots = [
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "12:00 PM - 12:30 PM",
    "3:00 PM - 3:30 PM",
    "5:00 PM - 5:30 PM",
    "7:00 PM - 7:30 PM",
  ];

  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-30 pb-10 md:py-26 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <h1 className="text-[45px] font-bold text-center md:text-left leading-tight text-black/80">
            Book Your <br className="hidden md:block" />
            <span className="text-[#12a4dd] font-extrabold">
              Diabetes Webinar Slot
            </span>
          </h1>

          <p className="my-10 text-center md:text-left text-black/60">
            Join our expert-led online webinar for free — limited seats available!
          </p>

          {/* Stats */}
          <div className="w-full grid grid-cols-3 justify-center">
            <div className="flex flex-col md:text-left text-center">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                50K+
              </p>
              <p className="font-bold">Patients Served</p>
            </div>
            <div className="flex flex-col md:text-left text-center">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                4.9★
              </p>
              <p className="font-bold">Rated on Google</p>
            </div>
            <div className="flex flex-col md:text-left text-center">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                15+
              </p>
              <p className="font-bold">Years of Expertise</p>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl text-black"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Reserve Your Webinar Seat
            </h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  required
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium mb-1">Age *</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  required
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#12a4dd]" /> Select Date *
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}
                  minDate={new Date()}
                  placeholderText="Select a date"
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                  required
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#12a4dd]" /> Select Time Slot *
                </label>
                <select
                  value={formData.time_slot}
                  onChange={(e) =>
                    setFormData({ ...formData, time_slot: e.target.value })
                  }
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                  required
                >
                  <option value="">Choose a slot</option>
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Note (Optional)
                </label>
                <textarea
                  placeholder="Any specific questions?"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200 focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center w-full bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] cursor-pointer text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              {status && (
                <p className="text-sm text-center mt-2 text-[#12a4dd] font-medium">
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

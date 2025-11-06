"use client";

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      age: 52,
      image: testimonial1,
      text: "I was struggling with diabetes for years, feeling hopeless. The team here changed my life completely. My sugar levels are stable now, and I feel like myself again. They truly care about their patients.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      age: 65,
      image: testimonial2,
      text: "The doctors here don't just treat the disease, they treat the person. The support I received during my difficult times was incredible. Forever grateful for giving me my health back.",
      rating: 5,
    },
    {
      name: "Anjali Patel",
      age: 38,
      image: testimonial3,
      text: "As a working mother with diabetes, I needed a clinic that understood my challenges. They created a treatment plan that fits my lifestyle. My children have their energetic mom back!",
      rating: 5,
    },
    {
      name: "Mohan Reddy",
      age: 58,
      image: testimonial4,
      text: "After trying multiple clinics, I finally found a place that gave me real results. The personalized care and constant monitoring helped me reduce my medication. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#F6F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-extrabold text-black/80 mb-4">
            Stories That Inspire Us
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
            Real patients, real transformations. Hear directly from those whose lives
            we've had the privilege to touch and improve.
          </p>
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-10"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-black/80">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-black/60">
                        {testimonial.age} years old
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#12a4dd] fill-[#12a4dd]"
                      />
                    ))}
                  </div>

                  <p className="text-black/70 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg text-black/80">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-black/60">
                    {testimonial.age} years old
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#12a4dd] fill-[#12a4dd]"
                  />
                ))}
              </div>

              <p className="text-black/70 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

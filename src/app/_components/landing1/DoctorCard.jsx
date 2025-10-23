"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DoctorCard = () => {
  const doctors = [
    {
      image: "/doctors/1.jpg",
      name: "Dr. Sekhar Chakraborty",
      title: "Senior Consultant",
      experience: "25+ Years",
    },
    {
      image: "/doctors/2.jpg",
      name: "Dr. Abhijeet Sharan",
      title: "Consultant",
      experience: "15+ Years",
    },
    {
      image: "/doctors/3.jpg",
      name: "Dr. Subhodip Pramanik",
      title: "Endocrinologist",
      experience: "14+ Years",
    },
    {
      image: "/doctors/4.jpg",
      name: "Dr. R K Saraogi",
      title: "Endocrinologist",
      experience: "20+ Years",
    },
    {
      image: "/doctors/5.jpg",
      name: "Dr. Hironmay Paul",
      title: "Senior Consultant",
      experience: "35+ Years",
    },
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="relative max-w-[1100px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center ">
          Meet Our Expert Doctors
        </h2>
        <p className="text-center mb-10 mt-4 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          sunt.
        </p>

        <div className="relative flex items-center justify-center">
          {/* Custom Navigation Buttons */}
          <button className="prev-btn absolute left-0 md:-left-10 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 8 },
              640: { slidesPerView: 2.5, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 12 },
            }}
            className="pb-10 flex justify-center"
          >
            {doctors.map((doctor, index) => (
              <SwiperSlide key={index}>
                <div className="w-[300px] relative rounded-xl overflow-hidden h-[450px] mx-auto">
                  <Image
                    width={330}
                    height={330}
                    alt="doctor"
                    src={doctor.image}
                    className="object-contain"
                  />
                  <div className="absolute bottom-5 left-5">
                    <h1 className="text-white font-medium text-xl">
                      {doctor.name}
                    </h1>
                    <p className="text-white/70 mt-2 text-sm">{doctor.title}</p>
                    <p className="text-white/70 mt-1 text-sm">
                      {doctor.experience}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="next-btn absolute right-0 md:-right-10 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

"use client";

import { Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const VideoTestimonials = () => {
  const videos = [
    {
      title: "How I Reversed My Pre-Diabetes",
      patient: "Suresh Iyer",
      thumbnail:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    },
    {
      title: "My Journey from Insulin to Tablets",
      patient: "Kavita Desai",
      thumbnail:
        "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
    },
    {
      title: "Living Normally with Type 2 Diabetes",
      patient: "Arun Singh",
      thumbnail:
        "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-[#F6F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-extrabold text-black/80 mb-4">
            See Their Success Stories
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
            Watch our patients share their emotional journeys and how we helped them
            reclaim their health and happiness.
          </p>
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-12"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 cursor-pointer group hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-[#12a4dd]/40 group-hover:bg-[#12a4dd]/50 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-[#12a4dd] fill-[#12a4dd]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-black/80 mb-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-black/60">by {video.patient}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-gray-200 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-[#12a4dd]/40 group-hover:bg-[#12a4dd]/50 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#12a4dd] fill-[#12a4dd]" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-black/80 mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-black/60">by {video.patient}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;

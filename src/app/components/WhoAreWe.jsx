"use client";

import { Heart, Users, Award } from "lucide-react";

export default function WhoAreWe() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white via-white/90 to-[#f2f8fa]"
    >
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-black/80 mb-4">
            Who We Are
          </h2>
          <p className="text-base md:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
            We’re more than just a clinic — we’re your partners in managing
            diabetes. Our mission is to bring hope and healing to every patient
            who walks through our doors.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl  hover:shadow-lg transition-all hover:-translate-y-1 duration-300 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black/80">
              Compassionate Care
            </h3>
            <p className="text-black/60 text-sm leading-relaxed font-medium">
              We treat every patient like family, with empathy and understanding
              at the heart of everything we do.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl  hover:shadow-lg transition-all hover:-translate-y-1 duration-300 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black/80">
              Expert Team
            </h3>
            <p className="text-black/60 text-sm leading-relaxed font-medium">
              Our dedicated specialists have decades of combined experience in
              diabetes care and patient well-being.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl  hover:shadow-lg transition-all hover:-translate-y-1 duration-300 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black/80">
              Proven Results
            </h3>
            <p className="text-black/60 text-sm leading-relaxed font-medium">
              Thousands of patients have transformed their lives through our
              holistic, result-oriented approach to diabetes management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

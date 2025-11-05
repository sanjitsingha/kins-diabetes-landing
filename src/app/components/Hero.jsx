"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative  flex items-center overflow-hidden">
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
        {/* Left Side - Text Section */}
        <div>
          <h1 className="text-[45px] font-extrabold  text-center md:text-left leading-tight text-black/80">
            Your Journey to Better <br className="hidden md:block" /> Health
            Starts Here
          </h1>

          <p className="my-10 text-center md:text-left text-black/60">
            Expert diabetic care with a personal touch. We understand your
            struggle, and we’re here to guide you every step of the way.
          </p>

          {/* Stats Badges */}
          <div className=" w-full grid grid-cols-3 justify-center   ">
            <div className="flex flex-col md:text-left text-center ">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                50K+
              </p>
              <p className="font-bold">Staisfied Patients</p>
            </div>
            <div className="flex flex-col md:text-left text-center ">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                4.9+
              </p>
              <p className="font-bold">
                Rated on <br className="md:hidden block" /> google
              </p>
            </div>
            <div className="flex flex-col md:text-left text-center  ">
              <p className="text-[35px] md:text-[45px] font-extrabold text-[#12a4dd] tracking-tighter">
                15+
              </p>
              <p className="font-bold">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <form className="bg-white p-4 rounded-2xl  border border-white  shadow-xl text-black">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Book Your Free Consultation
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl text-sm font-semibold border border-gray-200  focus:border focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl text-sm  border font-semibold border-gray-200  focus:border focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                  Age *
                </label>
                <input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  className="w-full rounded-xl text-sm  border font-semibold border-gray-200  focus:border focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium mb-1"
                >
                  Note (Optional)
                </label>
                <textarea
                  id="note"
                  placeholder="Any specific concerns or questions?"
                  className="w-full rounded-xl text-sm  border border-gray-200 font-semibold  focus:border focus:border-[#12a4dd] px-3 py-3 outline-none bg-gray-100"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full bg-gradient-to-t from-[#0d7aa5] to-[#12a4dd] cursor-pointer text-white font-semibold px-6 py-3 rounded-lg "
              >
                Submit
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

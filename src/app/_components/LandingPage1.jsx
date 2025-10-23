import React from "react";
import WhatMakesUsDifferent from "./landing1/WhatMakesUsDifferent";
import DoctorCard from "./landing1/DoctorCard";
import FrequentlyAskedQuestion from "./landing1/FrequentlyAskedQuestion";

const LandingPage1 = () => {
  return (
    <>
      <div className="w-full bg-[#12a4dd]/5 py-10 ">
        <div className="max-w-[1100px] items-center flex-col md:flex-row justify-between pt-10 mx-auto flex ">
          <div className="text-center md:text-left">
            <h1 className="md:text-[47px] text-[30px] leading-12 font-medium">
              Advanced <br />{" "}
              <span className="font-semibold">Diabetes Care In Siliguri</span>
            </h1>
            <h2 className="text-lg mt-8 text-black/60">
              Your one-stop solution for complete diabetes management.
            </h2>
          </div>
          <div className="">
            <p className="text-center my-2 font-semibold text-[#12a4dd]">
              Last 15 FREE Consultations Left!
            </p>
            <div className="md:w-[400px] w-full  shadow-2xl p-4 rounded-lg border bg-[#12a4dd]/10 border-[#12a4dd] h-[400px]">
              <form action="">
                <div>
                  <label className="text-[#12a4dd] font-medium" htmlFor="">
                    Name
                  </label>
                  <input
                    className="w-full border-b placeholder:text-[16px] mt-2 pb-2 outline-none placeholder:text-black/30 text-xl border-[#12a4dd]"
                    type="text"
                    placeholder="Ajay Singh"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-[#12a4dd] font-medium" htmlFor="">
                    Phone Number
                  </label>
                  <input
                    className="w-full border-b mt-2 pb-2 placeholder:text-[16px] outline-none placeholder:text-[#12a4dd] text-xl border-[#12a4dd]"
                    type="text"
                    placeholder="+91"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-[#12a4dd] font-medium" htmlFor="">
                    Note
                  </label>
                  <textarea
                    className="w-full h-[90px] border-b mt-2 pb-2 placeholder:text-[16px] outline-none placeholder:text-black/30 text-xl border-[#12a4dd]"
                    type="text"
                    placeholder="Enter your message"
                  />
                </div>
                <div className="px-8 mt-5">
                  <button className="bg-[#12a4dd] text-white px-10 py-2 w-full rounded-full ">
                    Book a free counselling
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <WhatMakesUsDifferent />
      <DoctorCard />
      <FrequentlyAskedQuestion />
    </>
  );
};

export default LandingPage1;

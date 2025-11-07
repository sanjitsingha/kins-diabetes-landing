import { Check } from "lucide-react";
import React from "react";

const WhatMakesUsDifferent = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl  py-40 mx-auto">
        <h2 className="font-bold text-center mb-20 text-[45px]">
         What makes us Different?
        </h2>
        <div className="flex gap-20 w-full">
          <div className="h-[500px] bg-gradient-to-tr via-[#12a4dd09] rounded-2xl border p-6 border-[#12a4dd] from-white to-[#12a4dd2d] w-[550px]">
            <h3 className="font-bold pb-3 text-2xl text-[#12a4dd]">
              Kins Diabetes
            </h3>
            <hr className=" opacity-10" />
            <div className="py-4 flex flex-col gap-6">
              <div className="w-full flex items-center gap-2">
                <Check color="#12a4dd" size={16} />
                <p className="text-xl">
                  <span className="text-[#12a4dd] font-bold">1 </span>Continuous
                  Glucose Monitor
                </p>
              </div>
              <div className="w-full flex items-center gap-2">
                <Check color="#12a4dd" size={16} />
                <p className="text-xl">
                  <span className="text-[#12a4dd] font-bold">4 </span>Best-in-class Doctor Consultations
                </p>
              </div>
              <div className="w-full flex items-center gap-2">
                <Check color="#12a4dd" size={16} />
                <p className="text-xl">
                  <span className="text-[#12a4dd] font-bold">Unlimited </span>Diabetes Expert Consultations
                </p>
              </div>
              <div className="w-full flex items-center gap-2">
                <Check color="#12a4dd" size={16} />
                <p className="text-xl">
                  <span className="text-[#12a4dd] font-bold">1 </span>Comprehensive Onboarding Checkup
                </p>
              </div>
              <div className="w-full flex items-center gap-2">
                <Check color="#12a4dd" size={16} />
                <p className="text-xl">
                  <span className="text-[#12a4dd] font-bold">1 </span>Continuous
                  Glucose Monitor
                </p>
              </div>

            </div>
          </div>
          <div className="h-[500px] bg-gradient-to-tr via-white rounded-2xl border p-6 border-red-700 from-white to-[#ec1c341c] w-[550px]">
            Hello
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatMakesUsDifferent;

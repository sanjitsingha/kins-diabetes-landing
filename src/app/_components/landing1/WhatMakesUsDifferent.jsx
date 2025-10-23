import { CheckCircle2, Circle, Info, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const WhatMakesUsDifferent = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1100px] px-4 md:px-0 py-20 mx-auto">
        <div>
          <h1 className="text-[45px]  ">What make us different?</h1>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-2xl/10 mt-8">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-3 text-left font-semibold border-b">
                  Feature
                </th>
                <th className="px-4 py-3 text-left font-semibold border-b">
                  <Image
                    alt="logo"
                    src={
                      "https://kinsdiabetes.com/care/wp-content/uploads/2025/09/logo.png"
                    }
                    width={100}
                    height={100}
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold border-b">
                  Others Offer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-3 border-white text-[#12a4dd] font-semibold  bg-[#12a4dd]/4 ">
                <td className="px-4 py-3">
                  CGM Device (Continuous Monitoring)
                </td>
                <td className="px-4 py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />{" "}
                </td>
                <td className="px-4 py-3 text-red-500 font-medium">
                  <XCircle size={22} />
                </td>
              </tr>
              <tr className="border-b-3 border-white  bg-[#12a4dd]/4">
                <td className="px-4 text-[#12a4dd] font-semibold  border-r-3 border-white py-3">
                  Digital Diabetes Care Program
                </td>
                <td className="px-4 border-r-3 border-white  py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4  border-r-3 border-white py-3 text-red-500 font-medium">
                  <XCircle size={22} />
                </td>
              </tr>
              <tr className="border-b-3 border-white  bg-[#12a4dd]/4 ">
                <td className="px-4 border-r-3 text-[#12a4dd] font-semibold border-white py-3">
                  Personalized Counseling
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-yellow-500 font-medium">
                  <Info size={22} />
                </td>
              </tr>
              <tr className="border-b-3 border-white  bg-[#12a4dd]/4 ">
                <td className="px-4 border-r-3 text-[#12a4dd] font-semibold border-white py-3">
                  Expert Doctor Consultation
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
              </tr>
              <tr className="border-b-3 border-white  bg-[#12a4dd]/4 ">
                <td className="px-4 border-r-3 text-[#12a4dd] font-semibold border-white py-3">
                  Fast Track Service (in just 7 hours)
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-red-500 font-medium">
                  <XCircle size={22} />
                </td>
              </tr>
              <tr className="border-b-3 border-white  bg-[#12a4dd]/4 ">
                <td className="px-4 border-r-3 text-[#12a4dd] font-semibold border-white py-3">
                  Customized Diet Plan
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-yellow-500 font-medium">
                  <Info size={22} />
                </td>
              </tr>
              <tr className="border-b-3 border-white  bg-[#12a4dd]/4 ">
                <td className="px-4 border-r-3 text-[#12a4dd] font-semibold border-white  py-3">
                  Diabetes Investigations
                </td>
                <td className="px-4  border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4 border-r-3 border-white  py-3 text-yellow-500 font-medium">
                  <Info size={22} />
                </td>
              </tr>
              <tr className="border-b-3 border-white  bg-[#12a4dd]/4 ">
                <td className="px-4 border-r-3 text-[#12a4dd] font-semibold border-white py-3">
                  Lifestyle Modification Program
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-red-500 font-medium">
                  <XCircle size={22} />
                </td>
              </tr>
              <tr className="  bg-[#12a4dd]/4 ">
                <td className="px-4 border-r-3 text-[#12a4dd] font-semibold border-white py-3">
                  Medications
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
                <td className="px-4 border-r-3 border-white py-3 text-green-600 font-medium">
                  <CheckCircle2 size={22} color="#12a4dd" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WhatMakesUsDifferent;

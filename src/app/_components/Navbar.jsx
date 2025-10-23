import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full min-h-[60px] py-4">
      <div className="max-w-[1100px] flex items-center justify-between h-full mx-auto ">
        <Image
          src={
            "https://kinsdiabetes.com/care/wp-content/uploads/2025/09/logo.png"
          }
          width={200}
          height={200}
          alt="Logo"
          className="object-cover"
        />
        <button className="bg-[#12a4dd] py-3 hidden md:block px-6 cursor-pointer font-medium text-white rounded-full">
          Book free counselling
        </button>
      </div>
    </div>
  );
};

export default Navbar;

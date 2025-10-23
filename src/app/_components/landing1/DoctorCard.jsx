import Image from "next/image";
import React from "react";

const DoctorCard = () => {
  return (
    <div className="p-10">
      <div className=" absolute bg-gradient-to-t from-black to-black/0 "></div>
      <div className="w-[230px] h-[330px]">
        <Image
          width={330}
          height={330}
          alt="doctor"
          src={"https://kinsdiabetes.com/images/doctor/1735914302doc.jpg"}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default DoctorCard;

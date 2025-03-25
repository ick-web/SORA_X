import Image from "next/image";
import React from "react";
import SoraImage from "@image/sora.png";

const Sora = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center ">
      <Image
        src={SoraImage}
        alt="마법의 소라고둥"
        width={200}
        height={200}
        priority
      />
      <p className="mt-8 text-white">문제해결은, Sora X!</p>
    </div>
  );
};

export default Sora;

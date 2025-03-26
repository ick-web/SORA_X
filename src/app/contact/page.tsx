import Image from "next/image";
import React from "react";

const ContactPage = () => {
  return (
    <div className="wrapper w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-color-black1">
      <div className="border w-1/2 h-4/6 grid grid-cols-3">
        <div className="flex justify-start items-center text-center gap-2 mb-8">
          <Image
            src="/face-one.png"
            alt="Logo"
            width={100}
            height={100}
            className="mt-1"
          />
          <h1 className="text-3xl font-bold">ONE</h1>
        </div>
        <div className="flex justify-start items-center text-center gap-2 mb-8">
          <Image
            src="/face-yeon.png"
            alt="Logo"
            width={100}
            height={100}
            className="mt-1"
          />
          <h1 className="text-3xl font-bold">YEON</h1>
        </div>
        <div className="flex justify-start items-center text-center gap-2 mb-8">
          <Image
            src="/face-honey.png"
            alt="Logo"
            width={100}
            height={100}
            className="mt-1"
          />
          <h1 className="text-3xl font-bold">HONEY</h1>
        </div>
        <div className="flex justify-start items-center text-center gap-2 mb-8">
          <Image
            src="/face-sun.png"
            alt="Logo"
            width={100}
            height={100}
            className="mt-1"
          />
          <h1 className="text-3xl font-bold">SUN</h1>
        </div>
        <div className="flex justify-start items-center text-center gap-2 mb-8">
          <Image
            src="/face-IU.png"
            alt="Logo"
            width={100}
            height={100}
            className="mt-1"
          />
          <h1 className="text-3xl font-bold">U</h1>
        </div>
        <div className="flex justify-start items-center text-center gap-2 mb-8">
          <Image
            src="/face-doni.png"
            alt="Logo"
            width={100}
            height={100}
            className="mt-1"
          />
          <h1 className="text-3xl font-bold">DONI</h1>
        </div>
        <div className="flex justify-start items-center text-center gap-2 mb-8">
          <Image
            src="/face-tutor.png"
            alt="Logo"
            width={100}
            height={100}
            className="mt-1"
          />
          <h1 className="text-3xl font-bold">JAKE</h1>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

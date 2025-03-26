"use client";

import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const memberCards = [
  {
    name: "JAKE",
    image: "/face-tutor.png",
    address: "GitHub",
    github: "https://github.com/jake920220",
    line: "INTRODUCTION",
    intro: "4조로 이행시 바로 가겠습니다.",
    intro2: "4 : 사상 최고의,",
    intro3: "조 : 조.",
  },
  {
    name: "mzsoba(오원택)",
    image: "/face-one.png",
    address: "GitHub",
    github: "https://github.com/dhdnjs0702",
    line: "INTRODUCTION",
    intro: "제가 이 조의 팀장입니다.",
    intro2: "아이디어 뱅크 오원택입니다.",
  },
  {
    name: "JongBell(김종연)",
    image: "/face-yeon.png",
    address: "GitHub",
    github: "https://github.com/kjjyyy01",
    line: "INTRODUCTION",
    intro: "리마인더 김종연입니다.",
  },
  {
    name: "shoney(김시헌)",
    image: "/face-honey.png",
    address: "GitHub",
    github: "https://github.com/shoney02",
    line: "INTRODUCTION",
    intro: "솔루션 마법사 김시헌입니다.",
  },
  {
    name: "SunTea(유선영)",
    image: "/face-sun.png",
    address: "GitHub",
    github: "https://github.com/usuny0317",
    line: "INTRODUCTION",
    intro: "쿼리와 캐싱에 미치다, 유선영입니다.",
  },
  {
    name: "U(유익환)",
    image: "/face-IU.png",
    address: "GitHub",
    github: "https://github.com/ick-web/",
    line: "INTRODUCTION",
    intro: "물음표 살인마 유익환입니다.",
  },
  {
    name: "DONI",
    image: "/face-doni.png",
    address: "GitHub",
    github: "https://github.com/woodie2933",
    line: "INTRODUCTION",
    intro: "나이트 크롤러 김도현입니다.",
  },
];

const ContactPage = () => {
  const [view, setView] = useState(0);

  const handlePrev = () => {
    setView((prev) => (prev === 0 ? memberCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setView((prev) => (prev === memberCards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="wrapper w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="rounded-3xl w-full h-full flex justify-center items-center bg-color-black1 m-3">
        {/* 슬라이더 컨테이너 */}
        <div className="w-1/2 h-4/6 flex flex-col relative overflow-hidden -mt-20">
          <div
            className="absolute top-0 left-0 w-full h-full transition-transform duration-500"
            style={{ transform: `translateY(-${view * 100}%)` }}
          >
            {memberCards.map((card, index) => (
              <div
                key={index}
                className="w-full h-full flex flex-col justify-center items-center"
              >
                <div className="border rounded-3xl w-full h-2/3 flex justify-center items-center gap-8">
                  <div className="flex justify-center items-center">
                    <Image
                      src={card.image}
                      alt={`${card.name} Logo`}
                      width={240}
                      height={240}
                      className="bg-white rounded-full"
                    />
                  </div>
                  <div className="w-3/6 flex flex-col justify-center items-start transition-all duration-300">
                    <h1 className="text-5xl font-bold mb-4">{card.name}</h1>
                    <h3 className="text-lg text-neutral-300 font-semibold">
                      {card.address}
                    </h3>
                    <a
                      href={card.github}
                      className="text-blue-400 font-semibold hover:underline mb-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {card.github}
                    </a>
                    <h3 className="text-lg text-neutral-300 font-semibold">
                      {card.line}
                    </h3>
                    <p className="w-full flex text-neutral-300 font-semibold">
                      {card.intro}
                      <br />
                      {card.intro2}
                      <br />
                      {card.intro3}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Prev/Next 버튼 */}
          <div className="w-full absolute bottom-7 left-1/2 transform -translate-x-1/2 flex justify-center gap-4">
            <button onClick={handlePrev}>
              <IoIosArrowDropleftCircle className="text-4xl transition-all duration-300 hover:text-color-orange2" />
            </button>
            <button onClick={handleNext}>
              <IoIosArrowDroprightCircle className="text-4xl transition-all duration-300 hover:text-color-orange2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

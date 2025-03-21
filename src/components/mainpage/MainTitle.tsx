import React from "react";

const MainTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-center mb-14">
      <h1 className="text-3xl font-semibold font-['Sono']">
        <span className="text-[#ff4400]">{title},</span>{" "}
        <span className="text-white">무엇이든 질문해보세요!</span>
      </h1>
    </div>
  );
};

export default MainTitle;

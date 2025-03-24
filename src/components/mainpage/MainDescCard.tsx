import React from "react";

const MainDescCard = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="bg-[#222222] rounded-[15px] p-4">
      <div className="text-white text-base font-normal font-['Gothic_A1'] flex items-center">
        <span className="mr-2">📌</span>
        {title}
      </div>
      <div className="text-white text-base font-light font-['Gothic_A1'] mt-2">
        {desc}
      </div>
    </div>
  );
};

export default MainDescCard;

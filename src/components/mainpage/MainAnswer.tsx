import { answerPropsType } from "@/types/mainTypes";
import React from "react";

const MainAnswer = ({ isLoading, answer }: answerPropsType) => {
  return (
    <div>
      {isLoading && (
        <div className="w-full max-w-2xl mt-2 p-4 bg-[#2a2a2a] rounded-lg text-white">
          답변을 생성하는 중...
        </div>
      )}

      {!isLoading && answer && (
        <div className="w-full max-w-2xl mt-2 p-4 bg-[#2a2a2a] rounded-lg text-white whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
};

export default MainAnswer;

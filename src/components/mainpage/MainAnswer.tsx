import { answerPropsType } from "@/types/mainTypes";
import React from "react";

const MainAnswer = ({ isLoading, answer, question }: answerPropsType) => {
  return (
    <div>
      {isLoading && (
        <div className="w-full max-w-2xl mt-2 p-4 bg-[#2a2a2a] rounded-lg text-white">
          답변을 생성하는 중...
        </div>
      )}

      {!isLoading && answer && (
        <div className="w-full max-w-2xl mt-2 p-4 bg-[#2a2a2a] rounded-lg text-white whitespace-pre-line">
          {/* <Image
            src={previewUrl}
            alt="미리보기"
            className="max-h-32 max-w-full object-contain"
            width={300}
            height={300}
          /> */}
          질문: {question}
          {`
            
          `}
          답변: {answer}
        </div>
      )}
    </div>
  );
};

export default MainAnswer;

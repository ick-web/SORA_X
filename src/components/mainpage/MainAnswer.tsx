import { answerPropsType } from "@/types/mainTypes";
import Image from "next/image";
import React from "react";

const MainAnswer = ({
  isLoading,
  answer,
  question,
  imageUrl,
}: answerPropsType) => {
  return (
    <div>
      {isLoading && (
        <div className="w-full max-w-2xl mt-2 p-4 bg-[#2a2a2a] rounded-lg text-white">
          답변을 생성하는 중...
        </div>
      )}

      {!isLoading && answer && (
        <div className="w-full max-w-2xl mt-2 p-4 bg-[#2a2a2a] rounded-lg text-white whitespace-pre-line">
          {imageUrl && (
            <>
              <Image
                src={imageUrl || ""}
                alt="미리보기"
                className="max-h-32 max-w-full object-contain"
                width={600}
                height={600}
              />
              {`
            
              `}
            </>
          )}
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

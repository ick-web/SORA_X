"use client";

import { fetchAnswerById } from "@/utils/fetchAnswerById";
import Image from "next/image";
import { useEffect, useState } from "react";

const QuestionDetail = () => {
  const [questionImage, setQuestionImage] = useState<string>(""); // 이미지 질문
  const [questionText, setQuestionText] = useState<string>(""); // 텍스트 질문
  const [answer, setAnswer] = useState<string>(""); // AI 답변

  useEffect(() => {
    const answerId = "db085cbd-2f76-4312-9804-90eeb2499558"; // 임시로 answer_id 넣었습니다.

    const fetchAnswer = async () => {
      const data = await fetchAnswerById(answerId);
      if (data) {
        setQuestionImage(data.answer_image || null);
        setQuestionText(data.answer_text || null);
        setAnswer(data.answer_answer);
      }
    };

    fetchAnswer();
  }, []);

  return (
    <div className="p-4 mb-10 border-b border-gray-700">
      <h2 className="text-2xl font-bold mb-4">질문</h2>
      <div className="bg-gray-700 mb-6 rounded p-2">
        {questionImage ? (
          <Image
            src={questionImage}
            alt="User question"
            width={100}
            height={100}
            className="mb-6"
          />
        ) : (
          <p>{questionText}</p>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">풀이</h2>
      <p className="bg-gray-700 mb-6 rounded p-2">{answer}</p>
    </div>
  );
};

export default QuestionDetail;

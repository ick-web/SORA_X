"use client";

import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import MainAnswer from "./MainAnswer";

const MainSearchBar = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data);
    } catch (error) {
      console.error("오류 발생:", error);
      setAnswer("죄송합니다. 답변을 생성하는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl relative mb-5">
        <div className="w-full h-16 bg-[#1a1a1a] rounded-[54.50px] border border-[#4a4a4a] flex items-center px-6">
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="질문을 입력하거나 파일을 업로드해보세요"
            className="w-full bg-transparent text-white text-lg font-['Gothic_A1'] focus:outline-none"
          />
          <div className="flex items-center gap-4">
            <button type="button" className="flex-shrink-0">
              <Image
                className="w-7 h-7"
                src="https://cdn-icons-png.flaticon.com/512/3459/3459593.png"
                alt="업로드 이미지"
                width={28}
                height={28}
              />
            </button>
            <button
              type="submit"
              className="flex-shrink-0"
              disabled={isLoading || !question.trim()}
            >
              <Image
                className={`w-7 h-7 ${isLoading ? "opacity-50" : ""}`}
                src="https://cdn-icons-png.flaticon.com/512/7109/7109313.png"
                alt="검색 이미지 "
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>
      </form>

      <MainAnswer isLoading={isLoading} answer={answer} />
    </div>
  );
};

export default MainSearchBar;

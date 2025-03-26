"use client";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { AlertError } from "../../utils/alert";
import MainImagePreview from "./MainImagePreview";
import MainFileUploader from "./MainFileUploader";

import supabase from "@/app/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  uploadImageToSupabase,
  validateImage,
  resetFormState,
} from "../../utils/mainpage/mainSupabase";
import MainAnswer from "./MainAnswer";
import { NO_ANSWER } from "@/constants/mainpage/cardComment";
import { useRouter } from "next/navigation";

const MainSearchBar = () => {
  const [question, setQuestion] = useState<string>(""); //폼 질문
  const [answer, setAnswer] = useState<string>(""); //api가 생성한 답변
  const [isLoading, setIsLoading] = useState<boolean>(false); //api응답 대기
  const [previewUrl, setPreviewUrl] = useState<string>(""); //질문 폼 이미지
  const [user, setUser] = useState<User | null>(null); // 유저 정보->제거 예정
  const searchInputRef = useRef<HTMLInputElement>(null); //포커싱을 주기위한 inputRef
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 선택 창 Ref
  const [latestUserAnswer, setLatestUserAnswer] = useState<{
    answer_text: string;
    answer_answer: string;
    answer_image: string | null;
  } | null>(null); //슈퍼베이스에서 가져온 답변 정보
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const session = supabase.auth.getSession();

      if (!session) {
        AlertError("로그인 세션이 없습니다.");
        if (typeof window !== "undefined") {
          router.push("/login");
        }
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error) {
        AlertError("유저 정보를 가져오는데 오류가 발생했습니다.");
      } else {
        setUser(data.user);
      }
    };

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    checkUser();
  }, [router]);

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => resetFormState(setQuestion, setPreviewUrl); //폼 제출 후 폼을 초기화

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim() && !previewUrl) return;

    setIsLoading(true);
    setAnswer("");

    let imageUrl: string | null = null;

    try {
      if (fileInputRef.current?.files?.[0]) {
        imageUrl = await uploadImageToSupabase(fileInputRef.current.files[0]);
        if (!imageUrl) {
          AlertError(
            "이미지 업로드 중에 문제가 발생했습니다. 다시 시도해주세요"
          );
          setIsLoading(false);
          return;
        }
      }

      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          image_url: imageUrl,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "API 요청 실패");
      }

      const data = await res.json();
      setAnswer(data);
      resetForm();

      if (data === NO_ANSWER) {
        return; //답변을 생성하지 못하거나 문제를 인식하지 못한경우 함수를 종료 & answer로 비교할시 비동기 처리 문제 때문에 원하는결과를 얻지 못할수도있음
      }

      const { error } = await supabase.from("answers").insert({
        //api 응답을 슈퍼베이스에 저장
        answer_user_id: user?.id || "",
        answer_text: question,
        answer_image: imageUrl,
        answer_answer: data,
      });

      if (error) {
        console.error("데이터 저장 실패:", error);
      }

      setLatestUserAnswer({
        answer_text: question,
        answer_answer: data,
        answer_image: imageUrl,
      });
    } catch (error) {
      console.error("오류 발생:", error);
      setAnswer("죄송합니다. 답변을 생성하는 중 오류가 발생했습니다.");
      resetForm();
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
            ref={searchInputRef}
            value={question}
            onChange={handleQuestionChange}
            placeholder="질문을 입력하거나 파일을 업로드해보세요"
            maxLength={100}
            className="w-full bg-transparent text-white text-lg font-['Gothic_A1'] focus:outline-none break-words"
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleUploadButtonClick}
              className="flex-shrink-0"
            >
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
              disabled={isLoading || (!question.trim() && !previewUrl)}
            >
              <Image
                className={`w-7 h-7 ${isLoading ? "opacity-50" : ""}`}
                src="https://cdn-icons-png.flaticon.com/512/7109/7109313.png"
                alt="검색 이미지"
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>

        <MainImagePreview
          previewUrl={previewUrl}
          handleRemoveImage={handleRemoveImage}
        />
      </form>

      <MainAnswer
        isLoading={isLoading}
        answer={answer || latestUserAnswer?.answer_answer || ""}
        question={latestUserAnswer?.answer_text || ""}
        imageUrl={latestUserAnswer?.answer_image || undefined}
      />

      <MainFileUploader
        fileInputRef={fileInputRef}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default MainSearchBar;

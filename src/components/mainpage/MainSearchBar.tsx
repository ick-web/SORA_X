"use client";
//리팩토링 필요
import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import MainAnswer from "./MainAnswer";
import MainImagePreview from "./MainPagePreview";
import supabase from "@/app/supabase/client";
import { User } from "@supabase/supabase-js";

const MainSearchBar = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        alert("error");
      } else {
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("5MB 이하의 이미지만 업로드 가능합니다.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setImageBase64("");
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question.trim() && !imageBase64) return;

    setIsLoading(true);
    setAnswer("");

    const handlerUrl = "/api/openai";

    try {
      const res = await fetch(handlerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          image_url: imageBase64,
        }),
      });

      const data = await res.json();
      setAnswer(data);
    } catch (error) {
      console.error("오류 발생:", error);
      setAnswer("죄송합니다. 답변을 생성하는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }

    console.log(imageBase64);
    console.log(previewUrl);
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
              disabled={isLoading || (!question.trim() && !imageBase64)}
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

      <MainAnswer isLoading={isLoading} answer={answer} question={question} />

      {/*파일 업로드하는 창*/}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default MainSearchBar;

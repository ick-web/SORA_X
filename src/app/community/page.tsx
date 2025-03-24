import React from "react";
import supabase from "../supabase/client";
import { Answer } from "@/types/mainTypes";

const CommunityPage = async () => {
  const { data: answers, error } = await supabase
    .from("answers")
    .select("*")
    .order("answer_created_at", { ascending: false });

  if (error) {
    console.log("supabase error", error);
    return <div>데이터 불러오기에 실패했습니다.</div>;
  }

  return (
    <div className="w-full h-screen bg-color-black1">
      <div className="container max-w-4xl flex flex-col mx-auto py-28">
        <h1 className="text-3xl font-bold mb-8">질문의 광장</h1>
        <div className="space-y-6">
          {answers?.map((item: Answer) => (
            <div
              key={item.answer_id}
              className="p-6 bg-white shadow rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(item.answer_created_at).toLocaleString()}
                </span>
                {/* 향후 사용자 이름이나 프로필 이미지 추가 가능 */}
              </div>
              {item.answer_image && (
                <img
                  src={item.answer_image}
                  alt="질문 이미지"
                  className="w-full h-auto rounded mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{item.answer_text}</h2>
              <p className="text-gray-800">{item.answer_answer}</p>
              {/* 댓글 기능 추가 예정: 댓글 수, 댓글 작성 버튼 등 */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

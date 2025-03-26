import React from "react";
import supabase from "../supabase/client";
import { Answer } from "@/types/mainTypes";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const CommunityPage = async () => {
  const { data: answers, error } = await supabase
    .from("answers")
    .select("*, user: users (user_id, user_nickname)")
    .order("answer_created_at", { ascending: false });

  if (error) {
    console.log("supabase error", error);
    return <div>데이터 불러오기에 실패했습니다.</div>;
  }

  return (
    <div className="wrapper w-full h-screen overflow-hidden bg-color-black1">
      <div className="container w-1/2 flex flex-col mx-auto pt-24">
        <h1 className="text-3xl font-bold mb-8">질문의 광장</h1>
        <div className="bg-color-black2 rounded-xl w-full h-16 flex justify-start items-center px-8 mb-8">
          <h2 className="text-lg">
            <span className="text-color-orange2">
              다른 이용자들의 질문과 답변
            </span>
            을 확인하고, 함께 공부해 보세요!
          </h2>
        </div>

        {/* 질문 리스트 */}
        <div className="w-full max-h-[600px] overflow-y-auto space-y-6 flex flex-col">
          {answers?.map((item: Answer) => (
            <Link key={item.answer_id} href={`/detail/${item.answer_id}`}>
              <div className="w-full h-40 flex flex-col justify-center overflow-y-hidden bg-color-black1 text-white text-justify text-md rounded-lg">
                {/* 닉네임 + 날짜 */}
                <div className="w-full flex justify-between items-center mb-2">
                  <span className="text-md text-color-orange2 font-semibold">
                    🧩 {item.user?.user_nickname || "익명"}
                  </span>
                  <span className="text-sm text-color-black4">
                    {new Date(item.answer_created_at).toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-56 flex justify-between">
                  <div className="w-8/12 flex flex-col">
                    {/* 질문 */}
                    <h2 className="text-md text-white font-semibold mb-2">
                      {item.answer_text}
                    </h2>
                    {/* 답변 */}
                    <p className="w-full line-clamp-2 text-color-black4">
                      {item.answer_answer}
                    </p>
                  </div>
                  {/* 질문 이미지 (null 가능) */}
                  <div className="w-3/12 flex justify-center items-center ml-4">
                    {item.answer_image && (
                      <div className="border rounded-lg w-48 h-28 flex justify-center items-center">
                        <img
                          src={item.answer_image}
                          alt="질문 이미지"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  {/* 화살표 아이콘 */}
                  <div className="w-1/12 flex justify-center items-center">
                    <IoIosArrowForward className="w-8 h-8 aspect-square text-xl text-gray-300 bg-color-black4 rounded-full p-2 flex items-center justify-center" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

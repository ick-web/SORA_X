"use client";

import MypageHeader from "@/components/(mypage)/mypageHeader";
import { ReactNode, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  //수정 클릭
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //주스탄드 쓸 예정
  const user = {
    id: "6945ddb3-1281-4b59-b16c-f238709e37a9",
    nickname: "수수수",
  };
  return (
    <div className="p-10 gap-4">
      <div className="flex flex-row">
        <p className="text-4xl font-bold">마이페이지</p>
        <div className="flex flex-row">
          <div
            onClick={() => setIsVisible(!isVisible)}
            className="px-4 py-2 text-white rounded-md"
          >
            수정아이콘
          </div>
          <div
            className={`${
              isVisible ? "block" : "hidden"
            } flex flex-row p-1 bg-gray-200 rounded-md gap-1`}
          >
            <input />
            <button className="border-2 border-orange-500 bg-orange-500 rounded ">
              중복검사
            </button>
            <button className="border-2 border-orange-500 bg-orange-500 rounded ">
              수정
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 m-8 py-10 text-xl text-white rounded-xl">
        <p className="pl-5 flex flex-row">
          <p className="text-orange-500 font-bold pr-1">{user.nickname}님</p>의
          질문과 답변을 모아보고 복습해보세요!
        </p>
      </div>
      <MypageHeader />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

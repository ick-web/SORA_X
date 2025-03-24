"use client";

import MypageHeader from "@/components/(mypage)/mypageHeader";
import { ReactNode, useState } from "react";
import supabase from "../supabase/client";

const Layout = ({ children }: { children: ReactNode }) => {
  //수정state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newNickName, setNewNickName] = useState<string>("");
  const [canChange, setCanChange] = useState<boolean>(false);

  //주스탄드 쓸 예정
  let user = {
    id: "6945ddb3-1281-4b59-b16c-f238709e37a9",
    nickname: "수수수",
  };

  //중복 확인//타입 넣기
  const checkNickname = async () => {
    const { data: users, error } = await supabase
      .from("users")
      .select("user_nickname");
    if (error) {
      console.log("오류남");
    } else {
      const isExist = users.some((user) => user.user_nickname === newNickName);

      if (isExist) {
        alert("이미 존재합니다!");
      } else {
        alert("추가할 수 있습니다~!");
        setCanChange(true);
      }
    }
  };

  //수정하기
  const changeNickname = async (e) => {
    e.preventDefault();
    if (canChange) {
      const { data, error } = await supabase
        .from("users")
        .update({ user_nickname: newNickName })
        .eq("user_id", user.id);
      //.select("*");
      console.log("data:", data);
      console.log("error:", error);
      if (error) {
        //alert(`${error}`);
      } else {
        //alert(" " + data[0]);
        console.log(data);
      }
    } else {
      alert("중복검사를 먼저 해주세요!");
    }
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
          <form
            onSubmit={changeNickname}
            className={`${
              isVisible ? "block" : "hidden"
            } flex flex-row p-1 bg-gray-200 rounded-md gap-1`}
          >
            <input
              value={newNickName}
              onChange={(e) => setNewNickName(e.target.value)}
            />
            <button
              className="border-2 border-orange-500 bg-orange-500 rounded "
              type="button"
              onClick={() => {
                checkNickname();
              }}
            >
              중복검사
            </button>
            <button
              className="border-2 border-orange-500 bg-orange-500 rounded "
              type="submit"
            >
              수정
            </button>
          </form>
        </div>
      </div>
      <div className="bg-gray-700 m-8 py-10 text-xl text-white rounded-xl">
        <div className="pl-5 flex flex-row">
          <p className="text-orange-500 font-bold pr-1">{user.nickname}님</p>의
          질문과 답변을 모아보고 복습해보세요!
        </div>
      </div>
      <MypageHeader />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

"use client";

import MypageHeader from "@/components/(mypage)/mypageHeader";
import { ReactNode, useState } from "react";
import supabase from "../supabase/client";
import { RiEdit2Fill } from "react-icons/ri";

const Layout = ({ children }: { children: ReactNode }) => {
  //수정state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newNickName, setNewNickName] = useState<string>("");
  const [canChange, setCanChange] = useState<boolean>(false);

  //주스탄드 쓸 예정
  const user = {
    id: "6945ddb3-1281-4b59-b16c-f238709e37a9",
    nickname: "수수수",
  };

  //중복 확인//타입 넣기
  const checkNickname = async () => {
    if (newNickName === "") {
      alert("닉네임을 입력해주세요!");
    } else {
      const { data: users, error } = await supabase
        .from("users")
        .select("user_nickname");
      if (error) {
        console.log("오류남");
      } else {
        const isExist = users.some(
          (user) => user.user_nickname === newNickName
        );
        if (isExist) {
          alert("이미 존재합니다!");
        } else {
          alert("추가할 수 있습니다~!");
          setCanChange(true);
        }
      }
    }
  };

  //수정하기
  const changeNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canChange) {
      const { data, error } = await supabase
        .from("users")
        .update({ user_nickname: newNickName })
        .eq("user_id", user.id);
      if (error) {
        alert(`${error}`);
      } else {
        //alert(" " + data[0]);
        alert("추가되었습니다");
        console.log(data);
      }
    } else {
      alert("중복검사를 먼저 해주세요!");
    }
  };

  return (
    <div className=" flex flex-col justify-center h-screen overflow-hidden">
      <div className="flex flex-col p-7 my-3 gap-4 bg-color-black1 rounded-3xl h-screen overflow-hidden">
        <div className="flex-2">
          <div className="flex flex-row ">
            <p className="text-4xl font-bold">마이페이지</p>
            <div className="flex flex-row">
              <div
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 text-white rounded-md mt-1"
              >
                <RiEdit2Fill className="text-color-orange1 text-2xl" />
              </div>
              <form
                onSubmit={changeNickname}
                className={`${
                  isVisible ? "block" : "hidden"
                } flex flex-row p-1 bg-color-black2 rounded-md gap-1`}
              >
                <input
                  className="text-color-orange1"
                  value={newNickName}
                  onChange={(e) => setNewNickName(e.target.value)}
                />
                <button
                  className="border-2 border-color-orange1 bg-color-orange1 rounded "
                  type="button"
                  onClick={() => {
                    checkNickname();
                  }}
                >
                  중복검사
                </button>
                <button
                  className="border-2 border-color-orange1 bg-color-orange1 rounded "
                  type="submit"
                >
                  수정
                </button>
              </form>
            </div>
          </div>
          <div className="bg-color-black3 m-8 py-10 text-xl text-white rounded-xl">
            <div className="pl-5 flex flex-row">
              <p className="text-color-orange1 font-bold pr-1">
                {user.nickname}님
              </p>
              의 질문과 답변을 모아보고 복습해보세요!
            </div>
          </div>
          <MypageHeader />
          <div className="border-t border-color-black3 my-6 " />
        </div>
        <div className="flex-1  overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

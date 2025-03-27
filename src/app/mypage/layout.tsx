"use client";

import MypageHeader from "@/components/(mypage)/mypageHeader";
import { ReactNode, useEffect, useState } from "react";
import supabase from "../supabase/client";
import { RiEdit2Fill } from "react-icons/ri";
import { useNicknameData, useUserData } from "@/hooks/mypage/useUserData";
import { AlertSuccess, AlertError, AlertInfo } from "@/utils/alert";
import { useQueryClient } from "@tanstack/react-query";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newNickName, setNewNickName] = useState<string>("");
  const [canChange, setCanChange] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const [usernickname, setNickname] = useState<string>("");

  const {
    data: userid,
    isPending: isUserPending,
    isError: isUserError,
  } = useUserData();

  const { data: nickname, isPending, isError } = useNicknameData(userid);
  if (isError) {
    <div>오류!!</div>;
  }
  if (isPending) {
    <div>가져오고 있어요~</div>;
  }

  useEffect(() => {
    if (nickname) {
      setNickname(nickname);
    }
  }, [nickname]);

  if (isUserPending) return <p>유저 정보 로딩 중...</p>;
  if (isUserError || !userid) return <p>유저 정보를 불러오는 중 오류 발생</p>;

  const checkNickname = async () => {
    if (newNickName === "") {
      AlertInfo("안내", "닉네임을 입력해주세요!");
    } else {
      const { data: users, error } = await supabase
        .from("users")
        .select("user_nickname");
      if (error) {
        AlertError("오류", "죄송합니다! 오류가 발생했습니다!");
      } else {
        const isExist = users.some(
          (user) => user.user_nickname === newNickName
        );
        if (isExist) {
          AlertInfo("안내", "이미 존재합니다!");
        } else {
          AlertSuccess("성공!", "추가할 수 있습니다~!");
          setCanChange(true);
        }
      }
    }
  };

  const changeNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canChange) {
      const { error } = await supabase
        .from("users")
        .update({ user_nickname: newNickName })
        .eq("user_id", userid);
      if (error) {
        AlertError("오류", "죄송합니다! 오류가 발생했습니다!");
      } else {
        AlertSuccess("성공!!", "수정 되었습니다");
        queryClient.setQueryData(["nickname", userid], newNickName);
        setNickname(newNickName);
        setCanChange(false);
      }
    } else {
      AlertInfo("안내", "중복검사를 먼저 진행해주세요!");
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
                {usernickname ? usernickname : "??"}님
              </p>
              의 질문과 답변을 모아보고 복습해보세요!
            </div>
          </div>
          <MypageHeader />
        </div>
        <div className="flex-1  overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

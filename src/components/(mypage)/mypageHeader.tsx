"use client";

import Link from "next/link";
import { useState } from "react";

const MypageHeader = () => {
  //페이지 클릭
  const [isClicked, setIsClicked] = useState<boolean>(false);
  //추후 어느 것이 클릭 됐는지 나타내는 기능... (테두리 생각 중) 추가 예정
  return (
    <div className="flex flex-row text-xl font-bold gap-3 ">
      <Link href="/mypage">나의 질문</Link>
      <Link href="/mypage/mycomments">나의 댓글</Link>
    </div>
  );
};

export default MypageHeader;

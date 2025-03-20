import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <header>
        <nav className="container mx-auto flex justify-around">
          <Link href="/">질문하기</Link>
          <Link href="/community">만남의 광장?</Link>
          <Link href="/ranking">랭킹 보기</Link>
          <Link href="/mypage">마이페이지</Link>
          <Link href="/login">로그인 만들어주세요</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;

import Link from "next/link";

const MypageHeader = () => {
  return (
    <div className="flex flex-row text-xl font-bold gap-3">
      <Link href="/mypage">나의 질문</Link>
      <Link href="/mypage/mycomments">나의 댓글</Link>
    </div>
  );
};

export default MypageHeader;

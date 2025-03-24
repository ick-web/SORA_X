import Link from "next/link";

const RankingHeader = () => {
  return (
    <div className="flex gap-8 text-xl font-bold">
      <Link href="/ranking">질문 랭킹</Link>
      <Link href="/ranking/comment-rank">댓글 랭킹</Link>
    </div>
  );
};

export default RankingHeader;

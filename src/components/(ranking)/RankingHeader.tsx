"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const RankingHeader = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-8 text-xl font-bold text-white">
      <div className="relative flex gap-4">
        <Link href="/ranking" className="relative py-2">
          질문 랭킹
        </Link>
        <Link href="/ranking/comment-rank" className="relative py-2">
          댓글 랭킹
        </Link>
        <motion.div
          className="absolute bottom-0 h-1 bg-white"
          layoutId="underline"
          initial={false}
          animate={{
            width: pathname === "/ranking" ? "80px" : "80px", // 탭 크기 조절
            x: pathname === "/ranking" ? "0%" : "118%", // 왼쪽 <-->오른쪽 이동
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
};

export default RankingHeader;

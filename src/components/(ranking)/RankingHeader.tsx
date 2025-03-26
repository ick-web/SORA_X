"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const RankingHeader = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex gap-4 text-xl font-medium text-white ">
      <Link href="/ranking" className="relative py-2 focus:text-color-orange1">
        질문 랭킹
      </Link>
      <Link href="/ranking/comment-rank" className="relative py-2 focus:text-color-orange1">
        댓글 랭킹
      </Link>
      <motion.div
        className="absolute bottom-0 h-1 bg-color-orange1"
        layoutId="underline"
        initial={false}
        animate={{
          width: pathname === "/ranking" ? "80px" : "80px", // 탭 크기 조절
          x: pathname === "/ranking" ? "0%" : "118%", // 왼쪽 <-->오른쪽 이동
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, ease: "easeIn" }}
      />
    </div>
  );
};

export default RankingHeader;

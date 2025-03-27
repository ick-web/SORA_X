"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const RankingHeader = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex gap-4 text-xl font-medium text-white ">
      <Link href="/ranking" className="relative">
        질문 랭킹
      </Link>
      <Link href="/ranking/comment-rank" className="relative">
        댓글 랭킹
      </Link>
      <motion.div
        className="absolute bottom-0 h-1 bg-white"
        layoutId="underline"
        initial={false}
        animate={{
          width: pathname === "/ranking" ? "80px" : "80px",
          x: pathname === "/ranking" ? "0%" : "118%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default RankingHeader;

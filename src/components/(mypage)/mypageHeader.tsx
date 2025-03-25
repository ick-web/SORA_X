"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const MypageHeader = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row text-xl font-bold gap-3 ">
      <div className="relative flex gap-4">
        <Link href="/mypage">나의 질문</Link>
        <Link href="/mypage/mycomments">나의 댓글</Link>

        {/* 애니메이션 되는 언더라인 */}
        <motion.div
          className="absolute bottom-0 h-1 bg-white"
          layoutId="underline"
          initial={false}
          animate={{
            width: pathname === "/mypage" ? "80px" : "80px", // 탭 크기 조절
            x: pathname === "/mypage" ? "0%" : "118%", // 왼쪽 <-->오른쪽 이동
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
};

export default MypageHeader;

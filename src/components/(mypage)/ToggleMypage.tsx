"use client";

import { useAuthStore } from "@/stores/store";
import Link from "next/link";
import { RiInbox2Fill } from "react-icons/ri";

const ToggleMypage = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <Link
      href="/mypage"
      className="flex justify-start items-center text-center text-md font-medium text-neutral-200 gap-2 transition-all duration-300 hover:text-color-orange2"
    >
      <RiInbox2Fill className="text-2xl" />
      마이페이지
    </Link>
  );
};

export default ToggleMypage;

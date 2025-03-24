import Image from "next/image";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { RiInbox2Fill } from "react-icons/ri";
import { HiMiniTrophy } from "react-icons/hi2";

const Header = () => {
  return (
    <div className="w-80 h-screen p-3">
      <header className="w-full h-full bg-neutral-800 text-white p-8 rounded-3xl">
        <div className="flex justify-start items-center gap-2 mb-8">
          <Image src="/soraX-logo.png" alt="Logo" width={32} height={32} />
          <h1 className="text-3xl font-bold">Sora X</h1>
        </div>
        <nav className="container w-full h-full mx-auto flex flex-col justify-start space-y-6">
          <Link
            href="/"
            className="border border-neutral-500 rounded-full bg-neutral-900 w-56 h-10 flex justify-start items-center gap-2 pl-4 text-sm text-neutral-300 mb-3 transition-all duration-300 hover:bg-neutral-700"
          >
            <CiCirclePlus className="text-xl text-neutral-300" />새 질문
          </Link>
          <Link
            href="/"
            className="flex justify-start items-center text-center text-md font-medium text-neutral-200 gap-2 transition-all duration-300 hover:text-color-orange2"
          >
            <AiFillHome className="text-2xl" />홈
          </Link>
          <Link
            href="/community"
            className="flex justify-start items-center text-center text-md font-medium text-neutral-200 gap-2 transition-all duration-300 hover:text-color-orange2"
          >
            <FaBookmark className="text-2xl" />
            질문의 광장
          </Link>
          <Link
            href="/mypage"
            className="flex justify-start items-center text-center text-md font-medium text-neutral-200 gap-2 transition-all duration-300 hover:text-color-orange2"
          >
            <RiInbox2Fill className="text-2xl" />
            마이페이지
          </Link>
          <Link
            href="/ranking"
            className="flex justify-start items-center text-center text-md font-medium text-neutral-200 gap-2 transition-all duration-300 hover:text-color-orange2"
          >
            <HiMiniTrophy className="text-2xl" />
            학습 랭크
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;

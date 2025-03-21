import MypageHeader from "@/components/(mypage)/mypageHeader";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-10 gap-4">
      <p className="text-4xl font-bold">마이페이지</p>
      <div className="bg-gray-700 m-8 py-10 text-xl text-white rounded-xl">
        <p className="pl-5 flex flex-row">
          <p className="text-orange-500">나의 질문과 답변</p>을 모아보고
          복습해보세요!
        </p>
      </div>
      <MypageHeader />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

import RankingHeader from "@/components/(ranking)/RankingHeader";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-['Gothic_A1'] flex flex-col justify-center items-center m-8">
      <main className="flex flex-col items-start gap-8">
        <h1 className="text-4xl font-bold">Ranking</h1>
        <RankingHeader />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

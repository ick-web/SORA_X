import RankingHeader from "@/components/(ranking)/RankingHeader";
import RefreshButton from "@/components/(ranking)/RefreshButton";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center m-16">
      <main className="flex flex-col justify-center items-start gap-8">
        <h1 className="text-4xl font-bold">Ranking</h1>
        <div className="w-full flex flex-row justify-between items-center gap-8">
          <RankingHeader />
          <RefreshButton />
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

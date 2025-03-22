import { RANKING_COUNT } from "@/constants/rank";
import React from "react";

const CommentRank = () => {
  return (
    <ul className="space-y-8">
      {RANKING_COUNT.map((num) => {
        return (
          <li key={num} className="flex flex-row gap-8 w-full">
            <p
              className={`w-14 text-right text-2xl mr-16 ${[1, 2, 3].includes(num) ? "text-orange-500" : "text-white"}`}
            >
              {num}등
            </p>
            <p className="w-16 text-xl mr-96">닉네임</p>
            <p className="w-10 text-xl">횟수</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentRank;

import CommentRank from "@/components/(ranking)/CommentRank";
import React from "react";

export const revalidate = 600;

const CommentRankPage = () => {
  return (
    <div className="flex flex-col justify-center items-start gap-8">
      <CommentRank />
    </div>
  );
};

export default CommentRankPage;

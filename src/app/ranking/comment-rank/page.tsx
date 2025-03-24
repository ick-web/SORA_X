import CommentRank from "@/components/(ranking)/CommentRank";
import { TEN_SECOND } from "@/constants/ranking/revalidate-time";
import { fetchCommentUsers } from "@/utils/ranking/server-action";
import React from "react";

export const revalidate = TEN_SECOND;

const CommentRankPage = async () => {
  const commentUsers = await fetchCommentUsers();

  return (
    <div className="flex flex-col justify-center items-start gap-8">
      <CommentRank commentUsers={commentUsers} />
    </div>
  );
};

export default CommentRankPage;

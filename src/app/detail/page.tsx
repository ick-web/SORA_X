import React from "react";
import QuestionDetail from "@/components/(detail)/QuestionDetail";
import CommentList from "@/components/(detail)/comments/CommentList";

const DetailPage = () => {
  const answerId = "bafb482a-b5f6-43ea-af90-254941ecb660"; // 임시로 answer_id 넣음

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-white">
      <QuestionDetail answerId={answerId} />
      <CommentList answerId={answerId} />
    </div>
  );
};

export default DetailPage;

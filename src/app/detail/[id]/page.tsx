import React from "react";
import QuestionDetail from "@/components/(detail)/QuestionDetail";
import CommentList from "@/components/(detail)/comments/CommentList";

type DetailPageProps = {
  params: { id: string };
};

const DetailPage = ({ params }: DetailPageProps) => {
  const { id } = params;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-white">
      <QuestionDetail answerId={id} />
      <CommentList answerId={id} />
    </div>
  );
};

export default DetailPage;

import React from "react";
import QuestionDetail from "@/components/(detail)/QuestionDetail";
import CommentList from "@/components/(detail)/comments/CommentList";

type DetailPageProps = {
  params: { id: string };
};

const DetailPage = ({ params }: DetailPageProps) => {
  const { id } = params;

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      <div className="rounded-3xl w-full h-full flex justify-center items-center bg-color-black1 m-3">
        <div className="overflow-y-auto w-1/2 h-4/5 flex flex-col mx-auto">
          <QuestionDetail answerId={id} />
          <CommentList answerId={id} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

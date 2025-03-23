import React from "react";
import QuestionDetail from "@/components/(detail)/QuestionDetail";
import CommentList from "@/components/(detail)/comments/CommentList";

const EditPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-white">
      <QuestionDetail />
      <CommentList />
    </div>
  );
};

export default EditPage;

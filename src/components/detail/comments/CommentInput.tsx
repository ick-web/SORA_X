"use client";

import { useState } from "react";

const CommentInput = () => {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (!comment) return;
    alert(`댓글 등록 예정 : ${comment}`);
    setComment("");
  };

  return (
    <div className="mt-4 flex items-center">
      <input
        className="w-full p-2 bg-gray-700 rounded text-white"
        placeholder="댓글을 입력하세요..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="w-20 ml-2 px-4 py-2 bg-orange-500 rounded"
        onClick={handleAddComment}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;

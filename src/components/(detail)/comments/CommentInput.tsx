"use client";

import { getUserSession } from "@/utils/auth/getUserSession";
import { addComment } from "@/utils/detail/addComment";
import { useEffect, useState } from "react";

const CommentInput = ({ answerId }: { answerId: string }) => {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserSession();
      if (user) setUserId(user.id);
    };

    fetchUser();
  }, []);

  const handleAddComment = async () => {
    if (!comment) return;
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const result = await addComment(answerId, userId, comment);

    if (result) {
      alert("댓글이 등록되었습니다!");
      setComment("");
    } else {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="mt-4 flex items-center">
      <input
        className="w-full p-2 bg-color-black2 rounded text-white"
        placeholder="댓글을 입력하세요..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="w-20 ml-2 px-4 py-2 bg-color-orange1 rounded"
        onClick={handleAddComment}
        disabled={!userId}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;

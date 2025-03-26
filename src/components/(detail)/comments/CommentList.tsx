"use client";

import { fetchCommentById } from "@/utils/detail/fetchCommentById";
import { addComment } from "@/utils/detail/addComment";
import { getUserSession } from "@/utils/auth/getUserSession";
import { Comment } from "@/types/commentTypes";
import { useEffect, useState } from "react";

const CommentList = ({ answerId }: { answerId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // 댓글 목록 가져오기
  useEffect(() => {
    const getComments = async () => {
      const fetchedComments = await fetchCommentById(answerId);
      setComments(fetchedComments);
    };
    getComments();
  }, [answerId]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserSession();
      if (user) setUserId(user.user.id);
    };

    fetchUser();
  }, []);

  // 댓글 추가 핸들러
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newComment = await addComment(answerId, userId, comment);
    if (newComment) {
      setComments((prev) => [newComment, ...prev]); // 최신 댓글이 위로 오도록 추가
      setComment("");
      alert("댓글이 등록되었습니다!");
    } else {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">COMMENT</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.comment_id}
            className="border-2 border-color-orange2 rounded-lg p-4 mb-4"
          >
            <span className="font-bold">{comment.users?.user_nickname || "익명"}</span>
            <span className="ml-2 text-color-black3 text-sm">
              {new Date(comment.comment_created_at).toLocaleString()}
            </span>
            <p className="mt-2">{comment.comment_content}</p>
          </div>
        ))
      ) : (
        <p className="text-color-black2">아직 댓글이 없습니다.</p>
      )}

      {/* 댓글 입력 필드 */}
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
    </div>
  );
};

export default CommentList;

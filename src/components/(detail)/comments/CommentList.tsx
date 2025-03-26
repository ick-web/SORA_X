"use client";

import { fetchCommentById } from "@/utils/detail/fetchCommentById";
import { getUserSession } from "@/utils/auth/getUserSession";
import { Comment } from "@/types/commentTypes";
import { useEffect, useState } from "react";
import { updateComment } from "@/utils/detail/updateComment";
import { deleteComment } from "@/utils/detail/deleteComment";
import CommentInput from "./CommentInput";

const CommentList = ({ answerId }: { answerId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  // const [comment, setComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  // 댓글 목록 가져오기
  useEffect(() => {
    const getComments = async () => {
      const fetchedComments = await fetchCommentById(answerId);
      setComments(fetchedComments);
    };
    getComments();

    const fetchUser = async () => {
      const user = await getUserSession();
      if (user) setUserId(user.user.id);
    };
    fetchUser();
  }, [answerId]);

  // 댓글 추가 핸들러
  const handleAddComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    const success = await deleteComment(commentId);
    if (success) {
      setComments(comments.filter((c) => c.comment_id !== commentId));
    }
  };

  // 댓글 수정 핸들러
  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) return;
    const success = await updateComment(commentId, editContent);
    if (success) {
      setComments(
        comments.map((c) =>
          c.comment_id === commentId
            ? { ...c, comment_content: editContent }
            : c
        )
      );
      setEditCommentId(null);
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
            <span className="font-bold">
              {comment.users?.user_nickname || "익명"}
            </span>
            <span className="ml-2 text-color-black3 text-sm">
              {new Date(comment.comment_created_at).toLocaleString()}
            </span>

            {editCommentId === comment.comment_id ? (
              <div className="mt-2">
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border bg-color-black2 rounded"
                />
                <button
                  onClick={() => handleEditComment(comment.comment_id)}
                  className="ml-2"
                >
                  저장
                </button>
                <button onClick={() => setEditCommentId(null)} className="ml-2">
                  취소
                </button>
              </div>
            ) : (
              <p className="mt-2">{comment.comment_content}</p>
            )}

            {userId === comment.comment_user_id && (
              <div className="mt-2">
                <button onClick={() => setEditCommentId(comment.comment_id)}>
                  수정
                </button>
                <button
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  className="ml-2"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-color-black2">아직 댓글이 없습니다.</p>
      )}

      <CommentInput answerId={answerId} onAddComment={handleAddComment} />
    </div>
  );
};

export default CommentList;

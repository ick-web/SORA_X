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

  useEffect(() => {
    if (editCommentId) {
      const editingComment = comments.find(
        (c) => c.comment_id === editCommentId
      );
      setEditContent(editingComment ? editingComment.comment_content : "");
    }
  }, [editCommentId, comments]);

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
            {/* ✅ 닉네임 + 작성 날짜 + 버튼 한 줄 정렬 */}
            <div className="flex items-center justify-between border-b border-color-black3 pb-4">
              <div>
                <span className="font-bold">
                  {comment.users?.user_nickname || "익명"}
                </span>
                <span className="ml-2 text-color-black3 text-sm">
                  {new Date(comment.comment_created_at).toLocaleString()}
                </span>
              </div>

              {userId === comment.comment_user_id && (
                <div className="flex gap-2">
                  {editCommentId === comment.comment_id ? (
                    <>
                      <button
                        onClick={() => handleEditComment(comment.comment_id)}
                        className="px-3 py-1 bg-gray-700 rounded text-white"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditCommentId(null)}
                        className="px-3 py-1 bg-gray-600 rounded text-white"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditCommentId(comment.comment_id)}
                        className="px-3 py-1 border border-color-orange1 rounded text-white"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.comment_id)}
                        className="px-3 py-1 bg-color-orange1 rounded text-white"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ✅ 댓글 내용 */}
            {editCommentId === comment.comment_id ? (
              <div className="mt-2">
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border bg-color-black2 rounded"
                />
              </div>
            ) : (
              <p className="mt-2">{comment.comment_content}</p>
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

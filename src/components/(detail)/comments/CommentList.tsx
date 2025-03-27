"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCommentById } from "@/utils/detail/fetchCommentById";
import { updateComment } from "@/utils/detail/updateComment";
import { deleteComment } from "@/utils/detail/deleteComment";
import { getUserSession } from "@/utils/auth/getUserSession";
import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import { AlertCheck } from "@/utils/alert";

const CommentList = ({ answerId }: { answerId: string }) => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserSession();
      if (user) setUserId(user.user.id);
    };
    fetchUser();
  }, []);

  const {
    data: comments = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["comments", answerId],
    queryFn: () => fetchCommentById(answerId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setEditCommentId(null);
    },
  });

  const handleDeleteComment = async (commentId: string) => {
    const isConfirmed = await AlertCheck(
      "댓글 삭제",
      "정말로 삭제하시겠습니까?",
      "삭제"
    );
    if (isConfirmed) {
      deleteMutation.mutate(commentId);
    }
  };

  const handleEditComment = (commentId: string) => {
    if (!editContent.trim()) return;
    updateMutation.mutate({ commentId, content: editContent });
  };

  useEffect(() => {
    if (editCommentId) {
      const editingComment = comments.find(
        (c) => c.comment_id === editCommentId
      );
      setEditContent(editingComment ? editingComment.comment_content : "");
    }
  }, [editCommentId, comments]);

  if (isPending) return <p>댓글을 불러오는 중...</p>;
  if (isError) return <p>댓글을 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">COMMENT</h2>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.comment_id}
            className="border-2 border-color-orange2 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between border-b border-color-black3 pb-2">
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
                        className="px-3 py-1 bg-color-black1 rounded text-white duration-300 hover:bg-color-black2"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditCommentId(null)}
                        className="px-3 py-1 bg-color-black2 rounded text-white duration-300 hover:bg-color-black1"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditCommentId(comment.comment_id)}
                        className="px-3 py-1 border border-color-orange1 rounded text-white duration-300 hover:bg-color-orange1"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.comment_id)}
                        className="px-3 py-1 bg-color-orange1 rounded text-white duration-300 hover:bg-color-orange2"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

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

      <CommentInput
        answerId={answerId}
        onAddComment={() =>
          queryClient.invalidateQueries({ queryKey: ["comments"] })
        }
      />
    </div>
  );
};

export default CommentList;

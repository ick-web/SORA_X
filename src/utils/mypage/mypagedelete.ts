import supabase from "@/app/supabase/client";

export const deleteanswer = async (answerId: string) => {
  try {
    const { error } = await supabase
      .from("answers")
      .delete()
      .eq("answer_id", answerId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    return false;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", commentId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    return false;
  }
};

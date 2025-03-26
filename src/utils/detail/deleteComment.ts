import supabase from "@/app/supabase/client";

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

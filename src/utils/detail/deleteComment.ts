import supabase from "@/app/supabase/client";

export const deleteComment = async (commentId: string) => {
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", commentId);

    if (error) throw error;

    return true;
  } catch (_error) {
    return false;
  }
};

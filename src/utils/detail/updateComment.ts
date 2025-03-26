import supabase from "@/app/supabase/client";

export const updateComment = async (commentId: string, newContent: string) => {
  try {
    const { error } = await supabase
      .from("comments")
      .update({ comment_content: newContent })
      .eq("comment_id", commentId);

    if (error) throw error;

    return true;
  } catch (_error) {
    return false;
  }
};

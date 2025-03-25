import supabase from "@/app/supabase/client";
import { Comment, newComment } from "@/types/commentTypes";

export const addComment = async (
  answerId: string,
  userId: string,
  content: string
): Promise<Comment | null> => {
  try {
    const newComment: newComment = {
      comment_answer_id: answerId,
      comment_user_id: userId,
      comment_content: content,
    };

    const { data, error } = await supabase
      .from("comments")
      .insert([newComment]);

    console.log("data:", data);
    console.log("error:", error);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

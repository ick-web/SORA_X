import supabase from "@/app/supabase/client";
import { Comment } from "@/types/comment";

export const fetchCommentById = async (
  answerId: string
): Promise<Comment[]> => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*, users (user_nickname)")
      .eq("comment_answer_id", answerId)
      .order("comment_created_at", { ascending: true }); // 최신 순 정렬

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

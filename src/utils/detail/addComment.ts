import supabase from "@/app/supabase/client";
import { newComment } from "@/types/commentTypes";

export const addComment = async (newComment: newComment) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([newComment]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

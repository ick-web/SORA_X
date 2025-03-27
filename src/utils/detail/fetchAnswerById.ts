import supabase from "@/app/supabase/client";

export const fetchAnswerById = async (answerId: string) => {
  try {
    const { data, error } = await supabase
      .from("answers")
      .select("*")
      .eq("answer_id", answerId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

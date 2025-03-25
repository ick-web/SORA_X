import supabase from "@/app/supabase/client";

export const fetchAnswerById = async (answerId: string) => {
  try {
    const { data, error } = await supabase
      .from("answers")
      .select("*")
      .eq("answer_id", answerId) // 임시로 answer_id 넣었습니다.
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
  }
};

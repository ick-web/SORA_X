import supabase from "@/app/supabase/client";
import { useQuery } from "@tanstack/react-query";

const SUPABASE_TABLE_NAME = {
  ANSWER: "answers",
  COMMENTS: "comments",
};

const getuserpost = async (userid: string) => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME.ANSWER)
    .select(`*`)
    .eq("answer_user_id", userid);
  if (error) {
    throw error;
  }
  return data;
};

export const usePostData = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getuserpost(userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};

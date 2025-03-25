import supabase from "@/app/supabase/client";
import { useQuery } from "@tanstack/react-query";

const SUPABASE_TABLE_NAME = {
  ANSWER: "answers",
  COMMENTS: "comments",
};

//유저 게시글 불러오기
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
    queryKey: ["answers", userId],
    queryFn: () => getuserpost(userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};

//유저 댓글 불러오기

const getusercomment = async (userid: string) => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME.COMMENTS)
    .select(`*`)
    .eq("comment_user_id", userid);
  if (error) {
    throw error;
  }
  return data;
};

export const useCommentData = (userId: string) => {
  return useQuery({
    queryKey: ["comments", userId],
    queryFn: () => getusercomment(userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};

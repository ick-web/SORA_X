import supabase from "@/app/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { AlertError } from "@/utils/alert";
const SUPABASE_TABLE_NAME = {
  ANSWER: "answers",
  COMMENTS: "comments",
};

//유저 게시글 불러오기
const getuserpost = async (userid: string | undefined) => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME.ANSWER)
    .select(`*`)
    .eq("answer_user_id", userid)
    .order("answer_created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const usePostData = (userId: string | undefined, options = {}) => {
  return useQuery({
    queryKey: ["answers", userId],
    queryFn: () => getuserpost(userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    enabled: !!userId, // userId가 없으면 실행 안 함
    ...options, // 추가 옵션 허용
  });
};

//유저 댓글 불러오기

const getusercomment = async (userid: string | undefined) => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME.COMMENTS)
    .select(`*`)
    .eq("comment_user_id", userid)
    .order("comment_created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const useCommentData = (userId: string | undefined, options = {}) => {
  return useQuery({
    queryKey: ["comments", userId],
    queryFn: () => getusercomment(userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    enabled: !!userId, // userId가 없으면 실행 안 함
    ...options, // 추가 옵션 허용
  });
};

//유저 정보
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    AlertError("오류!!", "사용자 정보를 가져오는 중 에러가 발생했습니다.");
  } else {
    return data.user.id;
  }
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};

//유저 닉네임
const getUserNickname = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from("users")
    .select("user_nickname")
    .eq("user_id", userId)
    .single(); // 단일 데이터 조회
  if (error) {
    console.error("유저 닉네임 조회 에러:", error.message);
    return null;
  }
  return data?.user_nickname;
};

export const useNicknameData = (userId: string | undefined, options = {}) => {
  return useQuery({
    queryKey: ["nickname", userId],
    queryFn: () => getUserNickname(userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    enabled: !!userId, // userId가 없으면 실행 안 함
    ...options, // 추가 옵션 허용
  });
};

"use server";

import supabase from "@/app/supabase/client";

export type QuestionUsersResponse = {
  user_nickname: string;
  answer_count: number;
};

export type CommentUsersResponse = {
  user_nickname: string;
  answer_count: number;
};

export const fetchQuestionUsers = async (): Promise<QuestionUsersResponse[] | null> => {
  const { data: questionUsers, error } = await supabase.rpc("get_users_by_answer_count");
  if (error) {
    console.error("질문을 한 유저정보를 불러오는 중 오류가 발생했습니다.", error);
    return null;
  }
  return questionUsers;
};

export const fetchCommentUsers = async (): Promise<CommentUsersResponse[] | null> => {
  const { data: commentUsers, error } = await supabase.rpc("get_users_by_comment_count");
  if (error) {
    console.error("댓글을 남긴 유저정보를 불러오는 중 오류가 발생했습니다.", error);
    return null;
  }
  return commentUsers;
};

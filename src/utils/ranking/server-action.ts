"use server";

import { revalidateTag } from "next/cache";

export type QuestionUsersResponse = {
  user_nickname: string;
  answer_count: number;
};

export type CommentUsersResponse = {
  user_nickname: string;
  answer_count: number;
};

export const fetchQuestionUsers = async (): Promise<QuestionUsersResponse[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_users_by_answer_count`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      next: { tags: ["questionUsers"] },
    });

    if (!response.ok) {
      console.error("질문 유저 데이터를 가져오는 중 오류 발생", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("fetchQuestionUsers 실패:", error);
    return null;
  }
};

export const fetchCommentUsers = async (): Promise<CommentUsersResponse[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_users_by_comment_count`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      next: { tags: ["commentUsers"] },
    });

    if (!response.ok) {
      console.error("댓글 유저 데이터를 가져오는 중 오류 발생", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("fetchCommentUsers 실패:", error);
    return null;
  }
};

export async function refreshData() {
  revalidateTag("questionUsers");
}

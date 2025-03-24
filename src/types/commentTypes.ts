export type Comment = {
  comment_id: string;
  comment_user_id: string;
  comment_content: string;
  comment_created_at: string;
  comment_answer_id: string;
  users: {
    user_nickname: string;
  };
};

export type addComment = Pick<
  Comment,
  "comment_user_id" | "comment_id" | "comment_answer_id"
>;

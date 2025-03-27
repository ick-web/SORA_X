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

export type newComment = Pick<
  Comment,
  "comment_answer_id" | "comment_user_id" | "comment_content"
>;

export interface Comment {
  comment_id: string;
  comment_user_id: string;
  comment_content: string;
  comment_created_at: string;
  comment_answer_id: string;
  users: {
    user_nickname: string;
  };
}

export type Comment = {
  comment_created_at: string;
  comment_content: string;
  comment_user_id: string;
  comment_id: string;
  comment_answer_id: string;
};

export type Answer = {
  answer_id: string;
  answer_create_at: string;
  answer_image: string | null;
  answer_text: string;
  answer_answer: string;
  answer_user_id: string;
};

export type User = {
  user_id: string;
  user_created_at: string;
  user_nickname: string;
  user_email: string;
};

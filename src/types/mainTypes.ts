//pr생성용 주석추가
export interface answerPropsType {
  isLoading: boolean;
  answer: string;
  question: string;
}

export type Answer = {
  answer_id: string;
  answer_created_at: string;
  // image = null 일 수 있음
  answer_image?: string;
  answer_text: string;
  answer_answer: string;
};

export type MessageContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export interface MessageTypes {
  role: "system" | "user";
  content: string | MessageContent[];
}

export interface RequestData {
  question: string;
  image_url?: string;
}

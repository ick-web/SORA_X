import { fetchAnswerById } from "@/utils/detail/fetchAnswerById";
import Image from "next/image";

const QuestionDetail = async () => {
  const answerId = "d61751e4-931a-4779-9d97-66654be5da2f"; // 임시로 answer_id 넣음
  const data = await fetchAnswerById(answerId);

  if (!data) return <p>데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-4 mb-10 border-b border-color-black3">
      <h2 className="text-2xl font-bold mb-4">질문</h2>
      <div className="bg-color-black2 mb-6 rounded p-2">
        {data.answer_image && (
          <Image
            src={data.answer_image}
            alt="User question"
            width={300}
            height={300}
            className="mb-6"
          />
        )}
        {data.answer_text && <p>{data.answer_text}</p>}
      </div>
      <h2 className="text-2xl font-bold mb-4">풀이</h2>
      <p className="bg-color-black2 mb-6 rounded p-2">{data.answer_answer}</p>
    </div>
  );
};

export default QuestionDetail;

import { fetchAnswerById } from "@/utils/fetchAnswerById";
import Image from "next/image";

const QuestionDetail = async () => {
  const answerId = "db085cbd-2f76-4312-9804-90eeb2499558"; // 임시로 answer_id 넣음
  const data = await fetchAnswerById(answerId);

  if (!data) return <p>데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-4 mb-10 border-b border-gray-700">
      <h2 className="text-2xl font-bold mb-4">질문</h2>
      <div className="bg-gray-700 mb-6 rounded p-2">
        {data.answer_image ? (
          <Image
            src={data.answer_image}
            alt="User question"
            width={100}
            height={100}
            className="mb-6"
          />
        ) : (
          <p>{data.answer_text}</p>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">풀이</h2>
      <p className="bg-gray-700 mb-6 rounded p-2">{data.answer_answer}</p>
    </div>
  );
};

export default QuestionDetail;

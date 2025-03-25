//다른 분 pr에 타입파일 새로 만드신거 있길래 일단 여기 넣어뒀습니다.
type Answer = {
  answer_id: string;
  answer_create_at: string;
  answer_image: string | null;
  answer_text: string;
  answer_answer: string;
  answer_user_id: string;
};

const Mycard = (answer: Answer) => {
  return (
    <div className="flex flex-row m-10 w-80% justify-center text-center">
      <div className="flex-1">
        <div className="text-xl font-bold">{answer.answer_text}</div>
        <div>{answer.answer_answer}</div>
        <div className="flex flex-row gap-3 justify-left ml-5">
          <button className="border-2 border-orange-500 rounded-l p-1">
            수정
          </button>
          <button className="border-2 border-orange-500 bg-orange-500 rounded p-1">
            삭제
          </button>
        </div>
      </div>
      {!answer.answer_image ? (
        <div className="flex-2"></div>
      ) : (
        <div className="border-2 border-white rounded-l flex-2">
          이미지 자리
        </div>
      )}

      <div className="flex-5">화살표 자리</div>
    </div>
  );
};

export default Mycard;

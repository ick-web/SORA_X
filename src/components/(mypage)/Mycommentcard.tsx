//다른 분 pr에 타입파일 새로 만드신거 있길래 일단 여기 넣어뒀습니다.
type Comment = {
  comment_created_at: string;
  comment_content: string;
  comment_user_id: string;
  comment_id: string;
  comment_answer_id: string;
};

const Mycommentcard = (comment: Comment) => {
  return (
    <div className="flex flex-row m-10 w-80% justify-center text-center">
      <div className="flex-1 ">
        <div className="text-xl font-bold mb-5">{comment.comment_content}</div>
        <div className="flex flex-row gap-3 justify-left ml-5">
          <button className="border-2 border-orange-500 rounded-l p-1">
            수정
          </button>
          <button className="border-2 border-orange-500 bg-orange-500 rounded p-1">
            삭제
          </button>
        </div>
      </div>
      <div className="flex-5">화살표 자리</div>
    </div>
  );
};

export default Mycommentcard;

const Mycard = () => {
  return (
    <div className="flex flex-row m-10">
      <div>
        <div className="text-xl font-bold">제목자리</div>
        <div>내용자리</div>
        <div className="flex flex-row gap-3">
          <button className="border-2 border-orange-500 rounded-l">수정</button>
          <button className="border-2 border-orange-500 bg-orange-500 rounded">
            삭제
          </button>
        </div>
      </div>
      <div>이미지 자리</div>
    </div>
  );
};

export default Mycard;

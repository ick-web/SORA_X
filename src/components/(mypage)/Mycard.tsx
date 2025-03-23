const Mycard = () => {
  return (
    <div className="flex flex-row m-10 w-80% justify-center text-center">
      <div className="flex-1">
        <div className="text-xl font-bold">제목자리</div>
        <div>내용자리</div>
        <div className="flex flex-row gap-3 justify-left ml-5">
          <button className="border-2 border-orange-500 rounded-l p-1">
            수정
          </button>
          <button className="border-2 border-orange-500 bg-orange-500 rounded p-1">
            삭제
          </button>
        </div>
      </div>
      <div className="border-2 border-white rounded-l flex-2">이미지 자리</div>
      <div className="flex-5">화살표 자리</div>
    </div>
  );
};

export default Mycard;

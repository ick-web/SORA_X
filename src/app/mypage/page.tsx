import Mycard from "@/components/(mypage)/Mycard";

const MyPage = () => {
  return (
    <div>
      <hr className="border-t border-gray-400 my-6" />
      <div className="flex flex-col  ">
        <Mycard />
        <Mycard />
      </div>
    </div>
  );
};

export default MyPage;

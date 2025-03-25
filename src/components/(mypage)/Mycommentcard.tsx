import { Comment } from "@/types/mypageTypes";
import { FaCircleChevronRight } from "react-icons/fa6";

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
      <div className="flex-5 items-center mt-2">
        <FaCircleChevronRight className="block fontSize-2em" />
      </div>
    </div>
  );
};

export default Mycommentcard;

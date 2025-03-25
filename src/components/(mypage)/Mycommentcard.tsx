import { Comment } from "@/types/mypageTypes";
import Link from "next/link";
import { FaCircleChevronRight } from "react-icons/fa6";

const Mycommentcard = (comment: Comment) => {
  return (
    <Link
      href={{
        pathname: "/detail",
        query: {
          answer_id: comment.comment_answer_id,
          comment_id: comment.comment_id,
        },
      }}
    >
      <div className="flex flex-row m-10 w-80% justify-center text-center">
        <div className="flex-1 ">
          <div className="text-xl font-bold mb-5">
            {comment.comment_content}
          </div>
          <div className="flex flex-row gap-3 justify-left ml-5">
            <button className="border-2 border-color-orange1 rounded-l p-1">
              수정
            </button>
            <button className="border-2 border-color-orange1 bg-color-orange1 rounded p-1">
              삭제
            </button>
          </div>
        </div>
        <div className="flex-5 items-center mt-2">
          <FaCircleChevronRight className="block fontSize-2em" />
        </div>
      </div>
    </Link>
  );
};

export default Mycommentcard;

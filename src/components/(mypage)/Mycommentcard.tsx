import { Comment } from "@/types/mypageTypes";
import { deleteComment } from "@/utils/mypage/mypagedelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";
import { AlertCheck } from "@/utils/alert";

const Mycommentcard = (comment: Comment) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  const handleDelete = async (commentId: string) => {
    const isConfirmed = await AlertCheck(
      "댓글 삭제",
      "정말로 이 댓글을 삭제하시겠습니까?",
      "삭제",
      "삭제 완료",
      "댓글이 삭제되었습니다."
    );
    if (isConfirmed) {
      deleteMutation.mutate(commentId);
    }
  };

  //
  return (
    <div className="border border-color-black2 m-2 rounded-xl">
      <Link href={`/detail/${comment.comment_answer_id}`}>
        <div className="flex flex-row mx-10 my-3 justify-center text-center">
          <div className="flex-1 ">
            <div className=" font-bold mb-5 line-clamp-3">
              {comment.comment_content}
            </div>
            <div className="flex flex-row gap-3 justify-left ml-5"></div>
          </div>
          <div className="flex-5 items-center mt-2">
            <IoIosArrowForward className="w-8 h-8 aspect-square text-xl text-gray-300 bg-color-black4 rounded-full p-2 flex items-center justify-center" />
          </div>
        </div>
      </Link>
      <button
        className="border-2 border-color-orange1 bg-color-orange1 rounded p-1 mb-3 ml-3"
        onClick={() => {
          handleDelete(comment.comment_id);
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Mycommentcard;

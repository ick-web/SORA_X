import supabase from "@/app/supabase/client";
import { Answer } from "@/types/mypageTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Mycard = (answer: Answer) => {
  //
  const queryClient = useQueryClient();

  const deleteanswer = async (answerId: string) => {
    try {
      const { error } = await supabase
        .from("answers")
        .delete()
        .eq("answer_id", answerId);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      return false;
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteanswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
  });

  const handleDelte = (answerId: string) => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      deleteMutation.mutate(answerId);
    }
  };
  //
  return (
    <div className="border border-color-black2 m-2 rounded-xl">
      <Link
        href={{
          pathname: "/detail",
          query: {
            answer_id: answer.answer_id,
          },
        }}
      >
        <div className="flex flex-row mx-10 my-3 justify-center text-center">
          <div className="flex-1 m-1">
            <div className="text-xl font-bold line-clamp-1 ">
              {answer.answer_text}
            </div>
            <div className="line-clamp-2">{answer.answer_answer}</div>
          </div>
          {answer.answer_image && (
            <div className="border rounded-lg w-52 h-36 flex justify-center items-center mx-1">
              <Image
                src={answer.answer_image}
                alt="질문 이미지"
                className="w-full h-full object-contain"
                width={60}
                height={50}
              />
            </div>
          )}
          <div className="flex flex-5 items-center justify-center ml-2">
            <IoIosArrowForward className="w-8 h-8 aspect-square text-xl text-gray-300 bg-color-black4 rounded-full p-2 flex items-center justify-center" />
          </div>
        </div>
      </Link>
      <button
        className="border-2 border-color-orange1 bg-color-orange1 rounded p-1 mb-3 ml-3"
        onClick={() => {
          handleDelte(answer.answer_id);
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Mycard;

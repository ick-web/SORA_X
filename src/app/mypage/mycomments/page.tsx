"use client";

import Mycommentcard from "@/components/(mypage)/Mycommentcard";
import { useCommentData, useUserData } from "@/hooks/mypage/useUserData";

const Mycomments = () => {
  const {
    data: userid,
    isPending: isUserPending,
    isError: isUserError,
  } = useUserData();

  const { data, isPending, isError } = useCommentData(userid, {
    enabled: !!userid,
  });

  if (isUserPending) return <p>유저 정보 로딩 중...</p>;
  if (isUserError || !userid) return <p>유저 정보를 불러오는 중 오류 발생</p>;

  if (isPending) return <p>댓글 정보 로딩 중...</p>;
  if (isError) return <p>댓글 정보를 불러오는 중오류 발생</p>;

  return (
    <div>
      <div className="flex flex-col">
        {data && data.length > 0 ? (
          data.map((comment) => (
            <Mycommentcard {...comment} key={comment.comment_id} />
          ))
        ) : (
          <p className="text-center text-color-orange2 m-10">
            작성한 댓글이 없습니다. 게시글을 둘러보며 댓글을 작성해보는 것이
            어떨까요? ☺️
          </p>
        )}
      </div>
    </div>
  );
};

export default Mycomments;

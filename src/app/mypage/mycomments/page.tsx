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
    enabled: !!userid, // userid가 존재할 때만 실행됨
  });

  if (isUserPending) return <p>유저 정보 로딩 중...</p>;
  if (isUserError || !userid) return <p>유저 정보를 불러오는 중 오류 발생</p>;

  if (isPending) return <p>댓글 정보 로딩 중...</p>;
  if (isError) return <p>댓글 정보를 불러오는 중오류 발생</p>;

  return (
    <div>
      <div className="flex flex-col  ">
        {data?.map((comment) => {
          return <Mycommentcard {...comment} key={comment.comment_id} />;
        })}
      </div>
    </div>
  );
};

export default Mycomments;

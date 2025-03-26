"use client";

import Myanswercard from "@/components/(mypage)/Myanswercard";
import { usePostData, useUserData } from "@/hooks/mypage/useUserData";

const MyPage = () => {
  const {
    data: userid,
    isPending: isUserPending,
    isError: isUserError,
  } = useUserData();
  const { data, isPending, isError } = usePostData(userid);

  if (isUserPending) return <p>유저 정보 로딩 중...</p>;
  if (isUserError || !userid) return <p>유저 정보를 불러오는 중 오류 발생</p>;

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생</p>;

  return (
    <div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {data && data.length > 0 ? (
          data?.map((post) => {
            return <Myanswercard {...post} key={post.answer_id} />;
          })
        ) : (
          <p className="text-center text-color-orange2 m-10">
            작성한 게시글이 없습니다. 수학 문제를 질문하거나 소라고둥님🐚을
            불러보는 것이 어떨까요? ☺️
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPage;

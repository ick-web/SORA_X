"use client";
import Mycommentcard from "@/components/(mypage)/Mycommentcard";
import { useCommentData } from "@/hooks/mypage/useUserData";

//후에 주스탄드로 유저 정보 저장 및 가져올 것
//user의 Nickname도 함께 저장 되어있으면 좋겠습니다.
const user = {
  id: "6945ddb3-1281-4b59-b16c-f238709e37a9",
  nickname: "수수수",
};

const Mycomments = () => {
  const { data: b, isPending, isError } = useCommentData(user.id);
  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생</p>;

  return (
    <div>
      <div className="border-t border-color-black3 my-6" />
      <div className="flex flex-col  ">
        {b?.map((bb) => {
          return <Mycommentcard {...bb} key={bb.comment_id} />;
        })}
      </div>
    </div>
  );
};

export default Mycomments;

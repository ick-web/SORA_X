"use client";
import supabase from "@/app/supabase/client";
import Mycommentcard from "@/components/(mypage)/Mycommentcard";
import { useCommentData } from "@/hooks/mypage/useUserData";
import { useEffect, useState } from "react";

const Mycomments = () => {
  useEffect(() => {
    getUser();
  }, []);

  const [userid, setUserid] = useState<string>("");
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      alert("사용자 정보를 가져오는 중 에러가 발생했습니다.");
    } else {
      setUserid(data.user.id);
    }
  };
  const { data, isPending, isError } = useCommentData(userid);
  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생</p>;

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

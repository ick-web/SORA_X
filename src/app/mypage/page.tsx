"use client";

import Myanswercard from "@/components/(mypage)/Myanswercard";
import { usePostData } from "@/hooks/mypage/useUserData";
import { useEffect, useState } from "react";
import supabase from "../supabase/client";

const MyPage = () => {
  const [userid, setUserid] = useState<string>("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      alert("사용자 정보를 가져오는 중 에러가 발생했습니다.");
    } else {
      setUserid(data.user.id);
    }
  };
  const { data, isPending, isError } = usePostData(userid);
  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생</p>;

  return (
    <div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {data?.map((post) => {
          return <Myanswercard {...post} key={post.answer_id} />;
        })}
      </div>
    </div>
  );
};

export default MyPage;

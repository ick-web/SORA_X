import supabase from "@/app/supabase/client";
import Mycommentcard from "@/components/(mypage)/Mycommentcard";

//후에 주스탄드로 유저 정보 저장 및 가져올 것
//user의 Nickname도 함께 저장 되어있으면 좋겠습니다.
const user = {
  id: "6945ddb3-1281-4b59-b16c-f238709e37a9",
  nickname: "수수수",
};

const SUPABASE_TABLE_NAME = {
  ANSWER: "answers",
  COMMENTS: "comments",
};

const mycomments = async () => {
  //게시글 불러오는 함수 (후에 커리에 넣을 예정)
  const getuserpost = async (userid: string) => {
    const { data, error } = await supabase
      .from(SUPABASE_TABLE_NAME.COMMENTS)
      .select(
        `
    *,
    users(*)
  `
      )
      .eq("comment_user_id", userid);
    if (error) {
      throw error;
    }
    return data;
  };

  const a = await getuserpost(user.id);

  return (
    <div>
      <div className="border-t border-gray-400 my-6" />
      <div className="flex flex-col  ">
        {a?.map((aa) => {
          return <Mycommentcard {...aa} key={aa.comment_id} />;
        })}
      </div>
    </div>
  );
};

export default mycomments;

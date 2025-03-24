import React from "react";
import QuestionRank from "@/components/(ranking)/QuestionRank";
import { fetchQuestionUsers } from "@/utils/ranking/server-action";
import { TEN_SECOND } from "@/constants/ranking/revalidate-time";

export const revalidate = TEN_SECOND;

const RankingPage = async () => {
  const questionUsers = await fetchQuestionUsers();

  return (
    <div className="flex flex-col justify-center items-start gap-8">
      <QuestionRank questionUsers={questionUsers} />
    </div>
  );
};

export default RankingPage;

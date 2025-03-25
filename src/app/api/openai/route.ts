//pr생성용 주석추가

import { RequestData } from "@/types/mainTypes";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export type MessageContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { question, image_url }: RequestData = await req.json();

  const systemPrompt = `너는 세계에서 수학을 가장 잘 알려주는 사람중에 한명이야. 
  학생들이 너에게 수학문제를 텍스트 혹은 이미지로 질문을 할거고 너는 그 학생의 수준을 고려해서 설명을 해줘야해.
  여기서 말한 수학이란 꼭 정석적인 수학의 모습이 아니야, 예를 들면 사고력 수학 문제일수도 있어.
  만약 너가 받는 프롬프트의 가장 앞에 "마법의 소라고둥님"이라고 되어있으면 수학 문제를 물어보는게 아니라 고민 상담을 하는것이니까 이거를 잘 기억하고 질문이 들어왔을때 간단하게 답을 해줬으면 좋겠어(마법의 소라고둥은 답변의 마지막에 소라고둥 이모지를 넣어줘).
  마법의 소라고둥님이라고 안하거나 수학문제를 물어본경우가 아니면 "해당문제에 대해서는 잘 모르겠어요, 하지만 저는 수학문제는 잘 푼답니다!"라는 답변을 뱉어줘.`; // 페르소나 부여

  try {
    const userMessageContent: MessageContent[] = [
      { type: "text", text: question },
    ];

    if (image_url) {
      userMessageContent.push({
        type: "image_url",
        image_url: {
          url: image_url,
        },
      });
    }

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userMessageContent,
      },
    ];

    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    return NextResponse.json(res.choices[0].message.content);
  } catch (error) {
    console.log("open ai에러 발생=>", error);
    return NextResponse.json(
      { error: "OpenAI API 호출 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};

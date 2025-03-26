//pr생성용 주석추가

import { PERSONA } from "@/constants/mainpage/cardComment";
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

  const systemPrompt = PERSONA; // 페르소나 부여

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

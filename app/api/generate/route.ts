// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { name, hobbies, holiday } = await request.json();

    const system = {
      role: "system",
      content: "あなたはマッチングアプリのプロフィール生成アシスタントです。",
    };

    const userPairs = {
      role: "user",
      content: `名前: ${name}\n趣味: ${hobbies.join(
        ", "
      )}\n休日の過ごし方: ${holiday}\n\nPairs用の自己紹介文を50文字前後で作ってください。`,
    };

    const userTinder = {
      role: "user",
      content: `名前: ${name}\n趣味: ${hobbies.join(
        ", "
      )}\n休日の過ごし方: ${holiday}\n\nTinder用の自己紹介文を50文字前後で作ってください。`,
    };

    const [pairsRes, tinderRes] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [system, userPairs],
      }),
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [system, userTinder],
      }),
    ]);

    return NextResponse.json(
      {
        pairs: pairsRes.choices[0].message.content,
        tinder: tinderRes.choices[0].message.content,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// app/api/generate/route.ts
import { NextRequest } from "next/server";
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

    const body = JSON.stringify({
      pairs: pairsRes.choices[0].message.content,
      tinder: tinderRes.choices[0].message.content,
    });

    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);
    const body = JSON.stringify({ error: err.message || "Unknown error" });
    return new Response(body, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

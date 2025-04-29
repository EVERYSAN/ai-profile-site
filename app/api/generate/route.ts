// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// OpenAI クライアントを初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // リクエストボディからデータ取得
    const { name, hobbies, holiday } = await request.json();

    // システムプロンプト
    const system = {
      role: "system",
      content: "あなたはマッチングアプリのプロフィール生成アシスタントです。",
    };

    // Pairs用プロンプト
    const userPairs = {
      role: "user",
      content: `名前: ${name}\n趣味: ${hobbies.join(
        ", "
      )}\n休日の過ごし方: ${holiday}\n\nPairs用の自己紹介文を50文字前後で作ってください。`,
    };

    // Tinder用プロンプト
    const userTinder = {
      role: "user",
      content: `名前: ${name}\n趣味: ${hobbies.join(
        ", "
      )}\n休日の過ごし方: ${holiday}\n\nTinder用の自己紹介文を50文字前後で作ってください。`,
    };

    // 並列で AI 呼び出し
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

    // レスポンス作成
    const response = NextResponse.json({
      pairs: pairsRes.choices[0].message.content,
      tinder: tinderRes.choices[0].message.content,
    });
    response.status = 200;
    return response;
  } catch (err: any) {
    console.error(err);

    const errorResponse = NextResponse.json({
      error: err.message || "Unknown error",
    });
    errorResponse.status = 500;
    return errorResponse;
  }
}

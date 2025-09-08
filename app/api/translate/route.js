import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { text, target, topic } = await req.json();

    // 如果 topic 是 "多益"，生成 250 題完整聽力題庫
    if (topic === "多益") {
      const today = new Date().toISOString().split("T")[0];

      const systemPrompt = `
你是一個TOEIC出題老師，生成完整聽力題庫250題：
Part1=15照片題, Part2=63問答題, Part3=78對話理解, Part4=94短獨白理解。
輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。照片題請使用 placeholder 圖片URL。題目不重複。
`;

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: 今天日期是 ${today}，生成今天的題目 },
        ],
      });

      const questions = JSON.parse(response.choices[0].message.content);
      return NextResponse.json({ questions });
    }

    // 否則保持原本翻譯功能
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: You are a translator. Translate the text into ${target}. },
        { role: "user", content: text },
      ],
    });

    const translated = response.choices[0].message.content.trim();
    return NextResponse.json({ translated });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

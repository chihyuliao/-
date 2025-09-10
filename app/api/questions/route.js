import OpenAI from "openai";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || "多益";

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const today = new Date().toISOString().split("T")[0];

    let systemPrompt = "";

    if (topic === "多益") {
      systemPrompt = `
你是一個TOEIC出題老師，依照正式考試題型生成聽力題目：
- Part1: 2-3 張照片題
- Part2: 2-3 問答題
輸出 JSON，每題包含 id, 題目文字或對話, 選項, 正確答案。照片題用 placeholder 圖片 URL。
`;
    } else if (topic === "英檢" || topic === "雅思") {
      systemPrompt = `你是一個英語老師，生成考試聽力題目，每題包含 id, 題目文字或對話, 選項, 正確答案，輸出 JSON。`;
    } else {
      systemPrompt = `你是一個英語老師，生成日常生活會話聽力題目，每題包含 id, 題目文字或對話, 選項, 正確答案，輸出 JSON。`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: 今天日期是 ${today}，生成今天的題目 }
      ],
    });

    const content = response.choices[0].message.content;

    let data;
    try {
      data = JSON.parse(content);
    } catch {
      return new Response(JSON.stringify({ error: "題目格式錯誤" }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("題目生成錯誤:", error);
    return new Response(JSON.stringify({ error: "題目生成失敗" }), { status: 500 });
  }
}

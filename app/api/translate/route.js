import OpenAI from "openai";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || "多益";

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // server-side 使用
    });

    const today = new Date().toISOString().split("T")[0];

    let systemPrompt = "";
    if (topic === "多益") {
      systemPrompt = `
你是一個TOEIC出題老師，生成完整聽力題庫250題：
Part1=15照片題, Part2=63問答題, Part3=78對話理解, Part4=94短獨白理解。
輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。照片題請使用 placeholder 圖片URL。題目不重複。
`;
    } else if (topic === "英檢" || topic === "雅思") {
      systemPrompt = `你是一個英語老師，生成考試聽力題目，輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。`;
    } else {
      systemPrompt = `你是一個英語老師，生成日常生活會話聽力題目，輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `今天日期是 ${today}，生成今天的題目` },
      ],
    });

    const data = JSON.parse(response.choices[0].message.content);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "題目生成失敗" }), { status: 500 });
  }
}

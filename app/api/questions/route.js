import OpenAI from "openai";

export async function POST(req) {
  try {
    const { topic } = await req.json();
    if (!topic) throw new Error("沒有提供 topic");

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 根據題型生成題目
    let systemPrompt = "";
    if (topic === "多益") {
      systemPrompt = `
你是一個TOEIC出題老師，生成Part1照片題5題，Part2問答題5題。
輸出JSON格式，每題包含id, question, options, answer。照片題使用 placeholder 圖片URL。
`;
    } else {
      systemPrompt = `
你是一個英語老師，生成${topic}聽力題目5題，輸出JSON格式，每題包含id, question, options, answer。
`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `今天生成今天的題目` },
      ],
    });

    const data = JSON.parse(response.choices[0].message.content);

    return new Response(JSON.stringify({ questions: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("題目生成失敗:", err);
    return new Response(JSON.stringify({ error: err.message || "題目生成失敗" }), { status: 500 });
  }
}

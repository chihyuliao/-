import OpenAI from "openai";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || "多益";

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 先分批生成 part1 題目
    let systemPrompt = "";
    if (topic === "多益") {
      systemPrompt = `
你是一個 TOEIC 出題老師，生成 Part1 照片題 5 題，輸出 JSON 陣列，每題包含：
id, question, options (4 個選項), answer, imageUrl (placeholder)
`;
    } else if (topic === "英檢" || topic === "雅思") {
      systemPrompt = `
你是一個英語老師，生成考試聽力題目 5 題，輸出 JSON 陣列，每題包含：
id, question, options, answer
`;
    } else {
      systemPrompt = `
你是一個英語老師，生成日常會話聽力題目 5 題，輸出 JSON 陣列，每題包含：
id, question, options, answer
`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "請生成今天的題目" },
      ],
    });

    let questions = [];
    try {
      questions = JSON.parse(response.choices[0].message.content);
    } catch (err) {
      console.error("解析 JSON 失敗", err, response.choices[0].message.content);
    }

    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("生成題目錯誤", error);
    return new Response(JSON.stringify({ questions: [] }), { status: 200 });
  }
}

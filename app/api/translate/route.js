import OpenAI from "openai";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || "多益";
    const part = url.searchParams.get("part") || "1"; // 新增：控制要載入哪個 Part

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // server-side 使用
    });

    const today = new Date().toISOString().split("T")[0];

    // 每個 Part 的題數 (這裡先給小題數，測試穩定後再放大)
    const partConfig = {
      1: { name: "照片題", count: 5 },
      2: { name: "問答題", count: 5 },
      3: { name: "對話理解", count: 5 },
      4: { name: "短獨白理解", count: 5 },
    };

    const { name, count } = partConfig[part] || { name: "一般題目", count: 5 };

    let systemPrompt = "";
    if (topic === "多益") {
      systemPrompt = `
你是一個TOEIC出題老師，請生成 Part ${part} (${name}) 題目 ${count} 題。
輸出 JSON 陣列，每題包含：
- id
- question (題目文字或對話)
- options (選項，至少 3 個)
- answer (正確答案)
照片題請用 placeholder 圖片 URL。
`;
    } else if (topic === "英檢" || topic === "雅思") {
      systemPrompt = `
你是一個英語老師，生成考試聽力 Part ${part} 題目 ${count} 題。
輸出 JSON 陣列，每題包含 id, question, options, answer。
`;
    } else {
      systemPrompt = `
你是一個英語老師，生成日常生活會話 Part ${part} 題目 ${count} 題。
輸出 JSON 陣列，每題包含 id, question, options, answer。
`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `今天日期是 ${today}，請生成題目` },
      ],
    });

    let data;
    try {
      data = JSON.parse(response.choices[0].message.content);
    } catch (err) {
      console.error("JSON 解析失敗", err);
      data = [];
    }

    return new Response(JSON.stringify({ part, questions: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "題目生成失敗" }), { status: 500 });
  }
}

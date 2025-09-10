import OpenAI from "openai";

export async function POST(req) {
  try {
    const { text, targetLanguage } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `你是一個翻譯助手，將輸入文字翻譯成 ${targetLanguage}`,
        },
        { role: "user", content: text },
      ],
    });

    return new Response(
      JSON.stringify({ translation: response.choices[0].message.content }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("翻譯錯誤:", error);
    return new Response(JSON.stringify({ error: "翻譯失敗" }), { status: 500 });
  }
}

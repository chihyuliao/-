import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Vercel 環境變數
})

export async function POST(req) {
  try {
    const { text } = await req.json()

    // 判斷要翻譯成英文還是中文
    const isChinese = /[\u4e00-\u9fff]/.test(text)
    const targetLang = isChinese ? "English" : "Chinese"

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
       { role: "system", content: \`You are a precise translator. Translate the text into ${targetLang}.\` }
        { role: "user", content: text },
      ],
    })

    const translation = completion.choices[0].message.content
    return new Response(JSON.stringify({ translation }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: "Translation failed" }), { status: 500 })
  }
}

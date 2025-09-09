"use client";
import { useState, useEffect } from "react";
import OpenAI from "openai";

export default function ListeningContent({ topic }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const client = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });

        const today = new Date().toISOString().split("T")[0];

        let systemPrompt = "";
        if (topic === "多益") {
          systemPrompt = `
你是一個TOEIC出題老師，生成完整聽力題庫250題：
Part1=15照片題, Part2=63問答題, Part3=78對話理解, Part4=94短獨白理解。
輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。照片題請使用 placeholder 圖片URL。題目不重複。
`;
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
        setQuestions(data);
      } catch (error) {
        console.error("題目生成錯誤:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [topic]);

  if (loading) return <p>題目生成中，請稍候...</p>;

  return (
    <div style={{ textAlign: "left", maxWidth: "900px", margin: "0 auto" }}>
      {Object.keys(questions).map((part) =>
        questions[part] ? (
          <div key={part}>
            <h2>{part}</h2>
            {questions[part].map((q) => (
              <div key={q.id} style={{ marginBottom: "15px" }}>
                {q.image && <img src={q.image} alt={`Pic ${q.id}`} style={{ width: "100%", maxWidth: "400px" }} />}
                {q.conversation && <pre>{q.conversation.join("\n")}</pre>}
                {q.talk && <pre>{q.talk}</pre>}
                {q.question && <p>問題: {q.question}</p>}
                {q.options && (
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                )}
                <p>答案: {q.answer}</p>
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
}

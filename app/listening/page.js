"use client";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import OpenAI from "openai";

export default function ListeningPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "多益"; // 預設多益

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const client = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });

        const today = new Date().toISOString().split("T")[0];

        // 不同主題生成指令
        let systemPrompt = "";
        if (topic === "多益") {
          systemPrompt = `
你是一個TOEIC出題老師，生成完整聽力題庫250題：
Part1=15照片題, Part2=63問答題, Part3=78對話理解, Part4=94短獨白理解。
輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。照片題請使用 placeholder 圖片URL。題目不重複。
`;
        } else if (topic === "雅思") {
          systemPrompt = `
你是一個IELTS出題老師，生成完整聽力題庫250題，按照IELTS正式聽力題型：
Part1-4各題型比例與正式考試一致，輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。
題目不重複。
`;
        } else if (topic === "英檢") {
          systemPrompt = `
你是一個GEPT出題老師，生成完整聽力題庫250題，按照GEPT正式考試題型，輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。
題目不重複。
`;
        } else {
          // 日常英文
          systemPrompt = `
你是一個英語老師，生成日常生活會話聽力題250題，輸出JSON格式，每題包含id, 題目文字或對話, 選項, 正確答案。
`;
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

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #b3e5fc, #ffffff)" }}>
      <Sidebar open={drawerOpen} />
      <Header onToggleMenu={() => setDrawerOpen((prev) => !prev)} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>{topic} 聽力訓練 (250 題)</h1>

        {loading ? (
          <p>題目生成中，請稍候...</p>
        ) : (
          <div style={{ textAlign: "left", maxWidth: "900px", margin: "0 auto" }}>
            {Object.keys(questions).map((part) => (
              questions[part] && (
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
              )
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

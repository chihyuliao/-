"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

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
        const res = await fetch("/api/listening", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic }),
        });

        const data = await res.json();
        if (topic === "多益") {
          setQuestions(data.questions);
        } else {
          setQuestions([]); // 其他 topic 暫不生成題庫
        }
      } catch (error) {
        console.error("題目取得錯誤:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [topic]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #b3e5fc, #ffffff)" }}>
      <Sidebar open={drawerOpen} />
      <Header onToggleMenu={() => setDrawerOpen(prev => !prev)} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>{topic} 聽力訓練 {topic === "多益" ? "(250 題)" : ""}</h1>

        {loading ? (
          <p>題目生成中，請稍候...</p>
        ) : questions.length > 0 ? (
          <div style={{ textAlign: "left", maxWidth: "900px", margin: "0 auto" }}>
            {Object.keys(questions).map(part =>
              questions[part] && (
                <div key={part}>
                  <h2>{part}</h2>
                  {questions[part].map(q => (
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
            )}
          </div>
        ) : (
          <p>此題庫尚未生成，請選擇多益以查看完整題庫。</p>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function ListeningContent({ topic }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError("");
        setQuestions([]);

        if (topic === "日常英文") {
          setQuestions([]);
          setLoading(false);
          return;
        }

        const res = await fetch("/api/question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic }),
        });

        if (!res.ok) throw new Error("題目載入失敗");

        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        setError(err.message || "發生錯誤");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [topic]);

  const handleAnswer = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  if (loading) return <p>題目載入中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (topic === "日常英文") return <p>此主題暫不提供聽力練習。</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      {questions.length === 0 ? (
        <p>目前沒有題目。</p>
      ) : (
        questions.map((q, i) => (
          <div key={q.id || i} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "left" }}>
            <p><strong>題目 {i + 1}：</strong> {q.question}</p>
            {q.options?.map((opt, idx) => {
              const isSelected = answers[i] === opt;
              const isCorrect = opt === q.answer;
              return (
                <button key={idx} onClick={() => handleAnswer(i, opt)} style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%", textAlign: "left", borderRadius: "6px", border: "1px solid #999", backgroundColor: isSelected ? (isCorrect ? "#c8e6c9" : "#ffcdd2") : "white" }}>
                  {opt}
                </button>
              );
            })}
            {answers[i] && (
              <p style={{ marginTop: "10px" }}>
                {answers[i] === q.answer ? "✅ 恭喜答對！" : `❌ 答錯了，正確答案是：${q.answer}`}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import listeningData from "../../data/listeningData.json";

export default function ListeningPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!topic) return;

    const allParts = listeningData[topic];
    if (!allParts) {
      setQuestions([]);
      return;
    }

    const selected = [];

    Object.keys(allParts).forEach((part) => {
      const pool = allParts[part];
      if (!pool) return;

      // 每個 Part/Section 每天隨機抽題（用日期作 seed）
      const dateSeed = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const hash = Array.from(dateSeed + part).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
      );
      const shuffled = [...pool].sort(() => ((Math.sin(hash) * 10000) % 1) - 0.5);

      // 假設每個 Part 抽 5 題，可依需求調整
      selected.push(...shuffled.slice(0, 5));
    });

    setQuestions(selected);
  }, [topic]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #b3e5fc, #ffffff)",
      }}
    >
      <Sidebar open={drawerOpen} />
      <Header onToggleMenu={() => setDrawerOpen((prev) => !prev)} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>
          聽力訓練 - {topic || "未選主題"}
        </h1>

        {questions.length === 0 && <p>這個主題目前沒有聽力練習。</p>}

        <ul
          style={{
            marginTop: "20px",
            textAlign: "left",
            display: "inline-block",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          {questions.map((q, index) => (
            <li key={index} style={{ marginBottom: "30px" }}>
              <p>
                {index + 1}. {q.question}
              </p>
              {q.audio && (
                <audio
                  controls
                  style={{ display: "block", marginTop: "8px" }}
                  src={q.audio}
                ></audio>
              )}
              {q.options && (
                <div style={{ marginTop: "8px" }}>
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      style={{
                        marginRight: "8px",
                        padding: "6px 12px",
                        border: "1px solid #004466",
                        borderRadius: "4px",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

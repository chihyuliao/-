"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import listeningData from "../../data/listeningData.json"; // 你的題庫 JSON

export default function ListeningPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic"); // e.g., 多益 / 雅思
  const [questions, setQuestions] = useState([]);

  // 隨機抽題，每次載入刷新
  useEffect(() => {
    if (!topic) return;

    const allParts = listeningData[topic]; // e.g., Part1~Part4
    if (!allParts) {
      setQuestions([]);
      return;
    }

    const selected = [];

    Object.keys(allParts).forEach((part) => {
      const pool = allParts[part];
      if (!pool) return;

      // 每個 Part/Section 隨機抽題
      const shuffled = pool.sort(() => 0.5 - Math.random());

      // 假設每個 Part 抽 5 題（可調整）
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

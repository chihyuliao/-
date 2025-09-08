"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Link from "next/link";
import TranslateWidget from "../components/TranslateWidget";

const cards = [
  { title: "Listening", path: "/listening" },
  { title: "Reading", path: "/reading" },
  { title: "Writing", path: "/writing" },
  { title: "AI Speaking", path: "/speaking" },
  { title: "Vocabulary", path: "/單字訓練" },
  { title: "Grammar Application", path: "/文法應用" },
];

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("日常英文"); // ✅ topic state

  return (
    <div>
      <Sidebar open={drawerOpen} topic={selectedTopic} />
      <Header onToggleMenu={() => setDrawerOpen((prev) => !prev)} />

      <main
        style={{
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#004466", marginBottom: "20px" }}>ENGLISH TRAINING</h1>

        {/* ✅ Dropdown 選擇主題 */}
        <div style={{ marginBottom: "30px" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>選擇主題:</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            style={{ padding: "6px 12px", fontSize: "16px" }}
          >
            <option value="日常英文">日常英文</option>
            <option value="英檢">英檢</option>
            <option value="多益">多益</option>
            <option value="雅思">雅思</option>
          </select>
        </div>

        {/* 卡片區 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {cards.map((card) => {
            // ✅ 如果是 Listening，要加上 topic 參數
            const href =
              card.title === "Listening"
                ? `${card.path}?topic=${selectedTopic}`
                : card.path;

            return (
              <Link
                key={card.title}
                href={href}
                style={{
                  display: "block",
                  padding: "30px 20px",
                  borderRadius: "10px",
                  background: "white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "#004466",
                  textDecoration: "none",
                  transition: "transform 0.2s ease",
                }}
              >
                {card.title}
              </Link>
            );
          })}
        </div>
      </main>

      <TranslateWidget />
    </div>
  );
}

"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Link from "next/link";

const cards = [
  { title: "聽力訓練", path: "/listening/page2.js" },
  { title: "閱讀訓練", path: "/reading" },
  { title: "寫作訓練", path: "/writing" },
  { title: "AI Speaking", path: "/speaking" },
  { title: "單字訓練", path: "/vocabulary" },
  { title: "文法應用", path: "/grammar" },
];

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      {/* 側拉式選單 */}
      <Sidebar open={drawerOpen} />

      {/* 頂部 Header */}
      <Header onToggleMenu={() => setDrawerOpen((prev) => !prev)} />

      {/* 主內容 */}
      <main
        style={{
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#004466", marginBottom: "20px" }}>ENGLISH TRAINING</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.path}
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
          ))}
        </div>
      </main>
    </div>
  );
}

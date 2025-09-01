"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Link from "next/link";

const cards = [
  { title: "Listening", path: "/listening/page.js" },
  { title: "Reading", path: "/閱讀訓練/" },
  { title: "Writing", path: "/寫作訓練" },
  { title: "AI Speaking", path: "/speaking/page.js" },
  { title: "Vocabulary", path: "/單字訓練" },
  { title: "Grammar Application", path: "/文法應用" },
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

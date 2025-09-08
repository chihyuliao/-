"use client";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import listeningData from "../../data/listeningData.json"; // 載入題庫

export default function ListeningPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [items, setItems] = useState([]);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic"); // 讀取網址 ?topic=TOEIC

  useEffect(() => {
    if (!topic) return;
    const data = listeningData[topic];
    if (data?.listening) {
      setItems(data.listening);
    } else {
      setItems([]);
    }
  }, [topic]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #b3e5fc, #ffffff)", // 馬卡龍藍到白色
      }}
    >
      <Sidebar open={drawerOpen} />
      <Header onToggleMenu={() => setDrawerOpen((prev) => !prev)} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>聽力訓練 - {topic || "未選主題"}</h1>
        {items.length === 0 && <p>這個主題目前沒有聽力練習。</p>}

        <ul style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: "20px" }}>
              <p>{item.question}</p>
              {item.audio && (
                <audio controls style={{ display: "block", marginTop: "8px" }}>
                  <source src={item.audio} type="audio/mpeg" />
                  Your browser doesn’t support audio.
                </audio>
              )}
              {item.options && (
                <div style={{ marginTop: "8px" }}>
                  {item.options.map((opt) => (
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

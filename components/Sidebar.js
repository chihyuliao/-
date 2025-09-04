"use client";
import React from "react";
import Link from "next/link";

const items = [
  { name: "Listening", path: "/listening" },
  { name: "Reading", path: "/reading" },
  { name: "Writing", path: "/writing"}, 
  { name: "AI Speaking", path: "/speaking" },
  { name: "Vocabulary", path: "/單字訓練" },
  { name: "Grammar Application", path: "/文法應用" },
];

export default function Sidebar({ open = false, topic = "日常英文" }) {
  return (
    <aside
      className={`sidebar-drawer ${open ? "open" : ""}`}
      aria-hidden={!open}
      aria-label="左側選單"
    >
      <div>
        {/* 在最上方顯示 Topic selection */}
        <div
          style={{
            backgroundColor: "#f0f0f0",
            color: "#004466",
            fontWeight: "bold",
            padding: "12px",
          }}
        >
          Topic selection: {topic}
        </div>

        {items.map((it, idx) => (
          <React.Fragment key={it.name}>
            <Link
              href={it.path}
              className="side-item"
              style={{
                backgroundColor: idx % 2 === 0 ? "#ADD8E6" : "#DEB887", // 天空藍 / 卡其色
                color: "#000",
                display: "block",
                padding: "12px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {it.name}
            </Link>

            {/* 在 Listening 底下加 Cohesion Training */}
            {it.name === "Listening" && (
              <div
                style={{
                  backgroundColor: "#EEE8AA", // 淺卡其黃
                  color: "#333",
                  padding: "12px",
                  fontWeight: "bold",
                }}
              >
                Cohesion Training
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
}

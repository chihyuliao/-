"use client";
import React from "react";
import Link from "next/link";

const items = [
  { name: "聽力訓練", path: "/listening" },
  { name: "閱讀訓練", path: "/reading" },
  { name: "寫作訓練", path: "/writing" },
  { name: "AI Speaking", path: "/speaking" },
  { name: "單字訓練", path: "/vocabulary" },
  { name: "文法應用", path: "/grammar" },
];

export default function Sidebar({ open = false }) {
  return (
    <aside
      className={`sidebar-drawer ${open ? "open" : ""}`}
      aria-hidden={!open}
      aria-label="左側選單"
    >
      <div>
        {items.map((it, idx) => (
          <Link
            key={it.name}
            href={it.path}
            className="side-item"
            style={{
              backgroundColor: idx % 2 === 0 ? "#87CEEB" : "#D2B48C", // 天空藍 / 卡其色
              color: "#000",
              display: "block",
              padding: "12px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            {it.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}

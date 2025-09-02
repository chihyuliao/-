"use client";
import React from "react";
import Link from "next/link";

const items = [
  { name: "Listening", path: "/listening" },
  { name: "Reading", path: "/閱讀訓練" },
  { name: "Writing", path: "/寫作訓練" },
  { name: "AI Speaking", path: "/speaking/page.js" },
  { name: "Vocabulary", path: "/單字訓練" },
  { name: "Grammar Application", path: "/文法應用" },
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
        ))}
      </div>
    </aside>
  );
}

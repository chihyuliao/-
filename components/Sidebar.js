"use client";
import React from "react";
import Link from "next/link";

const items = [
  { name: "Listening", path: "/listening" },
  { name: "Reading", path: "/reading" },
  { name: "Writing", path: "/writing" },
  { name: "AI Speaking", path: "/speaking" },
  { name: "Vocabulary", path: "/單字訓練" },
  { name: "Grammar Application", path: "/文法應用" },
];

export default function Sidebar({ open = false, topic = "日常英文" }) {
  return (
    <aside style={{ position: "fixed", left: open ? 0 : "-250px", top: 0, width: "250px", height: "100%", background: "#eee", transition: "left 0.3s", padding: "20px" }}>
      <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
        <div>Topic: {topic}</div>
        <div>Cohesion Training</div>
      </div>
      {items.map((it, idx) => (
        <Link key={it.name} href={it.path} style={{ display: "block", padding: "10px", backgroundColor: idx % 2 === 0 ? "#ADD8E6" : "#DEB887", marginBottom: "5px", fontWeight: "bold", textDecoration: "none", color: "#000" }}>
          {it.name}
        </Link>
      ))}
    </aside>
  );
}

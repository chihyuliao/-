"use client";
import React from "react";
import Link from "next/link";

const items = [
  { name: "Listening", path: "/listening" },
  { name: "Reading", path: "/reading" },
  { name: "Writing", path: "/writing" },
  { name: "Speaking", path: "/speaking" },
  { name: "Grammar", path: "/grammar" },
  { name: "Vocabulary", path: "/vocabulary" },
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
              backgroundColor: idx % 2 === 0 ? "#0070f3" : "#fff",
              color: idx % 2 === 0 ? "#fff" : "#000",
              display: "block",
              padding: "12px",
              textDecoration: "none",
            }}
          >
            {it.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}

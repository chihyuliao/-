"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Header({ onToggleMenu, topic, onTopicChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
    onToggleMenu?.();
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#f5f5f5" }}>
      <Link href="/" style={{ fontWeight: "bold", fontSize: "28px", color: "#004466", textDecoration: "none" }}>
        我讀字升級
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {onTopicChange && (
          <select value={topic} onChange={(e) => onTopicChange(e.target.value)}>
            <option value="日常英文">日常英文</option>
            <option value="英檢">英檢</option>
            <option value="多益">多益</option>
            <option value="雅思">雅思</option>
          </select>
        )}
        <button onClick={handleMenuClick} aria-label="開啟或關閉選單" style={{ fontSize: "20px", cursor: "pointer", background: "none", border: "none" }}>
          ☰
        </button>
      </div>
    </header>
  );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Header({ onTopicChange, topic }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleTopicChange = (e) => {
    onTopicChange(e.target.value);
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#f5f5f5" }}>
      <Link href="/" style={{ fontWeight: "bold", fontSize: "28px", color: "#004466", textDecoration: "none" }}>
        我讀字升級
      </Link>

      <button onClick={handleToggleMenu} aria-label="開啟或關閉選單" style={{ fontSize: "20px", cursor: "pointer", background: "none", border: "none" }}>
        ☰
      </button>
    </header>
  );
}

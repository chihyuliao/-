"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Header({ onTopicChange, topic }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(v => !v);

  const handleTopicChange = (e) => {
    if (onTopicChange) {
      onTopicChange(e.target.value);
    }
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* 左上角網站名稱（可點擊回首頁） */}
      <Link
        href="/"
        style={{
          fontWeight: "bold",
          fontSize: "28px",
          color: "#004466",
          textDecoration: "none",
        }}
      >
        我讀字升級
      </Link>

      {/* 選單按鈕 */}
      <button
        onClick={toggleMenu}
        aria-label="開啟或關閉選單"
        style={{
          fontSize: "20px",
          cursor: "pointer",
          background: "none",
          border: "none",
        }}
      >
        ☰
      </button>

      {/* 可以根據 menuOpen 顯示下拉選單 */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 100,
          }}
        >
          <p>這裡放選單內容</p>
          {/* 可加入選題下拉或其他功能 */}
        </div>
      )}
    </header>
  );
}

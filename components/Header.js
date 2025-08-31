"use client";
import React from "react";
import Link from "next/link";

export default function Header({ onToggleMenu }) {
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
          fontSize: "18px",
          color: "#004466",
          textDecoration: "none",
        }}
      >
        我讀字升級
      </Link>

      {/* 右上角功能列 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={onToggleMenu}
          aria-label="開啟或關閉選單"
          style={{
            fontSize: "20px",
            cursor: "pointer",
            marginRight: "15px",
            background: "none",
            border: "none",
          }}
        >
          ☰
        </button>
        <button style={{ marginRight: "10px" }}>🔔</button>
        <button>⚙</button>
      </div>
    </header>
  );
}

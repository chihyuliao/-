"use client";
import React from "react";
import Link from "next/link";

export default function Header({ onToggleMenu }) {
  const [topic, setTopic] = React.useState("日常英文");

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    // 這裡之後可以依照 topic 做不同邏輯，例如路由跳轉或狀態切換
    console.log("選擇的主題：", e.target.value);
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

      {/* 右上角功能列：先是主題選擇，再是選單按鈕 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <select
          value={topic}
          onChange={handleTopicChange}
          style={{
            fontSize: "16px",
            padding: "5px 10px",
            marginRight: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value="日常英文">日常英文</option>
          <option value="多益">多益</option>
          <option value="雅思">雅思</option>
          <option value="英檢">英檢</option>
        </select>

        <button
          onClick={onToggleMenu}
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
      </div>
    </header>
  );
}

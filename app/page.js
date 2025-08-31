// app/page.js
"use client";
// 移除 import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid"; // 如果 CardGrid 也不會用到 Link，就不用改它

export default function Page() {
  // const [active, setActive] = useState("Listen"); // 移除這行
  const [topic, setTopic] = useState("IELTS");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* drawer (側拉選單) */}
      <Sidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        // 移除 active 和 onSelect props
      />

      {/* Main content area */}
      <div className="container">
        {/* Header and Controls */}
        <div className="main">
          <Header onToggleSidebar={() => setDrawerOpen((p) => !p)} />
          <CardGrid /* active={active} */ /> {/* 根據需要移除 active prop */}
        </div>
      </div>
    </div>
  );
}

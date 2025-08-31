"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    // <> 和 </> 是 React 的片段語法，它不會產生額外的 DOM 元素
    // 這可以確保你的 Sidebar 不會被任何父容器擋住
    <>
      {/* 側拉選單 */}
      <Sidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="container">
        {/* 主要內容區域 */}
        <div className="main">
          <Header onToggleSidebar={() => setDrawerOpen((p) => !p)} />
          <CardGrid />
        </div>
      </div>
    </>
  );
}

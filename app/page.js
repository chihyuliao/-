// app/page.js

"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";

export default function Page() {
  const [topic, setTopic] = useState("IELTS");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Sidebar 應該放在頁面最頂層，不要被其他元素影響 */}
      <Sidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="container">
        {/* 主要內容 */}
        <div className="main">
          <Header onToggleSidebar={() => setDrawerOpen((p) => !p)} />
          <CardGrid />
        </div>
      </div>
    </>
  );
}

"use client";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

export default function listeningPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #b3e5fc, #ffffff)", // 馬卡龍藍到白色
      }}
    >
      <Sidebar open={drawerOpen} />
      <Header onToggleMenu={() => setDrawerOpen((prev) => !prev)} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>聽力訓練</h1>
        <p>這裡是聽力練習的專屬頁面。</p>
      </main>
    </div>
  );
}

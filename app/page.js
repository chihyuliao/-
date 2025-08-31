"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      {/* 側拉式選單 */}
      <Sidebar open={drawerOpen} />

      {/* 頂部 Header */}
      <Header onToggleMenu={() => setDrawerOpen((prev) => !prev)} />

      {/* 主內容 */}
      <main
        style={{
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#004466" }}>Welcome to My English App</h1>
        <p style={{ fontSize: "18px", color: "#333" }}>
          輕鬆練習 Listening、Reading、Writing、Speaking！
        </p>
      </main>
    </div>
  );
}

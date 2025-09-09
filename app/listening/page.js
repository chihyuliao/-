"use client"; // ✅ 讓整個 page 變 Client Component

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ListeningContent from "../../components/ListeningContent";

export default function ListeningPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #b3e5fc, #ffffff)" }}>
      <Sidebar open={drawerOpen} />
      <Header onToggleMenu={() => setDrawerOpen(prev => !prev)} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>聽力訓練</h1>
        <ListeningContent />
      </main>
    </div>
  );
}

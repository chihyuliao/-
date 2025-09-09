"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ListeningContent from "../../components/ListeningContent";
import { useSearchParams } from "next/navigation";

export default function ListeningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "多益";

  const handleToggleMenu = () => setSidebarOpen((prev) => !prev);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #b3e5fc, #ffffff)" }}>
      <Sidebar open={sidebarOpen} topic={topic} />
      <Header onToggleMenu={handleToggleMenu} topic={topic} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>聽力訓練</h1>
        <ListeningContent topic={topic} />
      </main>
    </div>
  );
}

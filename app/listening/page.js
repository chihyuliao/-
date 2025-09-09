"use client"; // 這一行必須放在最上面

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ListeningContent from "../../components/ListeningContent";
import { useSearchParams } from "next/navigation";

export default function ListeningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchParams = useSearchParams(); // 現在可以安全使用 client hook

  const handleToggleMenu = () => {
    setSidebarOpen((prev) => !prev);
  };

  // 範例：取得 URL 參數
  const topic = searchParams.get("topic") || "default";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #b3e5fc, #ffffff)" }}>
      <Sidebar open={sidebarOpen} />
      <Header onToggleMenu={handleToggleMenu} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>聽力訓練</h1>
        <ListeningContent topic={topic} />
      </main>
    </div>
  );
}

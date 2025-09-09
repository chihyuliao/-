"use client"; // 必須放在最上面

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ListeningContent from "../../components/ListeningContent";
import { useSearchParams } from "next/navigation";

export default function ListeningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topic, setTopic] = useState("多益"); // 初始預設
  const [isClient, setIsClient] = useState(false); // 確保在 client side

  const handleToggleMenu = () => setSidebarOpen((prev) => !prev);

  // 只在 client side 取得 URL 參數
  useEffect(() => {
    setIsClient(true);
    const searchParams = new URLSearchParams(window.location.search);
    const t = searchParams.get("topic") || "多益";
    setTopic(t);
  }, []);

  if (!isClient) return <div>Loading...</div>; // 建立 fallback

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

"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ListeningContent from "../../components/ListeningContent";

export default function ListeningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topic, setTopic] = useState("多益");

  const handleToggleMenu = () => setSidebarOpen(prev => !prev);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #b3e5fc, #ffffff)" }}>
      <Sidebar open={sidebarOpen} topic={topic} />
      <Header onToggleMenu={handleToggleMenu} topic={topic} />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#004466" }}>聽力訓練</h1>
        {/* topic 下拉選單 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>選擇主題:</label>
          <select value={topic} onChange={e => setTopic(e.target.value)}>
            <option value="日常英文">日常英文</option>
            <option value="英檢">英檢</option>
            <option value="多益">多益</option>
            <option value="雅思">雅思</option>
          </select>
        </div>

        <ListeningContent topic={topic} />
      </main>
    </div>
  );
}

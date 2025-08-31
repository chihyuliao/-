"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";

export default function Page() {
  const [active, setActive] = useState("Listen");
  const [topic, setTopic] = useState("IELTS");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Drawer (側拉選單) */}
      <Sidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        active={active}
        onSelect={(it) => {
          setActive(it);
          setDrawerOpen(false);
        }}
      />

      {/* 主體內容 */}
      <div className="container">
        <main className="main" aria-label="主要內容">
          <Header
            topic={topic}
            onChangeTopic={setTopic}
            onToggleMenu={() => setDrawerOpen((s) => !s)}
          />
          <section>
            <h4 style={{ margin: "8px 0 12px 0" }}>
              Topic: {topic} • Selected: {active}
            </h4>
            <CardGrid active={active} />
          </section>
        </main>

        {/* 右側工具列：只留 🔔 和 ⚙ */}
        <aside className="rightbar" aria-label="右側工具列">
          <div className="mini">🔔</div>
          <div className="mini">⚙</div>
        </aside>
      </div>
    </div>
  );
}

"use client";  // <- 最重要

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import OpenAI from "openai";

export default function ListeningPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "多益";

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const client = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });

        const today = new Date().toISOString().split("T")[0];

        let systemPrompt = topic === "多益" 
          ? `你是一個TOEIC出題老師，生成完整聽力題庫250題... `
          : `你是一個英語老師，生成題目...`;

        const response = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `今天日期是 ${today}` },
          ],
        });

        const data = JSON.parse(response.choices[0].message.content);
        setQuestions(data);
      } catch (error) {
        console.error("題目生成錯誤:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [topic]);

  return (
    <div>
      <Sidebar open={drawerOpen} />
      <Header onToggleMenu={() => setDrawerOpen(prev => !prev)} />
      <main>
        <h1>{topic} 聽力訓練</h1>
        {loading ? <p>題目生成中...</p> : <pre>{JSON.stringify(questions, null, 2)}</pre>}
      </main>
    </div>
  );
}

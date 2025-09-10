"use client";

import { useEffect, useState } from "react";

export default function ListeningContent({ topic }) {
  const [part, setPart] = useState(1); // 目前題組
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState({}); // 預備題目快取
  const [currentIndex, setCurrentIndex] = useState(0);

  // 載入題目
  const loadQuestions = async (targetPart) => {
    setLoading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, part: targetPart }),
      });

      const data = await res.json();
      if (data?.questions) {
        setQuestions(data.questions);
        setCurrentIndex(0);
      } else {
        setQuestions([]);
      }
    } catch (err) {
      console.error("題目載入失敗", err);
      setQuestions([]);
    }
    setLoading(false);
  };

  // 初始載入 Part 1
  useEffect(() => {
    loadQuestions(1);
  }, [topic]);

  // 預先載入下一個 Part
  const preloadNextPart = async () => {
    if (part < 4 && !cache[part + 1]) {
      try {
        const res = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, part: part + 1 }),
        });
        const data = await res.json();
        if (data?.questions) {
          setCache((prev) => ({ ...prev, [part + 1]: data.questions }));
        }
      } catch (err) {
        console.error("預載下一組題目失敗", err);
      }
    }
  };

  // 使用者選答案
  const handleAnswer = () => {
    const nextIndex = currentIndex + 1;

    // 如果答到一半，就偷偷預載下一組題目
    if (nextIndex >= Math.floor(questions.length / 2)) {
      preloadNextPart();
    }

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      // 換下一組題目
      if (part < 4) {
        const nextPart = part + 1;
        setPart(nextPart);

        if (cache[nextPart]) {
          // 用快取的題目
          setQuestions(cache[nextPart]);
          setCurrentIndex(0);
        } else {
          // 沒快取就直接載入
          loadQuestions(nextPart);
        }
      } else {
        alert("🎉 所有題目完成了！");
      }
    }
  };

  if (loading) return <p>題目載入中...</p>;
  if (!questions.length) return <p>題目載入失敗</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>Part {part} - 第 {currentIndex + 1} 題</h2>
      <p>{currentQuestion?.question || "（題目文字）"}</p>
      <ul>
        {currentQuestion?.options?.map((opt, i) => (
          <li key={i}>
            <button onClick={handleAnswer}>{opt}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

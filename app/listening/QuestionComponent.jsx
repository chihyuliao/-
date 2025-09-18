'use client';

import { useState } from 'react';

export default function QuestionComponent() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'listening', difficulty: 'easy' })  // 可讓使用者選
      });
      const data = await resp.json();
      if (data.question) {
        setQuestion(data.question);
      } else {
        setQuestion('出題失敗，請再試一次');
      }
    } catch (err) {
      console.error(err);
      setQuestion('網路錯誤');
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={generate} disabled={loading}>
        {loading ? '產題中…' : '開始出題'}
      </button>
      {question && <div className="question-display">{question}</div>}
    </div>
  );
}

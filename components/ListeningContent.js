"use client";
import { useEffect, useState } from "react";

export default function ListeningContent({ topic }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const res = await fetch(`/api/listening?topic=${topic}`);
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [topic]);

  if (loading) return <p>題目生成中，請稍候...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
      {Object.keys(questions).map((part) =>
        questions[part] ? (
          <div key={part}>
            <h2>{part}</h2>
            {questions[part].map((q) => (
              <div key={q.id} style={{ marginBottom: "15px" }}>
                {q.image && <img src={q.image} alt={`Pic ${q.id}`} style={{ width: "100%", maxWidth: "400px" }} />}
                {q.conversation && <pre>{q.conversation.join("\n")}</pre>}
                {q.talk && <pre>{q.talk}</pre>}
                {q.question && <p>問題: {q.question}</p>}
                {q.options && (
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                )}
                <p>答案: {q.answer}</p>
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
}

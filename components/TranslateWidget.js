"use client";
import { useState } from "react";

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("English"); // 可改為 English / Chinese

  const handleTranslate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, target: targetLang }),
      });
      const data = await res.json();
      setOutput(data.translated || "翻譯失敗");
    } catch (err) {
      console.error(err);
      setOutput("翻譯失敗");
    }
    setLoading(false);
  };

  return (
    <>
      {/* 右下角按鈕 */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        🌐
      </button>

      {/* 彈出翻譯視窗 */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            padding: "15px",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <textarea
            rows={3}
            placeholder="輸入文字..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <div style={{ marginBottom: "0.5rem" }}>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
              <option>English</option>
              <option>Chinese</option>
            </select>
          </div>
          <button
            onClick={handleTranslate}
            style={{ width: "100%", marginBottom: "0.5rem" }}
            disabled={loading}
          >
            {loading ? "翻譯中..." : "翻譯"}
          </button>
          <div style={{ whiteSpace: "pre-wrap" }}>{output}</div>
        </div>
      )}
    </>
  );
}

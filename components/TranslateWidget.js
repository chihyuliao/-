// components/TranslateWidget.js
import React, { useState } from "react";

const TranslateWidget = () => {
  const [showBox, setShowBox] = useState(false);
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");

  const handleTranslate = () => {
    // 這裡你可以改成呼叫真正的翻譯 API
    setTranslated(text + " (已翻譯)");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {/* Icon Button */}
      <button
        onClick={() => setShowBox(!showBox)}
        style={{
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          background: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "20px"
        }}
      >
        🌐
      </button>

      {/* Translate Box */}
      {showBox && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "0",
            width: "250px",
            padding: "10px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
          }}
        >
          <textarea
            rows="3"
            style={{ width: "100%", marginBottom: "5px" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="輸入文字..."
          />
          <button
            onClick={handleTranslate}
            style={{ width: "100%", background: "#0070f3", color: "white", padding: "5px", border: "none", borderRadius: "5px" }}
          >
            翻譯
          </button>
          {translated && <p style={{ marginTop: "8px", fontSize: "14px" }}>{translated}</p>}
        </div>
      )}
    </div>
  );
};

export default TranslateWidget;

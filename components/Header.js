import React from "react";

export default function Header({ topic, onChangeTopic, onToggleMenu }) {
  return (
    <header className="header">
      <div className="brand">我讀字升級</div>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter topic (e.g. IELTS)"
          value={topic}
          onChange={(e) => onChangeTopic(e.target.value)}
        />
        <button className="icon-btn">{topic}</button>
        <button className="icon-btn">8°</button>
        <button className="icon-btn" onClick={onToggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
}

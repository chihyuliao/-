import React, { useEffect } from "react";

const items = ["Listen", "Read", "Write", "Speak", "Grammar", "Voc"];

export default function Sidebar({
  open = false,
  onClose = () => {},
  active,
  onSelect = () => {},
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`drawer-overlay ${open ? "open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`sidebar-drawer ${open ? "open" : ""}`}
        aria-hidden={!open}
        aria-label="左側選單"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 12px 6px 12px",
          }}
        >
          <h3 style={{ margin: 0 }}>選單</h3>
          <button className="icon-btn" onClick={onClose} aria-label="關閉選單">
            ✕
          </button>
        </div>

        <div
          style={{
            padding: "10px 12px 14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {items.map((it) => (
            <div
              key={it}
              className={"side-item " + (active === it ? "active" : "")}
              onClick={() => {
                onSelect(it);
              }}
              role="button"
              tabIndex={0}
            >
              {it}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

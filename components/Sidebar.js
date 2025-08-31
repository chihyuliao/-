import React, { useEffect } from "react";

const items = ["Listening", "Reading", "Writing", "AI Speaking", "Grammar Identification and Application ", "Daily Vocabulary"];

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
          <h3 style={{ margin: 0 }}> Comprehension Training</h3>
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
  {/* Listening 選項 */}
  <Link href="/聽力訓練" passHref>
    <div className={"side-item " + (active === "Listening" ? "active" : "")}>
      Listening
    </div>
  </Link>

  {/* Reading 選項 */}
  <Link href="/閱讀訓練" passHref>
    <div className={"side-item " + (active === "Reading" ? "active" : "")}>
      Reading
    </div>
  </Link>

  {/* Writing 選項 */}
  <Link href="/寫作訓練" passHref>
    <div className={"side-item " + (active === "Writing" ? "active" : "")}>
      Writing
    </div>
  </Link>

  {/* AI Speaking 選項 */}
  <Link href="/口說訓練" passHref>
    <div className={"side-item " + (active === "AI Speaking" ? "active" : "")}>
      AI Speaking
    </div>
  </Link>

  {/* Grammar Identification and Application 選項 */}
  <Link href="/文法訓練r" passHref>
    <div className={"side-item " + (active === "Grammar Identification and Application " ? "active" : "")}>
      Grammar Identification and Application 
    </div>
  </Link>
  
  {/* Daily Vocabulary 選項 */}
  <Link href="/單字訓練" passHref>
    <div className={"side-item " + (active === "Daily Vocabulary" ? "active" : "")}>
      Daily Vocabulary
    </div>
  </Link>

</div>
      </aside>
    </>
  );
}

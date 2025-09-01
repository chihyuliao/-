"use client"
import { useState } from "react"

export default function TranslatorWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTranslate = async () => {
    if (!input) return
    setLoading(true)
    setOutput("")

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      })

      const data = await res.json()
      setOutput(data.translation || "⚠️ 翻譯失敗")
    } catch (err) {
      setOutput("❌ 發生錯誤，請稍後再試")
    }

    setLoading(false)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* 翻譯 Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        🌐
      </button>

      {/* 小翻譯視窗 */}
      {open && (
        <div className="mt-2 w-64 bg-white shadow-lg rounded-lg p-3 border border-gray-200">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="輸入文字..."
            className="w-full h-16 p-2 border rounded resize-none text-sm"
          />
          <button
            onClick={handleTranslate}
            className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 text-sm"
            disabled={loading}
          >
            {loading ? "翻譯中..." : "翻譯"}
          </button>
          {output && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm whitespace-pre-line">
              {output}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

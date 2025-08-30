"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* 頂部欄 */}
      <header className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md">
        {/* 左邊：網站標題 + 選單按鈕 */}
        <div className="flex items-center space-x-4">
          {/* 選單按鈕 - 點擊時切換側邊選單的開/關 */}
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl hover:text-blue-200 transition-colors"
          >
            ☰
          </button>
          {/* Logo/網站標題 */}
          <h1 className="text-2xl font-extrabold tracking-wide">
            我讀字升級
          </h1>
        </div>
      </header>

      {/* 側邊選單 - 根據 open 狀態顯示或隱藏 */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-blue-600">選單</h2>
          {/* 這裡不再需要關閉按鈕，因為點擊頂部的 ☰ 就能切換 */}
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>
            🏠 首頁
          </Link>
          <Link href="/listentrain" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>
            聽力訓練
          </Link>
          <Link href="/readtrain" className="hover:text-blue-600 transition" onClick={() => setOpen(false)}>
            閱讀訓練
          </Link>
          <Link href="/writetrain" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>
            寫作訓練
          </Link>
          <Link href="/speaktrain" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>
            口說訓練
          </Link>
        </nav>
      </div>

      {/* 半透明背景 (overlay) - 當選單打開時出現 */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}


  );
}

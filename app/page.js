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
          {/* 選單按鈕 - 點擊時打開側邊選單 */}
          <button
            onClick={() => setOpen(true)}
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
          {/* 關閉按鈕 */}
          <button onClick={() => setOpen(false)} className="text-red-500 text-xl">
           ☰
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            🏠 首頁
          </Link>
          <Link href="/listentrain" className="hover:text-blue-600 transition">
            聽力訓練
          </Link>
          <Link href="/readtrain" className="hover:text-blue-600 transition">
            閱讀訓練
          </Link>
          <Link href="/writetrain" className="hover:text-green-600 transition">
            寫作訓練
          </Link>
          <Link href="/speaktrain" className="hover:text-green-600 transition">
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

      {/* 主內容 */}
      <main className="p-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">首頁內容</h2>
        <p>這裡是首頁，左上角有 Logo，旁邊有選單按鈕。</p>
      </main>
    </div>
  );
}

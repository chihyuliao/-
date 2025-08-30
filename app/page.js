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
          {/* 選單按鈕 */}
          <button
            onClick={() => setOpen(true)}
            className="text-2xl hover:text-blue-200 transition-colors"
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
          >
            ☰
          </button>
          {/* Logo */}
          <h1 className="text-2xl font-extrabold tracking-wide">
            我讀字升級
          </h1>
        </div>
      </header>

     
}

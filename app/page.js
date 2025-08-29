'use client';

import { useState } from 'react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* 側邊欄，只在 isSidebarOpen 為 true 時顯示 */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-2xl w-64 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">選單</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="block text-lg font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                首頁
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                聽力練習
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                說話練習 (AI)
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                閱讀練習
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                寫作練習
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* 側邊欄半透明背景，點擊可關閉 */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 頂部導航欄 */}
      <nav className="p-4 md:p-6 bg-white shadow-lg flex items-center z-20 sticky top-0 rounded-b-xl">
        {/* Logo 文字，固定在左上角 */}
        <div className="text-[36pt] font-extrabold text-indigo-600 tracking-wider">
          我讀字升級
        </div>
        {/* 三條槓按鈕，點擊後開啟側邊欄 */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-3xl text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2 transition-transform transform hover:scale-110 ml-auto"
        >
          ☰
        </button>
      </nav>

      {/* 頁面主要內容，移除所有多餘內容 */}
      <main className="container mx-auto p-4 md:p-8">
        {/* 此處是頁面主體，目前沒有任何內容 */}
      </main>
    </div>
  );
}

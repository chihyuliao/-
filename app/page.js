'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TranslationIcon from '../components/TranslationIcon';
import TopicSelector from '../components/TopicSelector';

// 主頁面元件
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);

  // 處理點擊說的功能
  const handleSpeakingClick = () => {
    setIsSpeakingModalOpen(true);
  };

  // 處理點擊翻譯圖示
  const handleTranslationClick = () => {
    const text = prompt("請輸入要翻譯的英文或中文:");
    if (text) {
      alert(`這是您的翻譯結果:\n(此為模擬功能，請連接實際API)`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* 側邊欄 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* 側邊欄半透明背景，點擊可關閉 */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 頂部導航欄 */}
      <nav className="p-4 md:p-6 bg-white shadow-lg flex justify-between items-center z-20 sticky top-0 rounded-b-xl mb-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2 transition-transform transform hover:scale-110"
          >
            ☰
          </button>
          <div className="text-3xl font-extrabold text-indigo-600 tracking-wider">
            我讀字升級
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <TopicSelector />
          <TranslationIcon onClick={handleTranslationClick} />
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-black text-center text-slate-800 mb-8 md:mb-12 leading-tight">
          選擇您的<br className="sm:hidden" />練習模式
        </h1>

        {/* 四個互動式學習區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
          {/* 聽力區塊 */}
          <div className="flex flex-col items-center justify-center p-8 bg-sky-200 rounded-3xl shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <span className="text-5xl font-bold text-sky-800 tracking-wide">
              聽
            </span>
          </div>

          {/* 說話區塊 */}
          <div
            onClick={handleSpeakingClick}
            className="flex flex-col items-center justify-center p-8 bg-purple-200 rounded-3xl shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <span className="text-5xl font-bold text-purple-800 tracking-wide">
              說
            </span>
          </div>

          {/* 閱讀區塊 */}
          <div className="flex flex-col items-center justify-center p-8 bg-teal-200 rounded-3xl shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <span className="text-5xl font-bold text-teal-800 tracking-wide">
              讀
            </span>
          </div>

          {/* 寫作區塊 */}
          <div className="flex flex-col items-center justify-center p-8 bg-amber-200 rounded-3xl shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <span className="text-5xl font-bold text-amber-800 tracking-wide">
              寫
            </span>
          </div>
        </div>
      </main>

      {/* 說話功能模擬彈窗 */}
      {isSpeakingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center transform scale-95 animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-4 text-slate-800">AI 老師準備好了！</h3>
            <p className="text-lg text-slate-600 mb-6">
              點擊下方連結，前往 AI SPEAKING 網站進行練習。
            </p>
            <a
              href="https://example.com/ai-speaking" // 此處為模擬網址，請替換成實際網址
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              onClick={() => setIsSpeakingModalOpen(false)}
            >
              開啟 AI SPEAKING
            </a>
            <button
              onClick={() => setIsSpeakingModalOpen(false)}
              className="mt-4 text-slate-500 hover:text-slate-700 transition-colors duration-300"
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

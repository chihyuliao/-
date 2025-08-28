// File: app/page.js
'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TranslationIcon from '../components/TranslationIcon';
import TopicSelector from '../components/TopicSelector';

// 主頁面元件
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);
  const [translationText, setTranslationText] = useState('');

  // 處理點擊說的功能
  const handleSpeakingClick = () => {
    setIsSpeakingModalOpen(true);
  };

  // 處理點擊翻譯圖示
  const handleTranslationClick = () => {
    const text = prompt("請輸入要翻譯的英文或中文:");
    if (text) {
      setTranslationText(text);
      alert(`這是您的翻譯結果:\n(此為模擬功能，請連接實際API)`);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 relative">
      {/* 側邊欄 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 頂部導航欄 */}
      <nav className="p-4 bg-white shadow-md flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-transform transform hover:scale-110"
          >
            ☰
          </button>
          <div className="text-2xl font-bold ml-4 text-blue-600 tracking-wider">
            我讀字升級
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <TopicSelector />
          <TranslationIcon onClick={handleTranslationClick} />
        </div>
      </nav>

      <main className="container mx-auto p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-8 md:mb-12">
          選擇您的練習模式
        </h1>

        {/* 四個互動式學習區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* 聽力區塊 */}
          <div className="flex items-center justify-center bg-blue-200 p-8 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl md:text-4xl font-semibold text-blue-800">
              聽
            </span>
          </div>

          {/* 說話區塊 */}
          <div
            onClick={handleSpeakingClick}
            className="flex items-center justify-center bg-purple-200 p-8 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
          >
            <span className="text-3xl md:text-4xl font-semibold text-purple-800">
              說
            </span>
          </div>

          {/* 閱讀區塊 */}
          <div className="flex items-center justify-center bg-blue-200 p-8 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl md:text-4xl font-semibold text-blue-800">
              讀
            </span>
          </div>

          {/* 寫作區塊 */}
          <div className="flex items-center justify-center bg-purple-200 p-8 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl md:text-4xl font-semibold text-purple-800">
              寫
            </span>
          </div>
        </div>
      </main>

      {/* 說話功能模擬彈窗 */}
      {isSpeakingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">AI 老師準備好了！</h3>
            <p className="text-lg text-gray-600 mb-6">
              點擊下方連結，前往 AI SPEAKING 網站進行練習。
            </p>
            <a
              href="https://example.com/ai-speaking" // 此處為模擬網址，請替換成實際網址
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setIsSpeakingModalOpen(false)}
            >
              開啟 AI SPEAKING
            </a>
            <button
              onClick={() => setIsSpeakingModalOpen(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
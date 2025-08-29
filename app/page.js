'use client';

import { useState } from 'react';

// API 金鑰，由 Canvas 自動提供
const API_KEY = "";

// 將 Base64 編碼的音訊資料轉換為 ArrayBuffer
const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// 將 PCM 音訊資料轉換為 WAV 格式的 Blob
// 這是因為 API 返回的是 PCM 格式，需要轉換才能在瀏覽器中播放
const pcmToWav = (pcmData, sampleRate) => {
  const pcm16 = new Int16Array(pcmData);
  const numChannels = 1;
  const sampleRateValue = sampleRate;
  const bitsPerSample = 16;
  const byteRate = (bitsPerSample * numChannels * sampleRateValue) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcm16.length * 2;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  
  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // audio format 1: PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRateValue, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // PCM data
  for (let i = 0; i < pcm16.length; i++) {
    view.setInt16(44 + i * 2, pcm16[i], true);
  }

  return new Blob([view], { type: 'audio/wav' });
};

// 寫入字串的輔助函數
const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

// 主頁面元件
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('日常英語');
  const [translationResult, setTranslationResult] = useState(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [speakingLoading, setSpeakingLoading] = useState(false);
  const [error, setError] = useState(null);

  const topics = ['日常英語', '多益', '英檢', '雅思'];

  // 處理點擊說的功能
  const handleSpeakingClick = () => {
    // 這裡我們直接生成音訊，而不是開啟彈窗
    setSpeakingModal();
  };

  // 顯示 AI 老師準備好的彈窗
  const setSpeakingModal = () => {
    setIsSpeakingModalOpen(true);
  };

  // 處理點擊翻譯圖示
  const handleTranslationClick = async () => {
    const text = prompt("請輸入要翻譯的英文或中文:");
    if (text) {
      setTranslationLoading(true);
      setError(null);
      try {
        const payload = {
          contents: [{ parts: [{ text: `請將以下文字翻譯成英文或中文：${text}` }] }],
          tools: [{ "google_search": {} }],
          systemInstruction: {
            parts: [{ text: "你是一個專業的翻譯助理，請將使用者提供的文字翻譯成英文或中文。" }]
          },
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API 請求失敗: ${response.statusText}`);
        }

        const result = await response.json();
        const translatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "無法取得翻譯結果。";
        setTranslationResult(translatedText);
      } catch (err) {
        setError("翻譯時發生錯誤，請稍後再試。");
        console.error("Translation API error:", err);
      } finally {
        setTranslationLoading(false);
      }
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsOpen(false);
    alert(`您已選擇: ${topic}`);
  };

  // 處理 AI 說話功能
  const callSpeakingApi = async () => {
    setSpeakingLoading(true);
    setError(null);
    try {
      const payload = {
        contents: [{
          parts: [{ text: "Say cheerfully: Have a wonderful day!" }]
        }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Puck" }
            }
          }
        },
        model: "gemini-2.5-flash-preview-tts"
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`TTS API 請求失敗: ${response.statusText}`);
      }

      const result = await response.json();
      const part = result?.candidates?.[0]?.content?.parts?.[0];
      const audioData = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType;

      if (audioData && mimeType && mimeType.startsWith("audio/")) {
        const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
        const pcmData = base64ToArrayBuffer(audioData);
        const wavBlob = pcmToWav(pcmData, sampleRate);
        const audioUrl = URL.createObjectURL(wavBlob);
        
        const audio = new Audio(audioUrl);
        audio.play().catch(e => console.error("音訊播放失敗:", e));
      } else {
        throw new Error("無法取得音訊資料。");
      }
    } catch (err) {
      setError("生成語音時發生錯誤，請稍後再試。");
      console.error("Speaking API error:", err);
    } finally {
      setSpeakingLoading(false);
      setIsSpeakingModalOpen(false); // 播放後關閉彈窗
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* 側邊欄 */}
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
          {/* 主題下拉選單 */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <span>{selectedTopic}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20">
                <ul className="py-1">
                  {topics.map((topic) => (
                    <li
                      key={topic}
                      onClick={() => handleTopicSelect(topic)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* 翻譯圖示 */}
          <button
            onClick={handleTranslationClick}
            className="bg-indigo-500 p-2 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0113.882 8.85M13.882 8.85a18.022 18.022 0 00-6.732 3.664M13.882 8.85s-3.95-1.928-6.732 3.664M3 20h12m-6-1.556A18.022 18.022 0 0113.882 15.15m-4.732-3.664A18.022 18.022 0 0013.882 15.15"
              />
            </svg>
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-black text-center text-slate-800 mb-8 md:mb-12 leading-tight">
          選擇您的<br className="sm:hidden" />練習模式
        </h1>

        {/* 載入中動畫 */}
        {(translationLoading || speakingLoading) && (
          <div className="flex justify-center items-center my-8">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-xl text-indigo-500">
              {translationLoading ? "翻譯中..." : "語音生成中..."}
            </span>
          </div>
        )}

        {/* 錯誤訊息 */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg my-8 text-center">
            {error}
          </div>
        )}

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

      {/* 說話功能彈窗 */}
      {isSpeakingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center transform scale-95 animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-4 text-slate-800">AI 老師準備好了！</h3>
            <p className="text-lg text-slate-600 mb-6">
              點擊下方按鈕，聽聽 AI 老師的聲音。
            </p>
            <button
              onClick={callSpeakingApi}
              className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              disabled={speakingLoading}
            >
              {speakingLoading ? "生成中..." : "點擊播放"}
            </button>
            <button
              onClick={() => setIsSpeakingModalOpen(false)}
              className="mt-4 text-slate-500 hover:text-slate-700 transition-colors duration-300 block w-full"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* 翻譯結果彈窗 */}
      {translationResult && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 transform scale-95 animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-4 text-slate-800">翻譯結果</h3>
            <p className="text-lg text-slate-600 mb-6 whitespace-pre-line">
              {translationResult}
            </p>
            <button
              onClick={() => setTranslationResult(null)}
              className="mt-4 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

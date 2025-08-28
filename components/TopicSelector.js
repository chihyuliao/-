'use client';

import { useState } from 'react';

export default function TopicSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('日常英語');

  const topics = ['日常英語', '多益', '英檢', '雅思'];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsOpen(false);
    alert(`您已選擇: ${topic}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 transition-colors hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <span>{selectedTopic}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
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
  );
}
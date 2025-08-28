// File: components/Sidebar.js
// 這是側邊選單元件，從主頁面引入並控制其開關
export default function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-xl w-64 transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">選單</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
              首頁
            </a>
          </li>
          <li>
            <a href="#" className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
              聽力練習
            </a>
          </li>
          <li>
            <a href="#" className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
              說話練習 (AI)
            </a>
          </li>
          <li>
            <a href="#" className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
              閱讀練習
            </a>
          </li>
          <li>
            <a href="#" className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
              寫作練習
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

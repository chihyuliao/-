export default function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-2xl w-64 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-indigo-600 focus:outline-none transition-colors"
          >
            ✕
          </button>
        </div>
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
  );
}

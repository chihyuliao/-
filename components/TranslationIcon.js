export default function TranslationIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
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
  );

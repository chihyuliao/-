import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '我讀字升級',
  description: '互動式英文學習平台',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
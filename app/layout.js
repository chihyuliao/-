import "./globals.css";
import TranslatorWidget from "./components/TranslatorWidget"
export const metadata = {
  title: "我讀字升級",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
     <TranslatorWidget /> {/* 永遠固定在左下角 */}
    </body>
    </html>
  )
}

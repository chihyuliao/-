import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const QuestionComponent = dynamic(() => import('./QuestionComponent'), { ssr: false });

export default function ListeningPage() {
  return (
    <div>
      <h1>聽力練習</h1>
      <Suspense fallback={<div>載入中…</div>}>
        <QuestionComponent />
      </Suspense>
    </div>
  );
}

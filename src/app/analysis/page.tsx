import { Suspense } from 'react';
import AnalysisClient from './AnalysisClient';

export default function AnalysisPage() {
  return (
    <Suspense fallback={null}>
      <AnalysisClient />
    </Suspense>
  );
}

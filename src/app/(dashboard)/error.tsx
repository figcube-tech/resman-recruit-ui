'use client';

import Button from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />
      <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <Button variant="outline" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}

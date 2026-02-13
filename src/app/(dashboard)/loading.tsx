import Spinner from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

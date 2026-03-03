'use client';

import { useRouter } from 'next/navigation';
import { useCreateInterview } from '@/hooks/useInterviews';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import InterviewForm from '@/components/interviews/InterviewForm';
import { CreateInterviewFormValues } from '@/lib/validations/interview';

export default function NewInterviewPage() {
  const router = useRouter();
  const createInterview = useCreateInterview();

  const handleSubmit = async (data: CreateInterviewFormValues) => {
    await createInterview.mutateAsync(data);
    router.push('/interviews');
  };

  return (
    <div>
      <PageHeader title="Schedule Interview" description="Set up a new interview" />
      <Card>
        <InterviewForm onSubmit={handleSubmit} isLoading={createInterview.isPending} onCancel={() => router.push('/interviews')} />
      </Card>
    </div>
  );
}

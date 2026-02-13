'use client';

import { useRouter } from 'next/navigation';
import { useCreateCandidate } from '@/hooks/useCandidates';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import CandidateForm from '@/components/candidates/CandidateForm';
import { CreateCandidateFormValues } from '@/lib/validations/candidate';

export default function NewCandidatePage() {
  const router = useRouter();
  const createCandidate = useCreateCandidate();

  const handleSubmit = async (data: CreateCandidateFormValues) => {
    await createCandidate.mutateAsync(data);
    router.push('/candidates');
  };

  return (
    <div>
      <PageHeader title="Add New Candidate" description="Enter candidate information" />
      <Card>
        <CandidateForm onSubmit={handleSubmit} isLoading={createCandidate.isPending} onCancel={() => router.push('/candidates')} />
      </Card>
    </div>
  );
}

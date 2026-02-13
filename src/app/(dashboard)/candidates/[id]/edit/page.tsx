'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCandidate, useUpdateCandidate } from '@/hooks/useCandidates';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import CandidateForm from '@/components/candidates/CandidateForm';
import { CreateCandidateFormValues } from '@/lib/validations/candidate';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditCandidatePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: response, isLoading } = useCandidate(id);
  const updateCandidate = useUpdateCandidate();

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  if (!response?.data) return <div className="py-12 text-center text-gray-500">Candidate not found</div>;

  const handleSubmit = async (data: CreateCandidateFormValues) => {
    await updateCandidate.mutateAsync({ id, dto: data });
    router.push(`/candidates/${id}`);
  };

  return (
    <div>
      <div className="mb-4"><Link href={`/candidates/${id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="h-4 w-4" /> Back to Candidate</Link></div>
      <PageHeader title="Edit Candidate" description={`Editing: ${response.data.firstName} ${response.data.lastName}`} />
      <Card><CandidateForm initialData={response.data} onSubmit={handleSubmit} isLoading={updateCandidate.isPending} onCancel={() => router.push(`/candidates/${id}`)} /></Card>
    </div>
  );
}

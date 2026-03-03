'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJob, useUpdateJob } from '@/hooks/useJobs';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import JobForm from '@/components/jobs/JobForm';
import { CreateJobFormValues } from '@/lib/validations/job';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: response, isLoading } = useJob(id);
  const updateJob = useUpdateJob();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!response?.data) {
    return <div className="py-12 text-center text-gray-500">Job not found</div>;
  }

  const handleSubmit = async (data: CreateJobFormValues) => {
    await updateJob.mutateAsync({ id, dto: data });
    router.push(`/jobs/${id}`);
  };

  return (
    <div>
      <div className="mb-4">
        <Link href={`/jobs/${id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" /> Back to Job
        </Link>
      </div>

      <PageHeader title="Edit Job" description={`Editing: ${response.data.title}`} />
      <Card>
        <JobForm
          initialData={response.data}
          onSubmit={handleSubmit}
          isLoading={updateJob.isPending}
          onCancel={() => router.push(`/jobs/${id}`)}
        />
      </Card>
    </div>
  );
}

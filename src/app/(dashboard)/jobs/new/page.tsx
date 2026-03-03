'use client';

import { useRouter } from 'next/navigation';
import { useCreateJob } from '@/hooks/useJobs';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import JobForm from '@/components/jobs/JobForm';
import { CreateJobFormValues } from '@/lib/validations/job';

export default function NewJobPage() {
  const router = useRouter();
  const createJob = useCreateJob();

  const handleSubmit = async (data: CreateJobFormValues) => {
    await createJob.mutateAsync(data);
    router.push('/jobs');
  };

  return (
    <div>
      <PageHeader title="Create New Job" description="Fill in the details to create a new job posting" />
      <Card>
        <JobForm
          onSubmit={handleSubmit}
          isLoading={createJob.isPending}
          onCancel={() => router.push('/jobs')}
        />
      </Card>
    </div>
  );
}

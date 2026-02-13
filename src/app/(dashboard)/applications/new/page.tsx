'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { formResolver } from '@/lib/validations/resolver';
import { createApplicationSchema, CreateApplicationFormValues } from '@/lib/validations/application';
import { useCreateApplication } from '@/hooks/useApplications';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function NewApplicationPage() {
  const router = useRouter();
  const createApplication = useCreateApplication();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApplicationFormValues>({
    resolver: formResolver(createApplicationSchema),
  });

  const onSubmit = async (data: CreateApplicationFormValues) => {
    await createApplication.mutateAsync(data);
    router.push('/applications');
  };

  return (
    <div>
      <PageHeader title="New Application" description="Create a new job application" />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input label="Job ID" placeholder="Enter job ID" error={errors.jobId?.message} {...register('jobId')} />
            <Input label="Candidate ID" placeholder="Enter candidate ID" error={errors.candidateId?.message} {...register('candidateId')} />
          </div>
          <Input label="Resume URL" placeholder="https://..." error={errors.resumeUrl?.message} {...register('resumeUrl')} />
          <Textarea label="Cover Letter" placeholder="Enter cover letter..." error={errors.coverLetter?.message} {...register('coverLetter')} />
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <Button type="button" variant="outline" onClick={() => router.push('/applications')}>Cancel</Button>
            <Button type="submit" isLoading={createApplication.isPending}>Create Application</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

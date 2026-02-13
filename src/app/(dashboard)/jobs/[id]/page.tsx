'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJob, useUpdateJobStatus, useDeleteJob } from '@/hooks/useJobs';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { JOB_STATUS_COLORS, JOB_STATUS_LABELS, JOB_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS } from '@/lib/constants';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Pencil, Trash2, MapPin, Clock, DollarSign, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { JobStatus } from '@/types';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: response, isLoading } = useJob(id);
  const updateStatus = useUpdateJobStatus();
  const deleteJob = useDeleteJob();
  const [showDelete, setShowDelete] = useState(false);
  const job = response?.data;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!job) {
    return <div className="py-12 text-center text-gray-500">Job not found</div>;
  }

  const handleDelete = async () => {
    await deleteJob.mutateAsync(id);
    router.push('/jobs');
  };

  const handleStatusChange = (status: JobStatus) => {
    updateStatus.mutate({ id, status });
  };

  return (
    <div>
      <div className="mb-4">
        <Link href="/jobs" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" /> Back to Jobs
        </Link>
      </div>

      <PageHeader
        title={job.title}
        description={job.department}
        action={
          <div className="flex items-center gap-3">
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <Link href={`/jobs/${id}/edit`}>
              <Button variant="outline" leftIcon={<Pencil className="h-4 w-4" />}>Edit</Button>
            </Link>
            <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />} onClick={() => setShowDelete(true)}>
              Delete
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Description</h3>
            <p className="whitespace-pre-wrap text-sm text-gray-600">{job.description}</p>
          </Card>

          {job.requirements.length > 0 && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Requirements</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </Card>
          )}

          {job.responsibilities.length > 0 && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Responsibilities</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
              </ul>
            </Card>
          )}

          {job.benefits.length > 0 && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                {job.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
              </ul>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Job Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant={JOB_STATUS_COLORS[job.status]}>{JOB_STATUS_LABELS[job.status]}</Badge>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{job.location}</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{JOB_TYPE_LABELS[job.jobType]}</p>
                  <p className="text-xs text-gray-500">{EXPERIENCE_LEVEL_LABELS[job.experienceLevel]}</p>
                </div>
              </div>
              {(job.salaryMin || job.salaryMax) && (
                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {job.salaryMin && job.salaryMax
                        ? `${formatCurrency(job.salaryMin, job.currency)} - ${formatCurrency(job.salaryMax, job.currency)}`
                        : job.salaryMin
                        ? `From ${formatCurrency(job.salaryMin, job.currency)}`
                        : `Up to ${formatCurrency(job.salaryMax!, job.currency)}`}
                    </p>
                    <p className="text-xs text-gray-500">Salary Range</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{job.openPositions} position(s)</p>
                  <p className="text-xs text-gray-500">Open Positions</p>
                </div>
              </div>
              {job.applicationDeadline && (
                <div>
                  <p className="text-xs text-gray-500">Application Deadline</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(job.applicationDeadline)}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">Posted</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(job.createdAt)}</p>
              </div>
            </div>
          </Card>

          {job.skills.length > 0 && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="bg-blue-100 text-blue-800">{skill}</Badge>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message="Are you sure you want to delete this job? All associated applications will also be affected."
        confirmLabel="Delete"
        isLoading={deleteJob.isPending}
      />
    </div>
  );
}

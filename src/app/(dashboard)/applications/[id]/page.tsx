'use client';

import { useParams, useRouter } from 'next/navigation';
import { useApplication, useUpdateApplicationStatus, useDeleteApplication } from '@/hooks/useApplications';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { APPLICATION_STATUS_COLORS, APPLICATION_STATUS_LABELS } from '@/lib/constants';
import { formatDate, getInitials } from '@/lib/utils';
import { Trash2, ArrowLeft, Mail, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ApplicationStatus } from '@/types';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: response, isLoading } = useApplication(id);
  const updateStatus = useUpdateApplicationStatus();
  const deleteApplication = useDeleteApplication();
  const [showDelete, setShowDelete] = useState(false);
  const app = response?.data;

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  if (!app) return <div className="py-12 text-center text-gray-500">Application not found</div>;

  const handleDelete = async () => {
    await deleteApplication.mutateAsync(id);
    router.push('/applications');
  };

  const handleStatusChange = (status: ApplicationStatus) => {
    updateStatus.mutate({ id, status });
  };

  return (
    <div>
      <div className="mb-4"><Link href="/applications" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="h-4 w-4" /> Back to Applications</Link></div>

      <PageHeader
        title={`Application #${id.slice(0, 8)}`}
        action={
          <div className="flex items-center gap-3">
            <select value={app.status} onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              {Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => (<option key={value} value={value}>{label}</option>))}
            </select>
            <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />} onClick={() => setShowDelete(true)}>Delete</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Application Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <Badge variant={APPLICATION_STATUS_COLORS[app.status]}>{APPLICATION_STATUS_LABELS[app.status]}</Badge>
              </div>
              {app.rating && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Rating:</span>
                  <div className="flex gap-1">{[1,2,3,4,5].map((s) => <span key={s} className={s <= app.rating! ? 'text-yellow-400' : 'text-gray-200'}>★</span>)}</div>
                </div>
              )}
              <div><span className="text-sm text-gray-500">Applied:</span> <span className="ml-2 text-sm">{formatDate(app.appliedAt)}</span></div>
            </div>
          </Card>

          {app.coverLetter && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Cover Letter</h3>
              <p className="whitespace-pre-wrap text-sm text-gray-600">{app.coverLetter}</p>
            </Card>
          )}

          {app.notes && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Notes</h3>
              <p className="whitespace-pre-wrap text-sm text-gray-600">{app.notes}</p>
            </Card>
          )}

          {app.rejectionReason && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Rejection Reason</h3>
              <p className="text-sm text-red-600">{app.rejectionReason}</p>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {app.candidate && (
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Candidate</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">{getInitials(`${app.candidate.firstName} ${app.candidate.lastName}`)}</div>
                <div>
                  <Link href={`/candidates/${app.candidate.id}`} className="text-sm font-medium text-blue-600 hover:underline">{app.candidate.firstName} {app.candidate.lastName}</Link>
                  <p className="text-xs text-gray-500">{app.candidate.currentTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><Mail className="h-4 w-4" />{app.candidate.email}</div>
            </Card>
          )}

          {app.job && (
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Position</h3>
              <div className="flex items-center gap-2 mb-2"><Briefcase className="h-4 w-4 text-gray-400" /><Link href={`/jobs/${app.job.id}`} className="text-sm font-medium text-blue-600 hover:underline">{app.job.title}</Link></div>
              <p className="text-xs text-gray-500">{app.job.department}</p>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} title="Delete Application" message="Are you sure you want to delete this application?" confirmLabel="Delete" isLoading={deleteApplication.isPending} />
    </div>
  );
}

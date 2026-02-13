'use client';

import { useParams, useRouter } from 'next/navigation';
import { useInterview, useUpdateInterview, useDeleteInterview, useSubmitFeedback } from '@/hooks/useInterviews';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import FeedbackForm from '@/components/interviews/FeedbackForm';
import { INTERVIEW_STATUS_COLORS, INTERVIEW_STATUS_LABELS, INTERVIEW_TYPE_LABELS } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { Trash2, ArrowLeft, Calendar, Clock, MapPin, Video, Users, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { InterviewStatus } from '@/types';
import { FeedbackFormValues } from '@/lib/validations/interview';

export default function InterviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: response, isLoading } = useInterview(id);
  const updateInterview = useUpdateInterview();
  const deleteInterview = useDeleteInterview();
  const submitFeedback = useSubmitFeedback();
  const [showDelete, setShowDelete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const interview = response?.data;

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>;
  if (!interview) return <div className="py-12 text-center text-gray-500">Interview not found</div>;

  const handleDelete = async () => {
    await deleteInterview.mutateAsync(id);
    router.push('/interviews');
  };

  const handleStatusChange = (status: InterviewStatus) => {
    updateInterview.mutate({ id, dto: { status } });
  };

  const handleFeedbackSubmit = async (data: FeedbackFormValues) => {
    await submitFeedback.mutateAsync({ id, feedback: data.feedback, rating: data.rating });
    setShowFeedback(false);
  };

  return (
    <div>
      <div className="mb-4"><Link href="/interviews" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="h-4 w-4" /> Back to Interviews</Link></div>

      <PageHeader
        title={`${INTERVIEW_TYPE_LABELS[interview.interviewType]} Interview`}
        description={interview.application?.candidate ? `${interview.application.candidate.firstName} ${interview.application.candidate.lastName}` : undefined}
        action={
          <div className="flex items-center gap-3">
            <select value={interview.status} onChange={(e) => handleStatusChange(e.target.value as InterviewStatus)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              {Object.entries(INTERVIEW_STATUS_LABELS).map(([value, label]) => (<option key={value} value={value}>{label}</option>))}
            </select>
            {interview.status === 'completed' && !interview.feedback && (
              <Button leftIcon={<MessageSquare className="h-4 w-4" />} onClick={() => setShowFeedback(true)}>Add Feedback</Button>
            )}
            <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />} onClick={() => setShowDelete(true)}>Delete</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Interview Details</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3"><Badge variant={INTERVIEW_STATUS_COLORS[interview.status]}>{INTERVIEW_STATUS_LABELS[interview.status]}</Badge></div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-400" /><span className="text-sm">{formatDateTime(interview.scheduledAt)}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-gray-400" /><span className="text-sm">{interview.duration} minutes</span></div>
              {interview.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" /><span className="text-sm">{interview.location}</span></div>}
              {interview.meetingLink && (
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-gray-400" />
                  <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Join Meeting</a>
                </div>
              )}
            </div>
          </Card>

          {interview.feedback && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Feedback</h3>
              {interview.rating && (
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Rating:</span>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} className={`h-5 w-5 ${s <= interview.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />)}</div>
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm text-gray-600">{interview.feedback}</p>
            </Card>
          )}

          {interview.notes && (
            <Card>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Notes</h3>
              <p className="whitespace-pre-wrap text-sm text-gray-600">{interview.notes}</p>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {interview.application?.candidate && (
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Candidate</h3>
              <p className="text-sm font-medium text-gray-900">{interview.application.candidate.firstName} {interview.application.candidate.lastName}</p>
              <p className="text-xs text-gray-500">{interview.application.candidate.email}</p>
              {interview.application.job && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500">Position</p>
                  <Link href={`/jobs/${interview.application.job.id}`} className="text-sm text-blue-600 hover:underline">{interview.application.job.title}</Link>
                </div>
              )}
            </Card>
          )}

          <Card>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Interviewers</h3>
            <div className="space-y-2">
              {interview.interviewers.map((name) => (
                <div key={name} className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={showFeedback} onClose={() => setShowFeedback(false)} title="Submit Interview Feedback" size="md">
        <FeedbackForm onSubmit={handleFeedbackSubmit} isLoading={submitFeedback.isPending} onCancel={() => setShowFeedback(false)} />
      </Modal>

      <ConfirmDialog isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} title="Delete Interview" message="Are you sure you want to delete this interview?" confirmLabel="Delete" isLoading={deleteInterview.isPending} />
    </div>
  );
}

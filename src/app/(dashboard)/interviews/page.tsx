'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviews, useDeleteInterview } from '@/hooks/useInterviews';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import DataTable, { Column } from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import SearchInput from '@/components/ui/SearchInput';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Interview, InterviewFilters } from '@/types';
import { INTERVIEW_STATUS_COLORS, INTERVIEW_STATUS_LABELS, INTERVIEW_TYPE_LABELS } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { Plus, Trash2, Eye, Calendar, Clock, Video } from 'lucide-react';
import Link from 'next/link';

export default function InterviewsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<InterviewFilters>({});
  const [sortBy, setSortBy] = useState('scheduledAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { page, limit, goToPage } = usePagination();
  const debouncedSearch = useDebounce(search);
  const deleteInterview = useDeleteInterview();

  const { data, isLoading } = useInterviews({
    page,
    limit,
    search: debouncedSearch || undefined,
    sortBy,
    sortOrder,
    ...filters,
  });

  const handleSort = useCallback(
    (key: string) => {
      if (sortBy === key) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(key);
        setSortOrder('asc');
      }
    },
    [sortBy, sortOrder]
  );

  const handleDelete = async () => {
    if (deleteId) {
      await deleteInterview.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const columns: Column<Interview>[] = [
    {
      key: 'candidate',
      header: 'Candidate',
      render: (interview) => (
        <div>
          <p className="text-sm font-medium text-gray-900">
            {interview.application?.candidate
              ? `${interview.application.candidate.firstName} ${interview.application.candidate.lastName}`
              : 'Unknown'}
          </p>
          <p className="text-xs text-gray-500">{interview.application?.job?.title || 'Unknown Position'}</p>
        </div>
      ),
    },
    {
      key: 'interviewType',
      header: 'Type',
      render: (interview) => (
        <Badge variant="bg-purple-100 text-purple-800">
          {INTERVIEW_TYPE_LABELS[interview.interviewType]}
        </Badge>
      ),
    },
    {
      key: 'scheduledAt',
      header: 'Scheduled',
      sortable: true,
      render: (interview) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{formatDateTime(interview.scheduledAt)}</span>
        </div>
      ),
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (interview) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{interview.duration} min</span>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (interview) => (
        <div className="text-sm">
          {interview.meetingLink ? (
            <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              <Video className="h-3 w-3" /> Virtual
            </a>
          ) : (
            interview.location || '-'
          )}
        </div>
      ),
    },
    {
      key: 'interviewers',
      header: 'Interviewers',
      render: (interview) => (
        <div className="flex flex-wrap gap-1">
          {interview.interviewers.slice(0, 2).map((name) => (
            <Badge key={name} variant="bg-gray-100 text-gray-700">{name}</Badge>
          ))}
          {interview.interviewers.length > 2 && (
            <Badge variant="bg-gray-100 text-gray-500">+{interview.interviewers.length - 2}</Badge>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (interview) => (
        <Badge variant={INTERVIEW_STATUS_COLORS[interview.status]}>
          {INTERVIEW_STATUS_LABELS[interview.status]}
        </Badge>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (interview) =>
        interview.rating ? (
          <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <span key={s} className={s <= interview.rating! ? 'text-yellow-400' : 'text-gray-200'}>★</span>)}</div>
        ) : <span className="text-sm text-gray-400">-</span>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-20',
      render: (interview) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); router.push(`/interviews/${interview.id}`); }} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Eye className="h-4 w-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteId(interview.id); }} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Interviews"
        description="Schedule and manage interviews"
        action={<Link href="/interviews/new"><Button leftIcon={<Plus className="h-4 w-4" />}>Schedule Interview</Button></Link>}
      />

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search interviews..." className="w-64" />
        <Select
          label="Status"
          options={Object.entries(INTERVIEW_STATUS_LABELS).map(([value, label]) => ({ value, label }))}
          placeholder="All Statuses"
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as InterviewFilters['status'] || undefined })}
        />
        <Select
          label="Type"
          options={Object.entries(INTERVIEW_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
          placeholder="All Types"
          value={filters.interviewType || ''}
          onChange={(e) => setFilters({ ...filters, interviewType: e.target.value as InterviewFilters['interviewType'] || undefined })}
        />
      </div>

      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} keyExtractor={(i) => i.id} emptyMessage="No interviews found" emptyDescription="Schedule your first interview to get started" />
      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={goToPage} total={data.total} limit={data.limit} />}
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Cancel Interview" message="Are you sure you want to delete this interview?" confirmLabel="Delete" isLoading={deleteInterview.isPending} />
    </div>
  );
}

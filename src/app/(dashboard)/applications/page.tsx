'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApplications, useUpdateApplicationStatus, useDeleteApplication } from '@/hooks/useApplications';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import DataTable, { Column } from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import Badge from '@/components/ui/Badge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ApplicationFilters from '@/components/applications/ApplicationFilters';
import ApplicationPipeline from '@/components/applications/ApplicationPipeline';
import { Application, ApplicationFilters as ApplicationFiltersType, ApplicationStatus } from '@/types';
import { APPLICATION_STATUS_COLORS, APPLICATION_STATUS_LABELS } from '@/lib/constants';
import { formatDate, getInitials } from '@/lib/utils';
import { Plus, Trash2, Eye, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('table');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<ApplicationFiltersType>({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { page, limit, goToPage } = usePagination();
  const debouncedSearch = useDebounce(search);
  const deleteApplication = useDeleteApplication();
  const updateStatus = useUpdateApplicationStatus();

  const { data, isLoading } = useApplications({
    page,
    limit: viewMode === 'pipeline' ? 100 : limit,
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
      await deleteApplication.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    updateStatus.mutate({ id, status });
  };

  const columns: Column<Application>[] = [
    {
      key: 'candidate',
      header: 'Candidate',
      render: (app) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
            {app.candidate ? getInitials(`${app.candidate.firstName} ${app.candidate.lastName}`) : '?'}
          </div>
          <div>
            <Link href={`/applications/${app.id}`} className="font-medium text-blue-600 hover:text-blue-700">
              {app.candidate ? `${app.candidate.firstName} ${app.candidate.lastName}` : 'Unknown'}
            </Link>
            {app.candidate?.email && <p className="text-xs text-gray-500">{app.candidate.email}</p>}
          </div>
        </div>
      ),
    },
    {
      key: 'job',
      header: 'Position',
      render: (app) => (
        <div>
          <p className="text-sm font-medium">{app.job?.title || 'Unknown'}</p>
          {app.job?.department && <p className="text-xs text-gray-500">{app.job.department}</p>}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (app) => (
        <Badge variant={APPLICATION_STATUS_COLORS[app.status]}>
          {APPLICATION_STATUS_LABELS[app.status]}
        </Badge>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (app) =>
        app.rating ? (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= app.rating! ? 'text-yellow-400' : 'text-gray-200'}>★</span>
            ))}
          </div>
        ) : <span className="text-sm text-gray-400">-</span>,
    },
    {
      key: 'appliedAt',
      header: 'Applied',
      sortable: true,
      render: (app) => <span className="text-sm text-gray-500">{formatDate(app.appliedAt)}</span>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-20',
      render: (app) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); router.push(`/applications/${app.id}`); }} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Eye className="h-4 w-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteId(app.id); }} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Applications"
        description="Track and manage job applications"
        action={
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode('table')}
                className={`rounded-l-lg px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('pipeline')}
                className={`rounded-r-lg px-3 py-2 text-sm ${viewMode === 'pipeline' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
            <Link href="/applications/new"><Button leftIcon={<Plus className="h-4 w-4" />}>New Application</Button></Link>
          </div>
        }
      />

      <ApplicationFilters search={search} onSearchChange={setSearch} filters={filters} onFilterChange={setFilters} />

      {viewMode === 'pipeline' ? (
        <ApplicationPipeline applications={data?.data ?? []} onStatusChange={handleStatusChange} />
      ) : (
        <>
          <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} keyExtractor={(a) => a.id} emptyMessage="No applications found" emptyDescription="Applications will appear here when candidates apply" />
          {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={goToPage} total={data.total} limit={data.limit} />}
        </>
      )}

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Application" message="Are you sure you want to delete this application?" confirmLabel="Delete" isLoading={deleteApplication.isPending} />
    </div>
  );
}

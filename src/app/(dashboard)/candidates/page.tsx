'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCandidates, useDeleteCandidate } from '@/hooks/useCandidates';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import DataTable, { Column } from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import Badge from '@/components/ui/Badge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import CandidateFilters from '@/components/candidates/CandidateFilters';
import { Candidate, CandidateFilters as CandidateFiltersType } from '@/types';
import { CANDIDATE_SOURCE_LABELS } from '@/lib/constants';
import { formatDate, getInitials } from '@/lib/utils';
import { Plus, Pencil, Trash2, Eye, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CandidatesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<CandidateFiltersType>({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { page, limit, goToPage } = usePagination();
  const debouncedSearch = useDebounce(search);
  const deleteCandidate = useDeleteCandidate();

  const { data, isLoading } = useCandidates({
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
      await deleteCandidate.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const columns: Column<Candidate>[] = [
    {
      key: 'name',
      header: 'Candidate',
      sortable: true,
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
            {getInitials(`${c.firstName} ${c.lastName}`)}
          </div>
          <div>
            <Link href={`/candidates/${c.id}`} className="font-medium text-blue-600 hover:text-blue-700">
              {c.firstName} {c.lastName}
            </Link>
            <p className="text-xs text-gray-500">{c.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'currentTitle',
      header: 'Current Role',
      render: (c) => (
        <div>
          <p className="text-sm">{c.currentTitle || '-'}</p>
          {c.currentCompany && <p className="text-xs text-gray-500">{c.currentCompany}</p>}
        </div>
      ),
    },
    { key: 'location', header: 'Location', render: (c) => <span className="text-sm">{c.location || '-'}</span> },
    {
      key: 'experienceYears',
      header: 'Experience',
      sortable: true,
      render: (c) => <span className="text-sm">{c.experienceYears != null ? `${c.experienceYears} years` : '-'}</span>,
    },
    {
      key: 'source',
      header: 'Source',
      render: (c) => <Badge>{CANDIDATE_SOURCE_LABELS[c.source] || c.source}</Badge>,
    },
    {
      key: 'skills',
      header: 'Skills',
      render: (c) => (
        <div className="flex flex-wrap gap-1">
          {c.skills.slice(0, 3).map((s) => (
            <Badge key={s} variant="bg-gray-100 text-gray-700">{s}</Badge>
          ))}
          {c.skills.length > 3 && <Badge variant="bg-gray-100 text-gray-500">+{c.skills.length - 3}</Badge>}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Added',
      sortable: true,
      render: (c) => <span className="text-sm text-gray-500">{formatDate(c.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-32',
      render: (c) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); router.push(`/candidates/${c.id}`); }} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Eye className="h-4 w-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); router.push(`/candidates/${c.id}/edit`); }} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Pencil className="h-4 w-4" /></button>
          {c.linkedinUrl && (
            <a href={c.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><ExternalLink className="h-4 w-4" /></a>
          )}
          <button onClick={(e) => { e.stopPropagation(); setDeleteId(c.id); }} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Candidates"
        description="Manage your candidate pool"
        action={<Link href="/candidates/new"><Button leftIcon={<Plus className="h-4 w-4" />}>Add Candidate</Button></Link>}
      />
      <CandidateFilters search={search} onSearchChange={setSearch} filters={filters} onFilterChange={setFilters} />
      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} keyExtractor={(c) => c.id} emptyMessage="No candidates found" emptyDescription="Add your first candidate to get started" />
      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={goToPage} total={data.total} limit={data.limit} />}
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Candidate" message="Are you sure you want to delete this candidate?" confirmLabel="Delete" isLoading={deleteCandidate.isPending} />
    </div>
  );
}

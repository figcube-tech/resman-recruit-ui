"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useJobs, useDeleteJob } from "@/hooks/useJobs";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import DataTable, { Column } from "@/components/ui/DataTable";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import JobFilters from "@/components/jobs/JobFilters";
import { Job, JobFilters as JobFiltersType } from "@/types";
import {
  JOB_STATUS_COLORS,
  JOB_STATUS_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "@/lib/constants";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<JobFiltersType>({});
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { page, limit, goToPage } = usePagination();
  const debouncedSearch = useDebounce(search);
  const deleteJob = useDeleteJob();

  const { data, isLoading } = useJobs({
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
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(key);
        setSortOrder("asc");
      }
    },
    [sortBy, sortOrder],
  );

  const handleDelete = async () => {
    if (deleteId) {
      await deleteJob.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const columns: Column<Job>[] = [
    {
      key: "title",
      header: "Job Title",
      sortable: true,
      render: (job) => (
        <div>
          <Link
            href={`/jobs/${job.id}`}
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            {job.title}
          </Link>
          <p className="text-xs text-gray-500">{job.department}</p>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
    },
    {
      key: "jobType",
      header: "Type",
      render: (job) => (
        <span className="text-sm">{JOB_TYPE_LABELS[job.jobType]}</span>
      ),
    },
    {
      key: "experienceLevel",
      header: "Level",
      render: (job) => (
        <span className="text-sm">
          {EXPERIENCE_LEVEL_LABELS[job.experienceLevel]}
        </span>
      ),
    },
    {
      key: "salary",
      header: "Salary Range",
      render: (job) =>
        job.salaryMin && job.salaryMax ? (
          <span className="text-sm">
            {formatCurrency(job.salaryMin, job.currency)} -{" "}
            {formatCurrency(job.salaryMax, job.currency)}
          </span>
        ) : (
          <span className="text-sm text-gray-400">Not specified</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (job) => (
        <Badge variant={JOB_STATUS_COLORS[job.status]}>
          {JOB_STATUS_LABELS[job.status]}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Posted",
      sortable: true,
      render: (job) => (
        <span className="text-sm text-gray-500">
          {formatDate(job.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      render: (job) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/jobs/${job.id}`);
            }}
            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/jobs/${job.id}/edit`);
            }}
            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(job.id);
            }}
            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Jobs"
        description="Manage job postings and openings"
        action={
          <Link href="/jobs/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Create Job</Button>
          </Link>
        }
      />

      <JobFilters
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={setFilters}
      />

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        keyExtractor={(job) => job.id}
        emptyMessage="No jobs found"
        emptyDescription="Create your first job posting to get started"
      />

      {data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={goToPage}
          total={data.total}
          limit={data.limit}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Job"
        message="Are you sure you want to delete this job? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={deleteJob.isPending}
      />
    </div>
  );
}

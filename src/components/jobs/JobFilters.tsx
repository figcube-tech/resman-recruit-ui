'use client';

import Select from '@/components/ui/Select';
import SearchInput from '@/components/ui/SearchInput';
import { JOB_STATUS_LABELS, JOB_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS, DEPARTMENTS } from '@/lib/constants';
import { JobFilters as JobFiltersType } from '@/types';

interface JobFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: JobFiltersType;
  onFilterChange: (filters: JobFiltersType) => void;
}

export default function JobFilters({ search, onSearchChange, filters, onFilterChange }: JobFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-4">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search jobs..."
        className="w-64"
      />
      <Select
        label="Status"
        options={Object.entries(JOB_STATUS_LABELS).map(([value, label]) => ({ value, label }))}
        placeholder="All Statuses"
        value={filters.status || ''}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as JobFiltersType['status'] || undefined })}
      />
      <Select
        label="Type"
        options={Object.entries(JOB_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
        placeholder="All Types"
        value={filters.jobType || ''}
        onChange={(e) => onFilterChange({ ...filters, jobType: e.target.value as JobFiltersType['jobType'] || undefined })}
      />
      <Select
        label="Experience"
        options={Object.entries(EXPERIENCE_LEVEL_LABELS).map(([value, label]) => ({ value, label }))}
        placeholder="All Levels"
        value={filters.experienceLevel || ''}
        onChange={(e) => onFilterChange({ ...filters, experienceLevel: e.target.value as JobFiltersType['experienceLevel'] || undefined })}
      />
      <Select
        label="Department"
        options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
        placeholder="All Departments"
        value={filters.department || ''}
        onChange={(e) => onFilterChange({ ...filters, department: e.target.value || undefined })}
      />
    </div>
  );
}

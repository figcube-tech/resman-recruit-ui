'use client';

import Select from '@/components/ui/Select';
import SearchInput from '@/components/ui/SearchInput';
import { APPLICATION_STATUS_LABELS } from '@/lib/constants';
import { ApplicationFilters as ApplicationFiltersType } from '@/types';

interface ApplicationFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: ApplicationFiltersType;
  onFilterChange: (filters: ApplicationFiltersType) => void;
}

export default function ApplicationFilters({ search, onSearchChange, filters, onFilterChange }: ApplicationFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-4">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search applications..."
        className="w-64"
      />
      <Select
        label="Status"
        options={Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => ({ value, label }))}
        placeholder="All Statuses"
        value={filters.status || ''}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as ApplicationFiltersType['status'] || undefined })}
      />
    </div>
  );
}

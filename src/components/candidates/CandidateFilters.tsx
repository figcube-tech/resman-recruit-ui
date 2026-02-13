'use client';

import Select from '@/components/ui/Select';
import SearchInput from '@/components/ui/SearchInput';
import { CANDIDATE_SOURCE_LABELS } from '@/lib/constants';
import { CandidateFilters as CandidateFiltersType } from '@/types';

interface CandidateFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: CandidateFiltersType;
  onFilterChange: (filters: CandidateFiltersType) => void;
}

export default function CandidateFilters({ search, onSearchChange, filters, onFilterChange }: CandidateFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-4">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search candidates..."
        className="w-64"
      />
      <Select
        label="Source"
        options={Object.entries(CANDIDATE_SOURCE_LABELS).map(([value, label]) => ({ value, label }))}
        placeholder="All Sources"
        value={filters.source || ''}
        onChange={(e) => onFilterChange({ ...filters, source: e.target.value as CandidateFiltersType['source'] || undefined })}
      />
    </div>
  );
}

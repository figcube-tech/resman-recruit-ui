'use client';

import { Application, ApplicationStatus, APPLICATION_STATUS_ORDER } from '@/types';
import Badge from '@/components/ui/Badge';
import { APPLICATION_STATUS_COLORS, APPLICATION_STATUS_LABELS } from '@/lib/constants';
import { getInitials, formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ApplicationPipelineProps {
  applications: Application[];
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export default function ApplicationPipeline({ applications, onStatusChange }: ApplicationPipelineProps) {
  const columns = APPLICATION_STATUS_ORDER.map((status) => ({
    status,
    label: APPLICATION_STATUS_LABELS[status],
    color: APPLICATION_STATUS_COLORS[status],
    items: applications.filter((a) => a.status === status),
  }));

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: `${columns.length * 280}px` }}>
        {columns.map((column) => (
          <div key={column.status} className="w-[270px] shrink-0">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">{column.label}</h3>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {column.items.length}
              </span>
            </div>
            <div className="space-y-2">
              {column.items.map((app) => (
                <div
                  key={app.id}
                  className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                      {app.candidate ? getInitials(`${app.candidate.firstName} ${app.candidate.lastName}`) : '?'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link href={`/applications/${app.id}`} className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600">
                        {app.candidate ? `${app.candidate.firstName} ${app.candidate.lastName}` : 'Unknown'}
                      </Link>
                    </div>
                  </div>
                  <p className="mb-2 truncate text-xs text-gray-500">
                    {app.job?.title || 'Unknown Position'}
                  </p>
                  {app.rating && (
                    <div className="mb-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={cn('text-xs', star <= app.rating! ? 'text-yellow-400' : 'text-gray-200')}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{formatRelativeTime(app.appliedAt)}</span>
                    <select
                      value={app.status}
                      onChange={(e) => onStatusChange(app.id, e.target.value as ApplicationStatus)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border border-gray-200 bg-transparent px-1 py-0.5 text-xs text-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                      {Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {column.items.length === 0 && (
                <div className="rounded-lg border-2 border-dashed border-gray-200 py-6 text-center text-xs text-gray-400">
                  No applications
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

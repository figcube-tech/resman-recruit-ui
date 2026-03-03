"use client";

import { VendorPortalSubmission } from "@/types/vendor";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Eye } from "lucide-react";
import Button from "@/components/ui/Button";

interface VendorSubmissionListProps {
  submissions: VendorPortalSubmission[];
  isLoading: boolean;
}

function SubmissionStatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: "bg-yellow-100", text: "text-yellow-800" },
    UNDER_REVIEW: { bg: "bg-blue-100", text: "text-blue-800" },
    ACCEPTED: { bg: "bg-green-100", text: "text-green-800" },
    REJECTED: { bg: "bg-red-100", text: "text-red-800" },
  };

  const color = colors[status] || colors.PENDING;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${color.bg} ${color.text}`}
    >
      {status}
    </span>
  );
}

export default function VendorSubmissionList({
  submissions,
  isLoading,
}: VendorSubmissionListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading submissions...
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">No submissions yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Candidate
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Quality Score
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Submitted
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {submissions.map((submission) => (
            <tr key={submission.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">
                  {submission.jobTitle}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-gray-900">{submission.candidateName}</p>
              </td>
              <td className="px-6 py-4">
                <SubmissionStatusBadge status={submission.status} />
              </td>
              <td className="px-6 py-4">
                {submission.qualityScore ? (
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${submission.qualityScore * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {submission.qualityScore}/10
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(submission.submittedDate)}
              </td>
              <td className="px-6 py-4">
                <Link href={`/vendor-portal/submissions/${submission.id}`}>
                  <Button size="sm" variant="secondary">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { VendorPortalJobPosting } from "@/types/vendor";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MapPin, FileText } from "lucide-react";

interface VendorJobListProps {
  jobs: VendorPortalJobPosting[];
  isLoading: boolean;
  companyId: number;
}

export default function VendorJobList({
  jobs,
  isLoading,
  companyId,
}: VendorJobListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading jobs...</div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-500">No available job postings</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-300 transition"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {job.jobTitle}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{job.department}</p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                job.status === "OPEN"
                  ? "bg-green-100 text-green-800"
                  : job.status === "CLOSED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {job.status}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            <p className="text-sm text-gray-600">
              Positions: {job.positionsFilled}/{job.positionsAvailable}
            </p>
            <p className="text-sm font-medium text-gray-900">
              Salary: ${job.salaryMin.toLocaleString()} - $
              {job.salaryMax.toLocaleString()}
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-600 line-clamp-2">
            {job.description}
          </p>

          <div className="mt-6 flex gap-2">
            <Link href={`/vendor-portal/jobs/${job.id}`} className="flex-1">
              <Button className="w-full">View Details</Button>
            </Link>
            {job.status === "OPEN" && (
              <Link
                href={`/vendor-portal/submit-candidate?jobId=${job.id}`}
                className="flex-1"
              >
                <Button variant="secondary" className="w-full">
                  Submit Candidate
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

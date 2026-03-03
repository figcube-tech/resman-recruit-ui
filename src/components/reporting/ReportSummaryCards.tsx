"use client";

import { ReportSummary } from "@/types/reporting";
import { TrendingUp, Users, FileText, CheckCircle } from "lucide-react";

interface ReportSummaryCardProps {
  summary: ReportSummary;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}

function MetricCard({ label, value, icon, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <p className="text-sm text-green-600">{trend}% increase</p>
        </div>
      )}
    </div>
  );
}

export default function ReportSummaryCards({
  summary,
}: ReportSummaryCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Jobs"
        value={summary.totalJobs}
        icon={<FileText className="h-8 w-8" />}
      />
      <MetricCard
        label="Active Jobs"
        value={summary.activeJobs}
        icon={<TrendingUp className="h-8 w-8" />}
      />
      <MetricCard
        label="Total Applications"
        value={summary.totalApplications}
        icon={<Users className="h-8 w-8" />}
      />
      <MetricCard
        label="In Progress"
        value={summary.applicationsInProgress}
        icon={<FileText className="h-8 w-8" />}
      />
      <MetricCard
        label="Selected"
        value={summary.selectedCandidates}
        icon={<CheckCircle className="h-8 w-8" />}
      />
      <MetricCard
        label="Total Offers"
        value={summary.totalOffers}
        icon={<FileText className="h-8 w-8" />}
      />
      <MetricCard
        label="Offers Accepted"
        value={summary.acceptedOffers}
        icon={<CheckCircle className="h-8 w-8" />}
      />
      <MetricCard
        label="Rejection Rate"
        value={`${summary.rejectionRate.toFixed(1)}%`}
        icon={<TrendingUp className="h-8 w-8" />}
      />
    </div>
  );
}

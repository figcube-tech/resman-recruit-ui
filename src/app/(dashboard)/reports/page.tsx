"use client";

import { useReportSummary, useAllVendorMetrics } from "@/hooks/useReports";
import ReportSummaryCards from "@/components/reporting/ReportSummaryCards";
import VendorLeaderboard from "@/components/reporting/VendorLeaderboard";
import PageHeader from "@/components/layout/PageHeader";

export default function ReportsPage() {
  const { data: summaryResponse, isLoading: isSummaryLoading } =
    useReportSummary();
  const { data: vendorResponse, isLoading: isVendorLoading } =
    useAllVendorMetrics();

  const summary = summaryResponse?.data;
  const vendors = vendorResponse?.data || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports & Analytics"
        description="Monitor recruitment metrics and performance"
      />

      {isSummaryLoading && !summary ? (
        <div className="text-center py-8 text-gray-500">Loading reports...</div>
      ) : summary ? (
        <>
          <ReportSummaryCards summary={summary} />

          <div className="pt-4">
            <VendorLeaderboard vendors={vendors} isLoading={isVendorLoading} />
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No report data available
        </div>
      )}
    </div>
  );
}

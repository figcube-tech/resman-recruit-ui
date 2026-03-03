"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  useVendorAvailableJobs,
  useVendorSubmissions,
} from "@/hooks/useVendor";
import VendorJobList from "@/components/vendor/VendorJobList";
import VendorSubmissionList from "@/components/vendor/VendorSubmissionList";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function VendorPortalPage() {
  const user = useAuthStore((state) => state.user);
  const companyId = user?.company || 0;

  const { data: jobsResponse, isLoading: isJobsLoading } =
    useVendorAvailableJobs(companyId);
  const { data: submissionsResponse, isLoading: isSubmissionsLoading } =
    useVendorSubmissions(companyId);

  const jobs = jobsResponse?.data?.data || [];
  const submissions = submissionsResponse?.data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Vendor Portal"
          description="Submit qualified candidates for available positions"
        />
        <Link href="/vendor-portal/add-candidate">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="jobs">Available Jobs ({jobs.length})</TabsTrigger>
          <TabsTrigger value="submissions">
            My Submissions ({submissions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <VendorJobList
            jobs={jobs}
            isLoading={isJobsLoading}
            companyId={companyId}
          />
        </TabsContent>

        <TabsContent value="submissions">
          <VendorSubmissionList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

'use client';

import { useDashboard } from '@/hooks/useDashboard';
import PageHeader from '@/components/layout/PageHeader';
import StatsCard from '@/components/ui/StatsCard';
import Card from '@/components/ui/Card';
import { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { Briefcase, Users, FileText, Calendar, TrendingUp, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import { APPLICATION_STATUS_COLORS, APPLICATION_STATUS_LABELS, INTERVIEW_TYPE_LABELS } from '@/lib/constants';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: statsResponse, isLoading } = useDashboard();
  const stats = statsResponse?.data;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your recruitment pipeline"
      />

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="Total Jobs"
          value={stats?.totalJobs ?? 0}
          icon={<Briefcase className="h-6 w-6" />}
        />
        <StatsCard
          title="Open Jobs"
          value={stats?.openJobs ?? 0}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          title="Candidates"
          value={stats?.totalCandidates ?? 0}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Applications"
          value={stats?.totalApplications ?? 0}
          icon={<FileText className="h-6 w-6" />}
        />
        <StatsCard
          title="Pending Interviews"
          value={stats?.pendingInterviews ?? 0}
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatsCard
          title="Hired This Month"
          value={stats?.hiredThisMonth ?? 0}
          icon={<TrendingUp className="h-6 w-6" />}
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Application Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Application Pipeline</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {stats?.applicationsByStatus?.length ? (
              stats.applicationsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={APPLICATION_STATUS_COLORS[item.status]}>
                      {APPLICATION_STATUS_LABELS[item.status] || item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            100,
                            ((item.count / (stats.totalApplications || 1)) * 100)
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-gray-500">No application data available</p>
            )}
          </div>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Interviews</CardTitle>
              <Link href="/interviews" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {stats?.upcomingInterviews?.length ? (
              stats.upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{interview.candidateName}</p>
                    <p className="text-xs text-gray-500">{interview.jobTitle}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="bg-blue-100 text-blue-800">
                      {INTERVIEW_TYPE_LABELS[interview.interviewType] || interview.interviewType}
                    </Badge>
                    <p className="mt-1 text-xs text-gray-500">
                      <Clock className="mr-1 inline h-3 w-3" />
                      {formatRelativeTime(interview.scheduledAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-gray-500">No upcoming interviews</p>
            )}
          </div>
        </Card>

        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Link href="/applications" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Candidate</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Position</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats?.recentApplications?.length ? (
                  stats.recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                        {app.candidateName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {app.jobTitle}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge variant={APPLICATION_STATUS_COLORS[app.status]}>
                          {APPLICATION_STATUS_LABELS[app.status] || app.status}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                        {formatRelativeTime(app.appliedAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">
                      No recent applications
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

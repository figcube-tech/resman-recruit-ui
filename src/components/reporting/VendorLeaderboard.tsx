"use client";

import { VendorPerformance } from "@/types/reporting";
import { formatCurrency } from "@/lib/utils";
import { Trophy } from "lucide-react";

interface VendorLeaderboardProps {
  vendors: VendorPerformance[];
  isLoading?: boolean;
}

export default function VendorLeaderboard({
  vendors,
  isLoading,
}: VendorLeaderboardProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading vendor data...
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">No vendor data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-white" />
          <h3 className="text-lg font-semibold text-white">
            Vendor Leaderboard
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Candidates
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Selected
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Quality
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Earnings
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vendors.map((vendor, index) => (
              <tr key={vendor.vendorId} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-semibold text-gray-900">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">
                    {vendor.vendorName}
                  </p>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {vendor.candidatesSubmitted}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {vendor.candidatesSelected}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {vendor.selectionRate.toFixed(1)}%
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(vendor.averageQualityScore / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {vendor.averageQualityScore.toFixed(1)}/5
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {formatCurrency(vendor.totalEarnings)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

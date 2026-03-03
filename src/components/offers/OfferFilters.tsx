"use client";

import { OfferStatus } from "@/types/offer";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";

interface OfferStatusBadgeProps {
  status: OfferStatus;
}

export function OfferStatusBadge({ status }: OfferStatusBadgeProps) {
  const colors: Record<
    OfferStatus,
    { bg: string; text: string; label: string }
  > = {
    PENDING: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
    ACCEPTED: { bg: "bg-green-100", text: "text-green-800", label: "Accepted" },
    REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
  };

  const color = colors[status];
  return <Badge className={`${color.bg} ${color.text}`}>{color.label}</Badge>;
}

interface OfferFiltersProps {
  status?: string;
  onStatusChange?: (status: string) => void;
}

export function OfferFilters({ status, onStatusChange }: OfferFiltersProps) {
  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "PENDING", label: "Pending" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];

  return (
    <div className="flex gap-4">
      <Select
        value={status || ""}
        onChange={(e) => onStatusChange?.(e.target.value)}
        options={statusOptions}
        label="Filter by Status"
      />
    </div>
  );
}

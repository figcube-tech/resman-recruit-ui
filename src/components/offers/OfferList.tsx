"use client";

import { Offer } from "@/types/offer";
import { OfferStatusBadge } from "./OfferFilters";
import { useDeleteOffer } from "@/hooks/useOffers";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Edit2, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

interface OfferListProps {
  offers: Offer[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export default function OfferList({
  offers,
  isLoading,
  onRefresh,
}: OfferListProps) {
  const { mutate: deleteOffer } = useDeleteOffer();

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;

    deleteOffer(id, {
      onSuccess: () => {
        toast.success("Offer deleted");
        onRefresh?.();
      },
      onError: () => {
        toast.error("Failed to delete offer");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading offers...</div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">No offers found</p>
        <Link href="/offers/new">
          <Button className="mt-4">Create First Offer</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Position
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Candidate
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Salary
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {offers.map((offer) => (
            <tr key={offer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{offer.position}</p>
                <p className="text-sm text-gray-600">{offer.department}</p>
              </td>
              <td className="px-6 py-4">
                {offer.application?.candidate ? (
                  <div>
                    <p className="text-gray-900">
                      {offer.application.candidate.firstName}{" "}
                      {offer.application.candidate.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {offer.application.candidate.email}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">-</p>
                )}
              </td>
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">
                  {formatCurrency(offer.salary)}
                </p>
              </td>
              <td className="px-6 py-4">
                <OfferStatusBadge status={offer.status} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {offer.offerExpiryDate
                  ? formatDate(offer.offerExpiryDate)
                  : "-"}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Link href={`/offers/${offer.id}`} title="View">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {offer.status === "PENDING" && (
                    <Link href={`/offers/${offer.id}/edit`} title="Edit">
                      <Button size="sm" variant="secondary">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(offer.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useOffer, useUpdateOffer } from "@/hooks/useOffers";
import OfferDetails from "@/components/offers/OfferDetails";
import OfferForm from "@/components/offers/OfferForm";
import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function OfferDetailPage() {
  const params = useParams();
  const offerId = params.id as string;
  const [isEditing, setIsEditing] = useState(false);

  const { data: offer, isLoading, refetch } = useOffer(offerId);
  const { mutate: updateOffer, isPending: isUpdating } = useUpdateOffer();

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading offer...</div>
    );
  }

  if (!offer?.data) {
    return (
      <div className="text-center py-8 text-gray-500">Offer not found</div>
    );
  }

  const handleUpdate = (data: any) => {
    updateOffer(
      { id: offerId, data },
      {
        onSuccess: () => {
          toast.success("Offer updated successfully!");
          setIsEditing(false);
          refetch();
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message || "Failed to update offer",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title={`Offer - ${offer.data.position}`}
          description="Manage offer details"
        />
        {!isEditing && offer.data.status === "PENDING" && (
          <Button onClick={() => setIsEditing(true)}>Edit Offer</Button>
        )}
        {isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel Editing
          </Button>
        )}
      </div>

      {isEditing ? (
        <OfferForm
          initialData={offer.data}
          onSubmit={handleUpdate}
          isLoading={isUpdating}
        />
      ) : (
        <OfferDetails offer={offer.data} onRefresh={() => refetch()} />
      )}
    </div>
  );
}

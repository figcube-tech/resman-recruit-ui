"use client";

import { useRouter } from "next/navigation";
import OfferForm from "@/components/offers/OfferForm";
import { useCreateOffer } from "@/hooks/useOffers";
import PageHeader from "@/components/layout/PageHeader";
import toast from "react-hot-toast";

export default function NewOfferPage() {
  const router = useRouter();
  const { mutate: createOffer, isPending } = useCreateOffer();

  const handleSubmit = (data: any) => {
    createOffer(data, {
      onSuccess: () => {
        toast.success("Offer created successfully!");
        router.push("/offers");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to create offer");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Offer"
        description="Create a new job offer for a candidate"
      />
      <OfferForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}

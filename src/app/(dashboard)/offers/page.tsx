"use client";

import { useState } from "react";
import { OfferFilters } from "@/components/offers/OfferFilters";
import OfferList from "@/components/offers/OfferList";
import { useOffers } from "@/hooks/useOffers";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function OffersPage() {
  const [status, setStatus] = useState<
    "ALL" | "PENDING" | "ACCEPTED" | "REJECTED"
  >("ALL");
  const { data, isLoading, refetch } = useOffers({
    status: status === "ALL" ? undefined : (status as any),
  });

  const offers = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Offers"
          description="Manage job offers to candidates"
        />
        <Link href="/offers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Offer
          </Button>
        </Link>
      </div>

      <OfferFilters value={status} onChange={setStatus} />

      <OfferList
        offers={offers}
        isLoading={isLoading}
        onRefresh={() => refetch()}
      />
    </div>
  );
}

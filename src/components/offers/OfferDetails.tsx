"use client";

import { useState } from "react";
import { Offer } from "@/types/offer";
import { OfferStatusBadge } from "./OfferFilters";
import {
  useAcceptOffer,
  useRejectOffer,
  useUploadOfferLetter,
} from "@/hooks/useOffers";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Download, X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { rejectOfferSchema } from "@/lib/validations/offer";
import { formResolver } from "@/lib/validations/resolver";

interface OfferDetailsProps {
  offer: Offer;
  onRefresh?: () => void;
}

export default function OfferDetails({ offer, onRefresh }: OfferDetailsProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const { mutate: accept, isPending: isAccepting } = useAcceptOffer();
  const { mutate: reject, isPending: isRejecting } = useRejectOffer();
  const { mutate: uploadLetter, isPending: isUploading } =
    useUploadOfferLetter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: formResolver(rejectOfferSchema),
  });

  const handleAccept = () => {
    accept(offer.id, {
      onSuccess: () => {
        toast.success("Offer accepted!");
        onRefresh?.();
      },
      onError: (error) => {
        toast.error("Failed to accept offer");
      },
    });
  };

  const handleRejectSubmit = (data: any) => {
    reject(
      { id: offer.id, data },
      {
        onSuccess: () => {
          toast.success("Offer rejected");
          setShowRejectModal(false);
          reset();
          onRefresh?.();
        },
        onError: () => {
          toast.error("Failed to reject offer");
        },
      },
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    uploadLetter(
      { id: offer.id, file },
      {
        onSuccess: () => {
          toast.success("Offer letter uploaded!");
          setFileInput(null);
          onRefresh?.();
        },
        onError: () => {
          toast.error("Failed to upload letter");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {offer.position}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {offer.department || "No department"}
            </p>
          </div>
          <OfferStatusBadge status={offer.status} />
        </div>

        {/* Key Details */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Salary</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {formatCurrency(offer.salary)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Bonus</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {offer.bonus ? formatCurrency(offer.bonus) : "-"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Location</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {offer.location || "-"}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Offer Date</p>
            <p className="mt-1 text-gray-900">{formatDate(offer.offerDate)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Joining Date</p>
            <p className="mt-1 text-gray-900">
              {offer.joiningDate ? formatDate(offer.joiningDate) : "-"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Expiry Date</p>
            <p className="mt-1 text-gray-900">
              {offer.offerExpiryDate ? formatDate(offer.offerExpiryDate) : "-"}
            </p>
          </div>
        </div>

        {/* Benefits */}
        {offer.benefits && (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-600">Benefits</p>
            <p className="mt-1 text-gray-900">{offer.benefits}</p>
          </div>
        )}

        {/* Candidate Info */}
        {offer.application?.candidate && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-sm font-medium text-gray-600">Candidate</p>
            <p className="mt-1 text-gray-900">
              {offer.application.candidate.firstName}{" "}
              {offer.application.candidate.lastName}
            </p>
            <p className="text-sm text-gray-600">
              {offer.application.candidate.email}
            </p>
          </div>
        )}

        {/* Actions */}
        {offer.status === "PENDING" && (
          <div className="mt-6 flex gap-3 border-t border-gray-200 pt-6">
            <Button onClick={handleAccept} disabled={isAccepting}>
              Accept Offer
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowRejectModal(true)}
              disabled={isRejecting}
            >
              Reject Offer
            </Button>
          </div>
        )}

        {offer.status === "ACCEPTED" && offer.acceptedDate && (
          <div className="mt-6 rounded-lg bg-green-50 p-4">
            <p className="text-sm text-green-800">
              Offer accepted on{" "}
              <strong>{formatDate(offer.acceptedDate)}</strong>
            </p>
          </div>
        )}

        {offer.status === "REJECTED" && offer.rejectionReason && (
          <div className="mt-6 rounded-lg bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">Rejection Reason</p>
            <p className="mt-1 text-sm text-red-700">{offer.rejectionReason}</p>
          </div>
        )}
      </div>

      {/* Offer Letter */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Offer Letter
        </h3>
        {offer.offerLetterUrl ? (
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-700">Offer letter uploaded</p>
            <a
              href={offer.offerLetterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              No offer letter uploaded yet
            </p>
            <label className="mt-4 inline-block">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload PDF"}
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Offer"
      >
        <form onSubmit={handleSubmit(handleRejectSubmit)} className="space-y-4">
          <Input
            label="Rejection Reason"
            placeholder="Enter reason for rejection..."
            error={errors.rejectionReason?.message}
            {...register("rejectionReason")}
            required
          />
          <div className="flex gap-3">
            <Button type="submit" variant="danger" disabled={isRejecting}>
              {isRejecting ? "Rejecting..." : "Confirm Rejection"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

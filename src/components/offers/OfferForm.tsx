"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { formResolver } from "@/lib/validations/resolver";
import {
  createOfferSchema,
  CreateOfferFormValues,
} from "@/lib/validations/offer";
import { getErrorMessage } from "@/lib/api/errors";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Briefcase } from "lucide-react";
import { Offer } from "@/types/offer";

interface OfferFormProps {
  applicationId?: string;
  initialData?: Offer;
  onSuccess?: () => void;
  onCancel?: () => void;
  onSubmit?: (data: CreateOfferFormValues) => void;
  isLoading?: boolean;
}

export default function OfferForm({
  applicationId,
  initialData,
  onSuccess,
  onCancel,
  onSubmit: onSubmitProp,
  isLoading = false,
}: OfferFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOfferFormValues>({
    resolver: formResolver(createOfferSchema),
    defaultValues: initialData
      ? {
          position: initialData.position,
          salary: initialData.salary,
          department: initialData.department,
          bonus: initialData.bonus,
          location: initialData.location,
          benefits: initialData.benefits,
          joiningDate: initialData.joiningDate,
          offerExpiryDate: initialData.offerExpiryDate,
          applicationId: initialData.applicationId?.toString(),
        }
      : { applicationId },
  });

  const onSubmit = async (data: CreateOfferFormValues) => {
    if (onSubmitProp) {
      onSubmitProp(data);
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Offer" : "Create New Offer"}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Position */}
          <Input
            label="Position"
            placeholder="Senior Engineer"
            error={errors.position?.message}
            {...register("position")}
            required
          />

          {/* Salary */}
          <Input
            label="Salary"
            type="number"
            placeholder="150000"
            error={errors.salary?.message}
            {...register("salary")}
            required
          />

          {/* Department */}
          <Input
            label="Department"
            placeholder="Engineering"
            error={errors.department?.message}
            {...register("department")}
          />

          {/* Bonus */}
          <Input
            label="Bonus"
            type="number"
            placeholder="20000"
            error={errors.bonus?.message}
            {...register("bonus")}
          />

          {/* Location */}
          <Input
            label="Location"
            placeholder="Remote"
            error={errors.location?.message}
            {...register("location")}
          />

          {/* Joining Date */}
          <Input
            label="Joining Date"
            type="date"
            error={errors.joiningDate?.message}
            {...register("joiningDate")}
          />

          {/* Offer Expiry Date */}
          <Input
            label="Offer Expiry Date"
            type="date"
            error={errors.offerExpiryDate?.message}
            {...register("offerExpiryDate")}
          />
        </div>

        {/* Benefits */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Benefits
          </label>
          <textarea
            placeholder="Health Insurance, 401k, Remote Flexibility..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            {...register("benefits")}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
              ? "Update Offer"
              : "Create Offer"}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

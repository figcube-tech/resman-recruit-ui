import { z } from "zod";

export const createOfferSchema = z.object({
  applicationId: z.string().min(1, "Application is required"),
  position: z.string().min(2, "Position is required"),
  department: z.string().optional(),
  location: z.string().optional(),
  salary: z.coerce.number().min(0, "Salary must be positive"),
  bonus: z.coerce.number().min(0, "Bonus must be positive").optional(),
  benefits: z.string().optional(),
  joiningDate: z.string().optional(),
  offerExpiryDate: z.string().optional(),
});

export type CreateOfferFormValues = z.infer<typeof createOfferSchema>;

export const updateOfferSchema = z.object({
  position: z.string().min(2, "Position is required"),
  salary: z.coerce.number().min(0, "Salary must be positive"),
  bonus: z.coerce.number().min(0, "Bonus must be positive").optional(),
  benefits: z.string().optional(),
  joiningDate: z.string().optional(),
  offerExpiryDate: z.string().optional(),
});

export type UpdateOfferFormValues = z.infer<typeof updateOfferSchema>;

export const rejectOfferSchema = z.object({
  rejectionReason: z
    .string()
    .min(5, "Rejection reason must be at least 5 characters"),
});

export type RejectOfferFormValues = z.infer<typeof rejectOfferSchema>;

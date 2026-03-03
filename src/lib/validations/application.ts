import { z } from 'zod';

export const createApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job is required'),
  candidateId: z.string().min(1, 'Candidate is required'),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type CreateApplicationFormValues = z.infer<typeof createApplicationSchema>;

import { z } from 'zod';

export const createCandidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  currentTitle: z.string().optional(),
  currentCompany: z.string().optional(),
  experienceYears: z.coerce.number().min(0).max(50).optional(),
  skills: z.array(z.string()),
  resumeUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  source: z.enum(['website', 'referral', 'linkedin', 'job_board', 'agency', 'other'], {
    error: 'Source is required',
  }),
  notes: z.string().optional(),
  tags: z.array(z.string()),
});

export type CreateCandidateFormValues = z.infer<typeof createCandidateSchema>;

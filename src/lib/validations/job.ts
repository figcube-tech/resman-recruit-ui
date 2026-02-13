import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must not exceed 100 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  jobType: z.enum(['full_time', 'part_time', 'contract', 'internship', 'temporary'], {
    error: 'Job type is required',
  }),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive'], {
    error: 'Experience level is required',
  }),
  salaryMin: z.coerce.number().min(0, 'Minimum salary must be positive').optional(),
  salaryMax: z.coerce.number().min(0, 'Maximum salary must be positive').optional(),
  currency: z.string().optional(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is required'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
  benefits: z.array(z.string()),
  openPositions: z.coerce.number().min(1, 'At least 1 open position required'),
  applicationDeadline: z.string().optional(),
}).refine(
  (data) => {
    if (data.salaryMin && data.salaryMax) {
      return data.salaryMax >= data.salaryMin;
    }
    return true;
  },
  {
    message: 'Maximum salary must be greater than minimum salary',
    path: ['salaryMax'],
  }
);

export type CreateJobFormValues = z.infer<typeof createJobSchema>;

import { z } from 'zod';

export const createInterviewSchema = z.object({
  applicationId: z.string().min(1, 'Application is required'),
  interviewType: z.enum(['phone_screen', 'technical', 'behavioral', 'panel', 'final'], {
    error: 'Interview type is required',
  }),
  scheduledAt: z.string().min(1, 'Schedule date is required'),
  duration: z.coerce.number().min(15, 'Duration must be at least 15 minutes').max(480, 'Duration cannot exceed 8 hours'),
  location: z.string().optional(),
  meetingLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  interviewers: z.array(z.string()).min(1, 'At least one interviewer is required'),
  notes: z.string().optional(),
});

export const feedbackSchema = z.object({
  feedback: z.string().min(10, 'Feedback must be at least 10 characters'),
  rating: z.coerce.number().min(1).max(5),
});

export type CreateInterviewFormValues = z.infer<typeof createInterviewSchema>;
export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

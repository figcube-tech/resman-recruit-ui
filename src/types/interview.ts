export type InterviewType = 'phone_screen' | 'technical' | 'behavioral' | 'panel' | 'final';
export type InterviewStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';

export interface Interview {
  id: string;
  applicationId: string;
  interviewType: InterviewType;
  status: InterviewStatus;
  scheduledAt: string;
  duration: number; // minutes
  location?: string;
  meetingLink?: string;
  interviewers: string[];
  feedback?: string;
  rating?: number;
  notes?: string;
  application?: {
    id: string;
    job?: { id: string; title: string };
    candidate?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateInterviewDto {
  applicationId: string;
  interviewType: InterviewType;
  scheduledAt: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  interviewers: string[];
  notes?: string;
}

export interface UpdateInterviewDto {
  status?: InterviewStatus;
  scheduledAt?: string;
  duration?: number;
  location?: string;
  meetingLink?: string;
  interviewers?: string[];
  feedback?: string;
  rating?: number;
  notes?: string;
}

export interface InterviewFilters {
  status?: InterviewStatus;
  interviewType?: InterviewType;
  applicationId?: string;
  fromDate?: string;
  toDate?: string;
}

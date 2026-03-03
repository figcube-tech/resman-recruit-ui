export type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Offer {
  id: string;
  applicationId: string;
  offerDate: string;
  position: string;
  department?: string;
  location?: string;
  salary: number;
  bonus?: number;
  benefits?: string;
  joiningDate?: string;
  offerExpiryDate?: string;
  status: OfferStatus;
  offerLetterUrl?: string;
  acceptedDate?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  application?: {
    id: string;
    jobId: string;
    candidateId: string;
    job?: {
      id: string;
      title: string;
      department: string;
    };
    candidate?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export interface CreateOfferRequest {
  applicationId: string;
  position: string;
  department?: string;
  location?: string;
  salary: number;
  bonus?: number;
  benefits?: string;
  joiningDate?: string;
  offerExpiryDate?: string;
}

export interface UpdateOfferRequest {
  position?: string;
  salary?: number;
  bonus?: number;
  benefits?: string;
  joiningDate?: string;
  offerExpiryDate?: string;
}

export interface RejectOfferRequest {
  rejectionReason?: string;
}

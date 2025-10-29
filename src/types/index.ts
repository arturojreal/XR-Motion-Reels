export interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  socialUsername: string;
  reelUrl: string;
  status: 'pending' | 'accepted' | 'declined';
  submittedAt: string;
  order?: number;
}

export interface SubmissionFormData {
  firstName: string;
  lastName: string;
  socialUsername: string;
  reelUrl: string;
}

export interface SubmissionStore {
  submissions: Submission[];
  acceptedReels: Submission[];
  currentReelIndex: number;
  isAdminMode: boolean;
  isLoading: boolean;
  error: string | null;
  fetchSubmissions: () => Promise<void>;
  addSubmission: (data: SubmissionFormData) => Promise<void>;
  updateSubmissionStatus: (id: string, status: Submission['status']) => Promise<void>;
  reorderReels: (reels: Submission[]) => Promise<void>;
  nextReel: () => void;
  previousReel: () => void;
  toggleAdminMode: () => void;
}

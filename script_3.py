
# Generate TypeScript types

types_file = """// src/types/index.ts

export interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  socialUsername: string;
  reelUrl: string;
  status: 'pending' | 'accepted' | 'declined';
  order: number;
  submittedAt: string;
  thumbnail?: string;
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
  
  // Actions
  fetchSubmissions: () => Promise<void>;
  addSubmission: (data: SubmissionFormData) => Promise<void>;
  updateSubmissionStatus: (id: string, status: Submission['status']) => Promise<void>;
  reorderReels: (reorderedReels: Submission[]) => Promise<void>;
  setCurrentReelIndex: (index: number) => void;
  nextReel: () => void;
  previousReel: () => void;
  toggleAdminMode: () => void;
}

export type VideoProvider = 'youtube' | 'vimeo' | 'direct';

export interface ParsedVideoUrl {
  provider: VideoProvider;
  embedUrl: string;
  videoId?: string;
}
"""

print("Generated: src/types/index.ts")
print(types_file[:500] + "...")

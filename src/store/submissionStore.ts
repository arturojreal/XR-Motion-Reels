import { create } from 'zustand';
import { Submission, SubmissionFormData, SubmissionStore } from '@/types';

export const useSubmissionStore = create<SubmissionStore>((set, get) => ({
  submissions: [],
  acceptedReels: [],
  currentReelIndex: 0,
  isAdminMode: false,
  isLoading: false,
  error: null,

  fetchSubmissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/submissions');
      if (!response.ok) throw new Error('Failed to fetch submissions');
      
      const data = await response.json();
      const submissions = data.submissions || [];
      const acceptedReels = submissions
        .filter((s: Submission) => s.status === 'accepted')
        .sort((a: Submission, b: Submission) => (a.order || 0) - (b.order || 0));

      set({ submissions, acceptedReels, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addSubmission: async (data: SubmissionFormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');

      await get().fetchSubmissions();
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateSubmissionStatus: async (id: string, status: Submission['status']) => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) throw new Error('Failed to update');

      await get().fetchSubmissions();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  reorderReels: async (reels: Submission[]) => {
    const bulk = reels.map((reel, index) => ({
      id: reel.id,
      updates: { order: index },
    }));

    try {
      const response = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulk }),
      });

      if (!response.ok) throw new Error('Failed to reorder');

      set({ acceptedReels: reels });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  nextReel: () => {
    const { acceptedReels, currentReelIndex } = get();
    if (acceptedReels.length === 0) return;
    
    set({
      currentReelIndex: (currentReelIndex + 1) % acceptedReels.length,
    });
  },

  previousReel: () => {
    const { acceptedReels, currentReelIndex } = get();
    if (acceptedReels.length === 0) return;
    
    set({
      currentReelIndex:
        currentReelIndex === 0
          ? acceptedReels.length - 1
          : currentReelIndex - 1,
    });
  },

  toggleAdminMode: () => {
    set((state) => ({ isAdminMode: !state.isAdminMode }));
  },
}));

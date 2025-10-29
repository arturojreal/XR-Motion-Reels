
# Generate Zustand store

store_file = """// src/store/submissionStore.ts

import { create } from 'zustand';
import { SubmissionStore, SubmissionFormData, Submission } from '@/types';

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
        .sort((a: Submission, b: Submission) => a.order - b.order);

      set({
        submissions,
        acceptedReels,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
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

      if (!response.ok) throw new Error('Failed to add submission');
      
      await get().fetchSubmissions();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
      throw error;
    }
  },

  updateSubmissionStatus: async (id: string, status: Submission['status']) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) throw new Error('Failed to update submission');
      
      await get().fetchSubmissions();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  },

  reorderReels: async (reorderedReels: Submission[]) => {
    set({ isLoading: true, error: null });
    try {
      const updates = reorderedReels.map((reel, index) => ({
        id: reel.id,
        updates: { order: index },
      }));

      const response = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulk: updates }),
      });

      if (!response.ok) throw new Error('Failed to reorder reels');
      
      set({ acceptedReels: reorderedReels, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  },

  setCurrentReelIndex: (index: number) => {
    const { acceptedReels } = get();
    if (index >= 0 && index < acceptedReels.length) {
      set({ currentReelIndex: index });
    }
  },

  nextReel: () => {
    const { currentReelIndex, acceptedReels } = get();
    if (currentReelIndex < acceptedReels.length - 1) {
      set({ currentReelIndex: currentReelIndex + 1 });
    }
  },

  previousReel: () => {
    const { currentReelIndex } = get();
    if (currentReelIndex > 0) {
      set({ currentReelIndex: currentReelIndex - 1 });
    }
  },

  toggleAdminMode: () => {
    set((state) => ({ isAdminMode: !state.isAdminMode }));
  },
}));
"""

print("Generated: src/store/submissionStore.ts")
print("\nStore includes:")
print("- State management for submissions")
print("- API integration functions")
print("- Navigation controls")
print("- Admin mode toggle")

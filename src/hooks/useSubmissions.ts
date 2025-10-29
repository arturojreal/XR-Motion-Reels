import { useEffect } from 'react';
import { useSubmissionStore } from '@/store/submissionStore';

export function useSubmissions() {
  const { fetchSubmissions, isLoading, error } = useSubmissionStore();

  useEffect(() => {
    fetchSubmissions();

    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      fetchSubmissions();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchSubmissions]);

  return { isLoading, error };
}

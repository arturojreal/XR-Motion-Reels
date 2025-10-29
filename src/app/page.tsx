'use client';

import { useKeyPress } from '@/hooks/useKeyPress';
import { useTapDetection } from '@/hooks/useTapDetection';
import { useSubmissionStore } from '@/store/submissionStore';
import ProjectorView from '@/components/ProjectorView';
import AdminPanel from '@/components/AdminPanel';

export default function HomePage() {
  const { isAdminMode, toggleAdminMode } = useSubmissionStore();

  // Desktop: Press X to toggle admin mode
  useKeyPress('x', toggleAdminMode);

  // Mobile: Tap 10 times to toggle admin mode
  useTapDetection(10, toggleAdminMode);

  return (
    <>
      <ProjectorView />
      {isAdminMode && <AdminPanel />}
    </>
  );
}

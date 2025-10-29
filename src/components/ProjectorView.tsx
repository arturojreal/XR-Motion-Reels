'use client';

import { useEffect, useState } from 'react';
import { useSubmissionStore } from '@/store/submissionStore';
import { useKeyPress } from '@/hooks/useKeyPress';
import { formatDate } from '@/lib/utils';
import ReelPlayer from './ReelPlayer';
import QRCodeDisplay from './QRCodeDisplay';

export default function ProjectorView() {
  const {
    acceptedReels,
    currentReelIndex,
    nextReel,
    previousReel,
    fetchSubmissions,
    isAdminMode,
  } = useSubmissionStore();

  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchSubmissions]);

  useKeyPress('ArrowRight', nextReel, !isAdminMode);
  useKeyPress('ArrowLeft', previousReel, !isAdminMode);

  const [submissionUrl, setSubmissionUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSubmissionUrl(`${window.location.origin}/submit`);
    }
  }, []);

  const currentReel = acceptedReels[currentReelIndex];

  if (!currentReel) {
    return (
      <div className="h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">No Reels Available</h2>
          <p className="text-gray-400 mb-8">
            Scan the QR code below to submit your reel!
          </p>
          {submissionUrl && <QRCodeDisplay url={submissionUrl} size={200} />}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold">
          XR Motion Community Reel – {formatDate(new Date().toISOString())}
        </h1>
      </header>

      {/* Main Video Area */}
      <main className="flex-1 relative">
        <ReelPlayer reel={currentReel} onVideoEnd={nextReel} />

        {/* Navigation Indicators */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-2xl">
          {currentReelIndex > 0 && '←'}
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/60 text-2xl">
          {currentReelIndex < acceptedReels.length - 1 && '→'}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Creator Info */}
          <div>
            <h3 className="text-xl font-semibold">
              {currentReel.firstName} {currentReel.lastName}
            </h3>
            <p className="text-gray-400">{currentReel.socialUsername}</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-medium">Submit your reel!</p>
            <p className="text-sm text-gray-400">Scan to participate</p>
          </div>
          {submissionUrl && <QRCodeDisplay url={submissionUrl} />}
        </div>
      </footer>

      {/* Reel Counter */}
      <div className="absolute top-20 right-8 text-gray-400 text-sm">
        {currentReelIndex + 1} / {acceptedReels.length}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { Submission } from '@/types';
import { getVideoEmbedUrl } from '@/lib/utils';

interface ReelPlayerProps {
  reel: Submission;
  onVideoEnd?: () => void;
}

export default function ReelPlayer({ reel, onVideoEnd }: ReelPlayerProps) {
  const embedUrl = getVideoEmbedUrl(reel.reelUrl);
  const isDirect = embedUrl === reel.reelUrl && /\.(mp4|webm|ogg)$/i.test(embedUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle direct video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onVideoEnd) return;

    const handleEnded = () => {
      onVideoEnd();
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [onVideoEnd]);

  // For YouTube/Vimeo, we'll use a timer as a fallback
  // (detecting end events from iframes is complex due to CORS)
  useEffect(() => {
    if (isDirect || !onVideoEnd) return;

    // Auto-advance after 3 minutes for embedded videos
    // This is a reasonable default for most reels
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 180000); // 3 minutes

    return () => clearTimeout(timer);
  }, [isDirect, onVideoEnd, reel.id]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {isDirect ? (
        <video
          ref={videoRef}
          src={embedUrl}
          controls
          autoPlay
          muted
          className="max-w-full max-h-full"
          aria-label={`Video reel by ${reel.firstName} ${reel.lastName}`}
        >
          Your browser does not support video playback.
        </video>
      ) : (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`Video reel by ${reel.firstName} ${reel.lastName}`}
          aria-label={`Video reel by ${reel.firstName} ${reel.lastName}`}
        />
      )}
    </div>
  );
}

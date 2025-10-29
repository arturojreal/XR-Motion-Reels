'use client';

import { useEffect, useRef, useState } from 'react';
import { Submission } from '@/types';
import { getVideoEmbedUrl } from '@/lib/utils';

// Declare YouTube iframe API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface ReelPlayerProps {
  reel: Submission;
  onVideoEnd?: () => void;
}

export default function ReelPlayer({ reel, onVideoEnd }: ReelPlayerProps) {
  const embedUrl = getVideoEmbedUrl(reel.reelUrl);
  const isDirect = embedUrl === reel.reelUrl && /\.(mp4|webm|ogg)$/i.test(embedUrl);
  const isYouTube = embedUrl.includes('youtube.com/embed');
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [apiReady, setApiReady] = useState(false);

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

  // Load YouTube iframe API
  useEffect(() => {
    if (!isYouTube) return;

    // Load YouTube iframe API script
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else {
      setApiReady(true);
    }
  }, [isYouTube]);

  // Initialize YouTube player when API is ready
  useEffect(() => {
    if (!isYouTube || !apiReady || !iframeRef.current || !onVideoEnd) return;

    const iframe = iframeRef.current;
    const iframeId = `youtube-player-${reel.id}`;
    iframe.id = iframeId;

    try {
      playerRef.current = new window.YT.Player(iframeId, {
        events: {
          onStateChange: (event: any) => {
            // YT.PlayerState.ENDED = 0
            if (event.data === 0) {
              onVideoEnd();
            }
          },
        },
      });
    } catch (error) {
      console.log('YouTube player init error:', error);
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [isYouTube, apiReady, onVideoEnd, reel.id]);

  // For Vimeo, use a timer as fallback
  useEffect(() => {
    if (isDirect || isYouTube || !onVideoEnd) return;

    // Auto-advance after 3 minutes for Vimeo videos
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 180000); // 3 minutes

    return () => clearTimeout(timer);
  }, [isDirect, isYouTube, onVideoEnd, reel.id]);

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
          title={`Video reel by ${reel.firstName} ${reel.lastName}`}
          aria-label={`Video reel by ${reel.firstName} ${reel.lastName}`}
        />
      )}
    </div>
  );
}

'use client';

import { Submission } from '@/types';
import { getVideoEmbedUrl } from '@/lib/utils';

interface ReelPlayerProps {
  reel: Submission;
}

export default function ReelPlayer({ reel }: ReelPlayerProps) {
  const embedUrl = getVideoEmbedUrl(reel.reelUrl);
  const isDirect = embedUrl === reel.reelUrl && /\.(mp4|webm|ogg)$/i.test(embedUrl);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {isDirect ? (
        <video
          src={embedUrl}
          controls
          autoPlay
          loop
          muted
          className="max-w-full max-h-full"
          aria-label={`Video reel by ${reel.firstName} ${reel.lastName}`}
        >
          Your browser does not support video playback.
        </video>
      ) : (
        <iframe
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

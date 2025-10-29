
# Generate React components - Part 1: ReelPlayer

reel_player = """// src/components/ReelPlayer.tsx

'use client';

import { Submission } from '@/types';
import { parseVideoUrl } from '@/lib/utils';

interface ReelPlayerProps {
  reel: Submission;
}

export default function ReelPlayer({ reel }: ReelPlayerProps) {
  const { provider, embedUrl } = parseVideoUrl(reel.reelUrl);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {provider === 'direct' ? (
        <video
          src={embedUrl}
          controls
          autoPlay
          loop
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
"""

qr_code_display = """// src/components/QRCodeDisplay.tsx

'use client';

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

export default function QRCodeDisplay({ url, size = 120 }: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg">
      <QRCodeSVG
        value={url}
        size={size}
        level="H"
        includeMargin={true}
        aria-label="QR code for submission form"
      />
    </div>
  );
}
"""

print("Generated components (Part 1):")
print("- src/components/ReelPlayer.tsx")
print("- src/components/QRCodeDisplay.tsx")

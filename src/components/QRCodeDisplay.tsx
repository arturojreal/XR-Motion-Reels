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

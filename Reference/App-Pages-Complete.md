# Complete Next.js App Files

## Main Page (Projector View)

```tsx
// src/app/page.tsx

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
```

## Submission Page

```tsx
// src/app/submit/page.tsx

import SubmissionForm from '@/components/SubmissionForm';

export const metadata = {
  title: 'Submit Your Reel | XR Motion',
  description: 'Submit your reel to be featured at XR Motion meetups',
};

export default function SubmitPage() {
  return <SubmissionForm />;
}
```

## Root Layout

```tsx
// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'XR Motion Community Reel',
  description: 'Community reel showcase for XR Motion meetups',
  keywords: ['XR', 'VR', 'AR', 'Motion Design', 'Community'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

## Global Styles

```css
/* src/app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  background-color: var(--background);
  color: var(--foreground);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Animation classes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Focus visible for accessibility */
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

## Sample Data File

```json
// data/submissions.json

{
  "submissions": [
    {
      "id": "1698765432-abc123def",
      "firstName": "Sarah",
      "lastName": "Chen",
      "socialUsername": "@sarahchen_xr",
      "reelUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "status": "accepted",
      "order": 0,
      "submittedAt": "2025-10-20T14:30:00Z"
    },
    {
      "id": "1698765433-xyz789ghi",
      "firstName": "Marcus",
      "lastName": "Johnson",
      "socialUsername": "@marcus_creates",
      "reelUrl": "https://vimeo.com/123456789",
      "status": "accepted",
      "order": 1,
      "submittedAt": "2025-10-21T09:15:00Z"
    },
    {
      "id": "1698765434-lmn456opq",
      "firstName": "Elena",
      "lastName": "Rodriguez",
      "socialUsername": "@elena.vr",
      "reelUrl": "https://www.youtube.com/watch?v=abcdefghijk",
      "status": "pending",
      "order": 0,
      "submittedAt": "2025-10-28T16:45:00Z"
    }
  ]
}
```

## Installation Steps

1. Create project directory:
```bash
mkdir xr-motion-reel
cd xr-motion-reel
```

2. Copy all files to their respective locations

3. Install dependencies:
```bash
npm install
```

4. Create data directory:
```bash
mkdir data
```

5. Add sample data to `data/submissions.json`

6. Run development server:
```bash
npm run dev
```

7. Open browser to http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
npm run build
# Deploy .next folder
```

## Key Features Summary

✅ Projector display with arrow key navigation
✅ Mobile submission form via QR code
✅ Hidden admin panel (X key or 10 taps)
✅ Drag-and-drop reel ordering
✅ Accept/decline submission workflow
✅ Real-time data updates
✅ Dark mode aesthetic
✅ Fully responsive design
✅ TypeScript type safety
✅ Accessible ARIA labels
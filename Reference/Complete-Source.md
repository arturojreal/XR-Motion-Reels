# XR Motion Community Reel - Complete Source Code Package

## Quick Start

```bash
# 1. Create project
mkdir xr-motion-reel && cd xr-motion-reel

# 2. Install dependencies
npm init -y
npm install next@latest react@latest react-dom@latest zustand qrcode.react clsx date-fns
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer eslint eslint-config-next prettier

# 3. Setup TypeScript and Tailwind
npx tsc --init
npx tailwindcss init -p

# 4. Create directory structure
mkdir -p src/{app/{api/submissions,submit},components,lib,types,hooks,store} data public

# 5. Copy all files from this package to respective directories

# 6. Run development server
npm run dev
```

## Complete File Listing

### Configuration Files (Root Directory)

#### package.json
```json
{
  "name": "xr-motion-reel",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zustand": "^4.5.0",
    "qrcode.react": "^3.1.0",
    "clsx": "^2.1.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
        primary: '#3b82f6',
        secondary: '#6366f1',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com', 'i.vimeocdn.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;
```

#### .eslintrc.json
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

#### .prettierrc
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Architecture Overview

### Data Flow

```
User Submission (Mobile)
    ↓
POST /api/submissions
    ↓
submissions.json (Database)
    ↓
GET /api/submissions
    ↓
Zustand Store
    ↓
ProjectorView Component (Display)

Admin Actions
    ↓
PATCH /api/submissions
    ↓
Update submissions.json
    ↓
Re-fetch and update store
```

### State Management (Zustand)

```
submissionStore
├── submissions []        # All submissions
├── acceptedReels []      # Filtered accepted reels
├── currentReelIndex      # Current display index
├── isAdminMode           # Admin panel visibility
├── isLoading             # Loading state
├── error                 # Error messages
└── Actions
    ├── fetchSubmissions()
    ├── addSubmission()
    ├── updateSubmissionStatus()
    ├── reorderReels()
    ├── nextReel()
    ├── previousReel()
    └── toggleAdminMode()
```

### Component Hierarchy

```
App (page.tsx)
├── ProjectorView
│   ├── Header (Title + Date)
│   ├── ReelPlayer
│   │   └── iframe/video element
│   └── Footer
│       ├── Creator Info
│       └── QRCodeDisplay
└── AdminPanel (conditional)
    ├── Pending Submissions
    │   └── SubmissionCard[]
    │       └── Accept/Decline buttons
    └── Accepted Reels
        └── DraggableReelCard[]
            └── Reorder handles

Submit Page (submit/page.tsx)
└── SubmissionForm
    ├── Input fields
    ├── Validation
    └── Submit button
```

## Key Features Implementation

### 1. Keyboard Navigation
- Uses `useKeyPress` custom hook
- Arrow keys: Navigate reels
- X key: Toggle admin mode
- Only active when admin panel closed

### 2. Mobile Gesture Detection
- Uses `useTapDetection` custom hook
- Counts rapid taps within 2-second window
- 10 taps triggers admin mode
- Works on touch devices

### 3. Drag-and-Drop Sorting
- Native HTML5 drag-and-drop API
- Visual feedback during drag
- Automatic order updates
- Persists to database immediately

### 4. Video URL Parsing
- Regex patterns for YouTube/Vimeo
- Extracts video IDs
- Converts to embed URLs
- Supports direct video files

### 5. QR Code Generation
- Uses qrcode.react library
- High error correction level
- Customizable size
- Points to /submit route

### 6. Real-time Updates
- Polls API every 30 seconds
- Updates accepted reels list
- Maintains current playback position
- No page refresh needed

## Security Best Practices

1. **Input Validation**
   - All form fields required
   - URL format validation
   - Sanitize user inputs

2. **API Protection**
   - Validate request bodies
   - Check content types
   - Handle errors gracefully

3. **XSS Prevention**
   - React auto-escapes content
   - No dangerouslySetInnerHTML
   - Safe URL parsing

4. **CORS Configuration**
   - Restrict allowed domains
   - Validate origins
   - Use secure headers

## Performance Optimization

1. **Code Splitting**
   - Next.js automatic splitting
   - Lazy load components
   - Dynamic imports where needed

2. **Caching Strategy**
   - Static assets cached
   - API responses cached (30s)
   - Browser caching enabled

3. **Bundle Size**
   - Minimal dependencies
   - Tree-shaking enabled
   - No unnecessary imports

## Testing Recommendations

### Unit Tests (Jest + React Testing Library)
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

Test coverage should include:
- Component rendering
- User interactions
- API endpoint responses
- Store state updates
- Custom hooks behavior

### E2E Tests (Playwright)
```bash
npm install -D @playwright/test
```

Test scenarios:
- Complete submission workflow
- Admin accept/decline flow
- Drag-and-drop reordering
- Keyboard navigation
- Mobile gesture detection

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test in production mode locally
- [ ] Set environment variables
- [ ] Configure custom domain
- [ ] Enable HTTPS
- [ ] Setup error monitoring (Sentry)
- [ ] Configure analytics (optional)
- [ ] Test on multiple devices
- [ ] Verify QR code works
- [ ] Load test API endpoints

## Maintenance Tips

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Test after updates

2. **Data Backup**
   - Backup submissions.json regularly
   - Consider automated backups
   - Export to CSV periodically

3. **Monitoring**
   - Check error logs
   - Monitor API response times
   - Track submission volumes

4. **Optimization**
   - Review bundle size quarterly
   - Optimize images/videos
   - Profile performance

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Videos won't play | Check URL format, verify CORS |
| Admin mode won't activate | Clear browser cache, check console |
| Submissions not saving | Verify file permissions on data/ |
| QR code not scanning | Increase size, improve lighting |
| Drag-and-drop not working | Check browser compatibility |
| Styling broken | Rebuild Tailwind, clear cache |

## Future Enhancement Ideas

1. **Database Migration**
   - Move from JSON to PostgreSQL/SQLite
   - Add migration scripts
   - Improve query performance

2. **Authentication**
   - Add admin login
   - OAuth integration
   - Role-based access control

3. **Real-time Features**
   - WebSocket for live updates
   - Live voting system
   - Chat integration

4. **Analytics Dashboard**
   - Submission statistics
   - Popular reels tracking
   - Attendee engagement metrics

5. **Multi-Event Support**
   - Event management
   - Separate reel collections
   - Historical archives

## Credits & License

**Built for**: XR Motion Community
**Framework**: Next.js 15
**License**: MIT
**Maintainer**: Community contributors

For support, visit the XR Motion community channels.
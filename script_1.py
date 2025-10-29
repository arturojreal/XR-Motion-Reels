
import json

# Generate all project files as structured data
files = {}

# 1. README.md
files['README.md'] = """# XR Motion Community Reel

A modern web application for showcasing community reels during XR Motion meetups with integrated submission management.

## Features

- 🎬 **Projector View**: Full-screen reel display with keyboard navigation
- 📱 **Mobile Submission**: QR code-based submission form
- 🔐 **Hidden Admin Panel**: Gesture-activated submission management
- ✨ **Drag & Drop Sorting**: Reorder accepted reels
- 🌙 **Dark Mode**: Beautiful minimal aesthetic
- ⚡ **Real-time Updates**: Instant submission handling

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Storage**: File-based JSON (easy SQLite upgrade)
- **QR Codes**: qrcode.react

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd xr-motion-reel

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

### Projector View (Main Page)

1. Navigate to the homepage - displays accepted reels
2. Use **Left/Right arrow keys** to navigate between reels
3. QR code displayed in bottom-left for submissions
4. Press **X key** to activate admin mode (desktop)

### Mobile Submission

1. Scan QR code with mobile device
2. Fill out submission form (name, username, reel URL)
3. Submit and receive confirmation

### Admin Panel

- **Desktop**: Press **X** key
- **Mobile**: Tap screen **10 times** rapidly
- **Features**:
  - View all submissions
  - Accept/Decline reels
  - Drag to reorder accepted reels
  - Changes save automatically

## Deployment

### Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify

\`\`\`bash
npm run build
# Deploy the .next folder
\`\`\`

### Docker

\`\`\`bash
docker build -t xr-motion-reel .
docker run -p 3000:3000 xr-motion-reel
\`\`\`

## Project Structure

\`\`\`
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and database logic
├── store/           # Zustand state management
└── types/           # TypeScript type definitions
\`\`\`

## Configuration

Edit \`data/submissions.json\` to seed initial data.

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- WCAG 2.1 AA compliant

## License

MIT

## Support

For issues and questions, contact the XR Motion community organizers.
"""

# 2. package.json
files['package.json'] = """{
  "name": "xr-motion-reel",
  "version": "1.0.0",
  "private": true,
  "description": "XR Motion Community Reel submission and display system",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \\"src/**/*.{ts,tsx,css}\\"",
    "type-check": "tsc --noEmit"
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
"""

# 3. tsconfig.json
files['tsconfig.json'] = """{
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
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"""

print("Generated configuration files:")
print("- README.md")
print("- package.json")
print("- tsconfig.json")

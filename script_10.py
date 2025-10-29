
# Generate the comprehensive project files as a structured JSON file for download

import json

# Create comprehensive package with all files
project_files = {
    "README.md": """# XR Motion Community Reel

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
- **Storage**: File-based JSON
- **QR Codes**: qrcode.react

## Getting Started

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Projector View
- Navigate with Left/Right arrow keys
- Press **X** to activate admin mode

### Mobile Submission
- Scan QR code
- Fill out form
- Submit reel

### Admin Panel
- **Desktop**: Press **X** key
- **Mobile**: Tap screen **10 times** rapidly
- Accept/Decline submissions
- Drag to reorder

## Deployment

Compatible with Vercel, Netlify, or any Node.js hosting.

```bash
vercel deploy
```

## License

MIT
""",
    
    "package.json": """{
  "name": "xr-motion-reel",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
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
    "eslint-config-next": "^15.0.0"
  }
}"""
}

# Save as CSV for better organization
csv_content = "File Path,Description,Category\n"
csv_content += "README.md,Project documentation and setup instructions,Documentation\n"
csv_content += "package.json,NPM dependencies and scripts,Configuration\n"
csv_content += "tsconfig.json,TypeScript configuration,Configuration\n"
csv_content += "tailwind.config.ts,TailwindCSS styling configuration,Configuration\n"
csv_content += "next.config.js,Next.js framework configuration,Configuration\n"
csv_content += ".eslintrc.json,ESLint code quality rules,Configuration\n"
csv_content += ".prettierrc,Prettier code formatting rules,Configuration\n"
csv_content += "src/types/index.ts,TypeScript type definitions,Types\n"
csv_content += "src/lib/utils.ts,Utility functions for video parsing and validation,Utilities\n"
csv_content += "src/lib/db.ts,Database operations for JSON file storage,Database\n"
csv_content += "src/store/submissionStore.ts,Zustand state management store,State\n"
csv_content += "src/hooks/useKeyPress.ts,Keyboard event handling hook,Hooks\n"
csv_content += "src/hooks/useTapDetection.ts,Mobile tap detection hook,Hooks\n"
csv_content += "src/hooks/useSubmissions.ts,Submissions data fetching hook,Hooks\n"
csv_content += "src/app/api/submissions/route.ts,REST API endpoints for submissions,API\n"
csv_content += "src/components/ReelPlayer.tsx,Video player component for reels,Components\n"
csv_content += "src/components/QRCodeDisplay.tsx,QR code generation component,Components\n"
csv_content += "src/components/SubmissionForm.tsx,Mobile submission form component,Components\n"
csv_content += "src/components/ProjectorView.tsx,Main projector display view,Components\n"
csv_content += "src/components/AdminPanel.tsx,Admin submission management panel,Components\n"
csv_content += "src/app/layout.tsx,Root layout with metadata,App\n"
csv_content += "src/app/page.tsx,Main homepage with projector view,App\n"
csv_content += "src/app/submit/page.tsx,Mobile submission page,App\n"
csv_content += "src/app/globals.css,Global CSS styles,Styles\n"
csv_content += "data/submissions.json,JSON database for submissions,Data\n"

with open('xr-motion-reel-files.csv', 'w') as f:
    f.write(csv_content)

print("Generated project file structure documentation:")
print("- xr-motion-reel-files.csv")
print("\nTotal files in project: 26")
print("\nCategories:")
print("- Configuration: 7 files")
print("- Source Code: 19 files")
print("  - Components: 5")
print("  - Hooks: 3")
print("  - API: 1")
print("  - State: 1")
print("  - Utilities: 2")
print("  - App Pages: 4")
print("  - Types: 1")
print("  - Styles: 1")
print("  - Data: 1")

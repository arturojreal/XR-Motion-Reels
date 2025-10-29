# XR Motion Community Reel

A modern web application for showcasing community reels during XR Motion meetups with integrated submission management.

## Features

- 🎬 **Projector View**: Full-screen reel display with keyboard navigation
- 📱 **Mobile Submission**: QR code-based submission form
- 🔐 **Hidden Admin Panel**: Gesture-activated submission management (Press X or tap 10x)
- ✨ **Drag & Drop Sorting**: Reorder accepted reels
- ➕ **Manual Add**: Add reels directly from admin panel
- 🌙 **Dark Mode**: Beautiful minimal aesthetic
- ⚡ **Real-time Updates**: Instant submission handling

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Storage**: File-based JSON (easy database upgrade)
- **QR Codes**: qrcode.react

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-username]/XR-Motion-Reels.git
cd XR-Motion-Reels

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Projector View (Main Page)

1. Navigate to the homepage - displays accepted reels
2. Use **Left/Right arrow keys** to navigate between reels
3. QR code displayed for mobile submissions
4. Press **X key** to activate admin mode (desktop)
5. **Tap 10 times** rapidly to activate admin mode (mobile)

### Mobile Submission

1. Scan QR code with mobile device
2. Fill out submission form (name, username, reel URL)
3. Submit and receive confirmation
4. Wait for admin approval

### Admin Panel

- **Desktop**: Press **X** key
- **Mobile**: Tap screen **10 times** rapidly
- **Features**:
  - View all pending submissions
  - Accept/Decline reels
  - Manually add reels with "+ Add Reel Manually" button
  - Drag to reorder accepted reels
  - Changes save automatically

### Supported Video Formats

- **YouTube**: Full URLs or shortened youtu.be links
- **Vimeo**: Standard vimeo.com URLs
- **Direct**: .mp4, .webm, .ogg files

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com)

### Other Platforms

Compatible with Railway, Render, or any Node.js hosting platform.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and database logic
├── store/           # Zustand state management
└── types/           # TypeScript type definitions
```

## Configuration

Edit `data/submissions.json` to seed initial data or manage submissions manually.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Right Arrow | Next reel |
| Left Arrow | Previous reel |
| X | Toggle admin mode |
| F11 | Full screen (browser) |

## Mobile Gestures

| Gesture | Action |
|---------|--------|
| Tap 10x | Toggle admin mode |

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- WCAG 2.1 AA compliant

## License

MIT

## Support

For issues and questions, contact the XR Motion community organizers.

## Credits

Built for the XR Motion community
Developed with Next.js, React, and TailwindCSS

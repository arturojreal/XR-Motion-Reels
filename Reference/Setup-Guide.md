# XR Motion Community Reel - Complete Setup Guide

## Project Overview

A full-stack Next.js 15 application for showcasing community video reels at XR Motion meetups with:
- Public projector display mode
- QR code-based mobile submission form
- Hidden gesture-activated admin panel
- Drag-and-drop reel management

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.0+ | React framework with App Router |
| React | 19.0+ | UI library |
| TypeScript | 5.3+ | Type safety |
| TailwindCSS | 3.4+ | Styling |
| Zustand | 4.5+ | State management |
| qrcode.react | 3.1+ | QR code generation |

## Project Structure

```
xr-motion-reel/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .eslintrc.json
├── .prettierrc
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Main projector view
│   │   ├── submit/
│   │   │   └── page.tsx            # Mobile submission form
│   │   ├── api/
│   │   │   └── submissions/
│   │   │       └── route.ts        # REST API endpoints
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── ProjectorView.tsx       # Main display component
│   │   ├── AdminPanel.tsx          # Admin management UI
│   │   ├── SubmissionForm.tsx      # Mobile form
│   │   ├── ReelPlayer.tsx          # Video player wrapper
│   │   └── QRCodeDisplay.tsx       # QR code generator
│   ├── lib/
│   │   ├── db.ts                   # Database operations
│   │   └── utils.ts                # Helper functions
│   ├── types/
│   │   └── index.ts                # TypeScript definitions
│   ├── hooks/
│   │   ├── useKeyPress.ts          # Keyboard shortcuts
│   │   ├── useTapDetection.ts      # Mobile gesture detection
│   │   └── useSubmissions.ts       # Data fetching
│   └── store/
│       └── submissionStore.ts      # Zustand store
└── data/
    └── submissions.json             # JSON database
```

## Installation Steps

### 1. Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm

### 2. Clone and Setup
```bash
# Create project directory
mkdir xr-motion-reel
cd xr-motion-reel

# Initialize Next.js project
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Or manually create structure
npm init -y
```

### 3. Install Dependencies
```bash
npm install next@latest react@latest react-dom@latest
npm install zustand qrcode.react clsx date-fns
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint eslint-config-next prettier
```

### 4. Copy Files
Copy all provided source files to their respective locations following the directory structure above.

### 5. Create Data Directory
```bash
mkdir -p data
```

### 6. Add Sample Data
Create `data/submissions.json` with:
```json
{
  "submissions": []
}
```

### 7. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Usage Guide

### For Organizers (Projector Setup)

1. **Open projector display**: Navigate to homepage
2. **Connect to projector**: Full-screen the browser (F11)
3. **Navigate reels**: Use Left/Right arrow keys
4. **Access admin mode**: Press X key (or tap 10x on mobile)
5. **Manage submissions**: Accept/decline and reorder reels
6. **Exit admin mode**: Click "Close" button

### For Attendees (Submitting Reels)

1. **Scan QR code** displayed on projector
2. **Fill out form**:
   - First name
   - Last name
   - Social username (e.g., @username)
   - Reel URL (YouTube, Vimeo, or direct MP4)
3. **Submit** and receive confirmation
4. **Wait for approval** from organizers

### Supported Video Formats

- **YouTube**: Full URLs or shortened youtu.be links
- **Vimeo**: Standard vimeo.com URLs
- **Direct**: .mp4, .webm, .ogg files

## API Endpoints

### GET /api/submissions
Fetch all submissions
```bash
curl http://localhost:3000/api/submissions
```

### POST /api/submissions
Create new submission
```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "socialUsername": "@johndoe",
    "reelUrl": "https://youtube.com/watch?v=..."
  }'
```

### PATCH /api/submissions
Update submission status
```bash
curl -X PATCH http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "id": "submission-id",
    "status": "accepted"
  }'
```

Bulk reorder (for drag-and-drop)
```bash
curl -X PATCH http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "bulk": [
      {"id": "id1", "updates": {"order": 0}},
      {"id": "id2", "updates": {"order": 1}}
    ]
  }'
```

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

## Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

### Netlify Deployment
```bash
npm run build
# Deploy the .next folder via Netlify dashboard
```

### Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t xr-motion-reel .
docker run -p 3000:3000 xr-motion-reel
```

## Environment Variables (Optional)

Create `.env.local` for custom configuration:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_QR_SIZE=120
```

## Troubleshooting

### Issue: Submissions not appearing
- Check `data/submissions.json` exists
- Verify file permissions
- Check browser console for errors

### Issue: Videos not playing
- Verify URL format is correct
- Check CORS settings for direct video URLs
- Test URL in browser separately

### Issue: Admin mode not activating
- Ensure X key is being pressed (not Shift+X)
- On mobile, tap rapidly in succession
- Check browser console for hook errors

## Future Enhancements

- [ ] SQLite database integration
- [ ] User authentication
- [ ] Real-time updates via WebSockets
- [ ] Video upload hosting
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Multi-event support
- [ ] Dark/light theme toggle

## Performance Optimization

- Videos are lazy-loaded
- Submissions refresh every 30 seconds
- Drag-and-drop uses native browser APIs
- Minimal re-renders with Zustand

## Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation throughout
- Screen reader friendly
- High contrast design
- Focus visible indicators
- Semantic HTML structure

## Security Considerations

- Input validation on all forms
- URL sanitization
- No inline scripts
- CORS configured properly
- Rate limiting recommended for production

## License

MIT License - Free to use and modify

## Support

For issues or questions:
- Check documentation
- Review error logs
- Contact XR Motion organizers

## Credits

Built for the XR Motion community
Developed with Next.js, React, and TailwindCSS
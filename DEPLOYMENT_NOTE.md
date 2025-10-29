# Important: Database Storage on Vercel

## Current Issue
Vercel's serverless functions have a **read-only file system**. The current JSON file-based database won't persist data between deployments or function invocations.

## Quick Solutions

### Option 1: Vercel Postgres (Recommended for Production)
```bash
# Install Vercel Postgres
npm install @vercel/postgres

# Set up in Vercel Dashboard:
# 1. Go to your project on vercel.com
# 2. Storage → Create Database → Postgres
# 3. Connect to your project
```

### Option 2: Vercel KV (Redis) - Fastest Setup
```bash
# Install Vercel KV
npm install @vercel/kv

# Set up in Vercel Dashboard:
# 1. Go to your project on vercel.com
# 2. Storage → Create Database → KV
# 3. Connect to your project
```

### Option 3: Use Existing Submission Data
The app currently reads from the initial `data/submissions.json` file, but **new submissions won't persist** on Vercel.

## Temporary Workaround
For testing, you can:
1. Add submissions locally
2. Commit the updated `data/submissions.json` 
3. Push to GitHub
4. Vercel will redeploy with the new data

## For Your Meetup
Since you need this working now, I recommend:
- **Use the manual add feature** in the admin panel before the event
- Add all reels you want to display
- Commit and push to GitHub
- The reels will be available for the projector view

The submission form will work, but submissions won't persist on Vercel without a proper database.

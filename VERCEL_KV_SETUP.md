# Vercel KV Setup Instructions

## Step 1: Create KV Database in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Navigate to your project: **xrmotionreels**
3. Click on the **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis-compatible key-value store)
6. Choose a name (e.g., "xr-motion-kv")
7. Select the region closest to your users
8. Click **Create**

## Step 2: Connect to Your Project

1. After creating the database, click **Connect to Project**
2. Select your **xrmotionreels** project
3. Vercel will automatically add the environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

## Step 3: Redeploy

The next deployment will automatically use the KV database. You can either:

**Option A: Automatic (recommended)**
- Just push to GitHub: `git push`
- Vercel will auto-deploy with KV enabled

**Option B: Manual**
- Run: `vercel --prod`

## Step 4: Initialize Data (Optional)

The app will automatically try to initialize KV with data from `data/submissions.json` on first run.

If you want to manually add your existing submission:
1. Visit: https://xrmotionreels.vercel.app
2. Press **X** to open admin panel
3. Click **"+ Add Reel Manually"**
4. Add your reel (Arturo J. Real's YouTube video)

## Local Development with KV

1. Copy `.env.example` to `.env.local`
2. Get your KV credentials from Vercel Dashboard → Storage → Your KV → .env.local tab
3. Paste the credentials into `.env.local`
4. Run `npm run dev`

## Verify It's Working

After setup:
1. Visit https://xrmotionreels.vercel.app/submit
2. Submit a test reel
3. Press **X** to open admin panel
4. You should see your submission in "Pending Submissions"
5. Accept it and it will appear in the projector view
6. **Refresh the page** - the submission should still be there (persisted!)

## Pricing

Vercel KV Free Tier:
- ✅ 256 MB storage
- ✅ 3,000 commands per day
- ✅ Perfect for your meetup use case

## Troubleshooting

**Error: KV credentials not found**
- Make sure you connected the KV database to your project in Vercel Dashboard
- Redeploy after connecting

**Submissions not persisting**
- Check Vercel Dashboard → Deployments → Latest → Function Logs
- Look for KV connection errors

**Need help?**
- Vercel KV Docs: https://vercel.com/docs/storage/vercel-kv

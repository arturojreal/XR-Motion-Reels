# Updated Setup Instructions (2025)

## ⚠️ Important Change
Vercel has moved KV storage to the **Marketplace**. It now uses external Redis providers (like Upstash) instead of native Vercel KV.

## 🚀 New Setup Process (5 minutes)

### Option A: Via Vercel Marketplace (Recommended)

1. **Go to Your Project Dashboard**
   - Visit: https://vercel.com/arturojreals-projects/xrmotionreels

2. **Open Marketplace**
   - Click **Marketplace** tab (or go to https://vercel.com/marketplace)
   - Search for "**Redis**" or "**Upstash**"

3. **Install Upstash Redis Integration**
   - Click on **Upstash** (or another Redis provider)
   - Click **Add Integration**
   - Select your project: **xrmotionreels**
   - Click **Install**
   - Follow the prompts to create a Redis database

4. **Connect to Project**
   - The integration will automatically add environment variables:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

5. **Redeploy**
   - Vercel will automatically redeploy
   - Or manually: `vercel --prod`

---

### Option B: Direct Upstash Setup (Alternative)

If you prefer to set up Upstash directly:

1. **Create Upstash Account**
   - Go to: https://console.upstash.com
   - Sign up (free, no credit card required)

2. **Create Redis Database**
   - Click **Create Database**
   - Name it: `xr-motion-redis`
   - Select region closest to your users (e.g., US East)
   - Type: **Regional** (free tier)
   - Click **Create**

3. **Get REST API Credentials**
   - Click on your database
   - Go to **REST API** tab
   - Copy the credentials:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`

4. **Add to Vercel**
   - Go to: https://vercel.com/arturojreals-projects/xrmotionreels/settings/environment-variables
   - Add these variables:
     - `KV_REST_API_URL` = Your Upstash REST URL
     - `KV_REST_API_TOKEN` = Your Upstash REST Token
     - `KV_REST_API_READ_ONLY_TOKEN` = Your Upstash REST Token (same)
   - Save

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## ✅ Verify It's Working

1. Visit: https://xrmotionreels.vercel.app/submit
2. Submit a test reel
3. Press **X** to open admin panel
4. Your submission should appear in "Pending Submissions"
5. Accept it
6. **Refresh the page** - it should still be there!

---

## 💰 Pricing (100% Free)

**Upstash Free Tier:**
- ✅ 10,000 commands/day
- ✅ 256 MB storage
- ✅ No credit card required
- ✅ Perfect for your meetup!

---

## 🆘 Troubleshooting

**"Cannot connect to Redis"**
- Check that environment variables are set in Vercel Dashboard
- Make sure you redeployed after adding variables

**"KV credentials not found"**
- Verify variable names are exactly:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
  - `KV_REST_API_READ_ONLY_TOKEN`

**Still having issues?**
- Check Vercel deployment logs: https://vercel.com/arturojreals-projects/xrmotionreels/deployments
- Look for Redis connection errors

---

## 📖 Resources

- Vercel Marketplace: https://vercel.com/marketplace?category=storage&search=redis
- Upstash Console: https://console.upstash.com
- Upstash Docs: https://upstash.com/docs/redis/overall/getstarted

---

## Quick Start Command

If you want to test locally first:

1. Get Upstash credentials
2. Create `.env.local`:
   ```bash
   KV_REST_API_URL=your_upstash_url
   KV_REST_API_TOKEN=your_upstash_token
   KV_REST_API_READ_ONLY_TOKEN=your_upstash_token
   ```
3. Run: `npm run dev`
4. Test at: http://localhost:3000

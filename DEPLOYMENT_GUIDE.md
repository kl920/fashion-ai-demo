# 🚀 Deployment Guide

Complete guide to deploying Fashion AI Studio to production.

## Quick Deploy Checklist

- [ ] Get Replicate API token
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel
- [ ] Test end-to-end functionality
- [ ] Set up monitoring (optional)

## Prerequisites

1. **Accounts Needed**:
   - [Replicate](https://replicate.com) - AI API (required)
   - [Railway](https://railway.app) or [Render](https://render.com) - Backend hosting
   - [Vercel](https://vercel.com) - Frontend hosting
   - [GitHub](https://github.com) - Code repository

2. **Local Setup**:
   - Git installed
   - Project pushed to GitHub repository

## Part 1: Get API Keys

### Replicate API Token

1. Go to [replicate.com](https://replicate.com)
2. Sign up / Log in
3. Navigate to Account → API Tokens
4. Click "Create Token"
5. Copy token (starts with `r8_...`)
6. **Keep this secure** - you'll need it for backend deployment

**Cost Info**: Pay-as-you-go, ~$0.02-0.10 per image generation

## Part 2: Deploy Backend

### Option A: Railway (Recommended)

**Step 1: Create Project**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Authorize Railway to access your repositories
6. Select your `fashion-ai-demo` repository

**Step 2: Configure Backend Service**
1. Railway will detect the project
2. Click "Add variables" → "New Variable"
3. Add:
   - Key: `REPLICATE_API_TOKEN`
   - Value: Your token from Replicate
4. In Settings:
   - Root Directory: `/backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Step 3: Deploy**
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Once deployed, copy your backend URL
   - Format: `https://your-project.up.railway.app`

**Step 4: Test Backend**
```bash
curl https://your-backend-url.railway.app/
# Should return: {"status":"healthy",...}
```

### Option B: Render

**Step 1: Create Web Service**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - Name: `fashion-ai-backend`
   - Root Directory: `backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Step 2: Add Environment Variables**
1. Scroll to "Environment Variables"
2. Add:
   - Key: `REPLICATE_API_TOKEN`
   - Value: Your Replicate token
3. Click "Create Web Service"

**Step 3: Wait for Deploy**
- First deploy takes 5-10 minutes
- Copy your URL: `https://fashion-ai-backend.onrender.com`

**Step 4: Test**
```bash
curl https://your-backend.onrender.com/
```

### Backend Deployment Tips

**Free Tier Limitations**:
- Railway: $5 free credit/month
- Render: 750 hours/month free
- Services sleep after inactivity (15-30 min wake-up)

**For Production**:
- Upgrade to paid plan for always-on service
- Add custom domain
- Enable SSL/HTTPS
- Set up monitoring

## Part 3: Deploy Frontend

### Vercel (Recommended)

**Step 1: Import Project**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your `fashion-ai-demo` repository

**Step 2: Configure Build Settings**
1. Framework Preset: `Next.js`
2. Root Directory: `frontend`
3. Build Command: `npm run build` (auto-detected)
4. Output Directory: `.next` (auto-detected)

**Step 3: Add Environment Variables**
1. Expand "Environment Variables"
2. Add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your backend URL (e.g., `https://your-project.up.railway.app`)
   - **Important**: Select "Production", "Preview", and "Development"
3. Click "Deploy"

**Step 4: Deploy**
1. Vercel will build and deploy (2-3 minutes)
2. Get your deployed URL:
   - Format: `https://fashion-ai-demo.vercel.app`

**Step 5: Test**
1. Visit your Vercel URL
2. Try uploading an image and generating
3. Verify it connects to backend

### Alternative: Netlify

**Step 1: Configure Build**
1. Go to [netlify.com](https://netlify.com)
2. "Add new site" → "Import from Git"
3. Select repository
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`

**Step 2: Environment Variables**
1. Site settings → Environment variables
2. Add `NEXT_PUBLIC_API_URL` with your backend URL

**Step 3: Deploy**
1. Click "Deploy site"
2. Wait for build completion

## Part 4: Post-Deployment

### Test Full Flow

```bash
# 1. Check backend health
curl https://your-backend-url/

# 2. Visit frontend
# Open browser to your Vercel URL

# 3. Test image generation
# - Upload a garment image
# - Click generate
# - Download result
```

### Common Issues

**Issue**: Frontend can't connect to backend
- **Solution**: Check `NEXT_PUBLIC_API_URL` matches your backend URL exactly
- **Solution**: Ensure backend CORS allows your frontend domain

**Issue**: Backend returns API token error
- **Solution**: Verify `REPLICATE_API_TOKEN` is set correctly
- **Solution**: Check token is valid on Replicate dashboard

**Issue**: "Function timeout" errors
- **Solution**: AI generation takes 30-60s, may exceed free tier limits
- **Solution**: Upgrade to paid hosting plan

**Issue**: Backend "sleeping" on first request
- **Solution**: Expected on free tiers, takes 30s to wake up
- **Solution**: Upgrade to paid plan for instant response

### Setup Custom Domains (Optional)

**Frontend (Vercel)**:
1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as instructed

**Backend (Railway)**:
1. Settings → Networking → Custom Domain
2. Add your domain
3. Update DNS CNAME record

## Part 5: Monitoring & Optimization

### Basic Monitoring

**Railway Dashboard**:
- View logs in real-time
- Monitor deployment status
- Track resource usage

**Vercel Dashboard**:
- Analytics on page views
- Function execution logs
- Build logs

**Replicate Dashboard**:
- Track API usage
- Monitor costs
- View generation history

### Cost Optimization

**Strategies**:
1. **Caching**: Store generated images, reuse for similar requests
2. **Rate Limiting**: Limit generations per user/IP
3. **Image Compression**: Compress uploads before sending to api
4. **Batch Processing**: Queue requests during high load
5. **Model Selection**: Use faster/cheaper models for previews

**Expected Costs** (monthly):
- 100 generations: ~$5-10
- 1,000 generations: ~$50-100
- 10,000 generations: ~$500-1,000

Plus hosting:
- Railway: Free → $5+/month
- Vercel: Free → $20+/month

## Part 6: Security Checklist

- [ ] API tokens stored as environment variables (not in code)
- [ ] CORS configured for your specific frontend domain
- [ ] Rate limiting implemented (for production)
- [ ] Input validation on uploads
- [ ] HTTPS enabled on all services
- [ ] Regular dependency updates
- [ ] Monitor for suspicious usage
- [ ] Terms of Service for users (for production)

## Part 7: Scaling for Production

### When Your Demo Grows

**Add These Features**:
1. **User Authentication**: Clerk, Auth0, or NextAuth
2. **Database**: PostgreSQL for user data, generations history
3. **Object Storage**: S3 or Cloudflare R2 for generated images
4. **Queue System**: Bull/Redis for async processing
5. **Monitoring**: Sentry for error tracking
6. **Analytics**: Mixpanel or Amplitude
7. **Payment**: Stripe for subscriptions

**Infrastructure Upgrades**:
- Move to dedicated servers/VPS
- Add CDN for image delivery
- Implement proper caching layer
- Consider GPU instances for faster generation

## Deployment Commands Summary

```bash
# Backend deployment check
curl https://your-backend-url/

# Frontend build locally (test before deploy)
cd frontend
npm run build
npm start

# Backend test locally
cd backend
source venv/bin/activate
python main.py

# Update deployment
git add .
git commit -m "Update"
git push  # Auto-deploys on Railway & Vercel
```

## Support & Resources

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Replicate Docs**: [replicate.com/docs](https://replicate.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **FastAPI Docs**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)

## Quick Reference

| Service | Purpose | Free Tier | Paid From |
|---------|---------|-----------|-----------|
| Replicate | AI API | Pay-per-use | ~$0.02/image |
| Railway | Backend hosting | $5 credit/mo | $5/month |
| Vercel | Frontend hosting | Unlimited hobby | $20/month |
| Render | Alt backend | 750 hrs/mo | $7/month |

---

**You're Ready!** 🎉

Your Fashion AI Studio is now live and accessible to anyone with the URL. Share it with potential investors, clients, or users!

**Next Steps**:
1. Share your demo URL
2. Gather feedback
3. Iterate on features
4. Consider productization
5. Plan monetization strategy

Good luck! 🚀

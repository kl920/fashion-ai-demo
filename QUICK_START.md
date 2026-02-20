# Fashion AI Studio - Quick Start Reference

**🚀 For AI Agents Starting Fresh**

---

## LIVE URLS
- **Frontend:** https://fashion-ai-demo-xi.vercel.app
- **Backend API:** https://fashion-ai-demo-production.up.railway.app
- **GitHub:** https://github.com/kl920/fashion-ai-demo

---

## WHAT IT IS
AI-powered fashion photography generator. Users upload garment image → AI creates professional fashion photo with model wearing it.

---

## TECH STACK
- **Backend:** Python FastAPI on Railway
- **Frontend:** Next.js on Vercel
- **AI:** Replicate Flux model (text-to-image)
- **Local:** Windows, PowerShell, Git

---

## KEY FILES
- `backend/main.py` - FastAPI server, /generate endpoint
- `frontend/app/page.tsx` - UI with upload + settings
- `backend/railway.json` - Railway config
- `backend/start.sh` - Handles PORT variable
- `MASTER_DOCUMENTATION.md` - Complete reference

---

## CRITICAL INFO
- **Replicate Token:** Set in Railway Variables (not in code!)
- **Frontend Env:** `NEXT_PUBLIC_API_URL` = backend Railway URL
- **Railway Root:** backend/
- **Vercel Root:** frontend/

---

## DEPLOYMENT STATUS
✅ Both frontend & backend LIVE and working
✅ API health check passing
✅ All features functional

---

## COMMON ISSUES SOLVED
1. **Railway PORT:** Fixed with start.sh script using ${PORT:-8000}
2. **Healthcheck:** Removed strict settings from railway.json
3. **JSON Format:** Converted railway.json from YAML to proper JSON
4. **Vercel Env:** Fixed NEXT_PUBLIC_API_URL name and https:// prefix

---

## TO UPDATE
1. Make code changes
2. `git add . && git commit -m "msg" && git push`
3. Railway & Vercel auto-deploy from GitHub

---

## FULL DOCS
See `MASTER_DOCUMENTATION.md` for complete details (565 lines).

---

**Status:** Production ready, tested and working ✅

# Fashion AI Studio - Project Context

**Complete development history and context for new AI sessions**

---

## PROJECT ORIGIN

**User Request (Danish):**
> "Vi skal lave et nyt projekt. Projektet går ud på at vi skal lave et system magen til: https://youtu.be/Tq9a9l7wpZU"

**Translation:** Build a system like the video (Hummel Creative Studio fashion AI photography tool)

**User Goal:** 
1. Build working MVP to prove feasibility
2. Deploy to GitHub and get live URL
3. Demonstrate to investors/partners

---

## DEVELOPMENT JOURNEY

### **Phase 1: Analysis**
- YouTube video inaccessible (login required)
- User provided screenshots of Hummel Creative Studio
- Analyzed system: AI generates fashion photos from garment images
- Created comprehensive business analysis (TAM, unit economics, moat)

### **Phase 2: Build**
- Built Python FastAPI backend with Replicate AI integration
- Built Next.js frontend with professional UI
- Created comprehensive documentation (README, deployment guides, business analysis)
- Repository: https://github.com/kl920/fashion-ai-demo

### **Phase 3: Deployment Challenges**
**Problem 1:** Node.js not in PATH after installation
- **Solution:** Used web interfaces instead (Railway, Vercel)

**Problem 2:** Railway initial deployment failed (Railpack error)
- **Root cause:** Unknown, moved to Nixpacks builder

**Problem 3:** Railway JSON parse error
- **Root cause:** railway.json was YAML format
- **Solution:** Converted to proper JSON with schema

**Problem 4:** Healthcheck failure
- **Root cause:** Too strict timeout settings
- **Solution:** Removed healthcheck config

**Problem 5:** PORT variable error `'$PORT' is not a valid integer`
- **Root cause:** Railway's $PORT not parsed in railway.json startCommand
- **Solution:** Created start.sh with bash syntax `${PORT:-8000}`

**Problem 6:** Frontend can't connect to backend
- **Root cause:** Wrong env variable name `EXT_PUBLIC_API_URL`
- **Solution:** Fixed to `NEXT_PUBLIC_API_URL` with https:// prefix

### **Phase 4: Success**
- ✅ Backend deployed and healthy on Railway
- ✅ Frontend deployed on Vercel
- ✅ API integration working
- ✅ All features functional

---

## KEY DECISIONS

### **Why Replicate?**
- Easy API integration
- No need to manage GPU infrastructure
- Pay-per-use pricing (good for MVP)
- High-quality Flux model available

### **Why Railway + Vercel?**
- Free tiers suitable for demo
- Automatic GitHub deployments
- Easy environment variable management
- Good DX (developer experience)

### **Why FastAPI + Next.js?**
- FastAPI: Fast, modern Python framework
- Next.js: Production-ready React framework
- Both have excellent documentation
- TypeScript support (type safety)

---

## USER PREFERENCES

**Language:** 
- User speaks Danish
- Code/docs in English
- UI can be English (standard for tech demos)

**Development Style:**
- Wants complete working version (not just UI mockup)
- Values comprehensive documentation
- Focused on investor demo readiness
- Prefers quick deployment over local testing

**Communication:**
- Direct, concise responses
- Appreciates problem-solving without asking permission
- Values transparency about challenges

---

## BUSINESS CONTEXT

**Market Opportunity:**
- Fashion/e-commerce AI photography
- €2-5B TAM
- 79-98% gross margins
- Clear problem: Expensive photoshoots → Cheap AI

**Competition:**
- Generic AI tools (Midjourney, DALL-E)
- Fashion-specific platforms emerging
- Moat: Custom models + B2B partnerships

**Use Cases:**
- E-commerce product photos
- Marketing campaigns
- A/B testing variations
- Rapid prototyping

---

## TECHNICAL LEARNINGS

### **Railway Gotchas:**
- $PORT variable needs bash syntax workaround
- Root Directory must be set in UI settings
- Healthcheck defaults too aggressive
- Must use valid JSON (not YAML) in railway.json

### **Vercel Best Practices:**
- NEXT_PUBLIC_ prefix required for client-side env vars
- Always include https:// in API URLs
- Root Directory critical for monorepos

### **Replicate API:**
- 30-90 second generation time
- Returns array of URLs (use output[0])
- Cost monitoring important
- Token must be kept secret (GitHub push protection)

---

## CURRENT STATE

### **What Works:**
✅ Upload garment image  
✅ Select model type, pose, background, style  
✅ AI generation via Replicate  
✅ Display and download results  
✅ Responsive UI  
✅ Error handling  

### **What's Missing (Future):**
❌ User authentication  
❌ Image history/gallery  
❌ Batch processing  
❌ Custom model training  
❌ Payment integration  
❌ API for B2B  

### **Known Limitations:**
- No rate limiting (can be abused)
- No user accounts (anyone can use)
- Basic prompt engineering (not fine-tuned)
- Single image output only
- 2 minute timeout (for long generations)

---

## IMPORTANT CONTEXT FOR NEW SESSIONS

### **User Expectations:**
- System is DONE and WORKING
- Ready for investor demos
- Any new work should be improvements/features
- Documentation is comprehensive

### **Don't Rebuild:**
- App is deployed and functional
- GitHub repo exists with all code
- Railway + Vercel configured correctly
- Only fix if something is actually broken

### **User Likely Wants:**
- Test the live app
- Add new features
- Improve AI quality
- Business strategy discussion
- Investor pitch preparation

---

## FILES TO READ FIRST

For complete understanding, read in this order:

1. **QUICK_START.md** - Overview and key info (this was requested)
2. **MASTER_DOCUMENTATION.md** - Complete technical reference
3. **README.md** - User-facing project description
4. **DEPLOYMENT_GUIDE.md** - Step-by-step deployment
5. **BUSINESS_ANALYSIS.md** - Market analysis, financials
6. **DEMO_SCRIPT.md** - Investor pitch guide

---

## CONVERSATION TONE

**User writes in Danish:**
- "Vi skal lave..." (We need to build...)
- "se" (look/see - requesting screenshot review)
- "færdig" (done/ready)
- "næste" (next)

**I should:**
- Reply in Danish when appropriate
- Be direct and action-oriented
- Show progress with emojis
- Explain technical issues clearly
- Move fast, ask permission rarely

---

## RECAP FOR NEW AGENT

**The Story So Far:**
User wanted to build fashion AI demo like Hummel Creative Studio. I built complete full-stack app (Python + Next.js), integrated Replicate AI, overcame 6 deployment issues, got it live on Railway + Vercel. System works end-to-end. Created comprehensive docs. User happy, ready to demo to investors.

**Your Job Now:**
Help user test, improve, or pitch this working system. Don't rebuild what exists. Read MASTER_DOCUMENTATION.md for all technical details. System is production-ready.

---

**Project Status:** ✅ MVP Complete, Live, and Operational  
**Next Steps:** User-driven (testing, features, business strategy)  
**Risk Level:** Low (core system proven and deployed)

---

**Created:** February 20, 2026  
**For:** New AI agent sessions starting fresh  
**Purpose:** Provide full context without re-reading entire chat history

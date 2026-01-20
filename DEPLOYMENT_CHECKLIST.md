# Deployment Checklist for fde.agency

## ✅ Pre-Deployment Checklist

### 1. Update Vercel Environment Variables

Go to your Vercel Dashboard → Project Settings → Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://fde.agency
```

**Important:** Make sure to set this for **Production** environment.

All other environment variables should remain the same:
- `NEXT_PUBLIC_SUPABASE_URL` (already set)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (already set)

### 2. Update Supabase Redirect URLs

Go to Supabase Dashboard → Authentication → URL Configuration:

**Add these to "Redirect URLs":**
```
https://fde.agency/api/auth/callback
http://localhost:3000/api/auth/callback
```

**Site URL (optional but recommended):**
```
https://fde.agency
```

### 3. Domain Configuration in Vercel

**Option A: If fde.agency is already pointed to this Vercel project**
- ✅ You're good to go!

**Option B: If you need to add the domain**
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add `fde.agency` and `www.fde.agency`
3. Follow Vercel's DNS configuration instructions
4. Wait for SSL to be provisioned (automatic, takes ~1 minute)

### 4. Deploy to Production

```bash
# Option 1: Push to main branch (if connected to Git)
git add .
git commit -m "Rebrand to FDE Agency"
git push origin main

# Option 2: Manual deploy via Vercel CLI
vercel --prod
```

## 🧪 Post-Deployment Testing

Once deployed, test these features on **https://fde.agency**:

### Navigation & Branding
- [ ] Navigation shows "FDE Agency"
- [ ] Page title in browser tab shows "FDE Agency - Forward Deployed Engineers"
- [ ] Footer shows "© 2026 FDE Agency"

### Links
- [ ] "Join Waitlist" button opens modal
- [ ] "Learn More" button scrolls to value props section
- [ ] Footer links show "(Soon)" indicators
- [ ] Social icons are grayed out with tooltip

### Waitlist Flow
- [ ] Click "Join Waitlist" → modal opens
- [ ] Enter email → submits successfully
- [ ] Qualification modal appears with correct questions
- [ ] Success message shows "We'll notify you when FDE Agency launches"
- [ ] Check Supabase dashboard to confirm data was inserted

### Authentication Flow (if testing signup)
- [ ] Click "Sign Up" → modal opens
- [ ] Enter email/password → creates account
- [ ] Check email for verification link
- [ ] Click verification link → redirects to https://fde.agency (not localhost!)
- [ ] After verification, qualification modal appears
- [ ] User menu shows in navigation after login

### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## 🚨 Common Issues & Fixes

### Issue: Signup redirect goes to localhost
**Fix:** Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables to `https://fde.agency`

### Issue: "Invalid redirect URL" error from Supabase
**Fix:** Add `https://fde.agency/api/auth/callback` to Supabase Redirect URLs (step 2 above)

### Issue: Still showing old brand name
**Fix:** 
- Clear browser cache
- Hard refresh (Cmd + Shift + R)
- Check that deployment completed successfully in Vercel

### Issue: Domain not found / SSL error
**Fix:**
- Verify DNS is pointing to Vercel (check Vercel Domains settings)
- Wait a few minutes for SSL provisioning
- Clear DNS cache: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

## 🔍 Verification Commands

Check production site:
```bash
# Check if site is live
curl -I https://fde.agency

# Verify correct content
curl https://fde.agency | grep "FDE Agency"
```

## 📊 Analytics & Monitoring

After deployment:
- [ ] Verify Vercel Analytics is working
- [ ] Check Vercel Speed Insights
- [ ] Monitor Supabase usage dashboard
- [ ] Test form submissions in Supabase

## 🎯 Success Criteria

✅ **Deployment is successful when:**
1. https://fde.agency loads with "FDE Agency" branding
2. Waitlist form submits successfully
3. Signup creates user and redirects back to fde.agency
4. No console errors in browser DevTools
5. All links either work or are clearly marked as "Coming Soon"

---

**Need help?** Check:
- Vercel deployment logs
- Browser DevTools Console
- Supabase logs (Dashboard → Logs)

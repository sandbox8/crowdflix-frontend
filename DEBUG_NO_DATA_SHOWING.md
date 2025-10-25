# Debugging: No Cards/Data Showing in Browser

## Quick Diagnostics

### Step 1: Open Browser Developer Tools

1. **Open** http://localhost:3000
2. **Press** F12 (or Cmd+Option+I on Mac)
3. **Go to Console tab**

**Look for:**
- Red error messages
- Failed network requests
- CORS errors
- JavaScript errors

---

### Step 2: Check Network Tab

1. **Stay in DevTools**
2. **Click "Network" tab**
3. **Refresh the page** (Cmd+R or F5)
4. **Look for**:
   - `https://api.crowdflix.io/nfts/moments` request
   - Status code (should be 200)
   - Response data

**Common Issues:**

❌ **Status 0 or Failed**: API not reachable (network issue)
❌ **Status 401/403**: Authentication issue
❌ **Status 404**: Wrong API endpoint
❌ **Status 500**: Server error
✅ **Status 200**: API working (data should be in Response tab)

---

### Step 3: Check Console for Errors

**Common errors and fixes:**

**Error 1: CORS Error**
```
Access to fetch at 'https://api.crowdflix.io' has been blocked by CORS policy
```
**Fix**: API needs to allow localhost:3000 origin

**Error 2: Network Error**
```
Failed to fetch
```
**Fix**: Check internet connection or API might be down

**Error 3: Undefined Data**
```
Cannot read property 'map' of undefined
```
**Fix**: API returned empty/null data

---

## Quick Tests

### Test 1: Check API Directly

Open this in your browser:
```
https://api.crowdflix.io/nfts/moments?page=1&limit=10
```

**Should see**: JSON response with moments data

**If you see**:
- JSON data → API is working! Issue is in the app
- Error page → API is down or endpoint changed
- Nothing → Network/DNS issue

---

### Test 2: Check Browser Console

In browser console (F12), type:
```javascript
fetch('https://api.crowdflix.io/nfts/moments?page=1&limit=10')
  .then(r => r.json())
  .then(d => console.log('API Response:', d))
  .catch(e => console.error('API Error:', e))
```

**Should see**: "API Response:" with data

**If error**: API not accessible from browser

---

### Test 3: Check React Query DevTools

In browser console:
```javascript
// See what data React Query has
console.log('localStorage:', localStorage.getItem('token'));
```

**Should see**: Token value if logged in, or null if not

---

## Common Scenarios & Fixes

### Scenario 1: White/Blank Page

**Symptoms:**
- Browser shows nothing
- No errors in console
- Page is completely white

**Likely cause**: Build error or React crash

**Fix:**
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf node_modules/.vite
# Restart
npm run dev
```

---

### Scenario 2: Loading Forever

**Symptoms:**
- Spinner shows indefinitely
- No cards appear
- Console says "Loading..."

**Likely cause**: API returning empty data or taking too long

**Check in console:**
```javascript
// See current state
console.log(window.location.href)
```

**Fix**: API might be slow or down

---

### Scenario 3: API Authentication Required

**Symptoms:**
- 401 errors in Network tab
- No moments loading
- Auth modal doesn't appear

**Fix:**
1. Sign out (if logged in)
2. Clear localStorage:
```javascript
localStorage.clear()
location.reload()
```
3. Sign in again

---

### Scenario 4: API Endpoint Changed

**Symptoms:**
- 404 errors in Network tab
- Can't find `/nfts/moments`

**Check**:
```
https://api.crowdflix.io/nfts/moments
```
vs
```
https://api.crowdflix.io/moments
```

**Fix**: Update baseURL in `src/api/config/axios.ts`

---

## Step-by-Step Debugging

### Right Now:

**1. Open browser to http://localhost:3000**

**2. What do you see?**

a) **White/blank page**
   - Check console for errors
   - Likely: React error or build issue

b) **Homepage with hero but no marketplace cards**
   - Check Network tab for API calls
   - Likely: API not returning data

c) **Error message**
   - Read the error
   - Google it or share with me

d) **Loading spinner forever**
   - API is slow or failing
   - Check Network tab

**3. Open Console (F12) and tell me:**
- Are there any RED error messages?
- What do they say?

**4. Open Network Tab and tell me:**
- Do you see requests to `api.crowdflix.io`?
- What status codes do they have?
- Click on one and check "Response" tab - is there data?

---

## Quick Fix Commands

### If you see build errors:
```bash
cd "/Users/cameronmacpherson/Downloads/crowdflix-frontend-main 4"
rm -rf node_modules/.vite
npm run dev
```

### If you see API errors:
Test API manually:
```bash
curl https://api.crowdflix.io/nfts/moments?page=1&limit=10
```

### If you see nothing at all:
```bash
# Force refresh
# In browser: Cmd+Shift+R (hard reload)
# Or clear cache and reload
```

---

## What to Tell Me

To help you faster, tell me:

1. **What you see**: 
   - White page? 
   - Homepage with no cards?
   - Error message?
   - Loading forever?

2. **Console errors** (F12 → Console):
   - Copy/paste any RED errors

3. **Network status** (F12 → Network):
   - Do you see API calls to `api.crowdflix.io`?
   - What status codes? (200, 404, 401, 500?)

4. **URL you're on**:
   - http://localhost:3000 ?
   - http://localhost:3000/marketplace ?

---

## Most Likely Issues (in order)

1. **API is down or changed**
   - Test: https://api.crowdflix.io/nfts/moments
   
2. **CORS blocking the request**
   - Check console for CORS errors
   
3. **No internet connection**
   - Can you access google.com?
   
4. **Build error preventing render**
   - Check terminal for errors
   
5. **Auth required but not logged in**
   - Try signing in

---

## Right Now - Do This:

1. **Open** http://localhost:3000
2. **Press** F12
3. **Click Console tab**
4. **Refresh page**
5. **Take screenshot** of:
   - What you see in browser
   - Any console errors (in red)
   - Network tab (showing API requests)

Then tell me what you see!


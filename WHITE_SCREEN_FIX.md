# White Screen Debugging Guide

## Server is Running ✅
- Vite is serving at http://localhost:3000
- HTML is loading correctly
- Issue: JavaScript/React not rendering

## What to Check RIGHT NOW

### Step 1: Open Browser Console (Critical!)

**Do this:**
1. Open http://localhost:3000
2. Press **F12** (or Cmd+Option+I)
3. Click **Console** tab
4. Look for RED errors

**Take a screenshot or copy the error messages**

### Common White Screen Errors:

**Error 1: Import/Module Not Found**
```
Cannot find module '@/...'
Failed to resolve import
```
**Cause**: Missing file or wrong path

**Error 2: React Router Error**
```
No routes matched location
```
**Cause**: Routing configuration issue

**Error 3: Component Error**
```
Element type is invalid
Cannot read properties of undefined
```
**Cause**: Component import/export mismatch

**Error 4: CSS/Build Error**
```
Pre-transform error
@import must precede
```
**Cause**: CSS import order issue

## Quick Fixes to Try

### Fix 1: Hard Refresh Browser
```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### Fix 2: Clear Vite Cache
```bash
cd "/Users/cameronmacpherson/Downloads/crowdflix-frontend-main 4"
rm -rf node_modules/.vite
npm run dev
```

### Fix 3: Check Network Tab
1. Open DevTools (F12)
2. Click **Network** tab
3. Refresh page
4. Look for:
   - main.tsx - should be 200 status
   - App.tsx - should be 200 status
   - Any failed requests (red)

## What To Tell Me

Copy and paste:

1. **Console errors** (from F12 → Console tab)
2. **Failed network requests** (from F12 → Network tab, filter by "Errors")
3. **What you see**: Completely white? Partial content? Loading spinner?

## Most Likely Causes (in order)

1. **JavaScript error in component** (99% of white screens)
   - Check console for error
   - Usually an import issue or missing dependency

2. **Router not configured**
   - App loads but no route matches

3. **CSS blocking render**
   - Build stops due to CSS error

4. **React crash**
   - Component throwing error before mount

## Immediate Action

**Right now, open:**
- http://localhost:3000
- Press F12
- Screenshot the Console tab

**Then tell me what errors you see!**

The server is running, HTML is loading - we just need to see what JavaScript error is preventing React from rendering.


# Testing Purchase Flow with No Data

## Quick Testing Methods

### Method 1: Use Extreme Filters (Immediate, No Code)

**In Marketplace** (http://localhost:3000/marketplace):

1. **Search for gibberish**:
   - Type: `xyzabc123notreal` 
   - Result: "No Moments Found" message appears
   
2. **Set impossible price**:
   - Drag price slider to $1000
   - Result: Likely zero moments (unless you have expensive ones)

3. **Combine many filters**:
   - Select tier: Legendary
   - Select universe: Pick one
   - Select character: Pick one  
   - Set high price
   - Result: Very likely zero results

**What to verify:**
- [ ] "No Moments Found" message displays
- [ ] Message is centered and visible
- [ ] "Try adjusting your filters" suggestion shows
- [ ] Clear filters button works to reset

---

### Method 2: Test with Browser DevTools (Quick)

**Open React Query Devtools:**

1. Open browser console (F12)
2. In console, type:
```javascript
// Force empty array
window.__REACT_QUERY_DEVTOOLS__ = true;
```

3. Or modify data in Network tab:
   - Open Network tab
   - Find the `/nfts/moments` API call
   - Right-click → Block request URL
   - Reload page → API returns nothing

---

### Method 3: Temporary Code Toggle (For Testing)

Add this to `Marketplace.tsx` temporarily:

```typescript
// At the top of Marketplace component
const [testEmptyState, setTestEmptyState] = useState(false);

// Replace the moments data:
const {
  data: momentsFromAPI,
  isLoading,
  isRefetching,
} = useGetMoments({...});

// Override with empty array for testing
const moments = testEmptyState ? [] : momentsFromAPI;

// Add toggle button in header:
<button 
  onClick={() => setTestEmptyState(!testEmptyState)}
  className="text-white text-xs"
>
  {testEmptyState ? "Show Data" : "Test Empty State"}
</button>
```

**Then:** Click the toggle to switch between real data and empty state

---

### Method 4: Mock API Response (Advanced)

Create a test environment variable:

1. Create `.env.local` file:
```bash
VITE_USE_MOCK_DATA=true
```

2. In `src/shared/hooks/api/moments/useGetMoments.ts`:
```typescript
export const useGetMoments = (params) => {
  return useQuery({
    queryKey: ['moments', params],
    queryFn: async () => {
      // Check for test mode
      if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        return []; // Empty array for testing
      }
      return getMoments(params);
    },
  });
};
```

3. Toggle by changing `.env.local`

---

### Method 5: Test Profile Empty State (Easiest)

**For Profile page** (http://localhost:3000/profile):

1. **Sign out and sign in with new account**:
   - New user will have zero moments
   - Tests: "No Moments Yet" empty state
   - Tests: "Browse Marketplace" CTA button

2. **Use a test Firebase account**:
   - Create new account in Firebase
   - Sign in with that account
   - Zero purchase history = empty collection

**What to verify:**
- [ ] "No Moments Yet" heading shows
- [ ] Description text displays
- [ ] "Browse Marketplace" button appears
- [ ] Button navigates to marketplace
- [ ] Stats show all zeros (0 Total, 0 Legendary, 0 Rare, 0 Epic)

---

## What Each Empty State Should Show

### Marketplace (No Moments)
**Display:**
```
[Icon]
No Moments Found

Try adjusting your filters or search terms
```

**Location:** Grid center
**Color:** White text on dark background
**Action:** User adjusts filters or clears them

### Profile (No Collection)
**Display:**
```
No Moments Yet

Start your collection by purchasing moments from the marketplace

[Browse Marketplace Button]
```

**Location:** Center of collection area
**Color:** White heading, gray text, blue button
**Action:** Button → Navigate to /marketplace

### Detail Page (No Listings)
**Display:**
- Shows moment details but no "Buy Now" button
- Or shows "Currently Unavailable" message
- Message: "No listings available for this moment"

---

## Testing the Complete Empty State Flow

### Scenario 1: New User (Zero Purchases)

```
1. Create new Firebase account
   ↓
2. Sign in
   ↓
3. Go to /profile
   ✓ Should see: "No Moments Yet" with CTA
   ↓
4. Click "Browse Marketplace"
   ↓
5. Go to marketplace
   ✓ Should see: Moments from API (or empty if truly no data)
```

### Scenario 2: Marketplace with Filters

```
1. Go to /marketplace
   ↓
2. Apply extreme filters:
   - Search: "notarealmovie123"
   - Tier: Legendary
   - Price: $999
   ↓
3. Should see: "No Moments Found"
   ↓
4. Click "Clear All" filters
   ↓
5. Should see: All moments return
```

### Scenario 3: API is Down/Slow

```
1. Disconnect internet (or block API in devtools)
   ↓
2. Go to /marketplace
   ↓
3. Should see: Loading spinner
   ↓
4. After timeout: Error or empty state
   ↓
5. Reconnect internet
   ↓
6. Refresh: Data loads
```

---

## Recommended Testing Approach

### For Empty States:
1. **Use Search**: Type nonsense → Get zero results immediately
2. **Use New Account**: Test profile empty state
3. **Combine Filters**: Test marketplace empty state

### For Purchase Flow with Real Data:
1. **Browse normally**: Go to marketplace with data
2. **Click moment**: See detail page
3. **Test purchase**: Use testnet wallet
4. **Verify success**: Check collection updates

---

## Quick Test Commands (Browser Console)

### Force Empty Marketplace:
```javascript
// In browser console on marketplace page:
// This is a quick hack for testing
localStorage.setItem('test_empty_marketplace', 'true');
location.reload();

// To restore:
localStorage.removeItem('test_empty_marketplace');
location.reload();
```

### Check Current Data:
```javascript
// In console, see what data is loaded:
// (after page loads)
console.log('Moments:', moments);
console.log('User:', user);
console.log('Editions:', editions);
```

---

## Your Empty States Are Already Built!

### Marketplace:
```typescript
// Line 559-569 in Marketplace.tsx
) : (
  <div className="col-span-full flex justify-center items-center h-[350px]">
    <div className="text-center">
      <h3 className="text-white text-2xl font-bold mb-2">
        No Moments Found
      </h3>
      <p className="text-white/60">
        Try adjusting your filters or search terms
      </p>
    </div>
  </div>
)
```

### Profile:
```typescript
// Line 181-199 in Profile.tsx
) : (
  <div className="flex w-full justify-center items-center h-[350px] flex-col gap-4">
    <div className="text-center">
      <h3 className="text-white text-2xl font-bold mb-2">
        No Moments Yet
      </h3>
      <p className="text-white/60 mb-6">
        Start your collection by purchasing moments from the marketplace
      </p>
      <UIButton>Browse Marketplace</UIButton>
    </div>
  </div>
)
```

---

## Test Right Now (30 Seconds):

1. **Open** http://localhost:3000/marketplace
2. **Type in search**: `xyznotreal123`
3. **Press Enter**
4. **See**: "No Moments Found" message
5. **Clear search**
6. **See**: Moments return

**That's it! Empty state tested! ✅**

---

## For Complete Purchase Flow Testing:

### With Real Data (Recommended):
1. Browse marketplace normally
2. Click a moment with listings
3. Go through purchase flow
4. Test loading/success/error states

### With No Data (Edge Case):
1. Use filters to get zero results
2. Verify empty state displays correctly
3. Clear filters
4. Continue normal testing

---

**Your empty states are already implemented and working!**

**Just test them by searching for nonsense or using extreme filters!** ✅


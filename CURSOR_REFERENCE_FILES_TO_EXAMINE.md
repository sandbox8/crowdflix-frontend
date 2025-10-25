# 📋 CURSOR REFERENCE FILES TO EXAMINE

## 🎯 **WHAT CURSOR NEEDS TO LOOK AT**

When building the MVP frontend, Cursor should examine these existing files to understand patterns, APIs, and components.

---

## 🔧 **API INTEGRATION FILES**

### **Core API Configuration**
```
src/api/config/axios.ts
├─ Base URL: https://api.crowdflix.io
├─ Auth headers setup
└─ Request/response interceptors

src/api/moments/getMoments.ts
├─ Complete Moment interface
├─ API call function
├─ Query parameters
└─ Response structure

src/shared/hooks/api/moments/useGetMoments.ts
├─ React Query hook
├─ Caching strategy
├─ Error handling
└─ Loading states
```

### **Authentication Files**
```
src/shared/hooks/api/users/useAuth.ts
├─ Sign in/sign up functions
├─ User state management
├─ Token handling
└─ Redirect logic

src/store/slices/userSlice.ts
├─ Redux user state
├─ User interface
├─ Actions (setUser, clearUser)
└─ State updates
```

### **Marketplace Files**
```
src/api/marketplace/buy.ts
├─ Purchase API calls
├─ Transaction handling
├─ Payment processing
└─ Success/error responses

src/shared/hooks/api/marketplace/buy.ts
├─ React Query hook for buying
├─ Mutation handling
├─ Success callbacks
└─ Error handling
```

---

## 🎨 **DESIGN SYSTEM FILES**

### **UI Components (Ready to Use)**
```
src/shared/components/ui/button.tsx
├─ Button variants (primary, secondary, ghost)
├─ CVA implementation
├─ Size options
└─ Animation states

src/shared/components/ui/card.tsx
├─ Card component variants
├─ Glassmorphic styling
├─ Responsive design
└─ Hover effects

src/shared/components/ui/badge.tsx
├─ Badge variants (rarity system)
├─ Color coding
├─ Size options
└─ Animation states

src/shared/components/ui/utils.ts
├─ cn() utility function
├─ Class merging
├─ Tailwind integration
└─ Conditional classes
```

### **Figma Components (Already Integrated)**
```
src/pages/Home/ModernPackCard.tsx
├─ Beautiful pack display
├─ Rarity color coding
├─ Hover animations
└─ Click handlers

src/pages/Home/FloatingMomentCard.tsx
├─ 3D floating effect
├─ Smooth animations
├─ Responsive design
└─ Interactive elements

src/pages/Home/HoverVideoMomentCard.tsx
├─ Video preview on hover
├─ Smooth transitions
├─ Responsive design
└─ Click interactions
```

---

## 🏗️ **EXISTING PAGE STRUCTURE**

### **Current Pages (For Reference)**
```
src/pages/Marketplace/Marketplace.tsx
├─ Current marketplace implementation
├─ Filtering logic
├─ Grid layout
└─ Purchase flow

src/pages/Profile/Profile.tsx
├─ Current profile implementation
├─ User data display
├─ Collection view
└─ Edit functionality

src/pages/Home/OptimizedLandingPage.tsx
├─ Beautiful Figma landing page
├─ Real API integration
├─ Responsive design
└─ Smooth animations
```

### **Layout Structure**
```
src/app/layouts/AppLayout/AppLayout.tsx
├─ Main app layout
├─ Header component
├─ Footer component
└─ Navigation structure

src/app/router/appRoutes.tsx
├─ Current routing setup
├─ Protected routes
├─ Route definitions
└─ Navigation structure
```

---

## 🔌 **DATA STRUCTURES**

### **Type Definitions**
```typescript
// From src/api/moments/getMoments.ts
interface Moment {
  moment_id: string;
  title: string;
  tier: string; // "legendary", "rare", "common"
  movie: Movie;
  characters: Character[];
  poster_url: string;
  // ... 20+ more fields
}

// From src/store/slices/userSlice.ts
interface User {
  user_id: string;
  email: string;
  username: string;
  wallet_address: string;
  // ... more fields
}
```

### **API Response Patterns**
```typescript
// Standard API response structure
{
  items: Moment[],
  total: number,
  page: number,
  totalPages: number
}
```

---

## 🎯 **CURSOR EXAMINATION CHECKLIST**

### **Before Building Marketplace Page**
- [ ] Examine `useGetMoments` hook usage
- [ ] Look at `ModernPackCard` component structure
- [ ] Check `Button` component variants
- [ ] Review `Card` component styling
- [ ] Understand authentication flow

### **Before Building Account Page**
- [ ] Examine `useGetMyEditions` hook
- [ ] Look at user state management
- [ ] Check collection display patterns
- [ ] Review navigation structure
- [ ] Understand moment detail flow

### **Before Updating Routing**
- [ ] Examine current `appRoutes.tsx` structure
- [ ] Check protected route patterns
- [ ] Review navigation logic
- [ ] Understand redirect flows
- [ ] Check route parameters

---

## 📚 **PATTERN EXAMPLES**

### **API Hook Usage Pattern**
```typescript
// Standard pattern Cursor should follow
const { data: moments, isLoading, error } = useGetMoments({
  page: 1,
  limit: 20,
  sortBy: "most_sold",
  sortOrder: "DESC"
});

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error loading moments</div>;
```

### **Component Structure Pattern**
```typescript
// Standard component structure
interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks
  // Event handlers
  // Render
  return (
    <div className="beautiful-styling">
      {/* JSX */}
    </div>
  );
}
```

### **Authentication Pattern**
```typescript
// Standard auth pattern
const { user, isAuthenticated, signIn, signOut } = useAuth();

if (!isAuthenticated) {
  return <SignInForm />;
}
```

---

## 🚀 **CURSOR PROMPTS WITH CONTEXT**

### **Enhanced Marketplace Prompt**
```
Examine these files first:
- src/shared/hooks/api/moments/useGetMoments.ts
- src/pages/Home/ModernPackCard.tsx
- src/shared/components/ui/button.tsx
- src/shared/components/ui/card.tsx

Then create src/pages/MarketplaceWithNewDesign.tsx that:
1. Uses useGetMoments hook to fetch real data
2. Renders moments as ModernPackCard components
3. Uses Button component for actions
4. Uses Card component for layout
5. Follows the same patterns as OptimizedLandingPage.tsx
6. Makes it beautiful and responsive
```

### **Enhanced Account Prompt**
```
Examine these files first:
- src/shared/hooks/api/editions/getMyEditions.ts
- src/store/slices/userSlice.ts
- src/pages/Profile/Profile.tsx
- src/shared/components/ui/card.tsx

Then create src/pages/AccountWithNewDesign.tsx that:
1. Uses useGetMyEditions hook to fetch user's collection
2. Displays moments as beautiful cards
3. Uses existing user state management
4. Follows the same patterns as other pages
5. Makes it beautiful and responsive
```

---

## 🎯 **KEY INSIGHTS FOR CURSOR**

### **What Works Well**
- ✅ React Query hooks for data fetching
- ✅ Redux for state management
- ✅ Figma components for UI
- ✅ Tailwind for styling
- ✅ Framer Motion for animations

### **What to Avoid**
- ❌ Breaking existing functionality
- ❌ Changing API calls
- ❌ Modifying authentication
- ❌ Altering data structures
- ❌ Removing existing features

### **What to Focus On**
- ✅ Beautiful UI design
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ User experience
- ✅ Performance optimization

---

## 📋 **FINAL CURSOR CHECKLIST**

### **Before Starting**
- [ ] Cursor has examined reference files
- [ ] Cursor understands existing patterns
- [ ] Cursor knows which components to use
- [ ] Cursor understands API structure
- [ ] Cursor knows authentication flow

### **During Building**
- [ ] Cursor follows existing patterns
- [ ] Cursor uses existing components
- [ ] Cursor maintains API compatibility
- [ ] Cursor keeps authentication working
- [ ] Cursor makes it beautiful

### **After Building**
- [ ] New pages work with existing system
- [ ] No breaking changes
- [ ] Beautiful design implemented
- [ ] Responsive and smooth
- [ ] Ready for production

---

## 🚀 **READY TO BUILD!**

Cursor now has everything needed to build the MVP:
- ✅ Clear file references
- ✅ Pattern examples
- ✅ Component library
- ✅ API integration
- ✅ Authentication flow
- ✅ Design system

**Next step**: Cursor builds the MVP frontend! 🚀

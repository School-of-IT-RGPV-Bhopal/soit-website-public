# Adding Visitor Counter to Your Website

## Quick Start Guide

Your footer now has a placeholder for a visitor counter. Here's how to add a real counter with country flags:

### Option 1: Flag Counter (Recommended - Free & Easy)

1. **Visit**: https://flagcounter.com
2. **Click**: "Get Your Flag Counter"
3. **Customize**:
   - Choose style (flags, map, etc.)
   - Select size
   - Pick display options (show countries, visitor count)
4. **Get Code**: Copy the HTML embed code
5. **Add to Website**:
   - Open `components/VisitorCounter.tsx`
   - Replace the placeholder div with your embed code
   - Use the `dangerouslySetInnerHTML` section (it's commented)

Example code structure:
```tsx
<div 
  dangerouslySetInnerHTML={{
    __html: `
      <!-- Paste Flag Counter code here -->
      <a href="https://info.flagcounter.com/xxxx">
        <img src="https://s01.flagcounter.com/count2/xxxx/bg_FFFFFF/..." />
      </a>
    `
  }}
/>
```

### Option 2: ClustrMaps (Free - World Map View)

1. **Visit**: https://clustrmaps.com
2. **Sign up** for free
3. **Get widget code**
4. **Paste** in `VisitorCounter.tsx`

### Option 3: Histats (Free - Detailed Statistics)

1. **Visit**: https://www.histats.com
2. **Create account**
3. **Add your site**
4. **Copy counter code**
5. **Add** to `VisitorCounter.tsx`

### Option 4: GoatCounter (Privacy-Focused, Open Source)

1. **Visit**: https://www.goatcounter.com
2. **Create account** (free for non-commercial)
3. **Get tracking code**
4. **Add** to your site

## Where to Edit

**File**: `components/VisitorCounter.tsx`

Look for the commented section that says "INSTRUCTIONS TO ADD VISITOR COUNTER"

## Features You'll Get:

✅ Real-time visitor count  
✅ Country flags of visitors  
✅ Geographic distribution  
✅ Interactive display  
✅ No database needed on your end  
✅ Free forever  

## Need Help?

The placeholder shows what the counter will look like. Once you add the embed code from any service, it will automatically track and display visitors!

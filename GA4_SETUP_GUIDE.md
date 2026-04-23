# Google Analytics 4 Integration Guide

## 📋 Prerequisites

You need a Google Cloud Project with a Service Account that has access to Google Analytics 4.

## 🔧 Setup Steps

### 1. Install Required Dependencies

```bash
npm install @google-analytics/data
```

### 2. Create Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Google Analytics Admin API" and "Google Analytics Data API"
4. Create a Service Account:
   - Go to **IAM & Admin** → **Service Accounts**
   - Click **Create Service Account**
   - Name it something like "SoIT Analytics"
   - Grant roles: 
     - `roles/analytics.viewer` (Viewer on Analytics properties)
5. Create a key:
   - Go to the service account
   - Click **Keys** tab
   - **Add Key** → **Create new key** → **JSON**
   - Download the JSON file

### 3. Configure Google Analytics 4 Property

1. Log in to [Google Analytics](https://analytics.google.com/)
2. Navigate to your property settings
3. Go to **Data streams** and note your **Property ID** (found in Admin → Property Settings)
4. Add the service account email to your Google Analytics property:
   - Admin → Property Settings → Property access management
   - Invite the service account email with "Viewer" role
   - Wait for access to be granted (may take a few minutes)

### 4. Set Environment Variables

Create or update `.env.local` in your project root:

```env
# Google Analytics 4 Configuration
GA_PROPERTY_ID=YOUR_GA_PROPERTY_ID

# From the JSON key file you downloaded
GOOGLE_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhk...\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your-project-id
```

**Important**: The `GOOGLE_PRIVATE_KEY` should have literal `\n` characters, not actual newlines.

### From the JSON file:
```json
{
  "type": "service_account",
  "project_id": "YOUR_VALUE",
  "private_key_id": "...",
  "private_key": "YOUR_VALUE - use this",
  "client_email": "YOUR_VALUE",
  ...
}
```

### 5. Verify Your Setup

Test if everything works:

```bash
npm run dev
```

Visit `http://localhost:3000/analytics` - you should see your live analytics data!

## 📊 What Data You Get

### API Endpoint: `/api/analytics/stats`

Returns JSON with:
- **activeUsers**: Real-time active users on your site
- **pageViews**: Total page views (last 30 days)
- **countries**: Breakdown of visitors by country (top 10)
- **lastUpdated**: Timestamp of last update

### Caching

The API caches data for 5 minutes for performance:
- `s-maxage=300`: CDN cache for 5 minutes
- `stale-while-revalidate=600`: Serve stale data for 10 minutes while fetching fresh

## 🎨 Frontend Component

**File**: `components/analytics/LiveStats.tsx`

Features:
- Real-time active users counter
- Total page views (30-day period)
- Top 5 countries with flags
- Auto-refreshes every 30 seconds
- Error handling and loading states
- Responsive design with Tailwind CSS

## 🔒 Security Notes

✅ Private key is handled securely on the server side only
✅ No sensitive credentials exposed in the browser
✅ API route uses serverless functions
✅ Environment variables are required at build/deploy time

## 🚀 Deployment

When deploying to Vercel/production:

1. Add environment variables to your deployment platform:
   - `GA_PROPERTY_ID`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (with actual `\n` characters)
   - `GOOGLE_PROJECT_ID`

2. Redeploy your application

## ⚠️ Troubleshooting

### "Failed to fetch analytics data"
- Check if all environment variables are set correctly
- Verify service account has access to your GA4 property
- Check browser console for CORS errors

### No data showing
- Wait 24-48 hours after setting up GA4 (initial data collection)
- Verify GA4 tracking code is installed on your site
- Check that the property is receiving hits (via GA4 dashboard)

### Authentication errors
- Verify `GOOGLE_PRIVATE_KEY` formatting (use `\n` not actual newlines)
- Check service account email is added to GA property with "Viewer" role
- Ensure both APIs are enabled in Google Cloud Console

## 📚 Related Files

- [lib/analytics.ts](../lib/analytics.ts) - Analytics helper functions
- [app/api/analytics/stats/route.ts](../app/api/analytics/stats/route.ts) - API endpoint
- [components/analytics/LiveStats.tsx](../components/analytics/LiveStats.tsx) - Frontend component
- [app/analytics/page.tsx](../app/analytics/page.tsx) - Main analytics page

## 🎯 Next Steps

1. ✅ Configure Google Analytics 4
2. ✅ Set environment variables
3. ✅ Test at `/analytics` page
4. ✅ Deploy to production

You now have a fully functional analytics dashboard showing real-time data from GA4!

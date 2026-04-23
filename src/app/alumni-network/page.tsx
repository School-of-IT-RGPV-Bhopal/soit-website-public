// app/alumni/page.tsx
import AlumniSection from "@components/Alumni"; // Ensure the path matches your project structure
import { getAlumniData } from "@lib/alumniFetcher";

// --- NEXT.JS DATA CACHING ---
// Revalidate every 3600 seconds (1 hour). 
// This means the site stays fast but updates automatically when you approve new alumni.
export const revalidate = 3600; 

export default async function AlumniNetworkPage() {
  try {
    // 1. Fetch the clean, 'Published' data from Google Sheets
    // This happens on the server, so your GOOGLE_PRIVATE_KEY is never exposed to the browser.
    console.log('📋 [AlumniNetworkPage] Starting alumni data fetch...');
    const alumni = await getAlumniData();
    console.log('✅ [AlumniNetworkPage] Alumni data fetched successfully');
    console.log('📊 [AlumniNetworkPage] Total alumni count:', alumni?.length || 0);
    if (alumni && alumni.length > 0) {
      console.log('👤 [AlumniNetworkPage] First alumni:', alumni[0]);
    }

    // 2. Pass the data into your client component
    return (
      <main className="page-wrapper">
        {/* We pass the fetched array to the component. 
            If the sheet is empty, the component handles the null state.
        */}
        <AlumniSection initialAlumni={alumni} />
      </main>
    );
  } catch (error) {
    console.error('❌ [AlumniNetworkPage] Error loading alumni page:', error);
    if (error instanceof Error) {
      console.error('❌ [AlumniNetworkPage] Error message:', error.message);
      console.error('❌ [AlumniNetworkPage] Error stack:', error.stack);
    }
    // Fallback UI in case of error
    return (
      <main className="flex page-wrapper items-center justify-center">
        <div className="px-4 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Alumni Network
          </h1>
          <p className="mb-8 text-gray-600">
            We're currently updating our alumni network. Please check back soon!
          </p>
        </div>
      </main>
    );
  }
}
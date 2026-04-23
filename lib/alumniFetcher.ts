import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { withCache } from './cache';

export interface AlumniMember {
  id: number;
  name: string;
  batch: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  bio: string;
  achievements: string[];
  profileLinks?: { platform: string; url: string }[];
  email?: string | null;
  currentRole?: string;
  impactStory?: string;
}

export async function getAlumniData(): Promise<AlumniMember[]> {
  return withCache(
    'alumni:all',
    async () => {
      try {
        console.log('🔍 [AlumniFetcher] Starting to fetch alumni from Google Sheets...');
        console.log('🔑 [AlumniFetcher] Client Email:', process.env.GOOGLE_CLIENT_EMAIL ? '✓ Set' : '✗ Not set');
        console.log('🔑 [AlumniFetcher] Private Key:', process.env.GOOGLE_PRIVATE_KEY ? '✓ Set' : '✗ Not set');
        console.log('📋 [AlumniFetcher] Spreadsheet ID:', process.env.GOOGLE_SPREADSHEET_ID ? '✓ Set' : '✗ Not set');
        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_CLIENT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "your-spreadsheet-id-here";
        console.log('📝 [AlumniFetcher] Using Spreadsheet ID:', SPREADSHEET_ID);
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
        
        console.log('📂 [AlumniFetcher] Loading spreadsheet info...');
        await doc.loadInfo();
        console.log('📊 [AlumniFetcher] Spreadsheet loaded. Total sheets:', doc.sheetCount);
        const sheet = doc.sheetsByIndex[0];
        console.log('📄 [AlumniFetcher] Sheet title:', sheet?.title || 'Unknown');
        
        if (!sheet) {
          console.error('❌ [AlumniFetcher] No sheets found in the spreadsheet');
          return [];
        }
        
        console.log('🔄 [AlumniFetcher] Fetching rows from sheet...');
        const rows = await sheet.getRows();
        console.log('📈 [AlumniFetcher] Total rows found:', rows?.length || 0);
        
        if (!rows || rows.length === 0) {
          console.error('❌ [AlumniFetcher] No rows found in the spreadsheet');
          return [];
        }

        console.log('🔍 [AlumniFetcher] Filtering for "Approved" status...');
        const publishedRows = rows.filter(row => row.get('Status') === 'Approved');
        console.log('✅ [AlumniFetcher] Approved alumni found:', publishedRows.length);
        
        if (publishedRows.length === 0) {
          console.warn('⚠️ [AlumniFetcher] No published alumni found. Check Status column in Google Sheets.');
          console.log('📝 [AlumniFetcher] Sample row statuses:');
          rows.slice(0, 3).forEach((row, i) => {
            console.log(`  Row ${i}: Status = "${row.get('Status')}"`);
          });
          return [];
        }

        return publishedRows.map((row, index) => {
          // Process achievements (Split by newline from the form)
          const rawAchievements = row.get('Field: Professional Achievements (List 3-5)') || "";
          const achievementsList = rawAchievements.split('\n')
            .map((a: string) => a.replace(/^[•\-\*]\s*/, '').trim()) // Remove bullets if user added them
            .filter((a: string) => a !== "");

          // Handle Profile Links
          const links = [];
          const li = row.get('Public: LinkedIn Profile URL (Optional)');
          const gh = row.get('Public: GitHub URL (Optional)');
          const pt = row.get('Public: Portfolio URL (Optional)');
          if (li) links.push({ platform: "LinkedIn", url: li });
          if (gh) links.push({ platform: "GitHub", url: gh });
          if (pt) links.push({ platform: "Portfolio", url: pt });

          const currentRole = row.get('Current Designation/Role') || "Professional";

          return {
            id: index,
            name: row.get('Public: Full Name (as you would like it to appear on the website)') || "Alumnus",
            batch: row.get('Year of Graduation') || "N/A",
            role: currentRole,
            company: row.get('Current Company/Organization Name') || "Various",
            image: formatDriveUrl(row.get('Public: Photograph')),
            quote: row.get('Your Motto/Quote (Max 150 characters)') || "Built at SOIT.",
            bio: row.get('Public: Share a brief testimonial/memory about your time at SoIT (Max 500 words)') || "",
            achievements: achievementsList,
            profileLinks: links,
            email: row.get('Public: Email Address (leave blank if don\'t wish to share)') || null,
            currentRole: currentRole,
            impactStory: row.get('Field: Your Impact Story (Optional, Max 500 characters)') || "",
          };
        });
      } catch (error) {
        console.error('❌ [AlumniFetcher] Error fetching alumni data:', error);
        if (error instanceof Error) {
          console.error('❌ [AlumniFetcher] Error message:', error.message);
          console.error('❌ [AlumniFetcher] Error stack:', error.stack);
        }
        // Return empty array instead of throwing to prevent build failure
        return [];
      }
    },
    60 // Cache for 60 minutes
  );
}

// Converts Google Drive view links to direct image links
function formatDriveUrl(url: string) {
  if (!url) return "/api/placeholder/400/600";
  const idMatch = url.match(/[-\w]{25,}/);
  return idMatch ? `https://lh3.googleusercontent.com/d/${idMatch[0]}` : url;
}
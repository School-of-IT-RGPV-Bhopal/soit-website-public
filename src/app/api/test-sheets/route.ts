// Test endpoint to debug Google Sheets connection
import { NextResponse } from 'next/server';
import { getAlumniData } from "@lib/alumniFetcher";

export async function GET() {
  try {
    console.log('Testing Google Sheets connection...');
    console.log('Env vars present:', {
      hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasSpreadsheetId: !!process.env.GOOGLE_SPREADSHEET_ID,
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    });

    const alumni = await getAlumniData();
    
    return NextResponse.json({
      success: true,
      count: alumni.length,
      alumni: alumni,
      message: alumni.length === 0 
        ? 'Connection successful but no published alumni found. Check Status column in sheet.'
        : `Found ${alumni.length} published alumni`,
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}

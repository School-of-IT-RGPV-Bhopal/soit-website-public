import { NextRequest, NextResponse } from "next/server";
import {
  getActiveUsers,
  getCountryBreakdown,
  getPageViews,
} from "@lib/analytics";

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request: NextRequest) {
  try {
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json(
        { error: "GA_PROPERTY_ID not configured" },
        { status: 500 }
      );
    }

    // Fetch all analytics data in parallel
    const [activeUsers, countries, pageViews] = await Promise.all([
      getActiveUsers(propertyId),
      getCountryBreakdown(propertyId, 30),
      getPageViews(propertyId, 30),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          activeUsers,
          pageViews,
          countries: countries.slice(0, 5), // Top 5 countries
          lastUpdated: new Date().toISOString(),
        },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Analytics API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch analytics data",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { clearActiveUsersCache, getActiveUsers } from "@lib/analytics";

export const revalidate = 180; // Cache for 3 minutes
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const propertyId = process.env.GA_PROPERTY_ID;
    const forceRefresh =
      request.nextUrl.searchParams.get("forceRefresh") === "1";

    if (!propertyId) {
      return NextResponse.json(
        { error: "GA_PROPERTY_ID not configured" },
        { status: 500 },
      );
    }

    if (forceRefresh) {
      clearActiveUsersCache(propertyId);
    }

    const activeUsers = await getActiveUsers(propertyId);

    return NextResponse.json(
      {
        success: true,
        data: {
          activeUsers,
          lastUpdated: new Date().toISOString(),
        },
      },
      {
        headers: {
          "Cache-Control": forceRefresh
            ? "no-store"
            : "public, s-maxage=180, stale-while-revalidate=180",
        },
      },
    );
  } catch (error) {
    console.error("Active users API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch active users",
      },
      { status: 500 },
    );
  }
}

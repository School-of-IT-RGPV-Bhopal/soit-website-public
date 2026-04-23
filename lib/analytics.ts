import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { withCache } from "./cache";
import { JWTInput } from "google-auth-library";

let analyticsClient: BetaAnalyticsDataClient | null = null;

export function initializeAnalyticsClient(): BetaAnalyticsDataClient {
  if (analyticsClient) {
    return analyticsClient;
  }

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const propertyId = process.env.GA_PROPERTY_ID;

  if (!clientEmail || !privateKey || !propertyId) {
    throw new Error("Missing required Google Analytics environment variables");
  }

  // Handle newline characters in the private key
  const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

  analyticsClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: formattedPrivateKey,
      project_id: process.env.GOOGLE_PROJECT_ID,
    } as JWTInput,
  });

  return analyticsClient;
}

export async function getActiveUsers(
  propertyId: string
): Promise<number> {
  return withCache(`analytics:activeUsers:${propertyId}`, async () => {
    const client = initializeAnalyticsClient();

    try {
      const response = await client.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [
          {
            name: "activeUsers",
          },
        ],
      });

      const rows = response[0].rows;
      if (rows && rows.length > 0) {
        return parseInt(rows[0]?.metricValues?.[0]?.value || "0", 10);
      }
      return 0;
    } catch (error) {
      console.error("Error fetching active users:", error);
      throw error;
    }
  }, 5); // Cache for 5 minutes (real-time data)
}

export async function getCountryBreakdown(
  propertyId: string,
  days: number = 30
): Promise<Array<{ country: string; users: number }>> {
  return withCache(
    `analytics:countries:${propertyId}:${days}`,
    async () => {
      const client = initializeAnalyticsClient();

      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const response = await client.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [
            {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          ],
          metrics: [
            {
              name: "activeUsers",
            },
          ],
          dimensions: [
            {
              name: "country",
            },
          ],
          orderBys: [
            {
              metric: {
                metricName: "activeUsers",
              },
              desc: true,
            },
          ],
          limit: 10,
        });

        const results: Array<{ country: string; users: number }> = [];

        if (response[0].rows) {
          response[0].rows.forEach((row) => {
            const country =
              row.dimensionValues?.[0]?.value || "Unknown";
            const users = parseInt(
              row.metricValues?.[0]?.value || "0",
              10
            );
            results.push({ country, users });
          });
        }

        return results;
      } catch (error) {
        console.error("Error fetching country breakdown:", error);
        throw error;
      }
    },
    30 // Cache for 30 minutes
  );
}

export async function getPageViews(
  propertyId: string,
  days: number = 30
): Promise<number> {
  return withCache(
    `analytics:pageviews:${propertyId}:${days}`,
    async () => {
      const client = initializeAnalyticsClient();

      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const response = await client.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [
            {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          ],
          metrics: [
            {
              name: "screenPageViews",
            },
          ],
        });

        if (response[0].rows && response[0].rows.length > 0) {
          return parseInt(
            response[0]?.rows[0]?.metricValues?.[0]?.value || "0",
            10
          );
        }
        return 0;
      } catch (error) {
        console.error("Error fetching page views:", error);
        throw error;
      }
    },
    30 // Cache for 30 minutes
  );
}

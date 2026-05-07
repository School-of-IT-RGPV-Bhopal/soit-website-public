import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { withCache } from "./cache";
import { JWTInput } from "google-auth-library";
import cacheManager from "./cache";

let analyticsClient: BetaAnalyticsDataClient | null = null;

const getActiveUsersCacheKey = (propertyId: string) => {
  return `analytics:activeUsers:${propertyId}`;
};

const getCountriesCacheKey = (propertyId: string, days: number) => {
  return `analytics:countries:${propertyId}:${days}`;
};

const getPageViewsCacheKey = (propertyId: string, days: number) => {
  return `analytics:pageviews:${propertyId}:${days}`;
};

export function clearActiveUsersCache(propertyId: string): void {
  cacheManager.delete(getActiveUsersCacheKey(propertyId));
}

export function clearAggregateAnalyticsCache(
  propertyId: string,
  days: number = 30,
): void {
  cacheManager.delete(getCountriesCacheKey(propertyId, days));
  cacheManager.delete(getPageViewsCacheKey(propertyId, days));
  cacheManager.delete(`analytics:pageviews:alltime:${propertyId}`);
  cacheManager.delete(`analytics:countries:alltime:${propertyId}`);
}

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
  return withCache(getActiveUsersCacheKey(propertyId), async () => {
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
  }, 3); // Cache for 3 minutes (real-time data)
}

export async function getCountryBreakdown(
  propertyId: string,
  days: number = 30
): Promise<Array<{ country: string; users: number }>> {
  return withCache(
    getCountriesCacheKey(propertyId, days),
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
          dimensions: [
            {
              name: "country",
            },
          ],
          orderBys: [
            {
              metric: {
                metricName: "screenPageViews",
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
    getPageViewsCacheKey(propertyId, days),
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

export async function getAllTimePageViews(
  propertyId: string
): Promise<number> {
  return withCache(
    `analytics:pageviews:alltime:${propertyId}`,
    async () => {
      const client = initializeAnalyticsClient();

      try {
        const endDate = new Date();
        // Start from a very old date to capture all-time data
        const startDate = new Date("2020-01-01");

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
        console.error("Error fetching all-time page views:", error);
        throw error;
      }
    },
    60 * 24 // Cache for 24 hours (historical data)
  );
}

export async function getAllTimeCountryBreakdown(
  propertyId: string
): Promise<Array<{ country: string; users: number }>> {
  return withCache(
    `analytics:countries:alltime:${propertyId}`,
    async () => {
      const client = initializeAnalyticsClient();

      try {
        const endDate = new Date();
        // Start from a very old date to capture all-time data
        const startDate = new Date("2020-01-01");

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
          dimensions: [
            {
              name: "country",
            },
          ],
          orderBys: [
            {
              metric: {
                metricName: "screenPageViews",
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
        console.error("Error fetching all-time country breakdown:", error);
        throw error;
      }
    },
    60 * 24 // Cache for 24 hours (historical data)
  );
}

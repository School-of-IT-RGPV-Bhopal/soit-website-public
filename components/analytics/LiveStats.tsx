"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
  activeUsers: number;
  pageViews: number;
  countries: Array<{ country: string; users: number }>;
  lastUpdated: string;
}

export default function LiveStats() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/analytics/stats");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch analytics data"
          );
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch analytics");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Refresh every 15 minutes
    const interval = setInterval(fetchAnalytics, 900000);

    return () => clearInterval(interval);
  }, []);

  const getCountryFlag = (countryCode: string): string => {
    // Map country names to country codes
    const countryCodeMap: Record<string, string> = {
      "India": "🇮🇳",
      "United States": "🇺🇸",
      "United Kingdom": "🇬🇧",
      "Canada": "🇨🇦",
      "Australia": "🇦🇺",
      "Germany": "🇩🇪",
      "France": "🇫🇷",
      "Japan": "🇯🇵",
      "China": "🇨🇳",
      "Brazil": "🇧🇷",
      "Mexico": "🇲🇽",
      "Singapore": "🇸🇬",
      "Netherlands": "🇳🇱",
      "Sweden": "🇸🇪",
      "Switzerland": "🇨🇭",
    };

    return countryCodeMap[countryCode] || "🌍";
  };

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <div className="mb-2 text-4xl">⚠️</div>
        <h3 className="mb-2 font-semibold text-red-800">
          Error Loading Analytics
        </h3>
        <p className="text-sm text-red-600">{error}</p>
        <p className="mt-3 text-xs text-red-500">
          Please ensure GA4 is configured correctly in your environment
          variables.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-1 text-3xl font-bold text-gray-900">
          Live Analytics Dashboard
        </h2>
        <p className="text-gray-600">
          Real-time insights from Google Analytics 4
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="
        grid grid-cols-1 gap-6
        md:grid-cols-2
      ">
        {/* Active Users Card */}
        <div className="
          overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br
          from-blue-50 to-cyan-50 p-8 shadow-lg
        ">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-600">
                ACTIVE USERS NOW
              </p>
              {loading ? (
                <div className="h-10 w-24 animate-pulse rounded-sm bg-gray-300" />
              ) : (
                <p className="text-5xl font-bold text-blue-600">
                  {data?.activeUsers ?? 0}
                </p>
              )}
            </div>
            <div className="
              flex size-16 items-center justify-center rounded-full bg-blue-100
            ">
              <span className="text-3xl">👥</span>
            </div>
          </div>
        </div>

        {/* Page Views Card */}
        <div className="
          overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br
          from-purple-50 to-pink-50 p-8 shadow-lg
        ">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-600">
                TOTAL PAGE VIEWS (30 DAYS)
              </p>
              {loading ? (
                <div className="h-10 w-32 animate-pulse rounded-sm bg-gray-300" />
              ) : (
                <p className="text-5xl font-bold text-purple-600">
                  {data?.pageViews?.toLocaleString() ?? 0}
                </p>
              )}
            </div>
            <div className="
              flex size-16 items-center justify-center rounded-full
              bg-purple-100
            ">
              <span className="text-3xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Countries Table */}
      <div className="
        overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg
      ">
        <div className="border-b border-gray-200 px-8 py-6">
          <h3 className="text-xl font-bold text-gray-900">
            Top 5 Countries
          </h3>
          <p className="text-sm text-gray-600">
            Visitor distribution by country (last 30 days)
          </p>
        </div>

        {loading ? (
          <div className="space-y-4 p-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-sm bg-gray-200"
              />
            ))}
          </div>
        ) : data && data.countries.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {data.countries.map((country, index) => (
              <div
                key={index}
                className="
                  flex items-center justify-between px-8 py-5 transition-colors
                  hover:bg-gray-50
                "
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">
                    {getCountryFlag(country.country)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {country.country}
                    </p>
                    <p className="text-xs text-gray-500">
                      Rank #{index + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {country.users}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data.activeUsers > 0
                      ? (
                          ((country.users / data.activeUsers) *
                            100) *
                          0.01
                        ).toFixed(1) + "%"
                      : "0%"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-8 py-12 text-center">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="
        rounded-lg border border-gray-100 bg-gray-50 p-4 text-center text-xs
        text-gray-600
      ">
        {data?.lastUpdated && (
          <>
            Last updated:{" "}
            {new Date(data.lastUpdated).toLocaleTimeString()}
          </>
        )}
      </div>
    </div>
  );
}

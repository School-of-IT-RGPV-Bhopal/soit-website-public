"use client";

import { useEffect, useState } from "react";

type AnalyticsData = {
  pageViews30d: number;
  pageViewsAllTime: number;
  countries30d: Array<{ country: string; users: number }>;
  countriesAllTime: Array<{ country: string; users: number }>;
  lastUpdated: string;
}

type ActiveUsersData = {
  activeUsers: number;
  lastUpdated: string;
}

type LiveStatsProps = {
  forceRefreshOnMount?: boolean;
}

type CountryViewType = "historical" | "last30days";

const ACTIVE_USERS_REFRESH_MS = 180000;
const STATS_REFRESH_MS = 900000;

export default function LiveStats({
  forceRefreshOnMount = false,
}: LiveStatsProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [activeUsersData, setActiveUsersData] =
    useState<ActiveUsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeUsersLoading, setActiveUsersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryView, setCountryView] = useState<CountryViewType>("historical");

  useEffect(() => {
    const fetchAnalytics = async (forceRefresh: boolean = false) => {
      try {
        setLoading(true);
        setError(null);

        const query = forceRefresh ? "?forceRefresh=1" : "";

        const response = await fetch(`/api/analytics/stats${query}`, {
          cache: forceRefresh ? "no-store" : "default",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch analytics data",
          );
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch analytics");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchActiveUsers = async (forceRefresh: boolean = false) => {
      try {
        setActiveUsersLoading(true);

        const query = forceRefresh ? "?forceRefresh=1" : "";

        const response = await fetch(`/api/analytics/active-users${query}`, {
          cache: forceRefresh ? "no-store" : "default",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch active users data",
          );
        }

        const result = await response.json();
        if (result.success) {
          setActiveUsersData(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch active users");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setActiveUsersLoading(false);
      }
    };

    fetchAnalytics(forceRefreshOnMount);
    fetchActiveUsers(forceRefreshOnMount);

    const statsInterval = setInterval(() => {
      fetchAnalytics(false);
    }, STATS_REFRESH_MS);

    const activeUsersInterval = setInterval(() => {
      fetchActiveUsers(false);
    }, ACTIVE_USERS_REFRESH_MS);

    return () => {
      clearInterval(statsInterval);
      clearInterval(activeUsersInterval);
    };
  }, [forceRefreshOnMount]);

  const getCountryFlag = (countryCode: string): string => {
    const countryCodeMap: Record<string, string> = {
      India: "🇮🇳",
      "United States": "🇺🇸",
      "United Kingdom": "🇬🇧",
      Canada: "🇨🇦",
      Australia: "🇦🇺",
      Germany: "🇩🇪",
      France: "🇫🇷",
      Japan: "🇯🇵",
      China: "🇨🇳",
      Brazil: "🇧🇷",
      Mexico: "🇲🇽",
      Singapore: "🇸🇬",
      Netherlands: "🇳🇱",
      Sweden: "🇸🇪",
      Switzerland: "🇨🇭",
    };

    return countryCodeMap[countryCode] || "🌍";
  };

  const getCurrentCountries = (): Array<{ country: string; users: number }> => {
    if (countryView === "historical") {
      return data?.countriesAllTime || [];
    } else {
      return data?.countries30d || [];
    }
  };

  const getTotalCountryUsers = (): number => {
    const countries = getCurrentCountries();
    return countries.reduce((sum, c) => sum + c.users, 0);
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
      <div
        className="
          grid grid-cols-1 gap-6
          md:grid-cols-3
        "
      >
        {/* Active Users Card */}
        <div
          className="
            overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br
            from-blue-50 to-cyan-50 p-8 shadow-lg
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-600">
                ACTIVE USERS NOW
              </p>
              <p className="text-xs text-gray-500 mb-3">Real-time</p>
              {activeUsersLoading ? (
                <div className="h-10 w-24 animate-pulse rounded-sm bg-gray-300" />
              ) : (
                <p className="text-5xl font-bold text-blue-600">
                  {activeUsersData?.activeUsers ?? 0}
                </p>
              )}
            </div>
            <div
              className="
                flex size-16 items-center justify-center rounded-full bg-blue-100
              "
            >
              <span className="text-3xl">👥</span>
            </div>
          </div>
        </div>

        {/* Total Page Views (All-Time) Card */}
        <div
          className="
            overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br
            from-green-50 to-emerald-50 p-8 shadow-lg
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-600">
                TOTAL PAGE VIEWS
              </p>
              <p className="text-xs text-gray-500 mb-3">All-time</p>
              {loading ? (
                <div className="h-10 w-32 animate-pulse rounded-sm bg-gray-300" />
              ) : (
                <p className="text-5xl font-bold text-green-600">
                  {data?.pageViewsAllTime?.toLocaleString() ?? 0}
                </p>
              )}
            </div>
            <div
              className="
                flex size-16 items-center justify-center rounded-full
                bg-green-100
              "
            >
              <span className="text-3xl">📈</span>
            </div>
          </div>
        </div>

        {/* Page Views Last 30 Days Card */}
        <div
          className="
            overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br
            from-purple-50 to-pink-50 p-8 shadow-lg
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-600">
                PAGE VISITS (30 DAYS)
              </p>
              <p className="text-xs text-gray-500 mb-3">Last 30 days</p>
              {loading ? (
                <div className="h-10 w-32 animate-pulse rounded-sm bg-gray-300" />
              ) : (
                <p className="text-5xl font-bold text-purple-600">
                  {data?.pageViews30d?.toLocaleString() ?? 0}
                </p>
              )}
            </div>
            <div
              className="
                flex size-16 items-center justify-center rounded-full
                bg-purple-100
              "
            >
              <span className="text-3xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Countries Table with Toggle */}
      <div
        className="
          overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg
        "
      >
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">Top 5 Countries</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCountryView("historical")}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    countryView === "historical"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                Historical Trend
              </button>
              <button
                onClick={() => setCountryView("last30days")}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    countryView === "last30days"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                Last 30 Days
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Visitor distribution by country (
            {countryView === "historical" ? "all-time" : "last 30 days"})
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
        ) : getCurrentCountries().length > 0 ? (
          <div className="divide-y divide-gray-100">
            {getCurrentCountries().map((country, index) => (
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
                    <p className="text-xs text-gray-500">Rank #{index + 1}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {country.users}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getTotalCountryUsers() > 0
                      ? (
                          ((country.users / getTotalCountryUsers()) * 100)
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
      <div
        className="
          rounded-lg border border-gray-100 bg-gray-50 p-4 text-center text-xs
          text-gray-600
        "
      >
        {data?.lastUpdated && (
          <>
            Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
          </>
        )}
        {activeUsersData?.lastUpdated && (
          <>
            {" "}| Active users synced: {" "}
            {new Date(activeUsersData.lastUpdated).toLocaleTimeString()}
          </>
        )}
      </div>
    </div>
  );
}

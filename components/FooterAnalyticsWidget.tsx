"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AnalyticsData {
  activeUsers: number;
  pageViews: number;
  countries: Array<{ country: string; users: number }>;
}

export default function FooterAnalyticsWidget() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics/stats");
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch footer analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    // Refresh every 15 minutes
    const interval = setInterval(fetchAnalytics, 900000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="
        flex flex-col items-start gap-4
        md:flex-row md:items-center md:justify-between
      ">
        <h4 className="
          text-xs font-semibold tracking-wide text-gray-600 uppercase
        ">
          Website Analytics
        </h4>

        <div className="
          flex flex-col gap-4 text-sm
          md:flex-row md:gap-8
        ">
          {/* Total Visitors */}
          <div className="
            flex justify-between gap-4
            md:gap-6
          ">
            <span className="text-gray-600">Visitors:</span>
            {loading ? (
              <div className="h-4 w-16 animate-pulse rounded-sm bg-gray-300" />
            ) : (
              <span className="font-semibold text-gray-900">
                {data?.pageViews?.toLocaleString() || "—"}
              </span>
            )}
          </div>

          {/* Top Country */}
          <div className="
            flex justify-between gap-4
            md:gap-6
          ">
            <span className="text-gray-600">Top:</span>
            {loading ? (
              <div className="h-4 w-20 animate-pulse rounded-sm bg-gray-300" />
            ) : (
              <span className="font-semibold text-gray-900">
                {data?.countries?.[0]?.country || "—"}
              </span>
            )}
          </div>

          {/* View Analytics Link */}
          <Link
            href="/analytics"
            className="
              text-xs font-semibold text-gray-600 transition-colors
              hover:text-secondary hover:underline
            "
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

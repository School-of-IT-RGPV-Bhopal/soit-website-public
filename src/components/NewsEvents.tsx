"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { newsItems } from "@/data/news_and_events/news";
import WorkInProgress from "@/components/WorkInProgress";

export default function NewsEvents() {
  const [activeTab, setActiveTab] = useState("news");

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <section id="news-events" className="section-container mt-5 bg-white">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2
            className="
            mb-4 text-3xl font-bold text-primary
            md:text-4xl
          "
          >
            News & Events
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Stay updated with the latest happenings and upcoming events at SoIT
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-accent"></div>
        </div>

        <div className="mb-8 flex justify-center">
          <div
            className="
            inline-flex rounded-lg border border-gray-200 shadow-sm
          "
            role="group"
          >
            <button
              type="button"
              className={`
                rounded-l-lg border-r border-gray-200 px-6 py-3 text-sm
                font-medium transition-all duration-200
                focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                focus:outline-none
                ${
                  activeTab === "news"
                    ? "bg-red-600 text-white shadow-md"
                    : `
                    bg-white text-gray-700
                    hover:bg-gray-50
                  `
                }
              `}
              onClick={() => handleTabChange("news")}
              aria-pressed={activeTab === "news"}
            >
              Latest News
            </button>
            <button
              type="button"
              className={`
                rounded-r-lg px-6 py-3 text-sm font-medium transition-all
                duration-200
                focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                focus:outline-none
                ${
                  activeTab === "events"
                    ? "bg-red-600 text-white shadow-md"
                    : `
                    bg-white text-gray-700
                    hover:bg-gray-50
                  `
                }
              `}
              onClick={() => handleTabChange("events")}
              aria-pressed={activeTab === "events"}
            >
              Upcoming Events
            </button>
          </div>
        </div>

        <div className="min-h-100">
          {activeTab === "news" ? (
            <div
              className="
              grid grid-cols-1 gap-8 opacity-100 transition-opacity duration-300
              md:grid-cols-3
            "
            >
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    overflow-hidden rounded-lg bg-white shadow-md
                    transition-shadow duration-300
                    hover:shadow-lg
                  "
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="
                        object-cover transition-transform duration-300
                        hover:scale-105
                      "
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className="
                      mb-2 flex items-center text-sm text-gray-600
                    "
                    >
                      <Calendar className="mr-1 size-4" />
                      {item.date}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mb-4 line-clamp-9 text-gray-700">
  {item.excerpt}
</p>

                    {/* <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center group">
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <WorkInProgress
              embedded
              showActions={false}
              title="Upcoming events are coming soon"
              description="We are lining up the next set of SoIT events and will publish the full schedule here shortly."
              expectedLaunch="Please check back soon for new event announcements and registration details."
            />
          )}
        </div>

        {/* <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl">
            View All {activeTab === 'news' ? 'News' : 'Events'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div> */}
      </div>
    </section>
  );
}

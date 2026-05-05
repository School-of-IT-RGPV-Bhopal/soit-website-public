"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { newsItems } from "@/data/news_and_events/news";
import { upcomingEvents } from "@/data/news_and_events/upcoming_events";

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
            <div
              className="
              overflow-hidden rounded-lg bg-white opacity-100 shadow-md
              transition-opacity duration-300
            "
            >
              <div className="divide-y divide-gray-200">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="
                      p-6 transition-colors duration-200
                      hover:bg-gray-50
                    "
                  >
                    <div
                      className="
                      flex flex-col gap-4
                      md:flex-row md:items-center
                    "
                    >
                      <div className="md:w-1/4">
                        <div
                          className="
                          mb-1 flex items-center font-semibold text-blue-600
                        "
                        >
                          <Calendar className="mr-2 size-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="mr-2 size-4" />
                          {event.time}
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <h3 className="mb-1 text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="mr-2 size-4" />
                          {event.venue}
                        </div>
                      </div>
                      <div
                        className="
                        flex justify-start
                        md:w-1/4 md:justify-end
                      "
                      >
                        <button
                          className="
                          rounded-lg border-2 border-red-600 px-4 py-2 text-sm
                          font-medium text-red-600 transition-all duration-200
                          hover:bg-red-600 hover:text-white
                          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          focus:outline-none
                        "
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

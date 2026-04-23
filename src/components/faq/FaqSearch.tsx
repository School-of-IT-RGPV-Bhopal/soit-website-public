"use client";

import { useMemo, useState } from "react";

import type { FaqItem } from "@data/faq";

type FaqSearchProps = {
  allItems: FaqItem[];
};

export default function FaqSearch({ allItems }: FaqSearchProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const matchingItems = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return allItems.filter((item) => {
      const questionMatches = item.question
        .toLowerCase()
        .includes(normalizedQuery);
      const tagsMatch =
        item.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ??
        false;

      return questionMatches || tagsMatch;
    });
  }, [allItems, normalizedQuery]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <label
        htmlFor="faq-search-input"
        className="mb-2 block font-poppins text-lg font-semibold text-primary"
      >
        Search FAQs
      </label>
      <input
        id="faq-search-input"
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="Search by question or keyword tags..."
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      {normalizedQuery ? (
        <div className="mt-4">
          {matchingItems.length > 0 ? (
            <ul className="space-y-3">
              {matchingItems.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-gray-50/70 p-4"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-primary/80 uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-gray-900">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-700">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              No matching FAQs found for this query.
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}

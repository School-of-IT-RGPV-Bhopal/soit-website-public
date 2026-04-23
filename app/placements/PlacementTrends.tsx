"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const placement2024 = [
  { name: "TCS Ninja", value: 5 },
  { name: "TCS Digital", value: 2 },
  { name: "Infosys", value: 2 },
  { name: "Education Ltd", value: 3 },
  { name: "Others", value: 3 },
];

const placement2025 = [
  { name: "TCS Ninja", value: 8 },
  { name: "TCS Prime", value: 2 },
  { name: "Infosys", value: 3 },
  { name: "Education Ltd", value: 9 },
  { name: "Others", value: 1 },
];

const COLORS = [
  "#2563eb",
  "#1e40af",
  "#0ea5e9",
  "#2788ddff",
  "#3755cbff",
];


// const placementTrendsData = [
//   { year: 2019, highest: 9.5 },
//   { year: 2022, highest: 12 },
//   { year: 2023, highest: 13.9 },
// ];

export default function PlacementTrends() {
  return (
    <section className="my-16">
      <h2 className="mb-8 text-3xl font-semibold">
        Placement Trends
      </h2>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        {/* <p className="text-gray-600 text-lg mb-6">
          Year-wise growth in highest package offered.
        </p> */}

        {/* this was the year wise placement record. since only 2 batches are passed so commenting out it temporarily */}

        {/* Data rows */}
        {/* <div className="space-y-4 mb-10">
          {placementTrendsData.map((item) => (
            <div
              key={item.year}
              className="flex justify-between items-center bg-gray-50 border rounded-lg p-4 shadow-sm"
              >
              <span className="text-lg font-medium text-gray-800">{item.year}</span>
              <span className="text-xl font-semibold text-blue-700">
                {item.highest} LPA
              </span>
            </div>
          ))}
        </div> */}

        {/* PIE CHARTS */}
<div className="
  grid grid-cols-1 gap-12
  md:grid-cols-2
">
  {/* 2025 Pie */}
  <div className="h-80">
    <h3 className="mb-4 text-center font-semibold">
      2024–25 Placement Records
    </h3>

    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={placement2025}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
        >
          {placement2025.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-800 font-semibold"
        >
          Total
          <tspan x="50%" dy="1.4em" className="text-lg">
            Students 60
          </tspan>
        </text>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* 2024 Pie */}
  <div className="h-80">
    <h3 className="mb-4 text-center font-semibold">
      2023–24 Placement Records
    </h3>

    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={placement2024}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
        >
          {placement2024.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-800 font-semibold"
        >
          Total
          <tspan x="50%" dy="1.4em" className="text-lg">
            Students 50
          </tspan>
        </text>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

      </div>
    </section>
  );
}

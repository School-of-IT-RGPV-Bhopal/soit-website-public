"use client";

export default function PlacementHighlights() {
  return (
    <section className="my-20">
      <h2 className="
        mb-12 text-center text-3xl font-semibold
        md:text-left
      ">
        Placement Highlights
      </h2>

      {/* ===================== DESKTOP VERSION ===================== */}
      {/* Radial infographic – visible only on md+ screens */}
      <div className="
        mx-auto hidden max-w-5xl rounded-3xl bg-blue-50 p-12 shadow-sm
        md:block
      ">
        <div className="relative mx-auto h-105 w-175">
          
          {/* SVG CONNECTION LINES */}
          <svg className="absolute inset-0" viewBox="0 0 700 420">
            {/* Left */}
            <line x1="350" y1="210" x2="170" y2="150" stroke="#2563eb" strokeWidth="2" />
            <line x1="350" y1="210" x2="170" y2="270" stroke="#2563eb" strokeWidth="2" />

            {/* Right */}
            <line x1="350" y1="210" x2="530" y2="150" stroke="#2563eb" strokeWidth="2" />
            <line x1="350" y1="210" x2="530" y2="270" stroke="#2563eb" strokeWidth="2" />
          </svg>

          {/* CENTER CIRCLE */}
          <div
            className="
              absolute top-1/2 left-1/2 flex size-52 -translate-1/2 flex-col
              items-center justify-center rounded-full border-10 border-blue-700
              bg-white shadow-md
            "
          >
            <p className="text-lg font-semibold">Batch</p>
            <p className="text-2xl font-bold">2024–25</p>
          </div>

          {/* METRICS */}
          <Metric x="left-[80px]" y="top-[110px]" value="50 / 60" label="Students Placed" />
          <Metric x="left-[110px]" y="top-[260px]" value="13 LPA" label="Highest Package" />
          <Metric x="right-[110px]" y="top-[110px]" value="6 LPA" label="Average Package" />
          <Metric x="right-[80px]" y="top-[260px]" value="6 LPA" label="Median Package" />
        </div>
      </div>

      {/* ===================== MOBILE VERSION ===================== */}
      {/* Stacked cards – visible only on small screens */}
      <div className="
        mx-auto max-w-md rounded-2xl bg-blue-50 p-6 shadow-sm
        md:hidden
      ">
        <div className="grid grid-cols-1 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-600">Batch</p>
            <p className="text-xl font-bold">2024–25</p>
          </div>

          <MobileMetric label="Students Placed" value="50 / 60" />
          <MobileMetric label="Highest Package" value="13 LPA" />
          <MobileMetric label="Average Package" value="6 LPA" />
          <MobileMetric label="Median Package" value="6 LPA" />
        </div>
      </div>
    </section>
  );
}

/* ===================== DESKTOP METRIC ===================== */
function Metric({
  value,
  label,
  x,
  y,
}: {
  value: string;
  label: string;
  x: string;
  y: string;
}) {
  return (
    <div className={`
      absolute
      ${x}
      ${y}
      text-center
    `}>
      <div
        className="
          flex size-24 items-center justify-center rounded-full border-4
          border-blue-500 bg-white shadow-sm
        "
      >
        <span className="font-bold text-blue-700">{value}</span>
      </div>
      <p className="mx-auto mt-3 max-w-35 text-sm font-medium text-gray-700">
        {label}
      </p>
    </div>
  );
}

/* ===================== MOBILE METRIC ===================== */
function MobileMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-2xl font-bold text-blue-700">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  );
}

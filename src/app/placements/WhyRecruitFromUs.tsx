"use client";

export default function WhyRecruitFromUs() {
  return (
    <section className="my-20 rounded-lg bg-white px-6 py-12 shadow-sm">
      {/* Heading */}
      <h2 className="mb-8 text-3xl font-semibold">Why Recruit From Us</h2>

      {/* Description */}
      <p className="mb-8 text-lg/relaxed text-gray-700">
        Our institution is committed to producing value-driven, skilled
        professionals who are ready to contribute effectively from day one. With
        strong industry alignment, rigorous training, and ethical foundations,
        our graduates stand out as assets in competitive work environments.
        Recruiters consistently appreciate the professionalism, adaptability,
        and technical expertise of our students.
      </p>

      {/* Optional Key Highlights */}
      <div className="
        grid grid-cols-1 gap-6 text-center
        md:grid-cols-2
        lg:grid-cols-4
      ">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-blue-600">24+ Years</h3>
          <p className="text-gray-600">Industry Experience</p>
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold text-blue-600">2500+</h3>
          <p className="text-gray-600">Alumni Network</p>
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold text-blue-600">Top Recruiters</h3>
          <p className="text-gray-600">Across Sectors</p>
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold text-blue-600">
            High Placement Rate
          </h3>
          <p className="text-gray-600">Consistent Performance</p>
        </div>
      </div>
    </section>
  );
}

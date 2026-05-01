import { placementStats } from "@/data/placements/stats";
import Recruiters from "@app/placements/Recruiters";

export default function Placements() {
  // const recruiters = [
  //   'Microsoft', 'Google', 'Amazon', 'TCS', 'Infosys',
  //   'Wipro', 'IBM', 'Accenture', 'Cognizant', 'Capgemini'
  // ];

  return (
    <section id="placements" className="section-container bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-12 fade-up text-center">
          <h2
            className="
              mb-4 text-3xl font-bold text-primary
              md:text-4xl
            "
          >
            Placements
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Our students are placed in top companies across the globe with
            competitive packages
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-accent"></div>
        </div>

        <div
          className="
            mb-12 grid grid-cols-2 gap-6
            md:grid-cols-4
          "
        >
          {placementStats.map((stat, index) => (
            <div
              key={index}
              className="fade-up rounded-lg bg-white p-6 text-center shadow-md"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <h3 className="mb-2 text-3xl font-bold text-primary">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <Recruiters />

        <div className="mt-12 fade-up text-center">
          <a
            href="/placements"
            className="btn-primary inline-flex items-center"
          >
            View Placement Report
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

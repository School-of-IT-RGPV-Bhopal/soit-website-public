import { researchPublications } from "@/data/student_achievements/research";

export default function ResearchPublications() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Research Publications
          </h2>
          <p className="text-lg text-gray-600">
            Student-led research making an impact in the academic community
          </p>
        </div>

        <div className="space-y-6 px-4">
          {researchPublications.map((pub, index) => (
            <div
              key={index}
              className="
                group overflow-hidden rounded-2xl border border-gray-200
                bg-white p-6 shadow-lg transition-all duration-300
                hover:shadow-2xl
              "
            >
              <div
                className="
                flex flex-col gap-4
                md:flex-row md:items-start
              "
              >
                <div className="shrink-0">
                  <div
                    className="
                    flex size-16 items-center justify-center rounded-full
                    bg-linear-to-br from-primary/20 to-secondary/20 text-3xl
                  "
                  >
                    📄
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`
                        rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          pub.type === "Journal"
                            ? "bg-purple-100 text-purple-700"
                            : pub.type === "Conference"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {pub.type}
                    </span>
                    <span
                      className="
                      rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold
                      text-orange-700
                    "
                    >
                      {pub.impact}
                    </span>
                  </div>

                  <h3
                    className="
                    mb-2 text-xl font-bold text-gray-900
                    group-hover:text-primary
                  "
                  >
                    {pub.title}
                  </h3>

                  <p className="mb-2 text-sm font-medium text-gray-700">
                    <span className="text-primary">Authors:</span> {pub.authors}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Published in:</span>{" "}
                    {pub.conference}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="
          mt-12 rounded-2xl border border-primary/20 bg-linear-to-br
          from-primary/5 to-secondary/5 p-8 text-center
        "
        >
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            Want to Contribute to Research?
          </h3>
          <p className="mb-6 text-gray-700">
            SoIT actively encourages student participation in research projects.
            Connect with faculty members to explore opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="
                rounded-full bg-primary px-8 py-3 font-semibold text-white
                transition-all duration-300
                hover:bg-primary/90 hover:shadow-lg
              "
            >
              Contact Research Coordinator
            </a>
            <a
              href="/academics"
              className="
                rounded-full border-2 border-primary bg-white px-8 py-3
                font-semibold text-primary transition-all duration-300
                hover:bg-primary hover:text-white
              "
            >
              View Faculty Research Areas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

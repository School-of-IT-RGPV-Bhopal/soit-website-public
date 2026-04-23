export default function ResearchPublications() {
  const publications = [
  {
    title:
      "Design and Implementation of an Approach to Enhance Android Security Using Machine Learning",
    authors:
      "Dr. Praveen Kumar Kaithal (under the guidance of Dr. Varsha Sharma)",
    conference:
      "Ph.D. Dissertation, School of Information Technology, RGPV, Bhopal",
    type: "Thesis",
    impact: "PhD Awarded (Nov 2025)",
  },
  {
    title:
      "Design and Implementation of a System to Monitor and Control the Polyhouse Environment using Artificial Intelligence and IoT",
    authors: "Dr. Varsha Sharma (Principal Investigator)",
    conference:
      "Funded Research Project, M.P. Council of Science & Technology",
    type: "Project",
    impact: "Funded Project (₹8 Lakhs, 2025)",
  },
  {
    title:
      "An Efficient Framework for Phishing Detection System based on Machine Learning",
    authors:
      "Dr. Pankaj Pandey (Supervisor: Dr. Nishchol Mishra)",
    conference:
      "Ph.D. Research Work, Current Position: Assistant Professor, Symbiosis University of Applied Sciences, Indore",
    type: "Thesis",
    impact: "PhD Completed",
  },
  {
    title:
      "Design of Intrusion Detection System for Internet of Things Using Soft Computing Technique",
    authors:
      "Dr. Huma Gupta (Guided by Dr. Sanjeev Sharma and Dr. Sanjay Agrawal)",
    conference:
      "Ph.D., School of Information Technology, RGPV, Bhopal (Viva: June 13, 2025)",
    type: "Thesis",
    impact: "PhD Awarded",
  },
  {
    title:
      "Secured Energy Efficient Chaotic Gazelle Based Optimized Routing Protocol in Mobile Ad-Hoc Network",
    authors: "Gajendra K Ahirwar",
    conference:
      "Sustainable Computing: Informatics and Systems (Elsevier)",
    type: "Journal",
    impact: "SCI-Indexed",
  },
  {
    title:
      "A Competent CCHFMO with AMDH for QoS Improvisation and Efficient Route Protection in MANET",
    authors: "Gajendra K Ahirwar",
    conference:
      "Concurrency and Computation: Practice and Experience",
    type: "Journal",
    impact: "SCI-Indexed",
  },
  {
    title:
      "An Extensive Review on QoS Enhancement in MANET Using Meta-Heuristic Algorithms",
    authors: "Gajendra K Ahirwar",
    conference: "Wireless Personal Communications",
    type: "Journal",
    impact: "Scopus-Indexed",
  },
];

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
          {publications.map((pub, index) => (
            <div
              key={index}
              className="
                group overflow-hidden rounded-2xl border border-gray-200
                bg-white p-6 shadow-lg transition-all duration-300
                hover:shadow-2xl
              "
            >
              <div className="
                flex flex-col gap-4
                md:flex-row md:items-start
              ">
                <div className="shrink-0">
                  <div className="
                    flex size-16 items-center justify-center rounded-full
                    bg-linear-to-br from-primary/20 to-secondary/20 text-3xl
                  ">
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
                    <span className="
                      rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold
                      text-orange-700
                    ">
                      {pub.impact}
                    </span>
                  </div>

                  <h3 className="
                    mb-2 text-xl font-bold text-gray-900
                    group-hover:text-primary
                  ">
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

        <div className="
          mt-12 rounded-2xl border border-primary/20 bg-linear-to-br
          from-primary/5 to-secondary/5 p-8 text-center
        ">
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

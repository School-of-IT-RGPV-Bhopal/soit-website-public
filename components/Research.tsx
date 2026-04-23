export default function Research() {
  const researchAreas = [
    {
      id: 1,
      title: "Artificial Intelligence & Machine Learning",
      description:
        "Our AI research focuses on developing intelligent systems that can learn from data, adapt to new inputs, and perform human-like tasks.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-12 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Data Science",
      description:
        "We apply advanced statistical techniques and predictive modeling to extract meaningful insights from complex data to drive informed decision-making.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-12 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Cybersecurity & Network Defense",
      description:
        "Our cybersecurity research addresses critical challenges in network security, cryptography, and defense against emerging cyber threats.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-12 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Big Data Analytics & Cloud Computing",
      description:
        "We explore innovative approaches to handle massive datasets and develop scalable cloud-based solutions for complex computational problems.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-12 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="research" className="bg-white">
      <div className="container mx-auto">
        <div className="mb-12 fade-up text-center">
          <h2
            className="
              mb-4 text-3xl font-bold text-primary
              md:text-4xl
            "
          >
            Research Highlights
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover our cutting-edge research initiatives that are shaping the
            future of technology
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-accent"></div>
        </div>

        <div
          className="flex flex-wrap justify-center gap-8"
        >
          {researchAreas.map((area) => (
            <div
              key={area.id}
              className="
                mx-4 w-full fade-up card-base p-6 text-center
                md:mx-0 md:w-[calc(33.333%-2rem)]
                lg:w-[calc(30%)]
              "
              // className="fade-up card-base p-6 text-center"
              style={{ transitionDelay: `${0.1 * area.id}s` }}
            >
              <div className="mb-4 flex justify-center">{area.icon}</div>
              <h3 className="mb-3 text-xl font-semibold text-primary">
                {area.title}
              </h3>
              <p className="text-gray-700">{area.description}</p>
              <button
                className="
                  mx-auto mt-4 flex items-center justify-center font-medium
                  text-foreground
                  hover:underline
                "
              >
                Explore Research
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 size-4"
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
              </button>
            </div>
          ))}
        </div>

        {/* <div
          className="
            mx-auto mt-16 max-w-4xl fade-up rounded-lg bg-primary/5 p-8
          "
        >
          <div
            className="
              flex flex-col items-center
              md:flex-row
            "
          >
            <div
              className="
                mb-6
                md:mb-0 md:w-2/3 md:pr-8
              "
            >
              <h3 className="mb-4 text-2xl font-semibold text-primary">
                Research Opportunities for Students
              </h3>
              <p className="mb-4 text-gray-700">
                We offer various research opportunities for undergraduate and
                postgraduate students to work alongside faculty on cutting-edge
                projects.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 size-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Research Assistantships
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 size-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Summer Research Internships
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 size-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Undergraduate Research Program
                </li>
              </ul>
            </div>
            <div className="md:w-1/3">
              <button className="btn-primary w-full bg-accent">
                Apply for Research Program
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

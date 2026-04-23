export default function AchievementStats() {
  const stats = [
    {
      number: "150+",
      label: "Awards Won",
      description: "National & International",
      // icon: "🏆",
    },
    {
      number: "50+",
      label: "Research Papers",
      description: "Published in Conferences",
      // icon: "📚",
    },
    {
      number: "200+",
      label: "Certifications",
      description: "Industry-Recognized",
      // icon: "🎓",
    },
    {
      number: "75+",
      label: "Hackathons",
      description: "Participated & Won",
      // icon: "💻",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Excellence by Numbers
          </h2>
          <p className="text-lg text-gray-600">
            A testament to our students' dedication and talent
          </p>
        </div>

        <div className="
          grid grid-cols-1 gap-8 px-6
          md:grid-cols-2
          lg:grid-cols-4
        ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                group relative overflow-hidden rounded-2xl border
                border-gray-200 bg-white p-8 text-center shadow-lg
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl
              "
            >
              <div className="
                absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              " />
              
              <div className="relative z-10">
                {/* <div className="mb-4 text-5xl">{stat.icon}</div> */}
                <div className="mb-2 text-4xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="mb-1 text-lg font-semibold text-gray-900">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import LiveStats from "@components/analytics/LiveStats";

const analyticsHeroImage = "/images/analytics.jpg";

export default function AnalyticsDashboard() {
  return (
    <>
      {/* Hero Section */}

       <section
          className="
            relative h-[40vh] overflow-hidden
            md:h-[55vh]
          "
        >
          <div
            className="
              fade-image absolute inset-0 bg-cover bg-center
              will-change-transform
            "
            style={{ backgroundImage: `url(${analyticsHeroImage})` }}
          />

          <div className="absolute inset-0" />

          <div className="
            relative flex h-100 flex-col items-center justify-center gap-0 px-4
          ">
            <h1
              className="
                section-title mb-8 text-center text-4xl font-bold text-white
                drop-shadow-lg
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Live Analytics
            </h1>
            <br />
            <h1
              className="
                text-center text-2xl font-bold text-white drop-shadow-lg
                sm:text-2xl
                md:text-3xl
                lg:text-4xl
              "
            >
              Real-time insights into visitor traffic and engagement
            </h1>


           
          </div>

            
           
        </section>
    

      {/* Content Section */}
      <section
        className="
          relative z-10 mx-auto max-w-7xl bg-white px-6 py-16
          md:py-24
        "
      >
        <LiveStats forceRefreshOnMount />
      </section>
    </>
  );
}

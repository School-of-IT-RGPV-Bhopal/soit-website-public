const campusHero = "/images/achievments-bg.jpeg";

export default function AchievementsHero() {
  return (
    <>
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
            style={{ backgroundImage: `url(${campusHero})` }}
          />

          <div className="absolute inset-0" />

          <div className="relative flex h-full items-center justify-center px-4">
            <h1
              className="
                section-title text-center text-4xl font-bold text-white
                drop-shadow-lg
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              Achievements @SOIT
            </h1>
           
  
          </div>
        </section>
  
    </>
  );
}

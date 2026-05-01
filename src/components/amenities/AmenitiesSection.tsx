import {
  Amenity,
  campusAmenities,
  academicFacilities,
  residentialFacilities,
  supportServices,
} from "@/data/amenities/amenity";

const AmenityCard = ({
  amenity,
  index,
}: {
  amenity: Amenity;
  index: number;
}) => {
  const getUrl = () => {
    // Check if urlName is already a complete URL
    if (amenity.urlName.startsWith("http")) {
      return amenity.urlName;
    }
    return `https://rgpv.ac.in/AboutRGTU/${amenity.urlName}.aspx`;
  };

  const handleCardClick = () => {
    window.open(getUrl(), "_blank");
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        group border-border/50 flex h-105 cursor-pointer flex-col amenity-card
        overflow-hidden rounded-2xl border bg-background transition-all
        duration-300
        hover:z-10 hover:scale-[1.02] hover:shadow-2xl
      "
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon Section - Fixed Height */}
      <div
        className="
        flex shrink-0 items-center justify-center rounded-t-2xl bg-gray-50 p-6
        transition-colors
        group-hover:bg-gray-100
      "
      >
        <div
          className="
          flex size-16 items-center justify-center rounded-xl bg-white shadow-sm
          transition-shadow
          group-hover:shadow-md
        "
        >
          <amenity.icon
            className="
              text-heading-accent size-8 transition-transform
              group-hover:scale-110
            "
          />
        </div>
      </div>

      {/* Content Section - Fixed Height with Scroll on Hover */}
      <div
        className="
        flex flex-1 flex-col overflow-hidden rounded-b-2xl bg-white p-6
        group-hover:overflow-y-auto
      "
      >
        <h3
          className="
          text-heading mb-3 shrink-0 text-xl font-bold transition-colors
          group-hover:text-primary
        "
        >
          {amenity.title}
        </h3>
        <p
          className="
          text-muted-foreground mb-4 line-clamp-4 flex-1 text-justify
          text-sm/relaxed transition-all duration-300
          group-hover:line-clamp-none
          md:text-base
        "
        >
          {amenity.description}
        </p>

        {/* View Location Link */}
        <div
          className="
          flex shrink-0 items-center border-t border-gray-100 pt-4 text-sm
          font-medium text-primary
        "
        >
          <svg
            className="mr-2 size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>View Location</span>
          <svg
            className="
              ml-auto size-4 transform transition-transform
              group-hover:translate-x-1
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const AmenitiesSection = () => {
  return (
    <>
      <section id="campus-amenities" className="scroll-mt-24">
        <h2 className="section-title">Campus Amenities</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          RGPV campus is equipped with world-class amenities designed to provide
          students with a comprehensive learning and living experience. From
          modern infrastructure to recreational facilities, every aspect of
          campus life is thoughtfully planned to support academic excellence and
          personal growth.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {campusAmenities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>

      <section id="academic-facilities" className="scroll-mt-24">
        <h2 className="section-title">Academic Facilities</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          Our academic infrastructure is designed to foster innovation,
          research, and collaborative learning. With state-of-the-art facilities
          and resources, students have access to everything they need for
          academic excellence.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {academicFacilities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>

      <section id="residential-facilities" className="scroll-mt-24">
        <h2 className="section-title">Residential Facilities</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          Our residential facilities provide a safe, comfortable, and conducive
          environment for students and staff. With modern amenities and
          round-the-clock security, we ensure a home away from home experience.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {residentialFacilities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>

      <section id="support-services" className="scroll-mt-24">
        <h2 className="section-title">Support Services</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          We provide comprehensive support services to ensure the well-being and
          convenience of our campus community. From healthcare to connectivity,
          every essential service is available on campus.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {supportServices.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AmenitiesSection;

import { events } from "@/data/events";
import Image from "next/image";

const EventsSection = () => {
  return (
    <section
      id="events"
      className="
        px-4
        sm:px-0
      "
    >
      {/* Heading */}


      <div className="mb-6 flex items-center gap-4">
        <h2 className="section-title text-left">
          Events & Festivals
        </h2>
        <div className="h-px flex-1 bg-black" />
      </div>

  
        <p className="mb-12 text-justify text-lg leading-relaxed text-foreground/80">
          Our institute hosts a wide range of cultural, technical, and academic
          events throughout the year. These events bring students together,
          encourage participation beyond the classroom, and create memorable
          experiences that define campus life.
        </p>
  

      {/* Events */}
      <div
        className="
          mx-auto max-w-6xl space-y-8
          md:space-y-10
        "
      >
        {events.map((event, index) => {
          const Icon = event.icon;
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={event.name}
              className={`
                group grid items-center gap-5  border-(--section-border)
                pb-8
                 last:pb-0
                md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8
                ${isReversed ? "md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : ""}
              `}
            >
              {/* Image */}
              <div
                className={`
                  bg-gray-light relative aspect-4/3 w-full overflow-hidden
                  rounded-xl shadow-sm
                  ${isReversed ? "md:order-2" : ""}
                `}
              >
                <Image
                  src={event.imageUrl}
                  alt={event.name}
                  fill
                  className="
                    object-cover transition-transform duration-500
                    group-hover:scale-105
                  "
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>

              {/* Content */}
              <div
                className={`
                  relative overflow-hidden py-1
                  ${isReversed ? "md:order-1 md:text-right" : ""}
                `}
              >
                <Icon
                  className={`
                    pointer-events-none absolute -top-2 size-20
                    text-(--accent)/60
                    ${isReversed ? `
                      left-0
                      md:right-0 md:left-auto
                    ` : "right-0"}
                  `}
                  aria-hidden="true"
                />

                <div
                  className={`
                    relative mb-4 flex items-center gap-3
                    ${isReversed ? "md:justify-end" : ""}
                  `}
                >
                  <span className="
                    font-playfair text-4xl leading-none
                    text-(--heading-accent)/30
                  ">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-(--section-border)" />
                  <span className="
                    text-foreground/55 text-sm tracking-wide uppercase
                  ">
                    {event.type}
                  </span>
                </div>

                <h3 className="
                  font-playfair relative mb-3 text-2xl font-medium
                  text-(--heading)
                ">
                  {event.name}
                </h3>

                <p className="
                  text-foreground/80 relative text-justify text-base/relaxed
                ">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventsSection;

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
      <div className="mb-8">
        {/* <h2 className="section-title text-left">Events & Festivals</h2> */}
        <div className="flex items-center gap-4">
          <h2 className="section-title text-left">Events & Festivals</h2>
          <div className="h-px flex-1 bg-black" />
        </div>
        <p className="mt-2 text-justify text-lg/relaxed text-foreground/70">
          Our institute hosts a wide range of cultural, technical, and academic
          events throughout the year. These events bring students together,
          encourage participation beyond the classroom, and create memorable
          experiences that define campus life.
        </p>
      </div>

      {/* Events Grid */}
      <div
        className="
        mx-auto grid max-w-6xl gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {events.map((event) => {
          const Icon = event.icon;

          return (
            <div
              key={event.name}
              className="overflow-hidden border bg-background transition"
            >
              {/* Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={event.imageUrl}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="size-4 text-foreground/60" />
                  <span className="text-sm text-foreground/60">
                    {event.type}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold">{event.name}</h3>

                <p className="text-sm/relaxed text-foreground/80">
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

import { useState } from "react";
import { cn } from "@utils/utils";
import { Club, clubs } from "@/data/student_life/clubs";


const ClubsSection = () => {
  const [activeId, setActiveId] = useState<Club["id"]>("persona");
  const activeClub = clubs.find((c: { id: string; }) => c.id === activeId);

  if (!activeClub) {
    return null;
  }

  return (
    <section
      id="clubs-committees"
      className="
      px-4
      sm:px-0
    "
    >
      <div className="mb-6 flex items-center gap-4">
        <h2 className="section-title text-left">Clubs & Committees</h2>
        <div className="h-px flex-1 bg-black" />
      </div>

      {/* Intro text about clubs in general */}
      <p className="mb-10 text-justify text-lg/relaxed text-foreground/80">
        The student clubs at our institute form the cultural, technical, and
        professional backbone of campus life. They provide a platform for
        students to explore their interests, develop leadership and teamwork
        skills, and engage in activities beyond the classroom. Through
        workshops, competitions, events, and collaborations, these clubs help
        shape well-rounded individuals and foster a vibrant, collaborative
        academic environment.
      </p>

      <div
        className="
        relative mx-auto grid max-w-6xl gap-10
        md:grid-cols-[220px_1fr]
      "
      >
        {/* Left: Club List */}
        <aside className="max-h-105 space-y-4 overflow-y-auto pr-4">
          {clubs.map((club) => {
            const isActive = club.id === activeId;

            return (
              <button
                key={club.id}
                onClick={() => setActiveId(club.id)}
                className={cn(
                  "block w-full text-left text-lg transition",
                  `
                    text-foreground/60
                    hover:text-foreground
                  `,
                  isActive && "font-semibold text-foreground",
                )}
              >
                {club.name}
              </button>
            );
          })}
        </aside>

        {/* Right: Club Details */}
        <div className="max-w-3xl border-l border-b-black pl-6 text-justify">
          <p className="mb-8 leading-relaxed text-foreground/80">
            {activeClub.description}
          </p>

          {activeClub.activities?.items &&
            activeClub.activities.items.length > 0 && (
              <>
                <h4 className="mb-3 text-xl font-semibold">
                  {activeClub.activities.title ?? "Activities"}
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-foreground/80">
                  {activeClub.activities.items.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </>
            )}
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;

import { useState } from "react";
import { cn } from "@utils/utils";
import {
  Users,
  Briefcase,
  Cloud,
  Cpu,
  Building2,
  Megaphone,
  Trophy,
  BookOpen,
  Wrench,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";


export type SubCommittee = {
  name: string;
  role: string;
  icon?: LucideIcon;
};

export type ClubActivities = {
  title?: string;
  items?: string[];
};

export type Club = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  activities?: ClubActivities;
  subCommittees?: SubCommittee[];
};

const clubs: Club[] = [
  {
    id: "student-council",
    name: "Student Council",
    icon: Users,
    description:
      "The democratically elected Student Council serves as the principal body for all clubs and committees, ensuring accountability among all student bodies on campus. It creates, reviews, and updates policies and guidelines for student activities.",
    activities: {
      title: "Year Long Major Activities",
      items: [
        "Conducting literature related events and competitions (Debate, Extempore, etc.)",
        "Holding weekly/monthly movie screenings and discussions",
      ],
    },
    subCommittees: [
      { name: "Academic Committee", role: "Scheduling classes, workshops, course design suggestions", icon: BookOpen },
      { name: "Cultural Committee", role: "Organizing cultural events and festivals", icon: Megaphone },
      { name: "Sports Committee", role: "Managing sports activities and tournaments", icon: Trophy },
      { name: "Infrastructure Committee", role: "Campus facilities and maintenance", icon: Wrench },
      { name: "Media & Communications", role: "PR, social media, and campus communications", icon: Megaphone },
      { name: "Corporate Relations", role: "Industry partnerships and placements", icon: Briefcase },
    ],
  },
  {
    id: "persona",
    name: "Persona",
    icon: Briefcase,
    activities: {
      title: "Year Long Major Activities",
      items: [
        "Vichaar Sangam: A two-day intellectual inter college event featuring engaging competitions like Group Discussions, Quiz Odyssey, and Lecturate, fostering communication, analytical skills, and innovation",
        "Workshop Arena: A series of intensive online sessions designed to equip students with practical, industry-relevant skills covering topics like GitHub mastery, LinkedIn networking, and career-focused guidance for exams like GATE and CAT, offering hands-on learning with actionable insight.",
      ],
    },
    description:
      "Persona is the official personality development culb of the institution, focused on developing inter-personal skills through workshops, competitions, and industry interactions.",
  },
  {
    id: "ecell",
    name: "E-Cell",
    icon: Building2,
    activities: {
      title: "Year Long Activities",
      items: [
        "Imprenditore 4.0: The annual flagship event of E-Cell RGPV, set the campus abuzz with bold ideas, AI-driven creativity, entrepreneurial spirit, and a strong focus on sustainable innovation",
        "Pitch 2 Elevate 2.0: A high-impact pitching competition that gave students the opportunity to present their startup ideas and strengthen them through expert feedback. The top 3 winning teams secured a fast-tracked pathway to the Zonal Round of Eureka."
      ],

    },
    description:
      "E-Cell RGPV, established in 2016, is a student-run initiative that encourages innovation and entrepreneurship among students. It offers a vibrant space and support to transform any innovative idea into an impactful venture.",
  },
 
  {
    id: "aws",
    name: "AWS Cloud Club",
    icon: Cloud,
    activities: {
      title: "Year Long Major Activities",
      items: [
        "Through hands-on workshops, real-world projects, and beginner-friendly sessions, we explore the AWS Cloud across AI, security, data, automation, and more. Whether you're just getting started or already building, you'll find the guidance and resources you need to grow your cloud skills.",
        "Holding weekly/monthly study jams",
      ],
    },
    description:

      "AWS Cloud Club at the School of Information Technology, RGPV is student-led community passionate about discovering how cloud technology shapes the modern world",
  },
  // {
  //   id: "ieee",
  //   name: "IEEE Student Branch",
  //   icon: Cpu,
  //   activities: {
  //     title: "Year Long Major Activities",
  //     items: [
  //       "Conducting literature related events and competitions (Debate, Extempore, etc.)",
  //       "Holding weekly/monthly movie screenings and discussions",
  //     ],
  //   },
  //   description:
  //     "The IEEE Student Branch is part of the world's largest technical professional organization, focused on advancing technology for humanity.",
  // },

   {
    id: "gdg",
    name: "GDG",
    icon: Cpu,
    activities: {
      title: "Year Long Major Activities",
      items: [
        "Study Jams: Focused tracks on Google Cloud, Android development, and Machine Learning.",
        "Workshops: Hands-on sessions on web development (React, Angular), Firebase, and Flutter.",
        "​Hackathons: Competitive coding events where students build prototypes in a limited timeframe.",
      ],
    },
    description:
      "Google Developer Groups (GDG) on Campus SOIT is a community-driven program backed by Google for students at the School of Information Technology in Bhopal.",
  },
];



const ClubsSection = () => {
  const [activeId, setActiveId] = useState<Club["id"]>("persona");
  const activeClub = clubs.find((c) => c.id === activeId);

  if (!activeClub) {
    return null;
  }

  return (
    <section id="clubs-committees" className="
      px-4
      sm:px-0
    ">

      <div className="mb-6 flex items-center gap-4">
          <h2 className="section-title text-left">Clubs & Committees</h2>
          <div className="h-px flex-1 bg-black" />
        </div>

     
      {/* Intro text about clubs in general */}
      <p className="mb-10 text-justify text-lg/relaxed text-foreground/80">
        The student clubs at our institute form the cultural, technical, and professional backbone of campus life.
        They provide a platform for students to explore their interests, develop leadership and teamwork skills,
        and engage in activities beyond the classroom. Through workshops, competitions, events, and collaborations,
        these clubs help shape well-rounded individuals and foster a vibrant, collaborative academic environment.
      </p>

      <div className="
        relative mx-auto grid max-w-6xl gap-10
        md:grid-cols-[220px_1fr]
      ">
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
                  isActive && "font-semibold text-foreground"
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

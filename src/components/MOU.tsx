"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type PanInfo,
} from "framer-motion";
import {
  Grid3X3,
  Layers,
  LayoutList,
  Users,
  Globe,
  Cpu,
  Server,
  Briefcase,
} from "lucide-react";
// const campusHero = "/assets/GalleryImages/DSLab.jpeg";
// Placeholder for the campus image used in original code
// const CAMPUS_HERO =
//   "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop";

// --- Utility Helper ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- Types ---
type LayoutMode = "stack" | "grid" | "list";

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
}

// --- Data Configuration ---
const MOU_DATA: CardData[] = [
  {
    id: "tcs",
    title: "Tata Consultancy Services",
    subtitle: "B.Tech CS & Business Systems",
    description:
      "Partnering for the Academic Interface Program (AIP) to build an industry-ready workforce. Features a unique curriculum, 8-week industrial projects, and internship opportunities for selected students.",
    tags: ["Curriculum Design", "Internships", "Faculty Dev"],
    icon: <Briefcase className="size-6 text-white" />,
    color: "#1e40af", // Blue
  },
  {
    id: "cisco",
    title: "CISCO Networking Academy",
    subtitle: "Global CSR Flagship Program",
    description:
      "Zero-cost access to industry-relevant curriculum in Networking, Cyber Security, IoT, and Linux. Transforms lives through technology education and career opportunities.",
    tags: ["Cyber Security", "IoT", "Zero Cost"],
    icon: <Server className="size-6 text-white" />,
    color: "#0ea5e9", // Sky
  },
  {
    id: "ibm",
    title: "IBM Collaboration",
    subtitle: "The Great Mind Challenge",
    description:
      "Enhancing skills in Quantum Computing and Data Science. Includes 'The Great Mind Challenge', software discounts, and Subject Matter Expert (SME) certification for faculty.",
    tags: ["Quantum", "Research", "SME Certs"],
    icon: <Cpu className="size-6 text-white" />,
    color: "#2563eb", // Royal Blue
  },
  {
    id: "niit",
    title: "NIIT Foundation",
    subtitle: "Inclusive Skill Development",
    description:
      "Authorized CISCO Academy Support Center focusing on the underprivileged. Bridges the gap between industry demand and workforce supply through specialized ICT training.",
    tags: ["NGO Partnership", "Skill Dev", "Inclusive Ed"],
    icon: <Users className="size-6 text-white" />,
    color: "#d97706", // Amber
  },
  {
    id: "infosys",
    title: "Infosys",
    subtitle: "Campus Connect",
    description:
      "Strategic partnership to enhance IT education quality. Focuses on foundation programs, soft skills, and bridging the gap between academic output and industry requirements.",
    tags: ["Campus Connect", "Soft Skills", "Training"],
    icon: <Globe className="size-6 text-white" />,
    color: "#0284c7", // Light Blue
  },
];

// --- Components ---

// // 1. Minimalist Unique Stats
// const StatsRow = () => {
//   // const stats = [
//   //   {
//   //     count: "15+",
//   //     label: "Industry Partners",
//   //     icon: <Briefcase size={20} />,
//   //     color: "text-blue-600",
//   //     bg: "bg-blue-50",
//   //   },
//   //   {
//   //     count: "32",
//   //     label: "Journals",
//   //     icon: <BookOpen size={20} />,
//   //     color: "text-emerald-600",
//   //     bg: "bg-emerald-50",
//   //   },
//   //   {
//   //     count: "36",
//   //     label: "Conferences",
//   //     icon: <Users size={20} />,
//   //     color: "text-indigo-600",
//   //     bg: "bg-indigo-50",
//   //   },
//   //   {
//   //     count: "11",
//   //     label: "Patents",
//   //     icon: <Lightbulb size={20} />,
//   //     color: "text-amber-600",
//   //     bg: "bg-amber-50",
//   //   },
//   // ];

//   return (
//     <div
//       className="
//       mb-16 grid grid-cols-2 gap-6
//       md:grid-cols-4
//     "
//     >
//       {stats.map((stat, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           viewport={{ once: true }}
//           className="
//             group relative rounded-xl border border-gray-100 bg-white p-6
//             shadow-sm transition-all duration-300
//             hover:shadow-md
//           "
//         >
//           {/* Minimalist Icon Top Right */}
//           <div
//             className={cn(
//               "absolute top-4 right-4 rounded-full p-2 transition-colors",
//               stat.bg,
//               stat.color,
//             )}
//           >
//             {stat.icon}
//           </div>

//           <div className="mt-4">
//             <h3
//               className={cn(
//                 "mb-1 text-4xl font-bold tracking-tight",
//                 stat.color,
//               )}
//             >
//               {stat.count}
//             </h3>
//             <p
//               className="
//               text-sm font-semibold tracking-wide text-gray-500 uppercase
//             "
//             >
//               {stat.label}
//             </p>
//           </div>

//           {/* Bottom decorative line */}
//           <div
//             className={cn(
//               `
//                 absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0
//                 transition-transform duration-300
//                 group-hover:scale-x-100
//               `,
//               stat.color.replace("text", "bg"),
//             )}
//           />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// 2. Morphing Card Stack (Logic from reference, Styled to match Original Code)
const SWIPE_THRESHOLD = 50;
const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
};

function MorphingStack({ cards }: { cards: CardData[] }) {
  const [layout, setLayout] = useState<LayoutMode>("stack");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length;
      reordered.push({ ...cards[index], stackPosition: i });
    }
    return reordered.reverse();
  };

  const displayCards =
    layout === "stack"
      ? getStackOrder()
      : cards.map((c, i) => ({ ...c, stackPosition: i }));

  return (
    <div className="mb-20 w-full">
      {/* Controls */}
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-800">
          Featured Partnerships
        </h3>

        <div className="flex rounded-lg bg-gray-100 p-1">
          {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
            const Icon = layoutIcons[mode];
            return (
              <button
                key={mode}
                onClick={() => setLayout(mode)}
                className={cn(
                  `
                    rounded-md p-2 text-gray-500 transition-all
                    hover:text-gray-900
                  `,
                  layout === mode && "bg-white text-blue-600 shadow-sm",
                )}
                title={`View as ${mode}`}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div
          layout
          className={cn(
            "relative mx-auto transition-all duration-500",
            layout === "stack" ? "h-100 w-full max-w-lg" : "",
            layout === "grid"
              ? `
                grid grid-cols-1 gap-6
                md:grid-cols-2
                lg:grid-cols-3
              `
              : "",
            layout === "list" ? "flex flex-col gap-4" : "",
          )}
        >
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const isTopCard = layout === "stack" && card.stackPosition === 0;

              // Stack Layout Logic
              const stackStyles =
                layout === "stack"
                  ? {
                      top: card.stackPosition * 10,
                      scale: 1 - card.stackPosition * 0.05,
                      zIndex: cards.length - card.stackPosition,
                    }
                  : {
                      top: 0,
                      scale: 1,
                      zIndex: 1,
                    };

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, ...stackStyles }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  style={{
                    position: layout === "stack" ? "absolute" : "relative",
                    width: "100%",
                    cursor: isTopCard ? "grab" : "default",
                  }}
                  className={cn(
                    "overflow-hidden rounded-xl bg-white",
                    layout === "stack"
                      ? "border border-gray-200 shadow-xl"
                      : `
                        border border-gray-100 shadow-md transition-shadow
                        hover:shadow-lg
                      `,
                  )}
                >
                  <div className="flex h-full flex-col p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="mb-1 text-lg font-semibold text-blue-900">
                          {card.title}
                        </h4>
                        <span
                          className="
                            rounded-full bg-blue-50 px-2 py-1 text-xs
                            font-medium text-blue-700
                          "
                        >
                          {card.subtitle}
                        </span>
                      </div>
                      {/* Fake Logo Placeholder */}
                      <div
                        className="
                          ml-3 flex size-10 items-center justify-center
                          rounded-lg
                        "
                        style={{ backgroundColor: card.color }}
                      >
                        {card.icon}
                      </div>
                    </div>

                    {/* Body */}
                    <p className="mb-4 flex-1 text-sm text-gray-600">
                      {card.description}
                    </p>

                    {/* Footer / Tags */}
                    <div className="mt-auto border-t border-gray-100 pt-4">
                      <p className="mb-2 text-xs font-semibold text-gray-500">
                        Focus Areas:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {card.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="
                              flex items-center rounded-sm bg-gray-50 px-2 py-1
                              text-xs text-gray-600
                            "
                          >
                            <span className="
                              mr-2 size-1 rounded-full bg-blue-500
                            "></span>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Swipe Hint */}
                    {layout === "stack" && isTopCard && (
                      <div
                        className="
                          absolute right-2 bottom-1 text-[10px] text-gray-300
                        "
                      >
                        Swipe &rarr;
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Pagination Dots (Only for stack) */}
      {layout === "stack" && (
        <div className="mt-8 flex justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-blue-600" : "w-1.5 bg-gray-300",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Main Page Component ---
export default function MOU() {
  return (
    <section
      id="mou"
      className="section-container mt-10 bg-linear-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Header - Matching Original Style */}
        <div className="mb-12 text-center">
          <h2
            className="
              mb-4 text-3xl font-bold text-blue-900
              md:text-4xl
            "
          >
            Memorandums of Understanding
          </h2>
          <div className="mx-auto mb-4 h-1 w-20 bg-blue-600"></div>
          <p className="mx-auto max-w-3xl text-gray-600">
            SoIT has established strategic partnerships with leading
            organizations to enhance academic excellence, research
            opportunities, and industry exposure for our students.
          </p>
        </div>

        {/* 1. Unique Stats Row (Simple & Minimalistic) */}
        {/* <StatsRow /> */}

        {/* 2. Featured MOUs (Morphing Stack) */}
        <MorphingStack cards={MOU_DATA} />

        {/* Benefits Section*/}
        <div className="fade-up rounded-lg bg-white p-8 shadow-lg">
          <h3 className="mb-8 text-center text-2xl font-semibold">
            Benefits for Students
          </h3>
          <div
            className="
              grid grid-cols-1 gap-6
              md:grid-cols-3
            "
          >
            <div className="text-center">
              <div
                className="
                  mx-auto mb-5 w-full max-w-xs overflow-hidden rounded-lg
                "
              >
                <Image
                  src="/assets/GalleryImages/DeptLib.jpeg"
                  alt="Internship Opportunities"
                  width={384}
                  height={256}
                  className="h-auto w-full object-cover"
                />
              </div>

              <h4 className="mb-2 text-lg font-semibold">
                Internship Opportunities
              </h4>

              <p className="text-sm text-gray-600">
                Direct access to internships and training programs with partner
                organizations
              </p>
            </div>
            <div className="text-center">
              <div
                className="
                  mx-auto mb-5 w-full max-w-xs overflow-hidden rounded-lg
                "
              >
                <Image
                  src="/assets/GalleryImages/TCSDrive.jpeg"
                  alt="Industry Certifications"
                  width={384}
                  height={256}
                  className="h-auto w-full object-cover"
                />
              </div>
              <h4 className="mb-2 text-lg font-semibold">
                Industry Certifications
              </h4>
              <p className="text-sm text-gray-600">
                Free or subsidized certifications from leading technology
                companies
              </p>
            </div>
            <div className="text-center">
              <div
                className="
                  mx-auto mb-5 w-full max-w-xs overflow-hidden rounded-lg
                "
              >
                <Image
                  src="/assets/GalleryImages/DSLab.jpeg"
                  alt="Research Collaboration"
                  width={384}
                  height={256}
                  className="h-auto w-full object-cover"
                />
              </div>
              <h4 className="mb-2 text-lg font-semibold">
                Research Collaboration
              </h4>
              <p className="text-sm text-gray-600">
                Opportunities to work on cutting-edge research projects with
                industry experts
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 fade-up text-center">
          <h3 className="mb-4 text-xl font-semibold">
            Explore Student Life at SOIT
          </h3>

          <p className="mb-6 text-gray-600">
            Discover clubs, committees, events, and experiences that make campus
            life vibrant and enriching.
          </p>

          <a href="/student-life" className="btn-primary inline-block">
            Explore Student Life
          </a>
        </div>
      </div>
    </section>
  );
}

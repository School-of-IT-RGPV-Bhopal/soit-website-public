"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types & Interfaces ---
interface Program {
  id: number;
  level: string;
  title: string;
  duration: string;
  description: string;
  eligibility: string;
  intake?: number;
  // New fields for specific documents
  ordinanceLink?: string;
  syllabusLink?: string;
  schemeLink?: string;
}

// --- Icons (Inline for portability) ---
const Icons = {
  Academic: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14v5"
      />
    </svg>
  ),
  Close: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Download: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  ),
  FileText: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  BookOpen: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  Scroll: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
};

// --- Data ---
const programsData: Program[] = [
  {
    id: 1,
    level: "undergraduate",
    title:
      "B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    duration: "4 Years",
    description:
      "Specialized program focusing on AI/ML technologies, deep learning, computer vision, and intelligent systems development.",
    eligibility: "10+2 with PCM",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-AIML-I-VIII-Sem.pdf",
    schemeLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/schemes/Scheme-AIML-I-VIII-Sem.pdf",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20no%2004%20D301123041325.pdf",
  },
  {
    id: 2,
    level: "undergraduate",
    title: "B.Tech in Computer Science and Business Systems",
    duration: "4 Years",
    description:
      "Interdisciplinary program combining computer science with business systems, enterprise solutions, and management principles.",
    eligibility: "10+2 with PCM",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-CSBS-I-VIII-Sem.pdf",
    schemeLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/schemes/Scheme-CSBS-I-VIII-Sem.pdf",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20no%2004%20D301123041325.pdf",
  },
  {
    id: 3,
    level: "undergraduate",
    title: "B.Tech in Computer Science and Engineering (Data Science)",
    duration: "4 Years",
    description:
      "Specialized program focusing on data analytics, big data technologies, statistical modeling, and data-driven decision making.",
    eligibility: "10+2 with PCM",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-CSDS-I-VIII-Sem.pdf",
    schemeLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/schemes/Scheme-CSDS-I-VIII-Sem.pdf",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20no%2004%20D301123041325.pdf",
  },
  {
    id: 5,
    level: "postgraduate",
    title: "M.Tech in Data Science",
    duration: "2 Years",
    description:
      "Master specialized techniques in big data, statistical analysis, and machine learning applications.",
    eligibility: "B.E./B.Tech in relevant field",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-MTDS-I-Year.pdf",
    schemeLink: "#",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20No%2008%20B%20Under%20NEP130223022246.pdf",
  },
  {
    id: 6,
    level: "doctoral",
    title: "Ph.D. in Computer Science & Engineering",
    duration: "Variable",
    description:
      "Research-intensive program for scholars pursuing innovations in computational sciences and technology.",
    eligibility: "Master's degree in relevant field",
    // UPDATE THESE LINKS
    syllabusLink: "#",
    schemeLink: "#", // PhD might not have a scheme like UG, link to coursework structure
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/PHDO081121013840.pdf",
  },
  {
    id: 8,
    level: "doctoral",
    title: "Ph.D. in Information Technology",
    duration: "Variable",
    description:
      "Advanced research in IT infrastructure, networking, and emerging digital technologies.",
    eligibility: "Master's degree in relevant field",
    // UPDATE THESE LINKS
    syllabusLink: "#",
    schemeLink: "#",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/PHDO081121013840.pdf",
  },
];

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState("undergraduate");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProgram(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredPrograms =
    activeFilter === "all"
      ? programsData
      : programsData.filter((program) => program.level === activeFilter);

  return (
    <section id="programs" className="
      relative section-container mt-10 bg-gray-50
    ">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="
                mb-4 text-3xl font-bold text-gray-900
                md:text-5xl
              "
            >
              Academic Programs
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Discover our diverse range of programs designed to prepare you for
              success in the technology sector.
            </p>
            <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-primary" />
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {["all", "undergraduate", "postgraduate", "doctoral"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  rounded-full border px-6 py-2.5 text-sm font-semibold
                  tracking-wide transition-all duration-300
                  ${
                  activeFilter === filter
                    ? `
                      scale-105 border-primary bg-primary text-white shadow-lg
                      shadow-primary/30
                    `
                    : `
                      border-gray-200 bg-white text-gray-600
                      hover:border-primary/50 hover:bg-gray-50
                      hover:text-primary
                    `
                }
                `}
              >
                {filter === "undergraduate"
                  ? "Bachelors"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ),
          )}
        </motion.div>

        {/* Programs Grid */}
        <div
          className="
            grid grid-cols-1 gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={program.id}
                className="
                  group relative flex flex-col justify-between overflow-hidden
                  rounded-2xl bg-white p-8 shadow-sm transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10
                "
              >
                {/* Decoration Gradient */}
                <div
                  className="
                    absolute top-0 left-0 h-1.5 w-full bg-linear-to-r
                    from-primary to-accent opacity-0 transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className="
                        rounded-xl bg-primary/5 p-3 text-primary
                        transition-colors
                        group-hover:bg-primary group-hover:text-white
                      "
                    >
                      <Icons.Academic />
                    </div>
                    <span
                      className="
                        rounded-full bg-gray-100 px-3 py-1 text-xs font-bold
                        tracking-wider text-gray-600 uppercase
                      "
                    >
                      {program.level}
                    </span>
                  </div>

                  <h3
                    className="
                      mb-3 text-xl/tight font-bold text-gray-900
                      group-hover:text-primary
                    "
                  >
                    {program.title}
                  </h3>

                  <div
                    className="
                      mb-4 flex items-center text-sm font-medium text-gray-500
                    "
                  >
                    {program.duration}
                  </div>

                  <p className="mb-6 line-clamp-3 text-sm/relaxed text-gray-600">
                    {program.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div
                    className="
                      mb-5 rounded-lg border border-gray-100 bg-gray-50 p-3
                      text-sm text-gray-700
                    "
                  >
                    <span className="font-semibold text-gray-900">
                      Eligibility:
                    </span>{" "}
                    {program.eligibility}
                  </div>

                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="
                      flex w-full items-center justify-center rounded-lg border
                      border-primary/20 bg-white py-2.5 text-sm font-bold
                      text-primary transition-all
                      hover:bg-primary hover:text-white
                      focus:ring-4 focus:ring-primary/20
                    "
                  >
                    View Details
                    <svg
                      className="
                        ml-2 size-4 transition-transform
                        group-hover:translate-x-1
                      "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Detailed Modal --- */}
      <AnimatePresence>
        {selectedProgram && (
          <Modal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// --- Sub-components for cleaner code ---

function Modal({
  program,
  onClose,
}: {
  program: Program;
  onClose: () => void;
}) {
  // Determine intake based on level
  const intake = program.level === "undergraduate" ? "78 Seats" : "Variable";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="
          relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white
          shadow-2xl
        "
      >
        {/* Decorative Header Bar */}
        <div
          className="
            h-2 w-full bg-linear-to-r from-primary via-blue-500 to-accent
          "
        />

        <div className="flex max-h-[90vh] flex-col overflow-y-auto">
          {/* Header */}
          <div
            className="
              sticky top-0 z-10 flex items-start justify-between border-b
              border-gray-100 bg-white/95 px-8 py-6 backdrop-blur-sm
            "
          >
            <div>
              <span
                className="
                  mb-2 inline-block rounded-md bg-blue-50 px-3 py-1 text-xs
                  font-bold tracking-wider text-blue-600 uppercase
                "
              >
                {program.level} Program
              </span>
              <h3
                className="
                  text-2xl/tight font-bold text-gray-900
                  md:text-3xl
                "
              >
                {program.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="
                ml-4 rounded-full bg-gray-100 p-2 text-gray-500
                transition-colors
                hover:bg-red-50 hover:text-red-500
              "
            >
              <Icons.Close />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-8 p-8">
            {/* Key Stats Grid */}
            <div
              className="
                grid grid-cols-1 gap-4
                sm:grid-cols-3
              "
            >
              <StatCard label="Duration" value={program.duration} />
              <StatCard label="Total Intake" value={intake} />
              <StatCard label="Eligibility" value={program.eligibility} />
            </div>

            {/* Description */}
            <div>
              <h4 className="mb-3 text-lg font-bold text-gray-900">
                Program Overview
              </h4>
              <p className="text-base/relaxed text-gray-600">
                {program.description} This comprehensive curriculum is designed
                to foster innovation and technical expertise. Students will
                engage with theoretical foundations and practical applications,
                preparing them for industry leadership and advanced research.
              </p>
            </div>

            {/* Resources Section - Dynamic Links */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6">
              <h4 className="mb-4 text-lg font-bold text-gray-900">
                Curriculum & Regulations
              </h4>
              <div
                className="
                  grid grid-cols-1 gap-4
                  sm:grid-cols-3
                "
              >
                <ResourceButton
                  icon={<Icons.BookOpen />}
                  title="Syllabus"
                  subtitle="Detailed Coursework"
                  href={program.syllabusLink || "#"}
                  disabled={!program.syllabusLink}
                />
                <ResourceButton
                  icon={<Icons.FileText />}
                  title="Scheme"
                  subtitle="Credit Distribution"
                  href={program.schemeLink || "#"}
                  disabled={!program.schemeLink}
                />
                <ResourceButton
                  icon={<Icons.Scroll />}
                  title="Ordinance"
                  subtitle="Rules & Regulations"
                  href={program.ordinanceLink || "#"}
                  disabled={!program.ordinanceLink}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              flex justify-end border-t border-gray-100 bg-gray-50 px-8 py-4
            "
          >
            <button
              onClick={onClose}
              className="
                rounded-lg px-6 py-2 text-sm font-semibold text-gray-600
                transition-colors
                hover:bg-gray-200
              "
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <p
        className="text-xs font-semibold tracking-wider text-gray-500 uppercase"
      >
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-primary">{value}</p>
    </div>
  );
}

function ResourceButton({
  icon,
  title,
  subtitle,
  href,
  disabled,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  disabled?: boolean;
}) {
  if (disabled || href === "#") {
    // Optional: Render a disabled state if no link is provided
    return (
      <div
        className="
          flex cursor-not-allowed items-start space-x-3 rounded-lg border
          border-gray-100 bg-gray-100/50 p-4 opacity-60
        "
      >
        <div className="shrink-0 text-gray-400">{icon}</div>
        <div>
          <h5 className="font-bold text-gray-500">{title}</h5>
          <p className="text-xs text-gray-400">Not Available</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-start space-x-3 rounded-lg border border-white bg-white
        p-4 shadow-sm transition-all duration-200
        hover:border-primary/30 hover:shadow-md hover:shadow-primary/10
      "
    >
      <div
        className="
          shrink-0 rounded-lg bg-blue-50 p-2 text-primary transition-colors
          group-hover:bg-primary group-hover:text-white
        "
      >
        {icon}
      </div>
      <div>
        <h5
          className="
            font-bold text-gray-900
            group-hover:text-primary
          "
        >
          {title}
        </h5>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </a>
  );
}

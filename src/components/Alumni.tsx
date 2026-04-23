"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Globe,
  Briefcase,
  Calendar,
  Award,
  X,
  Mail,
  ExternalLink,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AlumniMember } from "@lib/alumniFetcher";
import { FaLinkedin } from "react-icons/fa";

interface AlumniSectionProps {
  initialAlumni: AlumniMember[];
}

// const stats = [
//   { value: "50,000+", label: "Alumni Worldwide" },
//   { value: "120+", label: "Countries" },
//   { value: "500+", label: "Startups Founded" },
//   { value: "98%", label: "Employment Rate" },
// ];

const benefits = [
  {
    icon: <Briefcase className="size-6 text-purple-600" />,
    title: "Career Opportunities",
    desc: "Access exclusive job boards and referral networks from alumni at top tier companies.",
  },
  {
    icon: <Calendar className="size-6 text-blue-600" />,
    title: "Global Events",
    desc: "Join meetups, reunions, and networking dinners in major cities around the world.",
  },
  {
    icon: <Award className="size-6 text-pink-600" />,
    title: "Mentorship Program",
    desc: "Get paired with industry leaders who graduated before you to guide your career path.",
  },
];

const AlumniSection = ({
  initialAlumni,
}: {
  initialAlumni: AlumniMember[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniMember | null>(
    null,
  );

  // Calculate dynamic stats from actual alumni data
  const dynamicStats = [
    { value: initialAlumni.length.toString(), label: "Alumni Registered" },
    { 
      value: new Set(initialAlumni.map(a => a.company)).size.toString(), 
      label: "Companies Represented" 
    },
    { 
      value: new Set(initialAlumni.flatMap(a => a.profileLinks?.map(l => l.platform) || [])).size > 0 ? "Active" : "Growing", 
      label: "Network Status" 
    },
    { 
      value: initialAlumni.filter(a => a.achievements.length > 0).length.toString(), 
      label: "Achievements Shared" 
    },
  ];

  // Log received data
  console.log(
    "👥 [AlumniSection] Component mounted with alumni count:",
    initialAlumni?.length || 0,
  );
  if (initialAlumni && initialAlumni.length > 0 && initialAlumni[0]) {
    console.log("👤 [AlumniSection] First alumni name:", initialAlumni[0].name);
  }

  // Show empty state if no alumni data
  if (!initialAlumni || initialAlumni.length === 0) {
    console.warn(
      "⚠️ [AlumniSection] No alumni data provided - showing empty state",
    );
    return (
      <section className="relative mt-15 overflow-hidden bg-white">
        <div className="
          mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        ">
          <div className="mx-auto max-w-4xl text-center">
            <span className="
              mb-6 inline-block rounded-full border border-purple-100
              bg-purple-50 px-4 py-1.5 text-sm font-bold tracking-wide
              text-purple-700
            ">
              OUR LEGACY
            </span>
            <h2 className="
              mb-6 flex items-center justify-center gap-3 text-4xl/tight
              font-extrabold tracking-tight text-gray-900
              md:text-6xl
            ">
              <Globe className="
                size-10 shrink-0 text-purple-600
                md:size-14
              " />
              <span>Our Global </span>
              <span className="
                bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text
                text-transparent
              ">
                Alumni Network
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg/relaxed text-gray-600">
              Our alumni network is currently being built. Check back soon to
              see success stories from our graduates!
            </p>{" "}
            <div className="mt-10 text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdCTlcmqLcRLsZotZSw-sx4TKtEF9ojCufdSltgtJUuZgki7A/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-2 rounded-full bg-linear-to-r
                  from-purple-600 to-blue-600 px-8 py-3 text-base font-bold
                  text-white transition-all
                  hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-300
                "
              >
                <Mail className="size-4" />
                Join The Network
              </a>
            </div>{" "}
            <div className="mt-10">
              <Link
                href="/contact"
                className="
                  inline-flex items-center gap-3 rounded-full bg-linear-to-r
                  from-purple-600 to-blue-600 px-8 py-4 text-lg font-bold
                  text-white transition-all
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200
                "
              >
                <Mail className="size-5" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Decor */}
      <div className="
        absolute top-0 left-1/2 -z-10 h-125 w-200 -translate-x-1/2 rounded-full
        bg-purple-50/50 blur-[120px]
      " />

      <div className="
        mx-auto max-w-7xl px-4
        sm:px-6
        lg:px-8
      ">
        {/* Header Section */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="
            mb-6 inline-block rounded-full border border-purple-100 bg-purple-50
            px-4 py-1.5 text-sm font-bold tracking-wide text-purple-700
          ">
            OUR LEGACY
          </span>
          <h2 className="
            mb-6 flex items-center justify-center gap-3 text-4xl/tight
            font-extrabold tracking-tight text-gray-900
            md:text-6xl
          ">
            <Globe className="
              size-10 shrink-0 text-purple-600
              md:size-14
            " />
            <span>Our Global </span>
            <span className="
              bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text
              text-transparent
            ">
              Alumni Network
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg/relaxed text-gray-600">
            Join a thriving community of graduates making an impact across every
            industry worldwide.
          </p>
          <div className="
            flex flex-wrap justify-center gap-8 border-b border-gray-100 pb-10
            md:gap-12
          ">
            {dynamicStats.map((stat, idx) => (
              <div
                key={idx}
                className="
                  text-center transition-transform
                  hover:scale-105
                "
              >
                <div className="
                  bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-2xl
                  font-bold text-transparent
                  md:text-3xl
                ">
                  {stat.value}
                </div>
                <div className="
                  mt-1 text-xs font-medium tracking-wider text-gray-500
                  uppercase
                  md:text-sm
                ">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>{" "}
          <div className="mt-10 text-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdCTlcmqLcRLsZotZSw-sx4TKtEF9ojCufdSltgtJUuZgki7A/viewform?usp=header"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 rounded-full bg-linear-to-r
                from-purple-600 to-blue-600 px-8 py-3 text-base font-bold
                text-white transition-all
                hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-300
              "
            >
              <Mail className="size-4" />
              Join The Network
            </a>
          </div>{" "}
        </div>

        {/* Dynamic Interactive Gallery */}
        <div className="mb-24 flex w-full justify-center">
          <div className="
            flex h-80 w-full flex-col items-center justify-center gap-3
            md:h-96 md:w-auto md:flex-row
          ">
            {initialAlumni.map((alum, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={alum.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setSelectedAlumni(alum)}
                  className={`
                    relative h-full cursor-pointer overflow-hidden rounded-3xl
                    transition-all duration-500 ease-in-out
                    ${isActive ? `
                      w-full
                      md:w-96
                    ` : `w-20`}
                  `}
                >
                  <Image
                    src={alum.image}
                    alt={alum.name}
                    fill
                    className="object-cover object-center"
                  />

                  {/* Overlay for Active State */}
                  <div
                    className={`
                      absolute inset-0 bg-linear-to-t from-black/90 via-black/20
                      to-transparent transition-opacity duration-300
                      ${isActive ? `opacity-100` : `opacity-0`}
                    `}
                  />

                  <div
                    className={`
                      absolute bottom-0 left-0 w-full p-8 transition-all
                      duration-300
                      ${isActive ? `translate-y-0 opacity-100` : `
                        translate-y-4 opacity-0
                      `}
                    `}
                  >
                    <h3 className="mb-1 text-3xl font-bold text-blue-400">
                      {alum.name}
                    </h3>
                    <p className="mb-4 font-medium text-white">
                      {alum.role}, {alum.company}
                    </p>
                    <p className="
                      line-clamp-2 border-l-2 border-blue-500 pl-3 text-sm
                      text-gray-200 italic
                    ">
                      &quot;{alum.quote}&quot;
                    </p>
                    <div className="
                      mt-4 flex items-center gap-2 text-xs font-bold
                      tracking-wider text-white/80 uppercase
                      hover:text-blue-400
                    ">
                      View Profile <ArrowRight className="size-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="
          rounded-[2.5rem] bg-gray-50 p-8
          md:p-12
        ">
          <div className="
            grid gap-8
            md:grid-cols-3
          ">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="
                  rounded-2xl border border-gray-100 bg-white p-8 shadow-sm
                  hover:shadow-md
                "
              >
                <div className="
                  mb-6 inline-flex size-14 items-center justify-center
                  rounded-2xl bg-gray-50
                ">
                  {item.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-gray-900">
                  {item.title}
                </h4>
                <p className="leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdCTlcmqLcRLsZotZSw-sx4TKtEF9ojCufdSltgtJUuZgki7A/viewform?usp=header"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 rounded-full bg-linear-to-r
                from-purple-600 to-blue-600 px-8 py-4 text-lg font-bold
                text-white transition-all
                hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200
              "
            >
              <Mail className="size-5" />
              Join The Network
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedAlumni && (
          <AlumniModal
            alumni={selectedAlumni}
            onClose={() => setSelectedAlumni(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Sub-Component: Alumni Modal
function AlumniModal({
  alumni,
  onClose,
}: {
  alumni: AlumniMember;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="
        fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4
        backdrop-blur-sm
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="
          relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden
          rounded-2xl bg-white shadow-2xl
          md:flex-row
        "
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-20 rounded-full bg-black/20 p-2 text-white
            hover:bg-black/40
          "
        >
          <X className="size-6" />
        </button>

        <div className="
          relative h-64 w-full
          md:h-auto md:w-2/5
        ">
          <Image
            src={alumni.image}
            alt={alumni.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="
          w-full overflow-y-auto p-8
          md:w-3/5
        ">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900">{alumni.name}</h3>
            <p className="text-lg font-medium text-purple-600">{alumni.role}</p>
            <p className="mt-1 text-sm text-gray-500">
              Class of {alumni.batch}
            </p>
          </div>

          <div className="space-y-6">
            <div className="
              flex items-center space-x-3 rounded-lg border border-purple-100
              bg-purple-50 p-4
            ">
              <Briefcase className="size-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Company</p>
                <p className="font-bold text-gray-900">{alumni.company}</p>
              </div>
            </div>

            {alumni.bio && (
              <div>
                <h4 className="mb-2 font-semibold text-gray-900">Biography</h4>
                <p className="text-sm/relaxed text-gray-600">{alumni.bio}</p>
              </div>
            )}

            {alumni.achievements.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Professional Highlights
                </h4>
                <ul className="space-y-2">
                  {alumni.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <Award className="mt-0.5 size-4 shrink-0 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {alumni.impactStory && (
              <div className="
                rounded-r-lg border-l-4 border-blue-500 bg-blue-50/50 p-4
                text-sm text-gray-700 italic
              ">
                &quot;{alumni.impactStory}&quot;
              </div>
            )}

            {alumni.profileLinks && alumni.profileLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {alumni.profileLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center gap-2 rounded-full border
                      bg-gray-50 px-4 py-2 text-sm font-medium
                      hover:bg-blue-50
                    "
                  >
                    {link.platform === "LinkedIn" ? (
                      <FaLinkedin className="size-4" />
                    ) : (
                      <ExternalLink className="size-4" />
                    )}
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AlumniSection;

// --- Data ---
const alumniData: AlumniMember[] = [
  {
    id: 1,
    name: "Dr. Deepak Tomar",
    batch: "2008",
    role: "Professor and HOD",
    company: "MANIT Bhopal",
    image: "https://pbs.twimg.com/media/G6dpB9JaAAA2wDS?format=png&name=small",
    quote: "The foundation built here motivated me to be the best.",
    bio: "Dr. Deepak Tomar is a distinguished faculty member and Head of Department at MANIT Bhopal. He has contributed significantly to technical education and research in India, mentoring numerous students and researchers.",
    achievements: [
      "Head of Department, MANIT Bhopal",
      "Published 50+ research papers in international journals",
      "Guided 15+ PhD candidates",
      "Senior Member of IEEE",
      "Recipient of Best Faculty Award 2021",
    ],
    currentRole: "Professor and HOD",
    impactStory:
      "From SOIT alumnus to leading academic administrator, Dr. Tomar exemplifies how quality education transforms careers. He actively collaborates with SOIT for curriculum development and mentors junior faculty.",
    profileLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
    email: "deepak.tomar@manit.ac.in",
  },
  {
    id: 2,
    name: "Mr. Krishna Kumar Sharma",
    batch: "2017",
    role: "Vodafone Europe Head",
    company: "VI",
    image: "https://pbs.twimg.com/media/G6dpEiebIAEHrOS?format=jpg&name=small",
    quote: "World-class mentorship changed my life.",
    bio: "Krishna Kumar Sharma is a strategic leader in the telecommunications industry, currently heading operations for Vodafone Europe. His career trajectory demonstrates the global opportunities available to SOIT graduates.",
    achievements: [
      "Head of Vodafone Europe Operations",
      "Led digital transformation initiatives across 12 countries",
      "Managed team of 500+ professionals",
      "Increased operational efficiency by 35%",
      "Recognized as Young Leader in Telecom Industry 2023",
    ],
    currentRole: "VP Operations, Vodafone Europe",
    impactStory:
      "From a SOIT graduate to leading international operations, Krishna's journey showcases the value of ethical leadership and continuous learning. He actively recruits from SOIT for his team.",
    profileLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
    email: "krishna.sharma@vodafone.com",
  },
  {
    id: 3,
    name: "Mr. Manoj Yadav",
    batch: "2016",
    role: "Vice President",
    company: "OAK NORTH GLOBAL PVT. LTD.",
    image: "https://pbs.twimg.com/media/G6dpGJZbsAEg1tp?format=png&name=small",
    quote: "The network I gained was invaluable.",
    bio: "Manoj Yadav is a visionary entrepreneur and senior executive at Oak North Global, a company specializing in AI-driven business solutions. He bridges the gap between academia and industry innovation.",
    achievements: [
      "Vice President, Oak North Global",
      "Founded 2 successful startups",
      "Patents in AI and Machine Learning",
      "Advisor to 5+ emerging tech companies",
      "Speaker at international tech conferences",
    ],
    currentRole: "Vice President, Strategy & Innovation",
    impactStory:
      "Manoj exemplifies entrepreneurial spirit fostered at SOIT. His initiatives have created 200+ jobs and he remains actively involved in mentoring startup founders from the institution.",
    profileLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
    email: "manoj.yadav@oaknorth.com",
  },
  {
    id: 4,
    name: "Dr. Rupesh Dewang",
    batch: "2018",
    role: "HOD",
    company: "MNNIT ALLAHABAD",
    image: "https://pbs.twimg.com/media/G6dpHzVbkAERJI3?format=png&name=small",
    quote: "Prepared me for cutting-edge research.",
    bio: "Dr. Rupesh Dewang is Head of Department at MNNIT Allahabad and a renowned researcher in computer networks and cybersecurity. He continues the legacy of academic excellence started at SOIT.",
    achievements: [
      "Head of CSE Department, MNNIT Allahabad",
      "PhD in Computer Networks with distinction",
      "30+ publications in Scopus indexed journals",
      "Principal Investigator of 3 research projects",
      "Technical Review Committee Member, AICTE",
    ],
    currentRole: "Associate Professor & HOD",
    impactStory:
      "Dr. Dewang's research contributions have been cited 500+ times. He actively collaborates with SOIT for research initiatives and provides internship opportunities to students.",
    profileLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
    email: "rupesh@mnnit.ac.in",
  },
  {
    id: 5,
    name: "Yash Ketan Agnihotri",
    batch: "2019",
    role: "SDE II",
    company: "Cisco Systems",
    image: "https://pbs.twimg.com/media/G6dpKpcbgAAj7ce?format=png&name=small",
    quote: "Where creativity meets discipline.",
    bio: "Yash Ketan Agnihotri is a Software Development Engineer II at Cisco Systems, working on cloud infrastructure and distributed systems. He represents the new generation of SOIT alumni driving innovation at global tech companies.",
    achievements: [
      "SDE II, Cisco Systems (Cloud Infrastructure)",
      "Multiple patents in cloud technologies",
      "Led team that improved system reliability by 99.99%",
      "Open source contributor (500+ GitHub stars)",
      "Speaker at tech conferences on scalability",
    ],
    currentRole: "Senior Software Engineer",
    impactStory:
      "Yash exemplifies how SOIT's curriculum aligns with industry needs. His contributions to Cisco's critical infrastructure impact millions of users globally.",
    profileLinks: [
      { platform: "GitHub", url: "https://github.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
    ],
    email: "yash@cisco.com",
  },
  {
    id: 6,
    name: "Dr. Lokesh Chouhan",
    batch: "2020",
    role: "Professor (Dean Academic)",
    company: "National Forensic Sciences University",
    image: "https://pbs.twimg.com/media/G6dpNYzawAAniIt?format=png&name=small",
    quote: "I learned to build for the future.",
    bio: "Dr. Lokesh Chouhan serves as Dean Academic at National Forensic Sciences University, pioneering programs at the intersection of technology and forensics. His academic leadership shapes the future of digital forensics.",
    achievements: [
      "Dean of Academic Affairs, NFSU",
      "Pioneered Digital Forensics program in India",
      "25+ research papers in cybersecurity and forensics",
      "Consultant to Indian law enforcement agencies",
      "Recipient of National Teaching Excellence Award",
    ],
    currentRole: "Professor & Dean Academic",
    impactStory:
      "Dr. Chouhan's vision has transformed NFSU into a leader in digital forensics. He collaborates with SOIT to develop curriculum and conducts workshops on emerging technologies.",
    profileLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
    email: "lokesh.chouhan@nfsu.ac.in",
  },
  {
    id: 7,
    name: "Dr. Amitesh Rajput",
    batch: "2021",
    role: "City Mission Manager",
    company: "MP Rural Development",
    image: "https://pbs.twimg.com/media/G6dpPilbcAAH3jU?format=jpg&name=small",
    quote: "Design thinking starts here.",
    bio: "Dr. Amitesh Rajput applies technology for social impact as City Mission Manager at MP Rural Development. He demonstrates how technology education can be leveraged for community development and sustainable growth.",
    achievements: [
      "City Mission Manager, MP Rural Development",
      "Implemented tech solutions impacting 100,000+ people",
      "Led digital literacy program in 50 villages",
      "Patent in IoT-based agricultural monitoring",
      "Speaker on technology for social good",
    ],
    currentRole: "City Mission Manager & Tech Lead",
    impactStory:
      "Amitesh embodies SOIT's mission of creating socially responsible technologists. His projects have brought digital transformation to underserved communities across Madhya Pradesh.",
    profileLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
    email: "amitesh.rajput@mprural.in",
  },
];

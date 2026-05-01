import React from "react";
import { Briefcase, Server, Cpu, Users, Globe } from "lucide-react";

export type CardData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
};

// --- Data Configuration ---
export const MOU_DATA: CardData[] = [
  {
    id: "tcs",
    title: "Tata Consultancy Services",
    subtitle: "B.Tech CS & Business Systems",
    description:
      "Partnering for the Academic Interface Program (AIP) to build an industry-ready workforce. Features a unique curriculum, 8-week industrial projects, and internship opportunities for selected students.",
    tags: ["Curriculum Design", "Internships", "Faculty Dev"],
    icon: React.createElement(Briefcase, { className: "size-6 text-white" }),
    color: "#1e40af", // Blue
  },
  {
    id: "cisco",
    title: "CISCO Networking Academy",
    subtitle: "Global CSR Flagship Program",
    description:
      "Zero-cost access to industry-relevant curriculum in Networking, Cyber Security, IoT, and Linux. Transforms lives through technology education and career opportunities.",
    tags: ["Cyber Security", "IoT", "Zero Cost"],
    icon: React.createElement(Server, { className: "size-6 text-white" }),
    color: "#0ea5e9", // Sky
  },
  {
    id: "ibm",
    title: "IBM Collaboration",
    subtitle: "The Great Mind Challenge",
    description:
      "Enhancing skills in Quantum Computing and Data Science. Includes 'The Great Mind Challenge', software discounts, and Subject Matter Expert (SME) certification for faculty.",
    tags: ["Quantum", "Research", "SME Certs"],
    icon: React.createElement(Cpu, { className: "size-6 text-white" }),
    color: "#2563eb", // Royal Blue
  },
  {
    id: "niit",
    title: "NIIT Foundation",
    subtitle: "Inclusive Skill Development",
    description:
      "Authorized CISCO Academy Support Center focusing on the underprivileged. Bridges the gap between industry demand and workforce supply through specialized ICT training.",
    tags: ["NGO Partnership", "Skill Dev", "Inclusive Ed"],
    icon: React.createElement(Users, { className: "size-6 text-white" }),
    color: "#d97706", // Amber
  },
  {
    id: "infosys",
    title: "Infosys",
    subtitle: "Campus Connect",
    description:
      "Strategic partnership to enhance IT education quality. Focuses on foundation programs, soft skills, and bridging the gap between academic output and industry requirements.",
    tags: ["Campus Connect", "Soft Skills", "Training"],
    icon: React.createElement(Globe, { className: "size-6 text-white" }),
    color: "#0284c7", // Light Blue
  },
];
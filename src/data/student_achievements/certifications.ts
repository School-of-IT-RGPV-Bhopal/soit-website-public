import React from "react";

import {
  Cloud,
  Globe,
  Server,
  Network,
  Terminal,
  Database
} from "lucide-react";


export type Certification = {
  provider: string;
  // count: number;
  icon: React.ReactNode;
  certifications: string[];
  gradient: string; // tailwind gradient classes
  accent: string; // tailwind text/ring accent
};

export const certifications: Certification[] = [
    {
      provider: "Amazon Web Services",
      // count: 30,
      icon: React.createElement(Cloud, { className: "size-5" }),
      certifications: [
        "AWS Certified Solutions Architect",
        "AWS Certified Developer",
        "AWS Certified Cloud Practitioner",
      ],
      gradient: "from-amber-500 to-orange-600",
      accent: "text-amber-600 ring-amber-200/70 bg-amber-600",
    },
    {
      provider: "Google Cloud",
      // count: 25,
      icon: React.createElement(Globe, { className: "size-5" }),
      certifications: [
        "Google Cloud Certified Professional",
        "Associate Cloud Engineer",
        "Cloud Digital Leader",
      ],
      gradient: "from-sky-500 to-cyan-500",
      accent: "text-sky-600 ring-sky-200/70 bg-sky-600",
    },
    {
      provider: "Microsoft Azure",
      // count: 20,
      icon: React.createElement(Server, { className: "size-5" }),
      certifications: ["Azure Fundamentals", "Azure Administrator", "Azure AI Engineer"],
      gradient: "from-indigo-500 to-blue-600",
      accent: "text-indigo-600 ring-indigo-200/70 bg-indigo-600",
    },
    {
      provider: "CompTIA & Cisco",
      // count: 15,
      icon: React.createElement(Network, { className: "size-5" }),
      certifications: ["CompTIA Security+", "Cisco CCNA", "CompTIA Network+"],
      gradient: "from-rose-500 to-red-600",
      accent: "text-rose-600 ring-rose-200/70 bg-rose-600",
    },
    {
      provider: "Red Hat & Linux",
      // count: 12,
      icon: React.createElement(Terminal, { className: "size-5" }),
      certifications: ["Red Hat Certified System Administrator", "Linux Professional Institute"],
      gradient: "from-slate-700 to-slate-900",
      accent: "text-slate-700 ring-slate-200/70 bg-slate-700",
    },
    {
      provider: "Oracle & Databases",
      // count: 10,
      icon: React.createElement(Database, { className: "size-5" }),
      certifications: ["Oracle Certified Associate", "MongoDB Certified Developer"],
      gradient: "from-orange-600 to-amber-600",
      accent: "text-orange-700 ring-orange-200/70 bg-orange-700",
    },
  ];

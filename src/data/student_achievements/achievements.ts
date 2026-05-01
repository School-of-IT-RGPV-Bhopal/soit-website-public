import React from "react";
import { Trophy, Code2, FlaskConical } from "lucide-react";

  export type Achievement = {
  title: string;
  student: string;
  year: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  accent: {
    chipBg: string;
    chipText: string;
    ring: string;
    glow: string;
    borderHover: string;
  };
};


export const achievements: readonly Achievement[] = [
    {
      title: "Samadhaan and AceHack winners",
      student: "Sophmore Students",
      year: "2025",
      description:
        "Built an AI-enabled solution for rural healthcare workflows and secured the Grand Finale win at national level.",
      category: "Hackathon",
      icon: React.createElement(Trophy, { className: "size-6" }),
      accent: {
        chipBg: "bg-amber-50",
        chipText: "text-amber-800",
        ring: "ring-amber-200/70",
        glow: "bg-amber-200/30",
        borderHover: "hover:border-amber-300/70",
      },
    },
    {
      title: "ACM ICPC Regionals Qualifier",
      student: "Students of SOIT",
      year: "2025",
      description:
        "Our students advanced to ACM ICPC Asia Regional Finals, demonstrating strong algorithmic thinking and teamwork.",
      category: "Competitive Programming",
      icon: React.createElement(Code2, { className: "size-6" }),
      accent: {
        chipBg: "bg-sky-50",
        chipText: "text-sky-800",
        ring: "ring-sky-200/70",
        glow: "bg-sky-200/30",
        borderHover: "hover:border-sky-300/70",
      },
    },
    {
      title: "National Snooker and Heyball Championship",
      student: "Soumya Singh",
      year: "2025",
      description:
        "Represented India in International Heyball Open Championship 2025 ",
      category: "Sports",
      icon: React.createElement(FlaskConical, { className: "size-6" }),
      accent: {
        chipBg: "bg-emerald-50",
        chipText: "text-emerald-800",
        ring: "ring-emerald-200/70",
        glow: "bg-emerald-200/30",
        borderHover: "hover:border-emerald-300/70",
      },
    },
    // {
    //   title: "Google Summer of Code Selection",
    //   student: "Rahul Verma, Ankit Singh",
    //   year: "2024",
    //   description:
    //     "Selected for GSoC and contributed to production-grade open-source projects across ML and web engineering.",
    //   category: "Open Source",
    //   icon: <Globe className="size-6" />,
    //   accent: {
    //     chipBg: "bg-violet-50",
    //     chipText: "text-violet-800",
    //     ring: "ring-violet-200/70",
    //     glow: "bg-violet-200/30",
    //     borderHover: "hover:border-violet-300/70",
    //   },
    // },
  ];
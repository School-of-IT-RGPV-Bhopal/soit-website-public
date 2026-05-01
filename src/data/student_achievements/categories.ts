import {
  GraduationCap,
  Trophy,
  Microscope,
  BadgeCheck,
  Rocket,
  Theater,
  LucideIcon,} from "lucide-react";


export  type Category = {
  title: string;
  icon: LucideIcon;
  achievements: string[];
  gradient: string; // tailwind gradient (for top accent)
  tint: string; // subtle icon chip tint
  dot: string; // bullet dot color
};

export const categories: Category[] = [
    {
      title: "Academic Excellence",
      icon: GraduationCap,
      achievements: [
        "University Gold Medalists: 15 students in the last 3 years",
        "CGPA above 9.0 achieved by 45% of students",
        "Multiple subject toppers every semester",
      ],
      gradient: "from-sky-500 to-cyan-500",
      tint: "bg-sky-50",
      dot: "bg-sky-600",
    },
    {
      title: "Technical Competitions",
      icon: Trophy,
      achievements: [
        "Smart India Hackathon: 3 national winners",
        "ACM ICPC: regional qualifications",
        "State-level hackathons: 20+ winners",
      ],
      gradient: "from-fuchsia-500 to-pink-500",
      tint: "bg-fuchsia-50",
      dot: "bg-fuchsia-600",
    },
    {
      title: "Research & Publications",
      icon: Microscope,
      achievements: [
        "50+ papers in IEEE/Springer conferences",
        "10+ papers in SCI-indexed journals",
        "Student-led research projects with faculty",
      ],
      gradient: "from-emerald-500 to-teal-500",
      tint: "bg-emerald-50",
      dot: "bg-emerald-600",
    },
    {
      title: "Industry Certifications",
      icon: BadgeCheck,
      achievements: [
        "AWS Certified: 30+ students",
        "Google Cloud Certified: 25+ students",
        "Microsoft Azure Certified: 20+ students",
      ],
      gradient: "from-amber-500 to-orange-500",
      tint: "bg-amber-50",
      dot: "bg-amber-700",
    },
    {
      title: "Entrepreneurship",
      icon: Rocket,
      achievements: [
        "5 student-led startups launched",
        "E-Cell event winners",
        "Business plan competition participants",
      ],
      gradient: "from-indigo-500 to-violet-500",
      tint: "bg-indigo-50",
      dot: "bg-indigo-600",
    },
    {
      title: "Cultural & Sports",
      icon: Theater,
      achievements: [
        "Inter-college fest winners",
        "Sports tournament champions",
        "Cultural event organizers",
      ],
      gradient: "from-rose-500 to-pink-500",
      tint: "bg-rose-50",
      dot: "bg-rose-600",
    },
  ];
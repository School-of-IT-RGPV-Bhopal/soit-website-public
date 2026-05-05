import {
  LucideIcon,
  Music,
  Trophy,
  Sparkles,
  PartyPopper,
  Calendar,
  GraduationCap,
} from "lucide-react";

export type Event = {
  icon: LucideIcon;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
};

export const events: Event[] = [
  {
    icon: Music,
    name: "Vichar Sangam 2.0",
    type: "Persona's Flagship Event",
    description:
      "Vichaar Sangam 2.0 was organized in 2025 by the Persona SOIT Club as a two-day event. It aimed at holistic personality and communication development among students.\n\nThe event included a three-round Group Discussion (GD) competition. Ace × Persona, a TEDx-style segment, allowed participants to present impactful ideas. A General Knowledge Quiz was also conducted to test awareness and thinking skills.",
    imageUrl: "/images/vichaar-sangam.jpeg",
  },
  {
    icon: Sparkles,
    name: "AI Odyssey",
    type: "Google Developers Group AI Odyssey",
    description:
      "AI Odyssey 2026, organized by GDG SOIT, is a flagship student-driven event focused on fostering innovation and hands-on learning in Artificial Intelligence.\n\nIt was a high-energy AI event featuring a blend of knowledge-driven and competitive activities including a tech quiz, mini hackathon, and creative challenges, designed to promote innovation and practical application",
    imageUrl: "/assets/GalleryImages/Rangotsav.jpeg",
  },
    {
    icon: Trophy,
    name: "Fibohack Hackathon",
    type: "Hackathon",
    description:
      "A competitive coding event where students collaborate to solve real-world problems and build innovative solutions under time constraints.\n\nWinners of Fibohack 1.0:\n\n1st Place - Team Quantum Coders\n2nd Place - Team Quantum leap\n3rd Place - Team Dubug Dev",
    imageUrl: "/assets/GalleryImages/Fibohack.jpeg",
  },
  {
    icon: Trophy,
    name: "AWS S3 Static Website Hosting",
    type: "AWS Builder Group Event",
    description:
      "The AWS Student Builder Group at the School of Information Technology, RGPV (formerly AWS Cloud Club – SOIT RGPV) conducted an online hands-on session on 23rd April 2026 focused on static website hosting using AWS S3.\n\nThe session enabled students to build and deploy their own portfolio websites, providing practical exposure to cloud computing. It reflects the group’s focus on hands-on, industry-relevant learning.",
    imageUrl: "/assets/GalleryImages/aws-static-hosting.jpeg",
  },
  // {
  //   icon: PartyPopper,
  //   name: "Rasotsav",
  //   type: "Dance Festival",
  //   description:
  //     "Rasotsav is a vibrant Navratri dance festival that celebrates the spirit of devotion, tradition, and community through energetic Garba and Dandiya Raas. Vichaar Sangam 2.0 was a two-day intellectual inter college event that featured engaging competitions like Group Discussions, Quiz Odyssey, and Lecturate.",
  //   imageUrl: "/images/soitrgpv_building.png",
  // },
  {
    icon: Calendar,
    name: "Deeksharambh",
    type: "Orientation Program",
    description:
      "The official welcome ceremony for new students, marking the beginning of their journey at our institution.\n\nThis is a week long programme to help acquaint freshers with the college, it's internal working, the scheme and syllabus, academic structure, campus life, institutional values, and student development opportunities along with the various clubs and committees of the School of Information Technology, RGPV.",
    imageUrl: "/images/deeksharambh.JPG",
  },
  {
    icon: GraduationCap,
    name: "Adhyaant",
    type: "Convocation",
    description:
      "Adhyant - The Convocation of the Batch 2021–2025 at the School of Information Technology, RGPV.\n\nAdhyant signifies the successful completion of an important academic chapter. It is a proud moment that honours years of perseverance, knowledge, and personal growth. ",
    imageUrl: "/assets/GalleryImages/Adhyaant.jpeg",
  },
];

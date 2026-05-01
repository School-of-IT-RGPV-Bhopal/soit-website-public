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
    type: "Cultural Festival",
    description:
      "Vichaar Sangam 2.0 was a two-day intellectual inter college event that featured engaging competitions like Group Discussions, Quiz Odyssey, and Lecturate.",
    imageUrl: "/images/vichaar-sangam.jpeg",
  },
  {
    icon: Trophy,
    name: "Fibohack Hackathon",
    type: "Hackathon",
    description:
      "A competitive coding event where students collaborate to solve real-world problems and build innovative solutions under time constraints.",
    imageUrl: "/assets/GalleryImages/Fibohack.jpeg",
  },
  {
    icon: Sparkles,
    name: "Rangotsav",
    type: "Arts Festival",
    description:
      "A vibrant celebration of colors and creativity through art exhibitions, workshops, and competitions that bring out the artist in everyone.",
    imageUrl: "/assets/GalleryImages/Rangotsav.jpeg",
  },
  {
    icon: PartyPopper,
    name: "Rasotsav",
    type: "Dance Festival",
    description:
      "Rasotsav is a vibrant Navratri dance festival that celebrates the spirit of devotion, tradition, and community through energetic Garba and Dandiya Raas.",
    imageUrl: "/images/soitrgpv_building.png",
  },
  {
    icon: Calendar,
    name: "Deeksharambh",
    type: "Orientation Program",
    description:
      "The official welcome ceremony for new students, marking the beginning of their journey at our institution.",
    imageUrl: "/images/deeksharambh.JPG",
  },
  {
    icon: GraduationCap,
    name: "Adhyaant",
    type: "Convocation",
    description:
      "The most prestigious event celebrating academic achievement as students receive their degrees and embark on new beginnings.",
    imageUrl: "/assets/GalleryImages/Adhyaant.jpeg",
  },
];

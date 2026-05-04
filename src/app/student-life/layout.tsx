import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Life - School of Information Technology, RGPV Bhopal",
  description: "Experience vibrant student life at School of Information Technology, RGPV with diverse clubs, cultural events, festivals, sports activities, and student engagement programs. Discover academic blocks, city of Bhopal, and holistic development opportunities.",
  keywords: [
    "RGPV student life",
    "SOIT RGPV campus culture",
    "UIT RGPV student activities",
    "RGPV clubs and committees",
    "Student engagement RGPV",
    "Campus events RGPV",
    "Cultural activities RGPV",
    "Festival celebrations RGPV",
    "Sports activities RGPV",
    "Student development RGPV",
    "Academic blocks RGPV",
    "Administrative blocks RGPV",
    "Bhopal city life",
    "Student community RGPV",
    "Extracurricular activities RGPV",
    "Student organizations RGPV",
    "Campus facilities RGPV",
    "Student support services RGPV",
    "Holistic education RGPV",
    "Student welfare RGPV",
    "Campus connectivity RGPV",
    "Student networking RGPV",
    "Leadership development RGPV",
    "Skill development programs RGPV",
    "Student mentorship RGPV"
  ],
  openGraph: {
    title: "Student Life - School of Information Technology, RGPV Bhopal",
    description: "Discover the vibrant student life at School of Information Technology, RGPV Bhopal with diverse clubs, events, and development opportunities for holistic growth.",
    url: "https://soitrgpv.ac.in/student-life",
    images: [
      {
        url: "/images/soitrgpv_building.png",
        width: 1200,
        height: 630,
        alt: "SOIT RGPV Student Life and Campus Activities",
      },
    ],
  },
  twitter: {
    title: "Student Life - School of Information Technology, RGPV Bhopal",
    description: "Vibrant campus culture and student activities at School of Information Technology, RGPV Bhopal.",
    images: ["/images/soitrgpv_building.png"],
  },
  alternates: {
    canonical: "https://soitrgpv.ac.in/student-life",
  },
};

export default function StudentLifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
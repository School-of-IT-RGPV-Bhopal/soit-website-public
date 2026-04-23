import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Achievements at SOIT RGPV - Awards, Competitions & Recognition",
  description: "Outstanding student achievements at SOIT RGPV including Smart India Hackathon winners, ACM ICPC qualifications, research publications, industry certifications, and academic excellence. Our students excel in technical competitions, research, and innovation.",
  keywords: [
    "RGPV student achievements",
    "SOIT RGPV awards",
    "Smart India Hackathon RGPV winners",
    "ACM ICPC RGPV",
    "RGPV hackathon winners",
    "Student competitions RGPV",
    "Technical achievements RGPV",
    "Research publications RGPV students",
    "IEEE papers RGPV",
    "Industry certifications RGPV",
    "AWS certified students RGPV",
    "Google Cloud certified RGPV",
    "Microsoft Azure RGPV",
    "Academic excellence RGPV",
    "University gold medalists RGPV",
    "CGPA toppers RGPV",
    "Student innovation RGPV",
    "Entrepreneurship RGPV",
    "Startup founders RGPV",
    "Cultural achievements RGPV",
    "Sports achievements RGPV",
    "Student recognition RGPV",
    "Merit scholarships RGPV",
    "Academic honors RGPV",
    "Competition winners Bhopal"
  ],
  openGraph: {
    title: "Student Achievements at SOIT RGPV - Excellence in Innovation & Competition",
    description: "Celebrating outstanding student achievements including hackathon victories, research excellence, and industry recognition at RGPV Bhopal.",
    url: "https://soitrgpv.ac.in/student-achievements",
    images: [
      {
        url: "/images/achievements-bg.jpeg",
        width: 1200,
        height: 630,
        alt: "SOIT RGPV Student Achievements and Awards",
      },
    ],
  },
  twitter: {
    title: "Student Achievements at SOIT RGPV",
    description: "Outstanding achievements by RGPV students in competitions, research, and innovation.",
    images: ["/images/achievements-bg.jpeg"],
  },
  alternates: {
    canonical: "https://soitrgpv.ac.in/student-achievements",
  },
};

export default function StudentAchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
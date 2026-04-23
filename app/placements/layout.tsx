import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Placements at SOIT RGPV - 95%+ Placement Record | Top Companies Recruitment",
  description: "Excellent placement opportunities at SOIT RGPV with 95%+ placement record. Top companies like TCS, Infosys, Wipro, Amazon, Microsoft recruit from our Computer Science and IT programs. Highest package: ₹45 LPA, Average package: ₹8.5 LPA.",
  keywords: [
    "RGPV placements",
    "SOIT RGPV placement statistics",
    "UIT RGPV placement record",
    "Computer Science placements RGPV",
    "IT placements Bhopal",
    "RGPV recruitment companies",
    "TCS placement RGPV",
    "Infosys recruitment RGPV",
    "Amazon jobs RGPV",
    "Microsoft hiring RGPV",
    "Highest package RGPV",
    "Average salary RGPV",
    "Campus placement RGPV",
    "Engineering jobs Bhopal",
    "RGPV placement cell",
    "Career opportunities RGPV",
    "Industry partnerships RGPV",
    "Job placement assistance",
    "Corporate recruitment RGPV",
    "Placement training RGPV",
    "Interview preparation RGPV",
    "Skill development RGPV",
    "Career guidance RGPV",
    "Employment statistics RGPV",
    "Placement trends RGPV"
  ],
  openGraph: {
    title: "Placements at SOIT RGPV - 95%+ Placement Record | Top Companies",
    description: "Outstanding placement opportunities with top companies recruiting from RGPV. Highest package ₹45 LPA, excellent career prospects in Computer Science and IT.",
    url: "https://soitrgpv.ac.in/placements",
    images: [
      {
        url: "/images/placements-hero.jpg",
        width: 1200,
        height: 630,
        alt: "SOIT RGPV Placements - Top Company Recruitments",
      },
    ],
  },
  twitter: {
    title: "Placements at SOIT RGPV - 95%+ Placement Record",
    description: "Excellent placement opportunities with top companies at RGPV Bhopal.",
    images: ["/images/placements-hero.jpg"],
  },
  alternates: {
    canonical: "https://soitrgpv.ac.in/placements",
  },
};

export default function PlacementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
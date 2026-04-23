import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Amenities at SOIT RGPV - World-Class Facilities | UIT RGPV Bhopal",
  description: "Explore world-class campus amenities at SOIT RGPV including modern auditorium, sports complex, central library, hostels, cafeteria, health center, and state-of-the-art academic facilities. Experience the best infrastructure for holistic education at RGPV Bhopal.",
  keywords: [
    "RGPV campus facilities",
    "SOIT RGPV amenities",
    "UIT RGPV infrastructure",
    "RGPV auditorium",
    "RGPV sports complex",
    "RGPV central library",
    "RGPV hostels",
    "RGPV cafeteria",
    "RGPV health center",
    "Campus facilities Bhopal",
    "RGPV academic blocks",
    "RGPV administrative block",
    "RGPV guest house",
    "RGPV temple",
    "RGPV shopping center",
    "RGPV electric substation",
    "RGPV officers housing",
    "RGPV lecture theatre",
    "RGPV women facilitation center",
    "RGPV campus map",
    "RGPV girls hostel",
    "RGPV boys hostel",
    "RGPV transit hostel",
    "RGPV central workshop",
    "RGPV post office",
    "RGPV bank",
    "Engineering college facilities",
    "Campus infrastructure Madhya Pradesh",
    "Student amenities RGPV",
    "Residential facilities RGPV"
  ],
  openGraph: {
    title: "Campus Amenities at SOIT RGPV - World-Class Facilities",
    description: "Discover modern campus facilities and amenities at RGPV Bhopal including sports complex, library, hostels, and academic infrastructure.",
    url: "https://soitrgpv.ac.in/amenities",
    images: [
      {
        url: "/assets/GalleryImages/MainBuilding.jpeg",
        width: 1200,
        height: 630,
        alt: "SOIT RGPV Campus Facilities and Amenities",
      },
    ],
  },
  twitter: {
    title: "Campus Amenities at SOIT RGPV",
    description: "World-class campus facilities and infrastructure at RGPV Bhopal.",
    images: ["/assets/GalleryImages/MainBuilding.jpeg"],
  },
  alternates: {
    canonical: "https://soitrgpv.ac.in/amenities",
  },
};

export default function AmenitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
import type { Metadata } from "next";
import {
  Geist,
  Inter,
  Poppins,
  Playfair_Display,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SiteUsageNotice from "@components/SiteUsageNotice";
import SplashScreen from "@components/SplashScreen";
import ChatWidget from "@components/faq/ChatWidget";
import TourProvider from "@lib/tour/TourProvider";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { GoogleAnalytics } from "@next/third-parties/google";
import AxeProvider from "./AxeProvider";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { siteContact } from "@lib/siteContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://soitrgpv.ac.in'),
  manifest: "/manifest.ts",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  title: {
    default: "SOIT RGPV - School of Information Technology, RGPV Bhopal",
    template: "%s | SOIT RGPV"
  },
  description: "School of Information Technology (SOIT), RGPV Bhopal. Offering world-class B.Tech & M.Tech programs in Computer Science, IT, AI/ML with 95%+ placement record, industry partnerships, research excellence and state-of-the-art facilities.",
  keywords: [
    "SOIT RGPV",
    "School of Information Technology RGPV", 
    "UIT RGPV",
    "University Institute of Technology RGPV",
    "RGPV Bhopal",
    "RGPV engineering college",
    "Computer Science RGPV",
    "IT engineering Bhopal",
    "B.Tech Computer Science RGPV",
    "M.Tech RGPV",
    "RGPV placements",
    "RGPV admissions",
    "Engineering college Madhya Pradesh",
    "Technical education Bhopal",
    "RGPV courses",
    "RGPV faculty",
    "RGPV campus",
    "RGPV student life",
    "RGPV research",
    "RGPV achievements",
    "RGPV hackathon",
    "Smart India Hackathon RGPV",
    "RGPV alumni",
    "RGPV facilities",
    "RGPV hostel",
    "RGPV library",
    "RGPV sports",
    "RGPV cultural activities",
    "RGPV placement statistics",
    "Top companies RGPV",
    "RGPV recruitment",
    "RGPV industry partnerships",
    "RGPV innovation",
    "RGPV startup",
    "RGPV entrepreneurship",
    "RGPV certification programs",
    "AWS certification RGPV",
    "Google Cloud RGPV",
    "Microsoft Azure RGPV",
    "RGPV technical competitions",
    "ACM ICPC RGPV",
    "RGPV coding competitions",
    "RGPV research publications",
    "IEEE papers RGPV",
    "RGPV conferences",
    "RGPV seminars",
    "RGPV workshops",
    "Best engineering college Madhya Pradesh",
    "Top engineering college India",
    "Engineering admission 2024",
    "Computer Science engineering Bhopal"
  ],
  authors: [{ name: "SOIT RGPV" }],
  creator: "SOIT RGPV",
  publisher: "School of Information Technology, RGPV",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://soitrgpv.ac.in",
    siteName: "SOIT RGPV - School of Information Technology",
<<<<<<< HEAD:src/app/layout.tsx
    title: "SOIT RGPV - School of Information Technology, UTD RGPV Bhopal",
    description: "Leading School of Information Technology at RGPV Bhopal offering world-class engineering education, research opportunities, and excellent placement records in Computer Science and IT with 95%+ placement record.",
=======
    title: "SOIT RGPV - School of Information Technology, RGPV Bhopal",
    description: "School of Information Technology (SOIT) at RGPV Bhopal offering world-class engineering education, research opportunities, and excellent placement records in Computer Science and IT.",
>>>>>>> cd22ff1 (refactor: update SEO metadata and normalize branding terminology across site):app/layout.tsx
    images: [
      {
        url: "/images/campus-hero.jpg",
        width: 1200,
        height: 630,
        alt: "SOIT RGPV Campus - School of Information Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
<<<<<<< HEAD:src/app/layout.tsx
    title: "SOIT RGPV - School of Information Technology, UTD RGPV Bhopal",
    description: "Leading engineering education at RGPV Bhopal with 95%+ placements, world-class faculty, research excellence and industry partnerships in Computer Science and IT.",
=======
    title: "SOIT RGPV - School of Information Technology, RGPV Bhopal",
    description: "Leading engineering education at RGPV Bhopal with good placements, world-class faculty, and research excellence in Computer Science and IT.",
>>>>>>> cd22ff1 (refactor: update SEO metadata and normalize branding terminology across site):app/layout.tsx
    images: ["/images/campus-hero.jpg"],
  },
  alternates: {
    canonical: "https://soitrgpv.ac.in",
  },
<<<<<<< HEAD:src/app/layout.tsx
  // TODO: Add
  // verification: {
  //   google: "your-google-verification-code", // Add actual verification code
  // },
=======
  verification: {
    google: "your-google-verification-code",
  },
>>>>>>> cd22ff1 (refactor: update SEO metadata and normalize branding terminology across site):app/layout.tsx
  category: "Education",
  classification: "Engineering College",
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Bhopal, Madhya Pradesh",
    "geo.position": "23.2599;77.4126",
    "ICBM": "23.2599, 77.4126",
    "DC.title": "SOIT RGPV - School of Information Technology",
    "DC.creator": "SOIT RGPV",
    "DC.subject": "Engineering Education, Computer Science, Information Technology",
    "DC.description": "School of Information Technology at RGPV Bhopal offering quality engineering education",
    "DC.publisher": "RGPV",
    "DC.contributor": "School of Information Technology",
    "DC.date": new Date().toISOString(),
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": "https://soitrgpv.ac.in",
    "DC.language": "en",
    "DC.coverage": "Bhopal, Madhya Pradesh, India",
    "DC.rights": "Copyright SOIT RGPV"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://soitrgpv.ac.in/#organization",
        "name": "School of Information Technology, RGPV Bhopal",
        "alternateName": ["SOIT RGPV", "SOIT"],
        "url": "https://soitrgpv.ac.in",
        "logo": {
          "@type": "ImageObject",
          // TODO: Add actual logo URL
          "url": "https://soitrgpv.ac.in/images/logo.png"
        },
        "description": "School of Information Technology, RGPV Bhopal offering world-class engineering education in Computer Science and Information Technology with excellent placement records.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "RGPV Campus",
          "addressLocality": "Bhopal",
          "addressRegion": "Madhya Pradesh",
          "postalCode": siteContact.postalCode,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 23.2599,
          "longitude": 77.4126
        },
        "telephone": siteContact.phoneDisplay,
        "email": siteContact.email,
        "foundingDate": "2000",
        "parentOrganization": {
          "@type": "EducationalOrganization",
          "name": "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
          "alternateName": "RGPV"
        },
        "department": [
          {
            "@type": "EducationalOrganization",
            "name": "Computer Science and Engineering",
            "description": "Department offering B.Tech and M.Tech programs in Computer Science"
          },
          {
            "@type": "EducationalOrganization", 
            "name": "Information Technology",
            "description": "Department offering B.Tech and M.Tech programs in Information Technology"
          }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Bachelor of Technology in Computer Science",
            "credentialCategory": "degree"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Master of Technology in Computer Science",
            "credentialCategory": "degree"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://soitrgpv.ac.in/#website",
        "url": "https://soitrgpv.ac.in",
        "name": "SOIT RGPV - School of Information Technology",
        "description": "Official website of School of Information Technology, RGPV Bhopal",
        "publisher": {
          "@id": "https://soitrgpv.ac.in/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://soitrgpv.ac.in/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "CollegeOrUniversity",
        "@id": "https://soitrgpv.ac.in/#college",
        "name": "School of Information Technology, RGPV Bhopal",
        "alternateName": ["SOIT RGPV", "SOIT"],
        "url": "https://soitrgpv.ac.in",
        "description": "Premier School of Information Technology under RGPV offering undergraduate and postgraduate programs in Computer Science and Information Technology.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bhopal",
          "addressRegion": "Madhya Pradesh", 
          "addressCountry": "IN"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Academic Programs",
          "itemListElement": [
            {
              "@type": "Course",
              "name": "Bachelor of Technology in Computer Science Engineering",
              "description": "4-year undergraduate program in Computer Science and Engineering",
              "provider": {
                "@id": "https://soitrgpv.ac.in/#organization"
              }
            },
            {
              "@type": "Course", 
              "name": "Bachelor of Technology in Information Technology",
              "description": "4-year undergraduate program in Information Technology",
              "provider": {
                "@id": "https://soitrgpv.ac.in/#organization"
              }
            },
            {
              "@type": "Course",
              "name": "Master of Technology in Computer Science",
              "description": "2-year postgraduate program in Computer Science",
              "provider": {
                "@id": "https://soitrgpv.ac.in/#organization"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Bhopal, Madhya Pradesh" />
        <meta name="geo.position" content="23.2599;77.4126" />
        <meta name="ICBM" content="23.2599, 77.4126" />
        
        <meta name="institution-type" content="Engineering College" />
        <meta name="education-level" content="Higher Education" />
        <meta name="academic-year" content="2024-25" />
        
        <meta property="business:contact_data:locality" content="Bhopal" />
        <meta property="business:contact_data:region" content="Madhya Pradesh" />
        <meta property="business:contact_data:country_name" content="India" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        <link rel="canonical" href="https://soitrgpv.ac.in" />
        <link rel="alternate" hrefLang="en-IN" href="https://soitrgpv.ac.in" />
        <link rel="alternate" hrefLang="hi-IN" href="https://soitrgpv.ac.in/hi" />
        
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        <link rel="alternate" type="application/rss+xml" title="SOIT RGPV News & Events" href="/rss.xml" />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${inter.variable}
          ${poppins.variable}
          ${playfair.variable}
          antialiased
        `}
      >
        <AxeProvider /> {/* Accessibility Testing */}
        <SplashScreen />
        <SiteUsageNotice />
        <TourProvider />
        <div className="fixed inset-x-0 top-0 z-50 flex flex-col">
          <Header />
        </div>
        {/* Add padding to account for fixed header */}
        <main className="page-wrapper pt-20">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
        <ChatWidget />
        <AccessibilityWidget /> {/* Accessibility Widget */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}

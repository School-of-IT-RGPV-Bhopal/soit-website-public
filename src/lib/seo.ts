import { Metadata } from 'next'
import { siteContact } from "@lib/siteContact";

export const siteConfig = {
  name: "SOIT RGPV - School of Information Technology",
  description: "Premier School of Information Technology at University Institute of Technology, RGPV Bhopal offering world-class engineering education in Computer Science and IT with excellent placement records.",
  url: "https://soitrgpv.ac.in",
  ogImage: "/images/campus-hero.jpg",
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
    "Technical education Bhopal"
  ]
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  keywords = siteConfig.keywords,
  canonicalUrl,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  keywords?: string[]
  canonicalUrl?: string
} = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl || siteConfig.url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@soitrgpv",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "School of Information Technology, RGPV",
  "alternateName": ["SOIT RGPV", "UIT RGPV"],
  "url": "https://soitrgpv.ac.in",
  "logo": "https://soitrgpv.ac.in/images/logo.png",
  "description": siteConfig.description,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "University Institute of Technology, RGPV",
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
  "foundingDate": "2004",
  "parentOrganization": {
    "@type": "EducationalOrganization",
    "name": "Rajiv Gandhi Proudyogiki Vishwavidyalaya"
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "description": siteConfig.description,
  "publisher": {
    "@type": "Organization",
    "name": "SOIT RGPV"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
}

// SEO-friendly URL generation
export function generateSEOUrl(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Meta tags for different page types
export const pageMetaTags = {
  homepage: {
    title: "SOIT RGPV - School of Information Technology | UIT RGPV Bhopal",
    description: "Leading School of Information Technology at RGPV Bhopal offering world-class B.Tech & M.Tech programs in Computer Science, IT, AI/ML with 95%+ placement record and industry partnerships.",
    keywords: [
      ...siteConfig.keywords,
      "RGPV homepage",
      "Best engineering college Madhya Pradesh",
      "Top engineering college India",
      "Engineering admission 2024"
    ]
  },
  placements: {
    title: "Placements at SOIT RGPV - 95%+ Placement Record | Top Companies",
    description: "Excellent placement opportunities at SOIT RGPV with 95%+ placement record. Top companies like TCS, Infosys, Amazon, Microsoft recruit from our programs.",
    keywords: [
      "RGPV placements",
      "SOIT RGPV placement statistics", 
      "Campus placement RGPV",
      "Engineering jobs Bhopal",
      "Highest package RGPV"
    ]
  },
  achievements: {
    title: "Student Achievements at SOIT RGPV - Awards & Recognition",
    description: "Outstanding student achievements including Smart India Hackathon winners, research publications, industry certifications, and academic excellence at RGPV.",
    keywords: [
      "RGPV student achievements",
      "Smart India Hackathon RGPV",
      "Student competitions RGPV",
      "Academic excellence RGPV"
    ]
  },
  amenities: {
    title: "Campus Amenities at SOIT RGPV - World-Class Facilities",
    description: "Explore modern campus amenities including auditorium, sports complex, library, hostels, and state-of-the-art academic facilities at RGPV Bhopal.",
    keywords: [
      "RGPV campus facilities",
      "SOIT RGPV amenities",
      "Campus infrastructure Bhopal",
      "Student facilities RGPV"
    ]
  }
}

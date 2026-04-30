import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SOIT RGPV - School of Information Technology",
    short_name: "SOIT RGPV",
    description:
      "School of Information Technology at RGPV Bhopal offering world-class engineering education",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0080",
    orientation: "portrait",
    categories: ["education", "engineering", "technology"],
    lang: "en-IN",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32",
        type: "image/x-icon",
      },
      {
        src: "/images/logo.jpg",
        sizes: "1938x2167",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}

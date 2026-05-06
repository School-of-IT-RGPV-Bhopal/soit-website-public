"use client";

import { useEffect } from "react";
import Gallery from "@components/Gallery";
import { setupFadeUpAnimations } from "@utils/animations";

export default function GalleryPage() {
  useEffect(() => {
    const cleanup = setupFadeUpAnimations();
    return cleanup;
  }, []);

  return <Gallery />;
}
//This is the Gallery function 

"use client";

import { useEffect } from "react";
import Contact from "@components/Contact";
import { setupFadeUpAnimations } from "@utils/animations";

export default function ContactPage() {
  useEffect(() => {
    const cleanup = setupFadeUpAnimations();
    return cleanup;
  }, []);

  return <Contact />;
}

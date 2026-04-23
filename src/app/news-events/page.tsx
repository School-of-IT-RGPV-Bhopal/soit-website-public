"use client";

import { useEffect } from "react";
import NewsEvents from "@components/NewsEvents";
import { setupFadeUpAnimations } from "@utils/animations";

export default function NewsEventsPage() {
  useEffect(() => {
    const cleanup = setupFadeUpAnimations();
    return cleanup;
  }, []);

  return <NewsEvents />;
}

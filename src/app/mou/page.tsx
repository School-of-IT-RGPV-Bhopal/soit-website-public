"use client";

import { useEffect } from "react";
import MOU from "@components/MOU";
import { setupFadeUpAnimations } from "@utils/animations";

export default function MOUPage() {
  useEffect(() => {
    const cleanup = setupFadeUpAnimations();
    return cleanup;
  }, []);

  return <MOU />;
}

"use client";

import { useEffect } from "react";
import Programs from "@components/Programs";
import Admissions from "@components/Admissions";
import { setupFadeUpAnimations } from "@utils/animations";

export default function AcademicsPage() {
  useEffect(() => {
    const cleanup = setupFadeUpAnimations();
    return cleanup;
  }, []);

  return (
    <>
      <div data-tour="academics-programs">
        <Programs />
      </div>
      <div data-tour="academics-admissions">
        <Admissions />
      </div>
    </>
  );
}

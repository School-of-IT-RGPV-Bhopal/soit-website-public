import type { DriveStep } from "driver.js";

export const placementsSteps: DriveStep[] = [
  {
    element: '[data-tour="placements-hero"]',
    popover: {
      title: "Placements Overview",
      description:
        "This hero section introduces SOIT placements and sets context for outcomes, partners, and opportunities.",
    },
  },
  {
    element: '[data-tour="placements-why-recruit"]',
    popover: {
      title: "Why Recruit Here",
      description:
        "This section explains the strengths that make SOIT students attractive to recruiters and industry teams.",
    },
  },
  {
    element: '[data-tour="placements-message"]',
    popover: {
      title: "Placement Message",
      description:
        "Read this message for the placement vision and the institute's focus on career readiness.",
    },
  },
  {
    element: '[data-tour="placements-highlights"]',
    popover: {
      title: "Key Highlights",
      description:
        "Use these highlights to quickly understand achievements and milestone outcomes in the placement journey.",
    },
  },
  {
    element: '[data-tour="placements-recruiters"]',
    popover: {
      title: "Recruiting Partners",
      description:
        "This section showcases companies and hiring partners who engage with SOIT talent.",
    },
  },
  {
    element: '[data-tour="placements-contact"]',
    popover: {
      title: "Placement Contact",
      description:
        "Use this contact area when you want direct placement-related support or collaboration details.",
    },
  },
];
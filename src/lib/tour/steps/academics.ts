import type { DriveStep } from "driver.js";

export const academicsSteps: DriveStep[] = [
  {
    element: '[data-tour="academics-programs"]',
    popover: {
      title: "Program Catalog",
      description:
        "Browse this section to explore degree options, curriculum tracks, and learning pathways at SOIT.",
    },
  },
  {
    element: '[data-tour="academics-admissions"]',
    popover: {
      title: "Admission Guidance",
      description:
        "Use this section to understand eligibility, counseling flow, and the admission process clearly.",
    },
  },
];
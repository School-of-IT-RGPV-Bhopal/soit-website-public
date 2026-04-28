import type { DriveStep } from "driver.js";

export const gallerySteps: DriveStep[] = [
  {
    element: '[data-tour="gallery-intro"]',
    popover: {
      title: "Gallery Overview",
      description:
        "This header introduces the campus gallery and sets the context for the images below.",
    },
  },
  {
    element: '[data-tour="gallery-mode-toggle"]',
    popover: {
      title: "View Modes",
      description:
        "Use these options to explore the same photo collection in a few different layouts.",
    },
  },
  {
    element: '[data-tour="gallery-stage"]',
    popover: {
      title: "Interactive Display",
      description:
        "This panel holds the live gallery experience and shows the campus moments in motion.",
    },
  },
  {
    element: '[data-tour="gallery-featured-image"]',
    popover: {
      title: "Featured Moment",
      description:
        "This image is one sample from the collection and can be opened for a closer look.",
    },
  },
];
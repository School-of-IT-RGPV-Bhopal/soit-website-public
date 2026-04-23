import type { DriveStep } from "driver.js";

export const homeSteps: DriveStep[] = [
  {
    element: '[data-tour="home-hero-section"]',
    popover: {
      title: "Welcome Overview",
      description:
        "This opening section gives you a quick snapshot of SOIT and the student experience.",
    },
  },
  {
    element: '[data-tour="home-hero-headline"]',
    popover: {
      title: "SOIT Identity",
      description:
        "This headline introduces the institute and helps you confirm you are on the official home page.",
    },
  },
  {
    element: '[data-tour="home-apply-cta"]',
    popover: {
      title: "Admissions Link",
      description:
        "Use this direct admissions button when you are ready to start your application journey.",
    },
  },
  {
    element: '[data-tour="home-about-section"]',
    popover: {
      title: "About SOIT",
      description:
        "This section summarizes the institute's foundation, values, and academic direction.",
    },
  },
  {
    element: '[data-tour="home-vision-card"]',
    popover: {
      title: "Vision Focus",
      description:
        "Open this card to read the institute vision and understand its long-term student goals.",
    },
  },
  {
    element: '[data-tour="home-faculty-section"]',
    popover: {
      title: "Faculty Strength",
      description:
        "Explore this section to discover mentors and experts guiding student learning and research.",
    },
  },
  {
    element: '[data-tour="home-research-section"]',
    popover: {
      title: "Research Tracks",
      description:
        "These highlights show the major research domains where students can build advanced skills.",
    },
  },
];

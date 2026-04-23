import type { DriveStep } from "driver.js";

export const studentLifeSteps: DriveStep[] = [
  {
    element: '[data-tour="student-life-hero"]',
    popover: {
      title: "Student Life Intro",
      description:
        "This opening banner introduces how life at SOIT blends academics, events, and student growth.",
    },
  },
  {
    element: '[data-tour="student-life-student-engagement"]',
    popover: {
      title: "Student Development",
      description:
        "This section focuses on activities that build confidence, leadership, and practical student skills.",
    },
  },
  {
    element: '[data-tour="student-life-academic-blocks"]',
    popover: {
      title: "Academic Blocks",
      description:
        "This section highlights the academic and administrative spaces that support your day-to-day campus journey.",
    },
  },
  {
    element: '[data-tour="student-life-events"]',
    popover: {
      title: "Campus Events",
      description:
        "Explore this section to discover festivals, activities, and celebrations that energize student life.",
    },
  },
  {
    element: '[data-tour="student-life-clubs"]',
    popover: {
      title: "Clubs and Committees",
      description:
        "Find the clubs and committees where you can lead, collaborate, and build practical skills.",
    },
  },
  {
    element: '[data-tour="student-life-city-bhopal"]',
    popover: {
      title: "City and Campus",
      description:
        "This section gives context about Bhopal and how city opportunities complement campus life.",
    },
  },
  {
    element: '[data-tour="student-life-connect"]',
    popover: {
      title: "Connect With SOIT",
      description:
        "Use this final section to stay connected and reach out for student-facing support or information.",
    },
  },
];
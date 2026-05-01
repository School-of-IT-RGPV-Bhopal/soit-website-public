export type CampusBlock = {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
};

export const blocks: CampusBlock[] = [
  {
    id: "academic",
    title: "Academic Block",
    description:
      "The Academic Block houses modern classrooms and learning spaces designed to support interactive and technology-enabled teaching.",
    features: [
      "Smart Classrooms",
      "Seminar Halls",
      "Case Study Rooms",
      "Faculty Cabins",
    ],
    imageUrl: "/assets/GalleryImages/MainBuilding.jpeg",
  },
  {
    id: "administrative",
    title: "Administrative Block",
    description:
      "The Administrative Block is the hub of institutional management, ensuring smooth academic and student services operations.",
    features: [
      "Director's Office",
      "Registrar Office",
      "Accounts Department",
      "Student Services",
    ],
    imageUrl: "/assets/GalleryImages/DeptLib.jpeg",
  },
  {
    id: "computer-centre",
    title: "Knowledge Resource Center",
    description:
      "The Knowledge Resource Center provides students with access to computing resources, study spaces, and technical support for academic work.",
    features: [
      "High-Speed Internet",
      "24/7 Lab Access",
      "Latest Software",
      "Technical Support",
    ],
    imageUrl: "/assets/GalleryImages/CBLab.jpeg",
  },
  {
    id: "conference",
    title: "Conference Centre",
    description:
      "The Conference Centre hosts academic events, meetings, and large gatherings with modern presentation and communication facilities.",
    features: [
      "Auditorium",
      "Meeting Rooms",
      "Video Conferencing",
      "Event Spaces",
    ],
    imageUrl: "/assets/GalleryImages/DSLab.jpeg",
  },
];

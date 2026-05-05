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
      "The Academic Block forms the core teaching environment of the institute, bringing together classrooms, faculty spaces, and academic support areas.\n\nIt supports lectures, tutorials, presentations, and everyday academic interaction in a focused learning setting.",
    features: [
      "Lecture Rooms",
      "Tutorial Spaces",
      "Faculty Cabins",
      "Seminar Areas",
      "Student Interaction Spaces",
    ],
    imageUrl: "/assets/GalleryImages/MainBuilding.jpeg",
  },
  {
    id: "administrative",
    title: "Administrative Block",
    description:
      "The Administrative Block supports the daily functioning of the institute by housing key offices and service areas.\n\nIt helps coordinate academic administration, institutional communication, records, and student-facing processes.",
    features: [
      "Director's Office",
      "Administrative Offices",
      "Academic Records",
      "Student Services",
      "Institutional Coordination",
    ],
    imageUrl: "/assets/GalleryImages/admin-block.jpeg",
  },
  {
    id: "computer-centre",
    title: "Knowledge Resource Center",
    description:
      "The Knowledge Resource Center provides students with access to learning resources, reference material, and spaces for focused academic work.\n\nIt supports independent study, research preparation, project work, and knowledge sharing beyond regular classroom learning.",
    features: [
      "Reference Resources",
      "Reading Spaces",
      "Digital Learning Support",
      "Project Study Areas",
      "Academic Resource Access",
    ],
    imageUrl: "/assets/GalleryImages/krc-2.jpeg",
  },
  {
    id: "conference",
    title: "Conference Hall",
    description:
      "The Conference Hall provides a dedicated venue for academic gatherings, institutional meetings, invited talks, and student-facing programs.\n\nIt serves as an important shared space for formal discussions, presentations, and collaborative events.",
    features: [
      "Academic Talks",
      "Guest Lectures",
      "Department Meetings",
      "Presentation Space",
      "Formal Event Seating",
    ],
    imageUrl: "/assets/GalleryImages/conference-2.jpeg",
  },
  // {
  //   id: "computer-labs",
  //   title: "Computer Laboratories",
  //   description:
  //     "The computer laboratories provide practical learning spaces where students apply concepts through programming, software tools, and project-based assignments. These labs support regular coursework, technical practice, workshops, and collaborative problem solving.",
  //   features: [
  //     "Programming Practice",
  //     "Software-Based Learning",
  //     "Project Workstations",
  //     "Technical Workshops",
  //     "Collaborative Lab Sessions",
  //   ],
  //   imageUrl: "/assets/GalleryImages/CBLab.jpeg",
  // },
  {
    id: "department-library",
    title: "Department Library",
    description:
      "The Department Library offers a quiet academic space for reading, reference, and self-study.\n\nIt supports students and faculty with useful learning material, study-friendly seating, and an environment suited for focused preparation.",
    features: [
      "Reference Books",
      "Quiet Study Area",
      "Academic Reading",
      "Faculty and Student Access",
      "Exam Preparation Support",
    ],
    imageUrl: "/assets/GalleryImages/DeptLib.jpeg",
  },
];

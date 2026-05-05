import {
  LucideIcon,
  Users,
  BookOpen,
  Megaphone,
  Trophy,
  Wrench,
  Briefcase,
  Building2,
  Cloud,
  Cpu,
} from "lucide-react";

export type SubCommittee = {
  name: string;
  role: string;
  icon?: LucideIcon;
};

export type ClubActivities = {
  title?: string;
  items?: string[];
};

export type Club = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  activities?: ClubActivities;
  subCommittees?: SubCommittee[];
};

export const clubs: Club[] = [
  {
    id: "student-council",
    name: "Student Council",
    icon: Users,
    description:
      "The democratically elected Student Council serves as the principal body for all clubs and committees, ensuring accountability among all student bodies on campus. It creates, reviews, and updates policies and guidelines for student activities.",
    activities: {
      title: "Sub Committees:",
      items: [
        "Public Relations",
        "Sports",
        "Mentorship & Guidance",
        "Technical",
        "Art, Culture & Heritage",
        "Media & Marketing",
        "Visual Arts"
      ],
    },
  },
  {
    id: "persona",
    name: "Persona",
    icon: Briefcase,
    activities: {
      title: "Year Long Major Activities",
      items: [
        "Vichaar Sangam: A two-day intellectual inter college event featuring engaging competitions like Group Discussions, Quiz Odyssey, and Lecturate, fostering communication, analytical skills, and innovation.",
        "Workshop Arena: A series of intensive online sessions designed to equip students with practical, industry-relevant skills covering topics like GitHub mastery, LinkedIn networking, and career-focused guidance for exams like GATE and CAT, offering hands-on learning with actionable insight.",
      ],
    },
    description:
      "Persona is the official personality development culb of the institution, focused on developing inter-personal skills through workshops, competitions, and industry interactions.\n\nPersona believes - Personality is the Garden and You Have to Nurture It.",
  },
  {
    id: "ecell",
    name: "E-Cell",
    icon: Building2,
    activities: {
      title: "Year Long Activities",
      items: [
        "Imprenditore 4.0: The annual flagship event of E-Cell RGPV, set the campus abuzz with bold ideas, AI-driven creativity, entrepreneurial spirit, and a strong focus on sustainable innovation",
        "Pitch 2 Elevate 2.0: A high-impact pitching competition that gave students the opportunity to present their startup ideas and strengthen them through expert feedback. The top 3 winning teams secured a fast-tracked pathway to the Zonal Round of Eureka.",
        "Entrepreneurship Awareness Program (EAP): EAP introduces students to entrepreneurship and MSME support schemes."
      ],
    },
    description:
      "E-Cell RGPV, established in 2016, is a student-run initiative that encourages innovation and entrepreneurship among students. It offers a vibrant space and support to transform any innovative idea into an impactful venture.",
  },

  {
    id: "aws",
    name: "AWS Student Builder Group",
    icon: Cloud,
    activities: {
      title: "Year Long Major Activities",
      items: [
        "Introduction to Cloud Computing: Built a strong foundation of cloud concepts and real-world relevance.",
        "AWS S3 Static Website Hosting: Guided students to build, deploy and share their own live portfolio."
      ],
    },
    description:
      "AWS Student Builder Group at the School of Information Technology, RGPV is a student-led community focused on building practical skills in cloud computing and modern development practices. It brings together students who want to understand how applications are deployed, managed, and scaled using cloud platforms like AWS. \n\nThrough hands-on workshops, guided sessions, and project-based learning, the group encourages students to move beyond theory and gain real experience. ",
  },

  {
    id: "gdg",
    name: "Google Developers Group",
    icon: Cpu,
    activities: {
      title: "Year Long Major Activities",
      items: [
        "AI Odyssey 2026: A high-energy AI event featuring a blend of knowledge-driven and competitive activities including a tech quiz, mini hackathon, and creative challenges, designed to promote innovation and practical application.",
        "Interactive Sub-Events: Engaging activities such as Problem Solver’s Lab, AI vs Human, UI Design with AI, and Meme Challenge that encouraged creativity, teamwork, and real-world problem solving.",
      ],
    },
    description:
      "GDG on Campus SOIT is a community-driven program backed by Google for students at the School of Information Technology in Bhopal. The core goal of GDG SOIT is to bridge the gap between theory and practice. While college lectures cover the what, this community focuses on the how. Our goal is to make tech accessible for everyone, irrespective of their technical background.",
  },
  {
    id:"ieee",
    name: "IEEE RGPV",
    icon: Cpu,
    activities:{
      title: "Year Long Major Activities",
      items: [
        "IEEE Hackathon: A competitive and innovation-driven hackathon where students collaborated to solve real-world challenges. Participants worked in teams to brainstorm, design, and develop solutions within a limited timeframe, fostering teamwork, critical thinking, and hands-on technical skills.",
        "Eklavya: A flagship event of IEEE RGPV that focused on enhancing students' technical expertise and analytical thinking. The event included multiple rounds and challenges that tested problem-solving abilities, logical reasoning, and practical application of knowledge."

      ],
    },
    description:"IEEE RGPV was a dynamic student branch committed to fostering innovation, research, and professional growth among students. It served as a platform where aspiring engineers and technologists enhanced their technical knowledge, leadership abilities, and industry exposure."
  },
  {
    id:"medialcell",
    name: "Media Cell",
    icon: Cpu,
    activities:{
      title: "",
      items: [
        

      ],
    },
    description:"The SoIT Media Cell is the creative and communication hub of the institution, responsible for managing the college’s digital presence and media-related activities. It plays a crucial role in capturing, creating, and promoting the vibrant campus life through various platforms.\n\nThe Media Cell handles photography, videography, graphic design, and social media management (LinkedIn and Instagram) for all academic, cultural, and technical events within the institution. \n\nThrough its activities, the SoIT Media Cell provides students with opportunities to develop skills in content creation, digital marketing, branding, and storytelling. It fosters creativity, teamwork, and professionalism while contributing to building a strong and engaging institutional identity."
  },
];

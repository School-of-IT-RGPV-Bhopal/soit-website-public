// --- Types & Interfaces ---
export type Program = {
  id: number;
  level: string;
  title: string;
  duration: string;
  description: string;
  eligibility: string;
  intake?: number;
  // New fields for specific documents
  ordinanceLink?: string;
  syllabusLink?: string;
  schemeLink?: string;
};

// --- Data ---
export const programsData: Program[] = [
  {
    id: 1,
    level: "undergraduate",
    title:
      "B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    duration: "4 Years",
    description:
      "Specialized program focusing on AI/ML technologies, deep learning, computer vision, and intelligent systems development.",
    eligibility: "10+2 with PCM",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-AIML-I-VIII-Sem.pdf",
    schemeLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/schemes/Scheme-AIML-I-VIII-Sem.pdf",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20no%2004%20D301123041325.pdf",
  },
  {
    id: 2,
    level: "undergraduate",
    title: "B.Tech in Computer Science and Business Systems",
    duration: "4 Years",
    description:
      "Interdisciplinary program combining computer science with business systems, enterprise solutions, and management principles.",
    eligibility: "10+2 with PCM",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-CSBS-I-VIII-Sem.pdf",
    schemeLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/schemes/Scheme-CSBS-I-VIII-Sem.pdf",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20no%2004%20D301123041325.pdf",
  },
  {
    id: 3,
    level: "undergraduate",
    title: "B.Tech in Computer Science and Engineering (Data Science)",
    duration: "4 Years",
    description:
      "Specialized program focusing on data analytics, big data technologies, statistical modeling, and data-driven decision making.",
    eligibility: "10+2 with PCM",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-CSDS-I-VIII-Sem.pdf",
    schemeLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/schemes/Scheme-CSDS-I-VIII-Sem.pdf",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20no%2004%20D301123041325.pdf",
  },
  {
    id: 5,
    level: "postgraduate",
    title: "M.Tech in Data Science",
    duration: "2 Years",
    description:
      "Master specialized techniques in big data, statistical analysis, and machine learning applications.",
    eligibility: "B.E./B.Tech in relevant field",
    // UPDATE THESE LINKS
    syllabusLink: "https://rawcdn.githack.com/School-of-IT-RGPV-Bhopal/soit-website-docs-cdn/30743c37b19caaeda562e71d5ce12077990d30b5/syllabuses/Syllabus-MTDS-I-Year.pdf",
    schemeLink: "#",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/Ordinance%20No%2008%20B%20Under%20NEP130223022246.pdf",
  },
  {
    id: 6,
    level: "doctoral",
    title: "Ph.D. in Computer Science & Engineering",
    duration: "Variable",
    description:
      "Research-intensive program for scholars pursuing innovations in computational sciences and technology.",
    eligibility: "Master's degree in relevant field",
    // UPDATE THESE LINKS
    syllabusLink: "#",
    schemeLink: "#", // PhD might not have a scheme like UG, link to coursework structure
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/PHDO081121013840.pdf",
  },
  {
    id: 8,
    level: "doctoral",
    title: "Ph.D. in Information Technology",
    duration: "Variable",
    description:
      "Advanced research in IT infrastructure, networking, and emerging digital technologies.",
    eligibility: "Master's degree in relevant field",
    // UPDATE THESE LINKS
    syllabusLink: "#",
    schemeLink: "#",
    ordinanceLink:
      "https://www.rgpv.ac.in/UC/frm_download_file.aspx?Filepath=CDN/PubContent/Ordinance/PHDO081121013840.pdf",
  },
];
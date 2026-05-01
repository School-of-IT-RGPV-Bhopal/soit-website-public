"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Mail,
  GraduationCap,
  BookOpen,
  Award,
  Phone,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

// --- Types ---
interface FacultyMember {
  id: number;
  name: string;
  position: string;
  specialization: string;
  image: string;
  email: string;
  phone?: string;
  bio: string;
  publications: string[];
  profileLinks?: string[];
  additionalInfo?: string;
}

// --- Faculty Data ---
const facultyData: FacultyMember[] =[
  {
    id: 1,
    name: "Dr. Jitendra Agrawal",
    position: "Director & Associate Professor",
    specialization: "Data Mining & Artificial Intelligence",
    image: "/images/ProfessorImages/Jitendra_Agrawal_sir.jpg",
    email: "jitendra.soitrgpv@gmail.com",
    phone: "9425432199",
    bio: "Dr. Jitendra Agrawal is Director, School of Information Technology, RGPV, Bhopal. He has 27 years of teaching and research experience, focusing on Data Mining, Soft Computing, Machine Learning, and Information Security. Four PhD candidates completed under his guidance, currently supervising 05 PhD candidates. Senior Member of IEEE, Life member of CSI and ISTE.",
    publications:[
      "Published more than 60 publications in International Journals and Conferences",
      "05 patents published",
      "18 book chapters and Six books",
      "Associated with International Program Committees of conferences in USA, India, New Zealand, Korea, Indonesia, Tunisia, Thailand, Morocco",
    ],
    profileLinks:["https://www.linkedin.com/in/dr-jitendra-agrawal-2b75ab64/"],
  },
  {
    id: 2,
    name: "Dr. Sanjeev Sharma",
    position: "Professor",
    specialization: "Data Analytics & Mobile Computing",
    image: "/images/ProfessorImages/Sanjeev_sir.jpeg",
    email: "sanjeev@rgpv.ac.in",
    phone: "9507510528",
    bio: "Strong research background in Data Analytics and Mobile Computing with deep association in post graduate teaching. Published one book, edited 5 conference proceedings, with multiple patents and research projects.",
    publications:[
      "150+ research articles in edited indexed journals",
      "Chaired various academic sessions",
      "5 patents",
      "2 research projects",
      "Published 1 book and edited 5 conference proceedings",
    ],
  },
  {
    id: 25,
    name: "Dr. Nishchol Mishra",
    position: "Associate Professor",
    specialization: "Data Mining, Data Compression, Algorithms & Data Analytics",
    image: "/images/ProfessorImages/Nishchol_Mishra_sir.jpeg",
    email: "nishchol@rgpv.ac.in",
    phone: undefined,
    bio: "Associate Professor in the School of Information Technology at Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal. He holds an M.Tech & Ph.D. in Computer Science & Engineering with over 14 years of research experience.",
    publications:[
      "Published over 40 papers in various international journals of repute",
    ],
    profileLinks:[
      "https://www.linkedin.com/in/nishchol-mishra-79045526/",
    ],
    additionalInfo:
      "Research interests include Multimedia, Data Mining, Image Processing. M.Tech (Computer Application & Technology) from UIT, Bhopal.",
  },
  {
    id: 5,
    name: "Dr. Varsha Sharma",
    position: "Assistant Professor",
    specialization: "Machine Learning & Data Science",
    image: "/images/ProfessorImages/Varsha_Sharma_mam.jpeg",
    email: "varshasharma@rgpv.ac.in",
    phone: "9827546150",
    bio: "Specializes in Artificial Intelligence, Machine Learning, Deep Learning, and Soft Computing techniques. Research focus on various machine learning and heuristic based algorithms. Also  Guided multiple PhD Students",
    publications:[
      "23 Scopus Indexed Publications",
      "Currently one MPCST sponsored Project",
      "Two patents Granted",
    ],
  },
  {
    id: 7,
    name: "Dr. MAHESH SHANKAR PANDEY",
    position: "Assistant Professor",
    specialization: "Antennas & Wireless Communication",
    image: "/images/ProfessorImages/Mahesh_Shankar_pandey_sir.png",
    email: "maheshshankar2504@gmail.com",
    phone: "9425180361",
    bio: "Research area in Different Types of Antennas and Wireless Communication. Masters in Wireless Communication and Doctoral degree in Different types of Antennas. Works as Assistant Professor and Coordinator of Exam in many fields.",
    publications:[
      "Many publications in National and International Journals",
      "Published Books and Book Chapters",
      "Research expertise in antenna design and wireless systems",
    ],
    profileLinks:["https://orcid.org/0009-0002-1568-5957"],
    additionalInfo: "Interests in Singing, Sports and various activities",
  },
  {
    id: 4,
    name: "Yogendra P. S. Maravi",
    position: "Assistant Professor",
    specialization: "Information Security & IoT",
    image: "/images/ProfessorImages/Yogendra_Maravi_sir.jpeg",
    email: "yogendra@rgpv.ac.in",
    phone: "9179005664",
    bio: "Specializes in Information Security, IoT, Machine Learning, and Artificial Intelligence. Guided 25+ M.Tech Dissertations and 20+ B.Tech Projects. Multiple NPTEL certifications in IoT, Machine Learning, and Cloud technologies.",
    publications:[
      "20 Research Papers Published in international journals and conferences",
      "NPTEL Certifications: Introduction to IoT, Innovation & Entrepreneurship, Foundation of Cloud IoT Edge ML, Introduction to Machine Learning",
      "Attended several FDPs, Refresher courses, STTPs, Workshops, conferences",
    ],
    additionalInfo:
      "IBM Certified Academic Associate (DB2), IBM Certified Deployment Professional (Tivoli Directory Server), DELL EMC Data Science Associate, EMC2 Information Storage Associate",
  },
  {
    id: 24,
    name: "Vivek Sharma",
    position: "Assistant Professor",
    specialization: "Wireless Networking",
    image: "/images/ProfessorImages/Vivek_Sharma_sir.jpeg",
    email: "vivek.rgpv@gmail.com",
    phone: "9827362730",
    bio: "Assistant Professor specializing in Wireless Networking. Active contributor to academic research with a focus on patents and international publications.",
    publications:[
      "Published Patents",
      "Book chapter",
      "Research papers in International Journals",
    ],
    profileLinks:[],
    additionalInfo:
      "Published Patents, Book chapter, research papers in International Journals",
  },
  {
    id: 3,
    name: "Gajendra Kumar Ahirwar",
    position: "Assistant Professor",
    specialization: "Machine Learning & Data Science",
    image: "/images/ProfessorImages/Gajendra_Ahirwar_sir.jpeg",
    email: "gajendrakumarahirwar@gmail.com",
    phone: "9926680481",
    bio: "Syllabus Designer for RGPV University, designed Outcome & Competency-Based Curriculum (OCBC) for IT diploma programme. Served as In-charge HOD at Government Women's Polytechnic College, Sehore. Coordinator for AISHE Portal, MANTRA, VIDYUT, DAKSHA initiatives. BIS Club Mentor and nodal officer.",
    publications:[
      "Optimized Central-Smoothing Hypergraph Neural Networks for Enhanced Intrusion Detection in MANETs (2025)",
      "Secured Energy Efficient Chaotic Gazelle Based Optimized Routing Protocol in MANET, Sustainable Computing (SCIE) 2025",
      "A competent CCHFMO with AMDH for QoS in MANET (SCIE) 2024",
      "An Extensive Review on QoS Enhancement in MANET using Meta-heuristic Algorithms (SCIE) Springer 2023",
      "14 total publications in reputed journals",
    ],
    profileLinks:[
      "https://www.researchgate.net/profile/Gajendra-Ahirwar-2",
      "https://scholar.google.com/citations?user=Z29EjbYAAAAJ&hl=en",
    ],
    additionalInfo:
      "Reviewed 15+ research manuscripts for Scopus-indexed journals. Sun Microsystem Certificate in Java. Member: IAENG, International academy for science & Technology education and research",
  },
  {
    id: 6,
    name: "MAHENDRA KUMAR AHIRWAR",
    position: "Assistant Professor",
    specialization: "Explainable AI & IoT",
    image: "/images/ProfessorImages/Mahendra_Ahirwar_sir_2.jpg",
    email: "mahendra.rgtu@gmail.com",
    phone: "9827630103",
    bio: "Assistant Professor in Computer Science with more than 8 years of teaching experience at undergraduate and postgraduate levels. He specializes in Data Science and has guided more than 10 B.Tech. projects. His academic interests include Data Science, Machine Learning, Internet of Things, and Computer Networks. Worked as SPOC of Smart India Hackathon.Appointed as Centre Co-Coordinator for UTD Examination Centre-02 , Mentor in SRIJAN program. Faculty in charge of social media and publicity. He is actively engaged in teaching, research activities, and academic coordination, with a strong focus on outcome-based, research-oriented, and student-centric learning.",
    publications:[
      "Published more than 5+ research papers in reputed international journals and conferences and has authored a book chapter published by IGI Global. he has one  patent on Industrial IoT.",
    ],
    profileLinks:[
      "https://www.linkedin.com/in/mahendra-kumar-16a631117",
      "https://scholar.google.com/citations?user=W6JGSu8AAAAJ&hl=en",
      "https://orcid.org/0009-0001-1472-4734",
    ],
    additionalInfo:
      "Actively involved in academic administration and coordination of national education portals such as AISHE, IIC, KARMA, and PARAKH. Actively Member in IAENG, IERP, International academy for science & Technology education and research.",
  },
  {
    id: 8,
    name: "Madhav Chaturvedi",
    position: "Assistant Professor",
    specialization: "Cyber Security & Computer Networks",
    image: "/images/ProfessorImages/Madhav_sir.jpeg",
    email: "madhav.chaturvedi5@gmail.com",
    phone: "8982579705",
    bio: "Specializes in Cyber security, Computer Network, and Data security. Guide in various major projects for B.Tech students with research focus on security and network domains.",
    publications:[
      "Research in security and network areas",
      "Guided multiple major B.Tech projects",
      "Publications in cyber security domain",
    ],
    profileLinks:[
      "https://scholar.google.com/citations?user=yqi0zzMAAAAJ&hl=en",
      "https://www.linkedin.com/in/madhav-chaturvedi™️✔️-b396291a3",
    ],
    additionalInfo: "Coordinator in various activities, Member in green club",
  },
  {
    id: 9,
    name: "Rachna Nagdev",
    position: "Assistant Professor",
    specialization: "IoT Networks",
    image: "/images/ProfessorImages/Rachna_Nagdev_mam.jpeg",
    email: "rachna.nagdev@gmail.com",
    phone: "9993573466",
    bio: "Expertise in IoT Networks with focus on network security and enterprise network design. Research interests include VLAN communication and network monitoring systems.",
    publications:[
      "LAN-COP: Monitor activities of client computers connected via LAN",
      "Secured Over VLAN Communication: Enterprise network security with multiple switches and VTP modes",
    ],
  },
  {
    id: 13,
    name: "Sanjay Singh",
    position: "Assistant Professor",
    specialization: "IoT & Mobile Ad Hoc Networks",
    image: "/images/ProfessorImages/Sanjay_Singh_sir.jpeg",
    email: "sanjaysinghgwa@gmail.com",
    phone: "8218642990",
    bio: "Research expertise in Internet of Things and Mobile Ad Hoc Networks with focus on routing protocols and GPS-based geographical protocols in MANET.",
    publications:[
      "Dr. Sanjeev Sharma and Sanjay Singh. A survey of routing protocols and geographical protocol using GPS in MANET. Journal of Global Research in Computer Science 3(12) (2012)",
    ],
    profileLinks:[
      "https://www.linkedin.com/in/sanjay-singh-8a652a143?trk=contact-info",
    ],
  },
  {
    id: 10,
    name: "Anushka Singh",
    position: "Assistant Professor",
    specialization: "NLP & Artificial Intelligence",
    image: "/images/ProfessorImages/Anushka_Singh_mam.jpeg",
    email: "anushkamayanksingh@gmail.com",
    phone: "9131516370",
    bio: "Developed a deep learning-based multimodal system for identifying human emotions from images and generating context-aware captions. Research integrates computer vision (CNNs) for emotion recognition with NLP models for caption generation.",
    publications:[
      "Research in emotion recognition and caption generation using deep learning",
      "Multimodal system development for human-computer interaction",
      "Applications in healthcare, social media analysis, and assistive technologies",
    ],
    additionalInfo:
      "NCC 'C' certification, Scout & Guide Rajya puraskar, National player of throw ball, Multiple medals and certificates in state level programs",
  },
  {
    id: 11,
    name: "Amzad Ali",
    position: "Assistant Professor",
    specialization: "Data Science & Machine Learning",
    image: "/images/ProfessorImages/Amzad_Ali_sir.jpeg",
    email: "chmmokhan@gmail.com",
    phone: "9340290875",
    bio: "Teaching CD-305 (3rd semester) and CD-505 (5th semester) courses, conducting CD-102 laboratory for first-semester students. Research in IoT-based automation systems for water management efficiency.",
    publications:[
      "Research: IoT-based automation system",
      "Improves water management efficiency and reduces human intervention",
    ],
  },
  {
    id: 12,
    name: "Shristi Raghuwanshi",
    position: "Assistant Professor",
    specialization: "Data Science",
    image: "/images/ProfessorImages/Shrishti_Raghuwanshi_mam.jpeg",
    email: "shristi.raghuwanshi2017@gmail.com",
    phone: "8770479708",
    bio: "Specializes in Data Science with active teaching role at SOIT RGPV. Focus on practical applications and student projects in data analytics and machine learning domains.",
    publications:[
      "Teaching and research in Data Science",
      "Active involvement in student project guidance",
    ],
    profileLinks:[
      "https://www.linkedin.com/in/shristi-raghuwanshi-7991a1109/",
    ],
  },
  {
    id: 14,
    name: "Prateek Mandloy",
    position: "Assistant Professor",
    specialization: "Machine Learning & Deep Learning",
    image: "/images/ProfessorImages/Prateek_Mandloy_sir.jpeg",
    email: "mandloip8@gmail.com",
    phone: "9981534525",
    bio: "Specializes in advanced machine learning and deep learning techniques with focus on hybrid models and practical applications in predictive analytics.",
    publications:[
      "M.Tech thesis: Hybrid Random Forest With Deep Learning RNN Model For Wine Quality Prediction",
    ],
  },
  {
    id: 15,
    name: "Dr. Anuja Gupta",
    position: "Assistant Professor",
    specialization: "Financial Mathematics",
    image: "/images/ProfessorImages/Anuja_Gupta_mam.jpeg",
    email: "anujaagrawal2703@gmail.com",
    phone: "7974362425",
    bio: "Research expertise in Financial Mathematics with strong publication record in Scopus indexed journals and international conferences.",
    publications:[
      "3 Scopus indexed research papers",
      "2 conference papers in financial mathematics",
    ],
    profileLinks:[
      "http://linkedin.com/in/anuja-gupta-79a882214?trk=blended-typeahead",
    ],
  },
  {
    id: 16,
    name: "Dr. ALKA SINGH",
    position: "Assistant Professor",
    specialization: "Operator Theory",
    image: "/images/ProfessorImages/Alka_Singh_mam.jpeg",
    email: "alkasngh786@gmail.com",
    phone: "9109075261",
    bio: "Specializes in Operator Theory and Functional Analysis with deep mathematical foundations and theoretical research focus.",
    publications:[
      "Research in Operator Theory",
      "Publications in Functional Analysis",
    ],
  },
  {
    id: 17,
    name: "Preeti Singh",
    position: "Assistant Professor",
    specialization: "Finance & Human Resource",
    image: "/images/ProfessorImages/Preeti_Singh_mam.jpeg",
    email: "priety.sngh@gmail.com",
    phone: "9893359198",
    bio: "Teaching and industry experience of 6+ years in Finance and HR domains. Published research in finance and human resource management.",
    publications:[
      "1 research paper published in Finance and HR",
      "6+ years combined teaching and industry experience",
    ],
  },
  {
    id: 18,
    name: "Aashi Chaturvedi",
    position: "Assistant Professor",
    specialization: "English Literature",
    image: "/images/ProfessorImages/Aashi_Chaturvedi_mam.jpeg",
    email: "ashichaturvediosr@gmail.com",
    phone: "9479825660",
    bio: "M.A. in English Literature with UGC NET-JRF qualification. Brings strong literary and communication expertise to technology education.",
    publications: ["UGC NET-JRF Qualified", "M.A. English Literature"],
    additionalInfo: "UGC NET-JRF Qualified",
  },
  {
    id: 19,
    name: "Swati Patel",
    position: "Assistant Professor",
    specialization: "Steganography using ML",
    image: "/images/ProfessorImages/Swati_Patel_mam.jpeg",
    email: "Swattiipattel@gmail.com",
    phone: "9589694585",
    bio: "Research focus on Steganography using machine learning techniques with emphasis on data hiding and information security.",
    publications: ["Research in Steganography using Machine Learning"],
  },
  {
    id: 21,
    name: "Tuhin Shukla",
    position: "Assistant Professor",
    specialization: "AI, IoT & Cybersecurity",
    image: "/images/ProfessorImages/Tuhin_Shukla_mam.jpeg",
    email: "tuhinshuklamishra@outlook.com",
    phone: "8966902386",
    bio: "Specializes in Artificial Intelligence, Machine Learning, Deep Learning, and Cybersecurity. Research focus on Intrusion Detection Systems and IoT Security.",
    publications:[
      "An Overview of Security Intelligence in IoT Applications with Learning Approaches",
      "Security of the IoT Ecosystem: Current and future approaches",
    ],
  },
  {
    id: 22,
    name: "Dr. Sagar Choudhary",
    position: "Assistant Professor",
    specialization: "AI Sensing",
    image: "/images/ProfessorImages/Sagar_Choudhary_sir.jpeg",
    email: "sagartt@gmail.com",
    phone: "9301797534",
    bio: "Experienced in teaching and research, formerly served as a Junior Research Fellow (JRF). Focus area includes AI Sensing technologies.",
    publications: ["Research as JRF in AI Sensing domain"],
    profileLinks:["https://www.linkedin.com/in/sagar-choudhary-87917958"],
  },
];

// --- Custom Hook: Desktop Mouse Drag-to-Scroll ---
function useMouseDragScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ele = ref.current;
    if (!ele) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let dragged = false;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      dragged = false;
      startX = e.pageX - ele.offsetLeft;
      scrollLeft = ele.scrollLeft;
      ele.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
      isDown = false;
      ele.style.cursor = "grab";
    };

    const onMouseUp = (e: MouseEvent) => {
      isDown = false;
      ele.style.cursor = "grab";
      // Prevent click event on children if we actively dragged
      if (dragged) {
        const preventClick = (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          document.removeEventListener("click", preventClick, true);
        };
        document.addEventListener("click", preventClick, true);
        setTimeout(
          () => document.removeEventListener("click", preventClick, true),
          50
        );
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - ele.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier

      if (Math.abs(walk) > 5) dragged = true;

      ele.scrollLeft = scrollLeft - walk;
    };

    ele.addEventListener("mousedown", onMouseDown);
    ele.addEventListener("mouseleave", onMouseLeave);
    ele.addEventListener("mouseup", onMouseUp);
    ele.addEventListener("mousemove", onMouseMove);

    return () => {
      ele.removeEventListener("mousedown", onMouseDown);
      ele.removeEventListener("mouseleave", onMouseLeave);
      ele.removeEventListener("mouseup", onMouseUp);
      ele.removeEventListener("mousemove", onMouseMove);
    };
  }, [ref]);
}

export default function Faculty() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const[scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: true,
  });

  useMouseDragScroll(scrollContainerRef);

  const handleSelectFaculty = useCallback((faculty: FacultyMember) => {
    setSelectedFaculty(faculty);
  },[]);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollState({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: Math.ceil(scrollLeft + clientWidth) < scrollWidth,
      });
    }
  },[]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  },[]);

  return (
    <section
      id="faculty"
      className="w-full overflow-hidden bg-background py-16"
      data-tour="home-faculty-section"
    >
      <div className="section-container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Completely Centered Header */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            Distinguished Faculty
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-foreground/80"
          >
            Meet the experts shaping the future of technology through mentorship
            and research.
          </motion.p>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-accent"></div>
        </div>

        {/* Action controls (Right Aligned to follow clean typography flow) */}
        <div className="mb-4 hidden justify-end gap-3 md:flex">
          <button
            onClick={() => scroll("left")}
            disabled={!scrollState.canScrollLeft}
            className={`flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all ${
              !scrollState.canScrollLeft
                ? "cursor-not-allowed opacity-40"
                : "hover:border-secondary hover:bg-secondary hover:text-primary"
            }`}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!scrollState.canScrollRight}
            className={`flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all ${
              !scrollState.canScrollRight
                ? "cursor-not-allowed opacity-40"
                : "hover:border-secondary hover:bg-secondary hover:text-primary"
            }`}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Native CSS Scrolling Box Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="
            flex snap-x snap-mandatory gap-6 overflow-x-auto pb-12 pt-2
            cursor-grab active:cursor-grabbing
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          {facultyData.map((faculty) => (
            <div
              key={faculty.id}
              className="snap-start snap-always shrink-0 first:pl-2 last:pr-2"
            >
              <FacultyCard faculty={faculty} onSelect={handleSelectFaculty} />
            </div>
          ))}
        </div>

        {/* Detailed Expandable Modal */}
        <AnimatePresence>
          {selectedFaculty && (
            <FacultyModal
              faculty={selectedFaculty}
              onClose={() => setSelectedFaculty(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// --- Sub-Component: Faculty Card ---
const FacultyCard = memo(function FacultyCard({
  faculty,
  onSelect,
}: {
  faculty: FacultyMember;
  onSelect: (faculty: FacultyMember) => void;
}) {
  return (
    <motion.div
      layoutId={`card-container-${faculty.id}`}
      className="
        group relative h-[450px] w-[300px] cursor-pointer overflow-hidden
        rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl
        md:w-[350px]
      "
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onSelect(faculty)}
    >
      <div className="absolute inset-0 size-full overflow-hidden bg-gray-200">
        <Image
          src={faculty.image}
          alt={faculty.name}
          fill
          sizes="(max-width: 768px) 300px, 350px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={faculty.id <= 2}
        />
      </div>

      {/* Dark overlay to make the bright yellow secondary text pop beautifully */}
      <div
        className="
        absolute inset-0 bg-linear-to-t from-black/95 via-black/40
        to-transparent opacity-80 transition-opacity duration-300
        group-hover:opacity-95
      "
      />

      {/* 3. Content with Layout Animations */}
       <div className="
         absolute inset-x-0 bottom-0 translate-y-2 transform p-6 text-white
         transition-transform duration-300
         group-hover:translate-y-0
       ">
         <motion.div layoutId={`card-content-${faculty.id}`}>
           <div className="mb-2 flex items-center gap-2 text-secondary">
             <Award className="size-5" />
             <span className="text-sm font-semibold tracking-wider uppercase">
               {faculty.position}
             </span>
           </div>
           <h3 className="mb-1 text-2xl/tight font-bold text-white">
             {faculty.name}
           </h3>
           <p className="mb-4 line-clamp-1 text-sm text-gray-300">
             {faculty.specialization}
           </p>

           <div className="
             mt-2 flex items-center text-sm font-medium text-white/90
             transition-colors
             group-hover:text-secondary
          ">
             View Profile <ChevronRight className="ml-1 size-4" />
           </div>
         </motion.div>
       </div>
    </motion.div>
  );
});

// --- Sub-Component: Faculty Modal ---
function FacultyModal({
  faculty,
  onClose,
}: {
  faculty: FacultyMember;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-container-${faculty.id}`}
        className="
          relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden
          rounded-2xl bg-white shadow-2xl md:h-[600px] md:flex-row
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Standard Modal Close Action */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-20 rounded-full bg-black/40 p-2 text-white
            backdrop-blur-md transition-colors hover:bg-black/60 md:bg-gray-100 
            md:text-gray-600 md:hover:bg-secondary md:hover:text-primary
          "
        >
          <X className="size-5" />
        </button>

        {/* Left Aspect Profile Image */}
        <div className="relative aspect-square w-full shrink-0 md:h-full md:w-2/5 md:aspect-auto">
          <motion.div
            layoutId={`card-image-${faculty.id}`}
            className="absolute inset-0"
          >
            <Image
              src={faculty.image}
              alt={faculty.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent md:hidden" />
          <div className="absolute bottom-0 left-0 p-6 text-white md:hidden">
            <h3 className="text-2xl font-bold text-white">{faculty.name}</h3>
            <p className="text-secondary font-medium">{faculty.position}</p>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="w-full overflow-y-auto p-6 md:w-3/5 md:p-8 [&::-webkit-scrollbar]:hidden[-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="mb-6 hidden md:block">
            <motion.h3
              layoutId={`card-title-${faculty.id}`}
              className="text-3xl font-bold text-primary"
            >
              {faculty.name}
            </motion.h3>
            {/* Position tied to primary theme rules */}
            <p className="mt-1 text-lg font-medium text-primary-light">
              {faculty.position}
            </p>
          </div>

          <div className="space-y-6">
            {/* Contact Blocks */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center space-x-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-foreground shadow-sm">
                <Mail className="size-5 shrink-0 text-secondary" />
                <span className="text-sm font-medium break-all">
                  {faculty.email}
                </span>
              </div>
              {faculty.phone && (
                <div className="flex items-center space-x-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-foreground shadow-sm">
                  <Phone className="size-5 shrink-0 text-secondary" />
                  <span className="text-sm font-medium">{faculty.phone}</span>
                </div>
              )}
            </div>

            {/* Specialties Array */}
            <div>
              <div className="mb-3 flex items-center space-x-2">
                <GraduationCap className="size-5 text-secondary" />
                <h4 className="font-semibold text-primary">Specialization</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {faculty.specialization.split("&").map((spec, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-secondary/15 px-3 py-1.5 text-xs font-bold tracking-wide text-primary"
                  >
                    {spec.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Biography Profile */}
            <div>
              <h4 className="mb-2 font-semibold text-primary">Biography</h4>
              <p className="text-sm/relaxed text-muted-foreground md:text-base/relaxed">
                {faculty.bio}
              </p>
            </div>

            {/* Research Iterations */}
            {faculty.publications && faculty.publications.length > 0 && (
              <div>
                <div className="mb-3 flex items-center space-x-2">
                  <BookOpen className="size-5 text-secondary" />
                  <h4 className="font-semibold text-primary">
                    Publications & Research
                  </h4>
                </div>
                <ul className="space-y-2">
                  {faculty.publications.map((pub, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-muted-foreground"
                    >
                      <span className="mr-2.5 mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary"></span>
                      <span>{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* External Redirects */}
            {faculty.profileLinks && faculty.profileLinks.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold text-primary">
                  Professional Profiles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {faculty.profileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-secondary hover:bg-secondary hover:text-primary"
                    >
                      <ExternalLink className="size-4" />
                      {link.includes("linkedin")
                        ? "LinkedIn"
                        : link.includes("scholar.google")
                        ? "Google Scholar"
                        : link.includes("researchgate")
                        ? "ResearchGate"
                        : link.includes("orcid")
                        ? "ORCID"
                        : "Profile"}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Appendages */}
            {faculty.additionalInfo && (
              <div>
                <h4 className="mb-2 font-semibold text-primary">
                  Additional Information
                </h4>
                <p className="text-sm/relaxed text-muted-foreground">
                  {faculty.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
// "use client";

// import { useState, useRef, useEffect, useCallback, memo } from "react";
// import { motion, AnimatePresence, useMotionValue } from "framer-motion";
// import {
//   X,
//   ChevronRight,
//   Mail,
//   GraduationCap,
//   BookOpen,
//   Award,
//   MoveRight,
//   Phone,
//   ExternalLink,
// } from "lucide-react";

// import Image from "next/image";

// // --- Types ---
// interface FacultyMember {
//   id: number;
//   name: string;
//   position: string;
//   specialization: string;
//   image: string;
//   email: string;
//   phone?: string;
//   bio: string;
//   publications: string[];
//   profileLinks?: string[];
//   additionalInfo?: string;
// }

// // --- Real Faculty Data from Excel ---
// const facultyData: FacultyMember[] = [
//   {
//     id: 1,
//     name: "Dr. Jitendra Agrawal",
//     position: "Director & Associate Professor",
//     specialization: "Data Mining & Artificial Intelligence",
//     image: "/images/ProfessorImages/Jitendra_Agrawal_sir.jpg",
//     email: "jitendra.soitrgpv@gmail.com",
//     phone: "9425432199",
//     bio: "Dr. Jitendra Agrawal is Director, School of Information Technology, RGPV, Bhopal. He has 27 years of teaching and research experience, focusing on Data Mining, Soft Computing, Machine Learning, and Information Security. Four PhD candidates completed under his guidance, currently supervising 05 PhD candidates. Senior Member of IEEE, Life member of CSI and ISTE.",
//     publications: [
//       "Published more than 60 publications in International Journals and Conferences",
//       "05 patents published",
//       "18 book chapters and Six books",
//       "Associated with International Program Committees of conferences in USA, India, New Zealand, Korea, Indonesia, Tunisia, Thailand, Morocco",
//     ],
//     profileLinks: ["https://www.linkedin.com/in/dr-jitendra-agrawal-2b75ab64/"],
//   },
//   {
//     id: 2,
//     name: "Dr. Sanjeev Sharma",
//     position: "Professor",
//     specialization: "Data Analytics & Mobile Computing",
//     image: "/images/ProfessorImages/Sanjeev_sir.jpeg",
//     email: "sanjeev@rgpv.ac.in",
//     phone: "9507510528",
//     bio: "Strong research background in Data Analytics and Mobile Computing with deep association in post graduate teaching. Published one book, edited 5 conference proceedings, with multiple patents and research projects.",
//     publications: [
//       "150+ research articles in edited indexed journals",
//       "Chaired various academic sessions",
//       "5 patents",
//       "2 research projects",
//       "Published 1 book and edited 5 conference proceedings",
//     ],
//   },
//   {
//     id: 25,
//     name: "Dr. Nishchol Mishra",
//     position: "Associate Professor",
//     specialization: "Data Mining, Data Compression, Algorithms & Data Analytics",
//     image: "/images/ProfessorImages/Nishchol_Mishra_sir.jpeg",
//     email: "nishchol@rgpv.ac.in",
//     phone: undefined,
//     bio: "Associate Professor in the School of Information Technology at Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal. He holds an M.Tech & Ph.D. in Computer Science & Engineering with over 14 years of research experience.",
//     publications: [
//       "Published over 40 papers in various international journals of repute",
//     ],
//     profileLinks: [
//       "https://www.linkedin.com/in/nishchol-mishra-79045526/",
//     ],
//     additionalInfo:
//       "Research interests include Multimedia, Data Mining, Image Processing. M.Tech (Computer Application & Technology) from UIT, Bhopal.",
//   },
//   {
//     id: 5,
//     name: "Dr. Varsha Sharma",
//     position: "Assistant Professor",
//     specialization: "Machine Learning & Data Science",
//     image: "/images/ProfessorImages/Varsha_Sharma_mam.jpeg",
//     email: "varshasharma@rgpv.ac.in",
//     phone: "9827546150",
//     bio: "Specializes in Artificial Intelligence, Machine Learning, Deep Learning, and Soft Computing techniques. Research focus on various machine learning and heuristic based algorithms. Also  Guided multiple PhD Students",
//     publications: [
//       "23 Scopus Indexed Publications",
//       "Currently one MPCST sponsored Project",
//       "Two patents Granted",
//     ],
//   },
//   {
//     id: 7,
//     name: "Dr. MAHESH SHANKAR PANDEY",
//     position: "Assistant Professor",
//     specialization: "Antennas & Wireless Communication",
//     image: "/images/ProfessorImages/Mahesh_Shankar_pandey_sir.png",
//     email: "maheshshankar2504@gmail.com",
//     phone: "9425180361",
//     bio: "Research area in Different Types of Antennas and Wireless Communication. Masters in Wireless Communication and Doctoral degree in Different types of Antennas. Works as Assistant Professor and Coordinator of Exam in many fields.",
//     publications: [
//       "Many publications in National and International Journals",
//       "Published Books and Book Chapters",
//       "Research expertise in antenna design and wireless systems",
//     ],
//     profileLinks: ["https://orcid.org/0009-0002-1568-5957"],
//     additionalInfo: "Interests in Singing, Sports and various activities",
//   },
//   {
//     id: 4,
//     name: "Yogendra P. S. Maravi",
//     position: "Assistant Professor",
//     specialization: "Information Security & IoT",
//     image: "/images/ProfessorImages/Yogendra_Maravi_sir.jpeg",
//     email: "yogendra@rgpv.ac.in",
//     phone: "9179005664",
//     bio: "Specializes in Information Security, IoT, Machine Learning, and Artificial Intelligence. Guided 25+ M.Tech Dissertations and 20+ B.Tech Projects. Multiple NPTEL certifications in IoT, Machine Learning, and Cloud technologies.",
//     publications: [
//       "20 Research Papers Published in international journals and conferences",
//       "NPTEL Certifications: Introduction to IoT, Innovation & Entrepreneurship, Foundation of Cloud IoT Edge ML, Introduction to Machine Learning",
//       "Attended several FDPs, Refresher courses, STTPs, Workshops, conferences",
//     ],
//     additionalInfo:
//       "IBM Certified Academic Associate (DB2), IBM Certified Deployment Professional (Tivoli Directory Server), DELL EMC Data Science Associate, EMC2 Information Storage Associate",
//   },
//   {
//     id: 24,
//     name: "Vivek Sharma",
//     position: "Assistant Professor",
//     specialization: "Wireless Networking",
//     image: "/images/ProfessorImages/Vivek_Sharma_sir.jpeg",
//     email: "vivek.rgpv@gmail.com",
//     phone: "9827362730",
//     bio: "Assistant Professor specializing in Wireless Networking. Active contributor to academic research with a focus on patents and international publications.",
//     publications: [
//       "Published Patents",
//       "Book chapter",
//       "Research papers in International Journals",
//     ],
//     profileLinks: [],
//     additionalInfo:
//       "Published Patents, Book chapter, research papers in International Journals",
//   },
//   {
//     id: 3,
//     name: "Gajendra Kumar Ahirwar",
//     position: "Assistant Professor",
//     specialization: "Machine Learning & Data Science",
//     image: "/images/ProfessorImages/Gajendra_Ahirwar_sir.jpeg",
//     email: "gajendrakumarahirwar@gmail.com",
//     phone: "9926680481",
//     bio: "Syllabus Designer for RGPV University, designed Outcome & Competency-Based Curriculum (OCBC) for IT diploma programme. Served as In-charge HOD at Government Women's Polytechnic College, Sehore. Coordinator for AISHE Portal, MANTRA, VIDYUT, DAKSHA initiatives. BIS Club Mentor and nodal officer.",
//     publications: [
//       "Optimized Central-Smoothing Hypergraph Neural Networks for Enhanced Intrusion Detection in MANETs (2025)",
//       "Secured Energy Efficient Chaotic Gazelle Based Optimized Routing Protocol in MANET, Sustainable Computing (SCIE) 2025",
//       "A competent CCHFMO with AMDH for QoS in MANET (SCIE) 2024",
//       "An Extensive Review on QoS Enhancement in MANET using Meta-heuristic Algorithms (SCIE) Springer 2023",
//       "14 total publications in reputed journals",
//     ],
//     profileLinks: [
//       "https://www.researchgate.net/profile/Gajendra-Ahirwar-2",
//       "https://scholar.google.com/citations?user=Z29EjbYAAAAJ&hl=en",
//     ],
//     additionalInfo:
//       "Reviewed 15+ research manuscripts for Scopus-indexed journals. Sun Microsystem Certificate in Java. Member: IAENG, International academy for science & Technology education and research",
//   },
  
  

//   // {
//   //   id: 5,
//   //   name: 'LAKSHMI R SURESH',
//   //   position: 'Assistant Professor',
//   //   specialization: 'Machine Learning & Deep Learning',
//   //   image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
//   //   email: 'lachurjayesh@gmail.com',
//   //   phone: '9752446075',
//   //   bio: 'Part-time external PhD scholar in Computer Science at VIT Bhopal with research in deep learning, IoMT-based healthcare monitoring, brain tumor detection, and dementia classification. Has served as Assistant Professor/Guest Faculty in multiple institutions since 2012.',
//   //   publications: [
//   //     'Two SCI publications',
//   //     'One Scopus publication',
//   //     'Research areas: Deep learning, IoMT-based healthcare monitoring, Brain tumor detection, Dementia classification'
//   //   ],
//   //   profileLinks: [
//   //     'https://scholar.google.com/citations?user=WprXt0kAAAAJ&hl=en&oi=ao',
//   //     'https://www.linkedin.com/in/lakshmi-r-suresh-90aa79184/'
//   //   ],
//   //   additionalInfo: 'Young Achiever Award 2021, Excellent Achiever Award 2021'
//   // },
//   {
//     id: 6,
//     name: "MAHENDRA KUMAR AHIRWAR",
//     position: "Assistant Professor",
//     specialization: "Explainable AI & IoT",
//     image: "/images/ProfessorImages/Mahendra_Ahirwar_sir_2.jpg",
//     email: "mahendra.rgtu@gmail.com",
//     phone: "9827630103",
//     bio: "Assistant Professor in Computer Science with more than 8 years of teaching experience at undergraduate and postgraduate levels. He specializes in Data Science and has guided more than 10 B.Tech. projects. His academic interests include Data Science, Machine Learning, Internet of Things, and Computer Networks. Worked as SPOC of Smart India Hackathon.Appointed as Centre Co-Coordinator for UTD Examination Centre-02 , Mentor in SRIJAN program. Faculty in charge of social media and publicity. He is actively engaged in teaching, research activities, and academic coordination, with a strong focus on outcome-based, research-oriented, and student-centric learning.",
//     publications: [
//       "Published more than 5+ research papers in reputed international journals and conferences and has authored a book chapter published by IGI Global. he has one  patent on Industrial IoT.",
//     ],
//     profileLinks: [
//       "https://www.linkedin.com/in/mahendra-kumar-16a631117",
//       "https://scholar.google.com/citations?user=W6JGSu8AAAAJ&hl=en",
//       "https://orcid.org/0009-0001-1472-4734",
//     ],
//     additionalInfo:
//       "Actively involved in academic administration and coordination of national education portals such as AISHE, IIC, KARMA, and PARAKH. Actively Member in IAENG, IERP, International academy for science & Technology education and research.",
//   },
  
//   {
//     id: 8,
//     name: "Madhav Chaturvedi",
//     position: "Assistant Professor",
//     specialization: "Cyber Security & Computer Networks",
//     image: "/images/ProfessorImages/Madhav_sir.jpeg",
//     email: "madhav.chaturvedi5@gmail.com",
//     phone: "8982579705",
//     bio: "Specializes in Cyber security, Computer Network, and Data security. Guide in various major projects for B.Tech students with research focus on security and network domains.",
//     publications: [
//       "Research in security and network areas",
//       "Guided multiple major B.Tech projects",
//       "Publications in cyber security domain",
//     ],
//     profileLinks: [
//       "https://scholar.google.com/citations?user=yqi0zzMAAAAJ&hl=en",
//       "https://www.linkedin.com/in/madhav-chaturvedi™️✔️-b396291a3",
//     ],
//     additionalInfo: "Coordinator in various activities, Member in green club",
//   },
//   {
//     id: 9,
//     name: "Rachna Nagdev",
//     position: "Assistant Professor",
//     specialization: "IoT Networks",
//     image: "/images/ProfessorImages/Rachna_Nagdev_mam.jpeg",
//     email: "rachna.nagdev@gmail.com",
//     phone: "9993573466",
//     bio: "Expertise in IoT Networks with focus on network security and enterprise network design. Research interests include VLAN communication and network monitoring systems.",
//     publications: [
//       "LAN-COP: Monitor activities of client computers connected via LAN",
//       "Secured Over VLAN Communication: Enterprise network security with multiple switches and VTP modes",
//     ],
//   },
//   {
//     id: 13,
//     name: "Sanjay Singh",
//     position: "Assistant Professor",
//     specialization: "IoT & Mobile Ad Hoc Networks",
//     image: "/images/ProfessorImages/Sanjay_Singh_sir.jpeg",
//     email: "sanjaysinghgwa@gmail.com",
//     phone: "8218642990",
//     bio: "Research expertise in Internet of Things and Mobile Ad Hoc Networks with focus on routing protocols and GPS-based geographical protocols in MANET.",
//     publications: [
//       "Dr. Sanjeev Sharma and Sanjay Singh. A survey of routing protocols and geographical protocol using GPS in MANET. Journal of Global Research in Computer Science 3(12) (2012)",
//     ],
//     profileLinks: [
//       "https://www.linkedin.com/in/sanjay-singh-8a652a143?trk=contact-info",
//     ],
//   },
//   {
//     id: 10,
//     name: "Anushka Singh",
//     position: "Assistant Professor",
//     specialization: "NLP & Artificial Intelligence",
//     image: "/images/ProfessorImages/Anushka_Singh_mam.jpeg",
//     email: "anushkamayanksingh@gmail.com",
//     phone: "9131516370",
//     bio: "Developed a deep learning-based multimodal system for identifying human emotions from images and generating context-aware captions. Research integrates computer vision (CNNs) for emotion recognition with NLP models for caption generation.",
//     publications: [
//       "Research in emotion recognition and caption generation using deep learning",
//       "Multimodal system development for human-computer interaction",
//       "Applications in healthcare, social media analysis, and assistive technologies",
//     ],
//     additionalInfo:
//       "NCC 'C' certification, Scout & Guide Rajya puraskar, National player of throw ball, Multiple medals and certificates in state level programs",
//   },
//   {
//     id: 11,
//     name: "Amzad Ali",
//     position: "Assistant Professor",
//     specialization: "Data Science & Machine Learning",
//     image: "/images/ProfessorImages/Amzad_Ali_sir.jpeg",
//     email: "chmmokhan@gmail.com",
//     phone: "9340290875",
//     bio: "Teaching CD-305 (3rd semester) and CD-505 (5th semester) courses, conducting CD-102 laboratory for first-semester students. Research in IoT-based automation systems for water management efficiency.",
//     publications: [
//       "Research: IoT-based automation system",
//       "Improves water management efficiency and reduces human intervention",
//     ],
//   },
//   {
//     id: 12,
//     name: "Shristi Raghuwanshi",
//     position: "Assistant Professor",
//     specialization: "Data Science",
//     image: "/images/ProfessorImages/Shrishti_Raghuwanshi_mam.jpeg",
//     email: "shristi.raghuwanshi2017@gmail.com",
//     phone: "8770479708",
//     bio: "Specializes in Data Science with active teaching role at SOIT RGPV. Focus on practical applications and student projects in data analytics and machine learning domains.",
//     publications: [
//       "Teaching and research in Data Science",
//       "Active involvement in student project guidance",
//     ],
//     profileLinks: [
//       "https://www.linkedin.com/in/shristi-raghuwanshi-7991a1109/",
//     ],
//   },

//   {
//     id: 14,
//     name: "Prateek Mandloy",
//     position: "Assistant Professor",
//     specialization: "Machine Learning & Deep Learning",
//     image: "/images/ProfessorImages/Prateek_Mandloy_sir.jpeg",
//     email: "mandloip8@gmail.com",
//     phone: "9981534525",
//     bio: "Specializes in advanced machine learning and deep learning techniques with focus on hybrid models and practical applications in predictive analytics.",
//     publications: [
//       "M.Tech thesis: Hybrid Random Forest With Deep Learning RNN Model For Wine Quality Prediction",
//     ],
//   },
//   {
//     id: 15,
//     name: "Dr. Anuja Gupta",
//     position: "Assistant Professor",
//     specialization: "Financial Mathematics",
//     image: "/images/ProfessorImages/Anuja_Gupta_mam.jpeg",
//     email: "anujaagrawal2703@gmail.com",
//     phone: "7974362425",
//     bio: "Research expertise in Financial Mathematics with strong publication record in Scopus indexed journals and international conferences.",
//     publications: [
//       "3 Scopus indexed research papers",
//       "2 conference papers in financial mathematics",
//     ],
//     profileLinks: [
//       "http://linkedin.com/in/anuja-gupta-79a882214?trk=blended-typeahead",
//     ],
//   },
//   {
//     id: 16,
//     name: "Dr. ALKA SINGH",
//     position: "Assistant Professor",
//     specialization: "Operator Theory",
//     image: "/images/ProfessorImages/Alka_Singh_mam.jpeg",
//     email: "alkasngh786@gmail.com",
//     phone: "9109075261",
//     bio: "Specializes in Operator Theory and Functional Analysis with deep mathematical foundations and theoretical research focus.",
//     publications: [
//       "Research in Operator Theory",
//       "Publications in Functional Analysis",
//     ],
//   },
//   {
//     id: 17,
//     name: "Preeti Singh",
//     position: "Assistant Professor",
//     specialization: "Finance & Human Resource",
//     image: "/images/ProfessorImages/Preeti_Singh_mam.jpeg",
//     email: "priety.sngh@gmail.com",
//     phone: "9893359198",
//     bio: "Teaching and industry experience of 6+ years in Finance and HR domains. Published research in finance and human resource management.",
//     publications: [
//       "1 research paper published in Finance and HR",
//       "6+ years combined teaching and industry experience",
//     ],
//   },
//   {
//     id: 18,
//     name: "Aashi Chaturvedi",
//     position: "Assistant Professor",
//     specialization: "English Literature",
//     image: "/images/ProfessorImages/Aashi_Chaturvedi_mam.jpeg",
//     email: "ashichaturvediosr@gmail.com",
//     phone: "9479825660",
//     bio: "M.A. in English Literature with UGC NET-JRF qualification. Brings strong literary and communication expertise to technology education.",
//     publications: ["UGC NET-JRF Qualified", "M.A. English Literature"],
//     additionalInfo: "UGC NET-JRF Qualified",
//   },
//   {
//     id: 19,
//     name: "Swati Patel",
//     position: "Assistant Professor",
//     specialization: "Steganography using ML",
//     image: "/images/ProfessorImages/Swati_Patel_mam.jpeg",
//     email: "Swattiipattel@gmail.com",
//     phone: "9589694585",
//     bio: "Research focus on Steganography using machine learning techniques with emphasis on data hiding and information security.",
//     publications: ["Research in Steganography using Machine Learning"],
//   },
//   {
//     id: 21,
//     name: "Tuhin Shukla",
//     position: "Assistant Professor",
//     specialization: "AI, IoT & Cybersecurity",
//     image: "/images/ProfessorImages/Tuhin_Shukla_mam.jpeg",
//     email: "tuhinshuklamishra@outlook.com",
//     phone: "8966902386",
//     bio: "Specializes in Artificial Intelligence, Machine Learning, Deep Learning, and Cybersecurity. Research focus on Intrusion Detection Systems and IoT Security.",
//     publications: [
//       "An Overview of Security Intelligence in IoT Applications with Learning Approaches",
//       "Security of the IoT Ecosystem: Current and future approaches",
//     ],
//   },
//   {
//     id: 22,
//     name: "Dr. Sagar Choudhary",
//     position: "Assistant Professor",
//     specialization: "AI Sensing",
//     image: "/images/ProfessorImages/Sagar_Choudhary_sir.jpeg",
//     email: "sagartt@gmail.com",
//     phone: "9301797534",
//     bio: "Experienced in teaching and research, formerly served as a Junior Research Fellow (JRF). Focus area includes AI Sensing technologies.",
//     publications: ["Research as JRF in AI Sensing domain"],
//     profileLinks: ["https://www.linkedin.com/in/sagar-choudhary-87917958"],
//   },
// ];

// export default function Faculty() {
//   const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(
//     null,
//   );
//   const [width, setWidth] = useState(0);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0);
//   const handleSelectFaculty = useCallback((faculty: FacultyMember) => {
//     setSelectedFaculty(faculty);
//   }, []);

//   // Calculate draggable constraint width
//   useEffect(() => {
//     const updateWidth = () => {
//       if (!carouselRef.current) {
//         return;
//       }
//       const nextWidth = Math.max(
//         0,
//         carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
//       );
//       setWidth(nextWidth);
//     };

//     updateWidth();
//     if (!carouselRef.current || typeof ResizeObserver === "undefined") {
//       window.addEventListener("resize", updateWidth);
//       return () => {
//         window.removeEventListener("resize", updateWidth);
//       };
//     }

//     const observer = new ResizeObserver(updateWidth);
//     observer.observe(carouselRef.current);
//     window.addEventListener("resize", updateWidth);

//     return () => {
//       observer.disconnect();
//       window.removeEventListener("resize", updateWidth);
//     };
//   }, []);

//   return (
//     <section
//       id="faculty"
//       className="w-full overflow-hidden bg-gray-50"
//       data-tour="home-faculty-section"
//     >
//       <div className="section-container">
//         {/* Header */}
//         <div
//           id="distinguished-faculty"
//           className="
//             mb-12 text-center
//             md:mb-16
//           "
//         >
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="
//               text-3xl font-bold tracking-tight text-primary
//               sm:text-4xl
//             "
//           >
//             Distinguished Faculty
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
//           >
//             Meet the experts shaping the future of technology through mentorship
//             and research.
//           </motion.p>
//           <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-accent"></div>
//         </div>

//         {/* Draggable Slider Area */}
//         <motion.div
//           className="
//             cursor-grab
//             active:cursor-grabbing
//           "
//           ref={carouselRef}
//           whileTap={{ cursor: "grabbing" }}
//         >
//           <motion.div
//             drag="x"
//             dragConstraints={{ right: 0, left: -width }}
//             className="flex space-x-6 pb-12"
//             style={{ x }}
//           >
//             {facultyData.map((faculty) => (
//               <FacultyCard
//                 key={faculty.id}
//                 faculty={faculty}
//                 onSelect={handleSelectFaculty}
//               />
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Instructions for slider */}
//         <div
//           className="
//             -mt-5 flex items-center justify-center gap-2 text-sm text-gray-400
//             md:hidden
//           "
//         >
//           <MoveRight className="size-4 animate-pulse" />
//           <span>Swipe to explore</span>
//         </div>

//         {/* Detailed Modal */}
//         <AnimatePresence>
//           {selectedFaculty && (
//             <FacultyModal
//               faculty={selectedFaculty}
//               onClose={() => setSelectedFaculty(null)}
//             />
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// // --- Sub-Component: Faculty Card ---
// const FacultyCard = memo(function FacultyCard({
//   faculty,
//   onSelect,
// }: {
//   faculty: FacultyMember;
//   onSelect: (faculty: FacultyMember) => void;
// }) {
//   return (
//     <motion.div
//       layoutId={`card-container-${faculty.id}`}
//       className="
//         group relative h-112.5 min-w-75 cursor-pointer overflow-hidden
//         rounded-2xl shadow-lg
//         md:min-w-87.5
//       "
//       initial={{ opacity: 0, scale: 0.9 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       whileHover={{ y: -10 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       onClick={() => onSelect(faculty)}
//     >
//       {/* 1. Optimized Image Replacement */}
//       <div className="absolute inset-0 size-full overflow-hidden">
//         <Image
//           src={faculty.image}
//           alt={faculty.name}
//           fill
//           // Critical: Prevents downloading the 1.7MB original.
//           // Next.js will now serve a ~350px optimized WebP.
//           sizes="(max-width: 768px) 100vw, 350px"
//           className="
//             object-cover transition-transform duration-700
//             group-hover:scale-110
//           "
//           // If this is one of the first faculty members, help LCP by preloading
//           priority={faculty.id <= 2}
//         />
//       </div>

//       {/* 2. Gradient Overlay (using modern Tailwind 'bg-linear') */}
//       <div className="
//         absolute inset-0 bg-linear-to-t from-black/90 via-black/40
//         to-transparent opacity-80 transition-opacity duration-300
//         group-hover:opacity-90
//       " />

//       {/* 3. Content with Layout Animations */}
//       <div className="
//         absolute inset-x-0 bottom-0 translate-y-2 transform p-6 text-white
//         transition-transform duration-300
//         group-hover:translate-y-0
//       ">
//         <motion.div layoutId={`card-content-${faculty.id}`}>
//           <div className="mb-2 flex items-center gap-2 text-secondary">
//             <Award className="size-5" />
//             <span className="text-sm font-semibold tracking-wider uppercase">
//               {faculty.position}
//             </span>
//           </div>
//           <h3 className="mb-1 text-2xl/tight font-bold text-white">
//             {faculty.name}
//           </h3>
//           <p className="mb-4 line-clamp-1 text-sm text-gray-300">
//             {faculty.specialization}
//           </p>

//           <div className="
//             mt-2 flex items-center text-sm font-medium text-white/90
//             transition-colors
//             group-hover:text-secondary
//           ">
//             View Profile <ChevronRight className="ml-1 size-4" />
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// });

// // --- Sub-Component: Faculty Modal ---
// function FacultyModal({
//   faculty,
//   onClose,
// }: {
//   faculty: FacultyMember;
//   onClose: () => void;
// }) {
//   return (
//     <motion.div
//       className="
//         fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4
//         backdrop-blur-sm
//       "
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//     >
//       <motion.div
//         layoutId={`card-container-${faculty.id}`}
//         className="
//           relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden
//           overflow-y-auto rounded-2xl bg-white shadow-2xl
//           md:h-auto md:flex-row md:overflow-y-hidden
//         "
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="
//             absolute top-4 right-4 z-20 rounded-full bg-black/20 p-2 text-white
//             backdrop-blur-md transition-colors
//             hover:bg-black/40
//           "
//         >
//           <X className="size-6" />
//         </button>

//         {/* Left Side: Image & Key Info */}
//         <div
//           className="
//             relative aspect-4/3 w-full
//             md:aspect-auto md:h-auto md:w-2/5
//           "
//         >
//           <motion.div
//             layoutId={`card-image-${faculty.id}`}
//             className="absolute inset-0"
//           >
//             <Image
//               src={faculty.image}
//               alt={faculty.name}
//               fill
//               sizes="(max-width: 768px) 100vw, 40vw"
//               className="object-cover"
//             />
//           </motion.div>
//           <div
//             className="
//               absolute inset-0 bg-linear-to-t from-black/80 to-transparent
//               md:hidden
//             "
//           />

//           <div
//             className="
//               absolute bottom-0 left-0 p-6 text-white
//               md:hidden
//             "
//           >
//             <h3 className="text-2xl font-bold">{faculty.name}</h3>
//             <p className="text-gray-300">{faculty.position}</p>
//           </div>
//         </div>

//         {/* Right Side: Details */}
//         <div
//           className="
//             w-full p-6
//             md:w-3/5 md:overflow-y-auto md:p-8
//           "
//         >
//           <div
//             className="
//               mb-6 hidden
//               md:block
//             "
//           >
//             <motion.h3
//               layoutId={`card-title-${faculty.id}`}
//               className="text-3xl font-bold text-gray-900"
//             >
//               {faculty.name}
//             </motion.h3>
//             <p className="text-lg font-medium text-foreground">
//               {faculty.position}
//             </p>
//           </div>

//           <div className="space-y-6">
//             {/* Contact Info */}
//             <div className="space-y-2">
//               <div
//                 className="
//                   flex items-center space-x-3 rounded-lg border border-gray-100
//                   bg-gray-50 p-3 text-gray-600
//                 "
//               >
//                 <Mail className="size-5" />
//                 <span className="text-sm font-medium break-all">
//                   {faculty.email}
//                 </span>
//               </div>
//               {faculty.phone && (
//                 <div
//                   className="
//                     flex items-center space-x-3 rounded-lg border
//                     border-gray-100 bg-gray-50 p-3 text-gray-600
//                   "
//                 >
//                   <Phone className="size-5" />
//                   <span className="font-medium">{faculty.phone}</span>
//                 </div>
//               )}
//             </div>

//             {/* Specialization */}
//             <div>
//               <div className="mb-2 flex items-center space-x-2">
//                 <GraduationCap className="size-5 text-primary" />
//                 <h4 className="font-poppins font-semibold text-gray-900">
//                   Specialization
//                 </h4>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {faculty.specialization.split("&").map((spec, idx) => (
//                   <span
//                     key={idx}
//                     className="
//                       rounded-full bg-blue-50 px-3 py-1 text-sm font-medium
//                       text-blue-700
//                     "
//                   >
//                     {spec.trim()}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Bio */}
//             <div>
//               <h4 className="mb-2 font-poppins font-semibold text-gray-900">
//                 Biography
//               </h4>
//               <p
//                 className="
//                   text-sm/relaxed text-gray-600
//                   md:text-base
//                 "
//               >
//                 {faculty.bio}
//               </p>
//             </div>

//             {/* Publications */}
//             {faculty.publications && faculty.publications.length > 0 && (
//               <div>
//                 <div className="mb-3 flex items-center space-x-2">
//                   <BookOpen className="size-5 text-primary" />
//                   <h4 className="font-poppins font-semibold text-gray-900">
//                     Publications & Research
//                   </h4>
//                 </div>
//                 <ul className="space-y-3">
//                   {faculty.publications.map((pub, index) => (
//                     <li
//                       key={index}
//                       className="flex items-start text-sm text-gray-600"
//                     >
//                       <span className="mr-2">•</span>
//                       <span>{pub}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Profile Links */}
//             {faculty.profileLinks && faculty.profileLinks.length > 0 && (
//               <div>
//                 <h4 className="mb-2 font-poppins font-semibold text-gray-900">
//                   Professional Profiles
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {faculty.profileLinks.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="
//                         inline-flex items-center gap-1 rounded-lg bg-blue-50
//                         px-3 py-1 text-sm font-medium text-blue-700
//                         transition-colors
//                         hover:bg-blue-100
//                       "
//                     >
//                       <ExternalLink className="size-3" />
//                       {link.includes("linkedin")
//                         ? "LinkedIn"
//                         : link.includes("scholar.google")
//                           ? "Google Scholar"
//                           : link.includes("researchgate")
//                             ? "ResearchGate"
//                             : link.includes("orcid")
//                               ? "ORCID"
//                               : "Profile"}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Additional Info */}
//             {faculty.additionalInfo && (
//               <div>
//                 <h4 className="mb-2 font-semibold text-gray-900">
//                   Additional Information
//                 </h4>
//                 <p className="text-sm/relaxed text-gray-600">
//                   {faculty.additionalInfo}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Action Footer */}
//           <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
//             <button
//               onClick={onClose}
//               className="
//                 rounded-lg bg-gray-100 px-6 py-2 font-medium text-gray-700
//                 transition-colors
//                 hover:bg-gray-200
//               "
//             >
//               Close Details
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

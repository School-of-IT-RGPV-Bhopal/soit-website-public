export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags?: string[];
};

export const faqData: FaqItem[] = [
  {
    id: "admissions-01",
    category: "Admissions",
    question: "How can I get admission to SOIT RGPV Bhopal for a B.Tech program?",
    answer:
      "Admissions are processed through the state counseling route based on the currently applicable entrance criteria notified for the academic year. You should complete registration and choice filling within the counseling timeline and keep checking the official updates for round-wise allotments.",
    tags: ["admissions", "counseling", "btech"],
  },
  {
    id: "admissions-02",
    category: "Admissions",
    question: "Is lateral entry available at SOIT?",
    answer:
      "Lateral entry options are announced as per governing norms for each admission cycle. Availability, eligibility, and seat matrix can vary by year, so candidates should verify the latest admission brochure and counseling notice.",
    tags: ["lateral-entry", "eligibility"],
  },
  {
    id: "admissions-03",
    category: "Admissions",
    question: "Which documents are usually needed during admission verification?",
    answer:
      "Students are typically asked for mark sheets, identity proof, transfer or migration documents where applicable, category certificates if claimed, and counseling allotment records. The final checklist is provided in the current official admission notice.",
    tags: ["documents", "verification"],
  },
  {
    id: "admissions-04",
    category: "Admissions",
    question: "Can admission fees be paid in installments?",
    answer:
      "Fee structure and payment mode are governed by institute instructions for the ongoing session. If an installment facility is announced, it is communicated through official notices with eligibility and due dates.",
    tags: ["fees", "payments"],
  },
  {
    id: "admissions-05",
    category: "Admissions",
    question: "Are scholarships available for newly admitted students?",
    answer:
      "Students can apply for scholarship schemes that are active for their category and course level in the relevant year. Application windows, required documents, and eligibility criteria follow the respective scholarship portal and institutional guidance.",
    tags: ["scholarship", "financial-aid"],
  },
  {
    id: "academics-01",
    category: "Academics",
    question: "What is the academic structure followed at SOIT?",
    answer:
      "The institute follows a semester-based academic model aligned with university regulations. Course delivery typically includes lectures, tutorials, practical sessions, and periodic assessments.",
    tags: ["semester", "curriculum"],
  },
  {
    id: "academics-02",
    category: "Academics",
    question: "Is class attendance mandatory?",
    answer:
      "Yes, attendance requirements apply as per institutional and university norms. Students should maintain the prescribed minimum attendance to remain eligible for examinations and internal evaluation components.",
    tags: ["attendance", "exam-eligibility"],
  },
  {
    id: "academics-03",
    category: "Academics",
    question: "How are electives and open elective choices handled?",
    answer:
      "Elective choices are offered according to semester planning and seat availability. Students are informed about available options and timelines before registration in each relevant semester.",
    tags: ["electives", "registration"],
  },
  {
    id: "academics-04",
    category: "Academics",
    question: "What can I do if I need revaluation or have a backlog?",
    answer:
      "Revaluation and backlog procedures are handled under the applicable university examination rules. Students should follow the published process, deadlines, and fee instructions for the concerned exam cycle.",
    tags: ["revaluation", "backlog", "exams"],
  },
  {
    id: "academics-05",
    category: "Academics",
    question: "When do students start minor and major projects?",
    answer:
      "Project work is generally scheduled in higher semesters according to the curriculum scheme in force. Departmental guidance covers topic approval, mentoring, milestone reviews, and final evaluation format.",
    tags: ["projects", "capstone"],
  },
  {
    id: "labs-01",
    category: "Labs & Infrastructure",
    question: "What kind of laboratories are available for students?",
    answer:
      "SOIT supports practical learning through discipline-specific computer and technical labs aligned with course requirements. Lab usage is organized through academic schedules, and additional access may be announced by the department.",
    tags: ["labs", "practicals"],
  },
  {
    id: "labs-02",
    category: "Labs & Infrastructure",
    question: "Do students get internet and software tool access on campus?",
    answer:
      "Campus academic spaces generally provide internet-enabled resources for coursework and project activities. Software access depends on lab setup and licensed tools made available for the semester.",
    tags: ["internet", "software"],
  },
  {
    id: "labs-03",
    category: "Labs & Infrastructure",
    question: "Is there a central library or digital learning support?",
    answer:
      "Students can use institutional library facilities and academic reference resources as per access rules. Availability of digital resources and timings is communicated through official channels.",
    tags: ["library", "resources"],
  },
  {
    id: "labs-04",
    category: "Labs & Infrastructure",
    question: "Are there facilities for innovation, prototyping, or startup work?",
    answer:
      "Innovation and project-oriented activities are encouraged through departmental initiatives, technical clubs, and guided project work. Specific facilities and participation modes are announced whenever programs are active.",
    tags: ["innovation", "startup", "projects"],
  },
  {
    id: "labs-05",
    category: "Labs & Infrastructure",
    question: "What classroom infrastructure should students expect?",
    answer:
      "Teaching spaces are designed to support regular lectures, presentations, and interactive sessions. Infrastructure upgrades and room allocations are managed by the institute based on academic needs.",
    tags: ["classrooms", "infrastructure"],
  },
  {
    id: "student-council-01",
    category: "Student Council",
    question: "How can a student join the student council or leadership teams?",
    answer:
      "Student representation opportunities are announced through notices for nominations, selection, or elections as applicable. Eligibility and role descriptions are shared during each council formation cycle.",
    tags: ["student-council", "leadership"],
  },
  {
    id: "student-council-02",
    category: "Student Council",
    question: "Does SOIT have clubs run under student coordination?",
    answer:
      "Yes, student-driven technical and cultural activities are commonly conducted under departmental or institutional guidance. Club announcements, membership calls, and activity calendars are shared through official channels.",
    tags: ["clubs", "activities"],
  },
  {
    id: "student-council-03",
    category: "Student Council",
    question: "Can first-year students participate in council-led activities?",
    answer:
      "First-year students are generally encouraged to participate in student activities and volunteer teams. Participation details depend on the event type, timeline, and coordinator instructions.",
    tags: ["first-year", "participation"],
  },
  {
    id: "student-council-04",
    category: "Student Council",
    question: "How are student issues escalated through the council?",
    answer:
      "Students can raise concerns to designated class representatives or council coordinators as per the communication process in use. Matters are typically forwarded to relevant faculty or administrative points for resolution.",
    tags: ["grievance", "support"],
  },
  {
    id: "student-council-05",
    category: "Student Council",
    question: "Can students propose and lead new campus initiatives?",
    answer:
      "Yes, proposals for events or initiatives can be submitted through the defined approval process. Approval depends on feasibility, mentoring support, schedule fit, and institutional permissions.",
    tags: ["initiatives", "proposals", "events"],
  },
  {
    id: "placements-01",
    category: "Placements",
    question: "From which semester does placement preparation usually begin?",
    answer:
      "Placement-oriented preparation generally starts before the final placement cycle through training and readiness activities. Students are advised to engage early with aptitude, communication, and technical practice.",
    tags: ["placement-prep", "training"],
  },
  {
    id: "placements-02",
    category: "Placements",
    question: "Are internship opportunities supported by the department?",
    answer:
      "Internship opportunities are communicated through official notices, faculty guidance, and industry outreach activities. Eligibility and selection criteria depend on the internship provider and program timeline.",
    tags: ["internship", "industry"],
  },
  {
    id: "placements-03",
    category: "Placements",
    question: "What eligibility criteria are used for campus drives?",
    answer:
      "Campus drive criteria are primarily defined by recruiting organizations, including metrics like academic consistency or backlog status. Students must check each drive notice carefully because criteria can differ from one company to another.",
    tags: ["eligibility", "campus-drive"],
  },
  {
    id: "placements-04",
    category: "Placements",
    question: "Which sectors usually recruit from SOIT students?",
    answer:
      "Recruitment interest generally includes software, IT services, analytics, and related technical domains. The exact company mix changes each season based on hiring demand and drive schedules.",
    tags: ["recruiters", "sectors"],
  },
  {
    id: "placements-05",
    category: "Placements",
    question: "Can students receive support for off-campus opportunities as well?",
    answer:
      "Students are encouraged to pursue both campus and off-campus opportunities in parallel. Guidance is usually provided on resume readiness, interview preparation, and professional networking approaches.",
    tags: ["off-campus", "career-support"],
  },
  {
    id: "events-01",
    category: "Events",
    question: "What major events are typically organized in an academic year?",
    answer:
      "SOIT generally hosts a mix of technical, cultural, and academic engagement events during the session. Event themes and schedules are published through official announcements.",
    tags: ["annual-events", "calendar"],
  },
  {
    id: "events-02",
    category: "Events",
    question: "Are hackathons and coding contests conducted for students?",
    answer:
      "Yes, coding and innovation-focused competitions are commonly part of student activity cycles. Participation format, team size, and selection process are announced for each event.",
    tags: ["hackathon", "coding"],
  },
  {
    id: "events-03",
    category: "Events",
    question: "Can students from early semesters participate in major events?",
    answer:
      "Early-semester students are usually encouraged to participate in events to build exposure and teamwork skills. Any event-specific restrictions are mentioned in the registration notice.",
    tags: ["participation", "first-year"],
  },
  {
    id: "events-04",
    category: "Events",
    question: "How do I register for workshops or seminars at SOIT?",
    answer:
      "Registration links or forms are shared in the event notice released by organizers. Students should complete registration within deadlines and follow participation instructions issued for that event.",
    tags: ["workshops", "seminars", "registration"],
  },
  {
    id: "events-05",
    category: "Events",
    question: "Do participants receive certificates for events and workshops?",
    answer:
      "Certificate policies depend on the event type and organizer guidelines. If certificates are offered, eligibility conditions such as attendance or task completion are usually stated in advance.",
    tags: ["certificates", "workshops"],
  },
  {
    id: "support-01",
    category: "Contact & Support",
    question: "Where should I ask general questions about SOIT programs and campus information?",
    answer:
      "Use the official website contact channels and designated office communication points for verified responses. For department-specific issues, route your query to the relevant administrative desk.",
    tags: ["contact", "general-support"],
  },
  {
    id: "support-02",
    category: "Contact & Support",
    question: "How can applicants get help during the admission process?",
    answer:
      "Admission support is typically provided through counseling-related notices and the institutional help channels active for that cycle. Applicants should keep application details ready when requesting guidance.",
    tags: ["admission-help", "applicants"],
  },
  {
    id: "support-03",
    category: "Contact & Support",
    question: "Who should I contact for document verification or enrollment clarifications?",
    answer:
      "Document and enrollment clarifications are handled by designated academic or administrative offices as per process stage. Students should refer to current notices to identify the correct desk before visiting.",
    tags: ["verification", "enrollment"],
  },
  {
    id: "support-04",
    category: "Contact & Support",
    question: "What should I do if I face issues with the website form or online submission?",
    answer:
      "Retry with complete details, capture the issue context, and report it through available support channels mentioned on the official website. Include your application or student identifiers where relevant for faster assistance.",
    tags: ["technical-support", "website"],
  },
  {
    id: "support-05",
    category: "Contact & Support",
    question: "Is there an escalation path for urgent student welfare concerns?",
    answer:
      "Urgent welfare concerns should be escalated through designated institutional support mechanisms and responsible authorities listed in current student notices. Use official channels immediately so the matter can be addressed promptly.",
    tags: ["welfare", "escalation"],
  },
];

export const faqIndex: Array<{ id: string; q: string; a: string }> = faqData.map(
  ({ id, question, answer }) => ({
    id,
    q: question,
    a: answer,
  }),
);

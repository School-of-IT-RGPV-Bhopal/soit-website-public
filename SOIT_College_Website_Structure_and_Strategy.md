# **Main Doc**

# **SOIT College Website Structure and Strategy**

# **Strategic Digital Transformation and Web Architecture Master Plan for the School of Information Technology, Rajiv Gandhi Proudyogiki Vishwavidyalaya**

## **1\. Executive Summary and Strategic Vision**

### **1.1 Introduction**

In the contemporary landscape of higher education, a university's digital presence serves as its primary interface with the world. For the School of Information Technology (SoIT) at Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal, the official website is not merely a repository of academic notices but a critical strategic asset. As a University Teaching Department (UTD) located within the expansive RGPV ecosystem, SoIT occupies a distinct position, offering specialized undergraduate and postgraduate programs in high-demand fields such as Artificial Intelligence, Machine Learning, Data Science, and Computer Science & Business Systems.1

The current digital footprint of RGPV is centralized, servicing hundreds of affiliated colleges with broad administrative functions.3 However, this centralization often dilutes the specific identity of individual teaching departments like SoIT. Prospective students seeking specialized courses in "Computer Science & Business Systems", "Data Science" or “Artificial Intelligence and Machine Learning” require a dedicated, high-fidelity platform that communicates the department's specific value proposition, research capabilities, and placement outcomes with granular clarity.

This comprehensive strategic report outlines the architecture, design, content strategy, and technical implementation plan for a new, autonomous official website for SoIT. The directive is to architect a static, public-facing website hosted on a cost-neutral platform (Vercel, Cloudflare Pages, or Netlify) using a custom domain. This constraint is identified not as a limitation but as an opportunity to adopt the Jamstack architecture—a modern web development paradigm that prioritizes performance, security, and scalability, aligning the department's digital infrastructure with the very technologies taught in its classrooms.

### **1.2 The Strategic Imperative**

The development of this web platform must be driven by four strategic pillars, derived from an analysis of global best practices and local requirements:

1. **Recruitment and Enrollment Optimization:** The site must function as a conversion engine. By showcasing the relevance of the curriculum—specifically the AICTE-approved B.Tech courses in AI & ML, Data Science and CSBS—and offering transparent placement data, the site will attract high-caliber students who might otherwise gravitate toward private institutions with superior marketing.2  
2. **Academic Transparency and Utility:** Current students require immediate, friction-free access to academic resources. Moving beyond static PDF lists, the site must offer interactive syllabi, dynamic academic calendars, and downloadable lab manuals, thereby improving the student experience and reducing administrative friction.5  
3. **Research Visibility and Collaboration:** To elevate SoIT’s standing from a teaching department to a research hub, the website must prominently feature the work of its faculty and research scholars. Structuring research output into dedicated "Lab Pages" rather than generic lists will align SoIT with the presentation standards of elite institutions like MIT CSAIL, fostering potential for grants and inter-university collaboration.7  
4. **Alumni Engagement and Industry Validation:** The department's history, established in 2002, has produced a vast alumni network.3 The website must serve as a bridge to this network, utilizing alumni success stories to validate the program's Return on Investment (ROI) to prospective families and industry recruiters.9

### **1.3 Scope of the Report**

This document provides an exhaustive blueprint for the project. It begins with a rigorous benchmarking analysis of global leaders (MIT, Stanford, IIT Bombay, IIM Ahmedabad) to extract architectural patterns. It then proceeds to technical specifications, detailing the selection of Next.js over other static site generators, the nuances of free-tier hosting policies, and a component-based design system using Tailwind CSS. Finally, it addresses the governance model, proposing a student-led "Open Source" maintenance strategy that turns the website itself into a pedagogical tool.

---

## **2\. Institutional Context and Stakeholder Analysis**

### **2.1 The RGPV Ecosystem and SoIT’s Position**

Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV) acts as a massive umbrella university for the state of Madhya Pradesh. The University Teaching Departments (UTDs), including SoIT, represent the university's direct academic delivery arm. SoIT, established in the academic year 2002-03, has evolved to focus intensely on cutting-edge computational disciplines.3

The website must distinguish SoIT from the University Institute of Technology (UIT), another constituent college of RGPV, and the hundreds of affiliated private colleges. Confusion often arises among applicants regarding the difference between "UTD" and "UIT".11 Therefore, the website’s branding must explicitly state: **"School of Information Technology, University Teaching Department, RGPV."** This clarity is essential for establishing the department's premium status and autonomous academic culture.

### **2.2 Stakeholder Needs Assessment**

| Stakeholder Group | Primary Needs | Current Pain Points | Strategic Web Solution |
| :---- | :---- | :---- | :---- |
| **Prospective Students** | Admission criteria, specific course lists (AI/ML vs. CSBS), fee structure, placement stats. | Information is buried in massive university-wide PDF circulars; distinction between courses is unclear. | Dedicated "Admissions" microsite with comparative course grids and infographic placement reports. |
| **Current Students** | Exam schedules, syllabus, lab manuals, notices regarding scholarships and events. | Reliance on notice boards or circulated WhatsApp messages; outdated PDFs. | "Student Corner" with a searchable notice board and digital repository for syllabi and schemes. |
| **Faculty & Staff** | Visibility for research papers, profile management for conferences, easy way to post class updates. | Lack of individual web presence; research often invisible to the global community. | Dynamic "Faculty Profile" pages with auto-updated Google Scholar citations and research tags. |
| **Alumni & Industry** | Recruitment contact info, verification of credentials, alumni networking events. | No central hub for alumni success stories or recruiter guidelines. | "Career & Placement" portal featuring recruiter logos, IPRS-style reports, and alumni testimonials. |

---

## **3\. Global Benchmarking and Best Practices**

To architect a world-class digital presence, we must deconstruct the strategies of elite technical and management institutions. This analysis identifies replicable patterns to be adapted for SoIT.

### **3.1 MIT Computer Science and Artificial Intelligence Laboratory (CSAIL)**

Architectural Insight: MIT CSAIL’s website is organized not just by administrative hierarchy, but by Research Impact. It avoids burying research under generic "Academics" tabs. Instead, it elevates specific labs (e.g., "Computation Structures Group," "Computational Biology Group") to top-level navigability.7  
Relevance to SoIT: SoIT lists diverse research areas such as "Image Processing," "Mobile Computing," "Data Mining," and "Cyber Forensics".2 Currently, these are often just bullet points in a brochure.  
Strategic Adaptation: The SoIT website should adopt a "Lab-First" navigation for its Research section. Instead of a single page listing areas, we will create profile pages for "The Cyber Forensic Lab" and the "Machine Learning Laboratory." Each lab page will aggregate associated faculty, relevant equipment (e.g., forensic workstations), and ongoing student projects, thereby signaling active research culture rather than passive teaching.

### **3.2 Stanford School of Engineering**

Architectural Insight: Stanford employs a user-centric "Utility Navigation" that sits above the primary menu. It offers audience-based pathways: "For Faculty," "For Students," "For Alumni".13 Furthermore, their layout emphasizes visual storytelling with high-quality photography and clear "content buckets" to manage information density.14  
Relevance to SoIT: RGPV’s ecosystem is administratively complex. A prospective student needs different data (cutoffs) than a current student (exam forms).  
Strategic Adaptation: We will implement a secondary "Utility Bar" at the top of the header. This allows us to declutter the main navigation, keeping it focused on high-level branding (Academics, Research, About), while shifting functional links (Results, Login, Portal) to the utility bar. This separates marketing functions from utility functions.

### **3.3 IIT Bombay (Department of Computer Science & Engineering)**

Architectural Insight: The IIT Bombay CSE site is utilitarian and performance-oriented. It highlights "Resources" (lecture notes, software mirrors) and "Calendar" prominently.15 It explicitly lists faculty strength (45 full-time) and Ph.D. student count (100+), using numbers as a badge of quality.  
Relevance to SoIT: For a technical department, website performance is a proxy for competence. A site that loads instantly and provides quick access to syllabus PDFs signals engineering rigor.  
Strategic Adaptation: The homepage should feature a "Quick Links" sidebar for high-frequency internal tasks (e.g., "Download Syllabus," "Academic Calendar," "RGPV Portal Login"). We must also prominently display the "Stats Counter" (e.g., "60 Intake per Batch," "100% Doctoral Faculty") to build immediate trust.

### **3.4 IIM Ahmedabad**

Architectural Insight: IIMA sets the gold standard for transparency in placements. Their placement reports are audited, detailed, and follow the Indian Placement Reporting Standards (IPRS).17 They break down data by sector, function, and salary cohorts.  
Relevance to SoIT: Engineering students are career-focused. Vague placement data ("Many students placed") damages trust.  
Strategic Adaptation: SoIT’s placement section must move beyond simple lists. We will implement interactive charts showing the "Median Salary Growth" over 3 years. Even if the numbers are modest (e.g., 4 LPA median 19), presenting them with the rigorous structure of IIMA (Sector-wise split, Top Quartile data) builds immense credibility and demonstrates honesty.

---

## **4\. Technical Architecture and Stack Selection**

The requirement for a "static public-facing website" hosted on a "free platform" with "custom domain" support dictates a **Jamstack** (JavaScript, APIs, and Markup) architecture. This approach pre-renders pages at build time, ensuring the site is hack-proof (no database to inject SQL into), incredibly fast (served via CDN), and cost-efficient.

### **4.1 Framework Selection: Next.js vs. Hugo vs. Gatsby**

| Feature | Next.js (Recommended) | Hugo | Gatsby |
| :---- | :---- | :---- | :---- |
| **Language** | React (JavaScript/TypeScript) | Go (Golang) | React (JavaScript) |
| **Build Speed** | Fast (Incremental Static Regeneration) | Extremely Fast | Slower on large sites |
| **Flexibility** | High (Hybrid Static \+ Server) | Medium (Strictly Static) | High (Plugin heavy) |
| **Curriculum Fit** | **Best.** Aligns with "Web Tech" syllabus. | Good, but Go is niche for students. | Overkill for this scale. |
| **Ecosystem** | Massive component library (Tailwind UI). | Limited to themes. | Declining popularity. |

Decision: Next.js is the selected framework.  
Rationale:

1. **Curriculum Alignment:** SoIT students study "Internet and Web Technology" and "Programming Systems".20 Next.js aligns with modern full-stack development, allowing the website codebase to serve as an open-source project for students to learn from.21  
2. **Scalability:** Next.js supports "Incremental Static Regeneration" (ISR), allowing the site to update specific pages (like News) without rebuilding the entire site, which is crucial as the content archive grows.  
3. **Template Availability:** The React ecosystem offers the richest variety of academic templates and UI components.22

### **4.2 Hosting Platform: Vercel vs. Cloudflare Pages**

To ensure zero cost while using a custom domain (e.g., soit.rgpv.ac.in), we must rigorously analyze the "Free Tier" limits.

| Feature | Vercel (Hobby) | Cloudflare Pages (Free) |
| :---- | :---- | :---- |
| **Bandwidth** | 100 GB/month | Unlimited |
| **Build Minutes** | 6,000 mins/month | 500 builds/month |
| **Commercial Use** | **Restricted** (Non-commercial only) | **Allowed** |
| **Custom Domain** | Included (SSL Free) | Included (SSL Free) |
| **Edge Network** | Global Edge Network | Enterprise-Grade Global Network |

Strategic Recommendation:  
While Vercel offers a superior Developer Experience (DX) and is the creator of Next.js, its Terms of Service 24 restrict the Hobby plan to "personal" use. While educational non-profits are often tolerated, Cloudflare Pages explicitly allows commercial use and offers unlimited bandwidth.26

**Plan**: Develop in Next.js. Deploy initially to Vercel for ease of setup during the prototype phase. If traffic exceeds 100GB (unlikely for a department site unless hosting large videos directly), migrate the static export to Cloudflare Pages. This dual-strategy ensures we are never locked into a paid plan.

### **4.3 Content Management System (CMS)**

To allow non-technical faculty to update notices without coding, a Headless CMS is required.  
Selection: Git-based CMS (Decap CMS) or a structured Markdown workflow.  
Rationale: Storing content as Markdown files in the GitHub repository ensures the site remains truly static and portable. It eliminates vendor lock-in associated with SaaS CMS platforms like Contentful or Sanity, which may change their free tier limits in the future.

---

## **5\. Information Architecture and Sitemap**

The information architecture must navigate the complexity of the department, balancing marketing needs with utility.

### **5.1 Global Navigation Bar (Primary Menu)**

1. **About SoIT**  
   * Director's Message (Dr. Jitendra Agrawal) 3  
   * Vision & Mission  
   * History & Legacy (Est. 2002\)  
   * Infrastructure (Cyber Forensic Lab, Machine Learning Lab, Library) 4  
   * Contact & Location Map  
2. **Academics**  
   * **Undergraduate (B.Tech):**  
     * Computer Science & Business Systems (Intake: 60\)  
     * CSE \- AI & Machine Learning (Intake: 60\)  
     * CSE \- Data Science (Intake: 60\)  
   * **Postgraduate (M.Tech):**  
     * M.Tech in Data Science (Intake: 18\) 2  
     * M.Tech in Information Technology  
   * **Doctoral Program:** Research Areas & Guides  
   * **Academic Calendar** (Interactive & PDF Download) 6  
   * **Syllabus & Scheme** (Selectable by Semester)  
3. **People (Faculty & Staff)**  
   * Faculty Directory (Card layout with specialization tags)  
   * Administrative Staff  
   * Research Scholars  
4. **Research & Innovation**  
   * Research Areas (Systems, Security, AI/ML, Data Mining) 2  
   * Labs & Facilities  
   * Publications Index  
   * Projects & Grants  
5. **Admissions**  
   * B.Tech Admission (DTE MP Counseling Link) 11  
   * M.Tech Admission (GATE/Non-GATE)  
   * Fee Structure  
   * Scholarships (Chancellor's Fellowship, Post-Matric) 3  
6. **Placements**  
   * Placement Statistics (Year-wise visualization) 9  
   * Recruiter Network (Logo Grid)  
   * Alumni Success Stories  
7. **Student Life**  
   * Student Council  
   * Clubs (Coding Club, E-Cell) 28  
   * Events (Convolution Techfest(UIT), Shankhnaad) 29  
   * Hostel & Amenities  
   * Student Achievements

### **5.2 Rationale for Sitemap Decisions**

* **Separation of "Admissions" and "Academics":** Benchmarking shows that prospective students look for *how to get in* (Admissions), while current students look for *what to study* (Academics). Combining them creates user friction.  
* **"People" instead of just "Faculty":** This inclusive term allows the listing of research scholars and administrative support, creating a stronger sense of community.  
* **Dedicated "Student Life" Section:** This is crucial for "selling" the campus experience. Photos of the "Convolution" techfest and "E-Cell" activities 28 provide the social proof of a vibrant campus that brochure text cannot convey.

---

## **6\. Detailed Page Specifications and Content Strategy**

This section provides granular details on the content and layout for critical pages, integrating specific data points found in the research.

### **6.1 The Homepage: The "Hub" Strategy**

Objective: Serve diverse audiences immediately without clutter.  
Layout Modules:

1. **Hero Section:** High-quality video loop of the SoIT campus and labs. Overlay text: "Innovating Future Technology in the Heart of India."  
2. **Notice Board / News Ticker:** A tabbed widget ("Latest News," "Notices," "Events") is essential for a university site. It must be prominent to reduce calls to the office regarding "Exam Form Dates."  
3. **Program Highlights:** Three distinct cards for the flagship courses: **CSBS**, **AI/ML**, and **Data Science**. Each card must have an icon representing the field (e.g., a neural network graph for AI/ML).  
4. **Director’s Corner:** A brief, authoritative quote from **Director SoIT**, emphasizing the department's commitment to research-led teaching.  
5. **Key Statistics Bar:**  
   * **20+ Years** of Excellence (Est. 2002\)  
   * **100%** Doctoral Faculty 30  
   * **50+** Industry Partners  
   * **Cyber Forensic Lab** Access 4  
6. **Recruiter Marquee:** A scrolling strip of logos (TCS, Infosys, Wipro, Amazon) to signal employability immediately.31

### **6.2 Academic Program Pages (e.g., B.Tech CSE \- AI & ML)**

Rationale: Simply listing the syllabus is insufficient. These pages must sell the value of the specialization.  
Content Components:

* **Program Overview:** Explain *why* AI & ML is critical today.  
* **Curriculum Structure:** An interactive accordion list from Semester 1 to 8\.  
  * *Example:* Semester 7 should list **"AL-701 Computer Vision," "AL-702(D) Machine Learning for Data Science,"** and **"AL-703(B) Augmented and Virtual Reality"**.20  
  * *Action:* Provide a "Download Scheme PDF" button for the official RGPV document.  
* **Laboratories:** Mention access to specific labs like the **Machine Learning Laboratory**.4  
* **Career Pathways:** List potential roles: "Computer Vision Engineer," "Data Analyst," "AI Research Scientist."

### **6.3 Faculty Profile System**

Current State: Faculty lists are often PDF scans.30  
Proposed State: Individual dynamic pages for each faculty member.  
Specific Content Integration:

* Profile page for every faculty member, should highlight their vast experience, specializations, vision, leadership, contributions to student mentorship. and research.  
* Fields: Biography, Research Interests (tagged), Google Scholar Link, Recent Publications, and Contact Email (obfuscated).

### **6.4 Research and Labs**

Benchmarking: RGPV mentions "Cyber Forensic Laboratory" and "Machine Learning Laboratory".4  
Content Strategy: Treat each lab as a sub-entity with its own page.

* **Cyber Forensic Lab:** Detail the software/hardware available (e.g., EnCase, Forensic Workstations). List faculty in charge.  
* **Research Areas:** Create pages for the 10 listed areas 2 including "Systems and Networking," "Security and Privacy," "Programming Languages," and "Robotics."  
* **Rationale:** This serves as evidence for accreditation bodies (NAAC/NBA) that the infrastructure claims are genuine.

### **6.5 Placement & Alumni Portal**

Insight: Snippets show average packages around 4-5 LPA with highs of 12 LPA.9  
Strategy: Transparency builds trust.

* **Placement Trends Chart:** A bar chart showing the "Highest Package" progression:  
  * 2019: 9.5 LPA  
  * 2022: 12 LPA  
  * 2023: 13 LPA.9  
  * *Insight:* This upward trend is a powerful marketing tool.  
* **Placement Statistics Table:**  
  * **Median Package:** \~4.25 LPA.19  
  * **Placement Percentage:** \~88-90%.9  
* **Recruiter Grid:** Categorize them: "Premium Recruiters" (Amazon, TCS Digital) vs "Mass Recruiters."  
* **Alumni Testimonials:** Feature stories of alumni who have cleared GATE or are working in top firms. The snippet mentions students are "top rankers in GATE exam".31 Highlighting this targets the academic-focused student segment.

### **6.6 Student Life and Events**

**Content:**

* **Student Council:** Dedicated section for the Student Council showcasing its activities and members.  
* **Techfest "Convolution":** Dedicate a section to "Convolution," the annual techfest.29 Include a gallery of past events (Roborace, Coding Competitions).  
* **Cultural Fest "Shankhnaad":** Highlight the cultural vibrancy.33  
* **Clubs:** Feature the **"E-Cell"** (Entrepreneurship Cell) and **"Phoenix"** club.28 Explain their activities (workshops, meetups).  
* **Hostel:** Include photos of the hostel facilities and mess.28

---

## **7\. Functional Specifications and Governance**

### **7.1 Accessibility and Inclusivity**

Requirement: As a public university site, it must comply with Web Content Accessibility Guidelines (WCAG) 2.1.  
Implementation:

* **High Contrast Mode:** A toggle in the header for visually impaired users.  
* **Bilingual Support (Hindi/English):** While the primary content is English, key notices and the "About" section should have a Hindi translation option, respecting the linguistic context of Madhya Pradesh.  
* **Screen Reader Compatibility:** Proper use of semantic HTML (\<nav\>, \<main\>, aria-labels).

### **7.2 Performance Optimization (Core Web Vitals)**

Target: Lighthouse Score of 90+.  
Tech:

* **Image Optimization:** Use next/image to serve WebP formats.  
* **Lazy Loading:** Images below the fold should not load until the user scrolls.  
* **Static Export:** Pre-rendering pages ensures Time-to-First-Byte (TTFB) is under 50ms on Vercel's edge network.

### **7.3 Governance: The "Open Source" Model**

Concept: Treat the website as an open-source project managed by the SoIT Coding Club.  
Workflow:

1. **Repository:** Hosted on GitHub (e.g., github.com/SoIT-RGPV/official-website).  
2. **Contribution:** Students can submit Pull Requests (PRs) to fix bugs or update content.  
3. Review: A designated Faculty In-Charge (e.g., from the "Programming Languages" research group) reviews and merges PRs.  
   Benefit: This ensures the site is maintained at zero cost while providing students with real-world experience in Git, CI/CD, and React development—skills highly valued by recruiters.21

---

## **8\. Implementation Roadmap**

### **Phase 1: Foundation (Weeks 1-2)**

* **Repo Setup:** Initialize Next.js project with TypeScript and Tailwind CSS.  
* **Content Collection:** Circulate forms to faculty for bios. Collect syllabus PDFs from the RGPV main portal.5  
* **Design System:** Define the color palette (RGPV Blue/Orange) and typography.

### **Phase 2: Development (Weeks 3-6)**

* **Component Build:** Develop Navbar, Footer, Faculty Card, Notice Widget.  
* **Page Assembly:** Build Home, Academics, and Placement pages.  
* **Data Integration:** Create JSON files for the curriculum and faculty lists.

### **Phase 3: Deployment & Content Load (Week 7\)**

* **Vercel Setup:** Connect GitHub repo. Configure build settings.  
* **Domain Mapping:** Configure DNS to point soit.rgpv.ac.in to Vercel.  
* **Content Audit:** Verify all 10 research areas and 4 degree programs are accurately represented.

### **Phase 4: Handoff (Week 8\)**

* **Documentation:** Write a CONTRIBUTING.md guide for future student maintainers.  
* **Launch:** Official announcement by the Director.

---

## **9\. Conclusion**

The proposed website for the School of Information Technology, RGPV, is a strategic instrument designed to bridge the gap between the department's academic reality and its public perception. By adopting a **Next.js \+ Vercel/Cloudflare** architecture, SoIT secures a zero-cost, enterprise-grade infrastructure that rivals private universities. The content strategy, deeply rooted in the specific strengths of the department—from the **Cyber Forensic Lab** to the **Convolution Techfest**—ensures that the site tells a compelling, authentic story. Most importantly, by structuring the development as an internal open-source project, the website itself becomes a testament to the technical competence of SoIT's students, proving the quality of education not just through claims, but through the very platform those claims are hosted on.

#### **Works cited**

1. Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal, accessed on November 25, 2025, [https://www.rgpv.ac.in/departments/uit.aspx](https://www.rgpv.ac.in/departments/uit.aspx)  
2. RGPV SoIT \- Bhopal, accessed on November 25, 2025, [https://www.rgpv.ac.in/AboutRGTU/RGPV\_SoIT.aspx](https://www.rgpv.ac.in/AboutRGTU/RGPV_SoIT.aspx)  
3. Rajiv Gandhi Proudyogiki Vishwavidyalaya, accessed on November 25, 2025, [https://www.rgpv.ac.in/](https://www.rgpv.ac.in/)  
4. School of information Technology RGPV Bhopal, accessed on November 25, 2025, [https://www.rgpv.ac.in/Departments/ITDept.aspx](https://www.rgpv.ac.in/Departments/ITDept.aspx)  
5. Rajiv Gandhi ProudyogikiVishwavidyalaya Bhopal M.Tech (Artificial Intelligence & Data Science) First Semester Syllabus, accessed on November 25, 2025, [https://www.rgpv.ac.in/CDN/PubContent/Scheme/I\_Sem\_AI\_Data\_Scinece\_Syllabus180121041642.pdf](https://www.rgpv.ac.in/CDN/PubContent/Scheme/I_Sem_AI_Data_Scinece_Syllabus180121041642.pdf)  
6. academic calendar for the year 2025 \- Rajiv Gandhi Proudyogiki Vishwavidyalaya, accessed on November 25, 2025, [https://www.rgpv.ac.in/PDF/ACADEMIC%20CALENDAR%202025-26.pdf](https://www.rgpv.ac.in/PDF/ACADEMIC%20CALENDAR%202025-26.pdf)  
7. MIT Computer Science and Artificial Intelligence Laboratory \- Wikipedia, accessed on November 25, 2025, [https://en.wikipedia.org/wiki/MIT\_Computer\_Science\_and\_Artificial\_Intelligence\_Laboratory](https://en.wikipedia.org/wiki/MIT_Computer_Science_and_Artificial_Intelligence_Laboratory)  
8. Research \- MIT CSAIL, accessed on November 25, 2025, [https://www.csail.mit.edu/research](https://www.csail.mit.edu/research)  
9. Placements at University Institute of Technology RGPV Bhopal \- Collegese, accessed on November 25, 2025, [https://collegese.com/colleges/university-institute-of-technology-rgpv-bhopal-2025/placements](https://collegese.com/colleges/university-institute-of-technology-rgpv-bhopal-2025/placements)  
10. Alumni Success Stories: Why Real Experiences Matter More Than Rankings \- AlmaShines, accessed on November 25, 2025, [https://www.almashines.io/beyond-rankings-alumni-success-stories/](https://www.almashines.io/beyond-rankings-alumni-success-stories/)  
11. Undergraduate Admission \-.:: Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal ::., accessed on November 25, 2025, [https://www.rgpv.ac.in/Admission/UndergraduateAdmission.aspx](https://www.rgpv.ac.in/Admission/UndergraduateAdmission.aspx)  
12. Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal, accessed on November 25, 2025, [https://www.rgpv.ac.in/AboutRGTU/Directors\_UTD.aspx](https://www.rgpv.ac.in/AboutRGTU/Directors_UTD.aspx)  
13. Visit | Stanford University School of Engineering, accessed on November 25, 2025, [https://engineering.stanford.edu/about/visit](https://engineering.stanford.edu/about/visit)  
14. 5 Steps for Designing Modern Website Navigation \- Stanford University, accessed on November 25, 2025, [https://uit.stanford.edu/news/5-steps-designing-modern-website-navigation](https://uit.stanford.edu/news/5-steps-designing-modern-website-navigation)  
15. Department of Computer Science and Engineering. IIT Bombay, accessed on November 25, 2025, [https://www.cse.iitb.ac.in/](https://www.cse.iitb.ac.in/)  
16. About Us \- CSE, IIT Bombay, accessed on November 25, 2025, [https://www.cse.iitb.ac.in/about](https://www.cse.iitb.ac.in/about)  
17. IIMA \- MBA Career and Placement, accessed on November 25, 2025, [https://www.iima.ac.in/academics/mba/career-and-placement](https://www.iima.ac.in/academics/mba/career-and-placement)  
18. PGP Placement Committee 2010-11 \- IIM Ahmedabad, accessed on November 25, 2025, [https://web.iima.ac.in/users/placement/files/IIMA\_Placements%202011\_Guidelines.pdf](https://web.iima.ac.in/users/placement/files/IIMA_Placements%202011_Guidelines.pdf)  
19. RGPV Placements 2024: Average Package, Median Package, Top Recruiters \- Shiksha, accessed on November 25, 2025, [https://www.shiksha.com/university/rgpv-rajiv-gandhi-proudyogiki-vishwavidyalaya-bhopal-51542/placement](https://www.shiksha.com/university/rgpv-rajiv-gandhi-proudyogiki-vishwavidyalaya-bhopal-51542/placement)  
20. Syllabus of B.tech. VII SEM AIML (RGPV) CS.com \- career-shiksha.com, accessed on November 25, 2025, [https://career-shiksha.com/post/syllabus-of-btech-7th-sem-aiml-rgpv/](https://career-shiksha.com/post/syllabus-of-btech-7th-sem-aiml-rgpv/)  
21. Soumojitshome2023/nextjs-college-website-project: This project is developed as part of a college-level website design challenge. The website provides comprehensive information about the college, including events, notices, departments, and more. \- GitHub, accessed on November 25, 2025, [https://github.com/Soumojitshome2023/college-website-nextjs](https://github.com/Soumojitshome2023/college-website-nextjs)  
22. School Nextjs Website Templates \- ThemeForest, accessed on November 25, 2025, [https://themeforest.net/search/school%20nextjs](https://themeforest.net/search/school%20nextjs)  
23. Next.js Starter Templates & Themes \- Vercel, accessed on November 25, 2025, [https://vercel.com/templates/nextjs](https://vercel.com/templates/nextjs)  
24. Acceptable Use Policy \- Vercel, accessed on November 25, 2025, [https://vercel.com/legal/acceptable-use-policy](https://vercel.com/legal/acceptable-use-policy)  
25. Terms of Service \- Vercel, accessed on November 25, 2025, [https://vercel.com/legal/terms](https://vercel.com/legal/terms)  
26. Limits · Cloudflare Pages docs, accessed on November 25, 2025, [https://developers.cloudflare.com/pages/platform/limits/](https://developers.cloudflare.com/pages/platform/limits/)  
27. CloudFlare Pages Free Plan \- Reddit, accessed on November 25, 2025, [https://www.reddit.com/r/CloudFlare/comments/1ga4fk8/cloudflare\_pages\_free\_plan/](https://www.reddit.com/r/CloudFlare/comments/1ga4fk8/cloudflare_pages_free_plan/)  
28. School of Information Technology , RGPV Bhopal Hostel Fees 2026, Facilities, Rooms, Food, Photos \- Collegedunia, accessed on November 25, 2025, [https://collegedunia.com/college/64615-school-of-information-technology-rgpv-bhopal/hostel](https://collegedunia.com/college/64615-school-of-information-technology-rgpv-bhopal/hostel)  
29. Chancellor's Scholarships Distribution Ceremony 2018 was organized on 23-02 \- Rajiv Gandhi Proudyogiki Vishwavidyalaya, accessed on November 25, 2025, [https://www.rgpv.ac.in/CDN/PubContent/Advertisement/March18\_21110418012022.pdf](https://www.rgpv.ac.in/CDN/PubContent/Advertisement/March18_21110418012022.pdf)  
30. Regular & Contract Teaching Faculty in University Institute of Technology-RGPV Bhopal (2005-2016) \- Scribd, accessed on November 25, 2025, [https://www.scribd.com/document/339370779/Regular-Contract-Teaching-Faculty-in-University-Institute-of-Technology-RGPV-Bhopal-2005-2016](https://www.scribd.com/document/339370779/Regular-Contract-Teaching-Faculty-in-University-Institute-of-Technology-RGPV-Bhopal-2005-2016)  
31. School of Information Technology , RGPV Bhopal Placement 2026: Highest Package, Average Package, Top Recruiters \- Collegedunia, accessed on November 25, 2025, [https://collegedunia.com/college/64615-school-of-information-technology-rgpv-bhopal/placement](https://collegedunia.com/college/64615-school-of-information-technology-rgpv-bhopal/placement)  
32. the annual techfest of uit-rgpv, accessed on November 25, 2025, [https://www.rgpv.ac.in/CDN/PubContent/Advertisement/main%20poster-compressed080219114014.pdf](https://www.rgpv.ac.in/CDN/PubContent/Advertisement/main%20poster-compressed080219114014.pdf)  
33. Archive Notice \- Rajiv Gandhi Proudyogiki Vishwavidyalaya, accessed on November 25, 2025, [https://www.rgpv.ac.in/Uni/ImpNoticeArchive.aspx](https://www.rgpv.ac.in/Uni/ImpNoticeArchive.aspx)

# **Thought Board**

# **Website Revitalization Project: School of Information Technology (SoIT), UTD, RGPV**

**Date:** November 25, 2025 **Prepared For:** SoIT Administration & Development Team **Document Status:** Draft for Review

## **1\. Executive Summary**

This document outlines the strategic plan, architecture, and technical foundation for the new public-facing website for the School of Information Technology (SoIT), UTD, RGPV. The goal is to create a modern, professional, and highly performant static website that serves as the primary digital gateway for all stakeholders.

This plan is benchmarked against leading global technical and management institutions (e.g., MIT, Stanford, IITs, IIMs) and is designed for easy deployment on a free, modern platform like Vercel, with full custom domain support.

## **2\. Project Goals & Objectives**

The website's primary objectives are, in order of priority:

1. **Attract & Inform Prospective Students:** To be the most compelling and clear source of information for potential B.Tech, M.Tech, and Ph.D. candidates and their families.  
2. **Build Institutional Prestige:** To showcase the quality of faculty, research, and student achievements to the national and international academic community.  
3. **Engage Industry & Recruiters:** To create a clear portal for industry partners and placement recruiters to connect with the placement cell and understand the caliber of SoIT graduates.  
4. **Serve Current Stakeholders:** To provide a reliable information hub for current students and faculty (e.g., academic calendars, news, events).  
5. **Activate Alumni:** To build a connection point for alumni to stay informed, network, and contribute back to the institution.

## **3\. Target Audiences**

The website design and information architecture will be optimized for the following user personas:

* **Primary:**  
  * Prospective Students (and their Parents)  
* **Secondary:**  
  * Industry Recruiters / Placement Partners  
  * Prospective Faculty  
* **Tertiary:**  
  * Current Students  
  * Current Faculty  
  * Alumni  
  * Academic Researchers (from other institutions)

## **4\. Inspiration & Benchmarking**

Analysis of top-tier institutions (MIT, IIT Bombay, IIM Ahmedabad, Stanford) reveals several key principles:

* **Intuitive, Audience-First Navigation:** Clear, minimal top-level navigation (e.g., Academics, Admissions, Research, People).  
* **Mobile-First Design:** The majority of prospective students will access the site via mobile. The design must be responsive and fast.  
* **Strong Brand Identity:** High-quality, authentic photography and video are non-negotiable. Avoid stock photos.  
* **Clear Calls-to-Action (CTAs):** "Apply Now," "Learn More About Placements," "Explore Our Research."  
* **Faculty as a Centerpiece:** Faculty profiles are a key indicator of an institution's strength. They must be detailed and professional.

## **5\. Proposed Site Architecture (Sitemap)**

This sitemap forms the primary navigation and structure of the website.

* **1\. Home**  
  * Hero Section (High-quality video/image of campus/labs)  
  * Director's Welcome (Brief)  
  * Key Stats (Placements, Faculty, Student numbers)  
  * News & Events Feed  
  * Quick Links (for each audience: "Future Students," "Recruiters," "Current Students")  
  * Research Highlights  
  * Recruiters/Partners Logo Wall  
* **2\. About Us**  
  * Mission & Vision  
  * From the Director's Desk (Full Message)  
  * Our History (Tied to UTD & RGPV)  
  * Administration & Staff  
  * Infrastructure & Labs (Photo gallery)  
  * Contact & Visit Us (Embedded Map, addresses, contact form/info)  
* **3\. Academics**  
  * **Programs Offered** (Overview Page)  
    * `B.Tech (Information Technology)` (Detailed Page)  
      * Program Overview & Objectives  
      * Curriculum & Syllabus (Link to official RGPV docs)  
      * Program Outcomes  
      * Faculty associated with this program  
    * `M.Tech (Specialization 1)` (Detailed Page)  
      * (Same structure as above)  
    * `M.Tech (Specialization 2)` (Detailed Page)  
      * (Same structure as above)  
    * `Ph.D. Program` (Detailed Page)  
      * Admission Process  
      * Research Areas  
      * Faculty Supervisors  
  * Academic Calendar  
  * Academic Regulations & Ordinances (Links)  
* **4\. Admissions**  
  * How to Apply (Undergraduate)  
    * Eligibility (Link to JEE / MP DTE)  
    * Process & Key Dates  
  * How to Apply (Postgraduate)  
    * Eligibility (Link to GATE)  
    * Process & Key Dates  
  * How to Apply (Ph.D.)  
    * Process & Key Dates  
  * Tuition & Fees  
  * Scholarships & Financial Aid  
  * FAQ  
* **5\. Faculty & Research**  
  * **Faculty Directory** (A filterable grid of all faculty)  
    * `Individual Faculty Profile Page` (Crucial)  
      * High-quality profile photo  
      * Bio & Education  
      * Research Interests (Keywords)  
      * List of Publications (Link to Google Scholar/DBLP)  
      * Courses Taught  
      * Contact Info  
  * **Research Areas** (Landing pages for key areas: e.g., AI/ML, Cybersecurity, Data Science, IoT)  
  * Publications (A central, searchable feed/database)  
  * Sponsored Projects  
  * Research Labs  
* **6\. Placements (T\&P Cell)**  
  * Message from the T\&P Officer  
  * **Our Recruiters** (Prominent logo wall, filterable by year)  
  * Placement Statistics (Anonymized: Avg. Package, Highest, % Placed)  
  * Placement Procedure (For companies)  
  * Student Testimonials  
  * T\&P Cell Team & Contact  
* **7\. Student Life**  
  * Clubs & Organizations (e.g., Tech clubs, coding communities)  
  * Events & Activities (e.g., Hackathons, Tech-Fests, Workshops)  
  * Campus Life (Photos/info on hostels, facilities)  
* **8\. Alumni**  
  * Alumni Network (Link to portal/LinkedIn group)  
  * Notable Alumni (Spotlights)  
  * Give Back (Donation/mentorship info)  
* **9\. News & Events**  
  * A blog-style feed of all department news, announcements, and upcoming events.  
* **Footer (Global)**  
  * Contact Info  
  * Social Media Links (LinkedIn, X/Twitter, etc.)  
  * Quick Links (Apply, RGPV Main Site, UTD Site)  
  * Copyright & Privacy Policy

## **6\. Rationale for Key Sections**

* **Home:** This is the "digital front door." It must immediately convey professionalism and guide different audiences to their destinations. It's a marketing page.  
* **Academics (Programs):** This is the "product." Prospective students must be able to easily find and understand the details of each program, including what they will learn and who will teach them.  
* **Faculty & Research:** This showcases the "intellectual capital" of the institution. A strong, filterable faculty directory with detailed, up-to-date profiles is the single most effective way to build academic prestige.  
* **Placements:** For an IT institution in India, this is arguably the most critical page for prospective students and parents. It must be transparent, data-rich, and build confidence by showcasing top recruiters.

## **7\. Recommended Technology Stack**

For a static, public-facing website, performance, security, and ease of maintenance are paramount.

* **Framework: Next.js (with Static Site Generation \- SSG)**  
  * **Rationale:** Next.js is a React framework maintained by Vercel. Its SSG capabilities create pre-built HTML files, resulting in an extremely fast, secure, and SEO-friendly website. It has a massive developer ecosystem.  
* **Styling: Tailwind CSS**  
  * **Rationale:** A utility-first CSS framework that allows for rapid, custom, and responsive UI development directly in the HTML. This avoids custom CSS bloat and ensures consistency.  
* **Content Management: Headless CMS (e.g., Sanity.io, Contentful, or Git-based Markdown)**  
  * **Rationale:** A static site's content needs to be updatable by non-technical staff (e.g., admin, faculty). A Headless CMS provides a user-friendly editor (for News, Events, Faculty Profiles) that triggers a new "build" of the static site when content is updated.  
* **Version Control: Git (on GitHub/GitLab)**  
  * **Rationale:** Standard for all modern development. Provides history, collaboration, and is the trigger for Vercel's deployment.

## **8\. Hosting & Deployment Plan (Vercel)**

This directly addresses your requirement for free, easy hosting with a custom domain.

1. **Platform: Vercel**  
   * **Rationale:** Vercel is the creator of Next.js and provides the best-in-class hosting for it.  
   * **Free Tier:** Vercel's free "Hobby" plan is extremely generous and perfectly suited for a public-facing static university website. It includes a global CDN, automatic HTTPS, and more.  
   * **CI/CD:** Vercel connects directly to your GitHub/GitLab repository. When you `git push` new code (or when content is updated via the CMS), Vercel *automatically* builds and deploys the new version of the site with zero downtime.  
2. **Custom Domain Setup (e.g., `soit-rgpv.ac.in`)**  
   * **Process:** Vercel makes this incredibly simple.  
   * **Step 1:** You add your custom domain to the Vercel project settings.  
   * **Step 2:** Vercel provides you with DNS records (e.g., an `A` record or `CNAME` record).  
   * **Step 3:** You (or the RGPV IT admin) log in to your domain registrar (where `rgpv.ac.in` is managed) and add/update the DNS records for the `soit` subdomain to point to Vercel.  
   * **Result:** Vercel handles the rest, including provisioning a free SSL certificate (HTTPS). Your website will be securely served from your custom domain, all on the free plan.

## **9\. Next Steps**

1. **Stakeholder Review:** Circulate this document for approval from SoIT leadership.  
2. **Content Gathering:** This is the most critical and time-consuming step. Assign individuals to gather all content (text, faculty bios, program details, high-quality photos).  
3. **Design Phase:** Create high-fidelity mockups (e.g., in Figma) based on this approved structure.  
4. **Development:**  
   * Set up the Next.js project and GitHub repository.  
   * Set up the Headless CMS (e.g., Sanity.io).  
   * Build out the website components and pages based on the design.  
   * Integrate the CMS with the Next.js build process.  
5. **Deployment:**  
   * Connect the GitHub repo to Vercel for automatic deployments.  
   * Configure the custom domain as described above.  
6. **Launch & Train:** Train relevant staff on how to update content using the Headless CMS.


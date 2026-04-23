'use client';

import { useEffect } from 'react';
import { setupFadeUpAnimations } from "@utils/animations";
import FacultyMentorCard from "@components/credits/FacultyMentorCard";
import LeadershipCard from "@components/credits/LeadershipCard";
import StudentCard from "@components/credits/StudentCard";
import PhotographyCard from "@components/credits/PhotographyCard";
import SectionHeader from "@components/credits/SectionHeader";
import AcknowledgmentSection from "@components/credits/AcknowledgmentSection";

const facultyMentors = [
  {
    name: 'Dr. Jitendra Agrawal Sir',
    role: 'Senior Faculty Mentor',
    description: 'Providing strategic guidance and technical oversight for the project development',
    image: '/images/ProfessorImages/Jitendra_Agrawal_sir.jpg',
    colorScheme: 'blue' as const,
  },
  {
    name: 'Dr. Sanjeev Sharma Sir',
    role: 'Senior Faculty Mentor',
    description: 'Guiding research initiatives and ensuring academic excellence in project execution',
    image: '/images/ProfessorImages/Sanjeev_Sharma.png',
    colorScheme: 'blue' as const,
    delay: '0.1s',
  },
  {
    name: 'Nishchol Mishra Sir',
    role: 'Technical Mentor',
    description: 'Overseeing technical implementation and ensuring quality standards',
    image: '/images/ProfessorImages/Nishchol_Mishra_sir.jpeg',
    colorScheme: 'green' as const,
    delay: '0.2s',
  },
  {
    name: 'Varsha Sharma Mam',
    role: 'Design & UX Mentor',
    description: 'Ensuring design excellence and optimal user experience standards',
    image: '/images/ProfessorImages/Varsha_Sharma_mam.jpeg',
    colorScheme: 'purple' as const,
    delay: '0.3s',
  },
];

const projectLeaders = [
  {
    name: 'Rachna Namdev Ma\'am',
    role: 'Project Team Lead',
    badge: 'Team Lead',
    description: 'Coordinating all project activities, managing timelines, and ensuring seamless execution across all development phases',
    image: '/images/ProfessorImages/Rachna_Nagdev_mam.jpeg',
    colorScheme: 'indigo' as const,
  },
  {
    name: 'Mahendra Kumar Ahirwar Sir',
    role: 'Social Media Lead',
    badge: 'Social Media Lead',
    description: 'Managing digital presence, content strategy, and community engagement initiatives for the college',
    image: '/images/ProfessorImages/Mahendra_Ahirwar_sir_2.jpg',
    colorScheme: 'teal' as const,
    delay: '0.1s',
  },
];

const studentDevelopers = [
  { 
    name: 'Dhruv Tiwari', 
    role: 'Developer', 
    image: '/images/contributorImages/dhruv.jpg', 
    linkedinUrl: 'https://www.linkedin.com/in/dhruv-tiwari-7a3410314/',
  },
  { 
    name: 'Naman Sharma', 
    role: 'Developer', 
    image: '/images/contributorImages/naman.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/namansharma286',
  },
  { 
    name: 'Mahima Patel', 
    role: 'Developer', 
    image: '/images/contributorImages/mahima.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/mahima-patel13/',
  },
  { 
    name: 'Parag Chouhan', 
    role: 'Developer', 
    image: '/images/contributorImages/parag.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/parag-chouhan/',
  },
  { 
    name: 'Raghav Dubey', 
    role: 'Developer', 
    image: '/images/contributorImages/raghav.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/raghav-dubey-3183412b4/',
  },
];

export default function CreditsPage() {
  useEffect(() => {
    const cleanup = setupFadeUpAnimations();
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="
        border-b border-gray-300 bg-linear-to-r from-gray-800 to-gray-900 py-16
        shadow-lg
      ">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl fade-up text-center">
            <h1 className="
              mb-4 text-3xl font-bold text-white
              md:text-4xl
            ">Credits & Contributors</h1>
            <p className="
              mx-auto mb-6 max-w-3xl text-base/relaxed text-gray-200
            ">
              We acknowledge the dedicated mentors, faculty members, and students who contributed 
              their expertise, time, and effort to develop and maintain the website of the School of Information Technology, UTD, RGPV, Bhopal.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-white"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Faculty Mentors Section */}
        <section className="mb-16 fade-up">
          <SectionHeader 
            title="Faculty Mentors"
            description="Distinguished faculty members who provided guidance, oversight, and strategic direction for this project"
          />
          
          <div className="
            mx-auto grid max-w-7xl grid-cols-2 gap-8
            md:grid-cols-2
            lg:grid-cols-4
          ">
            {facultyMentors.map((mentor) => (
              <FacultyMentorCard key={mentor.name} {...mentor} />
            ))}
          </div>
        </section>

        {/* Team Leadership Section */}
        <section className="mb-16 fade-up">
          <SectionHeader 
            title="Project Leadership"
            description="Dedicated team leaders who coordinated project activities and ensured successful completion"
          />
          
          <div className="
            mx-auto grid max-w-5xl grid-cols-2 gap-8
            md:grid-cols-2
          ">
            {projectLeaders.map((leader) => (
              <LeadershipCard key={leader.name} {...leader} />
            ))}
          </div>
        </section>

        {/* Student Contributors Section */}
        <section className="mb-16 fade-up">
          <SectionHeader 
            title="Student Development Team"
            description="Talented students who contributed their technical skills, creativity, and dedication to bring this project to life"
          />
          
          <div className="
            mx-auto grid max-w-5xl grid-cols-2 gap-5
            md:grid-cols-2
            lg:grid-cols-3
          ">
            {/* Student Lead */}
            <StudentCard 
              name="Aradhya Joshi"
              role="Student Team Lead"
              description="Leading student development initiatives and coordinating technical implementation"
              badge="Student Lead"
              image="/images/contributorImages/aradhya.jpg"
              linkedinUrl="https://www.linkedin.com/in/aradhya-joshi/"
            />

            {/* Other Developers */}
            {studentDevelopers.map((student, index) => (
              <StudentCard 
                key={student.name}
                name={student.name}
                role={student.role}
                description="Contributing to development and implementation"
                delay={`${(index + 1) * 0.1}s`}
                image={student.image}
                linkedinUrl={student.linkedinUrl}
              />
            ))}

            {/* Photography Contributor */}
            {/* <PhotographyCard 
              name="Raghav Dubey"
              role="Photography Contributor"
              description="Providing visual content and photography for the website"
              delay="0.6s"
              image="/images/contributorImages/raghav.jpg"
            /> */}
          </div>
        </section>

        {/* Acknowledgment Section */}
        <AcknowledgmentSection />
      </div>
    </main>
  );
}

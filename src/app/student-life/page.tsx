"use client";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarNav from "@components/student-life/SidebarNav";
// import CampusLifeSection from "@components/student-life/CampusLifeSection";
import AcademicBlocksSection from "@components/student-life/AcademicBlocksSection";
import EventsSection from "@components/student-life/EventsSection";
import StudentEngagementSection from "@components/student-life/StudentEngagementSection";
import ClubsCommitteesSection from "@components/student-life/ClubsCommitteesSection";
import CityOfBhopalSection from "@components/student-life/CityOfBhopalSection";
import ConnectSection from "@components/student-life/ConnectSection";

const campusHero = "/images/soitrgpv_building.png";

const queryClient = new QueryClient();

const navItems = [
  // { id: "campus-life", label: "Campus Life & Amenities" },
  { id: "academic-blocks", label: "Academic & Administrative Blocks" },
  { id: "events", label: "Events & Festival Celebrations" },
  { id: "student-engagement", label: "Student Engagement & Development" },
  { id: "clubs-committees", label: "Clubs & Committees" },
  { id: "city-bhopal", label: "City of Bhopal" },
  { id: "connect", label: "Connect with Us" },
];

const PageContent = () => {
  const [activeSection, setActiveSection] = useState("campus-life");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const navItem = navItems[i];
        if (section && navItem && section.offsetTop <= scrollPosition) {
          setActiveSection(navItem.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen">
        <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section
          className="
            relative h-[40vh] overflow-hidden
            md:h-[55vh]
          "
          
        >
          <div
            className="
              fade-image absolute inset-0 bg-cover bg-center
              will-change-transform
            "
            style={{ backgroundImage: `url(${campusHero})` }}
          />

          <div className="absolute inset-0" />

          <div className="relative flex h-full items-center justify-center px-4">
            <h1
              className="
                section-title text-center text-4xl font-bold text-white
                drop-shadow-lg
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Life @SOIT
            </h1>
          </div>
        </section>


        {/* Main Content */}
        <div
          className="
            px-4 py-12
            sm:px-6
            md:px-10
            lg:px-16
            xl:px-24
          "
        >
          <div
            className="
              flex flex-col
              lg:flex-row
            "
          >
            {/* Sidebar */}
            <aside
              className="
                mb-12 hidden flex-none
                md:block
                lg:mb-0 lg:w-72 lg:max-w-[18rem] lg:min-w-[18rem] lg:border-r
                lg:pr-6
              "
            >
              <div className="
                relative
                lg:sticky lg:top-24
              ">
                <SidebarNav
                  items={navItems}
                  activeSection={activeSection}
                  onNavClick={handleNavClick}
                />
              </div>
            </aside>

            {/* Content */}
            <div
              className="
                w-full min-w-0 space-y-12
                sm:space-y-16
                lg:flex-[1_1_0%] lg:space-y-20 lg:pl-12
              "
            >

              {/* <CampusLifeSection /> */}
              <AcademicBlocksSection />
              <EventsSection />
              <StudentEngagementSection />
              <ClubsCommitteesSection />
              <CityOfBhopalSection />
              <ConnectSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const StudentLifePage = () => (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider>
      <Toaster />
      <Sonner /> */}
    <PageContent />
    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

export default StudentLifePage;

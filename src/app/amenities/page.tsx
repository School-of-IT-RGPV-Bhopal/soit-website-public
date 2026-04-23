"use client";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarNav from "@components/student-life/SidebarNav";
import AmenitiesSection from "@components/amenities/AmenitiesSection";

const campusHero = "/assets/GalleryImages/MainBuilding.jpeg";

const queryClient = new QueryClient();

const navItems = [
  { id: "campus-amenities", label: "Campus Amenities" },
  { id: "academic-facilities", label: "Academic Facilities" },
  { id: "residential-facilities", label: "Residential Facilities" },
  { id: "support-services", label: "Support Services" },
];

const PageContent = () => {
  const [activeSection, setActiveSection] = useState("campus-amenities");

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
            className="fade-image absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${campusHero})` }}
          />
          <div className="absolute inset-0" />
          <div className="relative flex h-full items-center justify-center">
            <h1
              className="
                section-title text-center text-4xl font-bold text-white
                drop-shadow-lg
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Campus Amenities
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <div
          className="
            px-6 py-12
            md:px-12
            lg:px-30
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
                mb-12 shrink-0
                lg:mb-0 lg:w-72 lg:border-r-2 lg:pr-10
              "
            >
              <div className="lg:sticky lg:top-24">
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
                max-w-5xl flex-1 space-y-24
                lg:pl-16
              "
            >
              <AmenitiesSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const AmenitiesPage = () => (
  <QueryClientProvider client={queryClient}>
    <PageContent />
  </QueryClientProvider>
);

export default AmenitiesPage;

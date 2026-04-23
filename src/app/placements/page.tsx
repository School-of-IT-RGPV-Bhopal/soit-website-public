"use client";

import { useEffect } from "react";

import HeroSection from "./HeroSection";
import WhyRecruitFromUs from "./WhyRecruitFromUs";
import Message from "./Message";
import PlacementHighlight from "./PlacementHighlight";
import Recruiters from "./Recruiters";
import PlacementTrends from "./PlacementTrends";
import Testimonial from "./Testimonial";
import ContactPlacement from "./ContactPlacement";

export default function PlacementsPage() {
  // Fade-up animation
  /* useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); */

  // Fade-up animation (Medicaps-style)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroSection />

      <div className="relative z-10 mx-auto max-w-7xl bg-white px-6">
        <div className="fade-up">
          <WhyRecruitFromUs />
        </div>
        <div className="fade-up">
          <Message />
        </div>
        <div className="fade-up">
          <PlacementHighlight />
        </div>
        <div className="fade-up">
          <PlacementTrends />
        </div>
        {/* <div className="fade-up"><PlacementStatistics /></div> */}
        {/* commented out because for now only CSBS batch passed */}
        <div className="fade-up">
          <Recruiters />
        </div>
        <div className="fade-up">
          <Testimonial />
        </div>
        <div className="fade-up">
          <ContactPlacement />
        </div>
      </div>
    </>
  );
}

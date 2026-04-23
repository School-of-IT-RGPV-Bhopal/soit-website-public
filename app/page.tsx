"use client";

import { useEffect } from "react";
import Hero from "@components/Hero";
import About from "@components/About";
import LeadershipMessage from "@components/LeadershipMessage";
import Faculty from "@components/Faculty";
import Research from "@components/Research";
// import Alumni from "@components/Alumni';
import { setupFadeUpAnimations } from "@utils/animations";
import {
  vcMessageData,
  directorMessageData,
} from "@utils/leadershipData";

export default function Home() {
  useEffect(() => {
    // Setup fade-up animations
    const cleanupAnimations = setupFadeUpAnimations();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe all elements with fade-up class
    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      cleanupAnimations();
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <LeadershipMessage {...vcMessageData} />
      <LeadershipMessage {...directorMessageData} />
      <Faculty />
      <Research />
    </>
  );
}
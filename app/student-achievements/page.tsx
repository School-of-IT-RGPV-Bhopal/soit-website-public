"use client";

import { useEffect } from "react";
import AchievementsHero from "@components/achievements/AchievementsHero";
import AchievementStats from "@components/achievements/AchievementStats";
import AchievementCategories from "@components/achievements/AchievementCategories";
import FeaturedAchievements from "@components/achievements/FeaturedAchievements";
import CompetitionsWon from "@components/achievements/CompetitionsWon";
import ResearchPublications from "@components/achievements/ResearchPublications";
import CertificationsShowcase from "@components/achievements/CertificationsShowcase";
import AnnualMagazine from "@components/achievements/AnnualMagazine";

export default function StudentAchievementsPage() {
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
      { threshold: 0.15 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AchievementsHero />

      <div className="relative z-10 mx-auto max-w-7xl bg-white px-0">
        <div className="fade-up">
          <AchievementStats />
        </div>

        <div className="fade-up">
          <FeaturedAchievements />
        </div>

        <div className="fade-up">
          <AchievementCategories />
        </div>

        <div className="fade-up">
          <CompetitionsWon />
        </div>

        <div className="fade-up">
          <ResearchPublications />
        </div>

        <div className="fade-up">
          <CertificationsShowcase />
        </div>

        <div className="fade-up">
          <AnnualMagazine />
        </div>
      </div>
    </>
  );
}

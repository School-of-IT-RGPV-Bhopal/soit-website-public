"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Trophy, Award } from "lucide-react";

const SQRT_5000 = Math.sqrt(5000);

const competitions = [
  {
    tempId: 0,
    title: "Samadhaan",
    position: "Winner (National)",
    detail: "Secured the top spot with a prize of ₹50,000.",
    year: "2025",
    type: "National"
  },
  {
    tempId: 1,
    title: "AceHack",
    position: "All Girls Team Winnner",
    detail: "Team PowerPuff Girls earned ₹10,000 for their innovative solution.",
    year: "2026",
    type: "National"
  },
  {
    tempId: 2,
    title: "ACM ICPC Asia Regionals",
    position: "Qualified",
    detail: "Represented SOIT at the world's most prestigious competitive programming event.",
    year: "2025",
    type: "International"
  },
  {
    tempId: 3,
    title: "MP State Hackathon",
    position: "Winner (State)",
    detail: "Emerged victorious among all state colleges.",
    year: "2025",
    type: "State"
  },
  {
    tempId: 4,
    title: "TCS CodeVita Season 13",
    position: "Global Rank 4 and 14",
    detail: "Individual excellence led to elite job offers and global recognition.",
    year: "2025",
    type: "International"
  },
  // {
  //   tempId: 5,
  //   title: "Google Code Jam",
  //   position: "Top 500",
  //   detail: "Ranked among the top algorithms experts globally.",
  //   year: "2024",
  //   type: "International"
  // }
];

interface AchievementCardProps {
  position: number;
  data: typeof competitions[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  position,
  data,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  // REMOVED: Main card border logic for the center card
  const cardClasses = `absolute left-1/2 top-1/2 cursor-pointer p-8 transition-all duration-500 ease-in-out ${
    isCenter
      ? "z-10 bg-white text-slate-900 shadow-2xl shadow-blue-500/10 scale-105"
      : "z-0 bg-slate-50/50 text-slate-400 border border-slate-200 hover:border-slate-300"
  }`;

  const iconBoxClasses = `mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
    isCenter ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-200 text-slate-400"
  }`;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cardClasses}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2 : -2}deg)
        `,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-100"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1.5,
        }}
      />
      
      <div className={iconBoxClasses}>
        {data.type === "International" ? (
          <Trophy className="size-6" />
        ) : (
          <Star className="size-6" />
        )}
      </div>

      <h4 className="
        mb-2 text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase
      ">
        {data.year} • {data.type}
      </h4>
      
      <h3 className={`
        mb-2 text-xl/tight font-bold
        ${isCenter ? `text-slate-900` : `text-slate-500`}
      `}>
        {data.title}
      </h3>
      
      <p className={`
        mb-4 text-sm font-semibold
        ${isCenter ? "text-blue-600" : `text-slate-400`}
      `}>
        {data.position}
      </p>

      <p className={`
        text-sm/relaxed italic
        ${isCenter ? `font-medium text-slate-600` : `text-slate-300`}
      `}>
        "{data.detail}"
      </p>

      <div className="absolute right-8 bottom-8">
         <Award className={`
           size-5 transition-opacity
           ${isCenter ? `text-yellow-500 opacity-100` : `opacity-0`}
         `} />
      </div>
    </div>
  );
};

export default function StarsOfSOIT() {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(competitions);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-24">
      <div className="relative z-20 mb-16 text-center">
        <h2 className="
          text-4xl font-extrabold tracking-tight text-slate-900
          sm:text-6xl
        ">
          The Stars of <span className="text-blue-600">SOIT</span>
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-slate-200" />
          <p className="
            text-xs font-medium tracking-widest text-slate-500 uppercase
          ">
            Our shiniest students competing and winning at the highest levels</p>
          <div className="h-px w-8 bg-slate-200" />
        </div>
      </div>

      <div className="relative h-162.5 w-full bg-slate-50/30">
        {list.map((item, index) => {
          const position = list.length % 2
            ? index - (list.length - 1) / 2
            : index - list.length / 2;
          return (
            <AchievementCard
              key={item.tempId}
              data={item}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}

        <div className="
          absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 gap-3
        ">
          <button
            onClick={() => handleMove(-1)}
            className="
              flex size-12 items-center justify-center rounded-full border
              border-slate-200 bg-white transition-all
              hover:border-slate-300 hover:bg-slate-50
              active:scale-90
            "
            aria-label="Previous"
          >
            <ChevronLeft className="size-5 text-slate-600" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="
              flex size-12 items-center justify-center rounded-full border
              border-slate-200 bg-white transition-all
              hover:border-slate-300 hover:bg-slate-50
              active:scale-90
            "
            aria-label="Next"
          >
            <ChevronRight className="size-5 text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
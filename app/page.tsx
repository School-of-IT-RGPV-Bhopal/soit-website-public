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
// 'use client';

// import { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Link from 'next/link';
// import Hero from '../components/Hero';
// import About from '../components/About';
// import DirectorNote from '../components/DirectorNote';
// import Programs from '../components/Programs';
// import Admissions from '../components/Admissions';
// import Faculty from '../components/Faculty';
// import Research from '../components/Research';
// import Placements from '../components/Placements';
// import Alumni from '../components/Alumni';
// import MOU from '../components/MOU';
// import NewsEvents from '../components/NewsEvents';
// import Gallery from '../components/Gallery';
// import Contact from '../components/Contact';
// import Footer from '../components/Footer';

// // Modern Construction Banner Component
// const ConstructionBanner = () => {
//   return (
//     <div
//       className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 `}
//     >
//       <div className="bg-black text-white py-2 px-4 text-center text-sm">
//         <span className="inline-flex items-center gap-2">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
//           </span>
//           Website Under Construction — Coming Soon
//         </span>
//       </div>
//     </div>
//   );
// };

// export default function Home() {
//   const [scrollY, setScrollY] = useState(0);
//   const [showBanner, setShowBanner] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//       // Show banner after scrolling 100px
//       setShowBanner(window.scrollY > 100);
//     };

//     // Add scroll event listener
//     window.addEventListener('scroll', handleScroll);

//     // Setup intersection observer for fade-up animations
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     // Observe all elements with fade-up class
//     document.querySelectorAll('.fade-up').forEach((el) => {
//       observer.observe(el);
//     });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Construction Banner
//       <ConstructionBanner/> */}

//       <Header scrollY={scrollY} />
//       <ConstructionBanner/>
//       <main className="">
//         <Hero />
//         <About />
//         <DirectorNote />
//         <Programs />
//         <Admissions />
//         <Faculty />
//         <Research />
//         <Placements />
//         <Alumni />
//         <MOU />
//         <NewsEvents />
//         <Gallery />
//         <Contact />
//       </main>
//       <Footer />

//     </div>
//   );
// }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import Header from '../components/Header';
// // import Hero from '../components/Hero';
// // import About from '../components/About';
// // import DirectorNote from '../components/DirectorNote';
// // import Programs from '../components/Programs';
// // import Admissions from '../components/Admissions';
// // import Faculty from '../components/Faculty';
// // import Research from '../components/Research';
// // // import Placements from '../components/Placements';
// // // import Alumni from '../components/Alumni';
// // import MOU from '../components/MOU';
// // import NewsEvents from '../components/NewsEvents';
// // import Gallery from '../components/Gallery';
// // import Contact from '../components/Contact';
// // import Footer from '../components/Footer';

// // export default function Home() {
// //   const [scrollY, setScrollY] = useState(0);
// //   const [showToast, setShowToast] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const currentScrollY = window.scrollY;
// //       setScrollY(currentScrollY);

// //       // Show toast if user has scrolled down more than 50px
// //       if (currentScrollY > 50) {
// //         setShowToast(true);
// //       } else {
// //         setShowToast(false);
// //       }
// //     };

// //     window.addEventListener('scroll', handleScroll);

// //     // Setup intersection observer for fade-up animations
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             entry.target.classList.add('visible');
// //           }
// //         });
// //       },
// //       { threshold: 0.1 }
// //     );

// //     document.querySelectorAll('.fade-up').forEach((el) => {
// //       observer.observe(el);
// //     });

// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //       observer.disconnect();
// //     };
// //   }, []);

// //   return (
// //     <div className="min-h-screen relative">
// //       <Header scrollY={scrollY} />
// //       <main>
// //         <Hero />
// //         <About />
// //         <DirectorNote />
// //         <Programs />
// //         <Admissions />
// //         <Faculty />
// //         <Research />
// //         {/* <Placements />
// //         <Alumni /> */}
// //         <MOU />
// //         <NewsEvents />
// //         <Gallery />
// //         <Contact />
// //       </main>
// //       <Footer />

// //       {/* --- RESPONSIVE PERMANENT TOAST --- */}
// //       <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[95%]">

// //         {/* Glass Container */}
// //         <div className="flex items-center gap-2 md:gap-3 px-2 py-2 pr-4 md:pr-5 rounded-full shadow-2xl border border-white/40 bg-white/60 backdrop-blur-md hover:bg-white/80 transition-colors cursor-default">

// //           {/* Badge: Smaller on mobile, Larger on desktop */}
// //           <span className="bg-black text-white text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 rounded-full uppercase tracking-wide whitespace-nowrap">
// //             Notice
// //           </span>
// //           <span className="text-gray-900 text-[11px] md:text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
// //             Website under Construction
// //             <span className="animate-pulse">🔨</span>
// //           </span>
// //         </div>
// //       </div>
// //       {/* ---------------------------------- */}
// //     </div>
// //   );
// // }
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import Header from '../components/Header';
// // // import Link from 'next/link';
// // // import Hero from '../components/Hero';
// // // import About from '../components/About';
// // // import DirectorNote from '../components/DirectorNote';
// // // import Programs from '../components/Programs';
// // // import Admissions from '../components/Admissions';
// // // import Faculty from '../components/Faculty';
// // // import Research from '../components/Research';
// // // import Placements from '../components/Placements';
// // // import Alumni from '../components/Alumni';
// // // import MOU from '../components/MOU';
// // // import NewsEvents from '../components/NewsEvents';
// // // import Gallery from '../components/Gallery';
// // // import Contact from '../components/Contact';
// // // import Footer from '../components/Footer';

// // // export default function Home() {
// // //   const [scrollY, setScrollY] = useState(0);

// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       setScrollY(window.scrollY);
// // //     };

// // //     // Add scroll event listener
// // //     window.addEventListener('scroll', handleScroll);

// // //     // Setup intersection observer for fade-up animations
// // //     const observer = new IntersectionObserver(
// // //       (entries) => {
// // //         entries.forEach((entry) => {
// // //           if (entry.isIntersecting) {
// // //             entry.target.classList.add('visible');
// // //           }
// // //         });
// // //       },
// // //       { threshold: 0.1 }
// // //     );

// // //     // Observe all elements with fade-up class
// // //     document.querySelectorAll('.fade-up').forEach((el) => {
// // //       observer.observe(el);
// // //     });

// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll);
// // //       observer.disconnect();
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen">
// // //       <Header scrollY={scrollY} />
// // //       <main className="">
// // //         <Hero />
// // //         <About />
// // //         <DirectorNote />
// // //         <Programs />
// // //         <Admissions />
// // //         <Faculty />
// // //         <Research />
// // //         <Placements />
// // //         <Alumni />
// // //         <MOU />
// // //         <NewsEvents />
// // //         <Gallery />
// // //         <Contact />
// // //       </main>
// // //       <Footer />
// // //     </div>
// // //   );
// // // }

/// VERIFY AND REMOVE THIS FILE IF NOT NEEDED.
/// NO USAGE FOUND IN THE CODEBASE. PROBABLY DELETED IN A RECENT COMMIT.

// import { amenities } from "@/data/student_life/amenities";

// const CampusLifeSection = () => {
//   return (
//     <section id="campus-life" className="scroll-mt-24">
//       <h2 className="section-title">Campus Life</h2>

//       <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
//         Our university offers students the best resources on campus that aid in
//         their academic and extra-curricular endeavors. The campus features
//         state-of-the-art facilities, a well-equipped library, fully furnished
//         hostels, and world-class sports facilities that create an environment
//         conducive to holistic development.
//       </p>

//       <p className="mb-10 text-justify text-lg/relaxed text-foreground/80">
//         There is never a dull moment here, with endless opportunities coming the
//         students&apos; way at all times. Various events, conclaves, seminars,
//         and festivals mark the entire calendar, offering nothing but the
//         experiences of a lifetime!
//       </p>

//       <div
//         className="
//           grid gap-8
//           md:grid-cols-2
//         "
//       >
//         {amenities.map((amenity, index) => (
//           <div
//             key={amenity.title}
//             className="
//               group/50 amenity-card rounded-2xl border bg-background p-8
//               transition-all
//               hover:shadow-xl
//             "
//             style={{ animationDelay: `${index * 100}ms` }}
//           >
//             <div
//               className="
//                 flex flex-col items-start gap-6
//                 sm:flex-row
//               "
//             >
//               <div className="shrink-0 rounded-2xl p-4 transition-colors">
//                 <amenity.icon
//                   className="
//                     size-8 transition-transform
//                     group-hover:scale-110
//                   "
//                 />
//               </div>
//               <div>
//                 <h3 className="mb-3 text-xl font-bold transition-colors">
//                   {amenity.title}
//                 </h3>
//                 <p
//                   className="
//                     text-justify text-sm/relaxed
//                     md:text-base
//                   "
//                 >
//                   {amenity.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CampusLifeSection;

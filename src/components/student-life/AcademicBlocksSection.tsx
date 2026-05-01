import { blocks } from "@/data/student_life/campus";
import Image from "next/image";

const AcademicBlocksSection = () => {
  return (
    <section id="academic-blocks" className="scroll-mt-24 px-4 sm:px-0">
      {/* Heading */}
      <div className="mb-6 flex items-center gap-4">
        <h2 className="section-title text-left">
          Academic & Administrative Blocks
        </h2>
        <div className="h-px flex-1 bg-black" />
      </div>

      {/* Intro */}
      <p className="mb-12 text-justify text-lg leading-relaxed text-foreground/80">
        Our campus infrastructure is designed to facilitate seamless academic
        operations and administrative efficiency. These spaces support everyday
        learning, collaboration, and institutional functioning in a practical
        and student-friendly environment.
      </p>

      {/* Blocks */}
      <div className="mx-auto max-w-6xl space-y-16">
        {blocks.map((block, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={block.id}
              className={`grid items-stretch gap-8 md:grid-cols-2 ${
                isReversed ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden rounded-xl aspect-4/3 sm:aspect-16/10 md:aspect-5/4">
                <Image
                  src={block.imageUrl}
                  alt={block.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center">
                <h3 className="mb-3 text-2xl font-semibold">{block.title}</h3>

                <p className="mb-4 text-justify leading-relaxed text-foreground/80">
                  {block.description}
                </p>

                <p className="text-foreground/70">
                  {block.features.join(" • ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AcademicBlocksSection;
// // import { GraduationCap, Building, Users, Laptop } from "lucide-react";
// import Image from "next/image";
// export type CampusBlock = {
//   id: string;
//   title: string;
//   description: string;
//   features: string[];
//   imageUrl: string;
// };

// const blocks: CampusBlock[] = [
//   {
//     id: "academic",
//     title: "Academic Block",
//     description:
//       "The Academic Block houses modern classrooms and learning spaces designed to support interactive and technology-enabled teaching.",
//     features: [
//       "Smart Classrooms",
//       "Seminar Halls",
//       "Case Study Rooms",
//       "Faculty Cabins",
//     ],
//     imageUrl: "/assets/GalleryImages/MainBuilding.jpeg",
//   },
//   {
//     id: "administrative",
//     title: "Administrative Block",
//     description:
//       "The Administrative Block is the hub of institutional management, ensuring smooth academic and student services operations.",
//     features: [
//       "Director's Office",
//       "Registrar Office",
//       "Accounts Department",
//       "Student Services",
//     ],
//     imageUrl: "/assets/GalleryImages/DeptLib.jpeg",
//   },
//   {
//     id: "computer-centre",
//     title: "Knowledge Resource Center",
//     description:
//       "The Knowledge Resource Center provides students with access to computing resources, study spaces, and technical support for academic work.",
//     features: [
//       "High-Speed Internet",
//       "24/7 Lab Access",
//       "Latest Software",
//       "Technical Support",
//     ],
//     imageUrl: "/assets/GalleryImages/CBLab.jpeg",
//   },
//   {
//     id: "conference",
//     title: "Conference Centre",
//     description:
//       "The Conference Centre hosts academic events, meetings, and large gatherings with modern presentation and communication facilities.",
//     features: [
//       "Auditorium",
//       "Meeting Rooms",
//       "Video Conferencing",
//       "Event Spaces",
//     ],
//     imageUrl: "/assets/GalleryImages/DSLab.jpeg",
//   },
// ];

// const AcademicBlocksSection = () => {
//   return (
//     <section
//       id="academic-blocks"
//       className="
//       scroll-mt-24 px-4
//       sm:px-0
//     "
//     >
//       {/* Heading */}
//       <div className="mb-6 flex items-center gap-4">
//         <h2 className="section-title text-left">
//           Academic & Administrative Blocks
//         </h2>
//         <div className="h-px flex-1 bg-black" />
//       </div>

//       {/* Intro */}
//       <p className="mb-12 text-justify text-lg/relaxed text-foreground/80">
//         Our campus infrastructure is designed to facilitate seamless academic
//         operations and administrative efficiency. These spaces support everyday
//         learning, collaboration, and institutional functioning in a practical
//         and student-friendly environment.
//       </p>

//       {/* Blocks */}
//       <div className="mx-auto max-w-6xl space-y-16">
//         {blocks.map((block, index) => {
//           const isReversed = index % 2 !== 0;

//           return (
//             <div
//               key={block.id}
//               className={`
//                 grid items-center gap-8
//                 md:grid-cols-2
//                 ${isReversed ? "md:[&>*:first-child]:order-2" : ""}
//               `}
//             >
//               {/* Image */}
//               <div className="relative h-64 overflow-hidden md:h-195">
//                 <Image
//                   src={block.imageUrl}
//                   alt={block.title}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   priority={false} // Set to true if this is the "Hero" image
//                 />
//               </div>
//               {/* Text */}
//               <div>
//                 <h3 className="mb-3 text-2xl font-semibold">{block.title}</h3>
//                 <p
//                   className="
//                   mb-4 text-justify leading-relaxed text-foreground/80
//                 "
//                 >
//                   {block.description} Lorem ipsum Lorem ipsum dolor sit amet
//                   consectetur adipisicing elit. Tempore praesentium illum
//                   excepturi inventore animi eius fugiat consectetur adipisicing
//                   elit. Possimus libero illo harum incidunt labore delectus
//                   obcaecati omnis nemo, totam laudantium fugiat quidem in,
//                   adipisci iusto ad, ipsa rerum ab minima.
//                 </p>

//                 <p className="text-foreground/70">
//                   {block.features.join(" • ")}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default AcademicBlocksSection;

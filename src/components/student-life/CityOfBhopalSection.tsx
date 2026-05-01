// import { MapPin, TreePine, Landmark, Sun } from "lucide-react";
import Image from "next/image";

// export type CityHighlight = {
//   id: string;
//   title: string;
//   description: string;
// };

// const highlights: CityHighlight[] = [
//   {
//     id: "lakes",
//     title: "A City Shaped by Water",
//     description:
//       "Bhopal is often called the City of Lakes, and for good reason. The Upper and Lower Lakes are not just landmarks, but part of everyday life here—quiet walks, evening sunsets, and a sense of calm that balances academic routines.",
//   },
//   {
//     id: "heritage",
//     title: "History in Everyday Spaces",
//     description:
//       "From old markets and mosques to museums and heritage buildings, the city carries layers of history that students encounter in daily life, not just in textbooks.",
//   },
//   {
//     id: "green",
//     title: "Green and Livable",
//     description:
//       "With places like Van Vihar and wide green stretches around the city, Bhopal offers breathing space that makes student life healthier and more relaxed.",
//   },
//   {
//     id: "connected",
//     title: "Comfortably Connected",
//     description:
//       "As a capital city, Bhopal is well connected by rail, road, and air, yet it retains a pace that feels manageable and welcoming for students living away from home.",
//   },
// ];

const CityOfBhopalSection = () => {
  return (
    <section id="city-bhopal" className="
      scroll-mt-24 px-4
      sm:px-0
    ">
      {/* Heading */}
      <div className="mb-6 flex items-center gap-4">
          <h2 className="section-title text-left">Student Life in Bhopal</h2>
          <div className="h-px flex-1 bg-black" />
        </div>

      <div className="
        mx-auto grid max-w-6xl items-center gap-8
        md:grid-cols-2
      ">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src="/images/bhopal.jpg"
            alt="Student life in Bhopal"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <p className="text-justify text-lg/relaxed text-foreground/80">
          Bhopal offers a comfortable and welcoming environment for students, with its calm lakes, green
          spaces, and a pace of life that makes it easy to balance academics and everyday living. As the
          capital of Madhya Pradesh, the city is well connected and full of culture, giving students plenty
          of opportunities to explore, unwind, and grow beyond the classroom.
        </p>
      </div>
    </section>
  );
};

export default CityOfBhopalSection;

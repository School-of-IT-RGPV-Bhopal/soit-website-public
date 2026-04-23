import {
  Building2,
  Mic2,
  Coffee,
  Dumbbell,
  Landmark,
  Mail,
  Wrench,
  Hotel,
  BookOpen,
  Shield,
  Heart,
  Church,
  GraduationCap,
  ShoppingBag,
  Zap,
  Home,
  Theater,
  Users,
  Building,
  Map,
  BedDouble,
  LucideIcon,
} from "lucide-react";

interface Amenity {
  icon: LucideIcon;
  title: string;
  description: string;
  urlName: string;
}

const campusAmenities: Amenity[] = [
  {
    icon: Building2,
    title: "The Campus",
    description:
      "Spread across acres of lush greenery, RGPV campus provides a serene and inspiring environment for academic excellence. The campus features modern infrastructure, landscaped gardens, and state-of-the-art facilities designed to foster innovation and learning.",
    urlName: "Campus",
  },
  {
    icon: Mic2,
    title: "Auditorium/Conference Hall",
    description:
      "A world-class auditorium equipped with advanced audio-visual systems, comfortable seating for large gatherings, and modern acoustics. Perfect for seminars, conferences, cultural events, and guest lectures.",
    urlName: "rgpv_auditorium",
  },
  {
    icon: Coffee,
    title: "Cafeteria",
    description:
      "Multiple cafeterias serving hygienic and nutritious food with diverse menu options. Spacious dining areas provide a comfortable environment for students and faculty to relax and socialize between classes.",
    urlName: "rgpv_cafeteria",
  },
  {
    icon: Dumbbell,
    title: "Sports Complex",
    description:
      "Comprehensive sports facilities including indoor and outdoor courts for basketball, volleyball, badminton, tennis, cricket grounds, football field, gymnasium with modern equipment, and a swimming pool to promote physical fitness and competitive spirit.",
    urlName: "Sports_Complex",
  },
  {
    icon: Landmark,
    title: "Bank",
    description:
      "On-campus banking facility providing convenient access to financial services including ATM, account management, and other banking operations for students, faculty, and staff.",
    urlName: "rgpv_bank",
  },
  {
    icon: Mail,
    title: "Post Office",
    description:
      "Full-service post office on campus offering mail and courier services, making it convenient for students and staff to send and receive correspondence and packages.",
    urlName: "rgpv_post_office",
  },
  {
    icon: Wrench,
    title: "Central Workshop",
    description:
      "Well-equipped workshop facility with modern machinery and tools for practical training in engineering disciplines. Provides hands-on experience in manufacturing, fabrication, and technical skills development.",
    urlName: "Central_Workshop",
  },
  {
    icon: Hotel,
    title: "Transit Hostel",
    description:
      "Comfortable accommodation facility for visiting faculty, guest lecturers, and short-term visitors. Equipped with modern amenities to ensure a pleasant stay on campus.",
    urlName: "Transit_Hostel",
  },
];

const academicFacilities: Amenity[] = [
  {
    icon: GraduationCap,
    title: "UTD's Academic Blocks",
    description:
      "Modern academic blocks housing various University Teaching Departments with well-equipped classrooms, laboratories, faculty cabins, and collaborative learning spaces designed for interactive education.",
    urlName: "Academic_Blocks",
  },
  {
    icon: BookOpen,
    title: "Central Library",
    description:
      "A vast repository of knowledge with extensive collection of books, journals, e-resources, and digital databases. Features reading halls, discussion rooms, and 24/7 access during examination periods.",
    urlName: "https://elibrary.rgpv.ac.in/index.aspx",
  },
  {
    icon: Shield,
    title: "Administrative Block",
    description:
      "Central administrative hub housing various university offices including registrar, examination cell, accounts, and other administrative departments ensuring smooth functioning of university operations.",
    urlName: "Administrative_examination_block",
  },
  {
    icon: GraduationCap,
    title: "Knowledge Resource Centre",
    description:
      "A modern knowledge hub equipped with digital resources, collaborative workspaces, access to global research databases, and advanced learning technologies fostering innovation and academic excellence.",
    urlName: "Knowledge_Resource_Centre",
  },
  {
    icon: Theater,
    title: "Lecture Theatre",
    description:
      "Large capacity lecture halls with tiered seating, advanced projection systems, and excellent acoustics designed for mass lectures, presentations, and academic gatherings.",
    urlName: "Lecture_Theatre",
  },
];

const residentialFacilities: Amenity[] = [
  {
    icon: BedDouble,
    title: "RGPV Girls Hostel",
    description:
      "Secure and comfortable residential facility for female students with modern amenities, common rooms, mess facilities, 24/7 security, and a supportive environment fostering academic focus and personal growth.",
    urlName: "RGPV_Girls_Hostel",
  },
  {
    icon: BedDouble,
    title: "RGPV Boys Hostel",
    description:
      "Well-maintained residential facility for male students offering comfortable accommodation, recreational facilities, mess services, and a conducive environment for studies and personal development.",
    urlName: "RGPV_Boys_Hostel",
  },
  {
    icon: Home,
    title: "Officers Housing",
    description:
      "Residential quarters for faculty and staff members located within campus premises, providing convenient access to workplace and campus facilities.",
    urlName: "Officers_Housing",
  },
  {
    icon: Building,
    title: "Guest House",
    description:
      "Comfortable accommodation for visiting dignitaries, guest faculty, and official visitors with modern amenities and hospitality services.",
    urlName: "Guest_House",
  },
];

const supportServices: Amenity[] = [
  {
    icon: Heart,
    title: "Health Center",
    description:
      "On-campus medical facility with qualified doctors, nursing staff, and emergency services. Provides primary healthcare, first aid, and medical consultation for students and staff.",
    urlName: "health_centre",
  },
  {
    icon: Church,
    title: "Temple",
    description:
      "A peaceful place of worship on campus providing spiritual solace and a serene environment for meditation and prayer.",
    urlName: "rgpv_Temple",
  },
  {
    icon: ShoppingBag,
    title: "Shopping cum Community Centre",
    description:
      "Convenient shopping facility on campus with stores for daily necessities, stationery, photocopying services, and other essential items for student and staff convenience.",
    urlName: "Shopping_Community_Center",
  },
  {
    icon: Zap,
    title: "Electric Sub Station",
    description:
      "Dedicated power infrastructure ensuring uninterrupted electricity supply across the campus with backup systems for continuous operations.",
    urlName: "Electrical_Sub_Station",
  },
  {
    icon: Users,
    title: "Women Facilitation Centre",
    description:
      "Dedicated facility promoting women's welfare, safety, and empowerment on campus. Provides counseling, support services, and resources for female students and staff.",
    urlName: "women_facility_center",
  },
  {
    icon: Map,
    title: "Campus Map",
    description:
      "Interactive campus navigation system helping students, visitors, and staff locate various facilities, departments, and amenities across the expansive university campus.",
    urlName: "CampusMap",
  },
];

const AmenityCard = ({
  amenity,
  index,
}: {
  amenity: Amenity;
  index: number;
}) => {
  const getUrl = () => {
    // Check if urlName is already a complete URL
    if (amenity.urlName.startsWith("http")) {
      return amenity.urlName;
    }
    return `https://rgpv.ac.in/AboutRGTU/${amenity.urlName}.aspx`;
  };

  const handleCardClick = () => {
    window.open(getUrl(), "_blank");
  };

  return (
    <div 
      onClick={handleCardClick}
      className="
        group border-border/50 flex h-105 cursor-pointer flex-col amenity-card
        overflow-hidden rounded-2xl border bg-background transition-all
        duration-300
        hover:z-10 hover:scale-[1.02] hover:shadow-2xl
      "
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon Section - Fixed Height */}
      <div className="
        flex shrink-0 items-center justify-center rounded-t-2xl bg-gray-50 p-6
        transition-colors
        group-hover:bg-gray-100
      ">
        <div className="
          flex size-16 items-center justify-center rounded-xl bg-white shadow-sm
          transition-shadow
          group-hover:shadow-md
        ">
          <amenity.icon
            className="
              text-heading-accent size-8 transition-transform
              group-hover:scale-110
            "
          />
        </div>
      </div>
      
      {/* Content Section - Fixed Height with Scroll on Hover */}
      <div className="
        flex flex-1 flex-col overflow-hidden rounded-b-2xl bg-white p-6
        group-hover:overflow-y-auto
      ">
        <h3 className="
          text-heading mb-3 shrink-0 text-xl font-bold transition-colors
          group-hover:text-primary
        ">
          {amenity.title}
        </h3>
        <p className="
          text-muted-foreground mb-4 line-clamp-4 flex-1 text-justify
          text-sm/relaxed transition-all duration-300
          group-hover:line-clamp-none
          md:text-base
        ">
          {amenity.description}
        </p>
        
        {/* View Location Link */}
        <div className="
          flex shrink-0 items-center border-t border-gray-100 pt-4 text-sm
          font-medium text-primary
        ">
          <svg className="mr-2 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>View Location</span>
          <svg 
            className="
              ml-auto size-4 transform transition-transform
              group-hover:translate-x-1
            " 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const AmenitiesSection = () => {
  return (
    <>
      <section id="campus-amenities" className="scroll-mt-24">
        <h2 className="section-title">Campus Amenities</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          RGPV campus is equipped with world-class amenities designed to provide
          students with a comprehensive learning and living experience. From
          modern infrastructure to recreational facilities, every aspect of
          campus life is thoughtfully planned to support academic excellence and
          personal growth.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {campusAmenities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>

      <section id="academic-facilities" className="scroll-mt-24">
        <h2 className="section-title">Academic Facilities</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          Our academic infrastructure is designed to foster innovation,
          research, and collaborative learning. With state-of-the-art facilities
          and resources, students have access to everything they need for
          academic excellence.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {academicFacilities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>

      <section id="residential-facilities" className="scroll-mt-24">
        <h2 className="section-title">Residential Facilities</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          Our residential facilities provide a safe, comfortable, and conducive
          environment for students and staff. With modern amenities and
          round-the-clock security, we ensure a home away from home experience.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {residentialFacilities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>

      <section id="support-services" className="scroll-mt-24">
        <h2 className="section-title">Support Services</h2>

        <p className="mb-8 text-justify text-lg/relaxed text-foreground/80">
          We provide comprehensive support services to ensure the well-being and
          convenience of our campus community. From healthcare to connectivity,
          every essential service is available on campus.
        </p>

        <div
          className="
            grid gap-8
            md:grid-cols-2
          "
        >
          {supportServices.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AmenitiesSection;

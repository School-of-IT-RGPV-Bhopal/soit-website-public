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

export type Amenity = {
  icon: LucideIcon;
  title: string;
  description: string;
  urlName: string;
}

export const campusAmenities: Amenity[] = [
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

export const academicFacilities: Amenity[] = [
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
    urlName: "lecture_theatre",
  },
];

export const residentialFacilities: Amenity[] = [
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

export const supportServices: Amenity[] = [
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
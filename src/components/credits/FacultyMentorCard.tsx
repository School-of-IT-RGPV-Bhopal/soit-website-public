import Image from "next/image";

interface FacultyMentorCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
  colorScheme: "blue" | "green" | "purple";
  delay?: string;
}

const colorClasses = {
  blue: {
    bg: "bg-linear-to-br from-blue-50 to-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
  green: {
    bg: "bg-linear-to-br from-green-50 to-green-100",
    badge: "bg-green-100 text-green-700",
  },
  purple: {
    bg: "bg-linear-to-br from-purple-50 to-purple-100",
    badge: "bg-purple-100 text-purple-700",
  },
};

export default function FacultyMentorCard({
  name,
  role,
  description,
  image,
  colorScheme,
  delay,
}: FacultyMentorCardProps) {
  const colors = colorClasses[colorScheme];

  return (
    <div
      className="
        group fade-up overflow-hidden rounded-xl border border-gray-200 bg-white
        shadow-lg transition-all duration-500 ease-out
        hover:shadow-xl
      "
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {/* Container needs 'relative' for Next.js 'fill' property to work */}
      <div className={`
        relative h-64 overflow-hidden
        ${colors.bg}
      `}>
        <Image
          src={image}
          alt={`Portrait of ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="
            object-cover object-center transition-transform duration-500
            group-hover:scale-110
          "
          priority={false}
        />
        <div className="
          absolute inset-0 bg-linear-to-t from-black/60 via-transparent
          to-transparent
        " />
      </div>

      <div className="p-6 text-center">
        <div
          className={`
            inline-block px-3 py-1
            ${colors.badge}
            mb-3 rounded-full text-xs font-semibold
          `}
        >
          {role}
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm/relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}

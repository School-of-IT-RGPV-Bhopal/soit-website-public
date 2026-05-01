import { FaLinkedin } from 'react-icons/fa';

type StudentCardProps = {
  name: string;
  role: string;
  description: string;
  badge?: string;
  delay?: string;
  image?: string;
  linkedinUrl?: string;
}

export default function StudentCard({ 
  name, 
  role, 
  description, 
  badge,
  delay,
  image,
  linkedinUrl = "https://www.linkedin.com",
}: StudentCardProps) {
  return (
    <div 
      className="
        group fade-up overflow-hidden rounded-xl border border-gray-200 bg-white
        shadow-lg transition-all duration-500 ease-out
        hover:shadow-xl relative
      "
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {/* LinkedIn Button - Top Right Corner */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          absolute top-3 right-3 z-10
          w-9 h-9 rounded-full
          bg-[#0077B5] hover:bg-[#006399]
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110 hover:shadow-lg
        "
        onClick={(e) => e.stopPropagation()}
      >
        <FaLinkedin className="w-5 h-5 text-white" />
      </a>

      {image ? (
        <>
          {/* Image Section */}
          <div className="
            relative h-56 overflow-hidden bg-linear-to-br from-gray-100
            to-gray-200
          ">
            <img 
              src={image}
              alt={name}
              className="
                size-full object-cover object-center transition-transform
                duration-500
                group-hover:scale-110
              "
            />
            <div className="
              absolute inset-0 bg-linear-to-t from-black/60 via-transparent
              to-transparent
            "></div>
            {badge && (
              <div className="
                absolute top-4 left-4 rounded-lg bg-gray-900/90 px-3 py-1.5
                text-xs font-semibold text-white backdrop-blur-sm
              ">
                {badge}
              </div>
            )}
          </div>
          {/* Content Section */}
          <div className="p-6 text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-900">{name}</h3>
            <p className="mb-3 text-sm font-semibold text-gray-600">{role}</p>
            <p className="text-sm/relaxed text-gray-600">
              {description}
            </p>
          </div>
        </>
      ) : (
        // Fallback to icon-based design if no image
        <div className="relative p-5 text-center">
          {badge && (
            <div className="
              absolute top-2 left-2 rounded-sm bg-gray-700 px-2 py-1
              text-[10px] font-medium text-white
              md:text-xs
            ">
              {badge}
            </div>
          )}
          <div className="
            mx-auto mb-3 flex size-14 items-center justify-center rounded-full
            bg-gray-600
          ">
            <svg className="size-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h3 className="mb-1 text-base font-semibold text-gray-900">{name}</h3>
          <p className="mb-2 text-xs text-gray-600">{role}</p>
          <p className="text-xs/relaxed text-gray-600">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

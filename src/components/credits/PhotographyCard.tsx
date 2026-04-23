interface PhotographyCardProps {
  name: string;
  role: string;
  description: string;
  delay?: string;
  image?: string;
}

export default function PhotographyCard({ 
  name, 
  role, 
  description,
  delay,
  image 
}: PhotographyCardProps) {
  return (
    <div 
      className="
        group fade-up overflow-hidden rounded-xl border border-gray-200 bg-white
        shadow-lg transition-all duration-500 ease-out
        hover:shadow-xl
      "
      style={delay ? { transitionDelay: delay } : undefined}
    >
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
            <div className="
              absolute top-4 right-4 rounded-lg bg-gray-900/90 px-3 py-1.5
              text-xs font-semibold text-white backdrop-blur-sm
            ">
              Photography
            </div>
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
          <div className="
            absolute top-2 right-2 rounded-sm bg-gray-700 px-2 py-1 text-[10px]
            font-medium text-white
            md:text-xs
          ">
            Photography
          </div>
          <div className="
            mx-auto mb-3 flex size-14 items-center justify-center rounded-full
            bg-gray-600
          ">
            <svg className="size-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 2l1.17 1H14l1 1h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3l1-1h4L9 2M12 17a5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5 5 5 0 0 0 5 5m0-2a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3z"/>
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

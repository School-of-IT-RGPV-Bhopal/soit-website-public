import Image from 'next/image';

type LeadershipCardProps = {
  name: string;
  role: string;
  badge: string;
  description: string;
  image: string;
  colorScheme: 'indigo' | 'teal';
  delay?: string;
}

const colorClasses = {
  indigo: {
    bg: 'bg-linear-to-br from-indigo-50 to-indigo-100',
    text: 'text-indigo-600',
  },
  teal: {
    bg: 'bg-linear-to-br from-teal-50 to-teal-100',
    text: 'text-teal-600',
  }
};

export default function LeadershipCard({ 
  name, 
  role, 
  badge,
  description, 
  image, 
  colorScheme,
  delay,
}: LeadershipCardProps) {
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
      <div className={`
        relative h-72 overflow-hidden
        ${colors.bg}
      `}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="
            object-cover object-center transition-transform duration-500
            group-hover:scale-110
          "
        />
        <div className="
          absolute inset-0 bg-linear-to-t from-black/60 via-transparent
          to-transparent
        "></div>
        <div className="
          absolute top-4 right-4 rounded-lg bg-gray-900/90 px-3 py-1.5 text-xs
          font-semibold text-white backdrop-blur-sm
        ">
          {badge}
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{name}</h3>
        <p className={`
          ${colors.text}
          mb-3 text-sm font-semibold
        `}>{role}</p>
        <p className="text-sm/relaxed text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}

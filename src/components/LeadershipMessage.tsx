import Image from 'next/image';

export type LeadershipMessageProps = {
  id: string;
  title: string;
  name: string;
  designation: string;
  qualifications?: string;
  institution: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
  salutation: string;
  signatureTitle?: string;
  backgroundColor?: 'white' | 'gray';
}

export default function LeadershipMessage({
  id,
  title,
  name,
  designation,
  qualifications,
  imageSrc,
  imageAlt,
  paragraphs,
  salutation,
  signatureTitle,
  backgroundColor = 'gray',
}: LeadershipMessageProps) {
  const sectionBg = backgroundColor === 'white' ? 'bg-white' : 'bg-gray-50';
  const cardBg = backgroundColor === 'white' ? 'bg-gray-50' : 'bg-white';

  return (
    <section id={id} className={`
      section-container
      ${sectionBg}
    `}>
      <div className="container mx-auto">
        <div className="mb-8 fade-up text-center">
          <h2 className="
            mb-4 text-3xl font-bold text-primary
            md:text-4xl
          ">{title}</h2>
          <div className="mx-auto h-1 w-20 bg-accent"></div>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <div className={`
            fade-up overflow-hidden rounded-lg
            ${cardBg}
            shadow-lg
          `}>
            <div className="
              grid grid-cols-1 gap-8 p-8
              md:grid-cols-3
            ">
              {/* Photo and Info */}
              <div className="flex flex-col items-center">
                <div className="
                  relative mb-4 size-48 overflow-hidden rounded-full border-4
                  border-primary
                ">
                  <div className="
                    absolute inset-0 flex items-center justify-center
                    bg-gray-200
                  ">
                    <Image 
                      src={imageSrc} 
                      alt={imageAlt} 
                      width={192} 
                      height={192} 
                      className="size-full object-cover" 
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary">{name}</h3>
                <p className="text-sm text-gray-600">{designation}</p>
                {qualifications && (
                  <p className="mt-1 text-xs text-gray-500">{qualifications}</p>
                )}
              </div>
              
              {/* Message */}
              <div className="md:col-span-2">
                <div className="relative">
                  <svg className="
                    absolute top-0 left-0 size-8 text-foreground opacity-20
                  " fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <div className="pl-10">
                    {paragraphs.map((paragraph, index) => (
                      <p 
                        key={index} 
                        className={`
                          leading-relaxed text-gray-700
                          ${
                          index < paragraphs.length - 1 ? 'mb-4' : ''
                        }
                        `}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <p className="font-semibold text-primary">{salutation}</p>
                  <p className="text-gray-700 italic">{name}</p>
                  {signatureTitle && (
                    <p className="text-sm text-gray-500">{signatureTitle}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

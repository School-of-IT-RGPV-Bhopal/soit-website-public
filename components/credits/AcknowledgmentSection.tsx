export default function AcknowledgmentSection() {
  return (
    <section className="fade-up text-center">
      <div className="
        mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8
        shadow-sm
      ">
        <div className="mb-6">
          <svg className="mx-auto mb-4 size-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h2 className="
          mb-4 text-xl font-semibold text-gray-900
          md:text-2xl
        ">Acknowledgment</h2>
        <p className="mb-4 text-lg font-medium text-gray-700 italic">
          &ldquo;And the students of SOIT&rdquo;
        </p>
        <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
          We extend our sincere gratitude to all the students of the School of Information Technology, RGPV, 
          who provided valuable feedback, suggestions, and continuous support throughout the development process. 
          This website represents our collective commitment to excellence in education and technology.
        </p>
        
        {/* Decorative Line */}
        <div className="mt-8 flex items-center justify-center">
          <div className="h-0.5 w-12 bg-gray-400"></div>
          <div className="mx-3 size-1.5 rounded-full bg-gray-400"></div>
          <div className="h-0.5 w-12 bg-gray-400"></div>
        </div>
        
        <p className="mt-4 text-xs text-gray-500">
          School of Information Technology, RGPV • Bhopal, Madhya Pradesh
        </p>
      </div>
    </section>
  );
}

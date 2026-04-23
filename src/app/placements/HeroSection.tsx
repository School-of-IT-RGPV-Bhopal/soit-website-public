"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/tnp-image.jpg"   // 👈 put your T&P office photo here
        alt="Training and Placement Office"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="fade-up px-6 text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo.jpg"   // 👈 college logo
              alt="Institute Logo"
              width={120}
              height={120}
            />
          </div>

          {/* Heading */}
          <h1 className="
            mb-4 text-4xl font-bold text-white
            md:text-5xl
            lg:text-6xl
          ">
            Training & Placement Cell
          </h1>

          {/* Subtitle */}
          <p className="
            mx-auto max-w-3xl text-lg text-gray-200
            md:text-xl
          ">
            Bridging the gap between academic excellence and industry readiness
          </p>
        </div>
      </div>
    </section>
  );
}

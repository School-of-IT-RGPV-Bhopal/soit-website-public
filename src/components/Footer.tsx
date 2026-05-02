import Image from "next/image";
import Link from "next/link";
import HashLink from "@components/HashLink";
import FooterAnalyticsWidget from "@components/FooterAnalyticsWidget";
import { siteContact } from "@lib/siteContact";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div
          className="
            grid grid-cols-1 items-start gap-12
            lg:grid-cols-3
          "
        >
          {/* Left Column: Logo and About */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center">
              <div
                className="
                  mr-4 flex size-14 items-center justify-center rounded-full
                  text-sm font-bold text-white shadow-lg
                "
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Logo"
                  width={40}
                  height={40}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">SoIT</h3>
                <p className="text-sm text-gray-600">
                  School of Information Technology
                </p>
              </div>
            </div>
            <p className="mb-6 max-w-sm text-sm/relaxed text-gray-700">
              Empowering students with cutting-edge technology education and
              research opportunities since 2002.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href={siteContact.linkedInUrl}
                className="
                  group rounded-full bg-gray-100 p-3 text-gray-600
                  transition-all duration-300
                  hover:bg-foreground hover:text-white
                "
                aria-label="LinkedIn"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={siteContact.instagramUrl}
                className="
                  group rounded-full bg-gray-100 p-3 text-gray-600
                  transition-all duration-300
                  hover:bg-foreground hover:text-white
                "
                aria-label="Instagram"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Column: Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 shrink-0 rounded-lg p-2.5 shadow-sm">
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-800">
                    Address
                  </p>
                  <p className="text-sm/relaxed text-gray-600">
                    {siteContact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 shrink-0 rounded-lg p-2.5 shadow-sm">
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-800">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="
                      text-sm text-gray-600 transition-colors
                      hover:text-secondary
                    "
                  >
                    {siteContact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 shrink-0 rounded-lg p-2.5 shadow-sm">
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-800">
                    Phone
                  </p>
                  <a
                    href={siteContact.phoneLink}
                    className="
                      text-sm text-gray-600 transition-colors
                      hover:text-secondary
                    "
                  >
                    {siteContact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Access */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Quick Access
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link
                  href="/academics"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Academics
                </Link>
                <Link
                  href="/gallery"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Gallery
                </Link>
                <Link
                  href="/student-life"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Student Life
                </Link>
                <Link
                  href="/placements"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Placements
                </Link>
                <Link
                  href="/student-achievements"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Achievements
                </Link>
                <Link
                  href="/student-life"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Campus Amenities
                </Link>
              </div>
              <div className="space-y-3">
                <Link
                  href="/news-events"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  News & Events
                </Link>
                <Link
                  href="/alumni-network"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Alumni Network
                </Link>
                <Link
                  href="/mou"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  MOU
                </Link>
                <Link
                  href="/work-in-progress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Annual Magazine
                </Link>
                <Link
                  href="/analytics"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Analytics
                </Link>
                <Link
                  href="/calendars"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Calendars
                </Link>
                <Link
                  href="/faq"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Contact
                </Link>
                <Link
                  href="/credits"
                  className="
                    block text-sm font-medium text-gray-600 transition-colors
                    hover:text-black
                  "
                >
                  Credits
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div
            className="
              flex flex-col items-center justify-between
              md:flex-row
            "
          >
            <p
              className="
                mb-4 text-sm text-gray-600
                md:mb-0
              "
            >
              © {new Date().getFullYear()} School of Information Technology,
              RGPV. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <HashLink
                href="/#about"
                hash="about"
                className="
                  text-gray-600 transition-colors
                  hover:text-secondary
                "
              >
                About Us
              </HashLink>
              <span className="text-gray-300">|</span>
              <Link
                href="/contact"
                className="
                  text-gray-600 transition-colors
                  hover:text-secondary
                "
              >
                Contact
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/faq"
                className="
                  text-gray-600 transition-colors
                  hover:text-secondary
                "
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Analytics Widget Section */}
          <FooterAnalyticsWidget />
        </div>
      </div>
    </footer>
  );
}

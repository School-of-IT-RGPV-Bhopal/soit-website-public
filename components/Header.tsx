'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HashLink from "@components/HashLink";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const scrolled = scrollY > 50;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMouseEnter = (dropdown: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
    setCloseTimeout(timeout);
  };

  return (
    <header className={`
      w-full transition-all duration-300
      ${scrolled ? 'bg-white py-2 shadow-md' : 'bg-white py-2'}
    `}>
      <div className="
        mx-auto px-4
        sm:px-6
        lg:px-8
      ">
        <div className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <div className="relative size-12">
              <Image
                src="/images/logo.jpg"
                alt="School Crest"
                priority
                fill
                sizes="48px"
                style={{ objectFit: 'contain' }}
                className="rounded-full"
              />
            </div>
            
            <div className="ml-3">
              <h1 className="font-poppins text-xl font-bold text-primary">SoIT</h1>
              <p className="text-xs text-gray-600">School of Information Technology</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="
            hidden space-x-6
            lg:flex
          ">
            <Link href="/" className="
              font-medium text-gray-700 transition-colors
              hover:text-primary
            ">
              Home
            </Link>
            
            <HashLink href="/#about" hash="about" className="
              font-medium text-gray-700 transition-colors
              hover:text-primary
            ">
              About
            </HashLink>

            {/* Academics Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('academics')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="
                flex items-center font-medium text-gray-700 transition-colors
                hover:text-primary
              ">
                Academics
                <svg className="ml-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'academics' && (
                <div className="absolute top-full left-0 z-50 w-48 pt-2">
                  <div className="
                    rounded-lg border border-gray-100 bg-white py-2 shadow-xl
                  ">
                  <Link href="/academics" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Programs & Courses
                  </Link>
                  <Link href="/placements" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Placements
                  </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Student Hub Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('student')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="
                flex items-center font-medium text-gray-700 transition-colors
                hover:text-primary
              ">
                Student Hub
                <svg className="ml-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'student' && (
                <div className="absolute top-full left-0 z-50 w-56 pt-2">
                  <div className="
                    rounded-lg border border-gray-100 bg-white py-2 shadow-xl
                  ">
                  <Link href="/student-life" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Student Life
                  </Link>
                  <Link href="/student-achievements" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Achievements
                  </Link>
                  <Link href="/alumni-network" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Alumni Network
                  </Link>
                  <Link href="/amenities" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Campus Amenities
                  </Link>
                  <Link
              href="/virtual-tour"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
            >
              Virtual Tour
            </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="
                flex items-center font-medium text-gray-700 transition-colors
                hover:text-primary
              ">
                Resources
                <svg className="ml-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'resources' && (
                <div className="absolute top-full left-0 z-50 w-48 pt-2">
                  <div className="
                    rounded-lg border border-gray-100 bg-white py-2 shadow-xl
                  ">
                  <Link href="/gallery" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Gallery
                  </Link>
                  <Link href="/news-events" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    News & Events
                  </Link>
                  <Link href="/mou" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    MOU & Partnerships
                  </Link>
                  <Link href="/analytics" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    Analytics
                  </Link>
                  <Link href="/work-in-progress" target="_blank" className="
                    block px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 hover:text-primary
                  ">
                    📖 Magazine
                  </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className="
              font-medium text-gray-700 transition-colors
              hover:text-primary
            ">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="
            hidden items-center
            md:flex
          ">
            <Link href="https://www.rgpv.ac.in/Login/StudentLogin.aspx" 
                  className="btn-primary px-4 py-2 text-sm" 
                  target="_blank" 
                  rel="noopener noreferrer">
              Student Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="
              text-gray-700
              focus:outline-none
              lg:hidden
            "
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        overflow-hidden transition-all duration-300
        lg:hidden
        ${mobileMenuOpen ? `max-h-screen bg-white shadow-lg` : `max-h-0`}
      `}>
        <div className="space-y-1 px-4 py-2">
          <Link href="/" className="
            block py-2 font-medium text-gray-700
            hover:text-primary
          " onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          
          <HashLink href="/#about" hash="about" className="
            block py-2 font-medium text-gray-700
            hover:text-primary
          " onClick={() => setMobileMenuOpen(false)}>
            About
          </HashLink>

          {/* Academics Section */}
          <div className="mt-2 border-t border-gray-100 pt-2">
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase">Academics</p>
            <Link href="/academics" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Programs & Courses
            </Link>
            <Link href="/placements" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Placements
            </Link>
          </div>

          {/* Student Hub Section */}
          <div className="mt-2 border-t border-gray-100 pt-2">
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase">Student Hub</p>
            <Link href="/student-life" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Student Life
            </Link>
            <Link href="/student-achievements" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Achievements
            </Link>
            <Link href="/alumni-network" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Alumni Network
            </Link>
            <Link href="/amenities" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Campus Amenities
            </Link>
          </div>

          {/* Resources Section */}
          <div className="mt-2 border-t border-gray-100 pt-2">
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase">Resources</p>
            <Link href="/gallery" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </Link>
            <Link href="/news-events" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              News & Events
            </Link>
            <Link href="/mou" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              MOU & Partnerships
            </Link>
            <Link href="/analytics" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              Analytics
            </Link>
            <Link href="/work-in-progress" target="_blank" className="
              block py-2 pl-4 text-gray-700
              hover:text-primary
            " onClick={() => setMobileMenuOpen(false)}>
              📖 Magazine
            </Link>
          </div>

          <Link href="/contact" className="
            mt-2 block border-t border-gray-100 py-2 pt-2 font-medium
            text-gray-700
            hover:text-primary
          " onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>

          <div className="pt-4 pb-2">
            <Link 
              href="https://www.rgpv.ac.in/Login/StudentLogin.aspx"
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary block w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Student Portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

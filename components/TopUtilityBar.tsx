"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TopUtilityBar() {
  const [isHi, setIsHi] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('soit_lang') === 'hi';
    } catch {
      return false;
    }
  });

  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('soit_contrast') === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('soit_lang', isHi ? 'hi' : 'en');
    } catch {}
  }, [isHi]);

  useEffect(() => {
    try {
      localStorage.setItem('soit_contrast', highContrast ? '1' : '0');
      if (highContrast) document.documentElement.classList.add('high-contrast');
      else document.documentElement.classList.remove('high-contrast');
    } catch {}
  }, [highContrast]);

  return (
    <div className="sticky top-0 z-50 border-b bg-gray-50">
      <div className="
        mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-xs
        sm:px-6
        lg:px-8
      ">
        <div className="
          hidden space-x-4
          sm:flex
        " role="navigation" aria-label="Utility">
          <Link href="#student-portal" className="
            text-gray-600
            hover:text-primary
          ">For Students</Link>
          <Link href="#faculty" className="
            text-gray-600
            hover:text-primary
          ">For Faculty</Link>
          <Link href="#alumni" className="
            text-gray-600
            hover:text-primary
          ">For Alumni</Link>
          <Link href="/results" className="
            text-gray-600
            hover:text-primary
          ">Results</Link>
          <a href="https://www.rgpv.ac.in/Login/StudentLogin.aspx" target="_blank" rel="noopener noreferrer" className="
            text-gray-600
            hover:text-primary
          ">Student Portal</a>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsHi(prev => !prev)}
            aria-pressed={isHi}
            className="
              px-2 text-gray-600
              hover:text-primary
              focus:ring-2 focus:ring-primary focus:outline-none
            "
            title="Toggle language"
          >
            {isHi ? 'हिं' : 'EN'}
          </button>
          <button
            onClick={() => setHighContrast(prev => !prev)}
            aria-pressed={highContrast}
            className="
              px-2 text-gray-600
              hover:text-primary
              focus:ring-2 focus:ring-primary focus:outline-none
            "
            title="Toggle high contrast"
          >
            HC
          </button>
        </div>
      </div>
    </div>
  );
}

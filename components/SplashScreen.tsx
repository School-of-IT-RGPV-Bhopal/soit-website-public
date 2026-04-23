"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SPLASH_STORAGE_KEY = "splash_seen_v1";
const FADE_DURATION_MS = 280;

export default function SplashScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const enterFrameRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const hasSeenSplash =
        window.localStorage.getItem(SPLASH_STORAGE_KEY) === "true";

      if (!hasSeenSplash) {
        setIsMounted(true);
      }
    } catch {
      // If storage is blocked, still show splash for this session.
      setIsMounted(true);
    } finally {
      setHasCheckedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    enterFrameRef.current = window.requestAnimationFrame(() => {
      setIsActive(true);
    });

    return () => {
      if (enterFrameRef.current !== null) {
        window.cancelAnimationFrame(enterFrameRef.current);
      }
    };
  }, [isMounted]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (enterFrameRef.current !== null) {
        window.cancelAnimationFrame(enterFrameRef.current);
      }
    },
    [],
  );

  const handleDismiss = useCallback(() => {
    if (!isMounted || !isActive) {
      return;
    }

    try {
      window.localStorage.setItem(SPLASH_STORAGE_KEY, "true");
    } catch {
      // Ignore storage write failures and still allow users to continue.
    }

    setIsActive(false);

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setIsMounted(false);
    }, FADE_DURATION_MS);
  }, [isActive, isMounted]);

  if (!hasCheckedStorage || !isMounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleDismiss}
      className={`fixed inset-0 z-1000 flex w-full items-center justify-center bg-white/95 px-6 text-center backdrop-blur-sm transition-opacity duration-300 ease-out ${
        isActive ? "cursor-pointer opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Enter School of Information Technology website"
    >
      <span
        className={`flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-100 bg-white px-8 py-10 shadow-2xl shadow-red-200/35 transition-all duration-300 ease-out ${
          isActive ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-[0.99] opacity-95"
        }`}
      >
        <Image
          src="/images/logo.jpg"
          alt="RGPV Logo"
          width={220}
          height={220}
          priority
          className="h-auto w-40 sm:w-48 md:w-56"
        />

        <span className="font-poppins text-2xl font-semibold leading-snug text-primary sm:text-3xl">
          School Of Information Technology
          <br />
          RGPV, Bhopal
        </span>

        <span className="font-inter text-sm text-gray-600 sm:text-base">
          Tap or click to explore
        </span>
      </span>
    </button>
  );
}
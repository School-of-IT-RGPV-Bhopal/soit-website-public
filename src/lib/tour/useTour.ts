"use client";

import type { DriveStep } from "driver.js";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { tourRegistry } from "./tourRegistry";

const TOUR_SEEN_PREFIX = "soit_tour_seen_";

const getRouteKey = (pathname: string) => pathname.replaceAll("/", "_");

const getStorageKey = (pathname: string) => {
  return `${TOUR_SEEN_PREFIX}${getRouteKey(pathname)}`;
};

export function useTour() {
  const rawPathname = usePathname();
  const pathname = rawPathname || "/";

  const steps = useMemo<DriveStep[]>(() => {
    return tourRegistry[pathname] ?? [];
  }, [pathname]);

  const [isReady, setIsReady] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    setIsReady(false);

    if (steps.length === 0) {
      setShouldStart(false);
      setIsReady(true);
      return;
    }

    try {
      const hasSeenTour =
        window.localStorage.getItem(getStorageKey(pathname)) === "true";
      setShouldStart(!hasSeenTour);
    } catch {
      // If storage is blocked, still allow the tour in this session.
      setShouldStart(true);
    } finally {
      setIsReady(true);
    }
  }, [pathname, steps.length]);

  const markSeen = useCallback(() => {
    try {
      window.localStorage.setItem(getStorageKey(pathname), "true");
    } catch {
      // Ignore storage write failures.
    }

    setShouldStart(false);
  }, [pathname]);

  return {
    pathname,
    steps,
    shouldStart: isReady && shouldStart,
    markSeen,
  };
}

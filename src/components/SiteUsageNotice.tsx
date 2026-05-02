"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  SITE_USAGE_NOTICE_DISMISSED_EVENT,
  SITE_USAGE_NOTICE_STORAGE_KEY,
} from "@lib/siteUsageNotice";

const SPLASH_DISMISSED_EVENT = "soit:splash-dismissed";
const SPLASH_SELECTOR = '[data-splash-screen="active"]';
const NOTICE_REVEAL_DELAY_MS = 180;
const NOTICE_EXIT_DURATION_MS = 220;

const noticePoints = [
  {
    title: "Cookies and analytics",
    description:
      "Analytics and performance services used on this website may place cookies or similar browser data to measure visits, improve reliability, and understand service usage patterns.",
  },
  {
    title: "Local storage for onboarding",
    description:
      "We use local storage to remember whether you have already seen the flash screen, guided site tours, and this information notice so they are not shown repeatedly.",
  },
  {
    title: "Local storage for accessibility preferences",
    description:
      "Your browser may store display preferences such as language selection and high-contrast mode to keep accessibility settings consistent across visits on this device.",
  },
  {
    title: "Session-based interactions",
    description:
      "Temporary session context may be used while you interact with features such as the SOIT Assistant so active requests and conversation flow can be handled during your visit.",
  },
  {
    title: "Your acknowledgement",
    description:
      "By continuing to use this website, you agree to the applicable terms and conditions and to the collection and use of relevant data in accordance with institutional policy.",
  },
];

type NoticeState = "hidden" | "visible" | "closing";

export default function SiteUsageNotice() {
  const [noticeState, setNoticeState] = useState<NoticeState>("hidden");

  const revealTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const dispatchDismissedEvent = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent(SITE_USAGE_NOTICE_DISMISSED_EVENT, {
        detail: { acknowledged: true },
      }),
    );
  }, []);

  const dismissNotice = useCallback(() => {
    try {
      window.localStorage.setItem(SITE_USAGE_NOTICE_STORAGE_KEY, "true");
    } catch {
      // Ignore storage write failures and still let the notice close.
    }

    clearTimers();
    setNoticeState("closing");

    closeTimerRef.current = window.setTimeout(() => {
      setNoticeState("hidden");
      window.requestAnimationFrame(() => {
        dispatchDismissedEvent();
      });
    }, NOTICE_EXIT_DURATION_MS);
  }, [clearTimers, dispatchDismissedEvent]);

  useEffect(() => {
    const hasSeenNotice = () => {
      try {
        return (
          window.localStorage.getItem(SITE_USAGE_NOTICE_STORAGE_KEY) === "true"
        );
      } catch {
        return false;
      }
    };

    const hasActiveSplash = () => {
      return document.querySelector(SPLASH_SELECTOR) !== null;
    };

    const revealNotice = () => {
      if (hasSeenNotice()) {
        dispatchDismissedEvent();
        return;
      }

      setNoticeState("visible");
    };

    const scheduleReveal = () => {
      if (revealTimerRef.current !== null) {
        return;
      }

      revealTimerRef.current = window.setTimeout(() => {
        revealTimerRef.current = null;

        if (hasSeenNotice() || hasActiveSplash()) {
          return;
        }

        revealNotice();
      }, NOTICE_REVEAL_DELAY_MS);
    };

    const handleReadyToShow = () => {
      if (hasSeenNotice() || hasActiveSplash()) {
        return;
      }

      scheduleReveal();
    };

    handleReadyToShow();
    window.addEventListener(SPLASH_DISMISSED_EVENT, handleReadyToShow);

    return () => {
      window.removeEventListener(SPLASH_DISMISSED_EVENT, handleReadyToShow);
      clearTimers();
    };
  }, [clearTimers, dispatchDismissedEvent]);

  if (noticeState === "hidden") {
    return null;
  }

  return (
    <div
      className="
      pointer-events-none fixed 
      inset-x-0 bottom-4 z-70 flex 
      justify-end
      sm:bottom-6 
      right-18  left-4 
      sm:right-20  sm:left-6  
    "
    >
      <aside
        data-site-usage-notice="active"
        aria-labelledby="site-usage-notice-title"
        className={`
          pointer-events-auto w-full max-h-104 sm:max-h-150 overflow-x-hidden overflow-y-auto rounded-[28px]
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          border border-slate-200/80 bg-white/96 text-left
          shadow-[0_28px_80px_-36px_rgba(15,23,42,0.42)] backdrop-blur-xl
          transition-all duration-200 ease-out
          ${
            noticeState === "visible"
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }
        `}
      >
        <div
          className="
          bg-[linear-gradient(135deg,rgba(0,95,115,0.14),rgba(255,255,255,0.96)_52%,rgba(148,163,184,0.10))]
          p-5
          sm:px-6
        "
        >
          <div
            className="
            inline-flex items-center rounded-full border border-[#005F73]/15
            bg-[#005F73]/8 px-3 py-1 text-[11px] font-semibold tracking-[0.22em]
            text-[#005F73] uppercase
          "
          >
            Information Notice
          </div>

          <h2
            id="site-usage-notice-title"
            className="font-poppins mt-3 text-lg font-semibold text-slate-900"
          >
            Cookies, session use, and stored preferences
          </h2>

          <p className="font-inter mt-2 text-sm/6 text-slate-600">
            To keep the experience functional, accessible, and measurable, this
            site uses limited browser storage and session-based interactions for
            selected features.
          </p>

          <ul className="font-inter mt-4 space-y-3 text-sm/6 text-slate-700">
            {noticePoints.map((point) => (
              <li key={point.title} className="flex gap-3">
                <span
                  className="
                  mt-2 size-1.5 shrink-0 rounded-full bg-[#0A9396]
                "
                />
                <div>
                  <span className="font-semibold text-slate-900">
                    {point.title}
                  </span>{" "}
                  <span>{point.description}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={dismissNotice}
              className="
                font-inter inline-flex min-w-20 items-center justify-center
                rounded-full bg-[#005F73] px-5 py-2.5 text-sm font-semibold
                text-white transition-colors
                hover:bg-[#0b7285]
                focus-visible:ring-2 focus-visible:ring-[#005F73]/30
                focus-visible:outline-none
              "
            >
              OK
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

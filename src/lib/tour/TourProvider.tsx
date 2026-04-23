"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect, useRef } from "react";
import { useTour } from "./useTour";

const TOUR_START_DELAY_MS = 500;
const POPUP_DISMISS_WAIT_MS = 360;
const SPLASH_DISMISSED_EVENT = "soit:splash-dismissed";
const SPLASH_SELECTOR = '[data-splash-screen="active"]';
const TOUR_SKIP_BUTTON_SELECTOR = '[data-tour-skip-btn="true"]';
const MODAL_SELECTOR = '[role="dialog"][aria-modal="true"], .fixed.inset-0.z-50';

export default function TourProvider() {
  const { pathname, steps, shouldStart, markSeen } = useTour();

  const instanceRef = useRef<ReturnType<typeof driver> | null>(null);
  const hasStartedRef = useRef(false);
  const skipMarkSeenRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || steps.length === 0 || hasStartedRef.current) {
      return;
    }

    let timerId: number | null = null;

    const hasActiveSplash = () => {
      return document.querySelector(SPLASH_SELECTOR) !== null;
    };

    const startTour = () => {
      if (hasStartedRef.current || !shouldStart || steps.length === 0) {
        return;
      }

      const resolveStepElement = (element: (typeof steps)[number]["element"]) => {
        if (!element) {
          return null;
        }

        if (typeof element === "string") {
          return document.querySelector(element);
        }

        if (typeof element === "function") {
          return element();
        }

        return element;
      };

      const isVisibleElement = (node: Element) => {
        if (!(node instanceof HTMLElement)) {
          return false;
        }

        const styles = window.getComputedStyle(node);
        return styles.display !== "none" && styles.visibility !== "hidden";
      };

      const getActiveBlockers = () => {
        return Array.from(document.querySelectorAll<HTMLElement>(MODAL_SELECTOR))
          .filter((node) => isVisibleElement(node));
      };

      const closeBlocker = (blocker: HTMLElement) => {
        const closeByLabel = blocker.querySelector<HTMLButtonElement>(
          'button[aria-label*="close" i]',
        );

        if (closeByLabel) {
          closeByLabel.click();
          return true;
        }

        const closeByText = Array.from(
          blocker.querySelectorAll<HTMLButtonElement>("button"),
        ).find((button) => {
          const label = button.getAttribute("aria-label") || "";
          const text = button.textContent || "";

          return /close|dismiss|cancel/i.test(`${label} ${text}`);
        });

        if (closeByText) {
          closeByText.click();
          return true;
        }

        const backdrop = blocker.querySelector<HTMLElement>(".absolute.inset-0");
        if (backdrop) {
          backdrop.click();
          return true;
        }

        blocker.click();
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
        );
        return true;
      };

      const closeBlockersForNextStep = (nextIndex: number) => {
        const nextStep = steps[nextIndex];

        if (!nextStep) {
          return false;
        }

        const nextElement = resolveStepElement(nextStep.element);
        const blockers = getActiveBlockers();

        if (blockers.length === 0) {
          return false;
        }

        let closedAny = false;

        blockers.forEach((blocker) => {
          if (nextElement && blocker.contains(nextElement)) {
            return;
          }

          closedAny = closeBlocker(blocker) || closedAny;
        });

        return closedAny;
      };

      const tourInstance = driver({
        showProgress: true,
        allowClose: false,
        animate: true,
        overlayClickBehavior: "close",
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Done",
        onNextClick: (_element, _step, opts) => {
          const activeIndex = opts.state.activeIndex;

          if (typeof activeIndex !== "number") {
            opts.driver.moveNext();
            return;
          }

          const nextIndex = activeIndex + 1;
          const closedBlockers = closeBlockersForNextStep(nextIndex);

          if (closedBlockers) {
            window.setTimeout(() => {
              opts.driver.moveNext();
            }, POPUP_DISMISS_WAIT_MS);
            return;
          }

          opts.driver.moveNext();
        },
        onCloseClick: (_element, _step, opts) => {
          opts.driver.destroy();
        },
        onPopoverRender: (popover, opts) => {
          const existingSkipButton = popover.footer.querySelector(
            TOUR_SKIP_BUTTON_SELECTOR,
          );

          if (existingSkipButton) {
            return;
          }

          const skipButton = document.createElement("button");
          skipButton.type = "button";
          skipButton.textContent = "Skip";
          skipButton.className = "driver-popover-btn driver-popover-close-btn";
          skipButton.dataset.tourSkipBtn = "true";
          skipButton.setAttribute("aria-label", "Skip tour");

          popover.footerButtons.prepend(skipButton);
        },
        steps,
        onDestroyed: () => {
          hasStartedRef.current = false;
          instanceRef.current = null;

          if (skipMarkSeenRef.current) {
            skipMarkSeenRef.current = false;
            return;
          }

          markSeen();
        },
      });

      hasStartedRef.current = true;
      instanceRef.current = tourInstance;
      tourInstance.drive();
    };

    const scheduleStart = () => {
      if (timerId !== null || hasStartedRef.current) {
        return;
      }

      timerId = window.setTimeout(() => {
        timerId = null;

        if (hasActiveSplash()) {
          return;
        }

        startTour();
      }, TOUR_START_DELAY_MS);
    };

    const tryStartWhenReady = () => {
      if (hasActiveSplash()) {
        return;
      }

      scheduleStart();
    };

    window.addEventListener(SPLASH_DISMISSED_EVENT, tryStartWhenReady);
    tryStartWhenReady();

    return () => {
      window.removeEventListener(SPLASH_DISMISSED_EVENT, tryStartWhenReady);

      if (timerId !== null) {
        window.clearTimeout(timerId);
      }
    };
  }, [markSeen, shouldStart, steps]);

  useEffect(() => {
    return () => {
      if (!instanceRef.current) {
        return;
      }

      skipMarkSeenRef.current = true;
      instanceRef.current.destroy();
      instanceRef.current = null;
      hasStartedRef.current = false;
    };
  }, [pathname]);

  return null;
}

"use client";

import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { useGesture } from "@use-gesture/react";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
  AnimatePresence,
} from "framer-motion";

// --- Types & Interfaces ---

type ImageItem = string | { src: string; alt?: string };
type ViewMode = "dome" | "stack" | "scroll" | "bento";

// --- ICONS ---
const Icons = {
  Dome: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  Stack: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 14 10 10 10-10" />
      <path d="m12 2 10 10-10 10L2 12Z" />
      <path d="m2 10 10 10 10-10" transform="translate(0 -4)" />
    </svg>
  ),
  Scroll: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
  Bento: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
};

// --- 1. DOME GALLERY LOGIC ---

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  autoRotateSpeed?: number;
  autoRotateDelay?: number;
};

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULTS = {
  maxVerticalRotationDeg: 15,
  dragSensitivity: 20,
  enlargeTransitionMs: 400,
  segments: 35,
  autoRotateSpeed: 0.05,
  autoRotateDelay: 1000,
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) return coords.map((c) => ({ ...c, src: "", alt: "" }));

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") return { src: image, alt: "" };
    return { src: image.src || "", alt: image.alt || "" };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length]! // Use non-null assertion as we know length is > 0
  );

  // Simple shuffle for variety
  for (let i = 1; i < usedImages.length; i++) {
    const current = usedImages[i];
    const prev = usedImages[i - 1];
    
    if (current && prev && current.src === prev.src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        const candidate = usedImages[j];
        if (candidate && candidate.src !== current.src) {
          usedImages[i] = candidate;
          usedImages[j] = current;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => {
     const img = usedImages[i];
     return {
        ...c,
        src: img?.src || "",
        alt: img?.alt || "",
     };
  });
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number,
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#f9fafb",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "600px",
  openedImageHeight = "400px",
  imageBorderRadius = "12px",
  openedImageBorderRadius = "16px",
  grayscale = false,
  autoRotateSpeed = DEFAULTS.autoRotateSpeed,
  autoRotateDelay = DEFAULTS.autoRotateDelay,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);
  const scrollLockedRef = useRef(false);
  const autoRotateRAFRef = useRef<number | null>(null);
  const autoRotateTimeoutRef = useRef<number | null>(null);
  const isAutoRotatingRef = useRef(false);

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  const stopAutoRotation = useCallback(() => {
    if (autoRotateRAFRef.current) {
      cancelAnimationFrame(autoRotateRAFRef.current);
      autoRotateRAFRef.current = null;
    }
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
      autoRotateTimeoutRef.current = null;
    }
    isAutoRotatingRef.current = false;
  }, []);

  const startAutoRotation = useCallback(() => {
    if (
      isAutoRotatingRef.current ||
      focusedElRef.current ||
      draggingRef.current
    ) {
      return;
    }
    const step = () => {
      if (focusedElRef.current || draggingRef.current) {
        stopAutoRotation();
        return;
      }
      const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
      rotationRef.current = { x: rotationRef.current.x, y: nextY };
      applyTransform(rotationRef.current.x, nextY);
      autoRotateRAFRef.current = requestAnimationFrame(step);
    };
    stopAutoRotation();
    isAutoRotatingRef.current = true;
    autoRotateRAFRef.current = requestAnimationFrame(step);
  }, [autoRotateSpeed, stopAutoRotation]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty(
        "--image-filter",
        grayscale ? "grayscale(1)" : "none",
      );
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
  ]);

  useEffect(() => {
    startAutoRotation();
    return () => stopAutoRotation();
  }, [startAutoRotation, stopAutoRotation]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);

      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          if (!focusedElRef.current && !draggingRef.current) {
            autoRotateTimeoutRef.current = window.setTimeout(
              startAutoRotation,
              autoRotateDelay,
            );
          }
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          if (!focusedElRef.current && !draggingRef.current) {
            autoRotateTimeoutRef.current = window.setTimeout(
              startAutoRotation,
              autoRotateDelay,
            );
          }
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      if (autoRotateTimeoutRef.current)
        clearTimeout(autoRotateTimeoutRef.current);
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [
      dragDampening,
      maxVerticalRotationDeg,
      stopInertia,
      startAutoRotation,
      autoRotateDelay,
    ],
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        stopAutoRotation();
        const evt = event as PointerEvent;
        pointerTypeRef.current =
          (evt.pointerType as "mouse" | "pen" | "touch") || "mouse";
        if (pointerTypeRef.current === "touch") evt.preventDefault();
        if (pointerTypeRef.current === "touch") lockScroll();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.(
          ".item__image",
        ) as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({
        event,
        last,
        velocity: velArr = [0, 0],
        direction: dirArr = [0, 0],
      }) => {
        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;
        const evt = event as PointerEvent;
        if (pointerTypeRef.current === "touch") evt.preventDefault();
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;
        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }
        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          let isTap = false;
          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) isTap = true;
          }
          const [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          const vx = vMagX * dirX;
          const vy = vMagY * dirY;
          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          } else {
            if (!focusedElRef.current) {
              autoRotateTimeoutRef.current = window.setTimeout(
                startAutoRotation,
                autoRotateDelay,
              );
            }
          }
          startPosRef.current = null;
          cancelTapRef.current = !isTap;
          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openItemFromElement(tapTargetRef.current);
          }
          tapTargetRef.current = null;
          if (cancelTapRef.current)
            setTimeout(() => (cancelTapRef.current = false), 120);
          if (pointerTypeRef.current === "touch") unlockScroll();
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } },
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement;
      const overlay = viewerRef.current?.querySelector(
        ".enlarge",
      ) as HTMLElement | null;
      if (!overlay) return;
      const refDiv = parent.querySelector(
        ".item__image--reference",
      ) as HTMLElement | null;
      const originalPos = refDiv?.getBoundingClientRect();
      if (!originalPos || !refDiv) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);
        el.style.visibility = "";
        el.style.zIndex = "0";
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");
        openingRef.current = false;
        unlockScroll();
        startAutoRotation();
        return;
      }
      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current!.getBoundingClientRect();
      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      };
      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      };
      const animatingOverlay = document.createElement("div");
      animatingOverlay.className = "enlarge-closing";
      animatingOverlay.style.cssText = `
        position: absolute;
        left: ${overlayRelativeToRoot.left}px;
        top: ${overlayRelativeToRoot.top}px;
        width: ${overlayRelativeToRoot.width}px;
        height: ${overlayRelativeToRoot.height}px;
        z-index: 9999;
        border-radius: ${openedImageBorderRadius};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${enlargeTransitionMs}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${grayscale ? "grayscale(1)" : "none"};
      `;
      const originalImg = overlay.querySelector("img");
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement;
        img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
        animatingOverlay.appendChild(img);
      }
      overlay.remove();
      rootRef.current!.appendChild(animatingOverlay);
      void animatingOverlay.getBoundingClientRect();
      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
        animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
        animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
        animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
        animatingOverlay.style.opacity = "0";
      });
      const cleanupFinal = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;
        if (refDiv) refDiv.remove();
        parent.style.transition = "none";
        el.style.transition = "none";
        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);
        requestAnimationFrame(() => {
          el.style.visibility = "";
          el.style.opacity = "0";
          el.style.zIndex = "0";
          focusedElRef.current = null;
          rootRef.current?.removeAttribute("data-enlarging");
          requestAnimationFrame(() => {
            parent.style.transition = "";
            el.style.transition = "opacity 300ms ease-out";
            requestAnimationFrame(() => {
              el.style.opacity = "1";
              setTimeout(() => {
                el.style.transition = "";
                el.style.opacity = "";
                openingRef.current = false;
                unlockScroll();
                startAutoRotation();
              }, 300);
            });
          });
        });
      };
      animatingOverlay.addEventListener("transitionend", cleanupFinal, {
        once: true,
      });
    };
    scrim.addEventListener("click", close);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      scrim.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [
    enlargeTransitionMs,
    openedImageBorderRadius,
    grayscale,
    unlockScroll,
    startAutoRotation,
  ]);

  const openItemFromElement = (el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();
    stopAutoRotation();
    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;
    el.setAttribute("data-focused", "true");
    const offsetX = getDataNumber(parent, "offsetX", 0);
    const offsetY = getDataNumber(parent, "offsetY", 0);
    const sizeX = getDataNumber(parent, "sizeX", 2);
    const sizeY = getDataNumber(parent, "sizeY", 2);
    const parentRot = computeItemBaseRotation(
      offsetX,
      offsetY,
      sizeX,
      sizeY,
      segments,
    );
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;
    parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
    parent.style.setProperty("--rot-x-delta", `${rotX}deg`);
    const refDiv = document.createElement("div");
    refDiv.className = "item__image item__image--reference opacity-0";
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);
    void refDiv.offsetHeight;
    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current?.getBoundingClientRect();
    const frameR = frameRef.current?.getBoundingClientRect();
    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
      openingRef.current = false;
      focusedElRef.current = null;
      parent.removeChild(refDiv);
      unlockScroll();
      startAutoRotation();
      return;
    }
    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height,
    };
    el.style.visibility = "hidden";
    el.style.zIndex = "0";
    const overlay = document.createElement("div");
    overlay.className = "enlarge";
    overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
    const rawSrc =
      parent.dataset.src ||
      (el.querySelector("img") as HTMLImageElement)?.src ||
      "";
    const rawAlt =
      parent.dataset.alt ||
      (el.querySelector("img") as HTMLImageElement)?.alt ||
      "";
    const img = document.createElement("img");
    img.src = rawSrc;
    img.alt = rawAlt;
    img.loading = "eager"; // Eager load the expanded image
    img.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${grayscale ? "grayscale(1)" : "none"};`;
    overlay.appendChild(img);
    viewerRef.current!.appendChild(overlay);
    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;
    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;
    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;
    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = "1";
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
      rootRef.current?.setAttribute("data-enlarging", "true");
    }, 16);
    const wantsResize = openedImageWidth || openedImageHeight;
    if (wantsResize) {
      const onFirstEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return;
        overlay.removeEventListener("transitionend", onFirstEnd);
        const prevTransition = overlay.style.transition;
        overlay.style.transition = "none";
        const tempWidth = openedImageWidth || `${frameR.width}px`;
        const tempHeight = openedImageHeight || `${frameR.height}px`;
        overlay.style.width = tempWidth;
        overlay.style.height = tempHeight;
        const newRect = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + "px";
        overlay.style.height = frameR.height + "px";
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
        const centeredLeft =
          frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
        const centeredTop =
          frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
        requestAnimationFrame(() => {
          overlay.style.left = `${centeredLeft}px`;
          overlay.style.top = `${centeredTop}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
        });
        const cleanupSecond = () => {
          overlay.removeEventListener("transitionend", cleanupSecond);
          overlay.style.transition = prevTransition;
        };
        overlay.addEventListener("transitionend", cleanupSecond, {
          once: true,
        });
      };
      overlay.addEventListener("transitionend", onFirstEnd);
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("dg-scroll-lock");
      stopAutoRotation();
    };
  }, [stopAutoRotation]);

  const cssStyles = `
.sphere-root { --radius: 520px; --viewer-pad: 72px; --circ: calc(var(--radius) * 3.14); --rot-y: calc((360deg / var(--segments-x)) / 2); --rot-x: calc((360deg / var(--segments-y)) / 2); --item-width: calc(var(--circ) / var(--segments-x)); --item-height: calc(var(--circ) / var(--segments-y)); }
.sphere-root * { box-sizing: border-box; }
.sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
.stage { width: 100%; height: 100%; display: grid; place-items: center; position: absolute; inset: 0; margin: auto; perspective: calc(var(--radius) * 2); perspective-origin: 50% 50%; }
.sphere { transform: translateZ(calc(var(--radius) * -1)); will-change: transform; position: absolute; }
.sphere-item { width: calc(var(--item-width) * var(--item-size-x)); height: calc(var(--item-height) * var(--item-size-y)); position: absolute; top: -999px; bottom: -999px; left: -999px; right: -999px; margin: auto; transform-origin: 50% 50%; backface-visibility: hidden; transition: transform 300ms; transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) translateZ(var(--radius)); }
.sphere-root[data-enlarging="true"] .scrim { opacity: 1 !important; pointer-events: all !important; }
.item__image { position: absolute; inset: 10px; border-radius: var(--tile-radius, 12px); overflow: hidden; cursor: pointer; backface-visibility: hidden; -webkit-backface-visibility: hidden; transition: transform 300ms; pointer-events: auto; -webkit-transform: translateZ(0); transform: translateZ(0); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
.item__image:hover { transform: translateZ(10px) scale(1.05); z-index: 10; }
.item__image--reference { position: absolute; inset: 10px; pointer-events: none; }
.dg-scroll-lock { overflow: hidden; }
`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative size-full overflow-hidden"
        style={
          {
            "--segments-x": segments,
            "--segments-y": segments,
            "--overlay-blur-color": overlayBlurColor,
            "--tile-radius": imageBorderRadius,
            "--enlarge-radius": openedImageBorderRadius,
            "--image-filter": grayscale ? "grayscale(1)" : "none",
          } as React.CSSProperties
        }
      >
        <main
          ref={mainRef}
          className="
            absolute inset-0 grid place-items-center overflow-hidden
            bg-transparent select-none
          "
          style={{ touchAction: "none", WebkitUserSelect: "none" }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      "--offset-x": it.x,
                      "--offset-y": it.y,
                      "--item-size-x": it.sizeX,
                      "--item-size-y": it.sizeY,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="
                      item__image absolute block cursor-pointer overflow-hidden
                      bg-white
                    "
                    data-tour={i === 0 ? "gallery-featured-image" : undefined}
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || "Open image"}
                    onClick={(e) => {
                      if (
                        draggingRef.current ||
                        movedRef.current ||
                        performance.now() - lastDragEndAt.current < 80 ||
                        openingRef.current
                      )
                        return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    onPointerUp={(e) => {
                      if (
                        (e.nativeEvent as PointerEvent).pointerType !== "touch"
                      )
                        return;
                      if (
                        draggingRef.current ||
                        movedRef.current ||
                        performance.now() - lastDragEndAt.current < 80 ||
                        openingRef.current
                      )
                        return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                  >
                    <Image
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="pointer-events-none object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-3 m-auto"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`,
            }}
          />
          <div
            className="
              pointer-events-none absolute inset-x-0 top-0 z-5 h-25 rotate-180
            "
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-25"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />
          <div
            ref={viewerRef}
            className="
              pointer-events-none absolute inset-0 z-20 flex items-center
              justify-center
            "
            style={{ padding: "var(--viewer-pad)" }}
          >
            <div
              ref={scrimRef}
              className="
                scrim pointer-events-none absolute inset-0 z-10 opacity-0
                transition-opacity duration-500
              "
              style={{
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(5px)",
              }}
            />
            <div
              ref={frameRef}
              className="flex aspect-square h-full"
              style={{
                borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`,
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
}

// --- 2. STACK (DECK) GALLERY LOGIC ---

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div
        className="absolute inset-0 cursor-pointer"
        style={{ x: 0, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 z-10 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  images: ImageItem[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

function StackGallery({
  randomRotation = false,
  sensitivity = 200,
  images = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
}: StackProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [stack, setStack] = useState<{ id: number; content: ImageItem }[]>([]);

  useEffect(() => {
    if (images.length) {
      setStack(images.map((img, index) => ({ id: index + 1, content: img })));
    }
  }, [images]);

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      if (index === -1) return prev;
      const [card] = newStack.splice(index, 1);
      
      // FIX 1: Ensure card exists before unshifting
      if (card) {
        newStack.unshift(card);
      }
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        // FIX 2: Safely access the last card
        const lastCard = stack[stack.length - 1];
        if (lastCard) {
            sendToBack(lastCard.id);
        }
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="
        relative flex size-full items-center justify-center overflow-hidden
        bg-gray-50
      "
      style={{ perspective: 1000 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="
        relative h-100 w-75
        md:h-125 md:w-100
      ">

        {stack.map((card, index) => {
          const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
          const src =
            typeof card.content === "string"
              ? card.content
              : card.content.src;
          const alt =
            typeof card.content === "string" ? "" : card.content.alt;

          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
              disableDrag={index !== stack.length - 1}
            >
              <motion.div
                className="
                  size-full overflow-hidden rounded-2xl border-4 border-white
                  bg-white shadow-xl
                "
                onClick={() => sendToBackOnClick && sendToBack(card.id)}
                animate={{
                  rotateZ: (stack.length - index - 1) * 2 + randomRotate,
                  scale: 1 + index * 0.02 - stack.length * 0.02,
                  y: -index * 5 + stack.length * 5,
                  transformOrigin: "50% 100%",
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
              >
                <div className="pointer-events-none relative size-full">
                  <Image
                    src={src}
                    alt={alt || "Gallery Card"}
                    fill
                    // Only load the visible items eagerly, lazy load the rest in the stack
                    loading={index >= stack.length - 3 ? "eager" : "lazy"}
                    className="object-cover"
                    sizes="(max-width: 768px) 300px, 400px"
                  />
                </div>
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
    </div>
  );
}

// --- 3. INFINITE SCROLL GALLERY LOGIC ---

function InfiniteScrollGallery({ images }: { images: ImageItem[] }) {
  const imageList = useMemo(() => {
    return images.map((img) => (typeof img === "string" ? img : img.src));
  }, [images]);

  const duplicatedImages = [...imageList, ...imageList];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .infinite-scroll {
          animation: scroll-right 40s linear infinite;
        }
        .scroll-container-mask {
          mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>

      <div className="
        relative flex size-full items-center justify-center overflow-hidden
        bg-gray-50
      ">
        <div className="
          relative z-10 flex w-full items-center justify-center py-8
        ">
          <div className="
            scroll-container-mask w-full max-w-[95%] overflow-hidden
          ">
            <div className="
              infinite-scroll flex w-max gap-6
              hover:[animation-play-state:paused]
            ">
              {duplicatedImages.map((src, index) => (
                <div
                  key={index}
                  className="
                    relative h-64 w-48 shrink-0 overflow-hidden rounded-xl
                    border-2 border-white shadow-lg transition-transform
                    duration-300
                    hover:scale-105
                    md:h-96 md:w-72
                  "
                >
                  <Image
                    src={src}
                    alt={`Gallery item`}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 300px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// --- 4. BENTO (GRID) GALLERY LOGIC ---

function BentoGallery({ images }: { images: ImageItem[] }) {
  return (
    <div className="
      custom-scrollbar size-full overflow-y-auto p-4
      md:p-8
    ">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
      `}</style>
      <div className="
        grid auto-rows-[150px] grid-cols-2 gap-4
        md:auto-rows-[200px] md:grid-cols-3
        lg:grid-cols-4
      ">
        {images.map((img, idx) => {
          const src = typeof img === "string" ? img : img.src;
          const alt = typeof img === "string" ? "" : img.alt;
          
          // Simple logic to create irregular grid items
          const isLarge = idx % 7 === 0 || idx % 11 === 0; 
          const isWide = !isLarge && (idx % 3 === 0);
          
          let className = `
            group relative overflow-hidden rounded-xl shadow-sm transition-all
            duration-300
            hover:shadow-lg
          `;
          if (isLarge) className += " col-span-2 row-span-2";
          else if (isWide) className += " col-span-2 row-span-1";
          else className += " col-span-1 row-span-1";

          return (
            <motion.div
              key={idx}
              className={className}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Image
                src={src}
                alt={alt || "Gallery Image"}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="
                  object-cover transition-transform duration-500
                  group-hover:scale-110
                "
              />
              <div className="
                absolute inset-0 bg-black/0 transition-colors duration-300
                group-hover:bg-black/20
              " />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function Gallery() {
  const [mode, setMode] = useState<ViewMode>("dome");

  const facultyImages = [
    { src: "/assets/GalleryImages/MainBuilding.jpeg", alt: "Main Campus Building" },
    { src: "/assets/GalleryImages/CBLab.jpeg", alt: "Computer Science Laboratory" },
    { src: "/assets/GalleryImages/DSLab.jpeg", alt: "Students Group Discussion" },
    { src: "/assets/GalleryImages/AlumniMeet.jpeg", alt: "Annual Tech Symposium" },
    { src: "/assets/GalleryImages/Convocation.jpeg", alt: "Research Center" },
    { src: "/assets/GalleryImages/DeptLib.jpeg", alt: "Graduation Day" },
    { src: "/assets/GalleryImages/NavniShrivastav.jpeg", alt: "Library Reading Hall" },
    { src: "/assets/GalleryImages/Office(1).jpeg", alt: "Robotics Workshop" },
    { src: "/assets/GalleryImages/SIH_2024.jpeg", alt: "SIH 2024" },
    { src: "/assets/GalleryImages/Prof.jpeg", alt: "Professor" },
    { src: "/assets/GalleryImages/VichaarSangam.jpeg", alt: "Discussion Forum" },
    { src: "/assets/GalleryImages/Office(2).jpeg", alt: "Offic" },
    { src: "/assets/GalleryImages/Persona2.jpeg", alt: "Vichaar Sangam 2.0" },
    { src: "/assets/GalleryImages/Raghav.jpeg", alt: "Student Code Hackathon" },
    { src: "/assets/GalleryImages/Samadhaan.jpeg", alt: "Faculty Meeting" },
    { src: "/assets/GalleryImages/SapnaChoudhary.jpeg", alt: "Campus Greenery" },
    { src: "/assets/GalleryImages/SoumyaSingh.jpeg", alt: "Digital Classroom" },
    { src: "/assets/GalleryImages/TCSDrive.jpeg", alt: "Placement Drive" },
    { src: "/images/deeksharambh.JPG", alt: "Induction Program" },
    
  ];

  return (
    <section id="gallery" className="
      mt:10
      section-container overflow-hidden bg-gray-50 py-12
    ">
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 fade-up text-center" data-tour="gallery-intro">
          <h2 className="
            mb-4 text-3xl font-bold text-primary
            md:text-4xl
          ">
            Gallery
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Explore life at SoIT through our collection of campus images.
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-accent"></div>
        </div>

        {/* Responsive Mode Toggle Switch */}
        <div
          className="
          z-30 mb-4 flex justify-center
          md:absolute md:top-0 md:right-8 md:mb-0 md:justify-end
        "
          data-tour="gallery-mode-toggle"
        >
          <div className="
            flex rounded-xl border border-gray-200 bg-white p-1 shadow-md
          ">
            {(["dome", "stack", "scroll", "bento"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                title={`Switch to ${m} view`}
                className={`
                  rounded-lg p-2 transition-all duration-200
                  md:p-2.5
                  ${
                      mode === m
                        ? "scale-100 bg-blue-600 text-white shadow-sm"
                        : `
                          text-gray-400
                          hover:bg-gray-100 hover:text-gray-600
                        `
                    }
                `}
              >
                {m === "dome" && Icons.Dome}
                {m === "stack" && Icons.Stack}
                {m === "scroll" && Icons.Scroll}
                {m === "bento" && Icons.Bento}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Container */}
        <div
          className="
          relative h-150 w-full fade-up overflow-hidden rounded-xl border
          border-gray-200 bg-gray-100 shadow-inner
          md:h-175
        "
          data-tour="gallery-stage"
        >
          <AnimatePresence mode="wait">
            {mode === "dome" && (
              <motion.div
                key="dome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="size-full"
              >
                <DomeGallery
                  images={facultyImages}
                  overlayBlurColor="#f3f4f6" // matches bg-gray-100
                  fit={0.65}
                  grayscale={false}
                  imageBorderRadius="8px"
                  openedImageWidth="800px"
                  autoRotateSpeed={0.08}
                  autoRotateDelay={1500}
                />
              </motion.div>
            )}

            {mode === "stack" && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="size-full"
              >
                <StackGallery
                  images={facultyImages}
                  autoplay={true}
                  pauseOnHover={true}
                />
              </motion.div>
            )}

            {mode === "scroll" && (
              <motion.div
                key="scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="size-full"
              >
                <InfiniteScrollGallery images={facultyImages} />
              </motion.div>
            )}

            {mode === "bento" && (
              <motion.div
                key="bento"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="size-full"
              >
                <BentoGallery images={facultyImages} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// // "use client";

// // import { useEffect, useMemo, useRef, useCallback } from "react";
// // import Image from "next/image";
// // import { useGesture } from "@use-gesture/react";

// // // --- Types & Interfaces ---

// // type ImageItem = string | { src: string; alt?: string };

// // type DomeGalleryProps = {
// //   images?: ImageItem[];
// //   fit?: number;
// //   fitBasis?: "auto" | "min" | "max" | "width" | "height";
// //   minRadius?: number;
// //   maxRadius?: number;
// //   padFactor?: number;
// //   overlayBlurColor?: string;
// //   maxVerticalRotationDeg?: number;
// //   dragSensitivity?: number;
// //   enlargeTransitionMs?: number;
// //   segments?: number;
// //   dragDampening?: number;
// //   openedImageWidth?: string;
// //   openedImageHeight?: string;
// //   imageBorderRadius?: string;
// //   openedImageBorderRadius?: string;
// //   grayscale?: boolean;
// //   autoRotateSpeed?: number; // New prop for auto-rotation
// //   autoRotateDelay?: number; // New prop for delay before auto-rotate resumes
// // };

// // type ItemDef = {
// //   src: string;
// //   alt: string;
// //   x: number;
// //   y: number;
// //   sizeX: number;
// //   sizeY: number;
// // };

// // // --- Configuration & Helpers ---

// // const DEFAULTS = {
// //   maxVerticalRotationDeg: 15,
// //   dragSensitivity: 20,
// //   enlargeTransitionMs: 400,
// //   segments: 35,
// //   autoRotateSpeed: 0.05, // Default auto-rotation speed (degrees per frame)
// //   autoRotateDelay: 1000, // Default delay before auto-rotation resumes after drag
// // };

// // const clamp = (v: number, min: number, max: number) =>
// //   Math.min(Math.max(v, min), max);
// // const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
// // const wrapAngleSigned = (deg: number) => {
// //   const a = (((deg + 180) % 360) + 360) % 360;
// //   return a - 180;
// // };
// // const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
// //   const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
// //   const n = attr == null ? NaN : parseFloat(attr);
// //   return Number.isFinite(n) ? n : fallback;
// // };

// // function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
// //   const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
// //   const evenYs = [-4, -2, 0, 2, 4];
// //   const oddYs = [-3, -1, 1, 3, 5];

// //   const coords = xCols.flatMap((x, c) => {
// //     const ys = c % 2 === 0 ? evenYs : oddYs;
// //     return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
// //   });

// //   const totalSlots = coords.length;
// //   if (pool.length === 0) return coords.map((c) => ({ ...c, src: "", alt: "" }));

// //   const normalizedImages = pool.map((image) => {
// //     if (typeof image === "string") return { src: image, alt: "" };
// //     return { src: image.src || "", alt: image.alt || "" };
// //   });

// //   const usedImages = Array.from(
// //     { length: totalSlots },
// //     (_, i) => normalizedImages[i % normalizedImages.length],
// //   );

// //   for (let i = 1; i < usedImages.length; i++) {
// //     if (usedImages[i]?.src === usedImages[i - 1]?.src) {
// //       for (let j = i + 1; j < usedImages.length; j++) {
// //         if (usedImages[j]?.src !== usedImages[i]?.src) {
// //           const tmp = usedImages[i];
// //           usedImages[i] = usedImages[j];
// //           usedImages[j] = tmp;
// //           break;
// //         }
// //       }
// //     }
// //   }

// //   return coords.map((c, i) => ({
// //     ...c,
// //     src: usedImages[i]?.src || "",
// //     alt: usedImages[i]?.alt || "",
// //   }));
// // }

// // function computeItemBaseRotation(
// //   offsetX: number,
// //   offsetY: number,
// //   sizeX: number,
// //   sizeY: number,
// //   segments: number,
// // ) {
// //   const unit = 360 / segments / 2;
// //   const rotateY = unit * (offsetX + (sizeX - 1) / 2);
// //   const rotateX = unit * (offsetY - (sizeY - 1) / 2);
// //   return { rotateX, rotateY };
// // }

// // // --- DomeGallery Component ---

// // function DomeGallery({
// //   images = [],
// //   fit = 0.5,
// //   fitBasis = "auto",
// //   minRadius = 600,
// //   maxRadius = Infinity,
// //   padFactor = 0.25,
// //   overlayBlurColor = "#f9fafb",
// //   maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
// //   dragSensitivity = DEFAULTS.dragSensitivity,
// //   enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
// //   segments = DEFAULTS.segments,
// //   dragDampening = 2,
// //   openedImageWidth = "600px",
// //   openedImageHeight = "400px",
// //   imageBorderRadius = "12px",
// //   openedImageBorderRadius = "16px",
// //   grayscale = false,
// //   autoRotateSpeed = DEFAULTS.autoRotateSpeed, // Use default or prop
// //   autoRotateDelay = DEFAULTS.autoRotateDelay, // Use default or prop
// // }: DomeGalleryProps) {
// //   const rootRef = useRef<HTMLDivElement>(null);
// //   const mainRef = useRef<HTMLDivElement>(null);
// //   const sphereRef = useRef<HTMLDivElement>(null);
// //   const frameRef = useRef<HTMLDivElement>(null);
// //   const viewerRef = useRef<HTMLDivElement>(null);
// //   const scrimRef = useRef<HTMLDivElement>(null);
// //   const focusedElRef = useRef<HTMLElement | null>(null);
// //   // originalTilePositionRef is no longer strictly used for final position,
// //   // but kept for initial open animation setup.
// //   const originalTilePositionRef = useRef<{
// //     left: number;
// //     top: number;
// //     width: number;
// //     height: number;
// //   } | null>(null);

// //   const rotationRef = useRef({ x: 0, y: 0 });
// //   const startRotRef = useRef({ x: 0, y: 0 });
// //   const startPosRef = useRef<{ x: number; y: number } | null>(null);
// //   const draggingRef = useRef(false);
// //   const cancelTapRef = useRef(false);
// //   const movedRef = useRef(false);
// //   const inertiaRAF = useRef<number | null>(null);
// //   const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
// //   const tapTargetRef = useRef<HTMLElement | null>(null);
// //   const openingRef = useRef(false);
// //   const openStartedAtRef = useRef(0);
// //   const lastDragEndAt = useRef(0);

// //   const scrollLockedRef = useRef(false);

// //   // New refs for auto-rotation
// //   const autoRotateRAFRef = useRef<number | null>(null);
// //   const autoRotateTimeoutRef = useRef<number | null>(null);
// //   const isAutoRotatingRef = useRef(false);

// //   const lockScroll = useCallback(() => {
// //     if (scrollLockedRef.current) return;
// //     scrollLockedRef.current = true;
// //     document.body.classList.add("dg-scroll-lock");
// //   }, []);

// //   const unlockScroll = useCallback(() => {
// //     if (!scrollLockedRef.current) return;
// //     // Only unlock if not currently in an enlarged state
// //     if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
// //     scrollLockedRef.current = false;
// //     document.body.classList.remove("dg-scroll-lock");
// //   }, []);

// //   const items = useMemo(() => buildItems(images, segments), [images, segments]);

// //   const applyTransform = (xDeg: number, yDeg: number) => {
// //     const el = sphereRef.current;
// //     if (el) {
// //       el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
// //     }
// //   };

// //   const lockedRadiusRef = useRef<number | null>(null);

// //   // Auto-rotation functions
// //   const stopAutoRotation = useCallback(() => {
// //     if (autoRotateRAFRef.current) {
// //       cancelAnimationFrame(autoRotateRAFRef.current);
// //       autoRotateRAFRef.current = null;
// //     }
// //     if (autoRotateTimeoutRef.current) {
// //       clearTimeout(autoRotateTimeoutRef.current);
// //       autoRotateTimeoutRef.current = null;
// //     }
// //     isAutoRotatingRef.current = false;
// //   }, []);

// //   const startAutoRotation = useCallback(() => {
// //     // Only start auto-rotation if not already rotating, no image is open, and not currently dragging
// //     if (
// //       isAutoRotatingRef.current ||
// //       focusedElRef.current ||
// //       draggingRef.current
// //     ) {
// //       return;
// //     }

// //     const step = () => {
// //       // Re-check conditions inside the loop as state might change asynchronously
// //       if (focusedElRef.current || draggingRef.current) {
// //         stopAutoRotation();
// //         return;
// //       }
// //       const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
// //       rotationRef.current = { x: rotationRef.current.x, y: nextY };
// //       applyTransform(rotationRef.current.x, nextY);
// //       autoRotateRAFRef.current = requestAnimationFrame(step);
// //     };

// //     stopAutoRotation(); // Ensure any existing auto-rotation is stopped before starting a new one
// //     isAutoRotatingRef.current = true;
// //     autoRotateRAFRef.current = requestAnimationFrame(step);
// //   }, [autoRotateSpeed, stopAutoRotation]);

// //   // Resize and Setup Observer
// //   useEffect(() => {
// //     const root = rootRef.current;
// //     if (!root) return;

// //     const ro = new ResizeObserver((entries) => {
// //       if (!entries[0]) return;
// //       const cr = entries[0].contentRect;
// //       const w = Math.max(1, cr.width),
// //         h = Math.max(1, cr.height);
// //       const minDim = Math.min(w, h),
// //         maxDim = Math.max(w, h),
// //         aspect = w / h;

// //       let basis: number;
// //       switch (fitBasis) {
// //         case "min":
// //           basis = minDim;
// //           break;
// //         case "max":
// //           basis = maxDim;
// //           break;
// //         case "width":
// //           basis = w;
// //           break;
// //         case "height":
// //           basis = h;
// //           break;
// //         default:
// //           basis = aspect >= 1.3 ? w : minDim;
// //       }

// //       let radius = basis * fit;
// //       const heightGuard = h * 1.35;
// //       radius = Math.min(radius, heightGuard);
// //       radius = clamp(radius, minRadius, maxRadius);
// //       lockedRadiusRef.current = Math.round(radius);

// //       const viewerPad = Math.max(8, Math.round(minDim * padFactor));
// //       root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
// //       root.style.setProperty("--viewer-pad", `${viewerPad}px`);
// //       root.style.setProperty("--overlay-blur-color", overlayBlurColor);
// //       root.style.setProperty("--tile-radius", imageBorderRadius);
// //       root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
// //       root.style.setProperty(
// //         "--image-filter",
// //         grayscale ? "grayscale(1)" : "none",
// //       );

// //       applyTransform(rotationRef.current.x, rotationRef.current.y);
// //     });

// //     ro.observe(root);
// //     return () => ro.disconnect();
// //   }, [
// //     fit,
// //     fitBasis,
// //     minRadius,
// //     maxRadius,
// //     padFactor,
// //     overlayBlurColor,
// //     grayscale,
// //     imageBorderRadius,
// //     openedImageBorderRadius,
// //   ]);

// //   // Initial auto-rotation setup and cleanup
// //   useEffect(() => {
// //     startAutoRotation();
// //     return () => stopAutoRotation();
// //   }, [startAutoRotation, stopAutoRotation]);

// //   const stopInertia = useCallback(() => {
// //     if (inertiaRAF.current) {
// //       cancelAnimationFrame(inertiaRAF.current);
// //       inertiaRAF.current = null;
// //     }
// //   }, []);

// //   const startInertia = useCallback(
// //     (vx: number, vy: number) => {
// //       const MAX_V = 1.4;
// //       let vX = clamp(vx, -MAX_V, MAX_V) * 80;
// //       let vY = clamp(vy, -MAX_V, MAX_V) * 80;
// //       let frames = 0;
// //       const d = clamp(dragDampening ?? 0.6, 0, 1);
// //       const frictionMul = 0.94 + 0.055 * d;
// //       const stopThreshold = 0.015 - 0.01 * d;
// //       const maxFrames = Math.round(90 + 270 * d);

// //       const step = () => {
// //         vX *= frictionMul;
// //         vY *= frictionMul;
// //         if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
// //           inertiaRAF.current = null;
// //           // After inertia stops, resume auto-rotation after a delay
// //           if (!focusedElRef.current && !draggingRef.current) {
// //             autoRotateTimeoutRef.current = window.setTimeout(
// //               startAutoRotation,
// //               autoRotateDelay,
// //             );
// //           }
// //           return;
// //         }
// //         if (++frames > maxFrames) {
// //           inertiaRAF.current = null;
// //           // After inertia stops, resume auto-rotation after a delay
// //           if (!focusedElRef.current && !draggingRef.current) {
// //             autoRotateTimeoutRef.current = window.setTimeout(
// //               startAutoRotation,
// //               autoRotateDelay,
// //             );
// //           }
// //           return;
// //         }
// //         const nextX = clamp(
// //           rotationRef.current.x - vY / 200,
// //           -maxVerticalRotationDeg,
// //           maxVerticalRotationDeg,
// //         );
// //         const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
// //         rotationRef.current = { x: nextX, y: nextY };
// //         applyTransform(nextX, nextY);
// //         inertiaRAF.current = requestAnimationFrame(step);
// //       };
// //       stopInertia();
// //       // Clear any pending auto-rotate start to prevent it from conflicting with inertia or new drag
// //       if (autoRotateTimeoutRef.current)
// //         clearTimeout(autoRotateTimeoutRef.current);
// //       inertiaRAF.current = requestAnimationFrame(step);
// //     },
// //     [
// //       dragDampening,
// //       maxVerticalRotationDeg,
// //       stopInertia,
// //       startAutoRotation,
// //       autoRotateDelay,
// //     ],
// //   );

// //   useGesture(
// //     {
// //       onDragStart: ({ event }) => {
// //         if (focusedElRef.current) return;
// //         stopInertia();
// //         stopAutoRotation(); // Stop auto-rotation immediately on drag start

// //         const evt = event as PointerEvent;
// //         pointerTypeRef.current =
// //           (evt.pointerType as "mouse" | "pen" | "touch") || "mouse";
// //         if (pointerTypeRef.current === "touch") evt.preventDefault();
// //         if (pointerTypeRef.current === "touch") lockScroll();
// //         draggingRef.current = true;
// //         cancelTapRef.current = false;
// //         movedRef.current = false;
// //         startRotRef.current = { ...rotationRef.current };
// //         startPosRef.current = { x: evt.clientX, y: evt.clientY };
// //         const potential = (evt.target as Element).closest?.(
// //           ".item__image",
// //         ) as HTMLElement | null;
// //         tapTargetRef.current = potential || null;
// //       },
// //       onDrag: ({
// //         event,
// //         last,
// //         velocity: velArr = [0, 0],
// //         direction: dirArr = [0, 0],
// //       }) => {
// //         if (
// //           focusedElRef.current ||
// //           !draggingRef.current ||
// //           !startPosRef.current
// //         )
// //           return;

// //         const evt = event as PointerEvent;
// //         if (pointerTypeRef.current === "touch") evt.preventDefault();

// //         const dxTotal = evt.clientX - startPosRef.current.x;
// //         const dyTotal = evt.clientY - startPosRef.current.y;

// //         if (!movedRef.current) {
// //           const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
// //           if (dist2 > 16) movedRef.current = true;
// //         }

// //         const nextX = clamp(
// //           startRotRef.current.x - dyTotal / dragSensitivity,
// //           -maxVerticalRotationDeg,
// //           maxVerticalRotationDeg,
// //         );
// //         const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

// //         const cur = rotationRef.current;
// //         if (cur.x !== nextX || cur.y !== nextY) {
// //           rotationRef.current = { x: nextX, y: nextY };
// //           applyTransform(nextX, nextY);
// //         }

// //         if (last) {
// //           draggingRef.current = false;
// //           let isTap = false;

// //           if (startPosRef.current) {
// //             const dx = evt.clientX - startPosRef.current.x;
// //             const dy = evt.clientY - startPosRef.current.y;
// //             const dist2 = dx * dx + dy * dy;
// //             const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6;
// //             if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) isTap = true;
// //           }

// //           const [vMagX, vMagY] = velArr;
// //           const [dirX, dirY] = dirArr;
// //           const vx = vMagX * dirX;
// //           const vy = vMagY * dirY;

// //           if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
// //             startInertia(vx, vy);
// //           } else {
// //             // No inertia, resume auto-rotation after delay if no image is open
// //             if (!focusedElRef.current) {
// //               autoRotateTimeoutRef.current = window.setTimeout(
// //                 startAutoRotation,
// //                 autoRotateDelay,
// //               );
// //             }
// //           }
// //           startPosRef.current = null;
// //           cancelTapRef.current = !isTap;

// //           if (isTap && tapTargetRef.current && !focusedElRef.current) {
// //             openItemFromElement(tapTargetRef.current);
// //           }
// //           tapTargetRef.current = null;

// //           if (cancelTapRef.current)
// //             setTimeout(() => (cancelTapRef.current = false), 120);
// //           if (pointerTypeRef.current === "touch") unlockScroll();
// //           if (movedRef.current) lastDragEndAt.current = performance.now();
// //           movedRef.current = false;
// //         }
// //       },
// //     },
// //     { target: mainRef, eventOptions: { passive: false } },
// //   );

// //   // Handle closing lightbox
// //   useEffect(() => {
// //     const scrim = scrimRef.current;
// //     if (!scrim) return;

// //     const close = () => {
// //       // Prevent rapid re-closing if clicked multiple times
// //       if (performance.now() - openStartedAtRef.current < 250) return;
// //       const el = focusedElRef.current;
// //       if (!el) return;

// //       const parent = el.parentElement as HTMLElement;
// //       const overlay = viewerRef.current?.querySelector(
// //         ".enlarge",
// //       ) as HTMLElement | null;
// //       if (!overlay) return;

// //       const refDiv = parent.querySelector(
// //         ".item__image--reference",
// //       ) as HTMLElement | null;

// //       // IMPORTANT CHANGE FOR SCROLL ACCOUNTING:
// //       // Re-read the current viewport position of the reference element.
// //       // This ensures the closing animation targets the correct location even if the page has scrolled.
// //       const originalPos = refDiv?.getBoundingClientRect();

// //       if (!originalPos || !refDiv) {
// //         // Fallback if refDiv or its position is somehow missing
// //         console.warn(
// //           "Could not find refDiv or its position for closing animation, performing direct cleanup.",
// //         );
// //         overlay.remove();
// //         if (refDiv) refDiv.remove(); // Ensure refDiv is removed even in fallback
// //         parent.style.setProperty("--rot-y-delta", `0deg`);
// //         parent.style.setProperty("--rot-x-delta", `0deg`);
// //         el.style.visibility = "";
// //         el.style.zIndex = "0";
// //         focusedElRef.current = null;
// //         rootRef.current?.removeAttribute("data-enlarging");
// //         openingRef.current = false;
// //         unlockScroll(); // Ensure scroll is unlocked in fallback
// //         startAutoRotation(); // Resume auto-rotation in fallback
// //         return;
// //       }

// //       // Animate closing
// //       const currentRect = overlay.getBoundingClientRect();
// //       const rootRect = rootRef.current!.getBoundingClientRect();

// //       // originalPos is already viewport-relative. Convert to root-relative.
// //       const originalPosRelativeToRoot = {
// //         left: originalPos.left - rootRect.left,
// //         top: originalPos.top - rootRect.top,
// //         width: originalPos.width,
// //         height: originalPos.height,
// //       };

// //       const overlayRelativeToRoot = {
// //         left: currentRect.left - rootRect.left,
// //         top: currentRect.top - rootRect.top,
// //         width: currentRect.width,
// //         height: currentRect.height,
// //       };

// //       const animatingOverlay = document.createElement("div");
// //       animatingOverlay.className = "enlarge-closing";
// //       animatingOverlay.style.cssText = `
// //         position: absolute;
// //         left: ${overlayRelativeToRoot.left}px;
// //         top: ${overlayRelativeToRoot.top}px;
// //         width: ${overlayRelativeToRoot.width}px;
// //         height: ${overlayRelativeToRoot.height}px;
// //         z-index: 9999;
// //         border-radius: ${openedImageBorderRadius};
// //         overflow: hidden;
// //         box-shadow: 0 10px 30px rgba(0,0,0,.35);
// //         transition: all ${enlargeTransitionMs}ms ease-out;
// //         pointer-events: none;
// //         margin: 0;
// //         transform: none;
// //         filter: ${grayscale ? "grayscale(1)" : "none"};
// //       `;

// //       const originalImg = overlay.querySelector("img");
// //       if (originalImg) {
// //         const img = originalImg.cloneNode() as HTMLImageElement;
// //         img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
// //         animatingOverlay.appendChild(img);
// //       }

// //       overlay.remove();
// //       rootRef.current!.appendChild(animatingOverlay);
// //       void animatingOverlay.getBoundingClientRect(); // Force layout for initial position

// //       requestAnimationFrame(() => {
// //         // Set target position for the closing animation
// //         animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
// //         animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
// //         animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
// //         animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
// //         animatingOverlay.style.opacity = "0";
// //       });

// //       const cleanupFinal = () => {
// //         animatingOverlay.remove();
// //         originalTilePositionRef.current = null; // Clear old ref
// //         if (refDiv) refDiv.remove(); // RefDiv is properly removed after use

// //         parent.style.transition = "none"; // Temporarily disable transitions for reset
// //         el.style.transition = "none";
// //         parent.style.setProperty("--rot-y-delta", `0deg`);
// //         parent.style.setProperty("--rot-x-delta", `0deg`);

// //         requestAnimationFrame(() => {
// //           el.style.visibility = ""; // Make original tile visible
// //           el.style.opacity = "0"; // Start with opacity 0 for fade-in
// //           el.style.zIndex = "0";
// //           focusedElRef.current = null;
// //           rootRef.current?.removeAttribute("data-enlarging"); // IMPORTANT: Remove attribute before unlockScroll

// //           requestAnimationFrame(() => {
// //             parent.style.transition = ""; // Restore transitions
// //             el.style.transition = "opacity 300ms ease-out";
// //             requestAnimationFrame(() => {
// //               el.style.opacity = "1"; // Fade original tile back in
// //               setTimeout(() => {
// //                 el.style.transition = ""; // Clear transition after fade-in
// //                 el.style.opacity = "";
// //                 openingRef.current = false;
// //                 unlockScroll(); // Correctly unlock scroll after enlargement state is cleared
// //                 startAutoRotation(); // Resume auto-rotation after closing
// //               }, 300);
// //             });
// //           });
// //         });
// //       };

// //       animatingOverlay.addEventListener("transitionend", cleanupFinal, {
// //         once: true,
// //       });
// //     };

// //     scrim.addEventListener("click", close);
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === "Escape") close();
// //     };
// //     window.addEventListener("keydown", onKey);

// //     return () => {
// //       scrim.removeEventListener("click", close);
// //       window.removeEventListener("keydown", onKey);
// //     };
// //   }, [
// //     enlargeTransitionMs,
// //     openedImageBorderRadius,
// //     grayscale,
// //     unlockScroll,
// //     startAutoRotation,
// //   ]); // Add all relevant dependencies

// //   const openItemFromElement = (el: HTMLElement) => {
// //     if (openingRef.current) return;
// //     openingRef.current = true;
// //     openStartedAtRef.current = performance.now();
// //     lockScroll();
// //     stopAutoRotation(); // Stop auto-rotation when opening an image

// //     const parent = el.parentElement as HTMLElement;
// //     focusedElRef.current = el;
// //     el.setAttribute("data-focused", "true");

// //     const offsetX = getDataNumber(parent, "offsetX", 0);
// //     const offsetY = getDataNumber(parent, "offsetY", 0);
// //     const sizeX = getDataNumber(parent, "sizeX", 2);
// //     const sizeY = getDataNumber(parent, "sizeY", 2);

// //     const parentRot = computeItemBaseRotation(
// //       offsetX,
// //       offsetY,
// //       sizeX,
// //       sizeY,
// //       segments,
// //     );
// //     const parentY = normalizeAngle(parentRot.rotateY);
// //     const globalY = normalizeAngle(rotationRef.current.y);
// //     let rotY = -(parentY + globalY) % 360;
// //     if (rotY < -180) rotY += 360;
// //     const rotX = -parentRot.rotateX - rotationRef.current.x;

// //     parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
// //     parent.style.setProperty("--rot-x-delta", `${rotX}deg`);

// //     // Create a reference div that stays in the original 3D position
// //     const refDiv = document.createElement("div");
// //     refDiv.className = "item__image item__image--reference opacity-0";
// //     refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
// //     parent.appendChild(refDiv);
// //     void refDiv.offsetHeight; // Force reflow to ensure it's in position for getBoundingClientRect

// //     const tileR = refDiv.getBoundingClientRect(); // Get initial viewport position
// //     const mainR = mainRef.current?.getBoundingClientRect();
// //     const frameR = frameRef.current?.getBoundingClientRect();

// //     if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
// //       openingRef.current = false;
// //       focusedElRef.current = null;
// //       parent.removeChild(refDiv); // Clean up refDiv if opening fails
// //       unlockScroll();
// //       startAutoRotation(); // Resume auto-rotation if opening failed
// //       return;
// //     }

// //     // Store this initial position for the opening animation start point
// //     originalTilePositionRef.current = {
// //       left: tileR.left,
// //       top: tileR.top,
// //       width: tileR.width,
// //       height: tileR.height,
// //     };

// //     el.style.visibility = "hidden"; // Hide the original tile
// //     el.style.zIndex = "0"; // Ensure it's not interactive

// //     // Create the enlarged overlay element
// //     const overlay = document.createElement("div");
// //     overlay.className = "enlarge";
// //     overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;

// //     const rawSrc =
// //       parent.dataset.src ||
// //       (el.querySelector("img") as HTMLImageElement)?.src ||
// //       "";
// //     const rawAlt =
// //       parent.dataset.alt ||
// //       (el.querySelector("img") as HTMLImageElement)?.alt ||
// //       "";

// //     const img = document.createElement("img");
// //     img.src = rawSrc;
// //     img.alt = rawAlt;
// //     img.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${grayscale ? "grayscale(1)" : "none"};`;
// //     overlay.appendChild(img);
// //     viewerRef.current!.appendChild(overlay);

// //     // Calculate initial transform for the opening animation
// //     const tx0 = tileR.left - frameR.left;
// //     const ty0 = tileR.top - frameR.top;
// //     const sx0 = tileR.width / frameR.width;
// //     const sy0 = tileR.height / frameR.height;

// //     const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
// //     const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

// //     overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

// //     setTimeout(() => {
// //       if (!overlay.parentElement) return;
// //       overlay.style.opacity = "1";
// //       overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
// //       rootRef.current?.setAttribute("data-enlarging", "true");
// //     }, 16);

// //     // Handle resizing if custom dimensions are set
// //     const wantsResize = openedImageWidth || openedImageHeight;
// //     if (wantsResize) {
// //       const onFirstEnd = (ev: TransitionEvent) => {
// //         if (ev.propertyName !== "transform") return; // Only react to transform transition
// //         overlay.removeEventListener("transitionend", onFirstEnd);

// //         const prevTransition = overlay.style.transition;
// //         overlay.style.transition = "none"; // Temporarily disable transitions for size change

// //         const tempWidth = openedImageWidth || `${frameR.width}px`;
// //         const tempHeight = openedImageHeight || `${frameR.height}px`;

// //         overlay.style.width = tempWidth;
// //         overlay.style.height = tempHeight;

// //         const newRect = overlay.getBoundingClientRect(); // Get new dimensions
// //         overlay.style.width = frameR.width + "px"; // Reset to initial frame size before animated resize
// //         overlay.style.height = frameR.height + "px";
// //         void overlay.offsetWidth; // Force reflow

// //         overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;

// //         const centeredLeft =
// //           frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
// //         const centeredTop =
// //           frameR.top - mainR.top + (frameR.height - newRect.height) / 2;

// //         requestAnimationFrame(() => {
// //           overlay.style.left = `${centeredLeft}px`;
// //           overlay.style.top = `${centeredTop}px`;
// //           overlay.style.width = tempWidth;
// //           overlay.style.height = tempHeight;
// //         });

// //         const cleanupSecond = () => {
// //           overlay.removeEventListener("transitionend", cleanupSecond);
// //           overlay.style.transition = prevTransition; // Restore original transition
// //         };
// //         overlay.addEventListener("transitionend", cleanupSecond, {
// //           once: true,
// //         });
// //       };
// //       overlay.addEventListener("transitionend", onFirstEnd);
// //     }
// //   };

// //   useEffect(() => {
// //     // Cleanup for scroll lock when component unmounts to prevent body from remaining locked
// //     return () => {
// //       document.body.classList.remove("dg-scroll-lock");
// //       stopAutoRotation(); // Ensure auto-rotation is stopped if component unmounts
// //     };
// //   }, [stopAutoRotation]);

// //   const cssStyles = `
// //     /* Existing styles */
// //     .sphere-root {
// //       --radius: 520px;
// //       --viewer-pad: 72px;
// //       --circ: calc(var(--radius) * 3.14);
// //       --rot-y: calc((360deg / var(--segments-x)) / 2);
// //       --rot-x: calc((360deg / var(--segments-y)) / 2);
// //       --item-width: calc(var(--circ) / var(--segments-x));
// //       --item-height: calc(var(--circ) / var(--segments-y));
// //     }
    
// //     .sphere-root * { box-sizing: border-box; }
// //     .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
// //     .stage {
// //       width: 100%;
// //       height: 100%;
// //       display: grid;
// //       place-items: center;
// //       position: absolute;
// //       inset: 0;
// //       margin: auto;
// //       perspective: calc(var(--radius) * 2);
// //       perspective-origin: 50% 50%;
// //     }
    
// //     .sphere {
// //       transform: translateZ(calc(var(--radius) * -1));
// //       will-change: transform;
// //       position: absolute;
// //     }
    
// //     .sphere-item {
// //       width: calc(var(--item-width) * var(--item-size-x));
// //       height: calc(var(--item-height) * var(--item-size-y));
// //       position: absolute;
// //       top: -999px; bottom: -999px; left: -999px; right: -999px;
// //       margin: auto;
// //       transform-origin: 50% 50%;
// //       backface-visibility: hidden;
// //       transition: transform 300ms;
// //       transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
// //                  rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
// //                  translateZ(var(--radius));
// //     }
    
// //     .sphere-root[data-enlarging="true"] .scrim {
// //       opacity: 1 !important;
// //       pointer-events: all !important;
// //     }
    
// //     .item__image {
// //       position: absolute;
// //       inset: 10px;
// //       border-radius: var(--tile-radius, 12px);
// //       overflow: hidden;
// //       cursor: pointer;
// //       backface-visibility: hidden;
// //       -webkit-backface-visibility: hidden;
// //       transition: transform 300ms;
// //       pointer-events: auto;
// //       -webkit-transform: translateZ(0);
// //       transform: translateZ(0);
// //       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
// //     }
// //     .item__image:hover {
// //       transform: translateZ(10px) scale(1.05);
// //       z-index: 10;
// //     }
// //     .item__image--reference {
// //       position: absolute;
// //       inset: 10px;
// //       pointer-events: none;
// //     }

// //     /* New CSS for scroll lock */
// //     .dg-scroll-lock {
// //       overflow: hidden;
// //       /* Optional: For a more robust scroll lock without content jump,
// //          you might need to calculate scrollbar width and apply padding-right:
// //          padding-right: var(--scrollbar-width);
// //       */
// //     }
// //   `;

// //   return (
// //     <>
// //       <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
// //       <div
// //         ref={rootRef}
// //         className="sphere-root relative h-full w-full overflow-hidden"
// //         style={
// //           {
// //             "--segments-x": segments,
// //             "--segments-y": segments,
// //             "--overlay-blur-color": overlayBlurColor,
// //             "--tile-radius": imageBorderRadius,
// //             "--enlarge-radius": openedImageBorderRadius,
// //             "--image-filter": grayscale ? "grayscale(1)" : "none",
// //           } as React.CSSProperties
// //         }
// //       >
// //         <main
// //           ref={mainRef}
// //           className="
// //             absolute inset-0 grid place-items-center overflow-hidden
// //             bg-transparent select-none
// //           "
// //           style={{ touchAction: "none", WebkitUserSelect: "none" }}
// //         >
// //           <div className="stage">
// //             <div ref={sphereRef} className="sphere">
// //               {items.map((it, i) => (
// //                 <div
// //                   key={`${it.x},${it.y},${i}`}
// //                   className="sphere-item absolute m-auto"
// //                   data-src={it.src}
// //                   data-alt={it.alt}
// //                   data-offset-x={it.x}
// //                   data-offset-y={it.y}
// //                   data-size-x={it.sizeX}
// //                   data-size-y={it.sizeY}
// //                   style={
// //                     {
// //                       "--offset-x": it.x,
// //                       "--offset-y": it.y,
// //                       "--item-size-x": it.sizeX,
// //                       "--item-size-y": it.sizeY,
// //                     } as React.CSSProperties
// //                   }
// //                 >
// //                   <div
// //                     className="
// //                       item__image absolute block cursor-pointer overflow-hidden
// //                       bg-white
// //                     "
// //                     role="button"
// //                     tabIndex={0}
// //                     aria-label={it.alt || "Open image"}
// //                     onClick={(e) => {
// //                       // Add check for `openingRef.current` to prevent issues if clicked during animation
// //                       if (
// //                         draggingRef.current ||
// //                         movedRef.current ||
// //                         performance.now() - lastDragEndAt.current < 80 ||
// //                         openingRef.current
// //                       )
// //                         return;
// //                       openItemFromElement(e.currentTarget as HTMLElement);
// //                     }}
// //                     onPointerUp={(e) => {
// //                       if (
// //                         (e.nativeEvent as PointerEvent).pointerType !== "touch"
// //                       )
// //                         return;
// //                       // Add check for `openingRef.current`
// //                       if (
// //                         draggingRef.current ||
// //                         movedRef.current ||
// //                         performance.now() - lastDragEndAt.current < 80 ||
// //                         openingRef.current
// //                       )
// //                         return;
// //                       openItemFromElement(e.currentTarget as HTMLElement);
// //                     }}
// //                   >
// //                     <Image
// //                       src={it.src}
// //                       draggable={false}
// //                       alt={it.alt}
// //                       fill
// //                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                       className="pointer-events-none object-cover"
// //                     />
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Gradients to fade edges */}
// //           <div
// //             className="pointer-events-none absolute inset-0 z-3 m-auto"
// //             style={{
// //               backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`,
// //             }}
// //           />

// //           <div
// //             className="
// //               pointer-events-none absolute top-0 right-0 left-0 z-5 h-25
// //               rotate-180
// //             "
// //             style={{
// //               background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
// //             }}
// //           />
// //           <div
// //             className="
// //               pointer-events-none absolute right-0 bottom-0 left-0 z-5 h-25
// //             "
// //             style={{
// //               background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
// //             }}
// //           />

// //           {/* Viewer Layer */}
// //           <div
// //             ref={viewerRef}
// //             className="
// //               pointer-events-none absolute inset-0 z-20 flex items-center
// //               justify-center
// //             "
// //             style={{ padding: "var(--viewer-pad)" }}
// //           >
// //             <div
// //               ref={scrimRef}
// //               className="
// //                 scrim pointer-events-none absolute inset-0 z-10 opacity-0
// //                 transition-opacity duration-500
// //               "
// //               style={{
// //                 background: "rgba(0, 0, 0, 0.75)",
// //                 backdropFilter: "blur(5px)",
// //               }}
// //             />
// //             <div
// //               ref={frameRef}
// //               className="flex aspect-square h-full"
// //               style={{
// //                 borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`,
// //               }}
// //             />
// //           </div>
// //         </main>
// //       </div>
// //     </>
// //   );
// // }

// // // --- Main Page Component ---

// // export default function Gallery() {
// //   const facultyImages = [
// //     {
// //       src: "/assets/GalleryImages/MainBuilding.jpeg",
// //       alt: "Main Campus Building",
// //     },
// //     {
// //       src: "/assets/GalleryImages/CBLab.jpeg",
// //       alt: "Computer Science Laboratory",
// //     },
// //     {
// //       src: "/assets/GalleryImages/DSLab.jpeg",
// //       alt: "Students Group Discussion",
// //     },
// //     {
// //       src: "/assets/GalleryImages/AlumniMeet.jpeg",
// //       alt: "Annual Tech Symposium",
// //     },
// //     {
// //       src: "/assets/GalleryImages/Convocation.jpeg",
// //       alt: "Research Center",
// //     },
// //     {
// //       src: "/assets/GalleryImages/DeptLib.jpeg",
// //       alt: "Graduation Day",
// //     },
// //     {
// //       src: "/assets/GalleryImages/NavniShrivastav.jpeg",
// //       alt: "Library Reading Hall",
// //     },
// //     {
// //       src: "/assets/GalleryImages/Office(1).jpeg",
// //       alt: "Robotics Workshop",
// //     },
// //     {
// //       src: "/assets/GalleryImages/Office(2).jpeg",
// //       alt: "Virtual Reality Lab",
// //     },
// //     {
// //       src: "/assets/GalleryImages/Persona2.jpeg",
// //       alt: "Seminar Hall",
// //     },
// //     {
// //       src: "/assets/GalleryImages/Raghav.jpeg",
// //       alt: "Student Code Hackathon",
// //     },
// //     {
// //       src: "/assets/GalleryImages/Samadhaan.jpeg",
// //       alt: "Faculty Meeting",
// //     },
// //     {
// //       src: "/assets/GalleryImages/SapnaChoudhary.jpeg",
// //       alt: "Campus Greenery",
// //     },
// //     {
// //       src: "/assets/GalleryImages/SoumyaSingh.jpeg",
// //       alt: "Digital Classroom",
// //     },
// //     {
// //       src: "/assets/GalleryImages/TCSDrive.jpeg",
// //       alt: "Digital Classroom",
// //     },
// //     {
// //       src: "/assets/GalleryImages/VichaarSangam.jpeg",
// //       alt: "Digital Classroom",
// //     },
// //     {
// //       src: "/assets/GalleryImages/SIH_2024.jpeg",
// //       alt: "Digital Classroom",
// //     },
// //     {
// //       src: "/assets/GalleryImages/Prof.jpeg",
// //       alt: "Digital Classroom",
// //     },
// //   ];

// //   return (
// //     <section id="gallery" className="
// //       section-container overflow-hidden bg-gray-50
// //     ">
// //       <div className="container mx-auto">
// //         {/* Section Header */}
// //         <div className="mb-12 fade-up text-center">
// //           <h2
// //             className="
// //               mb-4 text-3xl font-bold text-primary
// //               md:text-4xl
// //             "
// //           >
// //             Gallery
// //           </h2>
// //           <p className="mx-auto max-w-2xl text-gray-600">
// //             Explore life at SoIT through our collection of campus images in 3D.
// //             <br />
// //             <span className="mt-2 block text-sm text-gray-400">
// //               (Drag to rotate, click to expand)
// //             </span>
// //           </p>
// //           <div className="mx-auto mt-4 h-1 w-20 bg-accent"></div>
// //         </div>

// //         {/* 3D Dome Gallery Container */}
// //         <div
// //           className="
// //             relative h-150 w-full fade-up
// //             md:h-175
// //           "
// //         >
// //           <DomeGallery
// //             images={facultyImages}
// //             overlayBlurColor="#f9fafb" // Matching bg-gray-50
// //             fit={0.65} // Slightly larger fit
// //             grayscale={false} // Full color images
// //             imageBorderRadius="8px"
// //             openedImageWidth="800px"
// //             autoRotateSpeed={0.08} // Slightly faster rotation
// //             autoRotateDelay={1500} // A bit longer delay before resuming
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

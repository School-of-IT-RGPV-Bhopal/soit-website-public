"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Code2,
  FlaskConical,
  Sparkles,
  Trophy,
} from "lucide-react";

type Achievement = {
  title: string;
  student: string;
  year: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  accent: {
    chipBg: string;
    chipText: string;
    ring: string;
    glow: string;
    borderHover: string;
  };
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ANIM_MS = 520;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/**
 * With `noUncheckedIndexedAccess`, arr[i] is always possibly undefined.
 * This helper makes indexing type-safe and removes "possibly undefined" errors.
 */
function mustGet<T>(arr: readonly T[], i: number, label = "item"): T {
  const v = arr[i];
  if (v === undefined) {
    throw new Error(`Expected ${label} at index ${i}, but it was undefined.`);
  }
  return v;
}

export default function FeaturedAchievements() {
  const achievements: readonly Achievement[] = [
    {
      title: "Samadhaan and AceHack winners",
      student: "Sophmore Students",
      year: "2025",
      description:
        "Built an AI-enabled solution for rural healthcare workflows and secured the Grand Finale win at national level.",
      category: "Hackathon",
      icon: <Trophy className="size-6" />,
      accent: {
        chipBg: "bg-amber-50",
        chipText: "text-amber-800",
        ring: "ring-amber-200/70",
        glow: "bg-amber-200/30",
        borderHover: "hover:border-amber-300/70",
      },
    },
    {
      title: "ACM ICPC Regionals Qualifier",
      student: "Students of SOIT",
      year: "2025",
      description:
        "Our students advanced to ACM ICPC Asia Regional Finals, demonstrating strong algorithmic thinking and teamwork.",
      category: "Competitive Programming",
      icon: <Code2 className="size-6" />,
      accent: {
        chipBg: "bg-sky-50",
        chipText: "text-sky-800",
        ring: "ring-sky-200/70",
        glow: "bg-sky-200/30",
        borderHover: "hover:border-sky-300/70",
      },
    },
    {
      title: "National Snooker and Heyball Championship",
      student: "Soumya Singh",
      year: "2025",
      description:
        "Represented India in International Heyball Open Championship 2025 ",
      category: "Sports",
      icon: <FlaskConical className="size-6" />,
      accent: {
        chipBg: "bg-emerald-50",
        chipText: "text-emerald-800",
        ring: "ring-emerald-200/70",
        glow: "bg-emerald-200/30",
        borderHover: "hover:border-emerald-300/70",
      },
    },
    // {
    //   title: "Google Summer of Code Selection",
    //   student: "Rahul Verma, Ankit Singh",
    //   year: "2024",
    //   description:
    //     "Selected for GSoC and contributed to production-grade open-source projects across ML and web engineering.",
    //   category: "Open Source",
    //   icon: <Globe className="size-6" />,
    //   accent: {
    //     chipBg: "bg-violet-50",
    //     chipText: "text-violet-800",
    //     ring: "ring-violet-200/70",
    //     glow: "bg-violet-200/30",
    //     borderHover: "hover:border-violet-300/70",
    //   },
    // },
  ];

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  }, []);

  // If you ever make achievements dynamic, keep this guard.
  if (achievements.length === 0) return null;

  const len = achievements.length;

  const [index, setIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<number | null>(null);

  const safeIndex = mod(index, len);
  const safePendingIndex =
    pendingIndex === null ? null : mod(pendingIndex, len);

  const current = mustGet(achievements, safeIndex, "achievement");
  const incoming =
    safePendingIndex === null
      ? null
      : mustGet(achievements, safePendingIndex, "achievement");

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function goTo(nextIndexRaw: number) {
    const nextIndex = mod(nextIndexRaw, len);
    if (nextIndex === safeIndex) return;

    if (prefersReducedMotion) {
      setIndex(nextIndex);
      setPendingIndex(null);
      setIsAnimating(false);
      return;
    }

    if (isAnimating) return;

    setDirection(nextIndex > safeIndex ? "next" : "prev");
    setPendingIndex(nextIndex);
    setIsAnimating(true);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIndex(nextIndex);
      setPendingIndex(null);
      setIsAnimating(false);
    }, ANIM_MS);
  }

  function next() {
    goTo(safeIndex + 1);
  }

  function prev() {
    goTo(safeIndex - 1);
  }

  return (
    <section
      className="
      relative overflow-hidden bg-slate-50 py-14
      sm:py-16
    "
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
          absolute -top-24 left-8 size-72 rounded-full bg-white/70 blur-3xl
        "
        />
        <div
          className="
          absolute right-8 -bottom-28 size-80 rounded-full bg-white/60 blur-3xl
        "
        />
      </div>

      <div
        className="
        relative mx-auto max-w-7xl
        lg:px-8
      "
      >
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <h2
            className="
            text-3xl font-semibold tracking-tight text-slate-900
            sm:text-4xl
          "
          >
            Featured Achievements
          </h2>
          <p
            className="
            mt-3 text-base text-slate-600
            sm:text-lg
          "
          >
            A curated spotlight on standout accomplishments across innovation,
            research, and competitions.
          </p>
        </header>

        <div
          className="
          relative overflow-hidden rounded-3xl border border-slate-200/70
          bg-white/55 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.55)]
          backdrop-blur-xl
          supports-backdrop-filter:bg-white/45
        "
        >
          <div
            className="
            pointer-events-none absolute inset-0 opacity-60
            motion-reduce:hidden
          "
          >
            <div
              className="
              absolute top-0 -left-1/2 h-full w-1/2 rotate-12
              animate-[sheen_7s_ease-in-out_infinite] bg-white/25 blur-2xl
            "
            />
          </div>

          <div
            className="
            grid grid-cols-1 gap-8 p-6
            sm:p-8
            md:grid-cols-12 md:gap-10 md:p-10
          "
          >
            {/* Left rail */}
            <aside
              className="
              order-2
              md:order-1 md:col-span-3
            "
            >
              <div
                className="
                flex items-center justify-between
                md:flex-col md:items-start md:gap-4
              "
              >
                <span
                  className="
                  text-xs font-semibold tracking-wider text-slate-600
                "
                >
                  <span className="font-mono">
                    {String(safeIndex + 1).padStart(2, "0")}
                  </span>{" "}
                  <span className="text-slate-400">/</span>{" "}
                  <span className="font-mono">
                    {String(len).padStart(2, "0")}
                  </span>
                </span>

                <div
                  className="
                  hidden items-center gap-2 text-xs font-semibold
                  tracking-[0.22em] text-slate-500 uppercase
                  md:flex
                "
                >
                  <Sparkles className="size-4" />
                  Spotlight
                </div>
              </div>

              <div
                className="
                mt-5 flex gap-2 overflow-x-auto pb-1
                md:mt-8 md:flex-col md:overflow-visible
              "
              >
                {achievements.map((a, i) => {
                  const active = i === safeIndex;
                  return (
                    <button
                      key={a.title}
                      onClick={() => goTo(i)}
                      disabled={isAnimating}
                      className={cx(
                        `
                          group relative w-[16rem] shrink-0 rounded-2xl
                          text-left
                          md:w-full
                        `,
                        "border bg-white/55 backdrop-blur-sm",
                        `
                          transition duration-300
                          motion-reduce:transition-none
                        `,
                        active
                          ? `
                            border-slate-300/80
                            shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]
                          `
                          : `
                            border-slate-200/70
                            hover:border-slate-300/80
                          `,
                        isAnimating && "opacity-80",
                      )}
                      aria-label={`Show achievement: ${a.title}`}
                    >
                      <div className="p-3">
                        <div className="flex items-start gap-3">
                          <span
                            className="
                            inline-flex size-10 items-center justify-center
                            rounded-xl bg-slate-900 text-white shadow-sm ring-1
                            ring-slate-900/10
                          "
                          >
                            {a.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cx(
                                  `
                                    inline-flex items-center rounded-full px-2.5
                                    py-1 text-[11px] font-semibold
                                  `,
                                  a.accent.chipBg,
                                  a.accent.chipText,
                                  "ring-1 ring-slate-900/5",
                                )}
                              >
                                {a.category}
                              </span>
                              <span
                                className="
                                text-[11px] font-medium text-slate-500
                              "
                              >
                                {a.year}
                              </span>
                            </div>
                            <p
                              className="
                              mt-1 line-clamp-2 text-sm font-semibold
                              text-slate-900
                            "
                            >
                              {a.title}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={cx(
                          "absolute inset-y-0 left-0 w-1 rounded-l-2xl",
                          active ? "bg-slate-900" : "bg-transparent",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Center preview */}
            <div
              className="
              order-1
              md:order-2 md:col-span-4
            "
            >
              <div
                className="
                relative h-88 overflow-hidden rounded-2xl border
                border-slate-200/70 bg-white/55 backdrop-blur-sm
                md:h-128
              "
              >
                <div
                  className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(to_bottom,rgba(15,23,42,1)_1px,transparent_1px)]
                  bg-size-[8px_8px] opacity-[0.035]
                "
                />
                <div
                  className={cx(
                    `
                      pointer-events-none absolute -top-10 left-1/2 size-44
                      -translate-x-1/2 rounded-full blur-3xl
                    `,
                    current.accent.glow,
                  )}
                />

                <div className="absolute inset-0 p-5">
                  <div
                    className={cx(
                      `
                        absolute inset-5 overflow-hidden rounded-xl border
                        border-slate-200/70 bg-white
                      `,
                      "shadow-[0_18px_50px_-35px_rgba(15,23,42,0.55)]",
                      !incoming && "translate-y-0 opacity-100",
                      incoming &&
                        (direction === "next"
                          ? "animate-[panelOutUp_520ms_ease-in-out_forwards]"
                          : "animate-[panelOutDown_520ms_ease-in-out_forwards]"),
                    )}
                  >
                    <PosterCard a={current} />
                  </div>

                  {incoming && (
                    <div
                      className={cx(
                        `
                          absolute inset-5 overflow-hidden rounded-xl border
                          border-slate-200/70 bg-white
                        `,
                        "shadow-[0_18px_50px_-35px_rgba(15,23,42,0.55)]",
                        direction === "next"
                          ? "animate-[panelInUp_520ms_ease-in-out_forwards]"
                          : "animate-[panelInDown_520ms_ease-in-out_forwards]",
                      )}
                    >
                      <PosterCard a={incoming} />
                    </div>
                  )}
                </div>
              </div>

              <div
                className="
                mt-4 flex items-center justify-between gap-3
                md:mt-5
              "
              >
                <button
                  type="button"
                  onClick={prev}
                  disabled={isAnimating}
                  className={cx(
                    "inline-flex items-center justify-center rounded-full",
                    `
                      border border-slate-200/80 bg-white/60 p-3 text-slate-900
                      backdrop-blur-sm
                    `,
                    `
                      transition
                      hover:border-slate-300/80 hover:bg-white/80
                    `,
                    `
                      focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
                      focus:outline-none
                    `,
                    isAnimating && "opacity-70",
                  )}
                  aria-label="Previous achievement"
                >
                  <ArrowLeft className="size-5" />
                </button>

                <div
                  className="flex items-center gap-1.5"
                  aria-label="Slider position"
                >
                  {achievements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      disabled={isAnimating}
                      className={cx(
                        "h-1.5 rounded-full transition-all",
                        i === safeIndex
                          ? "w-7 bg-slate-900"
                          : `
                          w-2 bg-slate-300/70
                          hover:bg-slate-400/70
                        `,
                      )}
                      aria-label={`Go to achievement ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  disabled={isAnimating}
                  className={cx(
                    "inline-flex items-center justify-center rounded-full",
                    `
                      border border-slate-200/80 bg-white/60 p-3 text-slate-900
                      backdrop-blur-sm
                    `,
                    `
                      transition
                      hover:border-slate-300/80 hover:bg-white/80
                    `,
                    `
                      focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
                      focus:outline-none
                    `,
                    isAnimating && "opacity-70",
                  )}
                  aria-label="Next achievement"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>

            {/* Right text */}
            <div
              className="
              order-3
              md:col-span-5 md:pl-2
            "
            >
              <div
                className="
                relative min-h-56 overflow-hidden rounded-2xl border
                border-slate-200/70 bg-white/55 p-6 backdrop-blur-sm
                sm:p-7
                md:min-h-128
              "
              >
                <div
                  className={cx(
                    `
                      absolute inset-0 p-6
                      sm:p-7
                    `,
                    !incoming && "translate-x-0 opacity-100",
                    incoming &&
                      (direction === "next"
                        ? "animate-[textOutLeft_520ms_ease-in-out_forwards]"
                        : "animate-[textOutRight_520ms_ease-in-out_forwards]"),
                  )}
                >
                  <AchievementText a={current} />
                </div>

                {incoming && (
                  <div
                    className={cx(
                      `
                        absolute inset-0 p-6
                        sm:p-7
                      `,
                      direction === "next"
                        ? "animate-[textInRight_520ms_ease-in-out_forwards]"
                        : "animate-[textInLeft_520ms_ease-in-out_forwards]",
                    )}
                  >
                    <AchievementText a={incoming} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function PosterCard({ a }: { a: Achievement }) {
  return (
    <div className="relative h-full">
      <div
        className="
        flex items-center justify-between border-b border-slate-200/70
        bg-slate-50 px-5 py-4
      "
      >
        <span
          className={cx(
            `
              inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
              font-semibold
            `,
            a.accent.chipBg,
            a.accent.chipText,
            "ring-1 ring-slate-900/5",
          )}
        >
          <Award className="size-4" />
          {a.category}
        </span>
        <span className="text-xs font-medium text-slate-500">{a.year}</span>
      </div>

      <div
        className="
        relative flex h-[calc(100%-56px)] flex-col items-center justify-center
        px-6 text-center
      "
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
            absolute top-6 left-6 size-10 border-t border-l border-slate-200
          "
          />
          <div
            className="
            absolute top-6 right-6 size-10 border-t border-r border-slate-200
          "
          />
          <div
            className="
            absolute bottom-6 left-6 size-10 border-b border-l border-slate-200
          "
          />
          <div
            className="
            absolute right-6 bottom-6 size-10 border-r border-b border-slate-200
          "
          />
        </div>

        <div
          className={cx(
            `
              mb-5 inline-flex size-16 items-center justify-center rounded-2xl
              bg-slate-900 text-white shadow-sm ring-2
            `,
            a.accent.ring,
          )}
        >
          {a.icon}
        </div>

        <h3 className="line-clamp-2 text-xl/snug font-semibold text-slate-900">
          {a.title}
        </h3>

        <p className="mt-2 text-sm font-medium text-slate-600">{a.student}</p>

        <div className="mt-6 h-px w-24 bg-slate-200" />

        <p className="mt-4 line-clamp-3 text-sm/relaxed text-slate-600">
          {a.description}
        </p>
      </div>
    </div>
  );
}

function AchievementText({ a }: { a: Achievement }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cx(
            `
              inline-flex items-center rounded-full px-3 py-1 text-xs
              font-semibold
            `,
            a.accent.chipBg,
            a.accent.chipText,
            "ring-1 ring-slate-900/5",
          )}
        >
          {a.category}
        </span>
        <span className="text-xs font-medium text-slate-500">{a.year}</span>
      </div>

      <h3
        className="
        mt-4 text-2xl font-semibold tracking-tight text-slate-900
        sm:text-3xl
      "
      >
        {a.title}
      </h3>

      <p className="mt-2 text-sm font-semibold text-slate-700">{a.student}</p>

      <p className="mt-5 text-base/relaxed text-slate-600">{a.description}</p>

      <div className="mt-auto pt-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span
            className="
            inline-flex size-7 items-center justify-center rounded-full border
            border-slate-200/70 bg-white
          "
          >
            <Sparkles className="size-4 text-slate-700" />
          </span>
          <span>Curated highlight from the academic year</span>
        </div>
      </div>
    </div>
  );
}

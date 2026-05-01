import React from "react";
import {
  Cloud,
  Globe,
  Server,
  Network,
  Terminal,
  Database,
  BookOpen,
  Users,
  GraduationCap,
} from "lucide-react";

type Certification = {
  provider: string;
  // count: number;
  icon: React.ReactNode;
  certifications: string[];
  gradient: string; // tailwind gradient classes
  accent: string; // tailwind text/ring accent
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CertificationCard({
  cert,
  className,
}: {
  cert: Certification;
  className?: string;
}) {
  return (
    <article
      className={cx(
        // base
        `
          group relative w-full max-w-104 overflow-hidden rounded-2xl border
          border-slate-200/70
        `,
        `
          bg-white/80 backdrop-blur-sm
          supports-backdrop-filter:bg-white/60
        `,
        "shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]",
        `
          transition duration-500
          motion-reduce:transition-none
        `,
        // subtle glow + hover polish
        `
          hover:-translate-y-1 hover:border-slate-300/80 hover:bg-white/90
          hover:shadow-[0_18px_50px_-25px_rgba(15,23,42,0.55)]
        `,
        className
      )}
    >
      {/* top accent */}
      <div className="relative p-6">
        <div
          className={cx(
            "pointer-events-none absolute inset-x-0 top-0 h-24 opacity-90",
            "bg-linear-to-br",
            cert.gradient
          )}
        />
        <div className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_70%)]
        " />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={cx(
                "inline-flex size-11 items-center justify-center rounded-xl",
                "bg-white/85 shadow-sm ring-1 ring-white/60",
                "transition duration-500",
                "group-hover:bg-white"
              )}
              aria-hidden="true"
            >
              <span className={cx("text-slate-800", cert.accent)}>
                {cert.icon}
              </span>
            </span>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900">
                {cert.provider}
              </h3>
              <p className="text-sm text-slate-600">
                Industry certification pathways
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="
              inline-flex items-baseline gap-1 rounded-full bg-slate-900/85 px-3
              py-1 text-white ring-1 ring-white/20
            ">
              {/* <span className="text-lg leading-none font-semibold">
                {cert.count}
              </span> */}
              {/* <span className="text-xs opacity-80">+</span> */}
            </div>
            <p className="mt-1 text-xs text-slate-600">Certified students</p>
          </div>
        </div>

        <div className="
          relative mt-5 rounded-xl border border-slate-200/70 bg-white/70 p-4
        ">
          <p className="
            text-xs font-medium tracking-wide text-slate-600 uppercase
          ">
            Popular certifications
          </p>
          <ul className="mt-3 space-y-2">
            {cert.certifications.map((name, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-slate-700">
                <span className={cx("mt-1.75 size-1.5 rounded-full", cert.accent)} />
                <span className="leading-relaxed">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* subtle edge fade */}
      <div className="
        pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l
        from-white/70 to-transparent
      " />
    </article>
  );
}

function CascadeStack({ items }: { items: Certification[] }) {
  // tuned for 3 cards; gracefully handles fewer
  const offsets = [
    "md:[grid-area:stack] md:z-10 md:opacity-70 md:saturate-50 md:translate-y-0 md:hover:opacity-100 md:hover:saturate-100 md:hover:z-40 md:hover:-translate-y-6",
    "md:[grid-area:stack] md:z-20 md:translate-x-14 md:translate-y-10 md:opacity-80 md:saturate-75 md:hover:opacity-100 md:hover:saturate-100 md:hover:z-40 md:hover:-translate-y-2",
    "md:[grid-area:stack] md:z-30 md:translate-x-28 md:translate-y-20 md:hover:z-40 md:hover:translate-y-12",
  ];

  return (
    <div
      className={cx(
        // mobile: normal flow
        "grid grid-cols-1 gap-6",
        // md+: overlap into a cascade
        "md:place-items-center md:gap-0 md:[grid-template-areas:'stack']"
      )}
    >
      {items.map((cert, i) => (
        <CertificationCard
          key={cert.provider}
          cert={cert}
          className={cx(
            "md:-skew-y-[8deg]",
            `
              md:transition-transform md:duration-700
              motion-reduce:md:transition-none
            `,
            offsets[i] ?? "md:[grid-area:stack]"
          )}
        />
      ))}
    </div>
  );
}

export default function CertificationsShowcase() {
  const certifications: Certification[] = [
    {
      provider: "Amazon Web Services",
      // count: 30,
      icon: <Cloud className="size-5" />,
      certifications: [
        "AWS Certified Solutions Architect",
        "AWS Certified Developer",
        "AWS Certified Cloud Practitioner",
      ],
      gradient: "from-amber-500 to-orange-600",
      accent: "text-amber-600 ring-amber-200/70 bg-amber-600",
    },
    {
      provider: "Google Cloud",
      // count: 25,
      icon: <Globe className="size-5" />,
      certifications: [
        "Google Cloud Certified Professional",
        "Associate Cloud Engineer",
        "Cloud Digital Leader",
      ],
      gradient: "from-sky-500 to-cyan-500",
      accent: "text-sky-600 ring-sky-200/70 bg-sky-600",
    },
    {
      provider: "Microsoft Azure",
      // count: 20,
      icon: <Server className="size-5" />,
      certifications: ["Azure Fundamentals", "Azure Administrator", "Azure AI Engineer"],
      gradient: "from-indigo-500 to-blue-600",
      accent: "text-indigo-600 ring-indigo-200/70 bg-indigo-600",
    },
    {
      provider: "CompTIA & Cisco",
      // count: 15,
      icon: <Network className="size-5" />,
      certifications: ["CompTIA Security+", "Cisco CCNA", "CompTIA Network+"],
      gradient: "from-rose-500 to-red-600",
      accent: "text-rose-600 ring-rose-200/70 bg-rose-600",
    },
    {
      provider: "Red Hat & Linux",
      // count: 12,
      icon: <Terminal className="size-5" />,
      certifications: ["Red Hat Certified System Administrator", "Linux Professional Institute"],
      gradient: "from-slate-700 to-slate-900",
      accent: "text-slate-700 ring-slate-200/70 bg-slate-700",
    },
    {
      provider: "Oracle & Databases",
      // count: 10,
      icon: <Database className="size-5" />,
      certifications: ["Oracle Certified Associate", "MongoDB Certified Developer"],
      gradient: "from-orange-600 to-amber-600",
      accent: "text-orange-700 ring-orange-200/70 bg-orange-700",
    },
  ];

  const leftStack = certifications.slice(0, 3);
  const rightStack = certifications.slice(3, 6);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16">
      {/* background */}
      <div className="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(900px_500px_at_20%_10%,rgba(59,130,246,0.10),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(245,158,11,0.10),transparent_55%)]
      " />

      <div className="
        relative mx-auto max-w-7xl px-4
        sm:px-6
        lg:px-8
      ">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="
            text-3xl font-semibold tracking-tight text-slate-900
            sm:text-4xl
          ">
            Industry Certifications
          </h2>
          <p className="
            mt-3 text-base text-slate-600
            sm:text-lg
          ">
            Students equipped with globally recognized, job-aligned credentials across major
            platforms.
          </p>
        </header>

        {/* Cascade layout */}
        <div className="
          grid grid-cols-1 gap-12
          lg:grid-cols-2 lg:gap-10
        ">
          <CascadeStack items={leftStack} />
          <CascadeStack items={rightStack} />
        </div>

        {/* Preparation Support */}
        <div className="
          mt-16 overflow-hidden rounded-2xl border border-slate-200/70
          bg-white/70 backdrop-blur-sm
        ">
          <div className="
            px-6 py-10
            sm:px-10
          ">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-2xl font-semibold text-slate-900">
                Preparation Support
              </h3>
              <p className="mt-3 text-slate-600">
                Structured resources and guidance designed to help students prepare effectively
                and certify with confidence.
              </p>
            </div>

            <div className="
              mt-10 grid grid-cols-1 gap-6
              md:grid-cols-3
            ">
              <div className="
                rounded-xl border border-slate-200/70 bg-white/70 p-6
              ">
                <div className="flex items-center gap-3">
                  <span className="
                    inline-flex size-10 items-center justify-center rounded-xl
                    bg-slate-900 text-white
                  ">
                    <BookOpen className="size-5" />
                  </span>
                  <h4 className="font-semibold text-slate-900">Study Materials</h4>
                </div>
                <p className="mt-3 text-sm/relaxed text-slate-600">
                  Curated guides, labs, and practice assessments aligned with certification
                  objectives.
                </p>
              </div>

              <div className="
                rounded-xl border border-slate-200/70 bg-white/70 p-6
              ">
                <div className="flex items-center gap-3">
                  <span className="
                    inline-flex size-10 items-center justify-center rounded-xl
                    bg-slate-900 text-white
                  ">
                    <Users className="size-5" />
                  </span>
                  <h4 className="font-semibold text-slate-900">Faculty Mentorship</h4>
                </div>
                <p className="mt-3 text-sm/relaxed text-slate-600">
                  Regular guidance and checkpoints from experienced mentors to keep progress on track.
                </p>
              </div>

              <div className="
                rounded-xl border border-slate-200/70 bg-white/70 p-6
              ">
                <div className="flex items-center gap-3">
                  <span className="
                    inline-flex size-10 items-center justify-center rounded-xl
                    bg-slate-900 text-white
                  ">
                    <GraduationCap className="size-5" />
                  </span>
                  <h4 className="font-semibold text-slate-900">Study Groups</h4>
                </div>
                <p className="mt-3 text-sm/relaxed text-slate-600">
                  Collaborative sessions to reinforce concepts, solve questions, and share exam strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

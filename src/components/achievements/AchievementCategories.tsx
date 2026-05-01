import { CheckCircle2 } from "lucide-react";
import { categories, Category } from "@/data/student_achievements/categories";
import { cn } from "@/utils/utils";

function CategoryCard({ category }: { category: Category }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200/70",
        `
          bg-white/80 backdrop-blur-sm
          supports-backdrop-filter:bg-white/60
        `,
        "shadow-[0_10px_26px_-18px_rgba(15,23,42,0.35)]",
        `
          transition duration-300
          motion-reduce:transition-none
        `,
        `
          hover:-translate-y-0.5 hover:border-slate-300/80 hover:bg-white/90
          hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.50)]
        `,
      )}
    >
      {/* top accent bar */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1.5 bg-linear-to-r",
          category.gradient,
        )}
      />

      {/* subtle background glow */}
      <div
        className="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(900px_240px_at_20%_0%,rgba(15,23,42,0.06),transparent_60%)]
      "
      />

      <div className="relative p-5">
        <header className="flex items-start gap-3">
          <div
            className={cn(
              `
                inline-flex size-10 shrink-0 items-center justify-center
                rounded-xl ring-1 ring-slate-200/70
              `,
              category.tint,
            )}
            aria-hidden="true"
          >
            <category.icon className="size-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-base/snug font-semibold text-slate-900">
              {category.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="size-3.5" />
              <span>Highlights</span>
            </div>
          </div>
        </header>

        <ul className="mt-4 space-y-2.5">
          {category.achievements.map((achievement, idx) => (
            <li key={idx} className="flex gap-2.5 text-sm text-slate-700">
              <span
                className={cn(
                  "mt-1.75 size-1.5 shrink-0 rounded-full",
                  category.dot,
                )}
                aria-hidden="true"
              />
              <span className="leading-snug">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function AchievementCategories() {
  return (
    <section
      className="
      relative overflow-hidden py-14
      sm:py-16
    "
    >
      {/* Background */}
      <div
        className="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(900px_500px_at_20%_10%,rgba(59,130,246,0.10),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(236,72,153,0.08),transparent_60%)]
      "
      />

      <div
        className="
        relative mx-auto max-w-7xl px-4
        sm:px-6
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
            Achievement Categories
          </h2>
          <p
            className="
            mt-3 text-base text-slate-600
            sm:text-lg
          "
          >
            Excellence across academics, innovation, research, and student
            development.
          </p>
        </header>

        <div
          className="
          grid grid-cols-1 gap-5
          sm:gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
        >
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

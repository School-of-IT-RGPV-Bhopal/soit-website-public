import Link from "next/link";

type WorkInProgressProps = {
  title?: string;
  description?: string;
  expectedLaunch?: string;
  homeHref?: string;
  contactEmail?: string;
};

export default function WorkInProgress({
  title = "Work in Progress",
  description =
    "This section is being finalized. We are refining the content, visuals, and data to ensure it is accurate and helpful.",
  expectedLaunch = "We will share a launch date soon.",
  homeHref = "/",
  contactEmail,
}: WorkInProgressProps) {
  return (
    <main className="mt-10 page-wrapper">
      <section className="section-container">
        <div className="
          relative overflow-hidden rounded-2xl border border-gray/60 bg-white
          shadow-lg
        ">
          <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top,rgba(10,0,128,0.08),transparent_55%)]
          " />
          <div className="
            relative px-6 py-12
            md:px-12 md:py-16
          ">
            <p className="
              inline-flex items-center gap-2 rounded-full border
              border-primary/15 bg-primary/5 px-4 py-1 text-sm font-medium
              text-primary
            ">
              Updating
              <span className="
                inline-block size-2 animate-pulse rounded-full bg-accent
              " />
            </p>
            <h1 className="
              mt-4 text-3xl font-semibold text-foreground
              md:text-4xl
            ">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-foreground/80">
              {description}
            </p>
            <div className="
              mt-6 rounded-xl border border-gray/60 bg-gray-light/60 p-4 text-sm
              text-foreground/70
            ">
              {expectedLaunch}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={homeHref} className="btn-primary">
                Back to Home
              </Link>
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="btn-outline"
                >
                  Contact Us
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

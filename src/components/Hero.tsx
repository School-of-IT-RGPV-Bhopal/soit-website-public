import Image from "next/image";
import Link from "next/link";
import HashLink from "@components/HashLink";
import { getAcademicYear } from "@utils/academic_year";

export default function Hero() {
  const displayYear = getAcademicYear();

  return (
    <section
      className="flex items-center justify-center overflow-hidden pt-10"
      data-tour="home-hero-section"
    >
      <div
        className="
          px-5 pb-10
          md:mr-2
        "
      >
        <div
          className="
            grid grid-cols-1 items-center gap-8
            lg:grid-cols-12
          "
        >
          {/* Left Column - Text Content */}
          <div
            className="
              fade-up text-primary
              lg:col-span-7
            "
          >
            <span
              className="
                mt-5 mb-3 inline-block rounded-full text-lg font-semibold
                text-foreground
                md:mt-0
              "
            >
              🎓 Ranked Among Top IT Institutions
            </span>

            <h1
              data-tour="home-hero-headline"
              className="
                mb-6 max-w-xs font-poppins text-4xl/tight leading-tight
                font-bold
                md:max-w-none md:text-5xl
                lg:text-6xl
              "
            >
              School of Information Technology
              <span className="mt-2 block text-3xl font-medium">
                Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal
              </span>
            </h1>

            <p
              className="
                mb-8 max-w-2xl text-lg text-foreground
                md:text-xl
              "
              style={{ transitionDelay: "0.1s" }}
            >
              Empowering the next generation of tech innovators with
              cutting-edge education, world-class research opportunities, and
              strong industry connections.
            </p>

            {/* Key Highlights */}
            <div
              className="
                grid grid-cols-2 gap-4 text-foreground
                md:grid-cols-3
              "
              style={{ transitionDelay: "0.2s" }}
            >
              <div
                className="
                  mb-4 flex items-center space-x-2
                  md:mb-8
                "
              >
                <svg
                  className="
                    size-5
                    md:size-6
                  "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span
                  className="
                    text-xs font-bold
                    md:text-sm
                  "
                >
                  AICTE Approved
                </span>
              </div>
              <div
                className="
                  mb-4 flex items-center space-x-2
                  md:mb-8
                "
              >
                <svg
                  className="
                    size-5
                    md:size-6
                  "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span
                  className="
                    text-xs font-bold
                    md:text-sm
                  "
                >
                  NAAC A++
                </span>
              </div>
            </div>

            <div
              className="flex flex-wrap gap-4"
              style={{ transitionDelay: "0.3s" }}
            >
              <Link
                href="https://dte.mponline.gov.in/portal/services/onlinecounselling/counshomepage/home.aspx"
                target="_blank"
                data-tour="home-apply-cta"
                className="
                  btn-primary transform bg-accent text-white shadow-lg
                  transition-all
                  hover:scale-105
                "
                
              >
                {/* Put auto year with increment */}
                Apply Now for {displayYear}
              </Link>
              <Link
                href="/academics"
                className="
                  btn-outline border-2 transition-all
                  hover:text-secondary
                "
              >
                Explore Programs
              </Link>
               <Link
                href="/virtual-tour"
                className="
                  btn-outline border-2 transition-all
                  hover:text-secondary
                "
                // className="
                //   flex items-center space-x-2 transition-colors
                //   hover:text-secondary
                // "
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Virtual Campus Tour</span>
              </Link> 
            </div>

            <div
              className="
                mt-4 inline-flex items-center rounded-lg border border-white/20
                bg-white/10 text-sm text-foreground backdrop-blur-sm
                md:mt-8
              "
              style={{ transitionDelay: "0.4s" }}
            >
              <svg
                className="mr-2 size-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <span className="font-semibold">Admissions Open:</span>{" "}
                Applications for {displayYear} academic year
              </span>
            </div>
          </div>

          {/* Right Column - Enhanced Stats Card */}
          <div
            className="
              fade-up
              lg:col-span-5
            "
            style={{ transitionDelay: "0.2s" }}
          >
            <div
              className="
                transform overflow-hidden rounded-2xl bg-white shadow-2xl
                transition-transform duration-300
                hover:scale-105
              "
            >
              {/* Campus Photo */}
              <div className="relative aspect-[2.77/1] w-full">
                <Image
                  src="/images/new_slide1.jpg"
                  alt="RGPV Campus"
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="object-cover"
                />
              </div>

              {/* Stats Grid */}
              <div className="p-6">
                <h2 className="mb-4 text-center text-xl font-bold text-primary">
                  Why Choose SoIT?
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="
                      col-span-2 rounded-xl bg-linear-to-br from-primary/5
                      to-primary/10 p-4 text-center transition-shadow
                      hover:shadow-md
                    "
                  >
                    <div className="mb-1 text-3xl font-bold text-primary">
                      23+
                    </div>
                    <div className="text-xs text-gray-600">
                      Years of Excellence
                    </div>
                  </div>
                  <HashLink
                    href="/"
                    hash="distinguished-faculty"
                    className="
                      cursor-pointer rounded-xl bg-linear-to-br from-accent/5
                      to-accent/10 p-4 text-center transition-shadow
                      hover:shadow-md
                    "
                  >
                    <div className="mb-1 text-3xl font-bold text-primary">
                      20+
                    </div>
                    <div className="text-xs text-gray-600">Expert Faculty</div>
                  </HashLink>

                  <Link
                    href="/student-achievements"
                    className="
                      cursor-pointer rounded-xl bg-linear-to-br from-primary/5
                      to-primary/10 p-4 text-center transition-shadow
                      hover:shadow-md
                    "
                  >
                    <div
                      className="
                        mb-1 text-2xl font-bold text-primary
                        md:text-3xl
                      "
                    >
                      1000+
                    </div>
                    <div className="text-xs text-gray-600">Active Students</div>
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div
                    className="
                      grid grid-cols-2 gap-4
                      md:grid-cols-4
                    "
                  >
                    <Link
                      href="/academics"
                      className="
                        flex flex-col items-center justify-center space-y-2
                        rounded-lg p-3 text-primary transition-all
                        hover:bg-primary/5 hover:text-accent
                      "
                    >
                      <svg
                        className="size-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                      </svg>
                      <span className="text-center text-xs font-semibold">
                        Programs
                      </span>
                    </Link>
                    <Link
                      href="/placements"
                      className="
                        flex flex-col items-center justify-center space-y-2
                        rounded-lg p-3 text-primary transition-all
                        hover:bg-primary/5 hover:text-accent
                      "
                    >
                      <svg
                        className="size-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-center text-xs font-semibold">
                        Placements
                      </span>
                    </Link>
                    <Link
                      href="#research"
                      className="
                        flex flex-col items-center justify-center space-y-2
                        rounded-lg p-3 text-primary transition-all
                        hover:bg-primary/5 hover:text-accent
                      "
                    >
                      <svg
                        className="size-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-center text-xs font-semibold">
                        Research
                      </span>
                    </Link>
                    <Link
                      href="/contact"
                      className="
                        flex flex-col items-center justify-center space-y-2
                        rounded-lg p-3 text-primary transition-all
                        hover:bg-primary/5 hover:text-accent
                      "
                    >
                      <svg
                        className="size-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-center text-xs font-semibold">
                        Contact
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useCallback } from "react";

export default function Admissions() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Check Eligibility",
      description:
        "Review program requirements and ensure you meet the eligibility criteria for your desired course.",
    },
    {
      id: 2,
      title: "DTE Registration",
      description:
        "Register on the DTE MP Online portal and fill the application form with required documents.",
    },
    {
      id: 3,
      title: "JEE Main",
      description:
        "Appear for JEE Main entrance examination as per the schedule.",
    },
    {
      id: 4,
      title: "DTE Counselling",
      description:
        "Participate in DTE MP counselling process for seat allocation based on your rank.",
    },
    {
      id: 5,
      title: "Admission Confirmation",
      description:
        "Complete document verification and fee payment to confirm your admission.",
    },
  ];

  const handleStepClick = useCallback((stepId: number) => {
    setActiveStep(stepId);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => Math.min(steps.length, prev + 1));
  }, [steps.length]);

  return (
    <section id="admissions" className="section-container bg-white">
      <div className="container mx-auto">
        <div className="mb-12 fade-up text-center">
          <h2
            className="
              mb-4 text-3xl font-bold text-primary
              md:text-4xl
            "
          >
            Admissions Process
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Follow these steps to join our prestigious programs at the School of
            Information Technology
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-accent"></div>
        </div>

        {/* Stepper */}
        <div className="mx-auto mb-14 max-w-4xl">
          <div className="relative">
            {/* Progress Bar */}
            <div
              className="
                absolute inset-x-10 top-5 h-1 bg-gray-200
                md:inset-x-22
              "
            >
              <div
                className="h-full bg-gray-400 transition-all duration-300"
                style={{
                  width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            {/* Steps */}
            <div className="relative flex items-start justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-1 fade-up flex-col items-center"
                  style={{ transitionDelay: `${0.1 * step.id}s` }}
                >
                  <button
                    type="button"
                    onClick={() => handleStepClick(step.id)}
                    className={`
                      z-10 flex size-10 items-center justify-center rounded-full
                      text-sm font-medium transition-all duration-300
                      hover:scale-105
                      focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                      focus:outline-none
                      ${
                        step.id <= activeStep
                          ? `
                            bg-gray-500 text-white shadow-lg
                            hover:bg-gray-700
                          `
                          : `
                            border-2 border-gray-400 bg-white text-gray-700
                            shadow-sm
                            hover:border-gray-500 hover:text-gray-600
                          `
                      }
                    `}
                    aria-label={`Go to step ${step.id}: ${step.title}`}
                  >
                    {step.id}
                  </button>
                  <div className="mt-3 max-w-30 text-center">
                    <h4
                      className={`
                        ${step.id <= activeStep ? "text-gray-800!" : `
                          text-gray-700!
                        `}
                        text-xs/tight font-medium
                        md:text-sm
                      `}
                      style={{
                        color:
                          step.id <= activeStep ? "#323d48ff" : "#76757eff",
                      }}
                    >
                      {step.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Details */}
          <div
            className="
              mt-8 min-h-50 fade-up rounded-lg border border-gray-200
              bg-gray-100 p-6
            "
          >
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Step {activeStep}: {steps[activeStep - 1]?.title}
            </h3>
            <p className="mb-6 text-base text-gray-800">
              {steps[activeStep - 1]?.description}
            </p>
            <div className="flex items-center justify-between">
              {activeStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="
                    rounded-lg bg-gray-400 px-6 py-2 text-sm font-medium
                    text-white shadow-md transition-all duration-200
                    hover:bg-gray-500 hover:shadow-lg
                    focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                    focus:outline-none
                  "
                  aria-label="Go to previous step"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              {activeStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="
                    rounded-lg bg-gray-600 px-6 py-2 text-sm font-medium
                    text-white shadow-md transition-all duration-200
                    hover:bg-gray-700 hover:shadow-lg
                    focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                    focus:outline-none
                  "
                  aria-label="Go to next step"
                >
                  Next
                </button>
              ) : (
                <a
                  href="https://dte.mponline.gov.in/portal/services/onlinecounselling/counshomepage/home.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block rounded-lg bg-green-600 px-6 py-2 text-sm
                    font-medium text-white shadow-md transition-all duration-200
                    hover:bg-green-700 hover:shadow-lg
                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    focus:outline-none
                  "
                  aria-label="Apply now for admission - Opens in new tab"
                >
                  Apply Now
                </a>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="
            mx-auto max-w-3xl fade-up rounded-lg border border-gray-200
            bg-gray-50 p-8 text-center
          "
        >
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">
            Ready to Apply?
          </h3>
          <p className="mb-6 text-base text-gray-800">
            Applications for the {new Date().getFullYear()}-
            {new Date().getFullYear() + 1} {" "}academic year are now open.
            Don&apos;t miss the opportunity to be part of our prestigious
            institution.
          </p>
          <a
            href="https://dte.mponline.gov.in/portal/services/onlinecounselling/counshomepage/home.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block rounded-lg bg-red-800 px-8 py-3 font-medium
              text-white shadow-lg transition-all duration-200
              hover:scale-105 hover:bg-red-700 hover:shadow-xl
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              focus:outline-none
            "
            aria-label="Start your application process - Opens in new tab"
          >
            Start Your Application
          </a>
        </div>
      </div>
    </section>
  );
}

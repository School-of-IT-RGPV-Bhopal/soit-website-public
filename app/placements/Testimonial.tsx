"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

const testimonialsData = [
  {
    name: "Amit Verma",
    designation: "Senior HR Manager",
    company: "TCS",
    message:
      "Students from this institute consistently demonstrate strong technical fundamentals and professionalism.",
  },
  {
    name: "Priya Mehta",
    designation: "Talent Acquisition Lead",
    company: "Deloitte",
    message:
      "The placement cell ensured a smooth recruitment process and quality candidates.",
  },
  {
    name: "Rahul Khanna",
    designation: "HR Business Partner",
    company: "Infosys",
    message:
      "Industry-ready students with strong problem-solving skills.",
  },
  {
    name: "Sneha Joshi",
    designation: "Recruitment Manager",
    company: "Capgemini",
    message:
      "Well-coordinated placement process and disciplined students.",
  },
  {
    name: "Ankit Rao",
    designation: "Talent Partner",
    company: "Amazon",
    message:
      "Excellent academic grounding and adaptability among students.",
  },
];

export default function Testimonial() {
  return (
    <section className="my-16">
      <h2 className="mb-8 text-3xl font-semibold">
        Testimonials
      </h2>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex w-max animate-scroll gap-8"
          style={{ animationDuration: "40s" }} // 👈 slower than recruiters
        >
          {[...testimonialsData, ...testimonialsData].map((item, i) => (
            <div
              key={i}
              className="
                w-105 shrink-0 rounded-xl border bg-white p-6 shadow-sm
              "
            >
              <ChatBubbleLeftRightIcon className="
                mb-4 size-8 text-blue-600 opacity-80
              " />

              <p className="mb-6 leading-relaxed text-gray-700 italic">
                “{item.message}”
              </p>

              <div>
                <p className="text-xl font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">
                  {item.designation}
                </p>
                <p className="mt-1 text-sm font-medium text-blue-700">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

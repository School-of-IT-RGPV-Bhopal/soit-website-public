"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { X, Eye } from "lucide-react";
import Image from "next/image";

const VISION_CONTENT =
  "To be an institute of academic excellence in Digital Arena with global outreach delivering socially responsible professionals and to become an entrepreneurial hub.";

const MISSION_CONTENT = `To provide lifelong learning environment to strengthen core competencies, innovation, problem-solving skills, ethical values and social responsibility.

To establish industry - institute interaction and collaborations to prepare the students to adopt corporate culture with leadership and managerial skills.

To promote technological advancement by providing exposure to latest tools and technologies being implemented in the industry.

To make future-ready graduates by promoting research and projects development on cutting-edge technologies in the fast-paced technology-driven enviroment.
`;

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback((title: string, content: string) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    setModalContent({ title, content });
    setIsModalOpen(true);
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    openTimeoutRef.current = setTimeout(() => {
      setIsModalVisible(true);
      modalRef.current?.focus();
    }, 10);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // Wait for animation to complete before unmounting
    closeTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false);
      setModalContent(null);
    }, 300);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (!isModalOpen && lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <section
      id="about"
      className="section-container bg-white"
      data-tour="home-about-section"
    >
      <div className="container mx-auto">
        <div
          className="
            mb-8 text-center opacity-100 transition-all duration-700 ease-out
          "
        >
          <h2
            className="
              mb-4 text-3xl font-bold text-primary
              md:text-4xl
            "
          >
            About SoIT
          </h2>
          <div className="mx-auto h-1 w-20 bg-accent"></div>
        </div>

        <div
          className="
            grid grid-cols-1 items-center gap-8
            md:grid-cols-2
          "
        >
          <div className="
            h-full opacity-100 transition-all duration-700 ease-out
          ">
            <div className="
              relative h-64 w-full rounded-lg
              sm:h-80
              md:h-full
            ">
              <Image
                src="/images/soitrgpv_building.png"
                alt="RGPV Building"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="opacity-100 transition-all duration-700 ease-out">
            <h3
              className="
                mb-4 text-2xl font-semibold text-gray-900 transition-colors
                duration-300
                hover:text-blue-600
              "
            >
              Excellence in Technology Education
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              The School of Information Technology at RGPV was established in
              2002-03 with a vision to produce world-class IT professionals.
              Over the years, we have evolved into a center of excellence for
              computer science and information technology education.
            </p>
            <p className="mb-6 leading-relaxed text-gray-700">
              Our curriculum is designed in collaboration with industry experts
              to ensure that our students are equipped with the latest skills
              and knowledge required in the rapidly evolving tech landscape.
            </p>

            <div className="
              grid grid-cols-1 gap-4
              sm:grid-cols-2
            ">
              <div
                data-tour="home-vision-card"
                className="
                  group transform cursor-pointer rounded-lg bg-gray-50 p-4
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-gray-100 hover:shadow-md
                "
                onClick={() => openModal("Our Vision", VISION_CONTENT)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4
                    className="
                      font-semibold text-primary transition-colors duration-200
                      group-hover:text-blue-600
                    "
                  >
                    Our Vision
                  </h4>
                  <Eye
                    className="
                      size-4 text-gray-400 transition-all duration-200
                      group-hover:scale-110 group-hover:text-blue-600
                    "
                  />
                </div>
                <p
                  className="
                    line-clamp-3 text-sm text-gray-600 transition-colors
                    duration-200
                    group-hover:text-gray-700
                  "
                >
                  To be an institute of academic excellence in Digital Arena
                  with global outreach delivering socially responsible
                  professionals...
                </p>
                <button
                  className="
                    mt-2 translate-y-1 transform text-xs text-blue-600 opacity-0
                    transition-all duration-200
                    group-hover:translate-y-0 group-hover:opacity-100
                    hover:text-blue-800
                  "
                >
                  Click to read more
                </button>
              </div>
              <div
                className="
                  group transform cursor-pointer rounded-lg bg-gray-50 p-4
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-gray-100 hover:shadow-md
                "
                onClick={() => openModal("Our Mission", MISSION_CONTENT)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4
                    className="
                      font-semibold text-primary transition-colors duration-200
                      group-hover:text-blue-600
                    "
                  >
                    Our Mission
                  </h4>
                  <Eye
                    className="
                      size-4 text-gray-400 transition-all duration-200
                      group-hover:scale-110 group-hover:text-blue-600
                    "
                  />
                </div>
                <p
                  className="
                    line-clamp-3 text-sm text-gray-600 transition-colors
                    duration-200
                    group-hover:text-gray-700
                  "
                >
                  To provide lifelong learning environment to strengthen core
                  competencies, innovation, problem-solving skills...
                </p>
                <button
                  className="
                    mt-2 translate-y-1 transform text-xs text-blue-600 opacity-0
                    transition-all duration-200
                    group-hover:translate-y-0 group-hover:opacity-100
                    hover:text-blue-800
                  "
                >
                  Click to read more
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && modalContent && (
          <div className="
            fixed inset-0 z-50 flex items-center justify-center p-4
          ">
            {/* Backdrop */}
            <div
              className={`
                absolute inset-0 backdrop-blur-sm transition-all duration-300
                ease-out
                ${isModalVisible ? "bg-black/50" : "bg-black/0"}
              `}
              onClick={closeModal}
            ></div>

            {/* Modal Content */}
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-modal-title"
              tabIndex={-1}
              className={`
                relative max-h-[80vh] w-full max-w-2xl overflow-hidden
                rounded-xl bg-white shadow-2xl transition-all duration-300
                ease-out
                ${
                  isModalVisible
                    ? "translate-y-0 scale-100 transform opacity-100"
                    : "translate-y-4 scale-95 transform opacity-0"
                }
              `}
            >
              {/* Header */}
              <div
                className={`
                  relative flex items-start justify-between from-blue-50
                  to-indigo-50 p-6 pr-14 pb-0 transition-all duration-400
                  ease-out
                  sm:items-center sm:pr-6
                  ${
                    isModalVisible
                      ? "translate-y-0 transform opacity-100"
                      : `-translate-y-2 transform opacity-0`
                  }
                `}
              >
                <h3
                  id="about-modal-title"
                  className={`
                    text-xl/snug font-bold text-gray-900 transition-all
                    duration-500 ease-out
                    sm:text-2xl
                    ${
                      isModalVisible
                        ? "translate-x-0 transform opacity-100"
                        : `-translate-x-4 transform opacity-0`
                    }
                  `}
                >
                  {modalContent.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="
                    absolute top-4 right-4 transform rounded-full p-2
                    transition-all duration-200
                    hover:scale-110 hover:rotate-90 hover:bg-white/80
                    focus:ring-2 focus:ring-blue-500 focus:outline-none
                  "
                  aria-label="Close modal"
                >
                  <X className="size-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div
                className={`
                  max-h-[60vh] overflow-y-auto p-6 transition-all duration-500
                  ease-out
                  ${
                    isModalVisible
                      ? "translate-y-0 transform opacity-100"
                      : `translate-y-4 transform opacity-0`
                  }
                `}
              >
                <div className="max-w-none">
                  {modalContent.content
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className={`
                          mb-4 leading-relaxed text-gray-700 transition-all
                          duration-400 ease-out
                          last:mb-0
                          ${
                            isModalVisible
                              ? "translate-y-0 transform opacity-100"
                              : `translate-y-2 transform opacity-0`
                          }
                        `}
                        style={{
                          transitionDelay: isModalVisible
                            ? `${200 + index * 100}ms`
                            : "0ms",
                        }}
                      >
                        {paragraph.startsWith("•") ? (
                          <span className="ml-4 block">
                            <span
                              className={`
                                inline-block font-medium text-blue-600
                                transition-all duration-300 ease-out
                                ${
                                  isModalVisible
                                    ? "scale-100 transform opacity-100"
                                    : `scale-0 transform opacity-0`
                                }
                              `}
                              style={{
                                transitionDelay: isModalVisible
                                  ? `${300 + index * 100}ms`
                                  : "0ms",
                              }}
                            >
                              •
                            </span>
                            <span className="ml-2">
                              {paragraph.substring(1)}
                            </span>
                          </span>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                </div>
              </div>

              {/* Footer */}
              <div
                className={`
                  flex justify-end p-6 pt-0 transition-all duration-400 ease-out
                  ${
                    isModalVisible
                      ? "translate-y-0 transform opacity-100"
                      : `translate-y-4 transform opacity-0`
                  }
                `}
                style={{
                  transitionDelay: isModalVisible ? "300ms" : "0ms",
                }}
              >
                <button
                  onClick={closeModal}
                  className="
                    transform rounded-lg bg-blue-600 px-6 py-2 text-white
                    transition-all duration-200
                    hover:scale-105 hover:bg-blue-700 hover:shadow-lg
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    focus:outline-none
                  "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

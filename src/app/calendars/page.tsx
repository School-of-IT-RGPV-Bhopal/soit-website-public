// "use client";

// import { useMemo, useState } from "react";

// type CalendarKind = "branch" | "semester" | "student-council" | "institute";

// type BranchKey = "all" | "aiml" | "csbs" | "csds" | "cse" | "it";
// type SemesterKey = "all" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// type CalendarEntry = {
//   id: string;
//   title: string;
//   kind: CalendarKind;
//   branch: BranchKey;
//   semester: SemesterKey;
//   status: "live" | "preview";
//   description: string;
//   note: string;
//   icsHref: string;
//   htmlHref: string;
// };

// const branchOptions: Array<{ value: BranchKey; label: string }> = [
//   { value: "all", label: "All branches" },
//   { value: "aiml", label: "CSE (AI & ML)" },
//   { value: "csbs", label: "CSE (Business Systems)" },
//   { value: "csds", label: "CSE (Data Science)" },
//   { value: "cse", label: "Computer Science & Engineering" },
//   { value: "it", label: "Information Technology" },
// ];

// const semesterOptions: Array<{ value: SemesterKey; label: string }> = [
//   { value: "all", label: "All semesters" },
//   { value: 1, label: "Sem 1" },
//   { value: 2, label: "Sem 2" },
//   { value: 3, label: "Sem 3" },
//   { value: 4, label: "Sem 4" },
//   { value: 5, label: "Sem 5" },
//   { value: 6, label: "Sem 6" },
//   { value: 7, label: "Sem 7" },
//   { value: 8, label: "Sem 8" },
// ];

// const calendarKinds: Array<{
//   value: "all" | CalendarKind;
//   label: string;
//   description: string;
// }> = [
//   {
//     value: "student-council",
//     label: "Student Council",
//     description: "Default campus events calendar, shown first on load.",
//   },
//   {
//     value: "all",
//     label: "All calendars",
//     description: "Browse every calendar source together.",
//   },
//   {
//     value: "branch",
//     label: "Branch wise",
//     description: "Academic calendars grouped by program branch.",
//   },
//   {
//     value: "semester",
//     label: "Semester wise",
//     description: "Calendars grouped by semester and academic year.",
//   },
//   {
//     value: "institute",
//     label: "General Institute",
//     description: "Campus-wide holidays, notices, and deadlines.",
//   },
// ];

// const calendars: CalendarEntry[] = [
//   {
//     id: "student-council",
//     title: "Student Council Events Calendar",
//     kind: "student-council",
//     branch: "all",
//     semester: "all",
//     status: "live",
//     description:
//       "Campus events, student-led activities, cultural programs, and council announcements curated for the full student body.",
//     note: "This is the default calendar shown when the page loads.",
//     icsHref: "/calendars/student-council-events.ics",
//     htmlHref:
//       "https://outlook.office365.com/owa/calendar/4960370f52b54b66a9b8165c1534279e@soitrgpv.ac.in/f5d4ec4c38504f7c80fe0dd6c5e2ef4f13221687799366624786/calendar.html",
//   },
//   {
//     id: "institute",
//     title: "General Institute Calendar",
//     kind: "institute",
//     branch: "all",
//     semester: "all",
//     status: "preview",
//     description:
//       "Institute-wide academic dates, holidays, convocations, notices, and shared deadlines for the campus community.",
//     note: "Use this for broad, all-campus planning.",
//     icsHref: "/calendars/general-institute.ics",
//     htmlHref: "/calendars/general-institute.html",
//   },
//   {
//     id: "aiml-branch",
//     title: "CSE (AI & ML) Branch Calendar",
//     kind: "branch",
//     branch: "aiml",
//     semester: 4,
//     status: "preview",
//     description:
//       "Branch-level milestones, reviews, and internal academic updates for the AI & ML program.",
//     note: "Derived from the academics section branch data.",
//     icsHref: "/calendars/aiml-branch.ics",
//     htmlHref: "/calendars/aiml-branch.html",
//   },
//   {
//     id: "csbs-branch",
//     title: "CSE (Business Systems) Branch Calendar",
//     kind: "branch",
//     branch: "csbs",
//     semester: 4,
//     status: "preview",
//     description:
//       "Branch-level schedule for the business systems program, including assessments and program activities.",
//     note: "Aligned to the academic branch label from programs.",
//     icsHref: "/calendars/csbs-branch.ics",
//     htmlHref: "/calendars/csbs-branch.html",
//   },
//   {
//     id: "csds-branch",
//     title: "CSE (Data Science) Branch Calendar",
//     kind: "branch",
//     branch: "csds",
//     semester: 5,
//     status: "preview",
//     description:
//       "A branch calendar for the data science stream covering academic checkpoints and program updates.",
//     note: "Useful for branch-specific academic planning.",
//     icsHref: "/calendars/csds-branch.ics",
//     htmlHref: "/calendars/csds-branch.html",
//   },
//   {
//     id: "cse-sem",
//     title: "Computer Science & Engineering Semester Calendar",
//     kind: "semester",
//     branch: "cse",
//     semester: 2,
//     status: "preview",
//     description:
//       "Semester-wise planning for the core CSE program, covering assessments, submissions, and key dates.",
//     note: "Filters by semester instead of branch focus.",
//     icsHref: "/calendars/cse-sem.ics",
//     htmlHref: "/calendars/cse-sem.html",
//   },
//   {
//     id: "it-sem",
//     title: "Information Technology Semester Calendar",
//     kind: "semester",
//     branch: "it",
//     semester: 6,
//     status: "preview",
//     description:
//       "A semester-level calendar for IT students that highlights academic checkpoints and review milestones.",
//     note: "Built for semester-specific student planning.",
//     icsHref: "/calendars/it-sem.ics",
//     htmlHref: "/calendars/it-sem.html",
//   },
// ];

// const kindBadgeStyles: Record<CalendarKind, string> = {
//   branch: "bg-sky-50 text-sky-700 ring-sky-200",
//   semester: "bg-emerald-50 text-emerald-700 ring-emerald-200",
//   "student-council": "bg-amber-50 text-amber-700 ring-amber-200",
//   institute: "bg-slate-50 text-slate-700 ring-slate-200",
// };

// const kindLabels: Record<CalendarKind, string> = {
//   branch: "Branch wise",
//   semester: "Semester wise",
//   "student-council": "Student Council",
//   institute: "Institute",
// };

// function getSemesterLabel(value: SemesterKey) {
//   return value === "all" ? "All semesters" : `Sem ${value}`;
// }

// export default function CalendarsPage() {
//   const [selectedKind, setSelectedKind] = useState<"all" | CalendarKind>("student-council");
//   const [selectedBranch, setSelectedBranch] = useState<BranchKey>("all");
//   const [selectedSemester, setSelectedSemester] = useState<SemesterKey>("all");

//   const featuredCalendar = calendars.find((calendar) => calendar.id === "student-council") ?? calendars[0]!;

//   const filteredCalendars = useMemo(() => {
//     return calendars.filter((calendar) => {
//       if (calendar.id === featuredCalendar.id) {
//         return false;
//       }

//       if (selectedKind !== "all" && calendar.kind !== selectedKind) {
//         return false;
//       }

//       if (
//         calendar.kind === "branch" ||
//         calendar.kind === "semester"
//       ) {
//         if (selectedBranch !== "all" && calendar.branch !== selectedBranch) {
//           return false;
//         }

//         if (
//           selectedSemester !== "all" &&
//           calendar.semester !== selectedSemester
//         ) {
//           return false;
//         }
//       }

//       return true;
//     });
//   }, [featuredCalendar.id, selectedBranch, selectedKind, selectedSemester]);

//   const academicCount = calendars.filter(
//     (calendar) => calendar.kind === "branch" || calendar.kind === "semester",
//   ).length;
//   const eventCount = calendars.filter(
//     (calendar) => calendar.kind === "student-council",
//   ).length;
//   const instituteCount = calendars.filter(
//     (calendar) => calendar.kind === "institute",
//   ).length;

//   if (!featuredCalendar) {
//     return (
//       <main className="page-wrapper flex items-center justify-center bg-slate-950 text-white">
//         <p>No calendars available.</p>
//       </main>
//     );
//   }

//   return (
//     <main className="page-wrapper bg-linear-to-b from-slate-950 via-slate-900 to-slate-100 text-slate-900">
//       <section className="section-container py-10 md:py-14">
//         <div className="mx-auto flex max-w-7xl flex-col gap-8">
//           <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/95 shadow-2xl shadow-slate-950/20 backdrop-blur">
//             <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
//               <div className="flex flex-col justify-between gap-8 rounded-[1.6rem] bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white md:p-8">
//                 <div className="max-w-2xl">
//                   <div className="flex items-center gap-3">
//                     <p className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
//                       Calendar directory
//                     </p>
//                     <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]">
//                       Under Dev
//                     </span>
//                   </div>
//                   <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
//                     Student Council first, academic calendars one filter away.
//                   </h1>
//                   <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-lg">
//                     The default view is the Student Council Events Calendar. Use the
//                     branch and semester filters from the academics section to switch
//                     between branch-wise, semester-wise, institute, and student-led
//                     calendars.
//                   </p>
//                 </div>

//                 <div className="grid gap-3 sm:grid-cols-3">
//                   <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
//                     <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
//                       Academic calendars
//                     </p>
//                     <p className="mt-2 text-2xl font-semibold text-white">
//                       {academicCount}
//                     </p>
//                   </div>
//                   <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
//                     <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
//                       Student events
//                     </p>
//                     <p className="mt-2 text-2xl font-semibold text-white">
//                       {eventCount}
//                     </p>
//                   </div>
//                   <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
//                     <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
//                       Institute calendars
//                     </p>
//                     <p className="mt-2 text-2xl font-semibold text-white">
//                       {instituteCount}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 md:p-6">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <p
//                       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${kindBadgeStyles[featuredCalendar.kind]}`}
//                     >
//                       {kindLabels[featuredCalendar.kind]}
//                     </p>
//                     <h2 className="mt-4 text-2xl font-semibold text-slate-900 md:text-3xl">
//                       {featuredCalendar.title}
//                     </h2>
//                   </div>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-medium ${
//                       featuredCalendar.status === "live"
//                         ? "bg-emerald-50 text-emerald-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {featuredCalendar.status === "live" ? "Live default" : "Preview"}
//                   </span>
//                 </div>

//                 <p className="mt-4 text-sm leading-7 text-slate-600">
//                   {featuredCalendar.description}
//                 </p>

//                 <div className="mt-5 grid gap-3 sm:grid-cols-2">
//                   <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
//                     <span className="block text-xs uppercase tracking-[0.14em] text-slate-400">
//                       Branch
//                     </span>
//                     <span className="mt-1 block font-medium text-slate-900">
//                       Student Council
//                     </span>
//                   </div>
//                   <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
//                     <span className="block text-xs uppercase tracking-[0.14em] text-slate-400">
//                       Semester
//                     </span>
//                     <span className="mt-1 block font-medium text-slate-900">
//                       Campus wide
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-600">
//                   {featuredCalendar.note}
//                 </div>

//                 <div className="mt-6 flex flex-wrap gap-3">
//                   <a
//                     href={featuredCalendar.htmlHref}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
//                   >
//                     Open HTML calendar
//                   </a>
//                   <a
//                     href={featuredCalendar.icsHref}
//                     download
//                     className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
//                   >
//                     Download ICS
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="sticky top-24 z-10 rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-950/5 backdrop-blur md:p-6">
//             <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
//               <div>
//                 <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
//                   Switch calendars
//                 </p>
//                 <h2 className="mt-2 text-2xl font-semibold text-slate-950">
//                   Choose a calendar type and narrow it by branch or semester.
//                 </h2>
//               </div>
//               <p className="max-w-2xl text-sm leading-6 text-slate-600">
//                 Branch and semester options are aligned to the academic programs
//                 area, so you can move between student council events and academic
//                 calendars without changing context.
//               </p>
//             </div>

//             <div className="mt-6 flex flex-wrap gap-3">
//               {calendarKinds.map((kind) => {
//                 const active = selectedKind === kind.value;
//                 return (
//                   <button
//                     key={kind.value}
//                     type="button"
//                     onClick={() => setSelectedKind(kind.value)}
//                     className={`rounded-2xl border px-4 py-3 text-left transition ${
//                       active
//                         ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15"
//                         : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
//                     }`}
//                   >
//                     <span className="block text-sm font-semibold">{kind.label}</span>
//                     <span
//                       className={`mt-1 block max-w-[16rem] text-xs leading-5 ${
//                         active ? "text-slate-300" : "text-slate-500"
//                       }`}
//                     >
//                       {kind.description}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="mt-6 grid gap-4 md:grid-cols-2">
//               <label className="space-y-2">
//                 <span className="text-sm font-medium text-slate-700">Branch</span>
//                 <select
//                   value={selectedBranch}
//                   onChange={(event) => setSelectedBranch(event.target.value as BranchKey)}
//                   className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-950"
//                 >
//                   {branchOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label className="space-y-2">
//                 <span className="text-sm font-medium text-slate-700">
//                   Semester
//                 </span>
//                 <select
//                   value={selectedSemester}
//                   onChange={(event) => {
//                     const nextValue = event.target.value;
//                     setSelectedSemester(
//                       nextValue === "all"
//                         ? "all"
//                         : (Number(nextValue) as SemesterKey),
//                     );
//                   }}
//                   className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-950"
//                 >
//                   {semesterOptions.map((option) => (
//                     <option key={String(option.value)} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             </div>
//           </div>

//           <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {filteredCalendars.map((calendar) => (
//               <article
//                 key={calendar.id}
//                 className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <p
//                       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${kindBadgeStyles[calendar.kind]}`}
//                     >
//                       {kindLabels[calendar.kind]}
//                     </p>
//                     <h3 className="mt-4 text-xl font-semibold text-slate-950">
//                       {calendar.title}
//                     </h3>
//                   </div>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-medium ${
//                       calendar.status === "live"
//                         ? "bg-emerald-50 text-emerald-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {calendar.status === "live" ? "Live" : "Preview"}
//                   </span>
//                 </div>

//                 <p className="mt-4 text-sm leading-7 text-slate-600">
//                   {calendar.description}
//                 </p>

//                 <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
//                   <div className="rounded-2xl bg-slate-50 px-4 py-3">
//                     <span className="block text-xs uppercase tracking-[0.14em] text-slate-400">
//                       Branch
//                     </span>
//                     <span className="mt-1 block font-medium text-slate-900">
//                       {calendar.branch === "all"
//                         ? "Campus wide"
//                         : branchOptions.find((option) => option.value === calendar.branch)
//                             ?.label}
//                     </span>
//                   </div>
//                   <div className="rounded-2xl bg-slate-50 px-4 py-3">
//                     <span className="block text-xs uppercase tracking-[0.14em] text-slate-400">
//                       Semester
//                     </span>
//                     <span className="mt-1 block font-medium text-slate-900">
//                       {getSemesterLabel(calendar.semester)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
//                   {calendar.note}
//                 </div>

//                 <div className="mt-5 flex flex-wrap gap-3">
//                   <a
//                     href={calendar.htmlHref}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
//                   >
//                     Open HTML
//                   </a>
//                   <a
//                     href={calendar.icsHref}
//                     download
//                     className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
//                   >
//                     Download ICS
//                   </a>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {filteredCalendars.length === 0 ? (
//             <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 px-6 py-10 text-center text-slate-600 shadow-sm">
//               No calendars match the current filters. Try a different branch,
//               semester, or calendar type.
//             </div>
//           ) : null}
//         </div>
//       </section>
//     </main>
//   );
// }


import WorkInProgress from "@/components/WorkInProgress";

export default function CalendarsPage() {
  return (
    <WorkInProgress
      title="Calendars & Schedules"
      description="We're organizing academic calendars, semester schedules, and student council events. Soon you'll be able to browse and download calendars by branch, semester, and event type."
      expectedLaunch="Calendars will be available soon. Check back in a few weeks!"
      contactEmail="contact@soitrgpv.ac.in"
    />
  );
}
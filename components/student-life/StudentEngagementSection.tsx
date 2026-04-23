// import { Target, Lightbulb, Users, Award } from "lucide-react";

// const initiatives = [
//   {
//     icon: Target,
//     title: "Leadership Development",
//     description:
//       "Programs designed to nurture future leaders through workshops, mentorship, and real-world project experiences.",
//   },
//   {
//     icon: Lightbulb,
//     title: "Innovation & Entrepreneurship",
//     description:
//       "Incubation support, startup mentoring, and innovation challenges to transform ideas into impactful ventures.",
//   },
//   {
//     icon: Users,
//     title: "Community Outreach",
//     description:
//       "Social initiatives connecting students with local communities through volunteering, awareness campaigns, and development projects.",
//   },
//   {
//     icon: Award,
//     title: "Skill Enhancement",
//     description:
//       "Workshops, certifications, and training programs to build industry-relevant skills and enhance employability.",
//   },
// ];

const StudentEngagementSection = () => {
  return (
    <section id="student-engagement" className="scroll-mt-24 text-justify">
      {/* <h2 className="section-title">Student Engagement & Development</h2> */}

        <div className="mb-6 flex items-center gap-4">
          <h2 className="section-title text-left">Student Engagement & Development</h2>
          <div className="h-px flex-1 bg-black" />
        </div>
 


      <p className="mb-8 text-lg/relaxed text-foreground/80">
        Beyond academics, we focus on holistic development of our students.
        Through various programs and initiatives, students develop leadership
        qualities, entrepreneurial mindset, and a sense of social responsibility
        that prepares them for impactful careers.
      </p>

      <p className="mb-8 text-lg/relaxed text-foreground/80">
        Beyond academics, we focus on holistic development of our students.
        Through various programs and initiatives, students develop leadership
        qualities, entrepreneurial mindset, and a sense of social responsibility
        that prepares them for impactful careers.
      </p>

      <p className="mb-8 text-lg/relaxed text-foreground/80"></p>


      {/* <div className="space-y-6">
        {initiatives.map((initiative) => (
          <div
            key={initiative.title}
            className="flex items-start gap-5 content-block"
          >
            <div className="shrink-0 rounded-lg p-3">
              <initiative.icon className="size-6" />
            </div>
            <div>
              <h3 className="subsection-title mb-2">{initiative.title}</h3>
              <p className="leading-relaxed">
                {initiative.description}
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default StudentEngagementSection;

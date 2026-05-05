"use client";

import Image from "next/image";

export default function Message() {
  return (
    <section className="my-24">
      {/* SECTION HEADING */}
      <div className="mb-16 text-center">
        <h2
          className="
          text-3xl font-bold text-blue-900
          md:text-4xl
        "
        >
          Director&apos;s Note
        </h2>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-red-600"></div>
      </div>

      {/* DIRECTOR CARD */}
      <div
        className="
        mx-auto mb-20 max-w-6xl rounded-2xl bg-white p-8 shadow-lg
        md:p-12
      "
      >
        <div
          className="
          flex flex-col items-start gap-12
          md:flex-row
        "
        >
          {/* IMAGE + NAME */}
          <div
            className="
            shrink-0 text-center
            md:w-1/3
          "
          >
            <div
              className="
              relative mx-auto size-44 overflow-hidden rounded-full border-4
              border-blue-800 shadow-md
            "
            >
              <Image
                src="/images/ProfessorImages/Jitendra_Agrawal_sir.jpg"
                alt="Director"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-blue-900">
              Dr. Jitendra Aggrawal
            </h3>
            <p className="mt-1 text-sm text-gray-600">Director, School of IT</p>
          </div>

          {/* MESSAGE */}
          <div className="md:w-2/3">
            <p className="text-[17px] leading-relaxed text-gray-700">
              At the School of Information Technology, Rajiv Gandhi Proudyogiki
              Vishwavidyalaya (RGPV), Bhopal, we are committed to providing
              quality technical education that empowers students to meet global
              challenges with competence, confidence, and integrity. Our vision
              is to nurture young minds into responsible professionals by
              providing a strong academic foundation, industry-oriented
              learning, innovation, and a commitment to ethical values. The
              Training and Placement Cell plays a pivotal role in translating
              this vision into reality by creating meaningful interfaces between
              students and the corporate world. I take immense pride in our
              students for their dedication and adaptability, and I appreciate
              the continuous efforts of our faculty and the Placement team in
              guiding them towards successful careers. We look forward to
              strengthening our collaboration with industry partners to develop
              future-ready professionals who make a positive contribution to
              society. I wish our students every success in their professional
              journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// {/* TPO CARD */}
// <div className="
//   mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-lg
//   md:p-12
// ">
//   <div className="
//     flex flex-col items-start gap-12
//     md:flex-row-reverse
//   ">

//     {/* IMAGE + NAME */}
//     <div className="
//       shrink-0 text-center
//       md:w-1/3
//     ">
//       <div className="
//         relative mx-auto size-44 overflow-hidden rounded-full border-4
//         border-blue-800 shadow-md
//       ">
//         <Image
//           src="/images/director-tnp.png"
//           alt="Training and Placement Officer"
//           fill
//           className="object-cover"
//         />
//       </div>

//       <h3 className="mt-6 text-xl font-semibold text-blue-900">
//         Dr. Shikha Aggrawal
//       </h3>
//       <p className="mt-1 text-sm text-gray-600">
//         Director, TNP
//       </p>
//     </div>

//     {/* MESSAGE */}
//     <div className="
//       text-left
//       md:w-2/3 md:text-right
//     ">
//       <p className="text-[17px] leading-relaxed text-gray-700">
//         The Training and Placement Cell of the SOIT, RGPV, Bhopal, is
//         dedicated to facilitating successful career opportunities for our
//         students by bridging the gap between academia and industry. Our
//         objective is to prepare students for the dynamic professional
//         environment through continuous training, skill development programs,
//         internships, and campus recruitment drives. We focus on enhancing
//         not only technical expertise but also communication skills,
//         professionalism, and overall personality, enabling students to
//         emerge as industry-ready graduates. We are grateful to our esteemed
//         recruiters for their trust and continued association with our
//         institution. I also commend our students for their hard work,
//         discipline, and enthusiasm. We remain committed to building
//         long-term partnerships that create value for both industry and
//         academia. Together, we strive to shape competent professionals and
//         responsible leaders of tomorrow.
//       </p>
//     </div>
//   </div>
// </div>

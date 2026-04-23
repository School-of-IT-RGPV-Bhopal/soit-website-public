import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ContactPlacement() {
  return (
    <section className="my-16">
      <h2 className="mb-8 text-3xl font-semibold">
        Contact Placement Cell
      </h2>

      {/* Reduced-width box */}
      <div
        className="mx-auto max-w-2xl rounded-xl border bg-white p-8 shadow-sm"
      >
        <p className="mb-8 text-lg text-gray-600">
          For recruitment enquiries, campus placement coordination, or
          internship-related communication, please reach out to our placement
          office.
        </p>

        {/* Vertical stack */}
        <div className="space-y-8">
          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPinIcon className="mt-1 size-7 text-blue-700" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Address</h3>
              <p className="mt-1 text-gray-700">
                Training &amp; Placement Cell <br />
                2nd Floor, Knowledge Resource Centre (KRC) <br />
                RGPV, Bhopal, Madhya Pradesh
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <EnvelopeIcon className="mt-1 size-7 text-blue-700" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Email</h3>
              <p className="mt-1 text-gray-700">tpo@rgpv.ac.in</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <PhoneIcon className="mt-1 size-7 text-blue-700" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
              <p className="mt-1 text-gray-700">+91 9074129183</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

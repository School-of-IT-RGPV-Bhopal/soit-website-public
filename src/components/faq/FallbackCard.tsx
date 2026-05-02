import Link from "next/link";
import { siteContact } from "@lib/siteContact";

const supportEmail = siteContact.supportEmail;

export default function FallbackCard() {
  return (
    <div className="max-w-[18rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">
        This isn&apos;t in our FAQ yet
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Our team can help you directly.
      </p>

      <Link
        href="/contact"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#005F73] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b7285] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F73]/30"
      >
        Go to contact page
      </Link>

      <div className="mt-3 text-xs text-slate-500">
        {supportEmail ? (
          <a
            href={`mailto:${supportEmail}`}
            className="font-medium text-[#005F73] underline decoration-[#005F73]/30 underline-offset-4 transition-colors hover:text-[#0b7285]"
          >
            {supportEmail}
          </a>
        ) : (
          "Support email unavailable"
        )}
      </div>
    </div>
  );
}

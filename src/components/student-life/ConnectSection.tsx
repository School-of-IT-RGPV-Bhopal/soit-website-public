import { Mail, Phone, MapPin } from "lucide-react";
import { siteContact } from "@lib/siteContact";

const ConnectSection = () => {
  return (
    <section id="connect" className="scroll-mt-24 text-justify">
      {/* <h2 className="section-title">Connect with Us</h2> */}

      <div className="flex items-center gap-4">
        <h2 className="section-title text-left">Connect with Us</h2>
        <div className="h-px flex-1 bg-black" />
      </div>

      <p className="mb-8 text-lg/relaxed text-foreground/80">
        Have questions about student life? Want to learn more about our campus
        community? We&apos;d love to hear from you. Reach out through any of the
        channels below.
      </p>

      <div
        className="
          grid gap-8
          md:grid-cols-2
        "
      >
        {/* Contact Info */}
        <div className="content-block">
          <h3 className="subsection-title">Contact Information</h3>
          <div className="space-y-4">
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-center gap-3 transition-colors"
            >
              <Mail className="size-5" />
              <span>{siteContact.email}</span>
            </a>
            <a
              href={siteContact.phoneLink}
              className="flex items-center gap-3 transition-colors"
            >
              <Phone className="size-5" />
              <span>{siteContact.phoneDisplay}</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0" />
              <span>{siteContact.address}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="content-block">
          <h3 className="subsection-title">Follow Us</h3>
          <p className="mb-4">
            Stay updated with campus life through our social channels
          </p>
          <div className="flex gap-4">
            
            <a
              href={siteContact.linkedInUrl}
              className="group rounded-lg p-3 transition-colors"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={siteContact.instagramUrl}
              className="group rounded-lg p-3 transition-colors"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* <a
              href="#"
              className="group rounded-lg p-3 transition-colors"
            >
              <SiX className=" size-5" />
            </a> */}
            {/* <a
              href="#"
              className="group rounded-lg p-3 transition-colors"
            >
              <SiFacebook className=" size-5" />
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;

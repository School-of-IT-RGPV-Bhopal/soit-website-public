const defaultContactEmail = "soit@rgpv.ac.in";
const defaultPhoneDisplay = "+91 755 2678 844";
const defaultPhoneHref = "+917552678844";
const defaultAddress =
  "School of Information Technology, RGPV Campus, Airport Road, Gandhi Nagar, Bhopal, Madhya Pradesh 462033";
const defaultPostalCode = "462033";
const defaultLinkedInUrl = "https://www.linkedin.com/school/soitrgpv";
const defaultInstagramUrl = "https://www.instagram.com/soit_rgpv/";
const defaultMapsUrl =
  "https://maps.google.com/maps?q=School%20of%20Information%20Technology,%20RGPV%20Campus,%20Airport%20Road,%20Gandhi%20Nagar,%20Bhopal,%20Madhya%20Pradesh%20462033";
const defaultMapsEmbedUrl =
  "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=School%20of%20Information%20Technology,%20RGPV%20Campus,%20Airport%20Road,%20Gandhi%20Nagar,%20Bhopal,%20Madhya%20Pradesh%20462033+(School%20Of%20Information%20Technology)&t=k&z=16&ie=UTF8&iwloc=B&output=embed";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ??
  defaultContactEmail;

const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ??
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
  defaultContactEmail;

const phoneDisplay =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? defaultPhoneDisplay;
const phoneHref =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF ?? defaultPhoneHref;
const address =
  process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? defaultAddress;

export const siteContact = {
  email: contactEmail,
  supportEmail,
  phoneDisplay,
  phoneHref,
  phoneLink: `tel:${phoneHref}`,
  address,
  postalCode: process.env.NEXT_PUBLIC_CONTACT_POSTAL_CODE ?? defaultPostalCode,
  linkedInUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? defaultLinkedInUrl,
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? defaultInstagramUrl,
  mapsUrl: process.env.NEXT_PUBLIC_CONTACT_MAPS_URL ?? defaultMapsUrl,
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_CONTACT_MAPS_EMBED_URL ?? defaultMapsEmbedUrl,
};

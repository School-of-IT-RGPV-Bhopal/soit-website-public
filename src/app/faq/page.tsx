import { faqData } from "@data/faq";
import FaqAccordion from "@components/faq/FaqAccordion";
import FaqSearch from "@components/faq/FaqSearch";

export default function FaqPage() {
  const categories = Array.from(new Set(faqData.map((item) => item.category)));

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary/70 uppercase">
            Student Support
          </p>
          <h1 className="mt-2 font-poppins text-3xl font-bold text-primary sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700 sm:text-base">
            Browse common questions about academics, admissions, placements, and
            campus support at SOIT RGPV Bhopal.
          </p>
        </header>

        <div data-tour="faq-search">
          <FaqSearch allItems={faqData} />
        </div>

        <div className="mt-8 space-y-6">
          {categories.map((category, index) => {
            const categoryItems = faqData.filter(
              (item) => item.category === category,
            );

            const section = (
              <FaqAccordion category={category} items={categoryItems} />
            );

            if (index === 0) {
              return (
                <div key={category} data-tour="faq-categories">
                  {section}
                </div>
              );
            }

            return <div key={category}>{section}</div>;
          })}
        </div>
      </section>
    </main>
  );
}

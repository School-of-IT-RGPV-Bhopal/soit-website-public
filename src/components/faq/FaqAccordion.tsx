import type { FaqItem } from "@data/faq";

type FaqAccordionProps = {
  items: FaqItem[];
  category: string;
};

export default function FaqAccordion({ items, category }: FaqAccordionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-poppins text-2xl font-semibold text-primary">{category}</h2>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <details
            key={item.id}
            className="group rounded-xl border border-gray-200 bg-gray-50/60 transition-colors open:bg-white open:shadow-sm"
          >
            <summary className="relative cursor-pointer list-none p-4 pr-12 text-base font-medium text-gray-800 [&::-webkit-details-marker]:hidden">
              <span className="block">{item.question}</span>
              <span className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl leading-none text-primary transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="border-t border-gray-200 px-4 py-4 text-sm leading-7 text-gray-700">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

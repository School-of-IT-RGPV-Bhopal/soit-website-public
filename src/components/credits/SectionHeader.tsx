type SectionHeaderProps = {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="
        mb-3 text-2xl font-bold text-gray-900
        md:text-3xl
      ">{title}</h2>
      <p className="mx-auto max-w-2xl font-medium text-gray-700">
        {description}
      </p>
      <div className="mx-auto mt-4 h-0.5 w-16 bg-gray-600"></div>
    </div>
  );
}

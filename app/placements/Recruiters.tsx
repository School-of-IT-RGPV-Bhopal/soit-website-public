import Image from "next/image";

const recruitersData = [
  { name: "Amazon", logo: "/images/amazon-logo.png" },
  { name: "TCS", logo: "/images/tcs-logo.png" },
  { name: "Wipro", logo: "/images/wipro-logo.png" },
  { name: "Infosys", logo: "/images/infosys-logo.png" },
  { name: "Deloitte", logo: "/images/deloitte-logo.png" },
  { name: "Capgemini", logo: "/images/capgemini-logo.png" },
  { name: "razorpay", logo: "/images/razorpay-logo.png" },
  { name: "databrics", logo: "/images/databrics-logo.png" },
  { name: "udemy", logo: "/images/udemy-logo.png" },
];

export default function Recruiters() {
  return (
    <section className="my-16">
      <h2 className="mb-8 text-3xl font-semibold">Top Recruiters</h2>

      {/* Carousel Wrapper */}
      <div className="relative overflow-hidden">
        {/* Moving Track */}
        <div className="item-center flex w-max animate-scroll gap-16">
          {[...recruitersData, ...recruitersData].map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={item.logo}
                alt={item.name}
                width={120}
                height={60}
                className="recruiter-logo object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

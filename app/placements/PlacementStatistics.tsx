
const placementStatisticsData = [
  { branch: "CSBS", placed: "120 / 135", percentage: "89%", highest: "13.9 LPA" },
  { branch: "CSE-DS", placed: "80 / 95", percentage: "84%", highest: "12 LPA" },
  { branch: "CSE-AIML", placed: "60 / 82", percentage: "73%", highest: "9.5 LPA" },
];

export default function PlacementStatistics() {
  return (
    <section className="my-16">
      <h2 className="mb-8 text-3xl font-semibold">
        Placement Statistics
      </h2>

      {/* Card Wrapper */}
      <div className="overflow-x-auto rounded-xl border bg-white p-8 shadow-sm">

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-blue-100 text-gray-900">
              <th className="border-b p-4 text-sm font-semibold">Branch</th>
              <th className="border-b p-4 text-sm font-semibold">Students Placed</th>
              <th className="border-b p-4 text-sm font-semibold">Placement %</th>
              <th className="border-b p-4 text-sm font-semibold">Highest Package</th>
            </tr>
          </thead>

          <tbody>
            {placementStatisticsData.map((item, index) => (
              <tr
                key={index}
                className={`
                  ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }
                  transition
                  hover:bg-blue-50
                `}
              >
                <td className="border-b p-4 font-medium text-gray-800">
                  {item.branch}
                </td>
                <td className="border-b p-4 text-gray-700">{item.placed}</td>
                <td className="border-b p-4 text-gray-700">{item.percentage}</td>
                <td className="border-b p-4 font-semibold text-blue-700">
                  {item.highest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </section>
  );
}
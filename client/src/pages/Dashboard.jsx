import React from "react";
import ReactApexChart from "react-apexcharts";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const options = {
    series: [50, 40, 13, 4, 22],
    chart: { type: "pie" },
    labels: ["Team AS", "Team BS", "Team CS", "Team DS", "Team ES"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  const statCards = [
    { title: "Today's Meals", value: "12", note: "Meals served today" },
    { title: "Total Expense", value: "৳3200", note: "This month" },
    { title: "Members", value: "8", note: "Active this month" },
    { title: "Reports", value: "5", note: "Submitted this week" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-tr from-emerald-50 to-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto">
        <main className="p-4 sm:p-6 max-w-7xl mx-auto space-y-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-1">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Here's a quick overview of your mess data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h2 className="text-md font-medium text-emerald-600">
                  {card.title}
                </h2>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
                <p className="text-sm text-gray-500">{card.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-medium text-emerald-600 mb-4">
              Monthly Overview
            </h2>
            <div className="h-64 w-full flex items-center justify-center">
              <ReactApexChart
                options={options}
                series={options.series}
                type="pie"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

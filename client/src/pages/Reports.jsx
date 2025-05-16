import React from "react";
import Sidebar from "../components/Sidebar";

const reports = [
  {
    id: 1,
    title: "Monthly Expense",
    amount: 3200,
    date: "2025-04-30",
    description: "Expense summary for April 2025",
  },
  {
    id: 2,
    title: "Member Activity",
    amount: null,
    date: "2025-04-28",
    description: "Report on active members in April",
  },
  {
    id: 3,
    title: "Meal Count",
    amount: null,
    date: "2025-04-30",
    description: "Total meals served in April",
  },
];

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "-";
  return `৳${amount.toLocaleString()}`;
};

const Reports = () => {
  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto">
        <main className="p-6 max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Reports
            </h1>
            <p className="text-gray-600">Here’s a list of your reports.</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow max-w-full">
            <table className="w-full divide-y divide-gray-200 table-auto min-w-[600px] sm:min-w-full">
              <thead className="bg-emerald-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider whitespace-nowrap">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-emerald-800 uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider max-w-xs">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {reports.map((report, index) => (
                  <tr
                    key={report.id}
                    className="hover:bg-emerald-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.title}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {formatCurrency(report.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                      {formatDate(report.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                      {report.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;

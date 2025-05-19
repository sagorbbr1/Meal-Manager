import React from "react";
import { Banknote, Utensils, Wallet, Calculator, Coins } from "lucide-react";

const stats = [
  {
    title: "Mess Balance",
    value: "৳935.00",
    icon: <Wallet className="text-emerald-600 w-6 h-6" />,
    bg: "bg-emerald-50",
  },
  {
    title: "Total Deposit",
    value: "৳22,175.00",
    icon: <Banknote className="text-green-500 w-6 h-6" />,
    bg: "bg-green-50",
  },
  {
    title: "Total Meal",
    value: "377.25",
    icon: <Utensils className="text-orange-500 w-6 h-6" />,
    bg: "bg-orange-50",
  },
  {
    title: "Total Meal Cost",
    value: "৳21,240.00",
    icon: <Calculator className="text-purple-500 w-6 h-6" />,
    bg: "bg-purple-50",
  },
  {
    title: "Meal Rate",
    value: "৳56.30",
    icon: <Coins className="text-pink-500 w-6 h-6" />,
    bg: "bg-pink-50",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`rounded-xl shadow p-4 flex items-center gap-4 ${item.bg}`}
        >
          <div className="bg-white p-2 rounded-full shadow-sm">{item.icon}</div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">{item.title}</h4>
            <p className="text-lg font-bold text-gray-800">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

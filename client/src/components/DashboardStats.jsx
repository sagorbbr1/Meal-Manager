import React, { useEffect, useState } from "react";
import { Banknote, Utensils, Wallet, Calculator, Coins } from "lucide-react";
import API from "../utils/axios";

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/mess/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Failed to load stats.</p>;

  const statCards = [
    {
      title: "Mess Balance",
      value: `৳${(stats?.messBalance ?? 0).toFixed(2)}`,
      icon: <Wallet className="text-emerald-600 w-6 h-6" />,
      bg: "bg-emerald-50",
    },
    {
      title: "Total Deposit",
      value: `৳${(stats?.totalDeposit ?? 0).toFixed(2)}`,
      icon: <Banknote className="text-green-500 w-6 h-6" />,
      bg: "bg-green-50",
    },
    {
      title: "Total Meal",
      value: (stats?.totalMeal ?? 0).toFixed(2),
      icon: <Utensils className="text-orange-500 w-6 h-6" />,
      bg: "bg-orange-50",
    },
    {
      title: "Total Meal Cost",
      value: `৳${(stats?.totalCost ?? 0).toFixed(2)}`,
      icon: <Calculator className="text-purple-500 w-6 h-6" />,
      bg: "bg-purple-50",
    },
    {
      title: "Meal Rate",
      value: `৳${(stats?.mealRate ?? 0).toFixed(2)}`,
      icon: <Coins className="text-pink-500 w-6 h-6" />,
      bg: "bg-pink-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
      {statCards.map((item, index) => (
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

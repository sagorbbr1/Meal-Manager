import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import Spinner from "./Spinner";

const MyMealInfo = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/users/my-stats");
        setStats(res.data);
      } catch (error) {
        console.error(
          "Failed to load meal stats:",
          error.response?.data || error.message
        );
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Spinner />;
  if (!stats)
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load data.
      </p>
    );

  const safeNum = (num) => {
    const n = Number(num);
    return isNaN(n) ? 0 : n;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="My Total Meal"
        value={safeNum(stats.totalMeal)}
        suffix=""
      />
      <StatCard
        label="My Deposit"
        value={safeNum(stats.totalDeposit)}
        suffix="৳"
      />
      <StatCard label="My Cost" value={safeNum(stats.totalCost)} suffix="৳" />
      <StatCard label="My Balance" value={safeNum(stats.balance)} suffix="৳" />
    </div>
  );
};

const StatCard = ({ label, value, suffix }) => (
  <div className="bg-white rounded-2xl shadow p-4 text-center">
    <p className="text-2xl font-semibold text-emerald-600">
      {value.toFixed(2)} {suffix}
    </p>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);

export default MyMealInfo;

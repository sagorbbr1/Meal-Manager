import React from "react";

const MealStats = () => {
  const statCards = [
    { title: "Today's Meals", value: "12", note: "Meals served today" },
    { title: "Total Expense", value: "৳3200", note: "This month" },
    { title: "Members", value: "8", note: "Active this month" },
    { title: "Reports", value: "5", note: "Submitted this week" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
        >
          <h2 className="text-md font-medium text-emerald-600">{card.title}</h2>
          <p className="text-2xl font-bold mt-2">{card.value}</p>
          <p className="text-sm text-gray-500">{card.note}</p>
        </div>
      ))}
    </div>
  );
};

export default MealStats;

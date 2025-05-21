import React from "react";

const memberMealStats = [
  {
    id: 1,
    name: "Mohammad Sagor",
    totalMeal: 27.5,
    totalDeposit: 1555.0,
    mealCost: 1548.31,
    totalCost: 1548.31,
    balance: 6.69,
  },
  {
    id: 2,
    name: "Fahim MKT",
    totalMeal: 58.0,
    totalDeposit: 3045.0,
    mealCost: 3265.53,
    totalCost: 3265.53,
    balance: -220.53,
  },
];

const MealDetails = ({ members }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
        Meal Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members &&
          members.map((member) => {
            const stats = member.mealStats || {
              totalMeal: 0,
              totalDeposit: 0,
              mealCost: 0,
              totalCost: 0,
              balance: 0,
            };

            return (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow p-5 space-y-2 border border-emerald-100"
              >
                <h3 className="text-lg font-semibold text-emerald-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-700">
                  🍽️ Total Meal:{" "}
                  <span className="font-medium">{stats.totalMeal}</span>
                </p>
                <p className="text-sm text-gray-700">
                  💰 Total Deposit:{" "}
                  <span className="font-medium">
                    ৳{stats.totalDeposit.toFixed(2)}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  🍛 Meal Cost:{" "}
                  <span className="font-medium">
                    ৳{stats.mealCost.toFixed(2)}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  📊 Total Cost:{" "}
                  <span className="font-medium">
                    ৳{stats.totalCost.toFixed(2)}
                  </span>
                </p>
                <p
                  className={`text-sm font-semibold ${
                    stats.balance < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  💼 Balance: ৳{stats.balance.toFixed(2)}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MealDetails;

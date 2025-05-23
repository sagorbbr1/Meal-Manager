import React from "react";

const MealDetails = ({ members }) => {
  const safe = (val) => (typeof val === "number" ? val.toFixed(2) : "0.00");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
        Meal Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members &&
          members.map((member) => {
            const stats = member.mealStats || {};

            const totalMeal = stats.totalMeal ?? 0;
            const totalDeposit = stats.totalDeposit ?? 0;
            const mealCost = stats.mealCost ?? 0;
            const totalCost = stats.totalCost ?? 0;
            const balance = stats.balance ?? 0;

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
                  <span className="font-medium">{totalMeal}</span>
                </p>
                <p className="text-sm text-gray-700">
                  💰 Total Deposit:{" "}
                  <span className="font-medium">৳{safe(totalDeposit)}</span>
                </p>
                <p className="text-sm text-gray-700">
                  🍛 Meal Cost:{" "}
                  <span className="font-medium">৳{safe(mealCost)}</span>
                </p>

                <p
                  className={`text-sm font-semibold ${
                    balance < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  💼 Balance: ৳{safe(balance)}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MealDetails;

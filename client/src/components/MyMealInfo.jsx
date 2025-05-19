import React from "react";

const myMealData = {
  totalMeal: 27.5,
  deposit: 1555.0,
  cost: 1548.31,
  balance: 6.69,
};

const MyMealInfo = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl shadow p-4 text-center">
        <p className="text-2xl font-semibold text-emerald-600">
          {myMealData.totalMeal}
        </p>
        <p className="text-sm text-gray-500 mt-1">My Total Meal</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 text-center">
        <p className="text-2xl font-semibold text-emerald-600">
          {myMealData.deposit.toFixed(2)} ৳
        </p>
        <p className="text-sm text-gray-500 mt-1">My Deposit</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 text-center">
        <p className="text-2xl font-semibold text-emerald-600">
          {myMealData.cost.toFixed(2)} ৳
        </p>
        <p className="text-sm text-gray-500 mt-1">My Cost</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 text-center">
        <p className="text-2xl font-semibold text-emerald-600">
          {myMealData.balance.toFixed(2)} ৳
        </p>
        <p className="text-sm text-gray-500 mt-1">My Balance</p>
      </div>
    </div>
  );
};

export default MyMealInfo;

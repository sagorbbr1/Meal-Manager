import React from "react";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import DashboardStats from "../components/DashboardStats";
import MealDetails from "../components/MealDetails";
import Chart from "../components/Chart";
import MealStats from "../components/MealStats";
import MyMealInfo from "../components/MyMealInfo";
import { useMess } from "../context/MessContext";

const Dashboard = () => {
  const { mess } = useMess();
  return (
    <>
      <div className="flex h-screen bg-gradient-to-tr from-emerald-50 to-white overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-auto">
          <HeaderNav mess={mess} />
          <main className="p-4 sm:p-6 max-w-7xl mx-auto space-y-10">
            <h2 className="text-lg font-medium text-emerald-600 mb-4">
              Monthly Overview
            </h2>
            <div>
              <p className="text-gray-600">
                Here's a quick overview of your mess data.
              </p>
            </div>

            <DashboardStats />

            <MealStats />
            <MyMealInfo />

            <div className="bg-white rounded-xl shadow p-6">
              <MealDetails />
              <div className="h-64 w-full flex items-center justify-center">
                <Chart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

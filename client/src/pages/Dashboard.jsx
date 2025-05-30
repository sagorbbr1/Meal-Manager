import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import DashboardStats from "../components/DashboardStats";
import MealDetails from "../components/MealDetails";
import Chart from "../components/Chart";
import MyMealInfo from "../components/MyMealInfo";
import { useMess } from "../context/MessContext";
import API from "../utils/axios";

const Dashboard = () => {
  const { mess } = useMess();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await API.get("/users/my-members", { withCredentials: true });
      setMembers(res.data.members);
    };

    fetchMembers();
  }, []);

  return (
    <>
      {mess && (
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

              <MyMealInfo />

              <div className="bg-white rounded-xl shadow p-6">
                <MealDetails members={members} />
                <div className="h-64 w-full flex items-center justify-center">
                  <Chart members={members} />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}

      {!mess && (
        <div className="flex items-center justify-center h-screen bg-emerald-50">
          <h1 className="text-2xl font-bold text-emerald-600">
            Please create or join a mess to access the dashboard.
          </h1>
        </div>
      )}
    </>
  );
};

export default Dashboard;

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Members", icon: Users, path: "/dashboard/members" },
    { name: "Reports", icon: FileText, path: "/dashboard/reports" },
    { name: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-tr from-emerald-50 to-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-emerald-600">Meal Manager</h2>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {navLinks.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-700 ${
                location.pathname === path
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)} // auto close on mobile after click
            >
              <Icon size={20} />
              {name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center p-4 shadow-sm bg-white">
          <button
            className="mr-4"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-emerald-600">Dashboard</h1>
        </header>

        {/* Content Area */}
        <main className="p-6 max-w-7xl mx-auto space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-emerald-700 mb-1">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Here's a quick overview of your mess data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-medium text-emerald-600">
                Today's Meals
              </h2>
              <p className="text-3xl font-bold mt-2">12</p>
              <p className="text-sm text-gray-500">Meals served today</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-medium text-emerald-600">
                Total Expense
              </h2>
              <p className="text-3xl font-bold mt-2">৳3200</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-medium text-emerald-600">Members</h2>
              <p className="text-3xl font-bold mt-2">8</p>
              <p className="text-sm text-gray-500">Active this month</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-medium text-emerald-600 mb-4">
              Monthly Overview
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              [ Graph / Chart will go here ]
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

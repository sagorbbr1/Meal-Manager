import React from "react";
import { Bell, Info, UserCircle, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

const HeaderNav = () => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-emerald-50 shadow-sm z-20">
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        <div className="text-emerald-700 text-xl font-bold">
          <h2>
            {user && user.name
              ? `Welcome back, ${user.name} 👋`
              : "Welcome to Meal Manager 🍽️"}
          </h2>
        </div>

        <div className="flex gap-6 items-center">
          <Link to="/dashboard">
            <LayoutDashboard className="w-6 h-6 text-emerald-600 cursor-pointer" />
          </Link>
          {/* <Link to="/notifications">
            {" "}
            <Bell className="w-6 h-6 text-gray-500 hover:text-emerald-600 cursor-pointer" />
          </Link> */}
          <Link to="/info">
            <Info className="w-6 h-6 text-gray-500 hover:text-emerald-600 cursor-pointer" />
          </Link>
          <Link to="/profile">
            <UserCircle className="w-6 h-6 text-gray-500 hover:text-emerald-600 cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t z-50">
        <div className="flex justify-around items-center py-3">
          <Link to="/dashboard">
            <LayoutDashboard className="w-6 h-6 text-emerald-600" />
          </Link>

          {/* <Link to="/notifications">
            <Bell className="w-6 h-6 text-gray-500 hover:text-emerald-600" />
          </Link> */}

          <Link to="/info">
            <Info className="w-6 h-6 text-gray-500 hover:text-emerald-600" />
          </Link>

          <Link to="/profile">
            <UserCircle className="w-6 h-6 text-gray-500 hover:text-emerald-600" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;

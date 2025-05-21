import React from "react";
import { Bell, Info, UserCircle, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const HeaderNav = ({ mess = name }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="w-full bg-emerald-50 shadow-sm z-20">
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        <div className="text-emerald-700 text-xl font-bold">
          <h2>{user && user.name ? `Hello, ${user.name}` : "Meal Manager"}</h2>
        </div>

        <div className="flex gap-6 items-center">
          {mess && (
            <LayoutDashboard
              onClick={() => navigate("/dashboard")}
              className="w-6 h-6 text-emerald-600 cursor-pointer"
            />
          )}
          <Bell className="w-6 h-6 text-gray-500 hover:text-emerald-600 cursor-pointer" />
          <Info className="w-6 h-6 text-gray-500 hover:text-emerald-600 cursor-pointer" />
          <UserCircle
            onClick={() => navigate("/profile")}
            className="w-6 h-6 text-gray-500 hover:text-emerald-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t z-50">
        <div className="flex justify-around items-center py-3">
          <LayoutDashboard className="w-6 h-6 text-emerald-600" />
          <Bell className="w-6 h-6 text-gray-500 hover:text-emerald-600" />
          <Info className="w-6 h-6 text-gray-500 hover:text-emerald-600" />
          <UserCircle className="w-6 h-6 text-gray-500 hover:text-emerald-600" />
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;

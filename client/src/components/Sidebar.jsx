import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Utensils,
  HandCoins,
  LogOut,
  Menu,
  CircleDollarSign,
  Settings,
  X,
  Trash2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import { handleLogout } from "../utils/logout";
import { useMess } from "../context/MessContext";
import logo from "../assets/logo.jpg";

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const { mess } = useMess();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Members", icon: Users, path: "/dashboard/members" },
    { name: "Add Member", icon: UserPlus, path: "/dashboard/add-member" },
    { name: "Add Meal", icon: Utensils, path: "/dashboard/add-meal" },
    { name: "Add Deposite", icon: FileText, path: "/dashboard/add-deposite" },
    { name: "Add Cost", icon: HandCoins, path: "/dashboard/add-cost" },
    { name: "Cost List", icon: CircleDollarSign, path: "/dashboard/all-costs" },
    { name: "Reports", icon: FileText, path: "/dashboard/reports" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const logout = () => {
    handleLogout(navigate, setUser);
  };

  const handleDeleteMess = async (mess) => {
    if (!mess) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mess? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/mess/delete/${mess._id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Mess deleted successfully.");
        setUser(null); // Logout or reset local user
        navigate("/create-your-mess");
      } else {
        alert("Failed to delete mess. Try again.");
      }
    } catch (error) {
      console.error("Error deleting mess:", error);
      alert(
        error?.response?.data?.message ||
          "Something went wrong during deletion."
      );
    }
  };

  return (
    <>
      <header className="md:hidden flex items-center justify-between p-4 shadow bg-white fixed top-0 left-0 right-0 z-50">
        <button onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-emerald-600">
          <img
            className="logo text-center mx-auto"
            src={logo}
            alt="meal manager"
          />

          {mess && mess.name}
        </h2>
        <div className="w-6" />
      </header>

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
        <div className="hidden md:flex items-center justify-between p-3 border-b">
          <h4 className="text-2xl font-bold text-emerald-600">
            <div className="flex items-center gap-2">
              <img className="logo-small" src={logo} alt="meal manager" />

              <span>{mess && mess.name}</span>
            </div>
          </h4>
        </div>

        <div className="flex md:hidden justify-end p-4">
          <button
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
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-700 ${
                location.pathname === path
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-700"
              }`}
            >
              <Icon size={20} />
              {name}
            </Link>
          ))}

          <button
            onClick={() => handleDeleteMess(mess)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-700 text-gray-700"
          >
            <Trash2 size={20} /> Delete Mess
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-700 text-gray-700"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

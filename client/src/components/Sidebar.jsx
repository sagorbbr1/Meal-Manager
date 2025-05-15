import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Members", icon: Users, path: "/dashboard/members" },
    { name: "Reports", icon: FileText, path: "/dashboard/reports" },
    { name: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-tr from-emerald-50 to-white">
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static w-72 bg-white shadow-lg transition-transform duration-300 z-40`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-emerald-600">Meal Manager</h2>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {links.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-700 ${
                location.pathname === path
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-700"
              }`}
            >
              <Icon size={20} /> {name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 overflow-auto">
        <div className="md:hidden flex items-center p-4">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <h1 className="ml-4 text-xl font-bold text-emerald-600">Dashboard</h1>
        </div>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;

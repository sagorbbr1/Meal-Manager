import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-600">
          <img className="logo" src={logo} alt="meal manager" />
        </h1>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-slate-700 hover:text-emerald-600 transition"
          >
            Home
          </a>
          <a
            href="#"
            className="text-slate-700 hover:text-emerald-600 transition"
          >
            Features
          </a>
          <a
            href="#"
            className="text-slate-700 hover:text-emerald-600 transition"
          >
            Contact
          </a>
          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Login
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-slate-700 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden px-4"
          >
            <div className="flex flex-col items-start gap-2 py-4">
              <a
                href="#"
                className="text-slate-700 hover:text-emerald-600 transition w-full"
              >
                Home
              </a>
              <a
                href="#"
                className="text-slate-700 hover:text-emerald-600 transition w-full"
              >
                Features
              </a>
              <a
                href="#"
                className="text-slate-700 hover:text-emerald-600 transition w-full"
              >
                Contact
              </a>
              <button className="w-full mt-2 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition">
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

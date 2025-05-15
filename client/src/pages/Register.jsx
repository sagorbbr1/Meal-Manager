import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API from "../../utils/axios";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register", formData, {
        withCredentials: true,
      });

      if (res.status !== 201) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      toast.success("Registration successful!");
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      toast.error(err?.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">
            Create a Meal Manager Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

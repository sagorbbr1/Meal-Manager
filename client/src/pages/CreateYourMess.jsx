import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import { toast, ToastContainer } from "react-toastify";
import API from "../utils/axios";

const CreateYourMess = () => {
  const [messName, setMessName] = useState("");
  const [month, setMonth] = useState("");
  const [role, setRole] = useState("member");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMess = async () => {
      try {
        const res = await API.get("/mess/mine", { withCredentials: true });
        if (res.data?.mess) {
          navigate("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Mess check failed", err);
        setLoading(false);
      }
    };
    checkMess();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messName || !month || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      const res = await API.post(
        "/mess/create",
        { name: messName, month, role },
        { withCredentials: true }
      );

      console.log("Mess created:", res.data);
      setShowModal(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to create mess:", err);
      toast.error("Something went wrong!");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (loading)
    return (
      <div className="text-center p-10 text-emerald-600 text-lg">
        Loading...
      </div>
    );

  return (
    <>
      <ToastContainer />
      <HeaderNav />

      <div className="flex items-center justify-center h-screen bg-emerald-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-emerald-700">
            Create Your Mess
          </h2>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Mess Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              value={messName}
              onChange={(e) => setMessName(e.target.value)}
              placeholder="Enter your mess name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Month</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">-- Select Month --</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="manager">Manager</option>
              <option value="member">Member</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md font-medium"
          >
            Create Mess
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-emerald-50 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Are you sure you want to create this mess?
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Once created, you’ll be redirected to your dashboard.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateYourMess;

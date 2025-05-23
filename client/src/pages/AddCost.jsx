import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import API from "../utils/axios";

const AddCost = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    amount: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/costs/add-cost", {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      alert("Cost added successfully!");
      setFormData({
        title: "",
        date: "",
        amount: "",
        note: "",
      });
    } catch (err) {
      console.error("Error adding cost:", err);
      alert("Failed to add cost.");
    }
  };

  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderNav />
        <main className="p-6 max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Add Mess Cost
            </h1>
            <p className="text-gray-600">
              Record any mess-related expense (e.g., bajar, gas bill)
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-xl p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="E.g., Bajar, Gas Bill"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (৳)
                </label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="E.g., Paid via cash/bKash"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Add Cost
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddCost;

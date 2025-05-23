import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import API from "../utils/axios";
import Spinner from "../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
``;

const AddDeposit = () => {
  const [formData, setFormData] = useState({
    member: "",
    date: "",
    amount: "",
    note: "",
  });

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get("/users/my-members");
        setMembers(res.data.members || []);
      } catch (err) {
        console.error("Error fetching members:", err);
        alert("Could not load members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      const res = await API.post("/deposit/add-deposit", payload);

      toast.success("Deposit added successfully!");
      setFormData({ member: "", date: "", amount: "", note: "" });
    } catch (error) {
      toast.error(
        "Error adding deposit:",
        error.response?.data || error.message
      );
      toast.error("Failed to add deposit. Please try again.");
    }
  };
  if (loading) return <Spinner />;

  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />
      <ToastContainer />
      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderNav />
        <main className="p-6 max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Add Deposit
            </h1>
            <p className="text-gray-600">
              Record a deposit made by a member here.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-xl p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Member Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Member
                </label>
                <select
                  name="member"
                  value={formData.member}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Select Member --</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
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

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (৳)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Bkash, Cash, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Add Deposit
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddDeposit;

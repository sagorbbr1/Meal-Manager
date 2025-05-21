import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import API from "../utils/axios";

const AddMeal = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users/my-members");
        setUsers(res.data.members || []);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const updateMealCount = async (userId, delta) => {
    try {
      const res = await API.patch(`/users/${userId}/meal`, { delta });
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? res.data : user))
      );
    } catch (error) {
      console.error(
        "Failed to update meal count:",
        error.response?.data || error.message
      );
      alert("Could not update meal count");
    }
  };

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading users...</p>;

  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderNav />
        <main className="p-6 max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-6">
            Manage Meals
          </h1>
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            {users.length === 0 && (
              <p className="text-center text-gray-500">No members found.</p>
            )}
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between border-b py-2"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <img
                    src={
                      user.avatar || `https://i.pravatar.cc/150?u=${user._id}`
                    }
                    alt={`${user.name} avatar`}
                    className="w-12 h-12 rounded-full object-cover border border-emerald-300"
                  />
                  <p className="font-semibold text-lg text-gray-800 truncate max-w-xs mr-1">
                    {user.name}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateMealCount(user._id, -1)}
                    className="p-2 bg-red-200 rounded hover:bg-red-300"
                    aria-label={`Decrease meal count for ${user.name}`}
                  >
                    <Minus size={18} color="#b91c1c" />
                  </button>
                  <span className="font-mono text-lg">
                    {user.mealStats?.totalMeal ?? 0}
                  </span>
                  <button
                    onClick={() => updateMealCount(user._id, 1)}
                    className="p-2 bg-green-200 rounded hover:bg-green-300"
                    aria-label={`Increase meal count for ${user.name}`}
                  >
                    <Plus size={18} color="#15803d" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddMeal;

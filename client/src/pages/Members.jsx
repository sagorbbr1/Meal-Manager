import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { Pencil, Trash2, Plus, UserCircle } from "lucide-react";
import API from "../utils/axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get("/users/my-members", {
          withCredentials: true,
        });
        setMembers(res.data.members);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await API.delete(`/users/delete/${id}`);
      toast("🗑️ Deleted successfully");
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
    } catch (err) {
      toast(err.message || "Failed to delete member");
    }
  };

  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderNav />
        <main className="p-6 max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-emerald-700">Members</h1>
              <p className="text-gray-600">All registered members are here.</p>
            </div>
            <Link
              to="/dashboard/add-member"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md transition"
            >
              <Plus size={18} />
              Add Member
            </Link>
          </div>

          {loading ? (
            <Spinner authLoading={loading} />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <UserCircle size={48} className="text-emerald-600" />
                    <div>
                      <h2 className="text-lg font-semibold text-emerald-700">
                        {member.name}
                      </h2>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-sm text-gray-400">
                        Joined: {new Date(member.joined).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-auto sm:ml-0">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditData({
                          id: member.id,
                          name: member.name,
                          email: member.email,
                        });
                      }}
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600">
                      <Trash2
                        size={16}
                        onClick={() => handleDeleteMember(member.id)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-50 bg-opacity-30">
              <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4 shadow-lg">
                <h2 className="text-lg font-bold text-emerald-700">
                  Edit Member
                </h2>

                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Email"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await API.put(`/users/edit/${editData.id}`, editData);
                        toast("✅ Member updated!");
                        setMembers((prev) =>
                          prev.map((m) =>
                            m.id === editData.id ? { ...m, ...editData } : m
                          )
                        );
                        setIsEditing(false);
                      } catch (err) {
                        toast.error("Failed to update member");
                      }
                    }}
                    className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Members;

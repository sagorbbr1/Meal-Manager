import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { Pencil, Trash2, Plus } from "lucide-react";
import API from "../utils/axios";
import Spinner from "../components/Spinner";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                    />
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
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600">
                      <Pencil size={16} />
                    </button>
                    <button className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Members;

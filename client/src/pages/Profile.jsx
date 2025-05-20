import React from "react";
import HeaderNav from "../components/HeaderNav";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useMess } from "../context/MessContext";
import { handleLogout } from "../utils/logout";
import Spinner from "../components/Spinner";

const Profile = () => {
  const { user, setUser, authLoading } = useAuth();
  const { mess, messLoading } = useMess();
  const navigate = useNavigate();

  if (authLoading)
    return (
      <>
        <Spinner authLoading={messLoading} />
      </>
    );

  if (!user) return <p className="text-center text-red-500">Not logged in</p>;

  const logout = () => {
    handleLogout(navigate, setUser);
  };

  return (
    <>
      <HeaderNav />
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-xl rounded-xl max-w-md w-full p-8 space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt="avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-emerald-700">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Role:</span>
              <span className="text-gray-800">{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Joined:</span>
              <span className="text-gray-800">
                {new Date(user?.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Mess:</span>
              <span className="text-gray-800">{mess?.name}</span>
            </div>
          </div>

          <div className="pt-4 flex justify-between gap-4">
            <button
              onClick={() => navigate("/edit-profile")}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

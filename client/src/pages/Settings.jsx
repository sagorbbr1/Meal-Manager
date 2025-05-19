import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Mohammad Sagor",
    email: "sagor@example.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }
    console.log("Password updated:", passwords);
  };

  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderNav />
        <main className="p-6 max-w-4xl mx-auto space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Settings
            </h1>
            <p className="text-gray-600">
              Manage your profile and account settings.
            </p>
          </div>

          <form
            onSubmit={handleProfileSubmit}
            className="bg-white p-6 rounded-xl shadow space-y-6"
          >
            <h2 className="text-xl font-semibold text-emerald-600">
              Profile Info
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Update Profile
              </button>
            </div>
          </form>

          {/* Password Change */}
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white p-6 rounded-xl shadow space-y-6"
          >
            <h2 className="text-xl font-semibold text-emerald-600">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Update Password
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Settings;

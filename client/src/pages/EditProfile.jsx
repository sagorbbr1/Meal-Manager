import React, { useState } from "react";
import HeaderNav from "../components/HeaderNav";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "Mohammad Sagor",
    email: "sagor@example.com",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log("Updated info:", formData);
    alert("Profile updated successfully 🚀");
  };

  return (
    <>
      <HeaderNav />

      <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-lg rounded-xl max-w-md w-full p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-emerald-700">
            Edit Profile
          </h2>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Leave blank to keep current"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;

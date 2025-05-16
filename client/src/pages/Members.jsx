import React from "react";
import Sidebar from "../components/Sidebar";

const members = [
  {
    id: 1,
    name: "Rakib Hossain",
    email: "rakib@example.com",
    joined: "2024-11-01",
  },
  {
    id: 2,
    name: "Jannat Akter",
    email: "jannat@example.com",
    joined: "2024-12-15",
  },
  {
    id: 3,
    name: "Shuvo Das",
    email: "shuvo@example.com",
    joined: "2025-01-20",
  },
];

const Members = () => {
  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto">
        <main className="p-6 max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Members
            </h1>
            <p className="text-gray-600">
              Here’s a list of all registered members.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow max-w-full">
            <table className="min-w-[600px] w-full divide-y divide-gray-200">
              <thead className="bg-emerald-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Name
                  </th>

                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {members.map((member, index) => (
                  <tr
                    key={member.id}
                    className="hover:bg-emerald-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.name}
                    </td>

                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {member.email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Members;

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import API from "../utils/axios";
import { useMess } from "../context/MessContext";

const CostList = () => {
  const { mess } = useMess();
  const [costs, setCosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // You can dynamically get the current month/year if needed
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const messId = mess?._id;

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const res = await API.get("/costs/all-costs", {
          params: {
            mess: messId && messId,
            month,
            year,
          },
        });
        setCosts(res.data.costs);
        setTotal(res.data.total);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch costs:", err);
        setLoading(false);
      }
    };

    fetchCosts();
  }, [messId, month, year]);

  return (
    <div className="flex h-screen bg-emerald-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderNav />

        <main className="p-6 max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Mess Cost List
            </h1>
            <p className="text-gray-600">
              Overview of bajaar and other mess-related costs
            </p>
          </div>

          {loading ? (
            <p>Loading costs...</p>
          ) : (
            <>
              <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Total Cost:{" "}
                  <span className="text-emerald-600">৳{total.toFixed(2)}</span>
                </h2>

                <ul className="divide-y">
                  {costs.map((cost) => (
                    <li key={cost._id} className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">{cost.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(cost.date).toLocaleDateString()}{" "}
                            {cost.note && `• ${cost.note}`}
                          </p>
                        </div>
                        <span className="text-emerald-700 font-semibold">
                          ৳{cost.amount.toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CostList;

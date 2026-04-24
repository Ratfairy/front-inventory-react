import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../utils/routes";

export default function AdjustmentIndex() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");

  const [data] = useState([
    { id: 1, item: "Kertas HVS", adjustment: -2, status: "WAITING" },
    { id: 2, item: "Pulpen", adjustment: 3, status: "APPROVED" },
    { id: 3, item: "Buku", adjustment: -1, status: "WAITING" },
  ]);

  const getStatusStyle = (status) => {
    if (status === "WAITING")
      return "bg-yellow-100 text-yellow-700";
    if (status === "APPROVED")
      return "bg-green-100 text-green-700";
    if (status === "REJECTED")
      return "bg-red-100 text-red-700";
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Stock Adjustment
        </h1>

        <div className="flex items-center gap-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="admin">Admin</option>
            <option value="approver">Approver</option>
          </select>

          {role === "admin" && (
            <button
              onClick={() => navigate(ROUTES.ADJUSTMENT_CREATE)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition"
            >
              + Create
            </button>
          )}
        </div>
      </div>

      {/* CARD TABLE */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Item</th>
              <th className="px-6 py-3 text-left">Adjustment</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((row, i) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">

                <td className="px-6 py-4 text-gray-500">{i + 1}</td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {row.item}
                </td>

                <td
                  className={`px-6 py-4 font-semibold ${
                    row.adjustment < 0
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {row.adjustment}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>
                      navigate(`/stock/adjustment/${row.id}`)
                    }
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs transition"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../utils/routes";

export default function StockOpnameIndex() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");

  const [data, setData] = useState([
    {
      id: 1,
      date: "2024-01-10",
      pic: "Andi",
      status: "WAITING",
      items: [
        { name: "Kertas HVS", system: 5, actual: 3, adjustment: -2 },
      ],
    },
  ]);

  const handleApprove = (id) => {
    setData(data.map(d =>
      d.id === id ? { ...d, status: "APPROVED" } : d
    ));
  };

  const handleReject = (id) => {
    setData(data.map(d =>
      d.id === id ? { ...d, status: "REJECTED" } : d
    ));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Stock Opname</h1>

        <div className="flex gap-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="admin">Admin Gudang</option>
            <option value="approver">Approver</option>
          </select>

          {role === "admin" && (
            <button
              onClick={() => navigate(ROUTES.STOCK_OPNAME_CREATE)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Create
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow border">
        {data.map(batch => (
          <div key={batch.id} className="p-4 border-b">

            <div className="flex justify-between">
              <div>
                <div className="font-semibold">
                  Opname #{batch.id}
                </div>
                <div className="text-sm text-gray-500">
                  {batch.date} - {batch.pic}
                </div>
              </div>

              <span className="text-sm bg-yellow-100 px-2 py-1 rounded">
                {batch.status}
              </span>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() =>
                  navigate(`/stock/stockOpname/${batch.id}`)
                }
                className="bg-gray-100 px-3 py-1 rounded text-sm"
              >
                View
              </button>

              {role === "approver" && batch.status === "WAITING" && (
                <>
                  <button
                    onClick={() => handleApprove(batch.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(batch.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../../../utils/routes";
import { getAllOpnames } from "../../../api/services/stockOpnameService";

export default function StockOpnameIndex() {
  const navigate = useNavigate();
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpnames();
  }, []);

  const fetchOpnames = async () => {
    try {
      setLoading(true);
      const res = await getAllOpnames();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "WAITING")  return "bg-yellow-100 text-yellow-700";
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Stock Opname</h1>
        <button
          onClick={() => navigate(ROUTES.STOCK_OPNAME_CREATE)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Create
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow border">
        {data.length === 0 ? (
          <div className="p-6 text-center text-gray-400">Tidak ada data</div>
        ) : (
          data.map(batch => (
            <div key={batch.id} className="p-4 border-b">

              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Opname #{batch.id}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(batch.date).toLocaleDateString("id-ID")} - {batch.pic}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(batch.status)}`}>
                  {batch.status}
                </span>
              </div>

              <div className="mt-3">
                <button
                  onClick={() => navigate(`/stock/stockOpname/${batch.id}`)}
                  className="bg-gray-100 px-3 py-1 rounded text-sm"
                >
                  View
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
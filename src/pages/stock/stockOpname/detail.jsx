import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../../../utils/routes";
import {
  getOpnameById,
  updateOpnameStatus
} from "../../../api/services/stockOpnameService";

export default function StockOpnameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpname();
  }, [id]);

  const fetchOpname = async () => {
    try {
      setLoading(true);
      const res = await getOpnameById(id);
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

  const handleUpdateStatus = async (status) => {
    try {
      const res = await updateOpnameStatus(id, { status });
      setData(res.data);
      alert(`Opname berhasil ${status === "APPROVED" ? "diapprove" : "direject"}!`);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal update status");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  if (!data) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <button
        onClick={() => navigate(ROUTES.STOCK_OPNAME)}
        className="text-blue-600 mb-4 text-sm hover:underline"
      >
        ← Back
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Detail Opname #{data.id}
        </h1>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(data.status)}`}>
          {data.status}
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        {/* INFO */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-400">Tanggal</p>
            <p className="font-medium">{new Date(data.date).toLocaleDateString("id-ID")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">PIC</p>
            <p className="font-medium">{data.pic}</p>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full mt-4 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-center">System</th>
              <th className="p-3 text-center">Actual</th>
              <th className="p-3 text-center">Adj</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.items.map((i, idx) => (
              <tr key={idx}>
                <td className="p-3">{i.itemName}</td>
                <td className="p-3 text-center">{i.systemQty}</td>
                <td className="p-3 text-center">{i.actualQty}</td>
                <td className={`p-3 text-center font-semibold ${
                  i.adjustment < 0 ? "text-red-500"
                  : i.adjustment > 0 ? "text-green-500"
                  : "text-gray-400"
                }`}>
                  {i.adjustment > 0 ? `+${i.adjustment}` : i.adjustment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ACTION */}
        {data.status === "WAITING" && (
          <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
            <button
              onClick={() => handleUpdateStatus("APPROVED")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => handleUpdateStatus("REJECTED")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Reject
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
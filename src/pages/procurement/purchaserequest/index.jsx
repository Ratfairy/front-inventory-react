import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { getAllPRs, deletePR } from "../../../api/services/purchaseRequestService";

const STATUS_STYLE = {
  "DRAFT":            "bg-gray-100 text-gray-600",
  "WAITING_APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

export default function PurchaseRequestIndex() {
  const navigate = useNavigate();
  const [data, setData]                 = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [search, setSearch]             = useState("");
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    fetchPRs();
  }, []);

  const fetchPRs = async () => {
    try {
      setLoading(true);
      const res = await getAllPRs();
      setData(res.data);
    } catch (err) {
      setError("Gagal memuat data Purchase Request");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const filtered = data.filter(d => {
    const matchStatus = filterStatus === "ALL" || d.status === filterStatus;
    const matchSearch =
      d.prNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.department.toLowerCase().includes(search.toLowerCase()) ||
      d.pic.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Purchase Request</h1>
        <button
          onClick={() => navigate(ROUTES.PURCHASE_REQUEST_CREATE)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Buat PR
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Cari PR, dept, PIC..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ALL">Semua Status</option>
          <option value="DRAFT">Draft</option>
          <option value="WAITING_APPROVAL">Waiting Approval</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">No PR</th>
              <th className="px-6 py-3 text-left">Departemen</th>
              <th className="px-6 py-3 text-left">PIC</th>
              <th className="px-6 py-3 text-left">Tgl Dibutuhkan</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filtered.map((pr) => (
                <tr key={pr.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {pr.prNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{pr.department}</td>
                  <td className="px-6 py-4 text-gray-600">{pr.pic}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(pr.neededDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatRupiah(pr.grandTotal)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[pr.status]}`}>
                      {pr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/procurement/purchaserequest/${pr.id}`)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs transition"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
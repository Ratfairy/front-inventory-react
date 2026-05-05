import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { getAllPRs } from "../../../api/services/purchaseRequestService";

const STATUS_STYLE = {
  "WAITING_APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

export default function ReviewPRIndex() {
  const navigate = useNavigate();
  const [data, setData]           = useState([]);
  const [activeTab, setActiveTab] = useState("waiting");
  const [search, setSearch]       = useState("");
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetchPRs();
  }, []);

  const fetchPRs = async () => {
    try {
      setLoading(true);
      const res = await getAllPRs();
      // Filter hanya yang WAITING_APPROVAL, APPROVED, REJECTED
      setData(res.data.filter(pr =>
        ["WAITING_APPROVAL", "APPROVED", "REJECTED"].includes(pr.status)
      ));
    } catch (err) {
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

  const waiting = data.filter(d =>
    d.status === "WAITING_APPROVAL" &&
    (d.prNumber.toLowerCase().includes(search.toLowerCase()) ||
     d.department.toLowerCase().includes(search.toLowerCase()) ||
     d.pic.toLowerCase().includes(search.toLowerCase()))
  );

  const processed = data.filter(d =>
    d.status !== "WAITING_APPROVAL" &&
    (d.prNumber.toLowerCase().includes(search.toLowerCase()) ||
     d.department.toLowerCase().includes(search.toLowerCase()) ||
     d.pic.toLowerCase().includes(search.toLowerCase()))
  );

  const activeData = activeTab === "waiting" ? waiting : processed;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Review Purchase Request</h1>
        <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">
          {waiting.length} Waiting
        </span>
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("waiting")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "waiting"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Waiting Approval
          {waiting.length > 0 && (
            <span className="ml-2 bg-yellow-400 text-white text-xs rounded-full px-1.5 py-0.5">
              {waiting.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("processed")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === "processed"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sudah Diproses
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari PR, dept, PIC..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

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
            {activeData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              activeData.map((pr) => (
                <tr key={pr.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{pr.prNumber}</td>
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
                      onClick={() => navigate(`/procurement/reviewpr/${pr.id}`)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs transition"
                    >
                      {activeTab === "waiting" ? "Review" : "Detail"}
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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { getAllPOs } from "../../../api/services/purchaseOrderService";

const STATUS_STYLE = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT:  "bg-blue-100 text-blue-600",
};

export default function PurchaseOrderIndex() {
  const navigate = useNavigate();
  const [data, setData]       = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPOs();
  }, []);

  const fetchPOs = async () => {
    try {
      setLoading(true);
      const res = await getAllPOs();
      setData(res.data);
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

  const filtered = data.filter(po =>
    po.poNumber.toLowerCase().includes(search.toLowerCase()) ||
    po.prNumber.toLowerCase().includes(search.toLowerCase()) ||
    po.supplier.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Purchase Order</h1>
        <button
          onClick={() => navigate(ROUTES.PURCHASE_ORDER_CREATE)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Buat PO
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari PO, PR, supplier..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">No PO</th>
              <th className="px-6 py-3 text-left">No PR</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filtered.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{po.poNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{po.prNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{po.supplier}</td>
                  <td className="px-6 py-4 text-gray-600">{formatRupiah(po.grandTotal)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[po.status]}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/procurement/purchaseorder/${po.id}`)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs transition"
                    >
                      {po.status === "DRAFT" ? "Edit" : "Detail"}
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const dummyReceive = [
  {
    id: 1,
    poNumber: "PO-2026-001",
    prNumber: "PR-2026-001",
    supplier: "PT Sumber Jaya",
    dept: "IT",
    pic: "Andi",
    status: "PENDING",
    items: [
      { name: "Kertas HVS", qtyOrdered: 5, qtyReceived: 0, unit: "Pack" },
      { name: "Tinta Printer", qtyOrdered: 2, qtyReceived: 0, unit: "PCS" },
    ],
  },
  {
    id: 2,
    poNumber: "PO-2026-002",
    prNumber: "PR-2026-002",
    supplier: "PT Maju Mundur",
    dept: "Finance",
    pic: "Budi",
    status: "PARTIAL",
    items: [
      { name: "Pulpen", qtyOrdered: 10, qtyReceived: 5, unit: "PCS" },
    ],
  },
  {
    id: 3,
    poNumber: "PO-2026-003",
    prNumber: "PR-2026-003",
    supplier: "PT Abadi Jaya",
    dept: "HR",
    pic: "Siti",
    status: "RECEIVED",
    items: [
      { name: "Map Folder", qtyOrdered: 20, qtyReceived: 20, unit: "PCS" },
    ],
  },
];

const STATUS_STYLE = {
  PENDING:  "bg-yellow-100 text-yellow-600",
  PARTIAL:  "bg-blue-100 text-blue-600",
  RECEIVED: "bg-green-100 text-green-600",
};

export default function ReceiveGoodsIndex() {
  const navigate = useNavigate();
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filtered = dummyReceive.filter(r => {
    const matchStatus = filterStatus === "ALL" || r.status === filterStatus;
    const matchSearch =
      r.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.supplier.toLowerCase().includes(search.toLowerCase()) ||
      r.dept.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Receive Goods</h1>
        {/* summary badge */}
        <div className="flex gap-2">
          <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">
            {dummyReceive.filter(r => r.status === "PENDING").length} Pending
          </span>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            {dummyReceive.filter(r => r.status === "PARTIAL").length} Partial
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Cari PO, supplier, dept..."
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
          <option value="PENDING">Pending</option>
          <option value="PARTIAL">Partial</option>
          <option value="RECEIVED">Received</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">No PO</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-left">Dept</th>
              <th className="px-6 py-3 text-left">PIC</th>
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
              filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{r.poNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{r.supplier}</td>
                  <td className="px-6 py-4 text-gray-600">{r.dept}</td>
                  <td className="px-6 py-4 text-gray-600">{r.pic}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/procurement/receivegoods/${r.id}`)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs transition"
                    >
                      {r.status === "RECEIVED" ? "Detail" : "Konfirmasi"}
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
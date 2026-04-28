import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const dummyData = [
  {
    id: 1,
    prNumber: "PR-2026-001",
    dept: "IT",
    pic: "Andi",
    date: "2026-04-20",
    neededDate: "2026-04-30",
    status: "WAITING APPROVAL",
    items: [
      { name: "Kertas HVS", qty: 5, unit: "Pack", price: 50000, reason: "Stok habis di ruangan" },
      { name: "Tinta Printer", qty: 2, unit: "PCS", price: 150000, reason: "Printer sering macet" },
    ],
  },
  {
    id: 2,
    prNumber: "PR-2026-002",
    dept: "Finance",
    pic: "Budi",
    date: "2026-04-21",
    neededDate: "2026-05-01",
    status: "WAITING APPROVAL",
    items: [
      { name: "Pulpen", qty: 10, unit: "PCS", price: 5000, reason: "Stok pulpen habis" },
    ],
  },
  {
    id: 3,
    prNumber: "PR-2026-003",
    dept: "HR",
    pic: "Siti",
    date: "2026-04-22",
    neededDate: "2026-05-05",
    status: "APPROVED",
    comment: "Disetujui, segera proses PO",
    items: [
      { name: "Map Folder", qty: 20, unit: "PCS", price: 3000, reason: "Persiapan event tahunan" },
    ],
  },
  {
    id: 4,
    prNumber: "PR-2026-004",
    dept: "Marketing",
    pic: "Rudi",
    date: "2026-04-23",
    neededDate: "2026-05-10",
    status: "REJECTED",
    comment: "Budget tidak mencukupi",
    items: [
      { name: "Laptop", qty: 2, unit: "Unit", price: 8000000, reason: "Laptop lama rusak" },
    ],
  },
];

const STATUS_STYLE = {
  "WAITING APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

export default function ReviewPRIndex() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("waiting");
  const [search, setSearch]       = useState("");

  // ✅ FORMAT RUPIAH
  const formatRupiah = (val) => Number(val || 0).toLocaleString("id-ID");

  // ✅ TOTAL PER PR
  const getTotalPR = (items) => {
    return items.reduce((sum, item) => {
      return sum + (item.qty * (item.price || 0));
    }, 0);
  };

  const waiting = dummyData.filter(d =>
    d.status === "WAITING APPROVAL" &&
    (d.prNumber.toLowerCase().includes(search.toLowerCase()) ||
     d.dept.toLowerCase().includes(search.toLowerCase()) ||
     d.pic.toLowerCase().includes(search.toLowerCase()))
  );

  const processed = dummyData.filter(d =>
    d.status !== "WAITING APPROVAL" &&
    (d.prNumber.toLowerCase().includes(search.toLowerCase()) ||
     d.dept.toLowerCase().includes(search.toLowerCase()) ||
     d.pic.toLowerCase().includes(search.toLowerCase()))
  );

  const activeData = activeTab === "waiting" ? waiting : processed;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Review Purchase Request</h1>
        <div className="flex gap-2">
          <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">
            {waiting.length} Waiting
          </span>
        </div>
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
              <th className="px-6 py-3 text-left">Total Harga</th> {/* ✅ TAMBAHAN */}
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
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {pr.prNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{pr.dept}</td>
                  <td className="px-6 py-4 text-gray-600">{pr.pic}</td>
                  <td className="px-6 py-4 text-gray-600">{pr.neededDate}</td>

                  {/* ✅ TOTAL HARGA */}
                  <td className="px-6 py-4 text-gray-600">
                    Rp {formatRupiah(getTotalPR(pr.items))}
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
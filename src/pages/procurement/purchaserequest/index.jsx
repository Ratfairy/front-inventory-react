import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

// Fungsi untuk format mata uang Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const dummyData = [
  {
    id: 1,
    prNumber: "PR-2026-001",
    dept: "IT",
    pic: "Andi",
    date: "2026-04-20",
    neededDate: "2026-04-30",
    reason: "Kebutuhan operasional kantor",
    status: "DRAFT",
    items: [
      { name: "Kertas HVS", qty: 5, unit: "Pack", price: 55000 },
      { name: "Tinta Printer", qty: 2, unit: "PCS", price: 125000 },
    ],
  },
  {
    id: 2,
    prNumber: "PR-2026-002",
    dept: "Finance",
    pic: "Budi",
    date: "2026-04-21",
    neededDate: "2026-05-01",
    reason: "Stok habis",
    status: "WAITING APPROVAL",
    items: [
      { name: "Pulpen", qty: 10, unit: "PCS", price: 3500 },
    ],
  },
  {
    id: 3,
    prNumber: "PR-2026-003",
    dept: "HR",
    pic: "Siti",
    date: "2026-04-22",
    neededDate: "2026-05-05",
    reason: "Persiapan event",
    status: "APPROVED",
    items: [
      { name: "Map Folder", qty: 20, unit: "PCS", price: 5000 },
    ],
  },
];

const STATUS_STYLE = {
  "DRAFT":            "bg-gray-100 text-gray-600",
  "WAITING APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

export default function PurchaseRequestIndex() {
  const navigate = useNavigate();
  const [data, setData]             = useState(dummyData);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [search, setSearch]         = useState("");

  const filtered = data.filter(d => {
    const matchStatus = filterStatus === "ALL" || d.status === filterStatus;
    const matchSearch =
      d.prNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.dept.toLowerCase().includes(search.toLowerCase()) ||
      d.pic.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

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
          <option value="WAITING APPROVAL">Waiting Approval</option>
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
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Total Harga</th>
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
              filtered.map((pr) => {
                // Menghitung total harga untuk setiap baris PR
                const totalPrice = pr.items.reduce((sum, item) => sum + (item.qty * (item.price || 0)), 0);

                return (
                  <tr key={pr.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {pr.prNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{pr.dept}</td>
                    <td className="px-6 py-4 text-gray-600">{pr.pic}</td>
                    <td className="px-6 py-4 text-gray-600">{pr.neededDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[pr.status]}`}>
                        {pr.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">
                      {formatRupiah(totalPrice)}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
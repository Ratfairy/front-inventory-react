import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const poData = [
  { id: 1, poNumber: "PO-2026-001", prNumber: "PR-2026-001", supplier: "PT Sumber Jaya", dept: "IT", total: 550000, status: "SENT", date: "2026-04-20" },
  { id: 2, poNumber: "PO-2026-002", prNumber: "PR-2026-002", supplier: "PT Maju Mundur", dept: "Finance", total: 50000, status: "SENT", date: "2026-04-21" },
  { id: 3, poNumber: "PO-2026-003", prNumber: "PR-2026-003", supplier: "PT Abadi Jaya", dept: "HR", total: 200000, status: "DRAFT", date: "2026-04-22" },
  { id: 4, poNumber: "PO-2026-004", prNumber: "PR-2026-004", supplier: "PT Sumber Jaya", dept: "IT", total: 750000, status: "SENT", date: "2026-04-23" },
];

const chartBulan = [
  { bulan: "Jan", total: 1200000 },
  { bulan: "Feb", total: 800000 },
  { bulan: "Mar", total: 1500000 },
  { bulan: "Apr", total: 1550000 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

export default function PurchaseReport() {
  const [dateFrom, setDateFrom]     = useState("");
  const [dateTo, setDateTo]         = useState("");
  const [search, setSearch]         = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const filtered = poData.filter(d => {
    const matchStatus = filterStatus === "ALL" || d.status === filterStatus;
    const matchSearch =
      d.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.supplier.toLowerCase().includes(search.toLowerCase()) ||
      d.dept.toLowerCase().includes(search.toLowerCase());
    const matchFrom = !dateFrom || d.date >= dateFrom;
    const matchTo = !dateTo || d.date <= dateTo;
    return matchStatus && matchSearch && matchFrom && matchTo;
  });

  const totalPembelian = filtered.reduce((sum, d) => sum + d.total, 0);
  const totalPO = filtered.length;

  // per supplier
  const perSupplier = Object.values(
    poData.reduce((acc, d) => {
      if (!acc[d.supplier]) acc[d.supplier] = { name: d.supplier, value: 0 };
      acc[d.supplier].value += d.total;
      return acc;
    }, {})
  );

  const handleExport = () => {
    alert("Export Excel/PDF — akan diintegrasikan dengan backend");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Purchase Report</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition"
        >
          Export Excel/PDF
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total PO</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{totalPO}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total Pembelian</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{formatRupiah(totalPembelian)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total Supplier</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{perSupplier.length}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART - pembelian per bulan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Total Pembelian per Bulan</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={chartBulan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bulan" />
                <YAxis tickFormatter={(v) => `${v/1000000}jt`} />
                <Tooltip formatter={(v) => formatRupiah(v)} />
                <Bar dataKey="total" name="Total Pembelian" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART - per supplier */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Pembelian per Supplier</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={perSupplier}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {perSupplier.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatRupiah(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* FILTER & TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">Detail Purchase Order</h2>

        <div className="flex gap-3 flex-wrap">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ALL">Semua Status</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
          </select>
          <input
            type="text"
            placeholder="Cari PO, supplier, dept..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">No PO</th>
                <th className="px-6 py-3 text-left">No PR</th>
                <th className="px-6 py-3 text-left">Supplier</th>
                <th className="px-6 py-3 text-left">Dept</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Tanggal</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{d.poNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{d.prNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{d.supplier}</td>
                    <td className="px-6 py-4 text-gray-600">{d.dept}</td>
                    <td className="px-6 py-4 text-gray-600">{formatRupiah(d.total)}</td>
                    <td className="px-6 py-4 text-gray-600">{d.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        d.status === "SENT"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* TOTAL ROW */}
        <div className="flex justify-end pt-2 border-t">
          <p className="text-sm text-gray-500">
            Total: <span className="font-bold text-blue-600 ml-1">{formatRupiah(totalPembelian)}</span>
          </p>
        </div>

      </div>

    </div>
  );
}
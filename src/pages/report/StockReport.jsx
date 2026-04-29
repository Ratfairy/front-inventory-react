import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from "recharts";

const stockData = [
  { item: "Kertas HVS", stock: 3, min: 5, unit: "Pack", nilai: 150000 },
  { item: "Pulpen", stock: 12, min: 10, unit: "PCS", nilai: 60000 },
  { item: "Tinta Printer", stock: 2, min: 5, unit: "PCS", nilai: 300000 },
  { item: "Map Folder", stock: 6, min: 5, unit: "PCS", nilai: 60000 },
  { item: "Stapler", stock: 20, min: 5, unit: "PCS", nilai: 400000 },
];

const movementData = [
  { date: "2026-04-20", item: "Kertas HVS", type: "IN", qty: 10, keterangan: "Pembelian" },
  { date: "2026-04-21", item: "Pulpen", type: "IN", qty: 15, keterangan: "Pembelian" },
  { date: "2026-04-22", item: "Kertas HVS", type: "OUT", qty: 7, keterangan: "Pemakaian" },
  { date: "2026-04-23", item: "Tinta Printer", type: "OUT", qty: 3, keterangan: "Pemakaian" },
  { date: "2026-04-24", item: "Map Folder", type: "IN", qty: 20, keterangan: "Pembelian" },
  { date: "2026-04-25", item: "Stapler", type: "IN", qty: 5, keterangan: "Pembelian" },
];

const chartMovement = [
  { bulan: "Jan", in: 40, out: 20 },
  { bulan: "Feb", in: 30, out: 15 },
  { bulan: "Mar", in: 50, out: 30 },
  { bulan: "Apr", in: 35, out: 25 },
];

export default function StockReport() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo]     = useState("");
  const [search, setSearch]     = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const totalNilaiStok = stockData.reduce((sum, d) => sum + d.nilai, 0);
  const totalItemLowStock = stockData.filter(d => d.stock < d.min).length;

  const filteredMovement = movementData.filter(d => {
    const matchType = filterType === "ALL" || d.type === filterType;
    const matchSearch = d.item.toLowerCase().includes(search.toLowerCase());
    const matchFrom = !dateFrom || d.date >= dateFrom;
    const matchTo = !dateTo || d.date <= dateTo;
    return matchType && matchSearch && matchFrom && matchTo;
  });

  const handleExport = () => {
    alert("Export Excel/PDF — akan diintegrasikan dengan backend");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Stock Report</h1>
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
          <p className="text-sm text-gray-500">Total Item</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{stockData.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total Nilai Stok</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{formatRupiah(totalNilaiStok)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Item Low Stock</p>
          <p className="text-3xl font-bold text-red-500 mt-1">{totalItemLowStock}</p>
        </div>
      </div>

      {/* CHART PERGERAKAN STOK */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Pergerakan Stok per Bulan</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={chartMovement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="in" name="Stok Masuk" fill="#22c55e" radius={[6,6,0,0]} />
              <Bar dataKey="out" name="Stok Keluar" fill="#ef4444" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NILAI STOK PER ITEM */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Nilai Stok per Item</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-center">Stok</th>
                <th className="px-6 py-3 text-center">Min</th>
                <th className="px-6 py-3 text-left">Unit</th>
                <th className="px-6 py-3 text-left">Nilai Stok</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stockData.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.item}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{item.stock}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{item.min}</td>
                  <td className="px-6 py-4 text-gray-600">{item.unit}</td>
                  <td className="px-6 py-4 text-gray-600">{formatRupiah(item.nilai)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.stock < item.min
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {item.stock < item.min ? "Low Stock" : "Available"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FILTER PERGERAKAN */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">Pergerakan Stok</h2>

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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ALL">Semua Tipe</option>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
          <input
            type="text"
            placeholder="Cari item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Tanggal</th>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-center">Tipe</th>
                <th className="px-6 py-3 text-center">Qty</th>
                <th className="px-6 py-3 text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMovement.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filteredMovement.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-600">{d.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{d.item}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        d.type === "IN"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {d.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">{d.qty}</td>
                    <td className="px-6 py-4 text-gray-500">{d.keterangan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
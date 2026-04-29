import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const prData = [
  { id: 1, prNumber: "PR-2026-001", dept: "IT", pic: "Andi", total: 550000, status: "APPROVED", date: "2026-04-20" },
  { id: 2, prNumber: "PR-2026-002", dept: "Finance", pic: "Budi", total: 50000, status: "WAITING APPROVAL", date: "2026-04-21" },
  { id: 3, prNumber: "PR-2026-003", dept: "HR", pic: "Siti", total: 200000, status: "APPROVED", date: "2026-04-22" },
  { id: 4, prNumber: "PR-2026-004", dept: "Marketing", pic: "Rudi", total: 16000000, status: "REJECTED", date: "2026-04-23" },
  { id: 5, prNumber: "PR-2026-005", dept: "IT", pic: "Andi", total: 300000, status: "DRAFT", date: "2026-04-24" },
];

const chartPerDept = [
  { dept: "IT", total: 850000 },
  { dept: "Finance", total: 50000 },
  { dept: "HR", total: 200000 },
  { dept: "Marketing", total: 16000000 },
];

const chartPerStatus = [
  { name: "APPROVED", value: 2 },
  { name: "WAITING", value: 1 },
  { name: "REJECTED", value: 1 },
  { name: "DRAFT", value: 1 },
];

const STATUS_STYLE = {
  "DRAFT":            "bg-gray-100 text-gray-600",
  "WAITING APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#94a3b8"];

export default function RequestReport() {
  const [dateFrom, setDateFrom]         = useState("");
  const [dateTo, setDateTo]             = useState("");
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const filtered = prData.filter(d => {
    const matchStatus = filterStatus === "ALL" || d.status === filterStatus;
    const matchSearch =
      d.prNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.dept.toLowerCase().includes(search.toLowerCase()) ||
      d.pic.toLowerCase().includes(search.toLowerCase());
    const matchFrom = !dateFrom || d.date >= dateFrom;
    const matchTo = !dateTo || d.date <= dateTo;
    return matchStatus && matchSearch && matchFrom && matchTo;
  });

  const totalNilai    = filtered.reduce((sum, d) => sum + d.total, 0);
  const totalApproved = prData.filter(d => d.status === "APPROVED").length;
  const totalRejected = prData.filter(d => d.status === "REJECTED").length;

  const handleExport = () => {
    alert("Export Excel/PDF — akan diintegrasikan dengan backend");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Request Report</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition"
        >
          Export Excel/PDF
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total PR</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{prData.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total Nilai</p>
          <p className="text-xl font-bold text-blue-600 mt-1">{formatRupiah(totalNilai)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-3xl font-bold text-green-500 mt-1">{totalApproved}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-3xl font-bold text-red-500 mt-1">{totalRejected}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART - per dept */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Nilai PR per Departemen</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={chartPerDept}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="dept" />
                <YAxis tickFormatter={(v) => `${v/1000000}jt`} />
                <Tooltip formatter={(v) => formatRupiah(v)} />
                <Bar dataKey="total" name="Total Nilai" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART - per status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">PR per Status</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartPerStatus}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartPerStatus.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* LEGEND */}
          <div className="mt-2 flex flex-wrap gap-3 justify-center">
            {chartPerStatus.map((item, index) => (
              <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                {item.name}: {item.value}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FILTER & TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">Detail Purchase Request</h2>

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
            <option value="WAITING APPROVAL">Waiting Approval</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Cari PR, dept, PIC..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">No PR</th>
                <th className="px-6 py-3 text-left">Dept</th>
                <th className="px-6 py-3 text-left">PIC</th>
                <th className="px-6 py-3 text-left">Total Nilai</th>
                <th className="px-6 py-3 text-left">Tanggal</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{d.prNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{d.dept}</td>
                    <td className="px-6 py-4 text-gray-600">{d.pic}</td>
                    <td className="px-6 py-4 text-gray-600">{formatRupiah(d.total)}</td>
                    <td className="px-6 py-4 text-gray-600">{d.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[d.status]}`}>
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
            Total Nilai: <span className="font-bold text-blue-600 ml-1">{formatRupiah(totalNilai)}</span>
          </p>
        </div>

      </div>

    </div>
  );
}
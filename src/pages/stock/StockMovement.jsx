import { useState, useEffect } from "react";
import {
  getAllMovements
} from "../../api/services/stockService";

export default function StockMovement() {
  const [data, setData]         = useState([]);
  const [search, setSearch]     = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo]     = useState("");
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      const res = await getAllMovements();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const filtered = data.filter(d => {
    const matchType   = filterType === "ALL" || d.type === filterType;
    const matchSearch = d.itemName.toLowerCase().includes(search.toLowerCase());
    const dateStr     = new Date(d.date).toISOString().split("T")[0];
    const matchFrom   = !dateFrom || dateStr >= dateFrom;
    const matchTo     = !dateTo || dateStr <= dateTo;
    return matchType && matchSearch && matchFrom && matchTo;
  });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Movement</h1>

      {/* FILTER */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search item..."
          className="flex-1 border rounded-lg px-4 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="ALL">Semua Tipe</option>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 font-semibold border-b">
          Stock Movement History
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Waktu</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Tipe</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">PIC</th>
              <th className="p-3 text-left">Keterangan</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-gray-500">{formatDate(item.date)}</td>
                  <td className="p-3">{formatTime(item.date)}</td>
                  <td className="p-3 font-medium">{item.itemName}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === "IN"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3">{item.qty}</td>
                  <td className="p-3">{item.pic || "-"}</td>
                  <td className="p-3 text-gray-500">{item.description || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
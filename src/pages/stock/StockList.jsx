import { useState, useEffect } from "react";
import { getAllStocks } from "../../api/services/stockService";

export default function StockList() {
  const [data, setData]       = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const res = await getAllStocks();
      setData(res.data);
    } catch (err) {
      setError("Gagal memuat data stock");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filtered = data.filter(d =>
    d.itemName.toLowerCase().includes(search.toLowerCase())
  );

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
    <div>
      <h1 className="text-xl font-bold mb-4">Stock List</h1>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search item..."
          className="w-full border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 font-semibold border-b">
          All Inventory Items
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Min</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Last Update</th>
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
              filtered.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{item.itemName}</td>
                  <td className="p-3">{item.qty}</td>
                  <td className="p-3">{item.minQty}</td>
                  <td className="p-3">{item.unit}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Low Stock"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">
                    {formatDate(item.updatedAt)}
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
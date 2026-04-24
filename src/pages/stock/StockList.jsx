import { useState } from "react";

const data = [
  { id: 1, item: "Kertas HVS", stock: 3, min: 5, unit: "Pack", updatedAt: "2026-04-23" },
  { id: 2, item: "Pulpen", stock: 12, min: 10, unit: "PCS", updatedAt: "2026-04-22" },
  { id: 3, item: "Tinta Printer", stock: 2, min: 5, unit: "PCS", updatedAt: "2026-04-21" },
  { id: 4, item: "Map Folder", stock: 6, min: 5, unit: "PCS", updatedAt: "2026-04-20" },
  { id: 5, item: "Stapler", stock: 20, min: 5, unit: "PCS", updatedAt: "2026-04-18" },
];

export default function StockList() {
  const [search, setSearch] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filtered = data.filter(d =>
    d.item.toLowerCase().includes(search.toLowerCase())
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
              <th className="p-3 text-left">Last Update</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{item.item}</td>
                <td className="p-3">{item.stock}</td>
                <td className="p-3">{item.min}</td>
                <td className="p-3">{item.unit}</td>
                <td className="p-3 text-gray-500">
                  {formatDate(item.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
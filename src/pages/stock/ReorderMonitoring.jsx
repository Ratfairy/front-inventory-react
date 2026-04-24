import { useState } from "react";

export default function ReorderMonitoring() {
  const [search, setSearch] = useState("");

  // 🔥 DATA DUMMY (nanti ganti API)
  const data = [
    { id: 1, name: "Kertas HVS", stock: 3, min: 5, unit: "Pack" },
    { id: 2, name: "Pulpen", stock: 12, min: 10, unit: "PCS" },
    { id: 3, name: "Tinta Printer", stock: 2, min: 5, unit: "PCS" },
    { id: 4, name: "Map Folder", stock: 6, min: 5, unit: "PCS" },
  ];

  // 🔥 STATUS LOGIC
  const getStatus = (stock, min) => {
    if (stock < min) return "URGENT";
    if (stock <= min * 1.3) return "CUKUP";
    return "SAFE";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "URGENT":
        return "bg-red-100 text-red-600";
      case "CUKUP":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "URGENT":
        return "Reorder Now";
      case "CUKUP":
        return "Prepare to Reorder";
      default:
        return "";
    }
  };

  // 🔥 FILTER (hanya tampilkan urgent + cukup)
  const filtered = data.filter(
    (item) =>
      getStatus(item.stock, item.min) !== "SAFE" &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 SUMMARY
  const urgentCount = data.filter(
    (i) => getStatus(i.stock, i.min) === "URGENT"
  ).length;

  const cukupCount = data.filter(
    (i) => getStatus(i.stock, i.min) === "CUKUP"
  ).length;

  return (
    <div className="space-y-6">
      
      {/* TITLE */}
      <h1 className="text-2xl font-bold">Reorder Monitoring</h1>

      {/* 🔥 SUMMARY */}
      <div className="flex gap-4">
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold">
          🔴 {urgentCount} Urgent
        </div>

        <div className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-xl text-sm font-semibold">
          🟡 {cukupCount} Cukup
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 📊 TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        
        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="font-semibold text-gray-700">
            Items Need Reorder
          </h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase text-gray-500 tracking-wider">
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Min</th>
                <th className="px-6 py-3 text-left">Unit</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No items need reorder
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => {
                  const status = getStatus(item.stock, item.min);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-gray-400">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        {item.name}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-700">
                        {item.stock}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {item.min}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {item.unit}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusStyle(
                            status
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}
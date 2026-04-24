import { useState } from "react";

const data = [
  {
    id: 1,
    date: "2026-04-23",
    time: "10:30",
    item: "Kertas HVS",
    type: "OUT",
    qty: 2,
    before: 5,
    after: 3,
    pic: "Andi",
    desc: "Pemakaian kantor",
  },
  {
    id: 2,
    date: "2026-04-23",
    time: "09:00",
    item: "Kertas HVS",
    type: "IN",
    qty: 10,
    before: 0,
    after: 10,
    pic: "Budi",
    desc: "Pembelian",
  },
  {
    id: 3,
    date: "2026-04-22",
    time: "14:15",
    item: "Pulpen",
    type: "IN",
    qty: 10,
    before: 2,
    after: 12,
    pic: "Siti",
    desc: "Restock",
  },
  {
    id: 4,
    date: "2026-04-21",
    time: "11:00",
    item: "Tinta Printer",
    type: "OUT",
    qty: 3,
    before: 5,
    after: 2,
    pic: "Rudi",
    desc: "Print laporan",
  },
];

export default function StockMovement() {
  const [search, setSearch] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filtered = data.filter((d) =>
    d.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Movement</h1>

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
          Stock Movement History
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Before</th>
              <th className="p-3 text-left">After</th>
              <th className="p-3 text-left">PIC</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-gray-500">
                  {formatDate(item.date)}
                </td>
                <td className="p-3">{item.time}</td>
                <td className="p-3 font-medium">{item.item}</td>

                {/* TYPE */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === "IN"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>

                <td className="p-3">{item.qty}</td>
                <td className="p-3">{item.before}</td>
                <td className="p-3">{item.after}</td>
                <td className="p-3">{item.pic}</td>
                <td className="p-3 text-gray-500">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
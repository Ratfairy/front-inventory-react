import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {

    const chartData = [
    { name: "Coil", stock: 4000 },
    { name: "Plat", stock: 2000 },
    { name: "Pipa", stock: 500 },
    { name: "Baut", stock: 1200 },
  ];

  const pieData = [
    { name: "Available", value: 2 },
    { name: "Low Stock", value: 1 },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; 

  const stockData = [
    { id: 1, name: "Coil Baja", qty: 4000, unit: "KG", status: "Available" },
    { id: 2, name: "Plat Besi", qty: 2000, unit: "KG", status: "Available" },
    { id: 3, name: "Pipa", qty: 500, unit: "PCS", status: "Low Stock" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6">
        
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Request</p>
          <h2 className="text-2xl font-bold">120</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Purchase</p>
          <h2 className="text-2xl font-bold">80</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Stock</p>
          <h2 className="text-2xl font-bold">560</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Incoming</p>
          <h2 className="text-2xl font-bold">25</h2>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Stock Inventory</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEAD */}
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase text-gray-400 tracking-wider">
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-left">Qty</th>
                <th className="px-6 py-3 text-left">Unit</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-100">
              {stockData.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 text-gray-400">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {item.qty.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {item.unit}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                      ${
                        item.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-4">
            Stock Overview
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#3b82f6" radius={[10,10,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          
          <h2 className="font-semibold text-gray-700 mb-4">
            Stock Status
          </h2>

          <div className="w-full h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-2 text-sm">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-gray-600">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
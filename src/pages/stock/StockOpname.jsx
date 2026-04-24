import { useState } from "react";

export default function StockOpname() {
  const [role, setRole] = useState("admin");

  const initialItems = [
    { id: 1, name: "Kertas HVS", system: 5, actual: "" },
    { id: 2, name: "Pulpen", system: 10, actual: "" },
    { id: 3, name: "Tinta Printer", system: 4, actual: "" },
  ];

  const [items, setItems] = useState(initialItems);
  const [pic, setPic] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);

  // 🔥 HANDLE INPUT ACTUAL
  const handleActualChange = (id, value) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, actual: value } : i
    ));
  };

  // 🔥 SUBMIT (BATCH)
  const handleSubmit = () => {
    if (!pic || !date) {
      alert("Isi PIC dan tanggal!");
      return;
    }

    const detail = items.map(i => ({
      ...i,
      adjustment: i.actual - i.system,
    }));

    const newBatch = {
      id: data.length + 1,
      date,
      pic,
      status: "WAITING",
      items: detail,
    };

    setData([newBatch, ...data]);

    // reset
    setItems(initialItems);
    setPic("");
    setDate("");
  };

  // 🔥 APPROVE
  const handleApprove = (id) => {
    setData(data.map(d =>
      d.id === id ? { ...d, status: "APPROVED" } : d
    ));
  };

  // 🔥 REJECT
  const handleReject = (id) => {
    setData(data.map(d =>
      d.id === id ? { ...d, status: "REJECTED" } : d
    ));
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stock Opname</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="admin">Admin Gudang</option>
          <option value="approver">Approver</option>
        </select>
      </div>

      {/* FORM */}
      {role === "admin" && (
        <>
          <div className="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-3 gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="PIC"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded"
            >
              Submit Opname
            </button>
          </div>

          {/* TABLE INPUT */}
          <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-center">System</th>
                  <th className="p-3 text-center">Actual</th>
                  <th className="p-3 text-center">Selisih</th>
                </tr>
              </thead>

              <tbody>
                {items.map((i) => {
                  const diff =
                    i.actual === "" ? 0 : i.actual - i.system;

                  return (
                    <tr key={i.id} className="border-t">
                      <td className="p-3">{i.name}</td>
                      <td className="p-3 text-center">{i.system}</td>

                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={i.actual}
                          onChange={(e) =>
                            handleActualChange(i.id, Number(e.target.value))
                          }
                          className="border p-1 w-20 text-center rounded"
                        />
                      </td>

                      <td
                        className={`p-3 text-center font-semibold ${
                          diff < 0 ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {diff}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* HISTORY BATCH */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 font-semibold border-b">
          Opname History
        </div>

        {data.length === 0 ? (
          <div className="p-4 text-gray-400 text-center">
            No data
          </div>
        ) : (
          data.map((batch) => (
            <div key={batch.id} className="border-b p-4">

              {/* HEADER */}
              <div className="flex justify-between mb-2">
                <div>
                  <div className="font-semibold">
                    Opname #{batch.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {batch.date} - {batch.pic}
                  </div>
                </div>

                {/* STATUS */}
                <div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                    ${
                      batch.status === "WAITING"
                        ? "bg-yellow-100 text-yellow-600"
                        : batch.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {batch.status}
                  </span>
                </div>
              </div>

              {/* DETAIL TABLE */}
              <table className="w-full text-sm mb-2">
                <thead className="text-gray-500">
                  <tr>
                    <th className="text-left">Item</th>
                    <th className="text-center">System</th>
                    <th className="text-center">Actual</th>
                    <th className="text-center">Adj</th>
                  </tr>
                </thead>

                <tbody>
                  {batch.items.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i.name}</td>
                      <td className="text-center">{i.system}</td>
                      <td className="text-center">{i.actual}</td>
                      <td
                        className={`text-center ${
                          i.adjustment < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {i.adjustment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ACTION */}
              {role === "approver" && batch.status === "WAITING" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleApprove(batch.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(batch.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { getAllStocks } from "../../../api/services/stockService";
import { createOpname } from "../../../api/services/stockOpnameService";

export default function StockOpnameCreate() {
  const navigate = useNavigate();

  const [stocks, setStocks]   = useState([]);
  const [pic, setPic]         = useState("");
  const [date, setDate]       = useState("");
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await getAllStocks();
      setStocks(res.data);
      // Otomatis set semua item dari stock
      setItems(res.data.map(s => ({
        stockId:   s.id,
        name:      s.itemName,
        system:    s.qty,
        unit:      s.unit,
        actual:    "",
      })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleActualChange = (stockId, value) => {
    setItems(items.map(i =>
      i.stockId === stockId ? { ...i, actual: value } : i
    ));
  };

  const handleSubmit = async () => {
    if (!pic || !date) {
      alert("Isi PIC dan tanggal!");
      return;
    }
    if (items.some(i => i.actual === "")) {
      alert("Isi semua actual qty!");
      return;
    }

    try {
      setLoading(true);
      await createOpname({
        date,
        pic,
        items: items.map(i => ({
          stockId:   i.stockId,
          actualQty: Number(i.actual),
        })),
      });
      alert("Stock Opname berhasil dibuat!");
      navigate(ROUTES.STOCK_OPNAME);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal membuat stock opname");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* BACK */}
      <button
        onClick={() => navigate(ROUTES.STOCK_OPNAME)}
        className="text-blue-600 text-sm mb-4 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6">Create Stock Opname</h1>

      {/* CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-md border space-y-6">

        {/* TOP FORM */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            placeholder="PIC"
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-hidden border rounded-xl">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left w-[40%]">Item</th>
                <th className="p-3 text-center w-[20%]">System</th>
                <th className="p-3 text-center w-[20%]">Actual</th>
                <th className="p-3 text-center w-[20%]">Selisih</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => {
                const diff = i.actual === "" ? "-" : Number(i.actual) - i.system;
                return (
                  <tr key={i.stockId} className="border-t">
                    <td className="p-3">{i.name}</td>
                    <td className="p-3 text-center">{i.system} {i.unit}</td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={i.actual}
                        onChange={(e) => handleActualChange(i.stockId, e.target.value)}
                        className="w-20 h-9 border rounded text-center mx-auto block focus:ring-2 focus:ring-blue-400 outline-none"
                      />
                    </td>
                    <td className={`p-3 text-center font-semibold ${
                      diff === "-" ? "text-gray-400"
                      : diff < 0 ? "text-red-500"
                      : diff > 0 ? "text-green-500"
                      : "text-gray-500"
                    }`}>
                      {diff === "-" ? "-" : diff > 0 ? `+${diff}` : diff}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? "Menyimpan..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
}
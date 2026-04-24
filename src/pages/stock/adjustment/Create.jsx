import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export default function AdjustmentCreate() {
  const navigate = useNavigate();

  const items = [
    { id: 1, name: "Kertas HVS", stock: 5 },
    { id: 2, name: "Pulpen", stock: 10 },
  ];

  const [selectedItem, setSelectedItem] = useState("");
  const [actualStock, setActualStock] = useState("");
  const [reason, setReason] = useState("");
  const [pic, setPic] = useState("");

  const item = items.find(i => i.id === Number(selectedItem));
  const systemStock = item?.stock || 0;
  const adjustment =
    actualStock === "" ? 0 : Number(actualStock) - systemStock;

  const handleSubmit = () => {
    alert("Saved (simulate)");
    navigate(ROUTES.ADJUSTMENT);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <button
          onClick={() => navigate(ROUTES.ADJUSTMENT)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Adjustment List
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 mt-2">
          Create Adjustment
        </h1>
        <p className="text-sm text-gray-400">
          Input stock correction data
        </p>
      </div>

      {/* CARD FORM */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-5">

        {/* ITEM */}
        <div>
          <label className="text-sm text-gray-500">Item</label>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Item</option>
            {items.map(i => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
        </div>

        {/* SYSTEM STOCK */}
        <div>
          <label className="text-sm text-gray-500">System Stock</label>
          <input
            value={systemStock}
            disabled
            className="w-full mt-1 bg-gray-100 border px-3 py-2 rounded-lg"
          />
        </div>

        {/* ACTUAL STOCK */}
        <div>
          <label className="text-sm text-gray-500">Actual Stock</label>
          <input
            type="number"
            value={actualStock}
            onChange={(e) => setActualStock(e.target.value)}
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ADJUSTMENT RESULT */}
        <div>
          <label className="text-sm text-gray-500">Adjustment</label>
          <input
            value={adjustment}
            disabled
            className={`w-full mt-1 px-3 py-2 rounded-lg font-semibold ${
              adjustment < 0
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          />
        </div>

        {/* REASON */}
        <div>
          <label className="text-sm text-gray-500">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="3"
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* PIC */}
        <div>
          <label className="text-sm text-gray-500">PIC</label>
          <input
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end gap-3 pt-4 border-t">

          <button
            onClick={() => navigate(ROUTES.ADJUSTMENT)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm shadow-sm transition"
          >
            Submit
          </button>

        </div>

      </div>
    </div>
  );
}
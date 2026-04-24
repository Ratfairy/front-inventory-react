import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export default function StockOpnameCreate() {
  const navigate = useNavigate();

  const initialItems = [
    { id: 1, name: "Kertas HVS", system: 5, actual: "" },
    { id: 2, name: "Pulpen", system: 10, actual: "" },
  ];

  const [items, setItems] = useState(initialItems);
  const [pic, setPic] = useState("");
  const [date, setDate] = useState("");

  const handleActualChange = (id, value) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, actual: value } : i
    ));
  };

  const handleSubmit = () => {
    alert("Saved (simulate)");
    navigate(ROUTES.STOCK_OPNAME);
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

        <h1 className="text-2xl font-semibold mb-6">
        Create Stock Opname
        </h1>

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

                {/* HEADER */}
                <thead className="bg-gray-100 text-gray-700">
                <tr>
                    <th className="p-3 text-left w-[40%]">Item</th>
                    <th className="p-3 text-center w-[20%]">System</th>
                    <th className="p-3 text-center w-[20%]">Actual</th>
                    <th className="p-3 text-center w-[20%]">Selisih</th>
                </tr>
                </thead>

                {/* BODY */}
                <tbody>
                {items.map((i) => {
                    const diff = i.actual === "" ? 0 : i.actual - i.system;

                    return (
                    <tr key={i.id} className="border-t">

                        {/* ITEM */}
                        <td className="p-3">{i.name}</td>

                        {/* SYSTEM */}
                        <td className="p-3 text-center">{i.system}</td>

                        {/* ACTUAL */}
                        <td className="p-3 text-center">
                        <input
                            type="number"
                            value={i.actual}
                            onChange={(e) =>
                            handleActualChange(
                                i.id,
                                e.target.value === "" ? "" : Number(e.target.value)
                            )
                            }
                            className="w-20 h-9 border rounded text-center mx-auto block"
                        />
                        </td>

                        {/* SELISIH */}
                        <td className="p-3 text-center">{diff}</td>

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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
            Submit
            </button>
        </div>

        </div>
    </div>
    );
}
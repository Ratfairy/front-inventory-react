import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllStocks } from "../../../api/services/stockService";
import { createAdjustment } from "../../../api/services/adjustmentService";

export default function AdjustmentCreate() {
    const navigate = useNavigate();

    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        date: new Date().toISOString().split("T")[0],
        pic: "",
        reason: "",
        items: [],
    });

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const res = await getAllStocks();

            setStocks(res.data);

            setForm((prev) => ({
                ...prev,
                items: res.data.map((s) => ({
                    stockId: s.id,
                    itemName: s.itemName,
                    systemQty: s.qty,
                    actualQty: s.qty,
                    adjustmentQty: 0,
                })),
            }));
        } catch (err) {
            console.error(err);
            alert("Gagal load stock");
        }
    };

    const handleActualQtyChange = (index, value) => {
        const updatedItems = [...form.items];

        updatedItems[index].actualQty = Number(value);

        updatedItems[index].adjustmentQty =
            Number(value) - updatedItems[index].systemQty;

        setForm({
            ...form,
            items: updatedItems,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                date: form.date,
                pic: form.pic,
                reason: form.reason,
                items: form.items.map((i) => ({
                    stockId: i.stockId,
                    actualQty: i.actualQty,
                })),
            };

            await createAdjustment(payload);

            alert("Adjustment berhasil dibuat");

            navigate("/stock/adjustment");
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Gagal create adjustment"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Create Adjustment
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block mb-1">Date</label>

                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    date: e.target.value,
                                })
                            }
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">PIC</label>

                        <input
                            type="text"
                            value={form.pic}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    pic: e.target.value,
                                })
                            }
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Reason</label>

                        <input
                            type="text"
                            value={form.reason}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    reason: e.target.value,
                                })
                            }
                            className="border rounded w-full p-2"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Item</th>
                                <th className="border p-2">System Qty</th>
                                <th className="border p-2">Actual Qty</th>
                                <th className="border p-2">Adjustment</th>
                            </tr>
                        </thead>

                        <tbody>
                            {form.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="border p-2">
                                        {item.itemName}
                                    </td>

                                    <td className="border p-2 text-center">
                                        {item.systemQty}
                                    </td>

                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            value={item.actualQty}
                                            onChange={(e) =>
                                                handleActualQtyChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded w-full p-2"
                                        />
                                    </td>

                                    <td className="border p-2 text-center">
                                        {item.adjustmentQty}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Save Adjustment"}
                </button>
            </form>
        </div>
    );
}
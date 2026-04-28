import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../utils/routes";

// simulasi data dari PR
const dummyPR = {
  id: 1,
  prNumber: "PR-2026-001",
  dept: "IT",
  pic: "Andi",
  neededDate: "2026-04-30",
  items: [
    { name: "Kertas HVS", qty: 5, unit: "Pack", price: 50000 },
    { name: "Tinta Printer", qty: 2, unit: "PCS", price: 150000 },
  ],
};

export default function PurchaseOrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState(dummyPR.items);

  const formatRupiah = (val) => Number(val || 0).toLocaleString("id-ID");

  const getTotal = (item) => item.qty * item.price;

  const getGrandTotal = () => {
    return items.reduce((sum, item) => sum + getTotal(item), 0);
  };

  const handlePriceChange = (index, value) => {
    const updated = [...items];
    updated[index].price = value;
    setItems(updated);
  };

  const handleSubmit = () => {
    if (!supplier) {
      alert("Supplier wajib diisi!");
      return;
    }

    console.log({
      prId: id,
      supplier,
      items,
      total: getGrandTotal()
    });

    alert("Purchase Order berhasil dibuat!");
    navigate(ROUTES.PURCHASE_ORDER);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate(ROUTES.PURCHASE_ORDER)}
          className="text-sm text-blue-600 hover:underline mb-2 block"
        >
          ← Kembali
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Buat Purchase Order
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Dari PR: {dummyPR.prNumber}
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* INFO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400">Departemen</p>
            <p className="font-medium text-gray-800 mt-1">{dummyPR.dept}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">PIC</p>
            <p className="font-medium text-gray-800 mt-1">{dummyPR.pic}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tanggal Dibutuhkan</p>
            <p className="font-medium text-gray-800 mt-1">{dummyPR.neededDate}</p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* SUPPLIER */}
        <div>
          <p className="text-xs text-gray-400 mb-1">Supplier</p>
          <input
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Masukkan supplier"
            className="w-full border px-3 py-2 rounded-lg text-sm"
          />
        </div>

        <hr className="border-gray-100" />

        {/* ITEMS */}
        <div>
          <p className="text-xs text-gray-400 mb-3">Item</p>

          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2">

                <div className="flex justify-between">
                  <p className="font-medium">{item.name}</p>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                    {item.qty} {item.unit}
                  </span>
                </div>

                {/* INPUT HARGA */}
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handlePriceChange(i, Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded-lg text-sm"
                  placeholder="Harga"
                />

                {/* TOTAL PER ITEM */}
                <div className="text-xs text-gray-600">
                  Total: Rp {formatRupiah(getTotal(item))}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* TOTAL KESELURUHAN */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex justify-between items-center">
          <span className="text-blue-700 font-medium">
            Total Keseluruhan
          </span>
          <span className="text-blue-600 font-bold text-lg">
            Rp {formatRupiah(getGrandTotal())}
          </span>
        </div>

        {/* ACTION */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
          >
            Submit PO
          </button>
        </div>

      </div>
    </div>
  );
}
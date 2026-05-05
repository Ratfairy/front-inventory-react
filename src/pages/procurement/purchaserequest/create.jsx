import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { createPR, updatePRStatus } from "../../../api/services/purchaseRequestService";

export default function PurchaseRequestCreate() {
  const navigate = useNavigate();

  const [dept, setDept]             = useState("");
  const [pic, setPic]               = useState("");
  const [neededDate, setNeededDate] = useState("");
  const [items, setItems]           = useState([
    { name: "", qty: "", unit: "", price: "", reason: "" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { name: "", qty: "", unit: "", price: "", reason: "" }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    setItems(items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const formatRupiah = (value) => {
    if (!value) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const grandTotal = items.reduce((sum, item) => {
    return sum + (Number(item.qty) * Number(item.price) || 0);
  }, 0);

  const handleSubmit = async (submitStatus) => {
    if (!dept || !pic || !neededDate) {
      alert("Lengkapi semua field!");
      return;
    }
    if (items.some(i => !i.name || !i.qty || !i.unit || !i.price || !i.reason)) {
      alert("Lengkapi semua item!");
      return;
    }

    try {
      setLoading(true);

      // Buat PR dulu dengan status DRAFT
      const res = await createPR({
        department: dept,
        pic,
        neededDate,
        items: items.map(i => ({
          itemName: i.name,
          qty: Number(i.qty),
          unit: i.unit,
          price: Number(i.price),
          reason: i.reason,
        })),
      });

      // Kalau submit (bukan draft), update status ke WAITING_APPROVAL
      if (submitStatus === "WAITING_APPROVAL") {
        await updatePRStatus(res.data.id, { status: "WAITING_APPROVAL" });
      }

      alert(`PR berhasil disimpan sebagai ${submitStatus}`);
      navigate(ROUTES.PURCHASE_REQUEST);
    } catch (err) {
      alert("Gagal menyimpan PR");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate(ROUTES.PURCHASE_REQUEST)}
          className="text-sm text-blue-600 hover:underline mb-2 block"
        >
          ← Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Buat Purchase Request</h1>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* DEPT & PIC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Departemen</label>
            <input
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              placeholder="Nama departemen"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">PIC</label>
            <input
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              placeholder="Nama PIC"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* NEEDED DATE */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Tanggal Dibutuhkan</label>
          <input
            type="date"
            value={neededDate}
            onChange={(e) => setNeededDate(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ITEMS */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm text-gray-500">Item yang Diminta</label>
            <button
              onClick={handleAddItem}
              className="text-sm text-blue-600 hover:underline"
            >
              + Tambah Item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-2">
                <div className="flex gap-2 items-center">
                  <input
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    placeholder="Nama item"
                    className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                    placeholder="Qty"
                    className="w-20 border border-gray-300 px-3 py-2 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                    placeholder="Satuan"
                    className="w-24 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", e.target.value)}
                    placeholder="Harga"
                    className="w-32 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {items.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-400 hover:text-red-600 text-lg leading-none px-1"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center gap-2">
                  <input
                    value={item.reason}
                    onChange={(e) => handleItemChange(index, "reason", e.target.value)}
                    placeholder="Note / alasan keperluan item ini..."
                    className="flex-1 border border-gray-200 bg-gray-50 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    Subtotal: <span className="font-semibold text-gray-800">
                      {formatRupiah(Number(item.qty) * Number(item.price))}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* GRAND TOTAL */}
          <div className="flex justify-end mt-3">
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">
              <span className="text-sm text-gray-500">Grand Total: </span>
              <span className="text-lg font-bold text-blue-600">
                {formatRupiah(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(ROUTES.PURCHASE_REQUEST)}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            disabled={loading}
          >
            Batal
          </button>
          <button
            onClick={() => handleSubmit("DRAFT")}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Draft"}
          </button>
          <button
            onClick={() => handleSubmit("WAITING_APPROVAL")}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
}
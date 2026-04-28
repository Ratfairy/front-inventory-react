import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export default function PurchaseRequestCreate() {
  const navigate = useNavigate();

  const [dept, setDept]             = useState("");
  const [pic, setPic]               = useState("");
  const [neededDate, setNeededDate] = useState("");
  const [items, setItems]           = useState([
    { name: "", qty: "", unit: "", price: "", total: 0, reason: "" }
  ]);

  // FORMAT RUPIAH
  const formatRupiah = (value) => {
    return Number(value || 0).toLocaleString("id-ID");
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { name: "", qty: "", unit: "", price: "", total: 0, reason: "" }
    ]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    setItems(items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };

        // AUTO HITUNG TOTAL
        const qty   = field === "qty"   ? value : item.qty;
        const price = field === "price" ? value : item.price;

        updatedItem.total = (qty || 0) * (price || 0);

        return updatedItem;
      }
      return item;
    }));
  };

  const getGrandTotal = () => {
    return items.reduce((sum, item) => sum + Number(item.total || 0), 0);
  };

  const handleSubmit = (status) => {
    if (!dept || !pic || !neededDate) {
      alert("Lengkapi semua field!");
      return;
    }

    if (items.some(i => !i.name || !i.qty || !i.unit || !i.price || !i.reason)) {
      alert("Lengkapi semua item!");
      return;
    }

    // nanti ganti API
    console.log({
      dept,
      pic,
      neededDate,
      items,
      grandTotal: getGrandTotal()
    });

    alert(`PR berhasil disimpan sebagai ${status}`);
    navigate(ROUTES.PURCHASE_REQUEST);
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

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* DEPT & PIC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Departemen</label>
            <input
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">PIC</label>
            <input
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* DATE */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Tanggal Dibutuhkan</label>
          <input
            type="date"
            value={neededDate}
            onChange={(e) => setNeededDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg text-sm"
          />
        </div>

        {/* ITEMS */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm text-gray-500">Item</label>
            <button onClick={handleAddItem} className="text-blue-600 text-sm">
              + Tambah Item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="border rounded-xl p-4 space-y-2">

                {/* ROW 1 */}
                <div className="flex gap-2 items-center flex-wrap">
                  <input
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    placeholder="Nama item"
                    className="flex-1 border px-3 py-2 rounded-lg text-sm"
                  />

                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                    placeholder="Qty"
                    className="w-20 border px-3 py-2 rounded-lg text-sm text-center"
                  />

                  <input
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                    placeholder="Satuan"
                    className="w-24 border px-3 py-2 rounded-lg text-sm"
                  />

                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", e.target.value)}
                    placeholder="Harga"
                    className="w-28 border px-3 py-2 rounded-lg text-sm text-center"
                  />

                  {items.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 text-lg px-1"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* ROW 2 */}
                <input
                  value={item.reason}
                  onChange={(e) => handleItemChange(index, "reason", e.target.value)}
                  placeholder="Alasan / Note"
                  className="w-full border bg-gray-50 px-3 py-2 rounded-lg text-sm"
                />

                {/* TOTAL */}
                <div className="text-sm text-gray-600">
                  Total: <span className="font-semibold">
                    Rp {formatRupiah(item.total)}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* GRAND TOTAL */}
        <div className="text-right text-lg font-bold text-gray-800 border-t pt-4">
          Grand Total: Rp {formatRupiah(getGrandTotal())}
        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(ROUTES.PURCHASE_REQUEST)}
            className="px-4 py-2 text-sm text-gray-600"
          >
            Batal
          </button>
          <button
            onClick={() => handleSubmit("DRAFT")}
            className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
          >
            Draft
          </button>
          <button
            onClick={() => handleSubmit("WAITING APPROVAL")}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
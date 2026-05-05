import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import {
  getApprovedPRsForPO,
  createPO
} from "../../../api/services/purchaseOrderService";

export default function PurchaseOrderCreate() {
  const navigate = useNavigate();

  const [approvedPRs, setApprovedPRs] = useState([]);
  const [selectedPRId, setSelectedPRId] = useState("");
  const [supplier, setSupplier]         = useState("");
  const [items, setItems]               = useState([]);
  const [loading, setLoading]           = useState(false);

  useEffect(() => {
    fetchApprovedPRs();
  }, []);

  const fetchApprovedPRs = async () => {
    try {
      const res = await getApprovedPRsForPO();
      setApprovedPRs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectedPR = approvedPRs.find(pr => pr.purchaseRequestId === Number(selectedPRId));

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const handleSelectPR = (id) => {
    setSelectedPRId(id);
    const pr = approvedPRs.find(p => p.purchaseRequestId === Number(id));
    if (pr) setItems(pr.items.map(i => ({ ...i })));
    else setItems([]);
  };

  const handlePriceChange = (index, value) => {
    setItems(items.map((item, i) =>
      i === index ? { ...item, price: Number(value) } : item
    ));
  };

  const grandTotal = items.reduce((sum, item) =>
    sum + (item.qty * item.price || 0), 0
  );

  const handleSubmit = async (status) => {
    if (!selectedPRId) {
      alert("Pilih PR terlebih dahulu!");
      return;
    }
    if (!supplier.trim()) {
      alert("Supplier wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      const res = await createPO({
        purchaseRequestId: Number(selectedPRId),
        supplier,
        items: items.map(i => ({
          itemName: i.itemName,
          qty:      i.qty,
          unit:     i.unit,
          price:    i.price,
          reason:   i.reason,
        })),
      });

      // Kalau langsung SENT
      if (status === "SENT") {
        await updatePOStatus(res.data.id, { status: "SENT" });
      }

      alert(`PO berhasil disimpan!`);
      navigate(ROUTES.PURCHASE_ORDER);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan PO");
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold text-gray-800">Buat Purchase Order</h1>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* PILIH PR */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Pilih Purchase Request (sudah Approved)
          </label>
          <select
            value={selectedPRId}
            onChange={(e) => handleSelectPR(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Pilih PR --</option>
            {approvedPRs.map(pr => (
              <option key={pr.purchaseRequestId} value={pr.purchaseRequestId}>
                {pr.prNumber} - {pr.department} ({pr.pic})
              </option>
            ))}
          </select>
        </div>

        {/* INFO PR */}
        {selectedPR && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400">Departemen</p>
              <p className="font-medium text-gray-800 text-sm mt-1">{selectedPR.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">PIC</p>
              <p className="font-medium text-gray-800 text-sm mt-1">{selectedPR.pic}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Tanggal Dibutuhkan</p>
              <p className="font-medium text-gray-800 text-sm mt-1">
                {new Date(selectedPR.neededDate).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        )}

        <hr className="border-gray-100" />

        {/* SUPPLIER */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Supplier</label>
          <input
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Nama supplier"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ITEMS */}
        {items.length > 0 && (
          <>
            <hr className="border-gray-100" />
            <div>
              <p className="text-xs text-gray-400 mb-3">Item</p>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-800 text-sm">{item.itemName}</p>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                        {item.qty} {item.unit}
                      </span>
                    </div>
                    {item.reason && (
                      <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                        📝 {item.reason}
                      </p>
                    )}
                    <div className="flex items-center gap-3">
                      <label className="text-xs text-gray-400 whitespace-nowrap">
                        Harga Satuan
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handlePriceChange(i, e.target.value)}
                        className="flex-1 border border-gray-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="flex justify-end">
                      <p className="text-xs text-gray-500">
                        Subtotal: <span className="font-semibold text-gray-700">
                          {formatRupiah(item.qty * item.price)}
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
          </>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(ROUTES.PURCHASE_ORDER)}
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
            onClick={() => handleSubmit("SENT")}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Kirim ke Supplier"}
          </button>
        </div>

      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

// Simulasi data dari Receive Goods yang sudah RECEIVED
const receivedPOs = [
  {
    id: 1,
    poNumber: "PO-2026-001",
    prNumber: "PR-2026-001",
    supplier: "PT Sumber Jaya",
    dept: "IT",
    pic: "Andi",
    receivedDate: "2026-04-24",
    items: [
      { name: "Kertas HVS", qtyReceived: 5, unit: "Pack", price: 50000 },
      { name: "Tinta Printer", qtyReceived: 2, unit: "PCS", price: 150000 },
    ],
  },
  {
    id: 2,
    poNumber: "PO-2026-003",
    prNumber: "PR-2026-003",
    supplier: "PT Abadi Jaya",
    dept: "HR",
    pic: "Siti",
    receivedDate: "2026-04-25",
    items: [
      { name: "Map Folder", qtyReceived: 20, unit: "PCS", price: 10000 },
    ],
  },
];

export default function InvoiceCreate() {
  const navigate = useNavigate();

  const [selectedPOId, setSelectedPOId] = useState("");
  const [invoiceDate, setInvoiceDate]   = useState("");
  const [invoiceRef, setInvoiceRef]     = useState("");
  const [notes, setNotes]               = useState("");

  const selectedPO = receivedPOs.find(po => po.id === Number(selectedPOId));

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const grandTotal = selectedPO
    ? selectedPO.items.reduce((sum, item) =>
        sum + (item.qtyReceived * item.price || 0), 0)
    : 0;

  const handleSubmit = (status) => {
    if (!selectedPOId) {
      alert("Pilih PO terlebih dahulu!");
      return;
    }
    if (!invoiceDate) {
      alert("Tanggal invoice wajib diisi!");
      return;
    }
    // nanti ganti dengan API call
    alert(`Invoice berhasil disimpan sebagai ${status}`);
    navigate(ROUTES.INVOICE);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate(ROUTES.INVOICE)}
          className="text-sm text-blue-600 hover:underline mb-2 block"
        >
          ← Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Buat Invoice</h1>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* PILIH PO */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Pilih PO (sudah Received)
          </label>
          <select
            value={selectedPOId}
            onChange={(e) => setSelectedPOId(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Pilih PO --</option>
            {receivedPOs.map(po => (
              <option key={po.id} value={po.id}>
                {po.poNumber} - {po.supplier} ({po.dept})
              </option>
            ))}
          </select>
        </div>

        {/* INFO PO */}
        {selectedPO && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400">No PR</p>
              <p className="font-medium text-gray-800 text-sm mt-1">{selectedPO.prNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Supplier</p>
              <p className="font-medium text-gray-800 text-sm mt-1">{selectedPO.supplier}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Departemen</p>
              <p className="font-medium text-gray-800 text-sm mt-1">{selectedPO.dept}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Tanggal Diterima</p>
              <p className="font-medium text-gray-800 text-sm mt-1">{selectedPO.receivedDate}</p>
            </div>
          </div>
        )}

        <hr className="border-gray-100" />

        {/* INVOICE DATE & REF */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Tanggal Invoice
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              No Referensi Invoice Supplier
            </label>
            <input
              value={invoiceRef}
              onChange={(e) => setInvoiceRef(e.target.value)}
              placeholder="Opsional"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* ITEMS dari Received Report */}
        {selectedPO && (
          <>
            <hr className="border-gray-100" />
            <div>
              <p className="text-xs text-gray-400 mb-3">
                Item (dari Received Report)
              </p>
              <div className="space-y-3">
                {selectedPO.items.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                        {item.qtyReceived} {item.unit}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Harga Satuan: {formatRupiah(item.price)}</span>
                      <span className="font-semibold text-gray-700">
                        Subtotal: {formatRupiah(item.qtyReceived * item.price)}
                      </span>
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

        {/* NOTES */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Catatan (opsional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Catatan tambahan untuk Finance..."
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(ROUTES.INVOICE)}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Batal
          </button>
          <button
            onClick={() => handleSubmit("DRAFT")}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            Simpan Draft
          </button>
          <button
            onClick={() => handleSubmit("SENT")}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Kirim ke Finance
          </button>
        </div>

      </div>
    </div>
  );
}
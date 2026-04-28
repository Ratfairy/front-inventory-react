import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../utils/routes";

const dummyReceive = [
  {
    id: 1,
    poNumber: "PO-2026-001",
    prNumber: "PR-2026-001",
    supplier: "PT Sumber Jaya",
    dept: "IT",
    pic: "Andi",
    status: "PENDING",
    items: [
      { name: "Kertas HVS", qtyOrdered: 5, qtyReceived: 0, unit: "Pack", note: "" },
      { name: "Tinta Printer", qtyOrdered: 2, qtyReceived: 0, unit: "PCS", note: "" },
    ],
  },
  {
    id: 2,
    poNumber: "PO-2026-002",
    prNumber: "PR-2026-002",
    supplier: "PT Maju Mundur",
    dept: "Finance",
    pic: "Budi",
    status: "PARTIAL",
    items: [
      { name: "Pulpen", qtyOrdered: 10, qtyReceived: 5, unit: "PCS", note: "Sisa 5 menyusul" },
    ],
  },
  {
    id: 3,
    poNumber: "PO-2026-003",
    prNumber: "PR-2026-003",
    supplier: "PT Abadi Jaya",
    dept: "HR",
    pic: "Siti",
    status: "RECEIVED",
    items: [
      { name: "Map Folder", qtyOrdered: 20, qtyReceived: 20, unit: "PCS", note: "" },
    ],
  },
];

const STATUS_STYLE = {
  PENDING:  "bg-yellow-100 text-yellow-600",
  PARTIAL:  "bg-blue-100 text-blue-600",
  RECEIVED: "bg-green-100 text-green-600",
};

export default function ReceiveGoodsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const found = dummyReceive.find(r => r.id === Number(id));
  const [data, setData] = useState(found);
  const [items, setItems] = useState(
    found?.items.map(i => ({ ...i, qtyNew: "" })) || []
  );

  if (!data) return (
    <div className="p-6 text-gray-400">Data tidak ditemukan</div>
  );

  const isReadOnly = data.status === "RECEIVED";

  const handleQtyChange = (index, value) => {
    setItems(items.map((item, i) =>
      i === index ? { ...item, qtyNew: value } : item
    ));
  };

  const handleNoteChange = (index, value) => {
    setItems(items.map((item, i) =>
      i === index ? { ...item, note: value } : item
    ));
  };

  const handleConfirm = () => {
    // validasi qty
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const qtyNew = Number(item.qtyNew) || 0;
      const totalReceived = item.qtyReceived + qtyNew;
      if (qtyNew < 0) {
        alert(`Qty diterima tidak boleh minus untuk item ${item.name}`);
        return;
      }
      if (totalReceived > item.qtyOrdered) {
        alert(`Qty diterima melebihi qty order untuk item ${item.name}`);
        return;
      }
    }

    // update items
    const updatedItems = items.map(item => ({
      ...item,
      qtyReceived: item.qtyReceived + (Number(item.qtyNew) || 0),
      qtyNew: "",
    }));

    // cek apakah semua sudah RECEIVED
    const allReceived = updatedItems.every(
      item => item.qtyReceived >= item.qtyOrdered
    );

    // cek apakah ada yang sudah diterima sebagian
    const anyReceived = updatedItems.some(item => item.qtyReceived > 0);

    const newStatus = allReceived
      ? "RECEIVED"
      : anyReceived
      ? "PARTIAL"
      : "PENDING";

    setItems(updatedItems);
    setData({ ...data, status: newStatus, items: updatedItems });
    alert(`Konfirmasi berhasil! Status: ${newStatus}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate(ROUTES.RECEIVE_GOODS)}
          className="text-sm text-blue-600 hover:underline mb-2 block"
        >
          ← Kembali
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{data.poNumber}</h1>
            <p className="text-sm text-gray-400 mt-1">Dari PR: {data.prNumber}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[data.status]}`}>
            {data.status}
          </span>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* INFO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400">Supplier</p>
            <p className="font-medium text-gray-800 mt-1">{data.supplier}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Departemen</p>
            <p className="font-medium text-gray-800 mt-1">{data.dept}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">PIC</p>
            <p className="font-medium text-gray-800 mt-1">{data.pic}</p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* ITEMS */}
        <div>
          <p className="text-xs text-gray-400 mb-3">Detail Item</p>
          <div className="space-y-3">
            {items.map((item, i) => {
              const totalReceived = item.qtyReceived + (Number(item.qtyNew) || 0);
              const isComplete = item.qtyReceived >= item.qtyOrdered;

              return (
                <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">

                  {/* NAMA + STATUS ITEM */}
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      isComplete
                        ? "bg-green-100 text-green-600"
                        : item.qtyReceived > 0
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {isComplete ? "Lengkap" : item.qtyReceived > 0 ? "Sebagian" : "Belum Diterima"}
                    </span>
                  </div>

                  {/* QTY INFO */}
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400">Dipesan</p>
                      <p className="font-semibold text-gray-700 mt-1">
                        {item.qtyOrdered} {item.unit}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400">Sudah Diterima</p>
                      <p className="font-semibold text-gray-700 mt-1">
                        {item.qtyReceived} {item.unit}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400">Sisa</p>
                      <p className="font-semibold text-orange-500 mt-1">
                        {item.qtyOrdered - item.qtyReceived} {item.unit}
                      </p>
                    </div>
                  </div>

                  {/* INPUT QTY BARU - hanya kalau belum complete & tidak read only */}
                  {!isReadOnly && !isComplete && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <label className="text-xs text-gray-400 whitespace-nowrap">
                          Qty Diterima Sekarang
                        </label>
                        <input
                          type="number"
                          value={item.qtyNew}
                          onChange={(e) => handleQtyChange(i, e.target.value)}
                          min={0}
                          max={item.qtyOrdered - item.qtyReceived}
                          placeholder="0"
                          className="flex-1 border border-gray-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      {/* NOTE per item */}
                      <input
                        value={item.note}
                        onChange={(e) => handleNoteChange(i, e.target.value)}
                        placeholder="Catatan (opsional, misal: kondisi barang, sisa menyusul...)"
                        className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  )}

                  {/* NOTE read only */}
                  {(isReadOnly || isComplete) && item.note && (
                    <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                      📝 {item.note}
                    </p>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* ACTION */}
        {!isReadOnly && (
          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Konfirmasi Penerimaan
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
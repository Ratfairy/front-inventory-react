import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../utils/routes";

const dummyInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-2026-001",
    poNumber: "PO-2026-001",
    prNumber: "PR-2026-001",
    supplier: "PT Sumber Jaya",
    dept: "IT",
    pic: "Andi",
    invoiceDate: "2026-04-25",
    receivedDate: "2026-04-24",
    invoiceRef: "INV/SUJ/2026/001",
    notes: "Mohon segera diproses",
    status: "DRAFT",
    items: [
      { name: "Kertas HVS", qtyReceived: 5, unit: "Pack", price: 50000 },
      { name: "Tinta Printer", qtyReceived: 2, unit: "PCS", price: 150000 },
    ],
  },
  {
    id: 2,
    invoiceNumber: "INV-2026-002",
    poNumber: "PO-2026-002",
    prNumber: "PR-2026-002",
    supplier: "PT Maju Mundur",
    dept: "Finance",
    pic: "Budi",
    invoiceDate: "2026-04-26",
    receivedDate: "2026-04-25",
    invoiceRef: "",
    notes: "",
    status: "SENT",
    items: [
      { name: "Pulpen", qtyReceived: 10, unit: "PCS", price: 5000 },
    ],
  },
];

const STATUS_STYLE = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT:  "bg-blue-100 text-blue-600",
};

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const found = dummyInvoices.find(inv => inv.id === Number(id));
  const [data, setData] = useState(found);

  if (!data) return (
    <div className="p-6 text-gray-400">Data tidak ditemukan</div>
  );

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const grandTotal = data.items.reduce((sum, item) =>
    sum + (item.qtyReceived * item.price || 0), 0
  );

  const handleSend = () => {
    setData({ ...data, status: "SENT" });
    alert("Invoice berhasil dikirim ke Finance!");
  };

  const isDraft = data.status === "DRAFT";

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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {data.invoiceNumber}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Dari PO: {data.poNumber}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[data.status]}`}>
            {data.status}
          </span>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* INFO GRID */}
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
          <div>
            <p className="text-xs text-gray-400">Tanggal Invoice</p>
            <p className="font-medium text-gray-800 mt-1">{data.invoiceDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tanggal Diterima</p>
            <p className="font-medium text-gray-800 mt-1">{data.receivedDate}</p>
          </div>
          {data.invoiceRef && (
            <div>
              <p className="text-xs text-gray-400">No Ref Invoice Supplier</p>
              <p className="font-medium text-gray-800 mt-1">{data.invoiceRef}</p>
            </div>
          )}
        </div>

        <hr className="border-gray-100" />

        {/* ITEMS */}
        <div>
          <p className="text-xs text-gray-400 mb-3">Item</p>
          <div className="space-y-3">
            {data.items.map((item, i) => (
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

        {/* NOTES */}
        {data.notes && (
          <>
            <hr className="border-gray-100" />
            <div>
              <p className="text-xs text-gray-400 mb-1">Catatan</p>
              <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
                {data.notes}
              </div>
            </div>
          </>
        )}

        {/* ACTION */}
        {isDraft && (
          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Kirim ke Finance
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
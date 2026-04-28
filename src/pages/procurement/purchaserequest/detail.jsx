import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../utils/routes";

// Fungsi untuk format mata uang Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const dummyData = [
  {
    id: 1,
    prNumber: "PR-2026-001",
    dept: "IT",
    pic: "Andi",
    date: "2026-04-20",
    neededDate: "2026-04-30",
    status: "DRAFT",
    items: [
      { name: "Kertas HVS", qty: 5, unit: "Pack", price: 55000, reason: "Stok habis di ruangan" },
      { name: "Tinta Printer", qty: 2, unit: "PCS", price: 125000, reason: "Printer sering macet karena tinta habis" },
    ],
  },
  {
    id: 2,
    prNumber: "PR-2026-002",
    dept: "Finance",
    pic: "Budi",
    date: "2026-04-21",
    neededDate: "2026-05-01",
    status: "WAITING APPROVAL",
    items: [
      { name: "Pulpen", qty: 10, unit: "PCS", price: 3500, reason: "Stok pulpen habis" },
    ],
  },
  {
    id: 3,
    prNumber: "PR-2026-003",
    dept: "HR",
    pic: "Siti",
    date: "2026-04-22",
    neededDate: "2026-05-05",
    status: "APPROVED",
    items: [
      { name: "Map Folder", qty: 20, unit: "PCS", price: 5000, reason: "Persiapan event tahunan" },
    ],
  },
];

const STATUS_STYLE = {
  "DRAFT":            "bg-gray-100 text-gray-600",
  "WAITING APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

export default function PurchaseRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(
    dummyData.find(d => d.id === Number(id))
  );

  if (!data) return (
    <div className="p-6 text-gray-400">Data tidak ditemukan</div>
  );

  const handleDelete = () => {
    if (!confirm("Yakin hapus PR ini?")) return;
    navigate(ROUTES.PURCHASE_REQUEST);
  };

  const handleSubmitPR = () => {
    setData({ ...data, status: "WAITING APPROVAL" });
  };

  // Menghitung Grand Total
  const grandTotal = data.items.reduce((sum, item) => sum + (item.qty * (item.price || 0)), 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate(ROUTES.PURCHASE_REQUEST)}
          className="text-sm text-blue-600 hover:underline mb-2 block"
        >
          ← Kembali
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {data.prNumber}
            </h1>
            <p className="text-sm text-gray-400 mt-1">Dibuat: {data.date}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[data.status]}`}>
            {data.status}
          </span>
        </div>
      </div>

      {/* INFO CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400">Departemen</p>
            <p className="font-medium text-gray-800 mt-1">{data.dept}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">PIC</p>
            <p className="font-medium text-gray-800 mt-1">{data.pic}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tanggal Dibutuhkan</p>
            <p className="font-medium text-gray-800 mt-1">{data.neededDate}</p>
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="border-gray-100" />

        {/* ITEMS */}
        <div>
          <p className="text-xs text-gray-400 mb-3">Item yang Diminta</p>
          <div className="space-y-3">
            {data.items.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2">

                {/* ROW 1: Nama, Info Harga & Qty */}
                <div className="flex justify-between items-center gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.qty} {item.unit} × {formatRupiah(item.price)}
                    </p>
                  </div>
                  
                  {/* Total Harga per Item */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      {formatRupiah(item.qty * item.price)}
                    </p>
                  </div>
                </div>

                {/* ROW 2: Note */}
                {item.reason && (
                  <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg mt-2">
                    📝 {item.reason}
                  </p>
                )}

              </div>
            ))}
          </div>

          {/* GRAND TOTAL ROW */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center">
            <span className="font-semibold text-blue-900">Total Keseluruhan</span>
            <span className="text-lg font-bold text-blue-700">{formatRupiah(grandTotal)}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        {data.status === "DRAFT" && (
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
            >
              Hapus
            </button>
            <button
              onClick={() => navigate(`/procurement/purchaserequest/${data.id}/edit`)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={handleSubmitPR}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Submit PR
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
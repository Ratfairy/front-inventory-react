import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../utils/routes";

const dummyData = [
  {
    id: 1,
    prNumber: "PR-2026-001",
    dept: "IT",
    pic: "Andi",
    date: "2026-04-20",
    neededDate: "2026-04-30",
    status: "WAITING APPROVAL",
    comment: "",
    items: [
      { name: "Kertas HVS", qty: 5, unit: "Pack", price: 50000, reason: "Stok habis di ruangan" },
      { name: "Tinta Printer", qty: 2, unit: "PCS", price: 150000, reason: "Printer sering macet" },
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
    comment: "",
    items: [
      { name: "Pulpen", qty: 10, unit: "PCS", price: 5000, reason: "Stok pulpen habis" },
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
    comment: "Disetujui, segera proses PO",
    items: [
      { name: "Map Folder", qty: 20, unit: "PCS", price: 3000, reason: "Persiapan event tahunan" },
    ],
  },
  {
    id: 4,
    prNumber: "PR-2026-004",
    dept: "Marketing",
    pic: "Rudi",
    date: "2026-04-23",
    neededDate: "2026-05-10",
    status: "REJECTED",
    comment: "Budget tidak mencukupi",
    items: [
      { name: "Laptop", qty: 2, unit: "Unit", price: 8000000, reason: "Laptop lama rusak" },
    ],
  },
];

const STATUS_STYLE = {
  "WAITING APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

export default function ReviewPRDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const found = dummyData.find(d => d.id === Number(id));
  const [data, setData]       = useState(found);
  const [comment, setComment] = useState(found?.comment || "");

  if (!data) return (
    <div className="p-6 text-gray-400">Data tidak ditemukan</div>
  );

  // FORMAT RUPIAH
  const formatRupiah = (val) => Number(val || 0).toLocaleString("id-ID");

  // GRAND TOTAL
  const getGrandTotal = () => {
    return data.items.reduce((sum, item) => {
      return sum + (item.qty * (item.price || 0));
    }, 0);
  };

  const handleApprove = () => {
    if (!comment.trim()) {
      alert("Tambahkan komentar terlebih dahulu!");
      return;
    }
    setData({ ...data, status: "APPROVED", comment });
  };

  const handleReject = () => {
    if (!comment.trim()) {
      alert("Tambahkan alasan penolakan!");
      return;
    }
    setData({ ...data, status: "REJECTED", comment });
  };

  const isWaiting = data.status === "WAITING APPROVAL";

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <button
          onClick={() => navigate(ROUTES.REVIEW_PR)}
          className="text-sm text-blue-600 hover:underline mb-2 block"
        >
          ← Kembali
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{data.prNumber}</h1>
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

        <hr className="border-gray-100" />

        {/* ITEMS */}
        <div>
          <p className="text-xs text-gray-400 mb-3">Item yang Diminta</p>
          <div className="space-y-3">
            {data.items.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2">
                
                <div className="flex gap-3 items-center">
                  <p className="flex-1 font-medium text-gray-800 text-sm">{item.name}</p>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                    {item.qty} {item.unit}
                  </span>
                </div>

                {/* HARGA */}
                <div className="text-xs text-gray-600">
                  Harga: Rp {formatRupiah(item.price)}
                </div>

                {item.reason && (
                  <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                    📝 {item.reason}
                  </p>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* ✅ TOTAL KESELURUHAN (SEPERTI GAMBAR) */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex justify-between items-center">
          <span className="text-blue-700 font-medium">
            Total Keseluruhan
          </span>
          <span className="text-blue-600 font-bold text-lg">
            Rp {formatRupiah(getGrandTotal())}
          </span>
        </div>

        <hr className="border-gray-100" />

        {/* KOMENTAR */}
        <div>
          <p className="text-xs text-gray-400 mb-2">
            {isWaiting ? "Komentar / Catatan" : "Komentar Purchasing"}
          </p>
          {isWaiting ? (
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Tambahkan komentar atau catatan untuk PR ini..."
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm"
            />
          ) : (
            <div className={`px-3 py-2 rounded-lg text-sm ${
              data.status === "APPROVED"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}>
              💬 {data.comment || "-"}
            </div>
          )}
        </div>

        {/* ACTION */}
        {isWaiting && (
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Approve
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
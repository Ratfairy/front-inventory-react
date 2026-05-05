import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../../../utils/routes";
import {
  getPRById,
  updatePRStatus
} from "../../../api/services/purchaseRequestService";

const STATUS_STYLE = {
  "WAITING_APPROVAL": "bg-yellow-100 text-yellow-600",
  "APPROVED":         "bg-green-100 text-green-600",
  "REJECTED":         "bg-red-100 text-red-600",
};

export default function ReviewPRDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData]       = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPR();
  }, [id]);

  const fetchPR = async () => {
    try {
      setLoading(true);
      const res = await getPRById(id);
      setData(res.data);
      setComment(res.data.comment || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const handleApprove = async () => {
    if (!comment.trim()) {
      alert("Tambahkan komentar terlebih dahulu!");
      return;
    }
    try {
      const res = await updatePRStatus(id, {
        status: "APPROVED",
        comment,
      });
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal approve PR");
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      alert("Tambahkan alasan penolakan!");
      return;
    }
    try {
      const res = await updatePRStatus(id, {
        status: "REJECTED",
        comment,
      });
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal reject PR");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  if (!data) return null;

  const isWaiting = data.status === "WAITING_APPROVAL";

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
            <p className="text-sm text-gray-400 mt-1">
              Dibuat: {new Date(data.date).toLocaleDateString("id-ID")}
            </p>
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
            <p className="font-medium text-gray-800 mt-1">{data.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">PIC</p>
            <p className="font-medium text-gray-800 mt-1">{data.pic}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tanggal Dibutuhkan</p>
            <p className="font-medium text-gray-800 mt-1">
              {new Date(data.neededDate).toLocaleDateString("id-ID")}
            </p>
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
                  <p className="flex-1 font-medium text-gray-800 text-sm">{item.itemName}</p>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                    {item.qty} {item.unit}
                  </span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                    {formatRupiah(item.price)}
                  </span>
                </div>
                {item.reason && (
                  <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                    📝 {item.reason}
                  </p>
                )}
                <div className="flex justify-end">
                  <p className="text-xs text-gray-500">
                    Subtotal: <span className="font-semibold text-gray-700">
                      {formatRupiah(item.subtotal)}
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
                {formatRupiah(data.grandTotal)}
              </span>
            </div>
          </div>
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
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
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
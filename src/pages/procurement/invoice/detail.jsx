import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../../../utils/routes";
import {
  getInvoiceById,
  updateInvoiceStatus
} from "../../../api/services/invoiceService";

const STATUS_STYLE = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT:  "bg-blue-100 text-blue-600",
};

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const res = await getInvoiceById(id);
      setData(res.data);
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

  const handleSend = async () => {
    try {
      const res = await updateInvoiceStatus(id, { status: "SENT" });
      setData(res.data);
      alert("Invoice berhasil dikirim ke Finance!");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengirim invoice");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Memuat data...</p>
    </div>
  );

  if (!data) return null;

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
            <h1 className="text-2xl font-bold text-gray-800">{data.invoiceNumber}</h1>
            <p className="text-sm text-gray-400 mt-1">Dari PO: {data.poNumber}</p>
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
            <p className="font-medium text-gray-800 mt-1">{data.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">PIC</p>
            <p className="font-medium text-gray-800 mt-1">{data.pic}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tanggal Invoice</p>
            <p className="font-medium text-gray-800 mt-1">
              {new Date(data.invoiceDate).toLocaleDateString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tanggal Diterima</p>
            <p className="font-medium text-gray-800 mt-1">
              {new Date(data.receivedDate).toLocaleDateString("id-ID")}
            </p>
          </div>
          {data.invoiceRef && (
            <div>
              <p className="text-xs text-gray-400">No Ref Supplier</p>
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
                  <p className="font-medium text-gray-800 text-sm">{item.itemName}</p>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                    {item.qtyReceived} {item.unit}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Harga Satuan: {formatRupiah(item.price)}</span>
                  <span className="font-semibold text-gray-700">
                    Subtotal: {formatRupiah(item.subtotal)}
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
                {formatRupiah(data.grandTotal)}
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
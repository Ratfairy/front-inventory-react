import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../../../utils/routes";
import {
  getPOById,
  updatePOStatus,
  updatePO
} from "../../../api/services/purchaseOrderService";

const STATUS_STYLE = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT:  "bg-blue-100 text-blue-600",
};

export default function PurchaseOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData]         = useState(null);
  const [supplier, setSupplier] = useState("");
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetchPO();
  }, [id]);

  const fetchPO = async () => {
    try {
      setLoading(true);
      const res = await getPOById(id);
      setData(res.data);
      setSupplier(res.data.supplier);
      setItems(res.data.items);
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

  const grandTotal = items.reduce((sum, item) =>
    sum + (item.qty * item.price || 0), 0
  );

  const handlePriceChange = (index, value) => {
    setItems(items.map((item, i) =>
      i === index ? { ...item, price: Number(value) } : item
    ));
  };

  const handleSend = async () => {
    if (!supplier.trim()) {
      alert("Supplier wajib diisi!");
      return;
    }
    try {
      // Update PO dulu
      await updatePO(id, {
        supplier,
        items: items.map(i => ({
          itemName: i.itemName,
          qty:      i.qty,
          unit:     i.unit,
          price:    i.price,
          reason:   i.reason,
        })),
      });
      // Lalu update status ke SENT
      const res = await updatePOStatus(id, { status: "SENT" });
      setData(res.data);
      alert("PO berhasil dikirim ke supplier!");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengirim PO");
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
          onClick={() => navigate(ROUTES.PURCHASE_ORDER)}
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

        {/* SUPPLIER */}
        <div>
          <p className="text-xs text-gray-400 mb-1">Supplier</p>
          {isDraft ? (
            <input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Nama supplier"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="font-medium text-gray-800">{data.supplier}</p>
          )}
        </div>

        <hr className="border-gray-100" />

        {/* ITEMS */}
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
                  <label className="text-xs text-gray-400 whitespace-nowrap">Harga Satuan</label>
                  {isDraft ? (
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handlePriceChange(i, e.target.value)}
                      className="flex-1 border border-gray-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{formatRupiah(item.price)}</p>
                  )}
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

        {/* ACTION */}
        {isDraft && (
          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Kirim ke Supplier
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
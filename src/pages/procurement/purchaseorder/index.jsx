import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const dummyPO = [
  {
    id: 1,
    poNumber: "PO-2026-001",
    prNumber: "PR-2026-001",
    supplier: "PT Sumber Jaya",
    total: 550000,
    status: "DRAFT",
  },
  {
    id: 2,
    poNumber: "PO-2026-002",
    prNumber: "PR-2026-002",
    supplier: "PT Maju Mundur",
    total: 50000,
    status: "SENT",
  },
];

const STATUS_STYLE = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT: "bg-blue-100 text-blue-600",
  RECEIVED: "bg-green-100 text-green-600",
};

export default function PurchaseOrderIndex() {
  const navigate = useNavigate();

  const formatRupiah = (val) => Number(val || 0).toLocaleString("id-ID");

  return (
    <div className="space-y-6">

      {/* HEADER (SAMA SEPERTI REVIEW PR) */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Purchase Order
        </h1>
      </div>

      {/* TABLE (SAMA STYLE NYA) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">No PO</th>
              <th className="px-6 py-3 text-left">No PR</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-left">Total Harga</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {dummyPO.map((po) => (
              <tr key={po.id} className="hover:bg-gray-50 transition">

                <td className="px-6 py-4 font-medium text-gray-800">
                  {po.poNumber}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {po.prNumber}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {po.supplier}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  Rp {formatRupiah(po.total)}
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[po.status]}`}>
                    {po.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/procurement/purchaseorder/${po.id}`)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs transition"
                  >
                    Detail
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
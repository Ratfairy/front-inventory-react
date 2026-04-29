import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const dummyInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-2026-001",
    poNumber: "PO-2026-001",
    supplier: "PT Sumber Jaya",
    dept: "IT",
    total: 550000,
    status: "DRAFT",
    date: "2026-04-25",
  },
  {
    id: 2,
    invoiceNumber: "INV-2026-002",
    poNumber: "PO-2026-002",
    supplier: "PT Maju Mundur",
    dept: "Finance",
    total: 50000,
    status: "SENT",
    date: "2026-04-26",
  },
];

const STATUS_STYLE = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT:  "bg-blue-100 text-blue-600",
};

export default function InvoiceIndex() {
  const navigate = useNavigate();
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);

  const filtered = dummyInvoices.filter(inv => {
    const matchStatus = filterStatus === "ALL" || inv.status === filterStatus;
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.supplier.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
        <button
          onClick={() => navigate(ROUTES.INVOICE_CREATE)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition"
        >
          + Buat Invoice
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Cari invoice, PO, supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ALL">Semua Status</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">No Invoice</th>
              <th className="px-6 py-3 text-left">No PO</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-left">Dept</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Tanggal</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{inv.poNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{inv.supplier}</td>
                  <td className="px-6 py-4 text-gray-600">{inv.dept}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatRupiah(inv.total)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/procurement/invoice/${inv.id}`)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs transition"
                    >
                      {inv.status === "DRAFT" ? "Edit" : "Detail"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
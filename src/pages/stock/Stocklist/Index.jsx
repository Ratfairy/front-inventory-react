import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import {
  getAllStocks,
  deleteStock,
} from "../../../api/services/stockService";

import { ROUTES }
from "../../../utils/routes";

export default function StocklistIndex() {

  const navigate = useNavigate();

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getStocks();
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Hapus stock?"
      );

    if (!confirmDelete) return;

    try {

      await deleteStock(id);

      fetchData();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal hapus stock"
      );

    }
  };

  const filtered = data.filter((x) =>
    (x.itemName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Stock List
        </h1>

        <button
          onClick={() =>
            navigate(
              ROUTES.STOCK_LIST_CREATE
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Stock
        </button>

      </div>

      {/* SEARCH */}
      <div className="mb-4">

        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                No
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Item
              </th>

              <th className="p-3 text-left">
                Unit
              </th>

              <th className="p-3 text-left">
                Qty
              </th>

              <th className="p-3 text-left">
                Min Qty
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-400"
                >
                  Tidak ada data
                </td>
              </tr>

            ) : (

              filtered.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {index + 1}
                  </td>

                  <td className="p-3">
                    {item.categoryName}
                  </td>

                  <td className="p-3 font-medium">
                    {item.itemName}
                  </td>

                  <td className="p-3">
                    {item.unit}
                  </td>

                  <td className="p-3">
                    {item.qty}
                  </td>

                  <td className="p-3">
                    {item.minQty}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "Low Stock"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/stock/stocklist/${item.id}`
                        )
                      }
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
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
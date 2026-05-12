import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllItems,
  deleteItem,
} from "../../../api/services/itemService";

import { ROUTES }
from "../../../utils/routes";

export default function ItemIndex() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      setLoading(true);

      const res =
        await getAllItems();

      setData(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Hapus item?"
      );

    if (!confirmDelete) return;

    try {

      await deleteItem(id);

      fetchData();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal hapus item"
      );

    }
  };

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
          Master Item
        </h1>

        <button
          onClick={() =>
            navigate(
              ROUTES.ITEM_CREATE
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create
        </button>

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
                Price
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Stock
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-400"
                >
                  Tidak ada data
                </td>
              </tr>

            ) : (

              data.map((item, index) => (

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
                    Rp {item.price}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "APPROVED"
                          ? "bg-green-100 text-green-600"
                          : item.status === "REJECTED"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-3">

                    {item.hasStock ? (
                      <span className="text-green-600 font-medium">
                        Created
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        -
                      </span>
                    )}

                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/stock/item/${item.id}`
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
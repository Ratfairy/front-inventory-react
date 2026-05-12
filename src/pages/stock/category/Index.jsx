import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllCategories,
  deleteCategory,
} from "../../../api/services/categoryService";

import { ROUTES } from "../../../utils/routes";

export default function CategoryIndex() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      setLoading(true);

      const res =
        await getAllCategories();

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
        "Hapus category?"
      );

    if (!confirmDelete) return;

    try {

      await deleteCategory(id);

      fetchData();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal hapus category"
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
          Master Category
        </h1>

        <button
          onClick={() =>
            navigate(
              ROUTES.CATEGORY_CREATE
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
                Name
              </th>

              <th className="p-3 text-left">
                Description
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
                  colSpan={4}
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

                  <td className="p-3 font-medium">
                    {item.name}
                  </td>

                  <td className="p-3">
                    {item.description || "-"}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/stock/category/edit/${item.id}`
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
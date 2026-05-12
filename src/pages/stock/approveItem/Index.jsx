import { useEffect, useState } from "react";

import { useNavigate }
from "react-router-dom";

import {
  getAllItems,
} from "../../../api/services/itemService";

export default function ApproveItemIndex() {

  const navigate = useNavigate();

  const [data, setData] =
    useState([]);

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

      // hanya waiting
      const waiting =
        res.data.filter(
          (x) => x.status === "WAITING"
        );

      setData(waiting);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

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
          Approve Item
        </h1>

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
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-400"
                >
                  Tidak ada item waiting
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

                    <button
                      onClick={() =>
                        navigate(
                          `/stock/approveitem/${item.id}`
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Review
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
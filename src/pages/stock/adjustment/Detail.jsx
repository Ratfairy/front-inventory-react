import { useEffect, useState }
from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAdjustmentById,
} from "../../../api/services/adjustmentService";

import { ROUTES }
from "../../../utils/routes";

export default function AdjustmentDetail() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState(null);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {

    try {

      setLoading(true);

      const res =
        await getAdjustmentById(id);

      setData(res.data);

    } catch (err) {

      console.error(err);

      alert(
        "Gagal load adjustment"
      );

    } finally {

      setLoading(false);

    }
  };

  const formatDate = (date) => {

    return new Date(date)
      .toLocaleDateString("id-ID");

  };

  const getStatusStyle = (status) => {
    if (status === "WAITING") return "bg-yellow-100 text-yellow-700";
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  if (loading) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!data) {

    return (
      <div className="p-6">
        Adjustment tidak ditemukan
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Adjustment Detail
      </h1>

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* DATE */}
          <div>

            <label className="block text-sm text-gray-500 mb-1">
              Date
            </label>

            <div className="font-medium">
              {formatDate(data.date)}
            </div>

          </div>

          {/* PIC */}
          <div>

            <label className="block text-sm text-gray-500 mb-1">
              PIC
            </label>

            <div className="font-medium">
              {data.pic}
            </div>

          </div>

          {/* STATUS */}
          <div>

            <label className="block text-sm text-gray-500 mb-1">
              Status
            </label>

            <div>

              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(data.status)}`}
              >
                {data.status}
              </span>

            </div>

          </div>

          {/* REASON */}
          <div>

            <label className="block text-sm text-gray-500 mb-1">
              Reason
            </label>

            <div className="font-medium">
              {data.reason || "-"}
            </div>

          </div>

        </div>

      </div>

      {/* ITEM TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-6">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                No
              </th>

              <th className="p-3 text-left">
                Item
              </th>

              <th className="p-3 text-left">
                System Qty
              </th>

              <th className="p-3 text-left">
                Actual Qty
              </th>

              <th className="p-3 text-left">
                Adjustment
              </th>

            </tr>

          </thead>

          <tbody>

            {data.items?.map(
              (item, index) => (

              <tr
                key={item.id}
                className="border-t"
              >

                {/* NO */}
                <td className="p-3">
                  {index + 1}
                </td>

                {/* ITEM */}
                <td className="p-3 font-medium">
                  {item.itemName}
                </td>

                {/* SYSTEM */}
                <td className="p-3">
                  {item.systemQty}
                </td>

                {/* ACTUAL */}
                <td className="p-3">
                  {item.actualQty}
                </td>

                {/* ADJUSTMENT */}
                <td className="p-3">

                  <span
                    className={`font-semibold
                    ${
                      item.adjustmentQty < 0
                        ? "text-red-600"
                        : item.adjustmentQty > 0
                        ? "text-green-600"
                        : ""
                    }`}
                  >

                    {item.adjustmentQty > 0
                      ? `+${item.adjustmentQty}`
                      : item.adjustmentQty}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          navigate(
            ROUTES.ADJUSTMENT
          )
        }
        className="bg-gray-200 px-4 py-2 rounded-lg"
      >
        Back
      </button>

    </div>
  );
}
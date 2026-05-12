import { useEffect, useState }
from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAllMovements,
} from "../../../api/services/stockService";

import { ROUTES }
from "../../../utils/routes";

export default function StockMovementDetail() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [movement, setMovement] =
    useState(null);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {

    try {

      setLoading(true);

      const res =
        await getAllMovements();

      const detail =
        res.data.find(
          (x) => x.id === parseInt(id)
        );

      setMovement(detail);

    } catch (err) {

      console.error(err);

      alert(
        "Gagal load movement"
      );

    } finally {

      setLoading(false);

    }
  };

  const formatDate = (date) => {

    return new Date(date)
      .toLocaleString("id-ID");

  };

  if (loading) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!movement) {

    return (
      <div className="p-6">
        Movement tidak ditemukan
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Movement Detail
      </h1>

      <div className="bg-white shadow rounded-xl p-6">

        {/* ITEM */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Item
          </label>

          <div className="font-medium">
            {movement.itemName}
          </div>

        </div>

        {/* TYPE */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Type
          </label>

          <div>

            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold
              ${
                movement.type === "IN"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {movement.type}
            </span>

          </div>

        </div>

        {/* QTY */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Qty
          </label>

          <div className="font-medium">

            {movement.type === "IN"
              ? `+${movement.qty}`
              : `-${movement.qty}`}

          </div>

        </div>

        {/* SOURCE */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Source
          </label>

          <div className="font-medium">
            {movement.referenceType || "-"}
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Description
          </label>

          <div className="font-medium">
            {movement.description || "-"}
          </div>

        </div>

        {/* PIC */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            PIC
          </label>

          <div className="font-medium">
            {movement.pic || "-"}
          </div>

        </div>

        {/* DATE */}
        <div className="mb-6">

          <label className="block text-sm text-gray-500 mb-1">
            Date
          </label>

          <div className="font-medium">
            {formatDate(movement.date)}
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            navigate(
              ROUTES.STOCK_MOVEMENT
            )
          }
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          Back
        </button>

      </div>
    </div>
  );
}
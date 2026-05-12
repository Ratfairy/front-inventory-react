import { useEffect, useState }
from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getItemById,
  updateItemStatus,
} from "../../../api/services/itemService";

import { ROUTES }
from "../../../utils/routes";

export default function ApproveItemDetail() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [item, setItem] =
    useState(null);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {

    try {

      setLoading(true);

      const res =
        await getItemById(id);

      setItem(res.data);

    } catch (err) {

      console.error(err);

      alert("Gagal load item");

    } finally {

      setLoading(false);

    }
  };

  const handleApprove = async () => {

    try {

      setSaving(true);

      await updateItemStatus(id, {
        status: "APPROVED",
      });

      navigate(
        ROUTES.APPROVE_ITEM
      );

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal approve"
      );

    } finally {

      setSaving(false);

    }
  };

  const handleReject = async () => {

    try {

      setSaving(true);

      await updateItemStatus(id, {
        status: "REJECTED",
      });

      navigate(
        ROUTES.APPROVE_ITEM
      );

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal reject"
      );

    } finally {

      setSaving(false);

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
    <div className="p-6 max-w-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Review Item
      </h1>

      <div className="bg-white shadow rounded-xl p-6">

        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Category
          </label>

          <div className="font-medium">
            {item.categoryName}
          </div>

        </div>

        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Item Name
          </label>

          <div className="font-medium">
            {item.itemName}
          </div>

        </div>

        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Unit
          </label>

          <div className="font-medium">
            {item.unit}
          </div>

        </div>

        <div className="mb-6">

          <label className="block text-sm text-gray-500 mb-1">
            Price
          </label>

          <div className="font-medium">
            Rp {item.price}
          </div>

        </div>

        <div className="flex gap-3">

          <button
            disabled={saving}
            onClick={handleApprove}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Approve
          </button>

          <button
            disabled={saving}
            onClick={handleReject}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Reject
          </button>

          <button
            onClick={() =>
              navigate(
                ROUTES.APPROVE_ITEM
              )
            }
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
}
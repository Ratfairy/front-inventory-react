import { useEffect, useState }
from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getStockById,
  updateStock,
} from "../../../api/services/stockService";

import { ROUTES }
from "../../../utils/routes";

export default function StocklistDetail() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [stock, setStock] =
    useState(null);

  const [form, setForm] =
    useState({
      qty: 0,
      minQty: 0,
    });

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {

    try {

      setLoading(true);

      const res =
        await getStockById(id);

      setStock(res.data);

      setForm({
        qty: res.data.qty || 0,
        minQty:
          res.data.minQty || 0,
      });

    } catch (err) {

      console.error(err);

      alert("Gagal load stock");

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateStock(id, {
        qty:
          parseInt(form.qty),

        minQty:
          parseInt(form.minQty),
      });

      navigate(
        ROUTES.STOCK_LIST
      );

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal update stock"
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
        Edit Stock
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6"
      >

        {/* CATEGORY */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Category
          </label>

          <div className="font-medium">
            {stock.categoryName}
          </div>

        </div>

        {/* ITEM */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Item
          </label>

          <div className="font-medium">
            {stock.itemName}
          </div>

        </div>

        {/* UNIT */}
        <div className="mb-4">

          <label className="block text-sm text-gray-500 mb-1">
            Unit
          </label>

          <div className="font-medium">
            {stock.unit}
          </div>

        </div>

        {/* QTY */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Qty
          </label>

          <input
            type="number"
            name="qty"
            required
            value={form.qty}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

        </div>

        {/* MIN QTY */}
        <div className="mb-6">

          <label className="block mb-2 text-sm font-medium">
            Minimum Qty
          </label>

          <input
            type="number"
            name="minQty"
            required
            value={form.minQty}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {saving ? "Saving..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                ROUTES.STOCK_LIST
              )
            }
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}
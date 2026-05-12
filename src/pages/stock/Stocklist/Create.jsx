import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import {
  getAllCategories,
} from "../../../api/services/categoryService";

import {
  getApprovedItemsByCategory,
} from "../../../api/services/itemService";

import {
  createStock,
} from "../../../api/services/stockService";

import { ROUTES }
from "../../../utils/routes";

export default function StocklistCreate() {

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    categoryId: "",
    itemId: "",
    qty: 0,
    minQty: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    try {

      const res =
        await getAllCategories();

      setCategories(res.data);

    } catch (err) {

      console.error(err);

    }
  };

  const fetchItems = async (categoryId) => {

    try {

      const res =
        await getApprovedItemsByCategory(
          categoryId
        );

      // hanya item yg belum punya stock
      const filtered =
        res.data.filter(
          (x) => !x.hasStock
        );

      setItems(filtered);

    } catch (err) {

      console.error(err);

    }
  };

  const handleChange = async (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    // category berubah
    if (name === "categoryId") {

      setForm((prev) => ({
        ...prev,
        categoryId: value,
        itemId: "",
      }));

      fetchItems(value);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createStock({
        itemId:
          parseInt(form.itemId),

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
        "Gagal create stock"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-6 max-w-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Stock
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6"
      >

        {/* CATEGORY */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Category
          </label>

          <select
            name="categoryId"
            required
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >

            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (

              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>

            ))}

          </select>

        </div>

        {/* ITEM */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Item
          </label>

          <select
            name="itemId"
            required
            value={form.itemId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >

            <option value="">
              Select Item
            </option>

            {items.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.itemName}
              </option>

            ))}

          </select>

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
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save"}
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
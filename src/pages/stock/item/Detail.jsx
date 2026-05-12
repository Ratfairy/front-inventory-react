import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getItemById,
  updateItem,
} from "../../../api/services/itemService";

import {
  getAllCategories,
} from "../../../api/services/categoryService";

import { ROUTES }
from "../../../utils/routes";

export default function ItemDetail() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    categoryId: "",
    itemName: "",
    unit: "",
    price: 0,
  });

  useEffect(() => {

    fetchCategories();
    fetchDetail();

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

  const fetchDetail = async () => {

    try {

      setLoading(true);

      const res =
        await getItemById(id);

      setForm({
        categoryId:
          res.data.categoryId || "",
        itemName:
          res.data.itemName || "",
        unit:
          res.data.unit || "",
        price:
          res.data.price || 0,
      });

    } catch (err) {

      console.error(err);

      alert("Gagal load item");

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateItem(id, {
        ...form,
        categoryId:
          parseInt(form.categoryId),
      });

      navigate(ROUTES.ITEM);

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal update item"
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
        Edit Item
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

        {/* ITEM NAME */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Item Name
          </label>

          <input
            type="text"
            name="itemName"
            required
            value={form.itemName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

        </div>

        {/* UNIT */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Unit
          </label>

          <select
            name="unit"
            required
            value={form.unit}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            >

            <option value="">
                Select Unit
            </option>

            <option value="Pcs">
                Pcs
            </option>

            <option value="Pc">
                Pc
            </option>

            </select>

        </div>

        {/* PRICE */}
        <div className="mb-6">

          <label className="block mb-2 text-sm font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            required
            value={form.price}
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
              navigate(ROUTES.ITEM)
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
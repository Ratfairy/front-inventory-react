import { useEffect, useState } from "react";

import { useNavigate }
from "react-router-dom";

import {
  createItem,
} from "../../../api/services/itemService";

import {
  getAllCategories,
} from "../../../api/services/categoryService";

import { ROUTES }
from "../../../utils/routes";

export default function ItemCreate() {

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    categoryId: "",
    itemName: "",
    unit: "",
    price: 0,
    createdBy: "ADMIN",
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

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createItem({
        ...form,
        categoryId:
          parseInt(form.categoryId),
      });

      navigate(ROUTES.ITEM);

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal create item"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-6 max-w-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Item
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
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save"}
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
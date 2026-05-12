import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCategory }
from "../../../api/services/categoryService";

import { ROUTES }
from "../../../utils/routes";

export default function CategoryCreate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] =
    useState(false);

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

      await createCategory(form);

      navigate(ROUTES.CATEGORY);

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal create category"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Category
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6"
      >

        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 text-sm font-medium">
            Description
          </label>

          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </form>
    </div>
  );
}
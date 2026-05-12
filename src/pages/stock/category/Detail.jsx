import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getCategoryById,
  updateCategory,
} from "../../../api/services/categoryService";

import { ROUTES }
from "../../../utils/routes";

export default function CategoryDetail() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {

    try {

      setLoading(true);

      const res =
        await getCategoryById(id);

      setForm({
        name: res.data.name || "",
        description:
          res.data.description || "",
      });

    } catch (err) {

      console.error(err);

      alert("Gagal load category");

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

      await updateCategory(id, form);

      navigate(ROUTES.CATEGORY);

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal update category"
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
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Edit Category
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
              navigate(ROUTES.CATEGORY)
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
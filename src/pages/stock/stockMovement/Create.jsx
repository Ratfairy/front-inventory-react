import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import {
  getAllStocks,
} from "../../../api/services/stockService";

import {
  createMovement,
} from "../../../api/services/stockService";

import { ROUTES }
from "../../../utils/routes";

export default function StockMovementCreate() {

  const navigate = useNavigate();

  const [stocks, setStocks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      stockId: "",
      type: "IN",
      qty: 0,
      description: "",
      pic: "",
      referenceType: "MANUAL",
    });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {

    try {

      const res =
        await getAllStocks();

      setStocks(res.data);

    } catch (err) {

      console.error(err);

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

      setLoading(true);

      await createMovement({
        stockId:
          parseInt(form.stockId),

        type:
          form.type,

        qty:
          parseInt(form.qty),

        description:
          form.description,

        pic:
          form.pic,

        referenceType:
          form.referenceType,
      });

      navigate(
        ROUTES.STOCK_MOVEMENT
      );

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal create movement"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-6 max-w-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Stock Movement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6"
      >

        {/* STOCK */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Stock Item
          </label>

          <select
            name="stockId"
            required
            value={form.stockId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >

            <option value="">
              Select Stock
            </option>

            {stocks.map((stock) => (

              <option
                key={stock.id}
                value={stock.id}
              >
                {stock.itemName}
              </option>

            ))}

          </select>

        </div>

        {/* TYPE */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >

            <option value="IN">
              IN
            </option>

            <option value="OUT">
              OUT
            </option>

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

        {/* DESCRIPTION */}
        <div className="mb-4">

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

        {/* PIC */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium">
            PIC
          </label>

          <input
            type="text"
            name="pic"
            value={form.pic}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

        </div>

        {/* SOURCE */}
        <div className="mb-6">

          <label className="block mb-2 text-sm font-medium">
            Source
          </label>

          <select
            name="referenceType"
            value={form.referenceType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >

            <option value="MANUAL">
              MANUAL
            </option>

            <option value="RETURN">
              RETURN
            </option>

            <option value="RECEIVE">
              RECEIVE
            </option>

          </select>

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
                ROUTES.STOCK_MOVEMENT
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
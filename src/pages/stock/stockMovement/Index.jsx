import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import {
  getAllMovements,
} from "../../../api/services/stockService";

import { ROUTES }
from "../../../utils/routes";

export default function StockMovementIndex() {

  const navigate = useNavigate();

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("ALL");

  const [sourceFilter, setSourceFilter] =
    useState("ALL");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      setLoading(true);

      const res =
        await getAllMovements();

      setData(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  const filtered = data.filter((x) => {

    const matchSearch =
      x.itemName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchType =
      typeFilter === "ALL"
        ? true
        : x.type === typeFilter;

    const matchSource =
      sourceFilter === "ALL"
        ? true
        : x.referenceType === sourceFilter;

    return (
      matchSearch &&
      matchType &&
      matchSource
    );
  });

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

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Stock Movement
        </h1>

        <button
          onClick={() =>
            navigate(
              ROUTES.STOCK_MOVEMENT_CREATE
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create
        </button>

      </div>

      {/* FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-2"
        />

        {/* TYPE */}
        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-2"
        >

          <option value="ALL">
            All Type
          </option>

          <option value="IN">
            IN
          </option>

          <option value="OUT">
            OUT
          </option>

        </select>

        {/* SOURCE */}
        <select
          value={sourceFilter}
          onChange={(e) =>
            setSourceFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-2"
        >

          <option value="ALL">
            All Source
          </option>

          <option value="ADJUSTMENT">
            ADJUSTMENT
          </option>

          <option value="MANUAL">
            MANUAL
          </option>

          <option value="RECEIVE">
            RECEIVE
          </option>

          <option value="RETURN">
            RETURN
          </option>

        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

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
                Type
              </th>

              <th className="p-3 text-left">
                Qty
              </th>

              <th className="p-3 text-left">
                Source
              </th>

              <th className="p-3 text-left">
                Description
              </th>

              <th className="p-3 text-left">
                PIC
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>
                <td
                  colSpan={9}
                  className="text-center py-6 text-gray-400"
                >
                  Tidak ada data
                </td>
              </tr>

            ) : (

              filtered.map((item, index) => (

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

                  {/* TYPE */}
                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        item.type === "IN"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.type}
                    </span>

                  </td>

                  {/* QTY */}
                  <td className="p-3">

                    {item.type === "IN"
                      ? `+${item.qty}`
                      : `-${item.qty}`}

                  </td>

                  {/* SOURCE */}
                  <td className="p-3">

                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">

                      {item.referenceType || "-"}

                    </span>

                  </td>

                  {/* DESCRIPTION */}
                  <td className="p-3">
                    {item.description || "-"}
                  </td>

                  {/* PIC */}
                  <td className="p-3">
                    {item.pic || "-"}
                  </td>

                  {/* DATE */}
                  <td className="p-3">
                    {formatDate(item.date)}
                  </td>

                  {/* ACTION */}
                  <td className="p-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/stock/stockMovement/${item.id}`
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Detail
                    </button>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}
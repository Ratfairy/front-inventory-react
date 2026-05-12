import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import {
  getAllAdjustments,
  updateAdjustmentStatus,
  deleteAdjustment,
} from "../../../api/services/adjustmentService";

import { ROUTES }
from "../../../utils/routes";

export default function AdjustmentIndex() {

  const navigate = useNavigate();

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      setLoading(true);

      const res =
        await getAllAdjustments();

      setData(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  const handleApprove = async (id) => {

    const confirmApprove =
      window.confirm(
        "Approve adjustment?"
      );

    if (!confirmApprove) return;

    try {

      await updateAdjustmentStatus(
        id,
        {
          status: "APPROVED"
        }
      );

      fetchData();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal approve adjustment"
      );

    }
  };

  const handleReject = async (id) => {

    const confirmReject =
      window.confirm(
        "Reject adjustment?"
      );

    if (!confirmReject) return;

    try {

      await updateAdjustmentStatus(
        id,
        {
          status: "REJECTED"
        }
      );

      fetchData();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal reject adjustment"
      );

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete adjustment?"
      );

    if (!confirmDelete) return;

    try {

      await deleteAdjustment(id);

      fetchData();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Gagal delete adjustment"
      );

    }
  };

  const filtered = data.filter((x) => {

    const matchSearch =
      x.pic
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchStatus =
      statusFilter === "ALL"
        ? true
        : x.status === statusFilter;

    return (
      matchSearch &&
      matchStatus
    );
  });

  const formatDate = (date) => {

    return new Date(date)
      .toLocaleDateString("id-ID");

  };

  const getStatusStyle = (status) => {

    if (status === "WAITING")
      return
      "bg-yellow-100 text-yellow-700";

    if (status === "APPROVED")
      return
      "bg-green-100 text-green-700";

    if (status === "REJECTED")
      return
      "bg-red-100 text-red-700";

    return
      "bg-gray-100 text-gray-700";
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
          Adjustment
        </h1>

        <button
          onClick={() =>
            navigate(
              ROUTES.ADJUSTMENT_CREATE
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create
        </button>

      </div>

      {/* FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search PIC..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-2"
        />

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border rounded-lg px-4 py-2"
        >

          <option value="ALL">
            All Status
          </option>

          <option value="WAITING">
            WAITING
          </option>

          <option value="APPROVED">
            APPROVED
          </option>

          <option value="REJECTED">
            REJECTED
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
                Date
              </th>

              <th className="p-3 text-left">
                PIC
              </th>

              <th className="p-3 text-left">
                Reason
              </th>

              <th className="p-3 text-left">
                Total Item
              </th>

              <th className="p-3 text-left">
                Status
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
                  colSpan={7}
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

                  {/* DATE */}
                  <td className="p-3">
                    {formatDate(item.date)}
                  </td>

                  {/* PIC */}
                  <td className="p-3 font-medium">
                    {item.pic}
                  </td>

                  {/* REASON */}
                  <td className="p-3">
                    {item.reason || "-"}
                  </td>

                  {/* TOTAL ITEM */}
                  <td className="p-3">
                    {item.items?.length || 0}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* ACTION */}
                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/stock/adjustment/${item.id}`
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Detail
                    </button>

                    {item.status === "WAITING" && (
                      <>
                        <button
                          onClick={() =>
                            handleApprove(item.id)
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleReject(item.id)
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}

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
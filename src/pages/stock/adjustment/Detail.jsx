import { useParams, useNavigate } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    item: "Kertas HVS",
    adjustment: -2,
    reason: "Rusak",
    pic: "Andi",
    status: "WAITING",
  },
];

export default function AdjustmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = dummyData.find(d => d.id === Number(id));

  if (!data) return <div className="p-6">Data not found</div>;

  const getStatusStyle = (status) => {
    if (status === "WAITING")
      return "bg-yellow-100 text-yellow-700";
    if (status === "APPROVED")
      return "bg-green-100 text-green-700";
    if (status === "REJECTED")
      return "bg-red-100 text-red-700";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Adjustment Detail
          </h1>
          <p className="text-sm text-gray-400">ID #{data.id}</p>
        </div>

        <button
          onClick={() => navigate("/stock/adjustment")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-6">

        {/* GRID INFO */}
        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-400">Item</p>
            <p className="font-semibold text-gray-800">
              {data.item}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">PIC</p>
            <p className="font-semibold text-gray-800">
              {data.pic}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Adjustment</p>
            <p
              className={`text-lg font-bold ${
                data.adjustment < 0
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {data.adjustment}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                data.status
              )}`}
            >
              {data.status}
            </span>
          </div>

        </div>

        {/* REASON */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Reason</p>
          <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">
            {data.reason}
          </div>
        </div>

        {/* ACTION BUTTON */}
        {data.status === "WAITING" && (
          <div className="flex gap-3 justify-end pt-4 border-t">

            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition">
              Approve
            </button>

            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition">
              Reject
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
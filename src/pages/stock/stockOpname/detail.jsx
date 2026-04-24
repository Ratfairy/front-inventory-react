import { useParams, useNavigate } from "react-router-dom";

export default function StockOpnameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = {
    id,
    date: "2024-01-10",
    pic: "Andi",
    status: "WAITING",
    items: [
      { name: "Kertas HVS", system: 5, actual: 3, adjustment: -2 },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <button
        onClick={() => navigate("/stock/stockOpname")}
        className="text-blue-600 mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">
        Detail Opname #{id}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <p><b>Date:</b> {data.date}</p>
        <p><b>PIC:</b> {data.pic}</p>
        <p><b>Status:</b> {data.status}</p>

        <table className="w-full mt-4 text-sm">
          <thead>
            <tr>
              <th>Item</th>
              <th>System</th>
              <th>Actual</th>
              <th>Adj</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((i, idx) => (
              <tr key={idx}>
                <td>{i.name}</td>
                <td>{i.system}</td>
                <td>{i.actual}</td>
                <td>{i.adjustment}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
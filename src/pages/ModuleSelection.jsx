import { useNavigate } from "react-router-dom";
import factoryImg from "../assets/img/factory.jpeg";

export default function ModuleSelection() {
  const navigate = useNavigate();

  const selectModule = (module) => {
    localStorage.setItem("selectedModule", module);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HERO */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
            backgroundImage: `url(${factoryImg})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            PT Ito Seisakusho Armada
          </h1>

          <p className="mt-5 text-lg md:text-xl font-light">
            Precision Progressive Dies & Manufacturing Company Based in Indonesia
          </p>

          <div className="mt-10 animate-bounce text-sm text-white/80">
            Scroll Down
          </div>
        </div>
      </section>

      {/* MODULE SECTION */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-blue-900">
              Select ERP Module
            </h2>
            <p className="mt-4 text-gray-600">
              Choose the module you want to access
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* PURCHASING */}
            <button
              onClick={() => selectModule("purchasing")}
              className="group bg-white rounded-3xl p-12 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center text-5xl group-hover:scale-110 transition">
                🛒
              </div>

              <h3 className="mt-8 text-2xl font-bold text-blue-900">
                Purchasing
              </h3>

              <p className="mt-3 text-gray-500">
                Manage purchase request, purchase order, receive goods, and invoice.
              </p>
            </button>

            {/* INVENTORY */}
            <button
              onClick={() => selectModule("inventory")}
              className="group bg-white rounded-3xl p-12 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center text-5xl group-hover:scale-110 transition">
                📦
              </div>

              <h3 className="mt-8 text-2xl font-bold text-blue-900">
                Inventory
              </h3>

              <p className="mt-3 text-gray-500">
                Manage stock list, stock movement, adjustment, category, and item.
              </p>
            </button>

            {/* REPORT */}
            <button
            onClick={() => selectModule("report")}
            className="group bg-white rounded-3xl p-12 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 text-center"
            >
            <div className="w-24 h-24 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center text-5xl group-hover:scale-110 transition">
                📊
            </div>

            <h3 className="mt-8 text-2xl font-bold text-blue-900">
                Report
            </h3>

            <p className="mt-3 text-gray-500">
                View stock report, purchase report, and request report.
            </p>
            </button>

          </div>
        </div>
      </section>

    </div>
  );
}
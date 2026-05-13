import { useNavigate } from "react-router-dom";

const menus = [
  {
    key: "purchasing",
    label: "Purchasing",
    type: "module",
    icon: "🛒",
    color: "blue",
    description:
      "Manage purchase request, purchase order, receive goods, invoice, dan dashboard purchasing.",
    path: "/procurement/dashboard",
  },
  {
    key: "inventory",
    label: "Inventory",
    type: "module",
    icon: "📦",
    color: "emerald",
    description:
      "Manage stock list, stock movement, adjustment, category, item, dan approve item.",
    path: "/stock/dashboard",
  },
  {
    key: "report",
    label: "Report",
    type: "module",
    icon: "📊",
    color: "orange",
    description:
      "View stock report, purchase report, request report, dan summary laporan.",
    path: "/report/dashboard",
  },

  // DEPARTMENT MENU
  {
    key: "hr&ga",
    label: "HR & GA",
    type: "department",
    icon: "👥",
    color: "indigo",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department HR & GA.",
  },
  {
    key: "sales",
    label: "Sales & Marketing",
    type: "department",
    icon: "📣",
    color: "amber",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department Sales & Marketing.",
  },
  {
    key: "finance",
    label: "Finance & Accounting",
    type: "department",
    icon: "💰",
    color: "green",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department Finance & Accounting.",
  },
  {
    key: "design",
    label: "Design",
    type: "department",
    icon: "🎨",
    color: "purple",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department Design.",
  },
  {
    key: "ppic",
    label: "PPIC",
    type: "department",
    icon: "📋",
    color: "cyan",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department PPIC.",
  },
  {
    key: "tooling",
    label: "Tooling",
    type: "department",
    icon: "🛠️",
    color: "yellow",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department Tooling.",
  },
  {
    key: "produksi",
    label: "Produksi",
    type: "department",
    icon: "🏭",
    color: "red",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department Produksi.",
  },
  {
    key: "qcqa",
    label: "QC & QA",
    type: "department",
    icon: "✅",
    color: "teal",
    description:
      "Lihat movement stock, penggunaan item, dan kebutuhan inventory department QC & QA.",
  },
];

export default function ModuleSelection() {
  const navigate = useNavigate();

  const handleSelectMenu = (menu) => {
    if (menu.type === "module") {
      localStorage.removeItem("selectedDepartment");
      localStorage.setItem("selectedModule", menu.key);
      navigate(menu.path);
      return;
    }

    if (menu.type === "department") {
      localStorage.setItem("selectedDepartment", menu.key);
      localStorage.setItem("selectedModule", "inventory");
      navigate("/stock/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("selectedModule");
    localStorage.removeItem("selectedDepartment");
    navigate("/");
  };

  const getColorClass = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        title: "text-blue-950",
        hover: "group-hover:bg-blue-600 group-hover:text-white",
        badge: "bg-blue-50 text-blue-600",
      },
      emerald: {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
        title: "text-emerald-950",
        hover: "group-hover:bg-emerald-600 group-hover:text-white",
        badge: "bg-emerald-50 text-emerald-600",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        title: "text-orange-950",
        hover: "group-hover:bg-orange-600 group-hover:text-white",
        badge: "bg-orange-50 text-orange-600",
      },
      indigo: {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
        title: "text-indigo-950",
        hover: "group-hover:bg-indigo-600 group-hover:text-white",
        badge: "bg-indigo-50 text-indigo-600",
      },
      amber: {
        bg: "bg-amber-100",
        text: "text-amber-600",
        title: "text-amber-950",
        hover: "group-hover:bg-amber-500 group-hover:text-white",
        badge: "bg-amber-50 text-amber-600",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        title: "text-green-950",
        hover: "group-hover:bg-green-600 group-hover:text-white",
        badge: "bg-green-50 text-green-600",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        title: "text-purple-950",
        hover: "group-hover:bg-purple-600 group-hover:text-white",
        badge: "bg-purple-50 text-purple-600",
      },
      cyan: {
        bg: "bg-cyan-100",
        text: "text-cyan-600",
        title: "text-cyan-950",
        hover: "group-hover:bg-cyan-600 group-hover:text-white",
        badge: "bg-cyan-50 text-cyan-600",
      },
      yellow: {
        bg: "bg-yellow-100",
        text: "text-yellow-600",
        title: "text-yellow-950",
        hover: "group-hover:bg-yellow-500 group-hover:text-white",
        badge: "bg-yellow-50 text-yellow-600",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        title: "text-red-950",
        hover: "group-hover:bg-red-600 group-hover:text-white",
        badge: "bg-red-50 text-red-600",
      },
      teal: {
        bg: "bg-teal-100",
        text: "text-teal-600",
        title: "text-teal-950",
        hover: "group-hover:bg-teal-600 group-hover:text-white",
        badge: "bg-teal-50 text-teal-600",
      },
    };

    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* TOP */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              ERP System
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Select ERP Menu
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Pilih module department yang ingin kamu gunakan.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>

        {/* ALL MENU */}
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Menu Access
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Module dan department digabung dalam satu halaman agar lebih rapi.
            </p>
          </div>

          <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            {menus.length} Menus
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => {
            const color = getColorClass(menu.color);

            return (
              <button
                key={`${menu.type}-${menu.key}`}
                onClick={() => handleSelectMenu(menu)}
                className="group rounded-3xl border border-gray-100 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl text-5xl transition group-hover:scale-110 ${color.bg} ${color.hover}`}
                  >
                    {menu.icon}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${color.badge}`}
                  >
                    {menu.type === "module" ? "Module" : "Department"}
                  </span>
                </div>

                <h3 className={`mt-8 text-2xl font-bold ${color.title}`}>
                  {menu.label}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-gray-500">
                  {menu.description}
                </p>

                <div className={`mt-6 font-semibold ${color.text}`}>
                  Open {menu.type === "module" ? "Module" : "Department"} →
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
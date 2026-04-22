import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { to: "/", label: "Request", icon: "📦" },
    { to: "/purchase", label: "Purchase", icon: "🛒" },
    { to: "/receipt", label: "Receipt", icon: "📥" },
    { to: "/stock", label: "Stock", icon: "📊" },
  ];

  return (
    <aside className="w-52 bg-slate-900 text-white h-screen p-4 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6 text-lg font-bold">
        <span>📦</span>
        <span>Inventory</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                ${isActive 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-300 hover:bg-slate-700"
                }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
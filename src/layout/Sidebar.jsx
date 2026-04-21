import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { to: "/", label: "Dashboard", icon: "🏠" },
    { to: "/request", label: "Request", icon: "📦" },
    { to: "/purchase", label: "Purchase", icon: "🛒" },
    { to: "/receipt", label: "Receipt", icon: "📥" },
    { to: "/stock", label: "Stock", icon: "📊" },
  ];

  return (
    <aside style={sidebar}>
      
      {/* LOGO */}
      <div style={logo}>
        {/* <span style={{ fontSize: "20px" }}>📦</span> */}
        <span>Inventory</span>
      </div>

      {/* MENU */}
      <nav style={nav}>
        {menu.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
            key={item.to}
            to={item.to}
            className={`sidebar-link ${
                location.pathname === item.to ? "active" : ""
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

const sidebar = {
  width: "200px", // 🔥 lebih kecil
  minWidth: "200px",
  height: "100vh",
  background: "#1e293b", // 🔥 warna modern (dark slate)
  color: "white",
  padding: "20px 14px",
  display: "flex",
  flexDirection: "column",
};

const logo = {
  fontWeight: "bold",
  fontSize: "18px",
  marginBottom: "30px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const link = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "8px",
  color: "#cbd5f5",
  textDecoration: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
};

const activeLink = {
  background: "#3b82f6",
  color: "white",
  fontWeight: "600",
};
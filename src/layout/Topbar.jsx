import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div style={topbar}>
      <h3 style={{ margin: 0 }}>{pageTitle}</h3>
      <div style={{ fontSize: "14px", color: "#666" }}>
        Welcome back 👋
      </div>
    </div>
  );
}

// 🔥 mapping route → title
function getPageTitle(path) {
  switch (path) {
    case "/":
      return "Dashboard";
    case "/purchase":
      return "Purchase";
    case "/receipt":
      return "Receipt";
    case "/stock":
      return "Stock";
    default:
      return "Request";
  }
}

const topbar = {
  background: "#ffffff",
  padding: "16px 24px",
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};
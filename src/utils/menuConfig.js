export const MENU = [
  {
    title: "Dashboard",
    path: "/",
    icon: "💻",
  },
  {
    title: "Request",
    icon: "📝",
    children: [
      { title: "Create Request", path: "/request/createrequest" },
      { title: "Approval", path: "/request/approval" },
      { title: "History", path: "/request/historyRequest" },
    ],
  },
  {
    title: "Purchase",
    icon: "🛒",
    children: [
      { title: "Create PO", path: "/purchase/create" },
      { title: "Supplier", path: "/purchase/supplier" },
      { title: "History", path: "/purchase/historyPO" },
    ],
  },
  {
    title: "Stock",
    icon: "📦",
    children: [
      { title: "Stock List", path: "/stock/stockList" },
      { title: "Stock Movement", path: "/stock/stockMovement" },
      { title: "Adjustment", path: "/stock/adjustment" },
      { title: "Stock Opname", path: "/stock/stockOpname" },
      { title: "Reorder Monitoring", path: "/stock/reorderMonitoring" },
    ],
  },
  {
    title: "Report",
    icon: "📊",
    children: [
      { title: "Stock Report", path: "/report/stock" },
      { title: "Purchase Report", path: "/report/purchase" },
      { title: "Request Report", path: "/report/request" },
    ],
  }
];
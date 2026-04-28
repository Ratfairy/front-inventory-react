export const MENU = [
  {
    title: "Dashboard",
    path: "/",
    icon: "💻",
  },
  {
    title: "Procurement",
    icon: "🛒",
    children: [
      { title: "Purchase Request", path: "/procurement/purchaserequest" },
      { title: "Review PR",        path: "/procurement/reviewpr" },
      { title: "Purchase Order",   path: "/procurement/purchaseorder" },
      { title: "Receive Goods",    path: "/procurement/receivegoods" },
      { title: "Invoice",          path: "/procurement/invoice" },
    ],
  },
  {
    title: "Stock",
    icon: "📦",
    children: [
      { title: "Stock List",          path: "/stock/stockList" },
      { title: "Stock Movement",      path: "/stock/stockMovement" },
      { title: "Adjustment",          path: "/stock/adjustment" },
      { title: "Stock Opname",        path: "/stock/stockOpname" },
      { title: "Reorder Monitoring",  path: "/stock/reorderMonitoring" },
    ],
  },
  {
    title: "Report",
    icon: "📊",
    children: [
      { title: "Stock Report",    path: "/report/stock" },
      { title: "Purchase Report", path: "/report/purchase" },
      { title: "Request Report",  path: "/report/request" },
    ],
  },
];
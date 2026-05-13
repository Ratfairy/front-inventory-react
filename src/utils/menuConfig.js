import { ROUTES } from "./routes";

export const MENU = [
  {
    title: "Dashboard",
    icon: "🏠",
    module: "procurement",
    path: ROUTES.PROCUREMENT_DASHBOARD,
  },
  {
    title: "Purchase Request",
    icon: "📝",
    module: "procurement",
    path: ROUTES.PURCHASE_REQUEST,
  },
  {
    title: "Review PR",
    icon: "✅",
    module: "procurement",
    path: ROUTES.REVIEW_PR,
  },
  {
    title: "Purchase Order",
    icon: "🛒",
    module: "procurement",
    path: ROUTES.PURCHASE_ORDER,
  },
  {
    title: "Receive Goods",
    icon: "📥",
    module: "procurement",
    path: ROUTES.RECEIVE_GOODS,
  },
  {
    title: "Invoice",
    icon: "🧾",
    module: "procurement",
    path: ROUTES.INVOICE,
  },

  {
    title: "Dashboard",
    icon: "🏠",
    module: "stock",
    path: ROUTES.STOCK_DASHBOARD,
  },

  {
    title: "Stock List",
    icon: "📦",
    module: "stock",
    path: ROUTES.STOCK_LIST,
  },
  {
    title: "Stock Movement",
    icon: "🔄",
    module: "stock",
    path: ROUTES.STOCK_MOVEMENT,
  },
  {
    title: "Adjustment",
    icon: "⚙️",
    module: "stock",
    path: ROUTES.ADJUSTMENT,
  },
  {
    title: "Category",
    icon: "🏷️",
    module: "stock",
    path: ROUTES.CATEGORY,
  },
  {
    title: "Item",
    icon: "📋",
    module: "stock",
    path: ROUTES.ITEM,
  },
  {
    title: "Approve Item",
    icon: "✅",
    module: "stock",
    path: ROUTES.APPROVE_ITEM,
  },

  {
    title: "Dashboard",
    icon: "🏠",
    module: "report",
    path: ROUTES.REPORT_DASHBOARD,
  },

  {
    title: "Stock Report",
    icon: "📦",
    module: "report",
    path: ROUTES.STOCK_REPORT,
  },
  {
    title: "Purchase Report",
    icon: "🛒",
    module: "report",
    path: ROUTES.PURCHASE_REPORT,
  },
  {
    title: "Request Report",
    icon: "📝",
    module: "report",
    path: ROUTES.REQUEST_REPORT,
  },
];
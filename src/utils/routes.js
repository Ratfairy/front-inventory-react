export const ROUTES = {
  DASHBOARD: "/",

  // PROCUREMENT (gabungan Request + Purchase + Receipt)
  PR_CREATE:  "/procurement/request",
  PR_REVIEW:  "/procurement/review",
  PO_CREATE:  "/procurement/po",
  RECEIVE:    "/procurement/receive",
  INVOICE:    "/procurement/invoice",

  // STOCK
  STOCK_LIST:     "/stock/stockList",
  STOCK_MOVEMENT: "/stock/stockMovement",

  ADJUSTMENT:        "/stock/adjustment",
  ADJUSTMENT_CREATE: "/stock/adjustment/create",
  ADJUSTMENT_DETAIL: "/stock/adjustment/:id",

  STOCK_OPNAME:        "/stock/stockOpname",
  STOCK_OPNAME_CREATE: "/stock/stockOpname/create",
  STOCK_OPNAME_DETAIL: "/stock/stockOpname/:id",

  REORDER: "/stock/reorderMonitoring",

  // REPORT
  STOCK_REPORT:    "/report/stock",
  PURCHASE_REPORT: "/report/purchase",
  REQUEST_REPORT:  "/report/request",
};
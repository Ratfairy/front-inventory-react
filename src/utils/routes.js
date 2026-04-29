export const ROUTES = {
  DASHBOARD: "/",

  // PROCUREMENT
  PURCHASE_REQUEST:        "/procurement/purchaserequest",
  PURCHASE_REQUEST_CREATE: "/procurement/purchaserequest/create",
  PURCHASE_REQUEST_DETAIL: "/procurement/purchaserequest/:id",
  REVIEW_PR :              "/procurement/reviewpr",
  REVIEW_PR_DETAIL:        "/procurement/reviewpr/:id",
  PURCHASE_ORDER:          "/procurement/purchaseorder",
  PURCHASE_ORDER_CREATE:   "/procurement/purchaseorder/create",
  PURCHASE_ORDER_DETAIL:   "/procurement/purchaseorder/:id",
  RECEIVE_GOODS:           "/procurement/receivegoods",
  RECEIVE_GOODS_DETAIL:    "/procurement/receivegoods/:id",
  INVOICE:                 "/procurement/invoice",
  INVOICE_CREATE:          "/procurement/invoice/create",
  INVOICE_DETAIL:          "/procurement/invoice/:id",

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
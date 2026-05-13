export const ROUTES = {
  PROCUREMENT_DASHBOARD: "/procurement/dashboard",
  STOCK_DASHBOARD: "/stock/dashboard",
  REPORT_DASHBOARD: "/report/dashboard",

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
  STOCK_LIST:     "/stock/stocklist",
  STOCK_LIST_CREATE: "/stock/stocklist/create",
  STOCK_LIST_DETAIL: "/stock/stocklist/:id",

  STOCK_MOVEMENT:        "/stock/stockMovement",
  STOCK_MOVEMENT_CREATE: "/stock/stockMovement/create",
  STOCK_MOVEMENT_DETAIL: "/stock/stockMovement/:id",

  ADJUSTMENT:        "/stock/adjustment",
  ADJUSTMENT_CREATE: "/stock/adjustment/create",
  ADJUSTMENT_DETAIL: "/stock/adjustment/:id",

  ITEM: "/stock/item",
  ITEM_CREATE: "/stock/item/create",
  ITEM_DETAIL: "/stock/item/:id",

  APPROVE_ITEM: "/stock/approveitem",
  APPROVE_ITEM_DETAIL: "/stock/approveitem/:id",

  // REPORT
  STOCK_REPORT:    "/report/stock",
  PURCHASE_REPORT: "/report/purchase",
  REQUEST_REPORT:  "/report/request",

  CATEGORY: "/stock/category",
  CATEGORY_CREATE: "/stock/category/create",
  CATEGORY_EDIT: "/stock/category/edit/:id",
};
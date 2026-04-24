export const ROUTES = {
  DASHBOARD: "/",

  CREATE_REQUEST: "/request/createrequest",
  APPROVAL: "/request/approval",
  HISTORY_REQUEST: "/request/historyRequest",

  CREATE_PO: "/purchase/create",
  SUPPLIER: "/purchase/supplier",
  HISTORY_PO: "/purchase/historyPO",

  INCOMING: "/receipt/incomingGoods",
  QUALITY: "/receipt/qualityCheck",
  HISTORY_RECEIPT: "/receipt/historyReceipt",

  STOCK: "/stock",

  STOCK_LIST: "/stock/stockList",
  STOCK_MOVEMENT: "/stock/stockMovement",

  ADJUSTMENT: "/stock/adjustment",
  ADJUSTMENT_CREATE: "/stock/adjustment/create",
  ADJUSTMENT_DETAIL: "/stock/adjustment/:id",

  STOCK_OPNAME: "/stock/stockOpname",
  STOCK_OPNAME_CREATE: "/stock/stockOpname/create",
  STOCK_OPNAME_DETAIL: "/stock/stockOpname/:id",

  REORDER: "/stock/reorderMonitoring",

  STOCK_REPORT: "/report/stock",
  PURCHASE_REPORT: "/report/purchase",
  REQUEST_REPORT: "/report/request",
};
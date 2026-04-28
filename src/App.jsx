import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./utils/routes";

// PROCUREMENT (pages baru)
import PurchaseRequest       from "./pages/procurement/purchaserequest/index";
import PurchaseRequestCreate from "./pages/procurement/purchaserequest/create";
import PurchaseRequestDetail from "./pages/procurement/purchaserequest/detail";
import ReviewPR              from "./pages/procurement/reviewPR/index";
import ReviewPRDetail        from "./pages/procurement/reviewPR/detail";
import PurchaseOrderIndex    from "./pages/procurement/purchaseorder";
import PurchaseOrderDetail   from "./pages/procurement/purchaseorder/detail";
import ReceiveGoods          from "./pages/procurement/receivegoods";
import Invoice               from "./pages/procurement/invoice";

// STOCK
import StockList          from "./pages/stock/StockList";
import StockMovement      from "./pages/stock/StockMovement";
import AdjustmentIndex    from "./pages/stock/adjustment/Index";
import AdjustmentCreate   from "./pages/stock/adjustment/Create";
import AdjustmentDetail   from "./pages/stock/adjustment/Detail";
import StockOpnameIndex   from "./pages/stock/stockOpname/Index";
import StockOpnameCreate  from "./pages/stock/stockOpname/Create";
import StockOpnameDetail  from "./pages/stock/stockOpname/Detail";
import ReorderMonitoring  from "./pages/stock/ReorderMonitoring";

// REPORT
import StockReport    from "./pages/report/StockReport";
import PurchaseReport from "./pages/report/PurchaseReport";
import RequestReport  from "./pages/report/RequestReport";

// DASHBOARD
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          {/* PROCUREMENT */}
          <Route path={ROUTES.PURCHASE_REQUEST}        element={<PurchaseRequest />} />
          <Route path={ROUTES.PURCHASE_REQUEST_CREATE} element={<PurchaseRequestCreate />} />
          <Route path={ROUTES.PURCHASE_REQUEST_DETAIL} element={<PurchaseRequestDetail />} />         
          <Route path={ROUTES.REVIEW_PR}        element={<ReviewPR />} />
          <Route path={ROUTES.REVIEW_PR_DETAIL} element={<ReviewPRDetail />} />
          <Route path={ROUTES.PURCHASE_ORDER} element={<PurchaseOrderIndex />} />
          <Route path={ROUTES.PURCHASE_ORDER_DETAIL} element={<PurchaseOrderDetail />} />
          <Route path={ROUTES.RECEIVE_GOODS}   element={<ReceiveGoods />} />
          <Route path={ROUTES.INVOICE}   element={<Invoice />} />

          {/* STOCK */}
          <Route path={ROUTES.STOCK_LIST}          element={<StockList />} />
          <Route path={ROUTES.STOCK_MOVEMENT}      element={<StockMovement />} />
          <Route path={ROUTES.ADJUSTMENT}          element={<AdjustmentIndex />} />
          <Route path={ROUTES.ADJUSTMENT_CREATE}   element={<AdjustmentCreate />} />
          <Route path={ROUTES.ADJUSTMENT_DETAIL}   element={<AdjustmentDetail />} />
          <Route path={ROUTES.STOCK_OPNAME}        element={<StockOpnameIndex />} />
          <Route path={ROUTES.STOCK_OPNAME_CREATE} element={<StockOpnameCreate />} />
          <Route path={ROUTES.STOCK_OPNAME_DETAIL} element={<StockOpnameDetail />} />
          <Route path={ROUTES.REORDER}             element={<ReorderMonitoring />} />

          {/* REPORT */}
          <Route path={ROUTES.STOCK_REPORT}    element={<StockReport />} />
          <Route path={ROUTES.PURCHASE_REPORT} element={<PurchaseReport />} />
          <Route path={ROUTES.REQUEST_REPORT}  element={<RequestReport />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
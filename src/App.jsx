import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./utils/routes";

// PROCUREMENT (pages baru)
import PurchaseRequest from "./pages/procurement/purchaserequest";
import ReviewPR        from "./pages/procurement/reviewPR";
import PurchaseOrder   from "./pages/procurement/purchaseorder"; 
import ReceiveGoods    from "./pages/procurement/receivegoods";
import Invoice         from "./pages/procurement/invoice";

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
          <Route path={ROUTES.PR_CREATE} element={<PurchaseRequest />} />
          <Route path={ROUTES.PR_REVIEW} element={<ReviewPR />} />
          <Route path={ROUTES.PO_CREATE} element={<PurchaseOrder />} />
          <Route path={ROUTES.RECEIVE}   element={<ReceiveGoods />} />
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
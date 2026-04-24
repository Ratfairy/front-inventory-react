import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./utils/routes";

// pages
import Dashboard from "./pages/Dashboard";
import CreateRequest from "./pages/request/CreateRequest";
import Approval from "./pages/request/Approval";
import HistoryRequest from "./pages/request/HistoryRequest";

import CreatePO from "./pages/purchase/CreatePO";
import Supplier from "./pages/purchase/Supplier";
import HistoryPO from "./pages/purchase/HistoryPO";

import IncomingGoods from "./pages/receipt/IncomingGoods";
import QualityCheck from "./pages/receipt/QualityCheck";
import HistoryReceipt from "./pages/receipt/HistoryReceipt";

import StockList from "./pages/stock/StockList";
import StockMovement from "./pages/stock/StockMovement";
import AdjustmentIndex from "./pages/stock/adjustment/Index";
import AdjustmentCreate from "./pages/stock/adjustment/Create";
import AdjustmentDetail from "./pages/stock/adjustment/Detail";
import StockOpnameIndex from "./pages/stock/stockOpname/Index";
import StockOpnameCreate from "./pages/stock/stockOpname/Create";
import StockOpnameDetail from "./pages/stock/stockOpname/Detail";
import ReorderMonitoring from "./pages/stock/ReorderMonitoring";

import StockReport from "./pages/report/StockReport";
import PurchaseReport from "./pages/report/PurchaseReport";
import RequestReport from "./pages/report/RequestReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          {/* REQUEST */}
          <Route path={ROUTES.CREATE_REQUEST} element={<CreateRequest />} />
          <Route path={ROUTES.APPROVAL} element={<Approval />} />
          <Route path={ROUTES.HISTORY_REQUEST} element={<HistoryRequest />} />

          {/* PURCHASE */}
          <Route path={ROUTES.CREATE_PO} element={<CreatePO />} />
          <Route path={ROUTES.SUPPLIER} element={<Supplier />} />
          <Route path={ROUTES.HISTORY_PO} element={<HistoryPO />} />

          {/* RECEIPT */}
          <Route path={ROUTES.INCOMING} element={<IncomingGoods />} />
          <Route path={ROUTES.QUALITY} element={<QualityCheck />} />
          <Route path={ROUTES.HISTORY_RECEIPT} element={<HistoryReceipt />} />

          {/* STOCK */}
          <Route path={ROUTES.STOCK_LIST} element={<StockList />} />
          <Route path={ROUTES.STOCK_MOVEMENT} element={<StockMovement />} />
          <Route path={ROUTES.ADJUSTMENT} element={<AdjustmentIndex />} />
          <Route path={ROUTES.ADJUSTMENT_CREATE} element={<AdjustmentCreate />} />
          <Route path={ROUTES.ADJUSTMENT_DETAIL} element={<AdjustmentDetail />} />
          <Route path={ROUTES.STOCK_OPNAME} element={<StockOpnameIndex />} />
          <Route path={ROUTES.STOCK_OPNAME_CREATE} element={<StockOpnameCreate />} />
          <Route path={ROUTES.STOCK_OPNAME_DETAIL} element={<StockOpnameDetail />} />
          <Route path={ROUTES.REORDER} element={<ReorderMonitoring />} />

          {/* REPORT */}
          <Route path={ROUTES.STOCK_REPORT} element={<StockReport />} />
          <Route path={ROUTES.PURCHASE_REPORT} element={<PurchaseReport />} />
          <Route path={ROUTES.REQUEST_REPORT} element={<RequestReport />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
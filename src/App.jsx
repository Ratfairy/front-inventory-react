import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./utils/routes";

// PROCUREMENT
import PurchaseRequest from "./pages/procurement/purchaserequest/index";
import PurchaseRequestCreate from "./pages/procurement/purchaserequest/create";
import PurchaseRequestDetail from "./pages/procurement/purchaserequest/detail";
import ReviewPR from "./pages/procurement/reviewPR/index";
import ReviewPRDetail from "./pages/procurement/reviewPR/detail";
import PurchaseOrderIndex from "./pages/procurement/purchaseorder/index";
import PurchaseOrderCreate from "./pages/procurement/purchaseorder/create";
import PurchaseOrderDetail from "./pages/procurement/purchaseorder/detail";
import ReceiveGoodsIndex from "./pages/procurement/receivegoods/index";
import ReceiveGoodsDetail from "./pages/procurement/receivegoods/detail";
import InvoiceIndex from "./pages/procurement/invoice/index";
import InvoiceCreate from "./pages/procurement/invoice/create";
import InvoiceDetail from "./pages/procurement/invoice/detail";

// STOCK
import StocklistIndex from "./pages/stock/stocklist/Index";
import StocklistCreate from "./pages/stock/stocklist/Create";
import StocklistDetail from "./pages/stock/stocklist/Detail";

import StockMovementIndex from "./pages/stock/stockMovement/Index";
import StockMovementCreate from "./pages/stock/stockMovement/Create";
import StockMovementDetail from "./pages/stock/stockMovement/Detail";

import AdjustmentIndex from "./pages/stock/adjustment/Index";
import AdjustmentCreate from "./pages/stock/adjustment/Create";
import AdjustmentDetail from "./pages/stock/adjustment/Detail";

import CategoryIndex from "./pages/stock/category/Index";
import CategoryCreate from "./pages/stock/category/Create";
import CategoryDetail from "./pages/stock/category/Detail";

import ItemIndex from "./pages/stock/item/Index";
import ItemCreate from "./pages/stock/item/Create";
import ItemDetail from "./pages/stock/item/Detail";

import ApproveItemIndex from "./pages/stock/approveItem/Index";
import ApproveItemDetail from "./pages/stock/approveItem/Detail";

// REPORT
import StockReport from "./pages/report/StockReport";
import PurchaseReport from "./pages/report/PurchaseReport";
import RequestReport from "./pages/report/RequestReport";

// DASHBOARD
import ProcurementDashboard from "./pages/procurement/dashboard";
import StockDashboard from "./pages/stock/dashboard";
import ReportDashboard from "./pages/report/dashboard";

// MODULE SELECTION
import ModuleSelection from "./pages/ModuleSelection";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HALAMAN PERTAMA */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/modules" element={<ModuleSelection />} />

        {/* HALAMAN DENGAN SIDEBAR */}
        <Route element={<MainLayout />}>

          {/* DASHBOARD */}
          <Route path={ROUTES.PROCUREMENT_DASHBOARD} element={<ProcurementDashboard />} />
          <Route path={ROUTES.STOCK_DASHBOARD} element={<StockDashboard />} />
          <Route path={ROUTES.REPORT_DASHBOARD} element={<ReportDashboard />} />

          {/* PROCUREMENT */}
          <Route
            path={ROUTES.PURCHASE_REQUEST}
            element={<PurchaseRequest />}
          />
          <Route
            path={ROUTES.PURCHASE_REQUEST_CREATE}
            element={<PurchaseRequestCreate />}
          />
          <Route
            path={ROUTES.PURCHASE_REQUEST_DETAIL}
            element={<PurchaseRequestDetail />}
          />

          <Route
            path={ROUTES.REVIEW_PR}
            element={<ReviewPR />}
          />
          <Route
            path={ROUTES.REVIEW_PR_DETAIL}
            element={<ReviewPRDetail />}
          />

          <Route
            path={ROUTES.PURCHASE_ORDER}
            element={<PurchaseOrderIndex />}
          />
          <Route
            path={ROUTES.PURCHASE_ORDER_CREATE}
            element={<PurchaseOrderCreate />}
          />
          <Route
            path={ROUTES.PURCHASE_ORDER_DETAIL}
            element={<PurchaseOrderDetail />}
          />

          <Route
            path={ROUTES.RECEIVE_GOODS}
            element={<ReceiveGoodsIndex />}
          />
          <Route
            path={ROUTES.RECEIVE_GOODS_DETAIL}
            element={<ReceiveGoodsDetail />}
          />

          <Route
            path={ROUTES.INVOICE}
            element={<InvoiceIndex />}
          />
          <Route
            path={ROUTES.INVOICE_CREATE}
            element={<InvoiceCreate />}
          />
          <Route
            path={ROUTES.INVOICE_DETAIL}
            element={<InvoiceDetail />}
          />

          {/* STOCK */}
          <Route
            path={ROUTES.STOCK_LIST}
            element={<StocklistIndex />}
          />
          <Route
            path={ROUTES.STOCK_LIST_CREATE}
            element={<StocklistCreate />}
          />
          <Route
            path={ROUTES.STOCK_LIST_DETAIL}
            element={<StocklistDetail />}
          />

          <Route
            path={ROUTES.STOCK_MOVEMENT}
            element={<StockMovementIndex />}
          />
          <Route
            path={ROUTES.STOCK_MOVEMENT_CREATE}
            element={<StockMovementCreate />}
          />
          <Route
            path={ROUTES.STOCK_MOVEMENT_DETAIL}
            element={<StockMovementDetail />}
          />

          <Route
            path={ROUTES.ADJUSTMENT}
            element={<AdjustmentIndex />}
          />
          <Route
            path={ROUTES.ADJUSTMENT_CREATE}
            element={<AdjustmentCreate />}
          />
          <Route
            path={ROUTES.ADJUSTMENT_DETAIL}
            element={<AdjustmentDetail />}
          />

          <Route
            path={ROUTES.CATEGORY}
            element={<CategoryIndex />}
          />
          <Route
            path={ROUTES.CATEGORY_CREATE}
            element={<CategoryCreate />}
          />
          <Route
            path={ROUTES.CATEGORY_EDIT}
            element={<CategoryDetail />}
          />

          <Route
            path={ROUTES.ITEM}
            element={<ItemIndex />}
          />
          <Route
            path={ROUTES.ITEM_CREATE}
            element={<ItemCreate />}
          />
          <Route
            path={ROUTES.ITEM_DETAIL}
            element={<ItemDetail />}
          />

          <Route
            path={ROUTES.APPROVE_ITEM}
            element={<ApproveItemIndex />}
          />
          <Route
            path={ROUTES.APPROVE_ITEM_DETAIL}
            element={<ApproveItemDetail />}
          />

          {/* REPORT */}
          <Route
            path={ROUTES.STOCK_REPORT}
            element={<StockReport />}
          />
          <Route
            path={ROUTES.PURCHASE_REPORT}
            element={<PurchaseReport />}
          />
          <Route
            path={ROUTES.REQUEST_REPORT}
            element={<RequestReport />}
          />

          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Request from "./pages/Request";
import Purchase from "./pages/Purchase";
import Receipt from "./pages/Receipt";
import Stock from "./pages/Stock";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/request" element={<Request />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/stock" element={<Stock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
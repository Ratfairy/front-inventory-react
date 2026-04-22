import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 flex flex-col">
        <Topbar />

        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
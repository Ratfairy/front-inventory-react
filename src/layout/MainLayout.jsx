import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
    
    <Sidebar />

    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <Topbar />

        <div style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
        </div>

    </div>

    </div>
  );
}
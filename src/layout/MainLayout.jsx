import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../utils/routes";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      
      <Sidebar isOpen={isOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-52" : "ml-16"}`}>
        
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
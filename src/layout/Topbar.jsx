import { useLocation, useNavigate } from "react-router-dom";
import { MENU } from "../utils/menuConfig";

function getPageTitle(path) {
  for (const menu of MENU) {
    if (menu.path && (path === menu.path || path.startsWith(menu.path + "/"))) {
      return menu.title;
    }
  }

  return "Dashboard";
}

export default function Topbar({ toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  const backToModules = () => {
    localStorage.removeItem("selectedModule");
    navigate("/");
  };

  return (
    <div className="bg-white px-6 py-4 border-b flex justify-between items-center shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-xl hover:bg-gray-100 px-2 py-1 rounded-md transition"
        >
          ☰
        </button>

        <h3 className="font-semibold text-gray-700">
          {pageTitle}
        </h3>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <button
          onClick={backToModules}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition text-sm"
        >
          Keluar
        </button>

      </div>
    </div>
  );
}
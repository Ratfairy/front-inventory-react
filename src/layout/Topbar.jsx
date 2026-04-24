import { useLocation } from "react-router-dom";
import { MENU } from "../utils/menuConfig";

function getPageTitle(path) {
  for (const menu of MENU) {
    if (menu.path && (path === menu.path || path.startsWith(menu.path + "/"))) {
      return menu.title;
    }

    if (menu.children) {
      const found = menu.children.find(child =>
        path === child.path || path.startsWith(child.path + "/")
      );

      if (found) return found.title;
    }
  }

  return "Dashboard";
}

export default function Topbar({ toggleSidebar }) {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="bg-white px-6 py-4 border-b flex justify-between items-center shadow-sm">

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

      <div className="text-sm text-gray-500">
        Welcome back 👋
      </div>

    </div>
  );
}
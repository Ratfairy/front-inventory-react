import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MENU } from "../utils/menuConfig";

export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isParentActive = (children) => {
    return children?.some(child => isActive(child.path));
  };

  return (
    <aside
      className={`${isOpen ? "w-52" : "w-16"} bg-slate-900 text-white fixed top-0 left-0 h-screen overflow-y-auto p-4 flex flex-col transition-all duration-300`}
    >
      {/* LOGO */}
      <div className="mb-6 text-lg font-bold">
        {isOpen && "Inventory"}
      </div>

      <nav className="flex flex-col gap-2">

        {MENU.map((menu, index) => {

          // 🔹 MENU TANPA CHILD (Dashboard)
          if (!menu.children) {
            return (
              <Link
                key={index}
                to={menu.path}
                className={`py-2 rounded-lg flex items-center
                ${isOpen ? "px-3 justify-start" : "justify-center"}
                ${isActive(menu.path) ? "bg-blue-500" : "text-gray-300 hover:bg-slate-700"}`}
              >
                <div className={`flex items-center w-full ${isOpen ? "gap-2" : "justify-center"}`}>
                  <span className="text-lg">{menu.icon}</span>
                  {isOpen && <span>{menu.title}</span>}
                </div>
              </Link>
            );
          }

          // 🔹 MENU DENGAN CHILD
          const isOpened = openMenu === index || isParentActive(menu.children);

          return (
            <div key={index}>
              <button
                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-300 hover:bg-slate-700 rounded-lg"
              >
                <div className={`flex items-center w-full ${isOpen ? "gap-2" : "justify-center"}`}>
                  <span className="text-lg">{menu.icon}</span>
                  {isOpen && <span>{menu.title}</span>}
                </div>

                {isOpen && <span className="text-xs">{isOpened ? "▾" : "▸"}</span>}
              </button>

              {/* SUBMENU */}
              <div
                className={`ml-4 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300
                ${isOpened && isOpen ? "max-h-screen" : "max-h-0"}`}
              >
                {menu.children.map((child, i) => (
                  <Link
                    key={i}
                    to={child.path}
                    className={`px-3 py-2 rounded-md text-sm
                    ${
                      isActive(child.path)
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:bg-slate-700"
                    }`}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

      </nav>
    </aside>
  );
}
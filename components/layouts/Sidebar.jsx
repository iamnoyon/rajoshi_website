"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./menuItems";

import {
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  // ✅ reusable active checker
  const isPathActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  // Toggle submenu
  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <aside
      className={`flex flex-col border-r bg-[#02162e] transition-all duration-300 ${
        collapsed ? "w-20" : "w-65"
      }`}
    >
      {/* Header */}
      <div
        className={`flex h-16 items-center ${
          collapsed ? "justify-center px-2" : "justify-between px-6"
        }`}
      >
        {!collapsed && (
          <span className="text-lg font-bold text-white">
            MyAdmin
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-white transition hover:cursor-pointer hover:text-gray-300"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="border-b border-[#052950]" />

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            // ✅ Parent active (includes children)
            const isActive =
              item.activePath?.some(isPathActive) ||
              item.children?.some((child) =>
                isPathActive(child.path)
              );

            // Auto open if active OR manually opened
            const isOpen = openMenus[item.name] || isActive;

            return (
              <li key={item.name}>
                {/* Parent Menu */}
                <div
                  className={`flex items-center justify-between rounded-xl py-3 text-sm font-medium transition-all ${
                    collapsed ? "justify-center px-2" : "px-4"
                  } ${
                    isActive
                      ? "bg-[#063C76] text-white shadow-md"
                      : "text-gray-300 hover:bg-[#063C76]"
                  }`}
                >
                  {/* Left Side */}
                  <Link
                    href={item.path}
                    className="flex flex-1 items-center gap-3"
                  >
                    <Icon size={20} />

                    {!collapsed && <span>{item.name}</span>}
                  </Link>

                  {/* Dropdown Toggle */}
                  {!collapsed && item.children && (
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="ml-2 hover:cursor-pointer"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Child Menus */}
                {!collapsed && item.children && isOpen && (
                  <ul className="mt-2 ml-6 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;

                      // ✅ FIXED child active logic
                      const childActive = isPathActive(child.path);

                      return (
                        <li key={child.name}>
                          <Link
                            href={child.path}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                              childActive
                                ? "bg-[#0A4D99] text-white"
                                : "text-gray-400 hover:bg-[#063C76]"
                            }`}
                          >
                            {ChildIcon && <ChildIcon size={16} />}

                            <span>{child.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-[#052950] p-4">
          <p className="text-center text-xs text-gray-400">
            © 2026 MyAdmin
          </p>
        </div>
      )}
    </aside>
  );
}
// components/layout/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./menuItems";
import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r bg-[#042A55] transition-all duration-300 ${
        collapsed ? "w-20" : "w-65"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-16 items-center ${
          collapsed ? "justify-center px-2" : "justify-between px-6"
        }`}
      >
        {/* Logo Text */}
        {!collapsed && (
          <span className="text-lg font-bold text-white">
            MyAdmin
          </span>
        )}

        {/* Collapse Button */}
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
      <div className="border-b border-[#0E3A69]" />

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.activePath.some((path) =>
              pathname.startsWith(path)
            );

            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center rounded-xl py-3 text-sm font-medium transition-all ${
                    collapsed
                      ? "justify-center px-2"
                      : "gap-3 px-4"
                  } ${
                    isActive
                      ? "bg-[#063C76] text-white shadow-md"
                      : "text-gray-300 hover:bg-[#063C76]"
                  }`}
                >
                  <Icon size={20} />

                  {/* Menu Text */}
                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-[#0E3A69] p-4">
          <p className="text-center text-xs text-gray-400">
            © 2026 MyAdmin
          </p>
        </div>
      )}
    </aside>
  );
}
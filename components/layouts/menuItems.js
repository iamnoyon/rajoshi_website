// components/layout/menuItems.js
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  Package,
} from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    activePath: ["/dashboard"],
  },
  {
    name: "Users",
    icon: Users,
    path: "/admin/users",
    activePath: ["/admin/users", "/admin/users/create"],
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
    activePath: ["/admin/orders"],
  },
  {
    name: "Products",
    icon: Package,
    path: "/admin/products",
    activePath: ["/admin/products", "/admin/products/edit"],
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
    activePath: ["/admin/settings"],
  },
];
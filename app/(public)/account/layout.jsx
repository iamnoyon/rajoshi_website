"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  CreditCard,
  Bell,
} from "lucide-react";

const accountLinks = [
  { name: "Profile", href: "/account", icon: User },
  { name: "Orders", href: "/account/orders", icon: Package },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
  { name: "Addresses", href: "/account/addresses", icon: MapPin },
  { name: "Payment Methods", href: "/account/payment", icon: CreditCard },
  { name: "Notifications", href: "/account/notifications", icon: Bell },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#042A55]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">My Account</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-24">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-[#042A55] rounded-full flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>

            <nav className="space-y-1">
              {accountLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    pathname === link.href
                      ? "bg-[#042A55] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
